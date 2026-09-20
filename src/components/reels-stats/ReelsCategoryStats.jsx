import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const ReelsCategoryStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(
        "/api/v1/reels/stats/categories"
      );

      if (response?.data?.success) {
        setData(response.data.data || []);
      } else {
        setError(
          response?.data?.message || "Failed to fetch reel category stats"
        );
      }
    } catch (err) {
      console.error("Failed to fetch reel category stats:", err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong while fetching category stats"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryStats();
  }, []);

  const formatCategory = (category) => {
    if (!category) return "-";

    return category
      .split("_")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return "0s";

    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);

    if (mins === 0) return `${secs}s`;

    return `${mins}m ${secs}s`;
  };

  const columns = [
    {
      key: "category",
      label: "Category",
      width: "1.4fr",
      align: "left",
      render: (value) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.accent,
              boxShadow: `0 0 8px ${colors.accent}`,
              flexShrink: 0,
            }}
          />

          <span
            style={{
              color: colors.textPrimary,
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatCategory(value)}
          </span>
        </div>
      ),
    },

    {
      key: "totalReels",
      label: "Reels",
      width: "0.8fr",
      render: (value) => (
        <span style={{ fontWeight: 600 }}>
          {Number(value || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "totalViews",
      label: "Views",
      width: "0.9fr",
      render: (value) => (
        <span>
          {Number(value || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "totalLikes",
      label: "Likes",
      width: "0.9fr",
      render: (value) => (
        <span
          style={{
            color: colors.accentLight,
            fontWeight: 600,
          }}
        >
          {Number(value || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "totalShares",
      label: "Shares",
      width: "0.9fr",
      render: (value) => (
        <span>
          {Number(value || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "avgViewsPerReel",
      label: "Avg Views",
      width: "1fr",
      render: (value) => (
        <span>
          {Number(value || 0).toFixed(2)}
        </span>
      ),
    },

    {
      key: "avgDurationSeconds",
      label: "Avg Duration",
      width: "1.1fr",
      render: (value) => (
        <span>
          {formatDuration(Number(value || 0))}
        </span>
      ),
    },

    {
      key: "estimatedWatchTimeHours",
      label: "Watch Time",
      width: "1.1fr",
      render: (value) => (
        <span
          style={{
            color: colors.success,
            fontWeight: 600,
          }}
        >
          {Number(value || 0).toFixed(2)}h
        </span>
      ),
    },

    {
      key: "likeRatePct",
      label: "Like Rate",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.accentLight,
            fontWeight: 600,
          }}
        >
          {Number(value || 0).toFixed(2)}%
        </span>
      ),
    },

    {
      key: "shareRatePct",
      label: "Share Rate",
      width: "1fr",
      render: (value) => (
        <span>
          {Number(value || 0).toFixed(2)}%
        </span>
      ),
    },
  ];

  return (
    <div
      className="w-full"
      style={{
        color: colors.textPrimary,
      }}
    >
      {/* HEADER */}
      <div
        className="flex justify-between items-center"
        style={{
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: colors.textPrimary,
            }}
          >
            Reel Category Performance
          </h2>

          <p
            style={{
              marginTop: 6,
              marginBottom: 0,
              color: colors.textMuted,
              fontSize: 14,
            }}
          >
            Performance breakdown of reels by category
          </p>
        </div>

        <button
          onClick={fetchCategoryStats}
          disabled={loading}
          style={{
            padding: "9px 16px",
            borderRadius: 10,
            border: `1px solid ${colors.cardBorder}`,
            background: colors.cardBg,
            color: colors.textPrimary,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = colors.hover;
              e.currentTarget.style.borderColor = colors.accent;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.cardBg;
            e.currentTarget.style.borderColor = colors.cardBorder;
          }}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ReelsCategoryStats;
