import { motion } from "framer-motion";
import {
  CalendarIcon,
  ChartIcon,
  WhatsAppIcon,
  UserIcon,
  CheckIcon,
} from "@/components/ui/Icons";

/* ── CSS-only device mockups ────────────────────────────────── */

function PhoneMockup({ children }) {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px]">
      <div className="bg-dark rounded-[36px] p-2.5 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-dark rounded-b-xl z-10" />
        {/* Screen */}
        <div className="bg-white rounded-[28px] overflow-hidden min-h-[480px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function LaptopMockup({ children }) {
  return (
    <div className="relative mx-auto max-w-[440px]">
      {/* Screen */}
      <div className="bg-dark rounded-t-xl p-2 shadow-2xl">
        {/* Browser dots */}
        <div className="flex gap-1.5 mb-2 px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="bg-white rounded-lg overflow-hidden min-h-[260px]">
          {children}
        </div>
      </div>
      {/* Laptop base */}
      <div className="bg-gray-300 h-3 rounded-b-lg mx-8" />
    </div>
  );
}

function WhatsAppChatMock() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="bg-dark rounded-[36px] p-2.5 shadow-2xl">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-dark rounded-b-xl z-10" />
        <div className="rounded-[28px] overflow-hidden min-h-[420px] bg-[#ECE5DD]">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-4 py-3 pt-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
              CM
            </div>
            <div>
              <p className="text-white text-sm font-medium">CitaMed</p>
              <p className="text-white/60 text-[10px]">en linea</p>
            </div>
          </div>
          {/* Chat area */}
          <div className="p-3 space-y-2">
            {/* Received message */}
            <div className="bg-white rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm">
              <p className="text-[11px] text-dark">
                Hola Maria! Te recordamos tu cita manana:
              </p>
              <p className="text-[11px] text-dark font-medium mt-1">
                Jueves 6 de Feb, 10:00 AM
              </p>
              <p className="text-[11px] text-dark">Limpieza Dental</p>
              <p className="text-[10px] text-gray mt-1 text-right">10:30 AM</p>
            </div>
            {/* Sent message */}
            <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-2.5 max-w-[75%] ml-auto shadow-sm">
              <p className="text-[11px] text-dark">Si, ahi estare! Gracias</p>
              <p className="text-[10px] text-gray mt-1 text-right">10:32 AM</p>
            </div>
            {/* Another received */}
            <div className="bg-white rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm">
              <p className="text-[11px] text-dark">
                Perfecto! Te esperamos. Si necesitas reagendar, usa tu link:
              </p>
              <p className="text-[11px] text-primary font-medium underline mt-1">
                citamed.com/citas/dra-martinez
              </p>
              <p className="text-[10px] text-gray mt-1 text-right">10:33 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Screen contents for mockups ────────────────────────────── */

