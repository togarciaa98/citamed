const steps = [
  {
    num: "1",
    title: "Crea tu cuenta",
    desc: "Regístrate gratis en 2 minutos. Agrega tus servicios y horarios.",
  },
  {
    num: "2",
    title: "Comparte tu link",
    desc: "Envía tu link de citas por WhatsApp, redes sociales o pon el QR en tu consultorio.",
  },
  {
    num: "3",
    title: "Recibe citas",
    desc: "Tus pacientes agendan solos. Tú solo confirmas y atiendes.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-5 bg-primary-pale/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            Así de fácil funciona
          </h2>
          <p className="text-gray text-lg">En 3 simples pasos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                {s.num}
              </div>
              <h3 className="font-display text-lg text-dark mb-2">
                {s.title}
              </h3>
              <p className="text-gray text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
