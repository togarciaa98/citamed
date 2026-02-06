import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePatients } from "@/hooks/usePatients";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import PageTransition from "@/components/ui/PageTransition";
import { SkeletonCard } from "@/components/ui/Skeleton";
import {
  SearchIcon,
  UserIcon,
  PhoneIcon,
  WhatsAppIcon,
  CalendarIcon,
} from "@/components/ui/Icons";
import { formatDateShort, formatPrice, cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp";
import toast from "react-hot-toast";

function getNoteBadgeVariant(note) {
  const lower = note.toLowerCase();
  if (lower.includes("alergia")) return "danger";
  if (lower.includes("diabét") || lower.includes("diabet") || lower.includes("presión") || lower.includes("presion")) return "warning";
  return "neutral";
}

export default function Patients() {
  const { doctor } = useAuth();
  const { patients, loading, searchPatients, getPatientHistory, updatePatient, refresh } =
    usePatients();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [editingNotes, setEditingNotes] = useState({});
  const [savingNotes, setSavingNotes] = useState(false);
  const debounceRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        searchPatients(searchQuery);
      } else {
        refresh();
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const handleToggleExpand = async (patient) => {
    if (expandedId === patient.id) {
      setExpandedId(null);
      setPatientHistory([]);
      return;
    }

    setExpandedId(patient.id);
    setEditingNotes((prev) => ({ ...prev, [patient.id]: patient.notes || "" }));
    setHistoryLoading(true);
    const { data } = await getPatientHistory(patient.id);
    setPatientHistory(data || []);
    setHistoryLoading(false);
  };

  const handleSaveNotes = async (patientId) => {
    setSavingNotes(true);
    const notes = editingNotes[patientId] ?? "";
    const { error } = await updatePatient(patientId, { notes });
    if (error) toast.error("Error al guardar notas");
    else toast.success("Notas guardadas");
    setSavingNotes(false);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-dark">Pacientes</h2>
          <Badge variant="neutral">
            {patients.length} paciente{patients.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <SearchIcon
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            color="var(--color-muted)"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o teléfono..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-full border border-border text-sm outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : patients.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-light flex items-center justify-center mx-auto mb-4">
              <UserIcon size={28} color="var(--color-muted)" />
            </div>
            <p className="text-dark font-semibold text-[15px]">
              {searchQuery
                ? "No se encontraron pacientes"
                : "No hay pacientes registrados"}
            </p>
            <p className="text-sm text-muted mt-1">
              Los pacientes aparecerán aquí cuando agenden citas
            </p>
          </div>
        ) : (
          /* Patient list */
          <div className="flex flex-col gap-3">
            {patients.map((patient) => {
              const isExpanded = expandedId === patient.id;
              const noteChips = patient.notes
                ? patient.notes.split(",").map((n) => n.trim()).filter(Boolean)
                : [];

              return (
                <div key={patient.id}>
                  <Card
                    className={cn(
                      "p-4 cursor-pointer transition-all hover:shadow-md",
                      isExpanded && "ring-2 ring-primary shadow-md"
                    )}
                    onClick={() => handleToggleExpand(patient)}
                  >
                    {/* Main row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={patient.name} size="md" />
                        <div className="min-w-0">
                          <p className="font-semibold text-dark text-sm truncate">
                            {patient.name}
                          </p>
                          <p className="text-sm text-muted flex items-center gap-1">
                            <PhoneIcon size={12} />
                            {patient.phone}
                          </p>
                        </div>
                      </div>

                      {/* WhatsApp button */}
                      {patient.phone && (
                        <a
                          href={getWhatsAppLink(
                            patient.phone,
                            `Hola ${patient.name.split(" ")[0]}, le escribimos del ${doctor?.clinic_name || "consultorio"}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="ghost" size="sm">
                            <WhatsAppIcon size={16} color="#25D366" />
                          </Button>
                        </a>
                      )}
                    </div>

                    {/* Note chips */}
                    {noteChips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {noteChips.map((note, i) => (
                          <Badge key={i} variant={getNoteBadgeVariant(note)}>
                            {note}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>

                  {/* Expanded section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-5 mt-2 mb-1 border-l-2 border-primary/20 pl-4 space-y-4 py-2">
                          {/* Notes editor */}
                          <div>
                            <label className="text-xs font-semibold text-dark block mb-1.5">
                              Notas del paciente
                            </label>
                            <textarea
                              value={editingNotes[patient.id] ?? patient.notes ?? ""}
                              onChange={(e) =>
                                setEditingNotes((prev) => ({
                                  ...prev,
                                  [patient.id]: e.target.value,
                                }))
                              }
                              placeholder="Alergias, condiciones, observaciones..."
                              rows={2}
                              className="w-full px-3 py-2 border border-border rounded-[--radius-button] text-sm outline-none focus:border-primary resize-none transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Button
                              variant="primary"
                              size="sm"
                              className="mt-2"
                              disabled={savingNotes}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSaveNotes(patient.id);
                              }}
                            >
                              {savingNotes ? "Guardando..." : "Guardar notas"}
                            </Button>
                          </div>

                          {/* Appointment history */}
                          <div>
                            <p className="text-xs font-semibold text-dark mb-2 flex items-center gap-1.5">
                              <CalendarIcon size={13} />
                              Historial de citas
                            </p>

                            {historyLoading ? (
                              <p className="text-xs text-muted py-2">Cargando historial...</p>
                            ) : patientHistory.length === 0 ? (
                              <p className="text-xs text-muted py-2">Sin citas previas</p>
                            ) : (
                              <div className="space-y-2">
                                {patientHistory.map((apt) => (
                                  <div
                                    key={apt.id}
                                    className="flex items-center justify-between bg-bg p-3 rounded-[--radius-button] border border-border text-xs"
                                  >
                                    <div className="min-w-0">
                                      <p className="text-muted capitalize">
                                        {formatDateShort(apt.date)}
                                        {apt.start_time ? ` · ${apt.start_time.slice(0, 5)}` : ""}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="primary">
                                          {apt.service?.name || "Servicio"}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="font-semibold text-dark">
                                        {formatPrice(apt.service?.price || 0)}
                                      </span>
                                      <StatusBadge status={apt.status} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  );
}
