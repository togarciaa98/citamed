import { Link } from "react-router-dom";
import { BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark via-[#0f2b2b] to-primary min-h-[90vh] flex items-center justify-center px-5 py-20">
      {/* Decorative blurs */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/15 blur-[80px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-accent/10 blur-[60px]" />

      <div className="relative z-1 text-center max-w-[600px]">
        {/* Logo */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-[--radius-card] bg-white/10 backdrop-blur-[10px] flex items-center justify-center text-[28px] border border-white/10">
            🦷
          </div>
          <div className="text-left">
            <h1 className="font-display text-4xl text-white tracking-tight">
              {BRAND.name}
            </h1>
            <p className="text-[13px] text-white/50 tracking-widest uppercase">
              {BRAND.tagline}
            </p>
          </div>
        </div>

        {/* Value prop */}
        <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 leading-tight tracking-tight">
          Tu consultorio merece
          <br />
          <span className="text-accent">una agenda inteligente</span>
        </h2>
        <p className="text-white/65 text-[17px] leading-relaxed mb-10 max-w-[480px] mx-auto">
          Tus pacientes agendan citas desde su celular. Tú gestionas todo desde
          un panel simple. Sin llamadas, sin WhatsApp perdidos.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <Link to="/signup">
            <Button
              variant="accent"
              size="lg"
              className="shadow-lg shadow-accent/30"
            >
              Empezar Gratis →
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="ghost"
              size="lg"
              className="border-2 border-white/20 text-white bg-white/5 backdrop-blur-[10px] hover:bg-white/10"
            >
              Ya tengo cuenta
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
