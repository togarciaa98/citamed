import { Link } from "react-router-dom";
import { BRAND } from "@/lib/constants";
import { CalendarIcon } from "@/components/ui/Icons";

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-dark py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CalendarIcon size={18} className="text-white" />
              </div>
              <span className="font-semibold text-lg text-white">
                {BRAND.name}
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Agenda inteligente para consultorios en México. Tus pacientes agendan solos, tú solo atiendes.
            </p>
          </div>

          {/* Column 2: Product links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => scrollTo("funciones")} className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer">
                  Funciones
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("precios")} className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer">
                  Precios
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("testimonios")} className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer">
                  Testimonios
                </button>
              </li>
              <li>
                <a href="mailto:hola@citamed.com" className="text-white/50 hover:text-white text-sm transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-sm">
            Hecho en México con ❤️ para doctores.
          </p>
        </div>
      </div>
    </footer>
  );
}
