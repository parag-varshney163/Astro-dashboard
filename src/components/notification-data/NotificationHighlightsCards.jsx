import React from "react";

import colors from "../../constants/colors";


export default function NotificationHighlightsCards({ data = [] }) {
  return (
    <div
      style={{
        marginTop: "24px",
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "28px 36px",
          borderBottom: `1px solid ${colors.cardBorder}`,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: colors.textPrimary,
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          Notification Performance Insights
        </h2>
      </div>

      {/* Cards */}
      <div
        style={{
          padding: "36px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: "24px",
              padding: "28px",
              minHeight: "170px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                color: colors.accent,
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {item.title}
            </p>

            <h3
              style={{
                margin: "14px 0 10px",
                color: colors.textPrimary,
                fontSize: "28px",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {item.value}
            </h3>

            <p
              style={{
                margin: 0,
                color: colors.textSecondary,
                fontSize: "15px",
              }}
            >
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
