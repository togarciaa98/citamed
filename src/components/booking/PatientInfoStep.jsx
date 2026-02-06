import { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { formatDateLong, formatPrice } from "@/lib/utils";

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
    if (!patientName || !patientPhone) return;
    onSubmit({ patientName, patientPhone, notes: patientNotes });
  };

  return (
    <Card className="p-6">
      <h3 className="font-display text-xl text-dark mb-1">Tus datos</h3>
      <p className="text-gray text-sm mb-5">Para confirmar tu cita</p>

      {/* Summary */}
      <div className="bg-primary-pale rounded-[--radius-button] p-4 mb-5 space-y-1">
        <div className="flex justify-between">
          <span className="text-[13px] text-gray">Servicio</span>
          <span className="text-[13px] font-semibold text-dark">
            {selectedService.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[13px] text-gray">Fecha</span>
          <span className="text-[13px] font-semibold text-dark capitalize">
            {formatDateLong(selectedDate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[13px] text-gray">Hora</span>
          <span className="text-[13px] font-semibold text-dark">
            {selectedTime}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[13px] text-gray">Precio</span>
          <span className="text-[13px] font-bold text-primary">
            {formatPrice(selectedService.price)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <Input
          label="Nombre completo *"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Ej: María García López"
        />
        <Input
          label="Teléfono (WhatsApp) *"
          type="tel"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
          placeholder="Ej: 2221234567"
        />
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5">
            Notas (opcional)
          </label>
          <textarea
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
            placeholder="Alergias, medicamentos, etc."
            rows={3}
            className="w-full px-4 py-3 rounded-[10px] border-2 border-gray-light text-[15px] outline-none focus:border-primary resize-y font-[inherit]"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!patientName || !patientPhone || submitting}
        className="w-full mt-5"
      >
        {submitting ? "Agendando..." : "Agendar Cita"}
      </Button>
      <button
        onClick={onBack}
        className="block w-full mt-3 text-primary text-sm font-medium hover:underline cursor-pointer text-center"
      >
        ← Cambiar horario
      </button>
    </Card>
  );
}
