export default function DashboardTabs({
  activeTab,
  setActiveTab,
  todayCount,
  upcomingCount,
  allCount,
}) {
  const tabs = [
    { key: "today", label: `Hoy (${todayCount})` },
    { key: "upcoming", label: `Próximas (${upcomingCount})` },
    { key: "all", label: `Todas (${allCount})` },
  ];

  return (
    <div className="flex gap-1 bg-white rounded-[--radius-button] p-1 shadow-sm mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex-1 py-2.5 px-4 rounded-[10px] text-[13px] font-semibold transition-all cursor-pointer ${
            activeTab === tab.key
              ? "bg-primary text-white"
              : "text-gray hover:text-dark"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
