import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "@/components/ui/Icons";

const withoutItems = [
  "Llamas y mandas WhatsApp para confirmar cada cita",
  "Anotas citas en papel o en el celular",
  "Los pacientes no llegan y no avisaron",
  "Doble-booking porque perdiste la cuenta",
  "No sabes cuanto facturaste este mes",
];

const withItems = [
  "Tus pacientes agendan solos desde su celular",
  "Agenda digital organizada automaticamente",
  "Recordatorios automaticos por WhatsApp",
  "El sistema bloquea horarios ocupados",
  "Panel con ingresos y estadisticas en tiempo real",
];

const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ProblemSolution() {
  return (
    <section id="problema-solucion" className="py-20 px-5 bg-bg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-dark font-semibold text-3xl sm:text-4xl mb-3">
            Por que CitaMed?
          </h2>
          <p className="text-gray text-lg">
            Deja de perder tiempo con llamadas y WhatsApp
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without CitaMed */}
          <motion.div
            {...cardAnimation}
            className="rounded-[--radius-card] p-6 sm:p-8 border-2 border-danger/20 bg-danger/5"
          >
            <p className="text-danger font-semibold text-lg mb-4">
              Sin CitaMed
            </p>
            <ul className="space-y-3">
              {withoutItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XIcon size={18} className="text-danger mt-0.5 shrink-0" />
                  <span className="text-dark text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With CitaMed */}
          <motion.div
            {...cardAnimation}
            transition={{ ...cardAnimation.transition, delay: 0.15 }}
            className="rounded-[--radius-card] p-6 sm:p-8 border-2 border-success/20 bg-success/5"
          >
            <p className="text-success font-semibold text-lg mb-4">
              Con CitaMed
            </p>
            <ul className="space-y-3">
              {withItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon
                    size={18}
                    className="text-success mt-0.5 shrink-0"
                  />
                  <span className="text-dark text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
