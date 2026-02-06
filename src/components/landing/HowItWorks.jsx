import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserIcon, LinkIcon, CalendarIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";

const steps = [
  {
    num: "1",
    icon: UserIcon,
    title: "Crea tu cuenta",
    desc: "Registrate gratis en 2 minutos. Agrega tus servicios, horarios y personaliza tu link de citas.",
  },
  {
    num: "2",
    icon: LinkIcon,
    title: "Comparte tu link",
    desc: "Envia tu link por WhatsApp, redes sociales o pon el codigo QR en tu consultorio.",
  },
  {
    num: "3",
    icon: CalendarIcon,
    title: "Recibe citas",
    desc: "Tus pacientes agendan solos. Tu confirmas desde el panel y listo. Sin llamadas.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 px-5 bg-bg">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
            Como funciona
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-dark">
            Activa tu agenda en 3 pasos
          </h2>
          <p className="text-gray text-lg mt-3">En menos de 5 minutos</p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-border" />

          {steps.map((s, i) => {
            const IconComponent = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center relative z-10"
              >
                {/* Number circle */}
                <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                  {s.num}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <IconComponent size={20} className="text-primary" />
                </div>

                {/* Text */}
                <h3 className="font-semibold text-lg text-dark mb-2">
                  {s.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed max-w-[280px] mx-auto">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/signup">
            <Button variant="accent" size="lg">
              Crear cuenta gratis &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
