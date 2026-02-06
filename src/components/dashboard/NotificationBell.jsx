import { useState, useMemo } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useAppointments } from "@/hooks/useAppointments";
import { BellIcon, CalendarIcon, ClockIcon, XIcon } from "@/components/ui/Icons";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function NotificationBell() {
  const { appointments } = useAppointments();
  const [lastOpened, setLastOpened] = useState(null);

  const notifications = useMemo(() => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const items = [];

    appointments.forEach((appt) => {
      const createdAt = appt.created_at ? new Date(appt.created_at) : null;
      const patientName = appt.patient?.name || "Paciente";
      const serviceName = appt.service?.name || "Servicio";

      // New appointments created in last 24h
      if (createdAt && createdAt >= oneDayAgo && appt.status !== "cancelled") {
        items.push({
          id: `new-${appt.id}`,
          type: "new",
          icon: CalendarIcon,
          iconBg: "bg-primary-light",
          iconColor: "text-primary",
          text: `Nueva cita: ${patientName} - ${serviceName}`,
          time: createdAt,
        });
      }

      // Pending appointments needing confirmation
      if (appt.status === "pending") {
        const apptDate = new Date(appt.date + "T" + (appt.start_time || "00:00"));
        items.push({
          id: `pending-${appt.id}`,
          type: "pending",
          icon: ClockIcon,
          iconBg: "bg-warning-light",
          iconColor: "text-warning",
          text: `Cita pendiente de confirmar: ${patientName}`,
          time: apptDate,
        });
      }

      // Cancelled in last 24h
      if (appt.status === "cancelled") {
        const updatedAt = appt.updated_at ? new Date(appt.updated_at) : createdAt;
        if (updatedAt && updatedAt >= oneDayAgo) {
          items.push({
            id: `cancelled-${appt.id}`,
            type: "cancelled",
            icon: XIcon,
            iconBg: "bg-danger-light",
            iconColor: "text-danger",
            text: `${patientName} cancel\u00f3 su cita`,
            time: updatedAt,
          });
        }
      }
    });

    // Sort by recency, most recent first
    items.sort((a, b) => b.time - a.time);

    return items.slice(0, 10);
  }, [appointments]);

  const unreadCount = useMemo(() => {
    if (!lastOpened) return notifications.length;
    return notifications.filter((n) => n.time > lastOpened).length;
  }, [notifications, lastOpened]);

  const handleOpen = () => {
    setLastOpened(new Date());
  };

  return (
    <Popover className="relative">
      <PopoverButton
        onClick={handleOpen}
        className="relative p-2 rounded-lg hover:bg-gray-light text-gray hover:text-dark transition-colors cursor-pointer focus:outline-none"
      >
        <BellIcon size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </PopoverButton>

      <PopoverPanel
        anchor="bottom end"
        className="z-50 mt-2 w-80 bg-white rounded-xl border border-border shadow-lg p-2 focus:outline-none"
      >
        <div className="px-3 py-2 mb-1">
          <h3 className="text-sm font-semibold text-dark">Notificaciones</h3>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <BellIcon size={28} className="mx-auto mb-2 text-muted opacity-40" />
              <p className="text-sm text-muted">No hay notificaciones nuevas</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-gray-light transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full ${notification.iconBg} ${notification.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <IconComponent size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-dark leading-snug">
                      {notification.text}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {formatDistanceToNow(notification.time, {
                        locale: es,
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
