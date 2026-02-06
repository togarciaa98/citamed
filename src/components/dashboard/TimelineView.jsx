import Badge from "@/components/ui/Badge";
import StatusBadge from "@/components/ui/StatusBadge";
import { PlusIcon } from "@/components/ui/Icons";

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7am to 7pm

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

export default function TimelineView({ appointments, onAddClick }) {
  return (
    <div className="bg-white rounded-[--radius-card] border border-border overflow-hidden">
      {HOURS.map((hour) => {
        const hourStr = `${String(hour).padStart(2, "0")}:00`;
        const hourEnd = (hour + 1) * 60;
        const hourStart = hour * 60;

        const hourAppointments = appointments.filter((apt) => {
          const aptStart = timeToMinutes(apt.start_time);
          return aptStart >= hourStart && aptStart < hourEnd;
        });

        return (
          <div
            key={hour}
            className="flex border-b border-border last:border-b-0 min-h-[60px] group"
          >
            {/* Hour label */}
            <div className="w-16 sm:w-20 shrink-0 py-3 px-3 text-xs text-muted font-medium text-right border-r border-border">
              {hourStr}
            </div>

            {/* Slot content */}
            <div className="flex-1 p-2 relative">
              {hourAppointments.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {hourAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-primary-light border border-primary/10"
                    >
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-dark truncate block">
                          {apt.patient?.name || "Paciente"}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="primary" className="text-[10px]">
                            {apt.service?.name || "Servicio"}
                          </Badge>
                          <span className="text-[11px] text-muted">
                            {apt.start_time?.slice(0, 5)} - {apt.end_time?.slice(0, 5)}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={apt.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => onAddClick?.()}
                  className="w-full h-full min-h-[44px] flex items-center justify-center rounded-lg text-xs text-muted opacity-0 group-hover:opacity-100 hover:bg-gray-light transition-all cursor-pointer"
                >
                  <PlusIcon size={14} className="mr-1" /> Agregar cita
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
