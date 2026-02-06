import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { getDayOfWeek, toDateStr, getNextNDays } from "@/lib/utils";
import { generateTimeSlots } from "@/lib/slots";

export function useBooking(slug) {
  const [doctor, setDoctor] = useState(null);
  const [services, setServices] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking state
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchDoctorData();
  }, [slug]);

  const fetchDoctorData = async () => {
    setLoading(true);
    setError(null);

    // Fetch doctor by slug
    const { data: doc, error: docErr } = await supabase
      .from("doctors")
      .select("*")
      .eq("slug", slug)
      .single();

    if (docErr || !doc) {
      setError("Doctor no encontrado");
      setLoading(false);
      return;
    }
    setDoctor(doc);

    // Fetch services and schedule in parallel
    const [svcRes, schedRes, apptRes] = await Promise.all([
      supabase
        .from("services")
        .select("*")
        .eq("doctor_id", doc.id)
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("schedules")
        .select("*")
        .eq("doctor_id", doc.id)
        .eq("active", true),
      supabase
        .from("appointments")
        .select("id, date, start_time, end_time, status")
        .eq("doctor_id", doc.id)
        .gte("date", toDateStr(new Date()))
        .not("status", "eq", "cancelled"),
    ]);

    if (svcRes.data) setServices(svcRes.data);
    if (schedRes.data) setSchedule(schedRes.data);
    if (apptRes.data) setAppointments(apptRes.data);

    setLoading(false);
  };

  // Available dates (next 14 days, only days with active schedule)
  const availableDates = useMemo(() => {
    const days = getNextNDays(14);
    return days
      .filter((d) => {
        const dow = d.getDay();
        return schedule.some((s) => s.day_of_week === dow && s.active);
      })
      .map((d) => ({
        date: toDateStr(d),
        dateObj: d,
      }));
  }, [schedule]);

  // Time slots for selected date
  const timeSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return [];
    const dow = getDayOfWeek(selectedDate);
    const daySchedule = schedule.find((s) => s.day_of_week === dow);
    if (!daySchedule) return [];

    const dayAppointments = appointments.filter(
      (a) => a.date === selectedDate
    );

    return generateTimeSlots(
      daySchedule,
      selectedService.duration_minutes,
      dayAppointments
    );
  }, [selectedDate, selectedService, schedule, appointments]);

  const bookAppointment = async ({ patientName, patientPhone, notes = "" }) => {
    if (!doctor || !selectedService || !selectedDate || !selectedTime) {
      return { error: { message: "Datos incompletos" } };
    }

    const { data, error } = await supabase.rpc("book_appointment", {
      p_doctor_id: doctor.id,
      p_service_id: selectedService.id,
      p_date: selectedDate,
      p_start_time: selectedTime,
      p_patient_name: patientName,
      p_patient_phone: patientPhone,
      p_notes: notes,
    });

    return { data, error };
  };

  const reset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  return {
    doctor,
    services,
    schedule,
    loading,
    error,
    step,
    setStep,
    selectedService,
    setSelectedService,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    availableDates,
    timeSlots,
    bookAppointment,
    reset,
  };
}
