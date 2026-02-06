import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "¿Es realmente gratis?",
    a: "Sí. El plan Gratis es gratis para siempre e incluye hasta 30 citas al mes, tu link de reserva público y el panel básico. No necesitas tarjeta de crédito para empezar.",
  },
  {
    q: "¿Necesito descargar algo?",
    a: "No. CitaMed es 100% web. Funciona desde el navegador de tu celular, tablet o computadora. Tus pacientes tampoco necesitan descargar nada.",
  },
  {
    q: "¿Mis pacientes necesitan crear cuenta?",
    a: "No. Los pacientes solo llenan un formulario rápido con su nombre, teléfono y eligen su cita. Sin registros, sin contraseñas.",
  },
  {
    q: "¿Puedo personalizar mis horarios?",
    a: "Sí. Puedes configurar horarios diferentes para cada día de la semana, definir hora de inicio y fin, y desactivar los días que no trabajas.",
  },
  {
    q: "¿Cómo recibo los pagos de mis pacientes?",
    a: "CitaMed no procesa pagos. Tú sigues cobrando como siempre lo haces (efectivo, transferencia, terminal). CitaMed solo gestiona las citas.",
  },
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="font-semibold text-2xl text-dark">
          Preguntas frecuentes
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <div className="bg-bg rounded-[--radius-card] border border-border overflow-hidden">
                <DisclosureButton className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer">
                  <span className="font-medium text-dark text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    size={18}
                    className={`text-gray shrink-0 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>

                <AnimatePresence>
                  {open && (
                    <DisclosurePanel
                      static
                      as={motion.div}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </DisclosurePanel>
                  )}
                </AnimatePresence>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
