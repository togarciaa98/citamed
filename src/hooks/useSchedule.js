import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export function useSchedule() {
  const { session } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctorId = session?.user?.id;

  const fetchSchedule = useCallback(async () => {
    if (!doctorId) return;
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("doctor_id", doctorId)
      .order("day_of_week", { ascending: true });

    if (!error && data) setSchedule(data);
    setLoading(false);
  }, [doctorId]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const getScheduleForDay = (dayOfWeek) => {
    return schedule.find((s) => s.day_of_week === dayOfWeek) || null;
  };

  const updateDay = async (dayOfWeek, updates) => {
    const existing = schedule.find((s) => s.day_of_week === dayOfWeek);

    if (existing) {
      const { error } = await supabase
        .from("schedules")
        .update(updates)
        .eq("id", existing.id);

      if (!error) {
        setSchedule((prev) =>
          prev.map((s) =>
            s.day_of_week === dayOfWeek ? { ...s, ...updates } : s
          )
        );
      }
      return { error };
    } else {
      const { data, error } = await supabase
        .from("schedules")
        .insert({
          doctor_id: doctorId,
          day_of_week: dayOfWeek,
          ...updates,
        })
        .select()
        .single();

      if (!error && data) {
        setSchedule((prev) => [...prev, data].sort((a, b) => a.day_of_week - b.day_of_week));
      }
      return { error };
    }
  };

  return {
    schedule,
    loading,
    getScheduleForDay,
    updateDay,
    refresh: fetchSchedule,
  };
}
