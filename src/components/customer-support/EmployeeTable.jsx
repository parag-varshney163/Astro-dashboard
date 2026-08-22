import { Star } from "lucide-react"; // ⭐ lucide star icon
import React from "react";

import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


// ⭐ lucide star icon

const EmployeeTable = () => {
  const columns = [
    {
      key: "employee",
      label: "Employee Name",
      width: "2fr",
      render: (value, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Yellow Circle */}
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: colors.accent, 
            }}
          />
          <span
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {row.employee}
          </span>
        </div>
      ),
    },

    { key: "chats", label: "Chats Resolved", width: "1fr" },
    { key: "tickets", label: "Tickets Resolved", width: "1fr" },
    { key: "response", label: "Avg Response Time", width: "1fr" },

    {
      key: "rating",
      label: "Rating",
      width: "1fr",
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Star size={18} color={colors.accent} fill={colors.accent} /> 
          <span style={{ color: colors.textPrimary }}>{value}</span>
        </div>
      ),
    },

    {
      key: "performance",
      label: "Performance",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.accent,
            fontWeight: 500,
          }}
        >
          {value}
        </span>
      ),
    },
  ];

  const data = [
    {
      employee: "Mike Geller",
      chats: 145,
      tickets: 42,
      response: "2min 15s",
      rating: "4.7",
      performance: "Excellent",
    },
    {
      employee: "Mike Geller",
      chats: 145,
      tickets: 42,
      response: "2min 15s",
      rating: "4.7",
      performance: "Excellent",
    },
    {
      employee: "Mike Geller",
      chats: 145,
      tickets: 42,
      response: "2min 15s",
      rating: "4.7",
      performance: "Excellent",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      rowStyle={{
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
      }}
    />
  );
};

export default EmployeeTable;
