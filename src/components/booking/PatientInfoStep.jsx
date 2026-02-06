import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ChevronLeftIcon, CalendarIcon, ClockIcon } from "@/components/ui/Icons";
import { formatDateLong } from "@/lib/utils";

export default function PatientInfoStep({
  selectedService,
  selectedDate,
  selectedTime,
  onSubmit,
  onBack,
  submitting,
}) {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  const handleSubmit = () => {
    if (!patientName.trim() || !patientPhone.trim()) return;
    onSubmit({ patientName, patientPhone, notes: patientNotes });
  };

  return (
    <div>
      <h3 className="font-semibold text-lg text-dark mb-4">Tus datos</h3>

      {/* Summary card */}
      <div className="bg-bg rounded-xl p-4 mb-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray">Servicio</span>
          <span className="text-sm font-semibold text-dark">
            {selectedService.name}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray flex items-center gap-1.5">
            <CalendarIcon size={14} />
            Fecha
          </span>
          <span className="text-sm font-semibold text-dark capitalize">
            {formatDateLong(selectedDate)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray flex items-center gap-1.5">
            <ClockIcon size={14} />
            Hora
          </span>
          <span className="text-sm font-semibold text-dark">
            {selectedTime}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <Input
          label="Nombre completo *"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Ej: Mar\u00eda Garc\u00eda L\u00f3pez"
        />
        <Input
          label="Tel\u00e9fono (WhatsApp) *"
          type="tel"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
          placeholder="222 123 4567"
        />
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Notas (opcional)
          </label>
          <textarea
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
            placeholder="Alergias, medicamentos, etc."
            rows={3}
            className="w-full px-4 py-2.5 rounded-[10px] border border-border text-sm text-dark outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-muted resize-y font-[inherit]"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!patientName.trim() || !patientPhone.trim() || submitting}
        className="w-full mt-5"
        size="lg"
      >
        {submitting ? "Agendando..." : "Confirmar Cita"}
      </Button>

      <div className="mt-3 text-center">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeftIcon size={16} />
          Cambiar horario
        </Button>
      </div>
    </div>
  );
}
