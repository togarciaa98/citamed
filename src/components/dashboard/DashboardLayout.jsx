import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/lib/constants";
import {
  CalendarIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  ChartIcon,
} from "@/components/ui/Icons";

const navItems = [
  { to: "/dashboard", icon: CalendarIcon, label: "Citas" },
  { to: "/patients", icon: UsersIcon, label: "Pacientes" },
  { to: "/settings", icon: SettingsIcon, label: "Config" },
];

function NavItem({ to, icon: IconComp, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2.5 rounded-[--radius-button] text-sm font-medium transition-all ${
          isActive
            ? "bg-primary text-white"
            : "text-gray hover:bg-gray-light hover:text-dark"
        }`
      }
    >
      <IconComp size={18} />
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  );
}

export default function DashboardLayout({ children }) {
  const { doctor, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-light/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🦷</span>
            <div>
              <h1 className="font-display text-lg text-dark leading-tight">
                {BRAND.name}
              </h1>
              <p className="text-[11px] text-gray leading-tight hidden sm:block">
                {doctor?.clinic_name || "Mi consultorio"}
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[--radius-button] text-sm font-medium text-gray hover:bg-danger-light hover:text-danger transition-all cursor-pointer"
            >
              <LogOutIcon size={18} />
              <span>Salir</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-light/50 z-10">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  isActive ? "text-primary" : "text-gray"
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-gray cursor-pointer"
          >
            <LogOutIcon size={20} />
            Salir
          </button>
        </div>
      </nav>
    </div>
  );
}
