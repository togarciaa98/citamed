import { useState, useEffect } from "react";
import { usePatients } from "@/hooks/usePatients";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusBadge from "@/components/ui/StatusBadge";
import PageTransition from "@/components/ui/PageTransition";
import {
  SearchIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/ui/Icons";
import { formatDateLong, formatPrice } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp";
import toast from "react-hot-toast";

export default function Patients() {
  const { doctor } = useAuth();
  const { patients, loading, searchPatients, getPatientHistory, updatePatient } =
    usePatients();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    searchPatients(q);
  };

  const handleSelectPatient = async (patient) => {
    if (selectedPatient?.id === patient.id) {
      setSelectedPatient(null);
      return;
    }
    setSelectedPatient(patient);
    setHistoryLoading(true);
    const { data } = await getPatientHistory(patient.id);
    setPatientHistory(data);
    setHistoryLoading(false);
  };

  const handleSaveNotes = async (patientId, notes) => {
    const { error } = await updatePatient(patientId, { notes });
    if (error) toast.error("Error al guardar");
    else toast.success("Notas guardadas");
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl sm:text-2xl text-dark">
            Pacientes
          </h2>
          <span className="text-sm text-gray">{patients.length} pacientes</span>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <SearchIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            color="var(--color-gray)"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar por nombre o teléfono..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-[--radius-button] border border-gray-light/50 text-sm outline-none focus:border-primary shadow-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-16 text-gray">
            <UserIcon size={48} color="var(--color-gray-light)" className="mx-auto" />
            <p className="mt-3 text-[15px]">
              {searchQuery
                ? "No se encontraron pacientes"
                : "Aún no tienes pacientes"}
            </p>
            <p className="text-xs mt-1">
              Los pacientes aparecerán aquí cuando agenden citas
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {patients.map((patient) => (
              <div key={patient.id}>
                <Card
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedPatient?.id === patient.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => handleSelectPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-pale flex items-center justify-center">
                        <UserIcon size={18} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark text-sm">
                          {patient.name}
                        </p>
                        <p className="text-xs text-gray flex items-center gap-1">
                          <PhoneIcon size={12} /> {patient.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                          <Button variant="whatsapp" size="sm">
                            <WhatsAppIcon size={14} />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                  {patient.notes && (
                    <p className="mt-2 text-xs text-accent bg-accent-light px-3 py-1.5 rounded-lg">
                      {patient.notes}
                    </p>
                  )}
                </Card>

                {/* Expanded: History */}
                {selectedPatient?.id === patient.id && (
                  <div className="ml-4 mt-2 mb-2 border-l-2 border-primary-pale pl-4 space-y-3">
                    {/* Notes editor */}
                    <div>
                      <label className="text-xs font-semibold text-dark">
                        Notas del paciente
                      </label>
                      <div className="flex gap-2 mt-1">
                        <textarea
                          defaultValue={patient.notes || ""}
                          placeholder="Alergias, observaciones..."
                          rows={2}
                          className="flex-1 px-3 py-2 border border-gray-light rounded-lg text-sm outline-none focus:border-primary resize-none"
                          onBlur={(e) =>
                            handleSaveNotes(patient.id, e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Appointment history */}
                    <div>
                      <p className="text-xs font-semibold text-dark mb-2">
                        Historial de citas
                      </p>
                      {historyLoading ? (
                        <p className="text-xs text-gray">Cargando...</p>
                      ) : patientHistory.length === 0 ? (
                        <p className="text-xs text-gray">Sin citas previas</p>
                      ) : (
                        <div className="space-y-2">
                          {patientHistory.map((apt) => (
                            <div
                              key={apt.id}
                              className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-light/50 text-xs"
                            >
                              <div>
                                <p className="font-medium text-dark">
                                  {apt.service?.name}
                                </p>
                                <p className="text-gray capitalize">
                                  {formatDateLong(apt.date)} · {apt.start_time?.slice(0, 5)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary">
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
                )}
              </div>
            ))}
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  );
}
