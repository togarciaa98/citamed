import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/lib/constants";
import Avatar from "@/components/ui/Avatar";
import NotificationBell from "@/components/dashboard/NotificationBell";
import {
  CalendarIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  BarChartIcon,
  ChevronDownIcon,
} from "@/components/ui/Icons";

const navItems = [
  { to: "/dashboard", icon: CalendarIcon, label: "Citas" },
  { to: "/patients", icon: UsersIcon, label: "Pacientes" },
  { to: "/reports", icon: BarChartIcon, label: "Reportes" },
  { to: "/settings", icon: SettingsIcon, label: "Config" },
];

export default function DashboardLayout({ children }) {
  const { doctor, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CalendarIcon size={16} color="white" />
            </div>
            <span className="text-lg font-bold text-dark">{BRAND.name}</span>
          </NavLink>

          {/* Desktop Nav - Center */}
          <nav className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                >
                  <span
                    className={
                      isActive ? "text-primary" : "text-gray hover:text-dark"
                    }
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right side - Bell + Avatar */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <NotificationBell />

            {/* Avatar Dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-light transition-colors cursor-pointer">
                <Avatar
                  name={doctor?.name || "Doctor"}
                  imageUrl={doctor?.photo_url}
                  size="sm"
                />
                <ChevronDownIcon size={14} className="text-gray hidden sm:block" />
              </MenuButton>
              <MenuItems
                anchor="bottom end"
                className="z-50 mt-2 w-56 bg-white rounded-xl border border-border shadow-lg p-1.5 focus:outline-none"
              >
                <div className="px-3 py-2 mb-1">
                  <p className="text-sm font-semibold text-dark truncate">
                    {doctor?.name || "Doctor"}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {doctor?.clinic_name || "Mi consultorio"}
                  </p>
                </div>
                <div className="h-px bg-border mb-1" />
                <MenuItem>
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray hover:bg-gray-light rounded-lg transition-colors cursor-pointer"
                  >
                    <SettingsIcon size={16} />
                    Configuración
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-danger hover:bg-danger-light rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOutIcon size={16} />
                    Cerrar sesión
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-border z-50 safe-area-pb">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[56px]"
              >
                <div className="relative">
                  <item.icon
                    size={20}
                    className={
                      isActive
                        ? "text-primary"
                        : "text-muted"
                    }
                  />
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-primary" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
