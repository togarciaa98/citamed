export const getWhatsAppLink = (phone, message) =>
  `https://wa.me/52${phone}?text=${encodeURIComponent(message)}`;

export function getCustomTemplate(key, defaults) {
  try {
    const stored = JSON.parse(localStorage.getItem("citamed_whatsapp_templates") || "{}");
    return stored[key] || defaults[key];
  } catch {
    return defaults[key];
  }
}

export const templates = {
  bookingConfirmation: ({ patientName, serviceName, dateFormatted, time, clinicName }) =>
    `Hola ${patientName}, tu cita para ${serviceName} el ${dateFormatted} a las ${time} en ${clinicName} ha sido confirmada. ¡Te esperamos!`,

  appointmentReminder24h: ({ patientName, serviceName, dateFormatted, time, clinicName }) =>
    `Hola ${patientName}, te recordamos que mañana tienes cita de ${serviceName} a las ${time} en ${clinicName}. ¿Confirmas tu asistencia?`,

  appointmentReminder1h: ({ patientName, serviceName, time, clinicName }) =>
    `Hola ${patientName}, en 1 hora tienes tu cita de ${serviceName} en ${clinicName} a las ${time}. ¡Te esperamos!`,

  patientBooked: ({ patientName, serviceName, dateFormatted, time }) =>
    `Hola, acabo de agendar una cita para ${serviceName} el ${dateFormatted} a las ${time}. Mi nombre es ${patientName}.`,

  doctorConfirmation: ({ patientName, serviceName, dateFormatted, time, clinicName }) =>
    `Hola ${patientName.split(" ")[0]}, le escribimos del ${clinicName} para confirmar su cita de ${serviceName} el ${dateFormatted} a las ${time}. ¿Le funciona este horario?`,
};
