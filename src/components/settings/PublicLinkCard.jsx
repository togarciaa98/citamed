import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CopyIcon, QRIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";

export default function PublicLinkCard({ publicUrl, doctorPhone }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    toast.success("Link copiado al portapapeles");
  };

  const handleShareWhatsApp = () => {
    const message = `Agenda tu cita conmigo en: ${publicUrl}`;
    if (doctorPhone) {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Public link */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <QRIcon size={20} className="text-primary" />
          <h3 className="font-semibold text-lg text-dark">
            Tu link público de citas
          </h3>
        </div>
        <p className="text-sm text-muted mb-4">
          Comparte este link con tus pacientes para que agenden citas en línea.
        </p>

        {/* URL display */}
        <div className="flex items-center gap-2 bg-primary-light rounded-[--radius-button] p-3 mb-4">
          <p className="flex-1 text-sm text-dark font-mono truncate">
            {publicUrl}
          </p>
          <Button variant="primary" size="sm" onClick={handleCopy}>
            <CopyIcon size={14} /> Copiar
          </Button>
        </div>

        {/* Share via WhatsApp */}
        <Button
          variant="whatsapp"
          size="md"
          onClick={handleShareWhatsApp}
        >
          <WhatsAppIcon size={16} /> Compartir por WhatsApp
        </Button>
      </Card>

      {/* QR Code - always visible */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-dark mb-2">Código QR</h3>
        <p className="text-sm text-muted mb-6">
          Imprime este código QR y ponlo en tu consultorio. Los pacientes lo
          escanean para agendar.
        </p>
        <div className="flex justify-center p-6 bg-white rounded-[--radius-button] border border-border">
          <QRCodeSVG
            value={publicUrl}
            size={200}
            fgColor="#0F766E"
            includeMargin
          />
        </div>
      </Card>
    </div>
  );
}
