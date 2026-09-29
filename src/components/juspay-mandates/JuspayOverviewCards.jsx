// import { CalendarDays, CircleCheckBig, IndianRupee, TrendingUp, } from "lucide-react";
// // components/JuspayOverviewCards.jsx
// import React from "react";
// import DashboardCard from "../ui/DashboardCard";
// import colors from "../../constants/colors";
// const JuspayOverviewCards = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
//       <DashboardCard
//         width="100%"
//         leftAlign
//         icon={<CalendarDays size={22} />}
//         title="Total Active Mandates"
//         value="5,087"
//         trendIcon={<TrendingUp size={18} />}
//         trendText="+3%"
//         trendColor={colors.success}
//       />
//       <DashboardCard
//         width="100%"
//         leftAlign
//         icon={<CalendarDays size={22} />}
//         title="Scheduled for Today"
//         value="342"
//         subtitle="₹ 2,38,058"
//         trendIcon={<TrendingUp size={18} />}
//         trendText="+12%"
//         trendColor={colors.success}
//       />
//       <DashboardCard
//         width="100%"
//         leftAlign
//         icon={<CircleCheckBig size={22} />}
//         title="Expected Success (Est.)"
//         value="110 - 140"
//         subtitle="(32 - 40% success rate)"
//       />
//       <DashboardCard
//         width="100%"
//         leftAlign
//         icon={<IndianRupee size={22} />}
//         title="Expected Revenue (Est.)"
//         value="₹76K - 98K"
//         subtitle="Based on historical success rate"
//       />
//     </div>
//   );
// };
// export default JuspayOverviewCards;
import { CalendarDays, CircleX, IndianRupee, RefreshCw, CalendarClock, } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import DashboardCard from "../ui/DashboardCard";
import colors from "../../constants/colors";


const FILTER_OPTIONS = [
  "today",
  "tomorrow",
  "next7days",
  "next30days",
];

const FILTER_LABELS = {
  today: "Today",
  tomorrow: "Tomorrow",
  next7days: "Next 7 Days",
  next30days: "Next 30 Days",
};

const JuspayOverviewCards = () => {
  const [filter, setFilter] = useState("today");

  const [stats, setStats] = useState({
    totalActiveMandates: 0,
    cancelledSubs: 0,
    scheduledCount: 0,
    expectedRevenue: 0,
  });

  const [loading, setLoading] = useState(false);

  // ---------------------------------------------
  // FETCH STATS
  // ---------------------------------------------

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/api/v1/juspay/admin/mandates/stats",
        {
          params: {
            filter,
          },
        }
      );

      const result = response?.data;

      if (result?.success) {
        setStats({
          totalActiveMandates:
            result?.data?.totalActiveMandates || 0,

          cancelledSubs:
            result?.data?.cancelledSubs || 0,

          scheduledCount:
            result?.data?.scheduledCount || 0,

          expectedRevenue:
            result?.data?.expectedRevenue || 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch Juspay mandate stats:", error);

      setStats({
        totalActiveMandates: 0,
        cancelledSubs: 0,
        scheduledCount: 0,
        expectedRevenue: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ---------------------------------------------
  // FILTER CHANGE
  // ---------------------------------------------

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // ---------------------------------------------
  // FORMAT CURRENCY
  // ---------------------------------------------

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="mt-6">
      {/* =========================================
          FILTER HEADER
      ========================================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: colors.textPrimary,
            }}
          >
            Mandate Overview
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: 13,
              color: colors.textSecondary,
            }}
          >
            Juspay mandate statistics for{" "}
            {FILTER_LABELS[filter]}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {loading && (
            <RefreshCw
              size={17}
              color={colors.textSecondary}
              style={{
                animation: "juspay-spin 1s linear infinite",
              }}
            />
          )}

          <FilterDropDown
            key={filter}
            options={FILTER_OPTIONS.map(
              (option) => FILTER_LABELS[option]
            )}
            defaultLabel={FILTER_LABELS[filter]}
            onSelect={(selectedLabel) => {
              const selectedFilter =
                Object.keys(FILTER_LABELS).find(
                  (key) =>
                    FILTER_LABELS[key] === selectedLabel
                );

              if (selectedFilter) {
                handleFilterChange(selectedFilter);
              }
            }}
            width={170}
          />
        </div>
      </div>

      {/* =========================================
          OVERVIEW CARDS
      ========================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* TOTAL ACTIVE MANDATES */}

        <DashboardCard
          width="100%"
          leftAlign
          icon={<CalendarDays size={22} />}
          title="Total Active Mandates"
          value={
            loading
              ? "..."
              : stats.totalActiveMandates.toLocaleString("en-IN")
          }
        />

        {/* CANCELLED SUBSCRIPTIONS */}

        <DashboardCard
          width="100%"
          leftAlign
          icon={<CircleX size={22} />}
          title="Cancelled Subscriptions"
          value={
            loading
              ? "..."
              : stats.cancelledSubs.toLocaleString("en-IN")
          }
        />

        {/* SCHEDULED */}

        <DashboardCard
          width="100%"
          leftAlign
          icon={<CalendarClock size={22} />}
          title="Scheduled Debits"
          value={
            loading
              ? "..."
              : stats.scheduledCount.toLocaleString("en-IN")
          }
          subtitle={`For ${FILTER_LABELS[filter]}`}
        />

        {/* EXPECTED REVENUE */}

        <DashboardCard
          width="100%"
          leftAlign
          icon={<IndianRupee size={22} />}
          title="Expected Revenue"
          value={
            loading
              ? "..."
              : formatCurrency(stats.expectedRevenue)
          }
          subtitle={`For ${FILTER_LABELS[filter]}`}
        />
      </div>

      <style>
        {`
          @keyframes juspay-spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default JuspayOverviewCards;