/**
 * Generate available time slots for a given date.
 * @param {Object} schedule - { start_time: "09:00", end_time: "18:00", active: boolean }
 * @param {number} serviceDuration - duration in minutes
 * @param {Array} existingAppointments - [{ start_time: "09:00", end_time: "09:30", status }]
 * @returns {Array} [{ time: "09:00", endTime: "09:30", available: boolean }]
 */
export function generateTimeSlots(
  schedule,
  serviceDuration,
  existingAppointments = []
) {
  if (!schedule || !schedule.active) return [];

  const [startH, startM] = schedule.start_time.split(":").map(Number);
  const [endH, endM] = schedule.end_time.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  const slots = [];

  for (let m = startMinutes; m + serviceDuration <= endMinutes; m += serviceDuration) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const timeStr = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;

    const slotEnd = m + serviceDuration;
    const slotEndH = Math.floor(slotEnd / 60);
    const slotEndM = slotEnd % 60;
    const slotEndStr = `${String(slotEndH).padStart(2, "0")}:${String(slotEndM).padStart(2, "0")}`;

    const isBooked = existingAppointments.some((apt) => {
      if (apt.status === "cancelled") return false;
      return apt.start_time < slotEndStr && apt.end_time > timeStr;
    });

    slots.push({ time: timeStr, endTime: slotEndStr, available: !isBooked });
  }

  return slots;
}
