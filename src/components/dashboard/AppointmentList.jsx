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
      <div className="text-center py-12 text-gray">
        <CalendarIcon size={48} color="var(--color-gray-light)" className="mx-auto" />
        <p className="mt-3 text-[15px]">{emptyMessage}</p>
      </div>
    );
  }

  return (
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
  );
}
