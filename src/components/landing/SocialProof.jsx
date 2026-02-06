const clinics = [
  "Dental Mendez",
  "Clinica San Jose",
  "Centro Medico Angeles",
  "Consultorio Dra. Ruiz",
  "Pediatria Puebla",
  "Fisio Health MX",
];

export default function SocialProof() {
  return (
    <section className="py-8 bg-white border-y border-border overflow-hidden">
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <p className="text-center text-muted text-sm mb-6">
        Mas de 200 consultorios confian en CitaMed
      </p>

      <div className="relative">
        <div
          className="flex gap-12 items-center"
          style={{ animation: "scroll 30s linear infinite" }}
        >
          {/* First set */}
          {clinics.map((name, i) => (
            <span
              key={`a-${i}`}
              className="text-gray font-semibold text-lg whitespace-nowrap opacity-40 select-none"
            >
              {name}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {clinics.map((name, i) => (
            <span
              key={`b-${i}`}
              className="text-gray font-semibold text-lg whitespace-nowrap opacity-40 select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
