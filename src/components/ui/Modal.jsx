import { useEffect } from "react";
import { XIcon } from "./Icons";

export default function Modal({ isOpen, onClose, title, children }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Centered Panel */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      >
        <div
          className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl border border-border max-h-[90vh] overflow-y-auto"
          style={{ background: "white", borderRadius: "16px", padding: "1.5rem", width: "100%", maxWidth: "32rem", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1C1917" }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{ padding: "6px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer" }}
            >
              <XIcon size={18} />
            </button>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
