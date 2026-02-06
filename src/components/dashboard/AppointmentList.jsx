import AppointmentCard from "./AppointmentCard";
import { CalendarIcon } from "@/components/ui/Icons";

export default function AppointmentList({
  appointments,
  doctor,
  onUpdateStatus,
  emptyMessage = "No hay citas",
}) {
  if (!appointments.length) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-gray-light flex items-center justify-center mx-auto mb-4">
          <CalendarIcon size={28} className="text-muted" />
        </div>
        <p className="text-gray text-sm">{emptyMessage}</p>
        <p className="text-muted text-xs mt-1">Las nuevas citas aparecerán aquí</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[39px] sm:left-[47px] top-4 bottom-4 w-px bg-border hidden sm:block" />

      <div className="flex flex-col gap-3">
        {appointments.map((apt) => (
          <AppointmentCard
            key={apt.id}
            appointment={apt}
            doctor={doctor}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
}
