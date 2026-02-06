import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";
import FAQ from "./FAQ";

const plans = [
  {
    key: "free",
    name: "Gratis",
    price: 0,
    period: "para siempre",
    description: "Para empezar sin compromiso",
    popular: false,
    included: [
      "Hasta 30 citas/mes",
      "Link de reserva público",
      "Panel básico de citas",
      "QR para consultorio",
    ],
    excluded: [
      "Recordatorios automáticos",
      "Directorio de pacientes",
      "Reportes y estadísticas",
      "Soporte prioritario",
    ],
  },
  {
    key: "basic",
    name: "Básico",
    price: 299,
    period: "MXN/mes",
    description: "Para consultorios en crecimiento",
    popular: true,
    included: [
      "Hasta 200 citas/mes",
      "Link de reserva público",
      "Panel completo de citas",
      "QR para consultorio",
      "Recordatorios por WhatsApp",
      "Directorio de pacientes",
    ],
    excluded: [
      "Reportes y estadísticas",
      "Soporte prioritario",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: 599,
    period: "MXN/mes",
    description: "Para consultorios que quieren todo",
    popular: false,
    included: [
      "Citas ilimitadas",
      "Link de reserva público",
      "Panel completo de citas",
      "QR para consultorio",
      "Recordatorios automáticos",
      "Directorio de pacientes",
      "Reportes y estadísticas",
      "Soporte prioritario",
    ],
    excluded: [],
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-20 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
            Precios
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-dark">
            Planes simples, sin sorpresas
          </h2>
          <p className="text-gray text-lg mt-3">
            Sin comisiones &middot; Sin contratos &middot; Cancela cuando
            quieras
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-[--radius-card] border p-6 sm:p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02] bg-white"
                  : "border-border bg-white hover:border-primary/30 hover:shadow-md"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  Más popular
                </div>
              )}

              {/* Plan name & description */}
              <h3 className="text-lg font-semibold text-dark">{plan.name}</h3>
              <p className="text-muted text-sm mb-4">{plan.description}</p>

              {/* Price */}
              <div className="mb-1">
                <span className="text-4xl font-extrabold text-dark">
                  ${plan.price}
                </span>
                <span className="text-gray text-sm ml-1">{plan.period}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-border my-6" />

              {/* Included features */}
              <ul className="mb-2">
                {plan.included.map((feature, fi) => (
                  <li
                    key={fi}
                    className="flex items-center gap-2.5 py-1.5"
                  >
                    <CheckIcon size={16} className="text-primary shrink-0" />
                    <span className="text-sm text-dark">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Excluded features */}
              {plan.excluded.length > 0 && (
                <ul className="mb-6">
                  {plan.excluded.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-center gap-2.5 py-1.5"
                    >
                      <XIcon
                        size={16}
                        className="text-muted/40 shrink-0"
                      />
                      <span className="text-sm text-muted line-through">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Spacer when no excluded items */}
              {plan.excluded.length === 0 && <div className="mb-6" />}

              {/* CTA Button */}
              <Link to="/signup">
                <Button
                  variant={plan.popular ? "accent" : "outline"}
                  className="w-full"
                >
                  {plan.price === 0 ? "Empezar Gratis" : "Elegir Plan"}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <FAQ />
        </div>
      </div>
    </section>
  );
}
