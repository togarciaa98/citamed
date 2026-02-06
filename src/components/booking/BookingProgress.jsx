const steps = ["Servicio", "Fecha", "Hora", "Datos"];

export default function BookingProgress({ currentStep }) {
  const progressPercent = (currentStep / steps.length) * 100;

  return (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2.5">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isActive = currentStep >= stepNum;

          return (
            <span
              key={label}
              className={`text-xs font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted"
              }`}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
