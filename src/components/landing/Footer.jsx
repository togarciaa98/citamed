import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark py-12 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-sm">🦷</div>
            <span className="font-semibold text-lg text-white">
              {BRAND.name}
            </span>
          </div>
          <p className="text-white/40 text-sm text-center">
            © {new Date().getFullYear()} {BRAND.name}. Hecho en México con ❤️
            para doctores.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="mailto:hola@citamed.com" className="text-white/50 hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
