const steps = ["Servicio", "Fecha", "Hora", "Datos"];

export default function BookingProgress({ currentStep }) {
  return (
    <div className="bg-white rounded-[--radius-card] p-4 shadow-sm flex justify-between mb-5">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = currentStep > stepNum;
        const isCurrent = currentStep === stepNum;

        return (
          <div key={i} className="text-center flex-1">
            <div
              className={`w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-[13px] font-bold transition-all ${
                isCompleted
                  ? "bg-success text-white"
                  : isCurrent
                  ? "bg-primary text-white"
                  : "bg-gray-light text-gray"
              }`}
            >
              {isCompleted ? "✓" : stepNum}
            </div>
            <span
              className={`text-[11px] ${
                isCurrent
                  ? "text-primary font-semibold"
                  : "text-gray font-normal"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
