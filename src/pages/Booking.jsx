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
      <div className="min-h-screen bg-gradient-to-br from-primary-pale to-[#f0fffe] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-pale to-[#f0fffe] flex items-center justify-center p-5">
        <div className="bg-white rounded-[--radius-card] p-8 text-center max-w-md shadow-lg">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="font-display text-xl text-dark mb-2">
            Doctor no encontrado
          </h2>
          <p className="text-gray text-sm mb-4">
            El link que usaste no es válido o el doctor ya no está disponible.
          </p>
          <Link
            to="/"
            className="text-primary font-semibold hover:underline text-sm"
          >
            Ir a la página principal
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
    <div className="min-h-screen bg-gradient-to-br from-primary-pale to-[#f0fffe]">
      {/* OG Meta tags are handled in index.html for SSR/SSG -
          for SPA we rely on the meta tags in index.html */}

      <BookingHeader doctor={doctor} />

      <div className="max-w-[540px] mx-auto -mt-6 px-5 pb-10 relative z-[2]">
        <BookingProgress currentStep={step} />

        {step === 1 && (
          <ServiceStep services={services} onSelect={handleSelectService} />
        )}

        {step === 2 && (
          <DateStep
            availableDates={availableDates}
            onSelect={handleSelectDate}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <TimeStep
            timeSlots={timeSlots}
            selectedDate={selectedDate}
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

        <p className="text-center text-xs text-gray mt-6 pb-10">
          Powered by{" "}
          <strong className="text-primary">{BRAND.name}</strong> · Sistema de
          citas médicas
        </p>
      </div>
    </div>
  );
}
