import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckIcon, WhatsAppIcon, DownloadIcon, CalendarIcon, ClockIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";
import { formatDateLong } from "@/lib/utils";
import { getWhatsAppLink, templates } from "@/lib/whatsapp";
import { generateICSFile } from "@/lib/ics";

export default function BookingSuccess({
  doctor,
  selectedService,
  selectedDate,
  selectedTime,
  patientName,
}) {
  const dateFormatted = formatDateLong(selectedDate);

  const whatsappMessage = templates.patientBooked({
    patientName,
    serviceName: selectedService.name,
    dateFormatted,
    time: selectedTime,
  });

  const handleDownloadICS = () => {
    // Calculate end time from service duration
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + (selectedService.duration_minutes || 30);
    const endHours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const endMins = String(totalMinutes % 60).padStart(2, "0");
    const endTime = `${endHours}:${endMins}`;

    generateICSFile({
      title: `Cita: ${selectedService.name} - ${doctor.name}`,
      description: `Cita m\u00e9dica de ${selectedService.name} con ${doctor.name}. Paciente: ${patientName}.`,
      startDate: selectedDate,
      startTime: selectedTime,
      endTime,
      location: doctor.address || "",
    });
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-5">
      <div className="bg-white rounded-[--radius-card] p-8 max-w-md w-full text-center shadow-sm border border-border">
        {/* Animated success circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
          >
            <CheckIcon size={40} color="var(--color-success)" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-semibold text-2xl text-dark mb-2">
            {"\u00a1"}Cita agendada!
          </h2>
          <p className="text-gray text-sm leading-relaxed mb-6">
            Tu cita ha sido registrada. El consultorio confirmar\u00e1 pronto.
          </p>
        </motion.div>

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-bg rounded-xl p-4 mb-6 text-left space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray">Servicio</span>
            <span className="text-sm font-semibold text-dark">
              {selectedService.name}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray flex items-center gap-1.5">
              <CalendarIcon size={14} />
              Fecha
            </span>
            <span className="text-sm font-semibold text-dark capitalize">
              {dateFormatted}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray flex items-center gap-1.5">
              <ClockIcon size={14} />
              Hora
            </span>
            <span className="text-sm font-semibold text-dark">
              {selectedTime}
            </span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <a
            href={getWhatsAppLink(doctor.phone, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-[--radius-button] px-6 py-3 text-sm font-semibold hover:brightness-110 transition-all no-underline"
          >
            <WhatsAppIcon size={20} />
            Confirmar por WhatsApp
          </a>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleDownloadICS}
          >
            <DownloadIcon size={18} />
            Agregar al calendario
          </Button>

          <Link
            to="/"
            className="block text-sm text-primary font-medium hover:underline mt-4"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
