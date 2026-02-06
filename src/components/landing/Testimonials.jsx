import { motion } from "framer-motion";
import Avatar from "@/components/ui/Avatar";

const testimonials = [
  {
    name: "Dra. Ana Martínez",
    role: "Odontóloga · Puebla",
    quote:
      "Antes perdía 5-6 citas por semana porque los pacientes no confirmaban. Desde que uso CitaMed, mis pacientes agendan solos y el no-show bajó un 70%. Es impresionante.",
    stars: 5,
  },
  {
    name: "Dr. Roberto Sánchez",
    role: "Médico General · CDMX",
    quote:
      "El QR en mi consultorio fue un game changer. Los pacientes lo escanean y agendan su siguiente cita antes de irse. Mi asistente ya no pierde tiempo al teléfono.",
    stars: 5,
  },
  {
    name: "Dra. Laura Torres",
    role: "Dermatóloga · Guadalajara",
    quote:
      "Probé 3 sistemas antes y todos eran complicadísimos. CitaMed lo configuré en 10 minutos y mis pacientes lo entienden sin explicarles nada. El mejor que he usado.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 px-5 bg-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
            Testimonios
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-dark">
            Lo que dicen los doctores
          </h2>
          <p className="text-gray text-lg mt-3">
            Más de 200 consultorios ya usan CitaMed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-[--radius-card] p-6 sm:p-8 border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-dark text-base leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="lg" />
                <div>
                  <p className="font-semibold text-dark text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
