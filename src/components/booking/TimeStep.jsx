import { formatDateLong } from "@/lib/utils";
import { ChevronLeftIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";

export default function TimeStep({
  timeSlots,
  selectedDate,
  selectedTime,
  onSelect,
  onBack,
}) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-dark mb-1">Elige un horario</h3>
      <p className="text-gray text-sm mb-4 capitalize">
        {formatDateLong(selectedDate)}
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {timeSlots.map((slot) => {
          const isSelected = selectedTime === slot.time;

          let slotClass =
            "py-3 px-1 rounded-[--radius-button] border font-semibold text-sm text-center transition-all";

          if (isSelected) {
            slotClass += " bg-primary text-white border-primary";
          } else if (slot.available) {
            slotClass +=
              " bg-white border-border text-dark hover:border-primary cursor-pointer";
          } else {
            slotClass +=
              " bg-bg text-muted line-through opacity-50 border-transparent cursor-not-allowed";
          }

          return (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => onSelect(slot.time)}
              className={slotClass}
            >
              {slot.time}
            </button>
          );
        })}
      </div>

      {timeSlots.length === 0 && (
        <p className="text-center text-gray text-sm py-8">
          No hay horarios disponibles para esta fecha
        </p>
      )}

      <div className="mt-5">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeftIcon size={16} />
          Cambiar fecha
        </Button>
      </div>
    </div>
  );
}
