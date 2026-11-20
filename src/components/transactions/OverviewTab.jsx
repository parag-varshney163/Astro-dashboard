import { MessageCircle, Clapperboard, ScrollText, Sun, Hand, CalendarDays, Clock3, CreditCard, } from "lucide-react";
import React from "react";

import colors from "../../constants/colors";


const formatDuration = (seconds) => {
  if (seconds == null) return "-";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}m ${remainingSeconds}s`;
};

const formatCurrency = (amount) => {
  if (amount == null) return "-";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
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

const OverviewTab = ({ overview, loading, error }) => {
  const stats = overview?.overview;
  const payment = overview?.paymentSummary;
  const user = overview?.user;

  const statCards = [
    {
      label: "Total AI Chats",
      value: stats?.totalChats,
      description: `${stats?.totalMessages ?? 0} messages`,
      icon: MessageCircle,
    },
    {
      label: "Reels Watched",
      value: stats?.reelsWatched,
      description: `${formatDuration(stats?.watchTimeSeconds)} watch time`,
      icon: Clapperboard,
    },
    {
      label: "Kundali Generated",
      value: stats?.kundaliGenerated,
      description: `${stats?.kundaliViews ?? 0} views`,
      icon: ScrollText,
    },
    {
      label: "Horoscope Generated",
      value: stats?.horoscopeGenerated,
      description: `${stats?.horoscopeViews ?? 0} views`,
      icon: Sun,
    },
    {
      label: "Palm Readings",
      value: stats?.palmReadings,
      description: "Successful analyses",
      icon: Hand,
    },
    {
      label: "Active Days",
      value: stats?.activeDays,
      description: `${stats?.totalSessions ?? 0} app sessions`,
      icon: CalendarDays,
    },
  ];

  const SummaryCard = ({ title, icon: Icon, items }) => (
    <div
      style={{
        flex: 1,
        minWidth: "280px",
        padding: "22px",
        borderRadius: "17px",
        border: `1px solid ${colors.cardBorder}`,
        background: colors.gradientCard,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <Icon size={19} color={colors.accentLight} />
        <h3
          style={{
            color: colors.textPrimary,
            fontSize: "16px",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      {items.map((item, index) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            padding: "13px 0",
            borderBottom:
              index !== items.length - 1
                ? `1px solid ${colors.inputBorder}`
                : "none",
          }}
        >
          <span style={{ color: colors.textSecondary, fontSize: "13px" }}>
            {item.label}
          </span>

          <strong
            title={String(item.value ?? "Not available")}
            style={{
              color: colors.textPrimary,
              fontSize: "13px",
              textAlign: "right",
              overflowWrap: "anywhere",
            }}
          >
            {item.value ?? "-"}
          </strong>
        </div>
      ))}
    </div>
  );

  if (loading && !overview) {
    return (
      <div style={{ padding: "50px", textAlign: "center", color: colors.textSecondary }}>
        Loading engagement data...
      </div>
    );
  }

  if (error && !overview) {
    return (
      <div style={{ padding: "25px", color: colors.danger }}>
        {error}
      </div>
    );
  }

  if (!overview) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: colors.textMuted }}>
        No engagement data available.
      </div>
    );
  }

  return (
    <div>
      {error && (
        <p style={{ color: colors.danger, fontSize: "13px" }}>{error}</p>
      )}

      {loading && (
        <p style={{ color: colors.textMuted, fontSize: "12px" }}>
          Updating engagement data...
        </p>
      )}

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              style={{
                minHeight: "120px",
                padding: "20px",
                borderRadius: "16px",
                border: `1px solid ${colors.cardBorder}`,
                background: colors.gradientCard,
              }}
            >
              <Icon size={23} color={colors.accentLight} />

              <div
                style={{
                  marginTop: "13px",
                  color: colors.textPrimary,
                  fontSize: "30px",
                  fontWeight: 750,
                }}
              >
                {item.value ?? "-"}
              </div>

              <div style={{ color: colors.textPrimary, fontWeight: 650, fontSize: "13px" }}>
                {item.label}
              </div>

              <div style={{ color: colors.textMuted, fontSize: "11px", marginTop: "5px" }}>
                {item.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <SummaryCard
          title="Engagement Summary"
          icon={Clock3}
          items={[
            {
              label: "Total Sessions",
              value: stats?.totalSessions,
            },
            {
              label: "Average Session Duration",
              value: formatDuration(stats?.averageSessionDurationSeconds),
            },
            {
              label: "Active Days",
              value: stats?.activeDays,
            },
            {
              label: "Last Activity",
              value: formatDate(user?.lastActivity),
            },
            {
              label: "Subscription Status",
              value: user?.subscriptionStatus,
            },
          ]}
        />

        <SummaryCard
          title="Payment Summary"
          icon={CreditCard}
          items={[
            {
              label: "Total Paid",
              value: formatCurrency(payment?.totalPaid),
            },
            {
              label: "Trial Paid",
              value: formatCurrency(payment?.trialPaid),
            },
            {
              label: "Successful Transactions",
              value: payment?.successfulTransactions,
            },
            {
              label: "Current Plan",
              value: payment?.currentPlan,
            },
            {
              label: "Latest Order",
              value: payment?.latestOrder,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default OverviewTab;
