const features = [
  {
    icon: "📱",
    title: "Link de citas",
    desc: "Comparte un link y tus pacientes agendan solos, 24/7",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    desc: "Confirmaciones y recordatorios directo por WhatsApp",
  },
  {
    icon: "📊",
    title: "Panel simple",
    desc: "Ve tus citas, ingresos y pacientes en un solo lugar",
  },
  {
    icon: "🔗",
    title: "QR para tu consultorio",
    desc: "Genera un código QR para que pacientes lo escaneen en tu consultorio",
  },
  {
    icon: "📋",
    title: "Expediente digital",
    desc: "Historial de citas, notas y alergias de cada paciente",
  },
  {
    icon: "⏰",
    title: "Sin doble-booking",
    desc: "El sistema bloquea automáticamente horarios ya ocupados",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            Todo lo que necesita tu consultorio
          </h2>
          <p className="text-gray text-lg max-w-lg mx-auto">
            Herramientas diseñadas para doctores y dentistas en México
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-light/50 rounded-[--radius-card] p-6 border border-gray-light/50 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <span className="text-3xl block mb-3">{f.icon}</span>
              <p className="font-bold text-dark text-[15px] mb-1">{f.title}</p>
              <p className="text-gray text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
