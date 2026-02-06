import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";

function PhoneMockup() {
  const appointments = [
    {
      time: "9:00 AM",
      patient: "Maria Garcia",
      service: "Limpieza",
      color: "border-l-primary",
      serviceBg: "bg-primary-light text-primary",
    },
    {
      time: "10:30 AM",
      patient: "Carlos Lopez",
      service: "Consulta",
      color: "border-l-accent",
      serviceBg: "bg-accent-light text-accent",
    },
    {
      time: "12:00 PM",
      patient: "Ana Martinez",
      service: "Ortodoncia",
      color: "border-l-[#8B5CF6]",
      serviceBg: "bg-[#EDE9FE] text-[#7C3AED]",
    },
  ];

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="w-[280px] h-[560px] bg-dark rounded-[40px] p-3 shadow-2xl relative mx-auto">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-dark rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="bg-white rounded-[32px] h-full overflow-hidden">
          {/* App header */}
          <div className="bg-primary text-white px-5 pt-12 pb-4">
            <p className="text-xs text-white/70 mb-1">Dr. Rodriguez</p>
            <p className="font-semibold text-lg">Febrero 2026</p>
            <div className="flex gap-3 mt-3">
              {["Lun", "Mar", "Mie", "Jue", "Vie"].map((d, i) => (
                <div
                  key={d}
                  className={`flex flex-col items-center gap-1 text-xs ${
                    i === 2 ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <span>{d}</span>
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full ${
                      i === 2 ? "bg-white text-primary font-bold" : ""
                    }`}
                  >
                    {3 + i}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments list */}
          <div className="px-4 py-3 space-y-3">
            <p className="text-xs font-semibold text-gray uppercase tracking-wide">
              Hoy - 3 citas
            </p>
            {appointments.map((apt, i) => (
              <div
                key={i}
                className={`border-l-[3px] ${apt.color} bg-bg rounded-lg px-3 py-2.5`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray">
                    {apt.time}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${apt.serviceBg}`}
                  >
                    {apt.service}
                  </span>
                </div>
                <p className="text-sm font-semibold text-dark mt-0.5">
                  {apt.patient}
                </p>
              </div>
            ))}

            {/* Mini stat */}
            <div className="flex gap-2 mt-2">
              <div className="flex-1 bg-success-light rounded-lg p-2 text-center">
                <p className="text-[10px] text-success font-medium">
                  Confirmadas
                </p>
                <p className="text-lg font-bold text-success">12</p>
              </div>
              <div className="flex-1 bg-warning-light rounded-lg p-2 text-center">
                <p className="text-[10px] text-[#A16207] font-medium">
                  Pendientes
                </p>
                <p className="text-lg font-bold text-[#A16207]">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute -top-4 -right-4 bg-green-100 text-green-700 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        Cita confirmada
      </motion.div>

      <motion.div
        className="absolute -bottom-2 -left-6 bg-blue-100 text-blue-700 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        Nuevo paciente
      </motion.div>

      <motion.div
        className="absolute top-1/3 -right-8 bg-orange-100 text-orange-700 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg"
        animate={{ y: [0, -7, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        Recordatorio enviado
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative py-20 lg:py-32 px-5 bg-bg overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, #E7E5E4 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge pill */}
            <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              Hecho para consultorios en Mexico
            </span>

            {/* H1 */}
            <h1 className="text-dark font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
              Tus pacientes agendan solos.
              <br />
              <span className="text-primary">Tu solo atiendes.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray text-lg leading-relaxed mb-8 max-w-[520px]">
              Agenda online, recordatorios por WhatsApp y panel de control. Todo
              lo que necesita tu consultorio en un solo lugar.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-4">
              <Link to="/signup">
                <Button
                  variant="accent"
                  size="lg"
                  className="shadow-lg shadow-accent/25"
                >
                  Empezar Gratis &rarr;
                </Button>
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById("como-funciona")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="cursor-pointer"
              >
                <Button variant="outline" size="lg">
                  Ver como funciona
                </Button>
              </button>
            </div>

            {/* Small text */}
            <p className="text-muted text-sm">
              Gratis para siempre &middot; Sin tarjeta de credito
            </p>
          </motion.div>

          {/* Right column: phone mockup */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
