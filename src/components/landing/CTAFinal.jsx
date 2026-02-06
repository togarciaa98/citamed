import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CalendarIcon } from "@/components/ui/Icons";

export default function CTAFinal() {
  return (
    <section className="py-20 sm:py-28 px-5 bg-primary relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] rounded-full bg-accent/10 blur-[60px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <div className="bg-white/10 p-4 rounded-2xl inline-block mb-6">
          <CalendarIcon size={64} color="white" />
        </div>

        <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
          Empieza hoy. Es gratis.
        </h2>

        <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
          Únete a más de 200 consultorios que ya usan CitaMed para gestionar sus
          citas. Configura tu agenda en menos de 5 minutos.
        </p>

        <Link to="/signup">
          <Button
            variant="accent"
            size="lg"
            className="shadow-lg shadow-accent/30"
          >
            Crear mi cuenta gratis &rarr;
          </Button>
        </Link>

        <p className="text-white/40 text-sm mt-4">
          Sin tarjeta de crédito &middot; Cancela cuando quieras
        </p>
      </motion.div>
    </section>
  );
}
