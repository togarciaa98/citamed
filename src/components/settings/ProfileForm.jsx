import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Avatar from "@/components/ui/Avatar";
import toast from "react-hot-toast";

export default function ProfileForm({ doctor, onSave }) {
  const [form, setForm] = useState({
    name: doctor?.name || "",
    specialty: doctor?.specialty || "",
    clinic_name: doctor?.clinic_name || "",
    address: doctor?.address || "",
    phone: doctor?.phone || "",
    city: doctor?.city || "Puebla",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("doctors")
      .update(form)
      .eq("id", doctor.id);

    if (error) {
      toast.error("Error: " + error.message);
    } else {
      toast.success("Perfil actualizado");
      onSave();
    }
    setSaving(false);
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg text-dark mb-6">
        Información del consultorio
      </h3>

      {/* Avatar area */}
      <div className="flex flex-col items-center mb-8">
        <Avatar
          name={doctor?.name || "Doctor"}
          imageUrl={doctor?.photo_url}
          size="xl"
        />
        <p className="text-sm text-muted mt-2 cursor-pointer hover:text-primary transition-colors">
          Cambiar foto
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-lg">
        <Input
          label="Nombre completo"
          value={form.name}
          onChange={handleChange("name")}
          placeholder="Dr. Juan Pérez"
        />
        <Input
          label="Especialidad"
          value={form.specialty}
          onChange={handleChange("specialty")}
          placeholder="Medicina General"
        />
        <Input
          label="Nombre del consultorio"
          value={form.clinic_name}
          onChange={handleChange("clinic_name")}
          placeholder="Consultorio Médico Pérez"
        />
        <Input
          label="Dirección"
          value={form.address}
          onChange={handleChange("address")}
          placeholder="Av. Reforma 123, Col. Centro"
        />
        <Input
          label="Teléfono (WhatsApp)"
          value={form.phone}
          onChange={handleChange("phone")}
          placeholder="2221234567"
        />
        <Input
          label="Ciudad"
          value={form.city}
          onChange={handleChange("city")}
          placeholder="Puebla"
        />
        <Button type="submit" disabled={saving} className="self-start mt-2">
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </Card>
  );
}
