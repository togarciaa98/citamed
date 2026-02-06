import { useAppointments } from "@/hooks/useAppointments";
import { useReports } from "@/hooks/useReports";
import { formatPrice } from "@/lib/utils";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageTransition from "@/components/ui/PageTransition";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ChartIcon } from "@/components/ui/Icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-border shadow-lg px-3 py-2">
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-dark">
        {payload[0].value} citas
      </p>
    </div>
  );
};

export default function Reports() {
  const { appointments, loading } = useAppointments();
  const {
    appointmentsByWeek,
    revenueThisMonth,
    revenueLastMonth,
    topServices,
    noShowRate,
    completionRate,
  } = useReports(appointments);

  const revenueDiff = revenueThisMonth - revenueLastMonth;
  const revenueUp = revenueDiff >= 0;

  return (
    <DashboardLayout>
      <PageTransition>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-dark">Reportes</h2>
          <p className="text-sm text-muted">
            Resumen de actividad y rendimiento de tu consultorio
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-light rounded w-1/3 mb-4" />
                <div className="h-32 bg-gray-light rounded" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Citas por semana */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-dark mb-4">
                Citas por semana
              </h3>
              {appointmentsByWeek.every((w) => w.count === 0) ? (
                <div className="h-[250px] flex flex-col items-center justify-center text-muted">
                  <ChartIcon size={32} className="mb-2 opacity-40" />
                  <p className="text-sm">Sin datos disponibles</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={appointmentsByWeek}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 12, fill: "#78716C" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#78716C" }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(15, 118, 110, 0.05)" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#0F766E"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>

            {/* Card 2: Ingresos */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-dark mb-4">Ingresos</h3>
              <div className="flex flex-col justify-center h-[250px]">
                <p className="text-xs text-muted mb-1">Este mes</p>
                <p className="text-3xl font-bold text-primary mb-3">
                  {formatPrice(revenueThisMonth)}
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-sm font-medium ${
                      revenueUp ? "text-success" : "text-danger"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={revenueUp ? "" : "rotate-180"}
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                    {formatPrice(Math.abs(revenueDiff))}
                  </span>
                  <span className="text-xs text-muted">vs mes anterior</span>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted mb-0.5">Mes anterior</p>
                  <p className="text-lg font-semibold text-muted">
                    {formatPrice(revenueLastMonth)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Card 3: Servicios mas solicitados */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-dark mb-4">
                Servicios mas solicitados
              </h3>
              {topServices.length === 0 ? (
                <div className="py-8 text-center text-muted">
                  <p className="text-sm">Sin datos disponibles</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {topServices.map((service, idx) => (
                    <div
                      key={service.name}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-light transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary-light text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-dark font-medium flex-1 truncate">
                        {service.name}
                      </span>
                      <Badge variant="primary">{service.count}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Card 4: Tasas */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-dark mb-4">Tasas</h3>
              <div className="flex flex-col justify-center h-[200px] gap-6">
                {/* Completion Rate */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-success flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-success">
                      {completionRate}%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">
                      Tasa de completado
                    </p>
                    <p className="text-xs text-muted">
                      Citas completadas del total
                    </p>
                  </div>
                </div>

                {/* No-Show Rate */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-danger flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-danger">
                      {noShowRate}%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">
                      Tasa de inasistencia
                    </p>
                    <p className="text-xs text-muted">
                      Pacientes que no asistieron
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  );
}
