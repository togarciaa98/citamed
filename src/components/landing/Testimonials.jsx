import Avatar from "@/components/ui/Avatar";

const testimonials = [
  {
    name: "Dra. Ana Martínez",
    role: "Odontóloga · Puebla",
    quote:
      "Antes perdía citas porque los pacientes no confirmaban por WhatsApp. Con CitaMed agendan solos y yo solo confirmo. Me ahorré horas a la semana.",
  },
  {
    name: "Dr. Roberto Sánchez",
    role: "Médico General · CDMX",
    quote:
      "El QR en mi consultorio fue un game changer. Los pacientes lo escanean y agendan su siguiente cita antes de irse. Súper práctico.",
  },
  {
    name: "Dra. Laura Torres",
    role: "Dermatóloga · Guadalajara",
    quote:
      "Lo que más me gusta es la simplicidad. No necesito capacitar a mi asistente, todo es intuitivo. Y el precio es muy accesible.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-5 bg-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl sm:text-4xl text-dark mb-3">
            Doctores que ya usan CitaMed
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-[--radius-card] p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <p className="text-dark text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="sm" />
                <div>
                  <p className="font-semibold text-dark text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
