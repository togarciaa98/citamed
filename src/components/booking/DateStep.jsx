import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  getDay,
  addMonths,
  subMonths,
  isSameDay,
  isBefore,
  startOfDay,
  addDays,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";

const DAY_LABELS = ["Lun", "Mar", "Mi\u00e9", "Jue", "Vie", "S\u00e1b", "Dom"];

export default function DateStep({
  availableDates,
  selectedDate,
  onSelect,
  onBack,
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split("-");
      return new Date(+y, +m - 1, 1);
    }
    return startOfMonth(new Date());
  });

  const today = useMemo(() => startOfDay(new Date()), []);

  // Build a Set of available date strings for O(1) lookup
  const availableSet = useMemo(
    () => new Set(availableDates.map((d) => d.date)),
    [availableDates]
  );

  // Generate calendar grid for currentMonth
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = [];

    // getDay returns 0=Sun. We need Monday-first so shift: Mon=0 ... Sun=6
    let startDow = getDay(monthStart); // 0=Sun, 1=Mon...
    startDow = startDow === 0 ? 6 : startDow - 1; // shift to Mon=0

    // Empty slots before month starts
    for (let i = 0; i < startDow; i++) {
      days.push(null);
    }

    // Actual days of the month
    let d = monthStart;
    while (!isBefore(monthEnd, d)) {
      days.push(new Date(d));
      d = addDays(d, 1);
    }

    return days;
  }, [currentMonth]);

  const monthLabel = format(currentMonth, "MMMM yyyy", { locale: es });

  return (
    <div>
      <h3 className="font-semibold text-lg text-dark mb-4">Elige una fecha</h3>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="p-1.5 rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
        >
          <ChevronLeftIcon size={20} className="text-gray" />
        </button>
        <span className="font-semibold text-dark capitalize">{monthLabel}</span>
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="p-1.5 rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
        >
          <ChevronRightIcon size={20} className="text-gray" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-xs font-medium text-muted py-1"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} />;
          }

          const dateStr = format(day, "yyyy-MM-dd");
          const isAvailable = availableSet.has(dateStr);
          const isPast = isBefore(day, today);
          const isSelected = selectedDate === dateStr;
          const dayNum = day.getDate();
          const isToday = isSameDay(day, today);

          const disabled = isPast || !isAvailable;

          let cellClass =
            "w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all";

          if (isSelected) {
            cellClass += " bg-primary text-white";
          } else if (disabled) {
            cellClass += " text-muted/40 cursor-default";
          } else {
            cellClass +=
              " bg-primary-light text-primary hover:bg-primary-pale cursor-pointer";
          }

          if (isToday && !isSelected) {
            cellClass += " ring-1 ring-primary/30";
          }

          return (
            <button
              key={dateStr}
              disabled={disabled}
              onClick={() => !disabled && onSelect(dateStr)}
              className={cellClass}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Back */}
      <div className="mt-5">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeftIcon size={16} />
          Cambiar servicio
        </Button>
      </div>
    </div>
  );
}
