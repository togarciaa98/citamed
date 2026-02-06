import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export function usePatients() {
  const { session } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctorId = session?.user?.id;

  const fetchPatients = useCallback(async () => {
    if (!doctorId) return;
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("created_at", { ascending: false });

    if (!error && data) setPatients(data);
    setLoading(false);
  }, [doctorId]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const searchPatients = async (query) => {
    if (!doctorId || !query.trim()) {
      fetchPatients();
      return;
    }
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("doctor_id", doctorId)
      .or(`name.ilike.%${query}%,phone.ilike.%${query}%`)
      .order("name", { ascending: true });

    if (!error && data) setPatients(data);
  };

  const getPatientHistory = async (patientId) => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*, service:services(name, price)")
      .eq("patient_id", patientId)
      .order("date", { ascending: false });

    return { data: data || [], error };
  };

  const updatePatient = async (patientId, updates) => {
    const { error } = await supabase
      .from("patients")
      .update(updates)
      .eq("id", patientId);

    if (!error) {
      setPatients((prev) =>
        prev.map((p) => (p.id === patientId ? { ...p, ...updates } : p))
      );
    }
    return { error };
  };

  return {
    patients,
    loading,
    searchPatients,
    getPatientHistory,
    updatePatient,
    refresh: fetchPatients,
  };
}
