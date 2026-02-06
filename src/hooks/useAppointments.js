import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { toDateStr } from "@/lib/utils";

export function useAppointments() {
  const { session } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctorId = session?.user?.id;

  const fetchAppointments = useCallback(async () => {
    if (!doctorId) return;
    const { data, error } = await supabase
      .from("appointments")
      .select(
        `
        *,
        service:services(name, duration_minutes, price),
        patient:patients(name, phone, email, notes)
      `
      )
      .eq("doctor_id", doctorId)
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (!error && data) {
      setAppointments(data);
    }
    setLoading(false);
  }, [doctorId]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Realtime subscription
  useEffect(() => {
    if (!doctorId) return;

    const channel = supabase
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments",
          filter: `doctor_id=eq.${doctorId}`,
        },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [doctorId, fetchAppointments]);

  const todayStr = toDateStr(new Date());

  const todayAppointments = useMemo(
    () =>
      appointments
        .filter((a) => a.date === todayStr)
        .sort((a, b) => a.start_time.localeCompare(b.start_time)),
    [appointments, todayStr]
  );

  const upcomingAppointments = useMemo(
    () =>
      appointments
        .filter((a) => a.date > todayStr)
        .sort((a, b) => {
          if (a.date !== b.date) return a.date.localeCompare(b.date);
          return a.start_time.localeCompare(b.start_time);
        }),
    [appointments, todayStr]
  );

  const stats = useMemo(() => {
    const today = new Date();
    const thisWeek = appointments.filter((a) => {
      const d = new Date(a.date + "T00:00");
      const diff = (d - today) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff < 7 && a.status !== "cancelled";
    });
    const revenue = thisWeek
      .filter((a) => a.status === "completed")
      .reduce((s, a) => s + (a.service?.price || 0), 0);
    const pending = appointments.filter((a) => a.status === "pending").length;
    const noShows = appointments.filter((a) => a.status === "no_show").length;
    const total = appointments.filter(
      (a) => a.status !== "cancelled"
    ).length;

    return {
      thisWeek: thisWeek.length,
      revenue,
      pending,
      noShowRate: total > 0 ? Math.round((noShows / total) * 100) : 0,
    };
  }, [appointments]);

  const updateStatus = async (appointmentId, status) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", appointmentId);

    if (!error) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === appointmentId ? { ...a, status } : a))
      );
    }
    return { error };
  };

  const createAppointment = async (data) => {
    const { error } = await supabase.from("appointments").insert({
      doctor_id: doctorId,
      ...data,
    });

    if (!error) fetchAppointments();
    return { error };
  };

  return {
    appointments,
    todayAppointments,
    upcomingAppointments,
    stats,
    loading,
    updateStatus,
    createAppointment,
    refresh: fetchAppointments,
  };
}
