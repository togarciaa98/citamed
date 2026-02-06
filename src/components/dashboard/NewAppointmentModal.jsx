import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function NewAppointmentModal({
  isOpen,
  onClose,
  services,
  onSubmit,
}) {
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    date: "",
    time: "",
    serviceId: services[0]?.id || "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientName || !form.date || !form.time || !form.serviceId) {
      toast.error("Completa los campos obligatorios");
      return;
    }
    setSubmitting(true);

    const service = services.find((s) => s.id === form.serviceId);
    const startMinutes =
      parseInt(form.time.split(":")[0]) * 60 +
      parseInt(form.time.split(":")[1]);
    const endMinutes = startMinutes + (service?.duration_minutes || 30);
    const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;

    const { error } = await onSubmit({
      service_id: form.serviceId,
      date: form.date,
      start_time: form.time,
      end_time: endTime,
      status: "confirmed",
      notes: form.notes,
      patient_name: form.patientName,
      patient_phone: form.patientPhone,
    });

    if (error) {
      toast.error("Error al crear cita: " + error.message);
    } else {
      toast.success("Cita creada");
      setForm({
        patientName: "",
        patientPhone: "",
        date: "",
        time: "",
        serviceId: services[0]?.id || "",
        notes: "",
      });
      onClose();
    }
    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Cita Manual">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Nombre del paciente *"
            value={form.patientName}
            onChange={(e) =>
              setForm({ ...form, patientName: e.target.value })
            }
            placeholder="María García"
          />
          <Input
            label="Teléfono"
            value={form.patientPhone}
            onChange={(e) =>
              setForm({ ...form, patientPhone: e.target.value })
            }
            placeholder="2221234567"
          />
          <Input
            label="Fecha *"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Input
            label="Hora *"
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Servicio
          </label>
          <select
            value={form.serviceId}
            onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
            className="w-full px-4 py-2.5 rounded-[10px] border border-border text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Notas (opcional)
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Alergias, indicaciones especiales..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-[10px] border border-border text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-vertical font-[inherit] transition-all"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={submitting} className="flex-1">
            {submitting ? "Creando..." : "Agregar Cita"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
