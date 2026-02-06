import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "./Icons";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[--radius-card] p-6 w-full max-w-lg shadow-xl border border-border max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <DialogTitle className="text-lg font-semibold text-dark">
                  {title}
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-light text-gray hover:text-dark transition-colors cursor-pointer"
                >
                  <XIcon size={18} />
                </button>
              </div>
              {children}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
