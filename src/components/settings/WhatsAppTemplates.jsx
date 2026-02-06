import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { WhatsAppIcon } from "@/components/ui/Icons";
import toast from "react-hot-toast";

const STORAGE_KEY = "citamed_whatsapp_templates";

const AVAILABLE_VARIABLES = [
  "{nombre}",
  "{servicio}",
  "{fecha}",
  "{hora}",
  "{consultorio}",
];

const EXAMPLE_VALUES = {
  "{nombre}": "María López",
  "{servicio}": "Consulta General",
  "{fecha}": "lunes 10 de febrero",
  "{hora}": "10:00 AM",
  "{consultorio}": "Consultorio Médico Pérez",
};

const DEFAULT_TEMPLATES = {
  confirmation: `Hola {nombre}, tu cita para {servicio} el {fecha} a las {hora} en {consultorio} ha sido confirmada. ¡Te esperamos!`,
  reminder_24h: `Hola {nombre}, te recordamos que mañana tienes cita de {servicio} a las {hora} en {consultorio}. ¿Confirmas tu asistencia?`,
  reminder_1h: `Hola {nombre}, en 1 hora tienes tu cita de {servicio} en {consultorio} a las {hora}. ¡Te esperamos!`,
};

const TEMPLATE_CONFIG = [
  {
    key: "confirmation",
    label: "Confirmación de cita",
    description: "Se envía cuando se confirma una nueva cita.",
  },
  {
    key: "reminder_24h",
    label: "Recordatorio 24h",
    description: "Se envía 24 horas antes de la cita.",
  },
  {
    key: "reminder_1h",
    label: "Recordatorio 1h",
    description: "Se envía 1 hora antes de la cita.",
  },
];

function replaceVariables(text) {
  let result = text;
  for (const [variable, value] of Object.entries(EXAMPLE_VALUES)) {
    result = result.replaceAll(variable, value);
  }
  return result;
}

export default function WhatsAppTemplates() {
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setTemplates((prev) => ({ ...prev, ...stored }));
    } catch {
      // Use defaults if parsing fails
    }
  }, []);

  // Save to localStorage on change
  const saveTemplates = (updated) => {
    setTemplates(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Silently fail
    }
  };

  const handleChange = (key, value) => {
    saveTemplates({ ...templates, [key]: value });
  };

  const handleReset = (key) => {
    const updated = { ...templates, [key]: DEFAULT_TEMPLATES[key] };
    saveTemplates(updated);
    toast.success("Plantilla restablecida");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <WhatsAppIcon size={20} />
          <h3 className="font-semibold text-lg text-dark">
            Plantillas de WhatsApp
          </h3>
        </div>
        <p className="text-sm text-muted mb-4">
          Personaliza los mensajes que se envían a tus pacientes por WhatsApp.
          Usa las variables disponibles para incluir datos de la cita.
        </p>

        {/* Available variables */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray mb-2">
            Variables disponibles:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_VARIABLES.map((v) => (
              <Badge key={v} variant="primary">
                {v}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Template editors */}
      {TEMPLATE_CONFIG.map((config) => (
        <Card key={config.key} className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm text-dark">{config.label}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReset(config.key)}
            >
              Restablecer
            </Button>
          </div>
          <p className="text-xs text-muted mb-3">{config.description}</p>

          {/* Textarea */}
          <textarea
            value={templates[config.key]}
            onChange={(e) => handleChange(config.key, e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-[--radius-button] border border-border text-sm text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-muted resize-none"
          />

          {/* Preview */}
          <div className="mt-3">
            <p className="text-xs font-medium text-gray mb-1.5">Vista previa:</p>
            <div className="bg-[#E8F8EE] rounded-[--radius-button] p-3 text-sm text-dark/80">
              {replaceVariables(templates[config.key])}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
