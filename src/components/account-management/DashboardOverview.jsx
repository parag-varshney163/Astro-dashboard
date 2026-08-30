import { TrendingUp, TrendingDown, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import DashboardCard from "../ui/DashboardCard";
import colors from "../../constants/colors";


export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/customer/stats");
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!visible) {
    return (
      <div style={{ margin: 20 }}>
        <button onClick={() => setVisible(true)} style={toggleBtn}>
           Show
        </button>
      </div>
    );
  }

  if (loading || !stats) {
    return <p style={{ margin: 20 }}>Loading dashboard...</p>;
  }

  // return (
  //   <div style={{ margin: 20 }}>
  //     {/* Toggle Button */}
  //     <div style={{ marginBottom: 16 }}>
  //       <button onClick={() => setVisible(false)} style={toggleBtn}>
  //          Hide
  //       </button>
  //     </div>

  //     <div
  //       className="flex items-center gap-12"
  //       style={{ width: "100%", overflowX: "auto", justifyContent: "center" }}
  //     >
  //       {/* Pending Requests */}
  //       <DashboardCard
  //         title="Pending"
  //         highlight="Request"
  //         value={stats.pending}
  //         trendIcon={<TrendingUp size={16} color={colors.success} />}
  //         trendText="Need Review"
  //         trendColor={colors.success}
  //       />

  //       {/* High Engagement */}
  //       <DashboardCard
  //         title="High"
  //         highlight="Engagement"
  //         value={stats.highEngagement}
  //         trendIcon={<TrendingDown size={16} color={colors.warning} />}
  //         trendText="Require Follow Up"
  //         trendColor={colors.warning}
  //       />

  //       {/* Approved Today */}
  //       <DashboardCard
  //         title="Approved"
  //         highlight="Today"
  //         value={stats.approvedToday}
  //         trendIcon={<TrendingUp size={16} color={colors.success} />}
  //         trendText="-2 from yesterday"
  //         trendColor={colors.success}
  //       />

  //       {/* Rejected */}
  //       <DashboardCard
  //         title="Rejec"
  //         highlight="ted"
  //         value={stats.rejected}
  //         trendIcon={<TrendingDown size={16} color={colors.Blue} />}
  //         trendText="Last 7 Days"
  //         trendColor={colors.Blue}
  //         noSpace={true}
  //       />
  //     </div>
  //   </div>
  // );
  return (
  <div
    className="rounded-3xl p-6 m-5"
    style={{
      background: colors.gradientCard,
      border: `1px solid ${colors.cardBorder}`,
    }}
  >
    {/* Header */}
    <div className="flex justify-between items-center flex-wrap gap-5 mb-6">

      <div>
        <h2
          className="text-2xl font-bold"
          style={{
            color: colors.textPrimary,
          }}
        >
          Customer Overview
        </h2>

        <p
          className="mt-2 text-sm"
          style={{
            color: colors.textMuted,
          }}
        >
          Quick summary of customer requests and engagement metrics.
        </p>
      </div>


      <button
        onClick={() => setVisible((prev) => !prev)}
        className="px-5 py-2 rounded-xl font-semibold transition-all"
        style={{
          background: colors.inputBg,
          color: colors.textPrimary,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        {visible ? "Hide" : "Show"}
      </button>

    </div>


    {/* Loading */}

    {loading && (
      <div
        className="text-center py-10"
        style={{
          color: colors.textSecondary,
        }}
      >
        Loading dashboard...
      </div>
    )}


    {/* Cards */}

    {visible && !loading && stats && (

      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
        }}
      >

        {/* Pending Requests */}

        <DashboardCard
          title="Pending"
          highlight="Request"
          value={stats.pending}
          trendIcon={
            <TrendingUp
              size={16}
              color={colors.success}
            />
          }
          trendText="Need Review"
          trendColor={colors.success}
          width="100%"
        />


        {/* High Engagement */}

        {/* <DashboardCard
          title="High"
          highlight="Engagement"
          value={stats.highEngagement}
          trendIcon={
            <TrendingDown
              size={16}
              color={colors.warning}
            />
          }
          trendText="Require Follow Up"
          trendColor={colors.warning}
          width="100%"
        /> */}


        {/* Approved */}

        <DashboardCard
          title="Approved"
          highlight="Today"
          value={stats.approvedToday}
          trendIcon={
            <TrendingUp
              size={16}
              color={colors.success}
            />
          }
          trendText="-2 from yesterday"
          trendColor={colors.success}
          width="100%"
        />


        {/* Rejected */}

        <DashboardCard
          title="Rejected"
          highlight="Requests"
          value={stats.rejected}
          trendIcon={
            <TrendingDown
              size={16}
              color={colors.danger}
            />
          }
          trendText="Last 7 Days"
          trendColor={colors.danger}
          width="100%"
        />

      </div>

    )}


    {/* Empty State */}

    {!loading && !stats && visible && (
      <div
        className="text-center py-10"
        style={{
          color: colors.textMuted,
        }}
      >
        No dashboard data available.
      </div>
    )}

  </div>
);
}

const toggleBtn = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: colors.inputBg,
  color: colors.textPrimary,
  padding: "8px 16px",
  borderRadius: 8,
  border: `1px solid ${colors.cardBorder}`,
  cursor: "pointer",
};
