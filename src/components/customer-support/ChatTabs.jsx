import React, { useState } from "react";

import EscalatedByChatBot from "./EscalatedByChatbot";
import UserActivityTrend from "./UserActivityTrend";
import ResolvedByChatBot from "./ResolvedByChatBot";
import TicketConsole from "./TicketConsole";
import StatsOverview from "./StatsOverview";
import EmployeeTable from "./EmployeeTable";
import colors from "../../constants/colors";
import Button from "../ui/Button";


/*
  PROPS FROM CustomerSupport.jsx
  ------------------------------
  tickets   -> API tickets
  loading   -> loading state
  filters   -> global filters
  setFilters-> update filters (status)
*/

export default function ChatTabs({
  tickets = [],
  loading = false,
  filters,
  setFilters,
  refreshTickets,
}) {
  const [active, setActive] = useState(filters.filter || "open");

  /* =========================
     TAB CONFIG
  ========================= */
  const tabs = [
    {
      id: "escalated_by_chatbot",
      label: "Escalated By Chatbot",
      color: colors.purple,
    },
    {
      id: "resolved_by_chatbot",
      label: "Resolved By Chatbot",
      color: colors.success,
    },
    {
      id: "resolved",
      label: "Resolved",
      color: colors.success,
    },
    {
      id: "assigned",
      label: "Assigned",
      color: colors.purple,
    },
    {
      id: "open",
      label: "Open Ticket",
      color: colors.accent,
    },
    {
      id: "escalated",
      label: "Escalated",
      color: colors.accent,
    },
    {
      id: "insights",
      label: "Data Insights",
      color: null,
    },
  ];

  /* =========================
     TAB CLICK HANDLER
  ========================= */
  const handleTabChange = (tabId) => {
  setActive(tabId);

  // Tabs that use their own APIs
  if (
    tabId === "insights" ||
    tabId === "escalated_by_chatbot" ||
    tabId === "resolved_by_chatbot"
  ) {
    return;
  }

  // Only TicketConsole-related tabs
  setFilters((prev) => ({
    ...prev,
    filter: tabId,
  }));
};


  /* =========================
     INSIGHTS MOCK DATA
  ========================= */
  const sampleData = [
    { name: "1", a: 10, b: 8 },
    { name: "2", a: 18, b: 14 },
    { name: "3", a: 9, b: 22 },
    { name: "4", a: 14, b: 12 },
    { name: "5", a: 22, b: 19 },
  ];

  /* =========================
     COMPONENT RENDER
  ========================= */
  const renderContent = () => {
    if (active === "insights") {
      return (
        <>
          <StatsOverview />
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "25px",
              justifyContent: "center",
            }}
          >
            <UserActivityTrend data={sampleData} />
            <UserActivityTrend title="Complaints" data={sampleData} />
          </div>
          <EmployeeTable />
        </>
      );
    }

    if (active === "resolved_by_chatbot") {
      return <ResolvedByChatBot refreshTickets={refreshTickets} />;
    }
    if (active === "escalated_by_chatbot") {
      return <EscalatedByChatBot refreshTickets={refreshTickets}/>;
    }

    // Default: Ticket Console
    return <TicketConsole tickets={tickets} loading={loading} refreshTickets={refreshTickets} activeTab={active} />;
  };

  return (
    <div style={{ width: "100%" }}>
      {/* ================= TABS ================= */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginTop: "-8px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <Button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              variant="custom"
              bg={isActive ? colors.Blue : colors.cardBg}
              text={isActive ? "#fff" : colors.textSecondary}
              size="md"
              style={{
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: 500,
                border: `1px solid ${
                  isActive ? colors.hover : colors.cardBorder
                }`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {tab.label}

              {/* {tab.id !== "insights" && (
                <span
                  style={{
                    color: tab.color,
                    fontWeight: 600,
                  }}
                >
                  {
                    tickets.filter(
                      (t) => t.status === tab.id
                    ).length
                  }
                </span>
              )} */}
            </Button>
          );
        })}
      </div>

      {/* ================= CONTENT ================= */}
      <div style={{ marginTop: "20px" }}>
        {loading ? <p>Loading tickets...</p> : renderContent()}
      </div>
    </div>
  );
}
