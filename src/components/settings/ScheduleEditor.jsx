import { DAY_NAMES_ES } from "@/lib/constants";
import Card from "@/components/ui/Card";

// Mon(1) -> Tue(2) -> Wed(3) -> Thu(4) -> Fri(5) -> Sat(6) -> Sun(0)
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

export default function ScheduleEditor({ schedule, onUpdate }) {
  const handleToggle = async (dayOfWeek) => {
    const existing = schedule.find((s) => s.day_of_week === dayOfWeek);
    if (existing) {
      await onUpdate(dayOfWeek, { active: !existing.active });
    } else {
      await onUpdate(dayOfWeek, {
        start_time: "09:00",
        end_time: "18:00",
        active: true,
      });
    }
  };

  const handleTimeChange = async (dayOfWeek, field, value) => {
    await onUpdate(dayOfWeek, { [field]: value });
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg text-dark mb-2">Horario semanal</h3>
      <p className="text-sm text-muted mb-6">
        Configura los días y horarios en que atiendes pacientes.
      </p>

      <div className="flex flex-col gap-2">
        {DAY_ORDER.map((dayIdx) => {
          const day = schedule.find((s) => s.day_of_week === dayIdx);
          const isActive = day?.active || false;

          return (
            <div
              key={dayIdx}
              className={`flex items-center gap-4 py-3 px-4 rounded-[--radius-button] transition-colors ${
                isActive ? "bg-primary-light/50" : "bg-transparent"
              }`}
            >
              {/* Toggle */}
              <button
                onClick={() => handleToggle(dayIdx)}
                className={`w-10 h-6 rounded-full relative transition-all cursor-pointer flex-shrink-0 ${
                  isActive ? "bg-primary" : "bg-gray-light"
                }`}
                aria-label={
                  isActive
                    ? `Desactivar ${DAY_NAMES_ES[dayIdx]}`
                    : `Activar ${DAY_NAMES_ES[dayIdx]}`
                }
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${
                    isActive ? "left-4.5" : "left-0.5"
                  }`}
                />
              </button>

              {/* Day name */}
              <span
                className={`w-28 text-sm capitalize ${
                  isActive ? "text-dark font-medium" : "text-gray"
                }`}
              >
                {DAY_NAMES_ES[dayIdx]}
              </span>

              {/* Time inputs or "Cerrado" */}
              {isActive && day ? (
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="time"
                    value={day.start_time || "09:00"}
                    onChange={(e) =>
                      handleTimeChange(dayIdx, "start_time", e.target.value)
                    }
                    className="px-3 py-1.5 border border-border rounded-lg outline-none text-sm text-dark focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <span className="text-muted">a</span>
                  <input
                    type="time"
                    value={day.end_time || "18:00"}
                    onChange={(e) =>
                      handleTimeChange(dayIdx, "end_time", e.target.value)
                    }
                    className="px-3 py-1.5 border border-border rounded-lg outline-none text-sm text-dark focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              ) : (
                <span className="text-sm text-muted">Cerrado</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
