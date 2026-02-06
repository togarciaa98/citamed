import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import {
  ClockIcon,
  CalendarIcon,
  CheckIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { formatDateLong, formatPrice } from "@/lib/utils";
import { getWhatsAppLink, templates } from "@/lib/whatsapp";

export default function AppointmentCard({ appointment, doctor, onUpdateStatus }) {
  const apt = appointment;
  const patientName = apt.patient?.name || "Paciente";
  const patientPhone = apt.patient?.phone || "";
  const serviceName = apt.service?.name || "Servicio";
  const servicePrice = apt.service?.price || 0;
  const serviceDuration = apt.service?.duration_minutes || 30;

  const whatsappMessage = templates.doctorConfirmation({
    patientName,
    serviceName,
    dateFormatted: formatDateLong(apt.date),
    time: apt.start_time?.slice(0, 5),
    clinicName: doctor?.clinic_name || "el consultorio",
  });

  return (
    <Card className="p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-[15px] text-dark">{patientName}</p>
          <p className="text-[13px] text-gray">
            {serviceName} · {serviceDuration} min · {formatPrice(servicePrice)}
          </p>
        </div>
        <StatusBadge status={apt.status} />
      </div>

      <div className="flex items-center gap-4 text-[13px] text-gray">
        <span className="flex items-center gap-1">
          <ClockIcon size={14} /> {apt.start_time?.slice(0, 5)}
        </span>
        <span className="flex items-center gap-1">
          <CalendarIcon size={14} /> {formatDateLong(apt.date)}
        </span>
      </div>

      {(apt.notes || apt.patient?.notes) && (
        <p className="text-xs text-accent bg-accent-light px-3 py-2 rounded-lg">
          ⚠️ {apt.notes || apt.patient?.notes}
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        {apt.status === "pending" && (
          <Button
            variant="success"
            size="sm"
            onClick={() => onUpdateStatus(apt.id, "confirmed")}
          >
            <CheckIcon size={14} /> Confirmar
          </Button>
        )}
        {(apt.status === "confirmed" || apt.status === "pending") && (
          <Button
            variant="primary"
            size="sm"
            className="bg-primary-pale text-primary hover:bg-primary-pale/80"
            onClick={() => onUpdateStatus(apt.id, "completed")}
          >
            <CheckIcon size={14} /> Completar
          </Button>
        )}
        {apt.status !== "cancelled" && apt.status !== "completed" && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onUpdateStatus(apt.id, "cancelled")}
          >
            <XIcon size={14} /> Cancelar
          </Button>
        )}
        {patientPhone && (
          <a
            href={getWhatsAppLink(patientPhone, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="sm" as="span">
              <WhatsAppIcon size={14} /> WhatsApp
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
}
