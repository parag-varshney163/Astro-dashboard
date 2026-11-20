import React from "react";

import colors from "../../constants/colors";


const DashboardTabs = ({ activeTab, setActiveTab, period, setPeriod }) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity Timeline" },
    { id: "transactions", label: "Transactions & Invoices" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "14px",
        marginBottom: "18px",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "11px 17px",
                borderRadius: "10px",
                border: `1px solid ${
                  active ? colors.accent : colors.cardBorder
                }`,
                background: active ? colors.gradientButton : colors.cardBg,
                color: active ? colors.buttonText : colors.textSecondary,
                fontSize: "13px",
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
          Period
        </span>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            height: "44px",
            padding: "0 14px",
            borderRadius: "10px",
            border: `1px solid ${colors.inputBorder}`,
            background: colors.inputBg,
            color: colors.textPrimary,
            outline: "none",
          }}
        >
          <option value="lifetime">Lifetime</option>
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardTabs;

