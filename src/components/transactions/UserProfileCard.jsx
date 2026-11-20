import { UserRound } from "lucide-react";
import React from "react";

import colors from "../../constants/colors";


const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  const details = [
    { label: "Registered", value: formatDate(user.registeredAt) },
    { label: "Last Activity", value: formatDate(user.lastActivity) },
    { label: "Plan", value: user.plan || "-" },
    { label: "Payments", value: user.totalPayments ?? user.payments ?? 0 },
  ];

  const name = user.userName || user.name || "Unknown User";
  const phone = user.phoneNumber || user.phone || "-";
  const status = user.subscriptionStatus || user.status || "Unknown";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px 24px",
        marginBottom: "20px",
        borderRadius: "17px",
        border: `1px solid ${colors.cardBorder}`,
        background: colors.gradientCard,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            flexShrink: 0,
            borderRadius: "50%",
            background: "rgba(212,175,55,0.25)",
            color: colors.accentLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "17px",
            fontWeight: 700,
          }}
        >
          {name !== "Unknown User" ? (
            name.charAt(0).toUpperCase()
          ) : (
            <UserRound size={22} />
          )}
        </div>

        <div>
          <div
            style={{
              color: colors.textPrimary,
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {name}
          </div>

          <div
            style={{
              color: colors.textSecondary,
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            {user.userId || "-"} · {phone}
          </div>
        </div>

        <span
          style={{
            padding: "5px 12px",
            borderRadius: "20px",
            border: `1px solid ${
              status.toLowerCase() === "active"
                ? colors.success
                : colors.warning
            }`,
            color:
              status.toLowerCase() === "active"
                ? colors.success
                : colors.warning,
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "28px",
        }}
      >
        {details.map((item) => (
          <div key={item.label}>
            <div
              style={{
                color: colors.textMuted,
                fontSize: "11px",
                marginBottom: "5px",
              }}
            >
              {item.label}
            </div>

            <div
              style={{
                color: colors.textPrimary,
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileCard;
