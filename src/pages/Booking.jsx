import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBooking } from "@/hooks/useBooking";
import BookingHeader from "@/components/booking/BookingHeader";
import BookingProgress from "@/components/booking/BookingProgress";
import ServiceStep from "@/components/booking/ServiceStep";
import DateStep from "@/components/booking/DateStep";
import TimeStep from "@/components/booking/TimeStep";
import PatientInfoStep from "@/components/booking/PatientInfoStep";
import BookingSuccess from "@/components/booking/BookingSuccess";
import { Skeleton, SkeletonLine } from "@/components/ui/Skeleton";
import { BRAND } from "@/lib/constants";
import toast from "react-hot-toast";

export default function Booking() {
  const { slug } = useParams();
  const {
    doctor,
    services,
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
  } = useBooking(slug);

  const [booked, setBooked] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        {/* Header skeleton */}
        <div className="bg-white border-b border-border px-5 pt-8 pb-6">
          <div className="max-w-lg mx-auto flex flex-col items-center">
            <Skeleton className="w-16 h-16 rounded-full" />
            <SkeletonLine className="h-5 w-40 mt-4" />
            <SkeletonLine className="h-4 w-28 mt-2" />
            <SkeletonLine className="h-3 w-52 mt-2" />
          </div>
        </div>
        {/* Content skeleton */}
        <div className="max-w-lg mx-auto px-5 pt-6">
          <SkeletonLine className="h-1.5 w-full rounded-full mb-6" />
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-[--radius-card]" />
            <Skeleton className="h-20 w-full rounded-[--radius-card]" />
            <Skeleton className="h-20 w-full rounded-[--radius-card]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-5">
        <div className="bg-white rounded-[--radius-card] p-8 text-center max-w-md shadow-sm border border-border">
          <div className="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">?</span>
          </div>
          <h2 className="font-semibold text-xl text-dark mb-2">
            Doctor no encontrado
          </h2>
          <p className="text-gray text-sm mb-4">
            El link que usaste no es v\u00e1lido o el doctor ya no est\u00e1 disponible.
          </p>
          <Link
            to="/"
            className="text-primary font-semibold hover:underline text-sm"
          >
            Ir a la p\u00e1gina principal
          </Link>
        </div>
      </div>
    );
  }

  if (booked) {
    return (
      <BookingSuccess
        doctor={doctor}
        selectedService={selectedService}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        patientName={patientName}
      />
    );
  }

  const handleSelectService = (svc) => {
    setSelectedService(svc);
    setStep(2);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setStep(3);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleSubmit = async ({ patientName: name, patientPhone, notes }) => {
    setSubmitting(true);
    setPatientName(name);
    const { error } = await bookAppointment({
      patientName: name,
      patientPhone,
      notes,
    });
    if (error) {
      toast.error(error.message || "Error al agendar. Intenta de nuevo.");
    } else {
      setBooked(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-bg">
      <BookingHeader doctor={doctor} />

      <div className="max-w-lg mx-auto px-5 pt-6 pb-10">
        <BookingProgress currentStep={step} />

        {step === 1 && (
          <ServiceStep
            services={services}
            selectedService={selectedService}
            onSelect={handleSelectService}
          />
        )}

        {step === 2 && (
          <DateStep
            availableDates={availableDates}
            selectedDate={selectedDate}
            onSelect={handleSelectDate}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <TimeStep
            timeSlots={timeSlots}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelect={handleSelectTime}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <PatientInfoStep
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSubmit={handleSubmit}
            onBack={() => setStep(3)}
            submitting={submitting}
          />
        )}

        <p className="text-center text-xs text-muted mt-8">
          Powered by{" "}
          <strong className="text-primary">{BRAND.name}</strong>
        </p>
      </div>
    </div>
  );
}
