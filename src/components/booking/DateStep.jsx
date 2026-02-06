import { format } from "date-fns";
import { es } from "date-fns/locale";
import Card from "@/components/ui/Card";

export default function DateStep({ availableDates, onSelect, onBack }) {
  return (
    <Card className="p-6">
      <h3 className="font-display text-xl text-dark mb-1">
        ¿Qué día te funciona?
      </h3>
      <p className="text-gray text-sm mb-5">Próximos 14 días disponibles</p>
      <div className="grid grid-cols-3 gap-3">
        {availableDates.map((d) => (
          <button
            key={d.date}
            onClick={() => onSelect(d.date)}
            className="p-3.5 rounded-[--radius-button] border-2 border-gray-light bg-white text-center transition-all hover:border-primary hover:bg-primary-pale cursor-pointer"
          >
            <p className="text-xs text-gray capitalize mb-0.5">
              {format(d.dateObj, "EEEE", { locale: es })}
            </p>
            <p className="font-bold text-dark text-sm">
              {format(d.dateObj, "d MMM", { locale: es })}
            </p>
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-4 text-primary text-sm font-medium hover:underline cursor-pointer"
      >
        ← Cambiar servicio
      </button>
    </Card>
  );
}
