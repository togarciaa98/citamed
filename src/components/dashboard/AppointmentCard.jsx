import StatusBadge from "@/components/ui/StatusBadge";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  CheckIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { formatDateShort, formatPrice } from "@/lib/utils";
import { getWhatsAppLink, templates } from "@/lib/whatsapp";

export default function AppointmentCard({ appointment, doctor, onUpdateStatus }) {
  const apt = appointment;
  const patientName = apt.patient?.name || "Paciente";
  const patientPhone = apt.patient?.phone || "";
  const patientNotes = apt.patient?.notes || "";
  const serviceName = apt.service?.name || "Servicio";
  const servicePrice = apt.service?.price || 0;
  const serviceDuration = apt.service?.duration_minutes || 30;
  const time = apt.start_time?.slice(0, 5) || "";

  const whatsappMessage = templates.doctorConfirmation({
    patientName,
    serviceName,
    dateFormatted: formatDateShort(apt.date),
    time,
    clinicName: doctor?.clinic_name || "el consultorio",
  });

  return (
    <div className="bg-white rounded-[--radius-card] border border-border hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Time column */}
        <div className="w-20 sm:w-24 shrink-0 flex flex-col items-center justify-center py-4 border-r border-border">
          <span className="text-lg sm:text-xl font-bold text-dark leading-none">
            {time}
          </span>
          <span className="text-[11px] text-muted mt-0.5">
            {serviceDuration} min
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <p className="font-semibold text-dark text-[15px] truncate">
                {patientName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="primary">{serviceName}</Badge>
                <span className="text-xs text-muted">
                  {formatDateShort(apt.date)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-muted font-medium">
                {formatPrice(servicePrice)}
              </span>
              <StatusBadge status={apt.status} />
            </div>
          </div>

          {/* Medical notes */}
          {(apt.notes || patientNotes) && (
            <div className="mb-3">
              <Badge variant="danger" className="text-[11px]">
                ⚠ {apt.notes || patientNotes}
              </Badge>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
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
                variant="outline"
                size="sm"
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
            <div className="flex-1" />
            {patientPhone && (
              <a
                href={getWhatsAppLink(patientPhone, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="sm">
                  <WhatsAppIcon size={14} /> WhatsApp
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
