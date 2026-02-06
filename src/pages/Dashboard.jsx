import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppointments } from "@/hooks/useAppointments";
import { useServices } from "@/hooks/useServices";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import AppointmentList from "@/components/dashboard/AppointmentList";
import TimelineView from "@/components/dashboard/TimelineView";
import NewAppointmentModal from "@/components/dashboard/NewAppointmentModal";
import Button from "@/components/ui/Button";
import { PlusIcon, ListIcon, GridIcon } from "@/components/ui/Icons";
import { SkeletonCard } from "@/components/ui/Skeleton";
import PageTransition from "@/components/ui/PageTransition";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Dashboard() {
  const { doctor } = useAuth();
  const {
    appointments,
    todayAppointments,
    upcomingAppointments,
    stats,
    loading,
    updateStatus,
    createAppointment,
  } = useAppointments();
  const { services } = useServices();

  const [activeTab, setActiveTab] = useState("today");
  const [viewMode, setViewMode] = useState("list"); // list | timeline
  const [showNewAppt, setShowNewAppt] = useState(false);

  const handleUpdateStatus = async (id, status) => {
    const { error } = await updateStatus(id, status);
    if (error) toast.error("Error al actualizar: " + error.message);
    else toast.success("Cita actualizada");
  };

  const handleCreateAppointment = async (data) => {
    return createAppointment(data);
  };

  const currentList =
    activeTab === "today"
      ? todayAppointments
      : activeTab === "upcoming"
      ? upcomingAppointments
      : appointments;

  const emptyMessages = {
    today: "No hay citas para hoy",
    upcoming: "No hay citas próximas",
    all: "No hay citas registradas",
  };

  const todayFormatted = format(new Date(), "EEEE d 'de' MMMM", { locale: es });

  return (
    <DashboardLayout>
      <PageTransition>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-dark">
              Hola, {doctor?.name?.split(" ")[0] || "Doctor"}
            </h2>
            <p className="text-sm text-muted capitalize">{todayFormatted}</p>
          </div>
          <Button onClick={() => setShowNewAppt(true)}>
            <PlusIcon size={16} /> <span className="hidden sm:inline">Nueva Cita</span>
          </Button>
        </div>

        <StatsCards stats={stats} />

        {/* Tabs + View toggle */}
        <div className="flex items-center justify-between mb-1">
          <DashboardTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            todayCount={todayAppointments.length}
            upcomingCount={upcomingAppointments.length}
            allCount={appointments.length}
          />
          <div className="hidden sm:flex items-center gap-1 bg-gray-light rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-dark shadow-sm"
                  : "text-muted hover:text-dark"
              }`}
            >
              <ListIcon size={16} />
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "timeline"
                  ? "bg-white text-dark shadow-sm"
                  : "text-muted hover:text-dark"
              }`}
            >
              <GridIcon size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : viewMode === "timeline" && activeTab === "today" ? (
          <TimelineView
            appointments={todayAppointments}
            onAddClick={() => setShowNewAppt(true)}
          />
        ) : (
          <AppointmentList
            appointments={currentList}
            doctor={doctor}
            onUpdateStatus={handleUpdateStatus}
            emptyMessage={emptyMessages[activeTab]}
          />
        )}

        <NewAppointmentModal
          isOpen={showNewAppt}
          onClose={() => setShowNewAppt(false)}
          services={services}
          onSubmit={handleCreateAppointment}
        />
      </PageTransition>
    </DashboardLayout>
  );
}
