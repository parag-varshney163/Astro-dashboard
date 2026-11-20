import { MessageCircle, Clapperboard, ScrollText, Sun, Hand, ChevronLeft, ChevronRight, Activity, } from "lucide-react";
import React from "react";

import colors from "../../constants/colors";


const activityIcons = {
  "AI Chat": MessageCircle,
  "Reels": Clapperboard,
  "Kundali": ScrollText,
  "Horoscope": Sun,
  "Palm Reading": Hand,
};

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(value).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ActivityTimelineTab = ({
  activities = [],
  loading = false,
  error,
  page = 1,
  totalPages = 1,
  onPageChange,
}) => {
  return (
    <div
      style={{
        padding: "22px",
        borderRadius: "17px",
        border: `1px solid ${colors.cardBorder}`,
        background: colors.gradientCard,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Activity color={colors.accentLight} size={20} />

          <h3
            style={{
              color: colors.textPrimary,
              fontSize: "16px",
              margin: 0,
            }}
          >
            Recent User Activity
          </h3>
        </div>

        <span
          style={{
            color: colors.textMuted,
            fontSize: "12px",
          }}
        >
          {activities.length} records
        </span>
      </div>

      {error && (
        <div style={{ color: colors.danger, padding: "15px" }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ color: colors.textMuted, padding: "35px", textAlign: "center" }}>
          Loading activities...
        </div>
      ) : activities.length === 0 ? (
        <div style={{ color: colors.textMuted, padding: "40px", textAlign: "center" }}>
          No activity records available.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {activities.map((activity, index) => {
            const Icon = activityIcons[activity.type] || Activity;

            return (
              <div
                key={activity._id || index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "15px",
                  borderRadius: "13px",
                  border: `1px solid ${colors.inputBorder}`,
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    flexShrink: 0,
                    borderRadius: "12px",
                    background: "rgba(212,175,55,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} color={colors.accentLight} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: colors.textPrimary,
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    {activity.type || "Activity"}
                  </div>

                  <div
                    style={{
                      color: colors.textMuted,
                      fontSize: "12px",
                      marginTop: "5px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {activity.description || "-"}
                  </div>

                  <div
                    style={{
                      color: colors.textMuted,
                      fontSize: "11px",
                      marginTop: "5px",
                    }}
                  >
                    ID: {activity.sourceId || activity._id || "-"}
                  </div>
                </div>

                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: "12px",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatDate(activity.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: `1px solid ${colors.cardBorder}`,
              background: colors.cardBg,
              color: colors.textPrimary,
              opacity: page <= 1 ? 0.4 : 1,
              cursor: page <= 1 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(page + 1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: `1px solid ${colors.cardBorder}`,
              background: colors.cardBg,
              color: colors.textPrimary,
              opacity: page >= totalPages ? 0.4 : 1,
              cursor: page >= totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTimelineTab;
