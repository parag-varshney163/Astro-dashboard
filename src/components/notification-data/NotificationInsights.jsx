import { Send, BadgeCheck, Bell, MousePointerClick, TrendingUp, TrendingDown, Minus, RefreshCw, } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const NotificationInsights = ({ filter, refreshKey }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Notification Insights API
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(
          "/api/v1/customer/notification/insights",
          {
            params: { filter },
          }
        );

        console.log("Notification Insights API:", response.data);

        setData(response?.data?.data || null);
      } catch (err) {
        console.error("Notification Insights Error:", err);
        setError("Failed to load notification insights.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [filter, refreshKey]);

  const formatNumber = (value, suffix = "") => {
    if (value === null || value === undefined) return "N/A";

    return `${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}${suffix}`;
  };

  const summaryCards = [
    {
      title: "Total Sent",
      key: "sent",
      icon: Send,
      color: colors.accent,
    },
    {
      title: "Total Delivered",
      key: "delivered",
      icon: BadgeCheck,
      color: colors.success,
    },
    {
      title: "Total Opens",
      key: "opens",
      icon: Bell,
      color: colors.accentLight,
    },
    {
      title: "Total Clicks",
      key: "clicks",
      icon: MousePointerClick,
      color: colors.warning,
    },
  ];

  const percentageMetrics = [
    "deliveryRate",
    "openRate",
    "clickRate",
    "rechargeConv",
  ];

  const metricLabels = {
    sent: "Sent",
    delivered: "Delivered",
    deliveryRate: "Delivery Rate",
    opens: "Opens",
    openRate: "Open Rate",
    clicks: "Clicks",
    clickRate: "Click Rate",
    rechargeConv: "Recharge Conversion",
  };

  const metrics = data?.metrics || {};

  const tableData = Object.entries(metricLabels).map(([key, label]) => {
    const metric = metrics[key] || {};
    const suffix = percentageMetrics.includes(key) ? "%" : "";

    return {
      id: key,
      metric: label,
      yesterday: formatNumber(metric.yesterday, suffix),
      beforeYesterday: formatNumber(metric.beforeYesterday, suffix),
      last7Days: formatNumber(metric.last7Days, suffix),
      last30Days: formatNumber(metric.last30Days, suffix),
      thisMonth: formatNumber(metric.thisMonth, suffix),
      change: metric.text || "N/A",
      direction: metric.direction || "flat",
    };
  });

  const columns = [
    {
      key: "metric",
      label: "Metric",
      width: "1.4fr",
      align: "left",
      render: (value) => (
        <span style={{ fontWeight: 600, color: colors.accentLight }}>
          {value}
        </span>
      ),
    },
    {
      key: "yesterday",
      label: "Yesterday",
      width: "1fr",
    },
    {
      key: "beforeYesterday",
      label: "Before Yesterday",
      width: "1.2fr",
    },
    {
      key: "last7Days",
      label: "Last 7 Days",
      width: "1fr",
    },
    {
      key: "last30Days",
      label: "Last 30 Days",
      width: "1fr",
    },
    {
      key: "thisMonth",
      label: "This Month",
      width: "1fr",
    },
    {
      key: "change",
      label: "Change",
      width: "1fr",
      render: (value, row) => {
        const Icon =
          row.direction === "up"
            ? TrendingUp
            : row.direction === "down"
              ? TrendingDown
              : Minus;

        const color =
          row.direction === "up"
            ? colors.success
            : row.direction === "down"
              ? colors.danger
              : colors.textSecondary;

        return (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <Icon size={15} />
            {value}
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: 28 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2
            style={{
              color: colors.textPrimary,
              fontSize: 24,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Notification Insights
          </h2>

          <p
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              marginTop: 6,
            }}
          >
            Detailed notification performance and delivery metrics
          </p>
        </div>

        {/* {data?.filters?.dateRange && (
          <span
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.accentLight,
              padding: "8px 14px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {data.filters.dateRange.replaceAll("_", " ")}
          </span>
        )} */}
      </div>

      {/* Summary Cards */}
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {summaryCards.map((item) => {
          const Icon = item.icon;
          const value = data?.totals?.[item.key];

          return (
            <div
              key={item.key}
              style={{
                background: colors.gradientCard,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 16,
                padding: 20,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    color: colors.textSecondary,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </span>

                <div
                  style={{
                    background: colors.hover,
                    borderRadius: 10,
                    padding: 9,
                  }}
                >
                  <Icon size={19} color={item.color} />
                </div>
              </div>

              <div
                style={{
                  color: colors.textPrimary,
                  fontSize: 27,
                  fontWeight: 700,
                }}
              >
                {loading
                  ? "..."
                  : value !== undefined && value !== null
                    ? formatNumber(value)
                    : "N/A"}
              </div>
            </div>
          );
        })}
      </div> */}

      {/* Metrics Table */}
      <div
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 18,
          padding: 20,
          overflowX: "auto",
        }}
      >
        <div style={{ marginBottom: 14 }}>
          <h3
            style={{
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Performance Breakdown
          </h3>

          <p
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              marginTop: 5,
            }}
          >
            Compare notification metrics across different time periods
          </p>
        </div>

        {error ? (
          <div
            style={{
              color: colors.danger,
              padding: 24,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        ) : (
          <div style={{ minWidth: 850 }}>
            <DataTable
              columns={columns}
              data={tableData}
              loading={loading}
              error={error}
              paginationMode="client"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationInsights;