function CalendarScreen() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const dates = [];
  for (let i = 1; i <= 28; i++) dates.push(i);
  const dotDays = [3, 6, 11, 14, 20, 25];

  return (
    <>
      {/* Header */}
      <div className="bg-primary px-4 py-3 pt-8 flex items-center justify-between">
        <span className="text-white/80 text-sm">&larr;</span>
        <p className="text-white text-sm font-semibold">Febrero 2026</p>
        <span className="text-white/80 text-sm">&rarr;</span>
      </div>

      <div className="p-3">
        {/* Day abbreviations */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {days.map((d, i) => (
            <div
              key={i}
              className="text-[10px] text-gray text-center font-medium"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date grid — starts on Sunday (offset 6 blanks so day 1 = Sunday) */}
        <div className="grid grid-cols-7 gap-1">
          {/* Feb 2026 starts on Sunday, so 6 blank cells (Mon-Sat) */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {dates.map((d) => (
            <div key={d} className="flex flex-col items-center">
              <div
                className={`w-7 h-7 flex items-center justify-center text-[11px] rounded-full ${
                  d === 6
                    ? "bg-primary text-white font-bold"
                    : "text-dark hover:bg-primary/5"
                }`}
              >
                {d}
              </div>
              {dotDays.includes(d) && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </div>
          ))}
        </div>

        {/* Appointment previews */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2 border-l-3 border-primary">
            <p className="text-[10px] text-dark font-medium">09:00</p>
            <p className="text-[10px] text-gray">Consulta General</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2 border-l-3 border-blue-500">
            <p className="text-[10px] text-dark font-medium">10:30</p>
            <p className="text-[10px] text-gray">Limpieza Dental</p>
          </div>
        </div>
      </div>
    </>
  );
}

function PatientScreen() {
  return (
    <>
      {/* Header */}
      <div className="bg-primary px-4 py-3 pt-8">
        <p className="text-white text-sm font-semibold">Paciente</p>
      </div>

      <div className="p-4">
        {/* Avatar & info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            MG
          </div>
          <div>
            <p className="text-dark font-semibold text-sm">Maria Garcia</p>
            <p className="text-gray text-xs">222 123 4567</p>
          </div>
        </div>

        {/* Medical notes */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-dark uppercase tracking-wide mb-2">
            Notas medicas
          </p>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">
              Alergia: Penicilina
            </span>
            <span className="text-[10px] bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full font-medium">
              Diabetes Tipo 2
            </span>
          </div>
        </div>

        {/* Last visits */}
        <div>
          <p className="text-[10px] font-semibold text-dark uppercase tracking-wide mb-2">
            Ultimas visitas
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
              <p className="text-[10px] text-gray">15 Ene 2026</p>
              <p className="text-[10px] text-dark font-medium">
                Consulta General
              </p>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
              <p className="text-[10px] text-gray">02 Dic 2025</p>
              <p className="text-[10px] text-dark font-medium">
                Limpieza Dental
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardScreen() {
  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <p className="text-xs font-bold text-primary">CitaMed</p>
        <div className="flex items-center gap-1 bg-gray-50 rounded px-2 py-0.5">
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="text-[9px] text-gray">Buscar...</span>
        </div>
      </div>

      <div className="p-3">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-primary/5 rounded-lg p-2 text-center">
            <p className="text-[9px] text-gray">Citas</p>
            <p className="text-sm font-bold text-primary">12</p>
          </div>
          <div className="bg-accent/5 rounded-lg p-2 text-center">
            <p className="text-[9px] text-gray">Ingresos</p>
            <p className="text-sm font-bold text-accent">$8,400</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-2 text-center">
            <p className="text-[9px] text-gray">Pendientes</p>
            <p className="text-sm font-bold text-yellow-600">3</p>
          </div>
        </div>

        {/* Appointment rows */}
        <div className="space-y-1.5">
          {[
            {
              time: "09:00",
              name: "Maria Garcia",
              status: "Confirmada",
              color: "bg-green-50 text-green-700",
            },
            {
              time: "10:30",
              name: "Carlos Lopez",
              status: "Pendiente",
              color: "bg-yellow-50 text-yellow-700",
            },
            {
              time: "11:00",
              name: "Ana Martinez",
              status: "Confirmada",
              color: "bg-green-50 text-green-700",
            },
          ].map((apt, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-dark">
                  {apt.time}
                </span>
                <span className="text-[10px] text-gray">{apt.name}</span>
              </div>
              <span
                className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${apt.color}`}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Feature data ───────────────────────────────────────────── */

const features = [
  {
    icon: CalendarIcon,
    title: "Agenda online 24/7",
    desc: "Tus pacientes eligen servicio, fecha y hora desde su celular. Sin llamadas, sin WhatsApp.",
    bullets: [
      "Calendario visual intuitivo",
      "Bloqueo automatico de horarios",
      "Confirmacion instantanea",
    ],
    mockup: (
      <PhoneMockup>
        <CalendarScreen />
      </PhoneMockup>
    ),
  },
  {
    icon: ChartIcon,
    title: "Panel de control inteligente",
    desc: "Ve todas tus citas del dia, confirma con un tap y gestiona tu consultorio desde cualquier lugar.",
    bullets: [
      "Vista de citas por dia/semana",
      "Estadisticas de ingresos",
      "Gestion de pacientes",
    ],
    mockup: (
      <LaptopMockup>
        <DashboardScreen />
      </LaptopMockup>
    ),
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp integrado",
    desc: "Envia confirmaciones y recordatorios directamente al WhatsApp de tus pacientes.",
    bullets: [
      "Recordatorios automaticos",
      "Confirmacion con un tap",
      "Templates personalizables",
    ],
    mockup: <WhatsAppChatMock />,
  },
  {
    icon: UserIcon,
    title: "Expediente de pacientes",
    desc: "Historial completo de cada paciente: citas, notas medicas, alergias y mas.",
    bullets: [
      "Notas medicas por paciente",
      "Historial de visitas",
      "Alertas de alergias",
    ],
    mockup: (
      <PhoneMockup>
        <PatientScreen />
      </PhoneMockup>
    ),
  },
];

/* ── Main component ─────────────────────────────────────────── */

export default function FeaturesZigzag() {
  return (
    <section id="funciones" className="py-20 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
            Funciones
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-dark">
            Todo lo que necesita tu consultorio
          </h2>
          <p className="text-gray text-lg mt-3">
            Herramientas disenadas para doctores en Mexico
          </p>
        </div>

        {/* Feature rows */}
        {features.map((f, i) => {
          const isEven = i % 2 === 1;
          const IconComponent = f.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0"
            >
              {/* Text block */}
              <div className={isEven ? "lg:order-2" : ""}>
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-2xl text-dark mb-3">
                  {f.title}
                </h3>
                <p className="text-gray text-base leading-relaxed mb-4">
                  {f.desc}
                </p>
                <ul className="space-y-2">
                  {f.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckIcon size={16} className="text-primary shrink-0" />
                      <span className="text-sm text-dark">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mockup */}
              <div className={isEven ? "lg:order-1" : ""}>{f.mockup}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
