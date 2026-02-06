import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { PlusIcon, TrashIcon } from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function ServicesList({ services, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
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
    if (error) {
      toast.error("Error: " + error.message);
    } else {
      toast.success("Servicio agregado");
      setNewName("");
      setNewDuration(30);
      setNewPrice(500);
      setShowForm(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `¿Eliminar el servicio "${name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;
    const { error } = await onDelete(id);
    if (error) {
      toast.error("Error: " + error.message);
    } else {
      toast.success("Servicio eliminado");
    }
  };

  const handleToggle = async (svc) => {
    await onUpdate(svc.id, { active: !svc.active });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-dark">Servicios</h3>
        <Button
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          <PlusIcon size={14} /> Agregar servicio
        </Button>
      </div>

      {/* Inline add form */}
      {showForm && (
        <div className="mb-6 p-4 bg-primary-light rounded-[--radius-card] border border-primary/10">
          <h4 className="text-sm font-semibold text-dark mb-3">
            Nuevo servicio
          </h4>
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <Input
                label="Nombre"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej: Consulta General"
              />
            </div>
            <div className="w-24">
              <Input
                label="Duración (min)"
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
              />
            </div>
            <div className="w-28">
              <Input
                label="Precio"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} size="md">
                Agregar
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Service list */}
      <div className="flex flex-col gap-3">
        {services.length === 0 && (
          <p className="text-sm text-muted text-center py-8">
            No tienes servicios configurados. Agrega tu primer servicio.
          </p>
        )}
        {services.map((svc) => (
          <div
            key={svc.id}
            className={`flex items-center justify-between p-4 rounded-[--radius-button] border border-border transition-all ${
              svc.active
                ? "bg-white"
                : "bg-gray-light/30 opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-dark text-sm">{svc.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="primary">{svc.duration_minutes} min</Badge>
                  <span className="text-sm text-gray font-medium">
                    {formatPrice(svc.price)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Toggle switch */}
              <button
                onClick={() => handleToggle(svc)}
                className={`w-10 h-6 rounded-full relative transition-all cursor-pointer flex-shrink-0 ${
                  svc.active ? "bg-primary" : "bg-gray-light"
                }`}
                aria-label={svc.active ? "Desactivar servicio" : "Activar servicio"}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${
                    svc.active ? "left-4.5" : "left-0.5"
                  }`}
                />
              </button>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(svc.id, svc.name)}
                className="p-1.5 text-danger hover:bg-danger-light rounded-lg cursor-pointer transition-colors"
                aria-label="Eliminar servicio"
              >
                <TrashIcon size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
