import { Link } from "react-router-dom";
import { PLANS } from "@/lib/constants";
import { CheckIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";

const planOrder = ["free", "basic", "pro"];

export default function Pricing() {
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl sm:text-4xl text-dark mb-3">
            Planes simples, sin sorpresas
          </h2>
          <p className="text-gray text-lg">
            Sin comisiones · Sin contratos · Cancela cuando quieras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planOrder.map((key) => {
            const plan = PLANS[key];
            const isPopular = key === "basic";

            return (
              <div
                key={key}
                className={`rounded-[--radius-card] p-6 sm:p-8 border relative transition-all ${
                  isPopular
                    ? "border-primary border-2 shadow-lg shadow-primary/10 bg-white"
                    : "border-border bg-white hover:border-primary/30 hover:shadow-md"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    Más popular
                  </div>
                )}
                <h3 className="font-semibold text-xl text-dark mb-1">
                  {plan.name}
                </h3>
                <div className="mb-5">
                  <span className="text-4xl font-extrabold text-dark">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray text-sm ml-1">MXN/mes</span>
                  )}
                  {plan.price === 0 && (
                    <span className="text-gray text-sm ml-1">para siempre</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckIcon
                        size={16}
                        color={isPopular ? "var(--color-primary)" : "var(--color-success)"}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <span className="text-dark">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button
                    variant={isPopular ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.price === 0 ? "Empezar Gratis" : "Elegir Plan"}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
