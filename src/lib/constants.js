export const BRAND = {
  name: "CitaMed",
  tagline: "Agenda inteligente para tu consultorio",
};

export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no_show",
};

export const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmada",
    bg: "bg-success-light",
    text: "text-success",
    dot: "bg-success",
  },
  pending: {
    label: "Pendiente",
    bg: "bg-warning-light",
    text: "text-[#A16207]",
    dot: "bg-warning",
  },
  completed: {
    label: "Completada",
    bg: "bg-primary-light",
    text: "text-primary",
    dot: "bg-primary",
  },
  cancelled: {
    label: "Cancelada",
    bg: "bg-danger-light",
    text: "text-danger",
    dot: "bg-danger",
  },
  no_show: {
    label: "No se presentó",
    bg: "bg-danger-light",
    text: "text-danger",
    dot: "bg-danger",
  },
};

export const PLANS = {
  free: {
    name: "Gratis",
    price: 0,
    maxAppointments: 30,
    features: [
      "Hasta 30 citas/mes",
      "Link de reserva público",
      "WhatsApp manual",
      "Panel básico",
    ],
  },
  basic: {
    name: "Básico",
    price: 299,
    maxAppointments: 200,
    features: [
      "Hasta 200 citas/mes",
      "Link de reserva público",
      "WhatsApp manual",
      "Panel completo",
      "Directorio de pacientes",
    ],
  },
  pro: {
    name: "Pro",
    price: 599,
    maxAppointments: Infinity,
    features: [
      "Citas ilimitadas",
      "Link de reserva público",
      "Recordatorios automáticos",
      "Panel completo",
      "Directorio de pacientes",
      "Reportes y estadísticas",
    ],
  },
};

export const DAY_NAMES_ES = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

export const DAY_NAMES_SHORT = [
  "Dom",
  "Lun",
  "Mar",
  "Mié",
  "Jue",
  "Vie",
  "Sáb",
];
