import Card from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <Card className="p-4 sm:p-5">
        <p className="text-xs text-gray font-medium mb-1">Esta semana</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-primary">
          {stats.thisWeek}
        </p>
        <p className="text-xs text-gray">citas</p>
      </Card>
      <Card className="p-4 sm:p-5">
        <p className="text-xs text-gray font-medium mb-1">Pendientes</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-warning">
          {stats.pending}
        </p>
        <p className="text-xs text-gray">por confirmar</p>
      </Card>
      <Card className="p-4 sm:p-5">
        <p className="text-xs text-gray font-medium mb-1">Ingresos</p>
        <p className="text-2xl sm:text-3xl font-extrabold text-success">
          {formatPrice(stats.revenue)}
        </p>
        <p className="text-xs text-gray">completados</p>
      </Card>
    </div>
  );
}
