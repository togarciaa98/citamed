import { useMemo } from "react";
import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
} from "date-fns";
import { es } from "date-fns/locale";

export function useReports(appointments) {
  const appointmentsByWeek = useMemo(() => {
    const now = new Date();
    const weeks = [];

    for (let i = 3; i >= 0; i--) {
      const weekDate = subWeeks(now, i);
      const start = startOfWeek(weekDate, { weekStartsOn: 1 });
      const end = endOfWeek(weekDate, { weekStartsOn: 1 });

      const count = appointments.filter((a) => {
        if (a.status === "cancelled") return false;
        const d = new Date(a.date + "T00:00");
        return isWithinInterval(d, { start, end });
      }).length;

      weeks.push({
        week: `Sem ${format(start, "d", { locale: es })}/${format(start, "MMM", { locale: es })}`,
        count,
      });
    }

    return weeks;
  }, [appointments]);

  const revenueThisMonth = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    return appointments
      .filter((a) => {
        if (a.status !== "completed") return false;
        const d = new Date(a.date + "T00:00");
        return isWithinInterval(d, { start, end });
      })
      .reduce((sum, a) => sum + (a.service?.price || 0), 0);
  }, [appointments]);

  const revenueLastMonth = useMemo(() => {
    const now = new Date();
    const lastMonth = subMonths(now, 1);
    const start = startOfMonth(lastMonth);
    const end = endOfMonth(lastMonth);

    return appointments
      .filter((a) => {
        if (a.status !== "completed") return false;
        const d = new Date(a.date + "T00:00");
        return isWithinInterval(d, { start, end });
      })
      .reduce((sum, a) => sum + (a.service?.price || 0), 0);
  }, [appointments]);

  const topServices = useMemo(() => {
    const counts = {};

    appointments.forEach((a) => {
      const name = a.service?.name;
      if (!name) return;
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [appointments]);

  const { noShowRate, completionRate } = useMemo(() => {
    const nonCancelled = appointments.filter((a) => a.status !== "cancelled");
    const total = nonCancelled.length;

    if (total === 0) return { noShowRate: 0, completionRate: 0 };

    const noShows = nonCancelled.filter((a) => a.status === "no_show").length;
    const completed = nonCancelled.filter((a) => a.status === "completed").length;

    return {
      noShowRate: Math.round((noShows / total) * 100),
      completionRate: Math.round((completed / total) * 100),
    };
  }, [appointments]);

  return {
    appointmentsByWeek,
    revenueThisMonth,
    revenueLastMonth,
    topServices,
    noShowRate,
    completionRate,
  };
}
