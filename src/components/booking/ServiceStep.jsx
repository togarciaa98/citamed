import Badge from "@/components/ui/Badge";
import { CheckIcon } from "@/components/ui/Icons";
import { formatPrice } from "@/lib/utils";

export default function ServiceStep({ services, selectedService, onSelect }) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-dark mb-4">
        Elige un servicio
      </h3>

      <div className="flex flex-col gap-3">
        {services.map((svc) => {
          const isSelected = selectedService?.id === svc.id;

          return (
            <button
              key={svc.id}
              onClick={() => onSelect(svc)}
              className={`flex items-center justify-between p-4 rounded-[--radius-card] border-2 bg-white text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary-light"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark text-[15px]">
                  {svc.name}
                </p>
                <Badge variant="neutral" className="mt-1.5">
                  {svc.duration_minutes} min
                </Badge>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="font-bold text-primary text-lg">
                  {formatPrice(svc.price)}
                </span>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <CheckIcon size={14} color="white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
