import React, { useEffect, useState } from "react";
// import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
// // src/components/StatsCardsRow.jsx
// import React, { useEffect, useState } from "react";
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
//       const res = await axiosInstance.get("/api/v1/customer/tickets/stats");
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
//   return (
//     <div style={{ marginTop: "20px" }}>
//       {/* ================= TOGGLE (TOP LEFT) ================= */}
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
//         <span style={{ fontSize: "14px",background:colors.inputBg,padding:"8px 16px",cursor:"pointer",borderRadius:"12px" }}>
//           {showStats ? "Hide " : "Show"}
//         </span>
//       </div>
//       {/* ================= STATS CARDS ================= */}
//       {showStats && (
//         <div
//           className="flex gap-12"
//           style={{
//             justifyContent: "center",
//             opacity: loading ? 0.6 : 1,
//           }}
//         >
//           {/* ACTIVE TICKETS */}
//           <DashboardCard
//             title="Active"
//             highlight="Tickets"
//             value={stats?.activeTickets ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.success} />}
//             trendColor={colors.success}
//             trendText="Live"
//           />
//           {/* PENDING TICKETS */}
//           <DashboardCard
//             title="Pending"
//             highlight="Tickets"
//             value={stats?.pendingTickets ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.warning} />}
//             trendColor={colors.warning}
//             trendText="Need attention"
//           />
//           {/* ESCALATED */}
//           <DashboardCard
//             title="Escal"
//             highlight="ated"
//             value={stats?.escalatedTickets ?? "-"}
//             trendIcon={<ArrowUpRight size={16} color={colors.danger} />}
//             trendColor={colors.danger}
//             trendText="High priority"
//             noSpace={true}
//           />
//           {/* RESOLVED TODAY */}
//           <DashboardCard
//             title="Resolve"
//             highlight="Today"
//             value={stats?.resolvedToday ?? "-"}
//             trendIcon={null}
//             trendColor={colors.accent}
//             trendText="Resolved"
//           />
//           {/* AVG RESPONSE TIME */}
//           <DashboardCard
//             title="Avg Response"
//             highlight="Time"
//             value={
//               stats?.avgResolutionTimeInSeconds
//                 ? `${Math.floor(
//                     stats.avgResolutionTimeInSeconds / 60
//                   )}m ${stats.avgResolutionTimeInSeconds % 60}s`
//                 : "-"
//             }
//             trendIcon={<ArrowUpRight size={16} color={colors.success} />}
//             trendColor={colors.success}
//             trendText="Performance"
//           />
//         </div>
//       )}
//     </div>
//   );
// };
// export default CustomerStats;
import { ArrowUpRight } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import DashboardCard from "../ui/DashboardCard";
import colors from "../../constants/colors";


const CustomerStats = () => {
  const [stats, setStats] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH STATS API
  ========================= */
  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/v1/customer/tickets/stats"
      );

      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch ticket stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatResolutionTime = (seconds) => {
    if (seconds == null) return "-";

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* ================= TOGGLE ================= */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          color: colors.textSecondary,
          marginBottom: "10px",
        }}
        onClick={() => setShowStats((prev) => !prev)}
      >
        <span
          style={{
            fontSize: "14px",
            background: colors.inputBg,
            padding: "8px 16px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          {showStats ? "Hide" : "Show"}
        </span>
      </div>

      {/* ================= STATS CARDS ================= */}
      {showStats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            gap: "16px",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {/* TOTAL TICKETS */}
          <DashboardCard
            title="Total"
            highlight="Tickets"
            value={stats?.totalTickets ?? "-"}
            trendIcon={<ArrowUpRight size={16} color={colors.accent} />}
            trendColor={colors.accent}
            trendText="All Tickets"
            width={200}
          />

          {/* ACTIVE TICKETS */}
          <DashboardCard
            title="Active"
            highlight="Tickets"
            value={stats?.activeTickets ?? "-"}
            trendIcon={<ArrowUpRight size={16} color={colors.success} />}
            trendColor={colors.success}
            trendText="Live"
            width={200}
          />

          {/* PENDING TICKETS */}
          <DashboardCard
            title="Pending"
            highlight="Tickets"
            value={stats?.pendingTickets ?? "-"}
            trendIcon={<ArrowUpRight size={16} color={colors.warning} />}
            trendColor={colors.warning}
            trendText="Need Attention"
            width={200}
          />

          {/* ESCALATED TICKETS */}
          <DashboardCard
            title="Escal"
            highlight="ated"
            value={stats?.escalatedTickets ?? "-"}
            trendIcon={<ArrowUpRight size={16} color={colors.danger} />}
            trendColor={colors.danger}
            trendText="High Priority"
            noSpace
            width={200}
          />

          {/* RESOLVED TODAY */}
          <DashboardCard
            title="Resolved"
            highlight="Today"
            value={stats?.resolvedTodayChats ?? "-"}
            trendIcon={<ArrowUpRight size={16} color={colors.success} />}
            trendColor={colors.success}
            trendText="Resolved"
            width={200}
          />

          {/* AVG RESOLUTION TIME */}
          <DashboardCard
            title="Avg Resolution"
            highlight="Time"
            value={formatResolutionTime(
              stats?.avgResolutionTimeInSeconds
            )}
            trendIcon={<ArrowUpRight size={16} color={colors.success} />}
            trendColor={colors.success}
            trendText="Performance"
            width={200}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerStats;
