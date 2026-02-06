import { motion } from "framer-motion";

export default function DashboardTabs({
  activeTab,
  setActiveTab,
  todayCount,
  upcomingCount,
  allCount,
}) {
  const tabs = [
    { key: "today", label: "Hoy", count: todayCount },
    { key: "upcoming", label: "Próximas", count: upcomingCount },
    { key: "all", label: "Todas", count: allCount },
  ];

  return (
    <div className="flex gap-2 mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            activeTab === tab.key
              ? "text-white"
              : "text-gray hover:text-dark hover:bg-gray-light"
          }`}
        >
          {activeTab === tab.key && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key
                  ? "bg-white/20"
                  : "bg-gray-light"
              }`}
            >
              {tab.count}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
