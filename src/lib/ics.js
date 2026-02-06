/**
 * Generates and downloads an .ics calendar file for an appointment.
 *
 * @param {Object} params
 * @param {string} params.title - Event title / summary
 * @param {string} params.description - Event description
 * @param {string} params.startDate - Date string "YYYY-MM-DD"
 * @param {string} params.startTime - Start time "HH:MM"
 * @param {string} params.endTime - End time "HH:MM"
 * @param {string} params.location - Event location
 */
export function generateICSFile({
  title,
  description,
  startDate,
  startTime,
  endTime,
  location,
}) {
  const formatDateTime = (date, time) => {
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    return `${year}${month}${day}T${hours}${minutes}00`;
  };

  const dtStart = formatDateTime(startDate, startTime);
  const dtEnd = formatDateTime(startDate, endTime);
  const now = new Date();
  const dtstamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    "T",
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  const uid = `${dtstamp}-${Math.random().toString(36).slice(2, 10)}@citamed`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CitaMed//Citas//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `DTSTAMP:${dtstamp}`,
    `UID:${uid}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cita.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
