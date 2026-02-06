import { CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { formatDateLong, formatPrice } from "@/lib/utils";
import { getWhatsAppLink, templates } from "@/lib/whatsapp";

export default function BookingSuccess({
  doctor,
  selectedService,
  selectedDate,
  selectedTime,
  patientName,
}) {
  const whatsappMessage = templates.patientBooked({
    patientName,
    serviceName: selectedService.name,
    dateFormatted: formatDateLong(selectedDate),
    time: selectedTime,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-pale to-[#f0fffe] flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-12 max-w-[480px] w-full text-center shadow-xl">
        <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mx-auto mb-6">
          <CheckIcon size={40} color="var(--color-success)" />
        </div>
        <h2 className="font-display text-[28px] text-dark mb-2">
          ¡Cita Agendada!
        </h2>
        <p className="text-gray leading-relaxed mb-6">
          Tu cita para <strong>{selectedService.name}</strong> el{" "}
          <strong className="capitalize">{formatDateLong(selectedDate)}</strong>{" "}
          a las <strong>{selectedTime}</strong> ha sido registrada. El
          consultorio confirmará tu cita pronto.
        </p>

        <div className="bg-gray-light rounded-[--radius-button] p-4 mb-6 text-left">
          <p className="text-[13px] text-gray mb-1">Precio estimado</p>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(selectedService.price)}
          </p>
        </div>

        <a
          href={getWhatsAppLink(doctor.phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-[--radius-button] px-7 py-3.5 text-[15px] font-semibold hover:brightness-110 transition-all no-underline"
        >
          <WhatsAppIcon size={20} /> Confirmar por WhatsApp
        </a>
      </div>
    </div>
  );
}
