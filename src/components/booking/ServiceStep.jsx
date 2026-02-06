import Card from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

export default function ServiceStep({ services, onSelect }) {
  return (
    <Card className="p-6">
      <h3 className="font-display text-xl text-dark mb-1">
        ¿Qué servicio necesitas?
      </h3>
      <p className="text-gray text-sm mb-5">
        Selecciona el tratamiento que deseas agendar
      </p>
      <div className="flex flex-col gap-3">
        {services.map((svc) => (
          <button
            key={svc.id}
            onClick={() => onSelect(svc)}
            className="flex justify-between items-center p-4 rounded-[--radius-button] border-2 border-gray-light bg-white text-left transition-all hover:border-primary hover:bg-primary-pale cursor-pointer"
          >
            <div>
              <p className="font-semibold text-dark text-[15px]">{svc.name}</p>
              <p className="text-[13px] text-gray">{svc.duration_minutes} min</p>
            </div>
            <span className="font-bold text-primary text-[16px]">
              {formatPrice(svc.price)}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
