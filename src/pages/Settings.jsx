import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useSchedule } from "@/hooks/useSchedule";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageTransition from "@/components/ui/PageTransition";
import ProfileForm from "@/components/settings/ProfileForm";
import ServicesList from "@/components/settings/ServicesList";
import ScheduleEditor from "@/components/settings/ScheduleEditor";
import PublicLinkCard from "@/components/settings/PublicLinkCard";
import WhatsAppTemplates from "@/components/settings/WhatsAppTemplates";
import PlanCard from "@/components/settings/PlanCard";
import {
  UserIcon,
  SettingsIcon,
  CalendarIcon,
  LinkIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

const TABS = [
  { key: "profile", label: "Perfil", icon: UserIcon },
  { key: "services", label: "Servicios", icon: SettingsIcon },
  { key: "schedule", label: "Horarios", icon: CalendarIcon },
  { key: "link", label: "Link público", icon: LinkIcon },
  { key: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon },
  { key: "plan", label: "Plan", icon: null },
];

// Small icon wrapper for the Plan tab (no dedicated icon, use a simple badge-like element)
function PlanIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Settings() {
  const { doctor, refreshDoctor } = useAuth();
  const { services, addService, updateService, deleteService } = useServices();
  const { schedule, updateDay } = useSchedule();
  const [activeTab, setActiveTab] = useState("profile");

  const publicUrl = `${window.location.origin}/citas/${doctor?.slug || ""}`;

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm doctor={doctor} onSave={refreshDoctor} />;
      case "services":
        return (
          <ServicesList
            services={services}
            onAdd={addService}
            onUpdate={updateService}
            onDelete={deleteService}
          />
        );
      case "schedule":
        return <ScheduleEditor schedule={schedule} onUpdate={updateDay} />;
      case "link":
        return (
          <PublicLinkCard
            publicUrl={publicUrl}
            doctorPhone={doctor?.phone}
          />
        );
      case "whatsapp":
        return <WhatsAppTemplates />;
      case "plan":
        return <PlanCard doctor={doctor} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <h2 className="font-semibold text-xl sm:text-2xl text-dark mb-6">
          Configuración
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar (md+) */}
          <aside className="hidden md:block w-56 shrink-0">
            <nav className="flex flex-col gap-1 sticky top-24">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                const IconComponent = tab.icon || PlanIcon;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[--radius-button] text-sm transition-all cursor-pointer text-left ${
                      isActive
                        ? "bg-primary-light text-primary font-medium"
                        : "text-gray hover:bg-gray-light"
                    }`}
                  >
                    <IconComponent size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Mobile Horizontal Tabs */}
          <div className="md:hidden flex gap-1 bg-white rounded-[--radius-button] p-1 shadow-sm overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-2 rounded-[10px] text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray hover:text-dark"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content area */}
          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
