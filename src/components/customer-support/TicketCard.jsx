import React from "react";

import colors from "../../constants/colors";


export function TicketCard({
  id,
  priority,
  user,
  time,
  status,
  isActive = false,
  onClick,
  hasUnread
}) {
  const colorMap = {
    high: colors.danger,
    medium: colors.warning,
    low: colors.success,
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "18px",
        background: isActive ? colors.inputBg : colors.secondary,
        border: isActive
          ? `2px solid ${colors.accent}`
          : `1px solid ${colors.cardBorder}`,
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginBottom: "12px"
      }}
    >
      {/* TOP ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 600 }}>
          {id}
        </span>

        <span
          style={{
            fontWeight: 600,
            fontSize: "12px",
            color: colorMap[priority],
            textTransform: "capitalize",
          }}
        >
          {priority}
        </span>
      </div>

      {/* CONTENT ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: colors.accent,
              flexShrink: 0,
            }}
          />

          <div>
            <div style={{ fontSize: "12px", fontWeight: 600 }}>
              {user}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                marginTop: "4px",
              }}
            >
              {time}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              marginBottom: "8px",
            }}
          >
            Payment issue
          </div>

          <span
            style={{
              background: colors.Blue,
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            {status}
          </span>
        </div>
      </div>
      {hasUnread && (
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#ef4444",
            marginLeft: "8px",
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}

