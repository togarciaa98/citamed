import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useSchedule } from "@/hooks/useSchedule";
import { supabase } from "@/lib/supabase";
import { DAY_NAMES_ES, PLANS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PageTransition from "@/components/ui/PageTransition";
import {
  CopyIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  QRIcon,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";

export default function Settings() {
  const { doctor, refreshDoctor } = useAuth();
  const { services, addService, updateService, deleteService } = useServices();
  const { schedule, updateDay } = useSchedule();
  const [activeTab, setActiveTab] = useState("profile");
  const [showQR, setShowQR] = useState(false);

  const tabs = [
    { key: "profile", label: "Perfil" },
    { key: "services", label: "Servicios" },
    { key: "schedule", label: "Horarios" },
    { key: "link", label: "Link" },
    { key: "plan", label: "Plan" },
  ];

  const publicUrl = `${window.location.origin}/citas/${doctor?.slug || ""}`;

  return (
    <DashboardLayout>
      <PageTransition>
        <h2 className="font-display text-xl sm:text-2xl text-dark mb-6">
          Configuración
        </h2>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-[--radius-button] p-1 shadow-sm mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "bg-primary text-white"
                  : "text-gray hover:text-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && <ProfileTab doctor={doctor} onSave={refreshDoctor} />}

        {/* Services Tab */}
        {activeTab === "services" && (
          <ServicesTab
            services={services}
            onAdd={addService}
            onUpdate={updateService}
            onDelete={deleteService}
          />
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <ScheduleTab schedule={schedule} onUpdate={updateDay} />
        )}

        {/* Link Tab */}
        {activeTab === "link" && (
          <LinkTab publicUrl={publicUrl} showQR={showQR} setShowQR={setShowQR} />
        )}

        {/* Plan Tab */}
        {activeTab === "plan" && <PlanTab doctor={doctor} />}
      </PageTransition>
    </DashboardLayout>
  );
}

function ProfileTab({ doctor, onSave }) {
  const [form, setForm] = useState({
    name: doctor?.name || "",
    specialty: doctor?.specialty || "",
    clinic_name: doctor?.clinic_name || "",
    address: doctor?.address || "",
    phone: doctor?.phone || "",
    city: doctor?.city || "Puebla",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("doctors")
      .update(form)
      .eq("id", doctor.id);

    if (error) toast.error("Error: " + error.message);
    else {
      toast.success("Perfil actualizado");
      onSave();
    }
    setSaving(false);
  };

  return (
    <Card className="p-6">
      <h3 className="font-display text-lg text-dark mb-4">
        Información del consultorio
      </h3>
      <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-lg">
        <Input
          label="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Especialidad"
          value={form.specialty}
          onChange={(e) => setForm({ ...form, specialty: e.target.value })}
        />
        <Input
          label="Nombre del consultorio"
          value={form.clinic_name}
          onChange={(e) => setForm({ ...form, clinic_name: e.target.value })}
        />
        <Input
          label="Dirección"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <Input
          label="Teléfono (WhatsApp)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          label="Ciudad"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <Button type="submit" disabled={saving} className="self-start">
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </form>
    </Card>
  );
}

function ServicesTab({ services, onAdd, onUpdate, onDelete }) {
  const [newName, setNewName] = useState("");
  const [newDuration, setNewDuration] = useState(30);
  const [newPrice, setNewPrice] = useState(500);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const { error } = await onAdd({
      name: newName,
      duration_minutes: newDuration,
      price: newPrice,
      sort_order: services.length,
    });
    if (error) toast.error("Error: " + error.message);
    else {
      toast.success("Servicio agregado");
      setNewName("");
      setNewDuration(30);
      setNewPrice(500);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await onDelete(id);
    if (error) toast.error("Error: " + error.message);
    else toast.success("Servicio eliminado");
  };

  const handleToggle = async (svc) => {
    await onUpdate(svc.id, { active: !svc.active });
  };

  return (
    <Card className="p-6">
      <h3 className="font-display text-lg text-dark mb-4">Servicios</h3>

      {/* Existing services */}
      <div className="flex flex-col gap-3 mb-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className={`flex items-center justify-between p-4 rounded-[--radius-button] border-2 ${
              svc.active ? "border-gray-light" : "border-gray-light/50 opacity-50"
            }`}
          >
            <div>
              <p className="font-semibold text-dark text-sm">{svc.name}</p>
              <p className="text-xs text-gray">
                {svc.duration_minutes} min · {formatPrice(svc.price)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(svc)}
                className={`w-8 h-5 rounded-full relative transition-all cursor-pointer ${
                  svc.active ? "bg-primary" : "bg-gray-light"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${
                    svc.active ? "left-3.5" : "left-0.5"
                  }`}
                />
              </button>
              <button
                onClick={() => handleDelete(svc.id)}
                className="p-1.5 text-danger hover:bg-danger-light rounded-lg cursor-pointer"
              >
                <TrashIcon size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add new */}
      <div className="border-t border-gray-light pt-4">
        <h4 className="text-sm font-semibold text-dark mb-3">
          Agregar servicio
        </h4>
        <div className="flex gap-2 items-end flex-wrap">
          <div className="flex-1 min-w-[150px]">
            <Input
              label="Nombre"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ej: Consulta General"
            />
          </div>
          <div className="w-20">
            <Input
              label="Min"
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(Number(e.target.value))}
            />
          </div>
          <div className="w-24">
            <Input
              label="Precio"
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleAdd} size="md">
            <PlusIcon size={14} /> Agregar
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ScheduleTab({ schedule, onUpdate }) {
  const handleToggle = async (dayOfWeek) => {
    const existing = schedule.find((s) => s.day_of_week === dayOfWeek);
    if (existing) {
      await onUpdate(dayOfWeek, { active: !existing.active });
    } else {
      await onUpdate(dayOfWeek, {
        start_time: "09:00",
        end_time: "18:00",
        active: true,
      });
    }
  };

  const handleTimeChange = async (dayOfWeek, field, value) => {
    await onUpdate(dayOfWeek, { [field]: value });
  };

  return (
    <Card className="p-6">
      <h3 className="font-display text-lg text-dark mb-4">Horario semanal</h3>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 7 }, (_, i) => {
          const day = schedule.find((s) => s.day_of_week === i);
          const isActive = day?.active || false;

          return (
            <div key={i} className="flex items-center gap-3 py-2">
              <button
                onClick={() => handleToggle(i)}
                className={`w-10 h-6 rounded-full relative transition-all cursor-pointer flex-shrink-0 ${
                  isActive ? "bg-primary" : "bg-gray-light"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${
                    isActive ? "left-4.5" : "left-0.5"
                  }`}
                />
              </button>
              <span
                className={`w-28 text-sm capitalize ${
                  isActive ? "text-dark font-medium" : "text-gray"
                }`}
              >
                {DAY_NAMES_ES[i]}
              </span>
              {isActive && day && (
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="time"
                    value={day.start_time || "09:00"}
                    onChange={(e) =>
                      handleTimeChange(i, "start_time", e.target.value)
                    }
                    className="px-2 py-1.5 border border-gray-light rounded-lg outline-none text-sm focus:border-primary"
                  />
                  <span className="text-gray">a</span>
                  <input
                    type="time"
                    value={day.end_time || "18:00"}
                    onChange={(e) =>
                      handleTimeChange(i, "end_time", e.target.value)
                    }
                    className="px-2 py-1.5 border border-gray-light rounded-lg outline-none text-sm focus:border-primary"
                  />
                </div>
              )}
              {!isActive && (
                <span className="text-xs text-gray">Cerrado</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function LinkTab({ publicUrl, showQR, setShowQR }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    toast.success("Link copiado al portapapeles");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-display text-lg text-dark mb-4">
          Tu link público de citas
        </h3>
        <p className="text-gray text-sm mb-4">
          Comparte este link con tus pacientes para que agenden citas.
        </p>
        <div className="flex items-center gap-2 bg-gray-light rounded-[--radius-button] p-3">
          <p className="flex-1 text-sm text-dark font-mono truncate">
            {publicUrl}
          </p>
          <Button variant="primary" size="sm" onClick={handleCopy}>
            <CopyIcon size={14} /> Copiar
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-dark">Código QR</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQR(!showQR)}
          >
            <QRIcon size={14} /> {showQR ? "Ocultar" : "Mostrar"} QR
          </Button>
        </div>
        <p className="text-gray text-sm mb-4">
          Imprime este código QR y ponlo en tu consultorio. Los pacientes lo
          escanean para agendar.
        </p>
        {showQR && (
          <div className="flex justify-center p-6 bg-white rounded-[--radius-button] border border-gray-light">
            <QRCodeSVG
              value={publicUrl}
              size={200}
              fgColor="#0D6E6E"
              includeMargin
            />
          </div>
        )}
      </Card>
    </div>
  );
}

function PlanTab({ doctor }) {
  const currentPlan = doctor?.subscriptions?.[0]?.plan || "free";
  const plan = PLANS[currentPlan];

  return (
    <Card className="p-6">
      <h3 className="font-display text-lg text-dark mb-4">Tu plan actual</h3>
      <div className="bg-primary-pale rounded-[--radius-button] p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display text-2xl text-dark">{plan.name}</h4>
          <div>
            <span className="text-3xl font-extrabold text-primary">
              ${plan.price}
            </span>
            {plan.price > 0 && (
              <span className="text-gray text-sm ml-1">/mes</span>
            )}
          </div>
        </div>
        <ul className="space-y-2">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-dark">
              <CheckIcon size={14} color="var(--color-primary)" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      {currentPlan === "free" && (
        <div className="text-center">
          <p className="text-gray text-sm mb-3">
            ¿Necesitas más citas? Actualiza tu plan.
          </p>
          <Button
            variant="accent"
            onClick={() =>
              toast("Próximamente podrás actualizar tu plan aquí", {
                icon: "🚧",
              })
            }
          >
            Actualizar Plan
          </Button>
        </div>
      )}
    </Card>
  );
}
