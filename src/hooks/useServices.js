import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export function useServices() {
  const { session } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctorId = session?.user?.id;

  const fetchServices = useCallback(async () => {
    if (!doctorId) return;
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("sort_order", { ascending: true });

    if (!error && data) setServices(data);
    setLoading(false);
  }, [doctorId]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const addService = async (service) => {
    const { data, error } = await supabase
      .from("services")
      .insert({ doctor_id: doctorId, ...service })
      .select()
      .single();

    if (!error && data) {
      setServices((prev) => [...prev, data]);
    }
    return { data, error };
  };

  const updateService = async (serviceId, updates) => {
    const { error } = await supabase
      .from("services")
      .update(updates)
      .eq("id", serviceId);

    if (!error) {
      setServices((prev) =>
        prev.map((s) => (s.id === serviceId ? { ...s, ...updates } : s))
      );
    }
    return { error };
  };

  const deleteService = async (serviceId) => {
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceId);

    if (!error) {
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
    }
    return { error };
  };

  return {
    services,
    loading,
    addService,
    updateService,
    deleteService,
    refresh: fetchServices,
  };
}
