// import { ArrowUpRight } from "lucide-react";
// import { useEffect } from "react";
// import { useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import DashboardCard from "../ui/DashboardCard";
// import colors from "../../constants/colors";
// const CustomerStats = () => {
//   const [stats, setStats] = useState(null);
//   const [showStats, setShowStats] = useState(false);
//   const [loading, setLoading] = useState(false);
//   /* =========================
//      FETCH STATS API
//   ========================= */
//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(
//         "/api/v1/customer/tickets/stats"
//       );
//       if (res.data?.success) {
//         setStats(res.data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch ticket stats", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchStats();
//   }, []);
//   const formatResolutionTime = (seconds) => {
//     if (seconds == null) return "-";
//     const days = Math.floor(seconds / 86400);
//     const hours = Math.floor((seconds % 86400) / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     if (days > 0) return `${days}d ${hours}h`;
//     if (hours > 0) return `${hours}h ${mins}m`;
//     if (mins > 0) return `${mins}m ${secs}s`;
//     return `${secs}s`;
//   };
//   return (
//     <div style={{ marginTop: "20px" }}>
//       {/* ================= TOGGLE ================= */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//           cursor: "pointer",
//           color: colors.textSecondary,
//           marginBottom: "10px",
//         }}
//         onClick={() => setShowStats((prev) => !prev)}
//       >
//         <span
//           style={{
//             fontSize: "14px",
//             background: colors.inputBg,
//             padding: "8px 16px",
//             borderRadius: "12px",
//             cursor: "pointer",
//           }}
//         >
//           {showStats ? "Hide" : "Show"}
//         </span>
//       </div>
//       {/* ================= STATS CARDS ================= */}
//       {showStats && (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
//             gap: "16px",
//             opacity: loading ? 0.6 : 1,
//           }}
//         >
//           {/* TOTAL TICKETS */}
//           <DashboardCard
//             title="Total"
//             highlight="Tickets"
//             value={stats?.totalTickets ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.accent} />}
//             trendColor={colors.accent}
//             trendText="All Tickets"
//             width={200}
//           />
//           {/* ACTIVE TICKETS */}
//           <DashboardCard
//             title="Active"
//             highlight="Tickets"
//             value={stats?.activeTickets ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.success} />}
//             trendColor={colors.success}
//             trendText="Live"
//             width={200}
//           />
//           {/* PENDING TICKETS */}
//           <DashboardCard
//             title="Pending"
//             highlight="Tickets"
//             value={stats?.pendingTickets ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.warning} />}
//             trendColor={colors.warning}
//             trendText="Need Attention"
//             width={200}
//           />
//           {/* ESCALATED TICKETS */}
//           <DashboardCard
//             title="Escal"
//             highlight="ated"
//             value={stats?.escalatedTickets ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.danger} />}
//             trendColor={colors.danger}
//             trendText="High Priority"
//             noSpace
//             width={200}
//           />
//           {/* RESOLVED TODAY */}
//           <DashboardCard
//             title="Resolved"
//             highlight="Today"
//             value={stats?.resolvedTodayChats ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.success} />}
//             trendColor={colors.success}
//             trendText="Resolved"
//             width={200}
//           />
//           {/* AVG RESOLUTION TIME */}
//           <DashboardCard
//             title="Avg Resolution"
//             highlight="Time"
//             value={formatResolutionTime(
//               stats?.avgResolutionTimeInSeconds
//             )}
//             trendIcon={<ArrowUpRight size={16} color={colors.success} />}
//             trendColor={colors.success}
//             trendText="Performance"
//             width={200}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
// export default CustomerStats;
import { BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import DashboardCard from "../ui/DashboardCard";
import colors from "../../constants/colors";


const CustomerStats = () => {
  const [stats, setStats] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/v1/customer/tickets/stats"
      );

      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatResolutionTime = (seconds) => {
    if (!seconds) return "-";

    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    if (days) return `${days}d ${hrs}h`;
    if (hrs) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  const cards = [
    {
      title: "Total",
      highlight: "Tickets",
      value: stats?.totalTickets ?? "-",
      trendText: "All Tickets",
      color: colors.accent,
    },
    {
      title: "Active",
      highlight: "Tickets",
      value: stats?.activeTickets ?? "-",
      trendText: "Currently Open",
      color: colors.success,
    },
    {
      title: "Pending",
      highlight: "Tickets",
      value: stats?.pendingTickets ?? "-",
      trendText: "Need Attention",
      color: colors.warning,
    },
    {
      title: "Escalated",
      highlight: "",
      value: stats?.escalatedTickets ?? "-",
      trendText: "High Priority",
      color: colors.danger,
    },
    {
      title: "Resolved",
      highlight: "Today",
      value: stats?.resolvedTodayChats ?? "-",
      trendText: "Today's Resolution",
      color: colors.success,
    },
    {
      title: "Avg Resolution",
      highlight: "Time",
      value: formatResolutionTime(
        stats?.avgResolutionTimeInSeconds
      ),
      trendText: "Performance",
      color: colors.accentLight,
    },
  ];

  return (
    <div
      className="rounded-3xl p-6 mt-6"
      style={{
        background: colors.gradientCard,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: colors.hover,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <BarChart3
              size={22}
              color={colors.accent}
            />
          </div>

          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              Customer Ticket Statistics
            </h2>

            <p
              className="text-sm mt-1"
              style={{ color: colors.textMuted }}
            >
              Overview of ticket performance and customer support.
            </p>
          </div>

        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className="flex items-center gap-2 px-5 py-2 rounded-xl transition-all"
          style={{
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
            color: colors.textSecondary,
          }}
        >
          {showStats ? (
            <>
              <ChevronUp size={18} />
              Hide
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Show
            </>
          )}
        </button>

      </div>

      {/* Cards */}

      <div
        className={`transition-all duration-500 overflow-hidden ${
          showStats ? "max-h-[1200px] mt-8" : "max-h-0"
        }`}
      >
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {cards.map((item) => (
            <DashboardCard
              key={item.title}
              title={item.title}
              highlight={item.highlight}
              value={item.value}
              trendText={item.trendText}
              trendColor={item.color}
              width="100%"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;