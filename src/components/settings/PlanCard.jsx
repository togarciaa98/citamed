import { PLANS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import toast from "react-hot-toast";

const PLAN_KEYS = ["free", "basic", "pro"];

export default function PlanCard({ doctor }) {
  const currentPlan = doctor?.subscriptions?.[0]?.plan || "free";

  const handleUpgrade = (planKey) => {
    toast("Próximamente podrás actualizar tu plan aquí", { icon: "🚧" });
  };

  return (
    <div>
      <h3 className="font-semibold text-lg text-dark mb-2">Tu plan</h3>
      <p className="text-sm text-muted mb-6">
        Elige el plan que mejor se adapte a tu consultorio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLAN_KEYS.map((key) => {
          const plan = PLANS[key];
          const isCurrent = key === currentPlan;

          return (
            <Card
              key={key}
              className={`p-6 flex flex-col transition-all ${
                isCurrent
                  ? "border-primary ring-2 ring-primary/10"
                  : "hover:border-primary/30"
              }`}
            >
              {/* Plan header */}
              <div className="mb-4">
                {isCurrent && (
                  <span className="inline-block text-[11px] font-semibold text-primary bg-primary-light px-2.5 py-0.5 rounded-full mb-2">
                    Plan actual
                  </span>
                )}
                <h4 className="font-semibold text-xl text-dark">{plan.name}</h4>
                <div className="mt-1">
                  <span className="text-3xl font-extrabold text-primary">
                    {formatPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted text-sm ml-1">/mes</span>
                  )}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-dark"
                  >
                    <CheckIcon
                      size={16}
                      color="var(--color-primary)"
                      className="shrink-0 mt-0.5"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action button */}
              {isCurrent ? (
                <Button variant="outline" size="md" disabled className="w-full">
                  Plan actual
                </Button>
              ) : (
                <Button
                  variant={key === "pro" ? "accent" : "primary"}
                  size="md"
                  className="w-full"
                  onClick={() => handleUpgrade(key)}
                >
                  Actualizar
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
