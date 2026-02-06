import { CalendarIcon, ClockIcon, CheckIcon, XIcon } from "@/components/ui/Icons";
import { formatPrice } from "@/lib/utils";

const stats_config = [
  {
    key: "thisWeek",
    label: "Esta semana",
    icon: CalendarIcon,
    border: "border-l-primary",
    iconBg: "bg-primary-light text-primary",
    format: (v) => v,
    suffix: "citas",
  },
  {
    key: "pending",
    label: "Pendientes",
    icon: ClockIcon,
    border: "border-l-accent",
    iconBg: "bg-accent-light text-accent",
    format: (v) => v,
    suffix: "por confirmar",
  },
  {
    key: "revenue",
    label: "Ingresos",
    icon: CheckIcon,
    border: "border-l-success",
    iconBg: "bg-success-light text-success",
    format: (v) => formatPrice(v),
    suffix: "completados",
  },
  {
    key: "noShowRate",
    label: "No-shows",
    icon: XIcon,
    border: "border-l-danger",
    iconBg: "bg-danger-light text-danger",
    format: (v) => (typeof v === "number" ? `${Math.round(v)}%` : "0%"),
    suffix: "tasa",
  },
];

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {stats_config.map((item) => {
        const IconComp = item.icon;
        return (
          <div
            key={item.key}
            className={`bg-white rounded-[--radius-card] border border-border ${item.border} border-l-4 p-4 transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.iconBg}`}
              >
                <IconComp size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-dark leading-none">
                  {item.format(stats[item.key] ?? 0)}
                </p>
                <p className="text-xs text-muted mt-0.5">{item.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
