import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchDoctor(session.user.id);
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchDoctor(session.user.id);
      else {
        setDoctor(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchDoctor = async (userId) => {
    try {
      const { data } = await supabase
        .from("doctors")
        .select("*, subscriptions(*)")
        .eq("id", userId)
        .single();
      setDoctor(data);
    } catch {
      // Doctor profile may not exist yet during onboarding
    }
    setLoading(false);
  };

  const signUp = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signInWithOtp = async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setDoctor(null);
  };

  const refreshDoctor = () => {
    if (session) return fetchDoctor(session.user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        doctor,
        loading,
        signUp,
        signIn,
        signInWithOtp,
        signOut,
        refreshDoctor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
