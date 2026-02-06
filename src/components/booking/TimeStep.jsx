import Card from "@/components/ui/Card";
import { formatDateLong } from "@/lib/utils";

export default function TimeStep({
  timeSlots,
  selectedDate,
  onSelect,
  onBack,
}) {
  return (
    <Card className="p-6">
      <h3 className="font-display text-xl text-dark mb-1">
        Elige tu horario
      </h3>
      <p className="text-gray text-sm mb-5 capitalize">
        {formatDateLong(selectedDate)}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            disabled={!slot.available}
            onClick={() => onSelect(slot.time)}
            className={`py-3 px-1 rounded-[10px] border-2 font-semibold text-sm transition-all ${
              slot.available
                ? "border-gray-light bg-white text-dark hover:border-primary hover:bg-primary-pale cursor-pointer"
                : "border-transparent bg-gray-light text-gray-light line-through cursor-not-allowed"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
      {timeSlots.length === 0 && (
        <p className="text-center text-gray text-sm py-8">
          No hay horarios disponibles para esta fecha
        </p>
      )}
      <button
        onClick={onBack}
        className="mt-4 text-primary text-sm font-medium hover:underline cursor-pointer"
      >
        ← Cambiar fecha
      </button>
    </Card>
  );
}
