import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppointments } from "@/hooks/useAppointments";
import { useServices } from "@/hooks/useServices";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import AppointmentList from "@/components/dashboard/AppointmentList";
import NewAppointmentModal from "@/components/dashboard/NewAppointmentModal";
import Button from "@/components/ui/Button";
import { PlusIcon } from "@/components/ui/Icons";
import PageTransition from "@/components/ui/PageTransition";
import toast from "react-hot-toast";

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

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-dark">
              Bienvenido, {doctor?.name?.split(" ").slice(0, 2).join(" ") || "Doctor"}
            </h2>
            <p className="text-sm text-gray">
              {doctor?.clinic_name || "Tu consultorio"}
            </p>
          </div>
          <Button onClick={() => setShowNewAppt(true)}>
            <PlusIcon size={16} /> <span className="hidden sm:inline">Nueva Cita</span>
          </Button>
        </div>

        <StatsCards stats={stats} />

        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          todayCount={todayAppointments.length}
          upcomingCount={upcomingAppointments.length}
          allCount={appointments.length}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-gray text-sm mt-3">Cargando citas...</p>
          </div>
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
