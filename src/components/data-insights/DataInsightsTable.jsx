import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const DataInsightsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [asOf, setAsOf] = useState("");

  const fetchDataInsights = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};

      if (asOf) {
        params.asOf = new Date(asOf).toISOString();
      }

      const response = await axiosInstance.get("/api/v1/data-insights", {
        params,
      });

      const rows = response?.data?.data?.data?.rows || [];

      setData(rows);
    } catch (err) {
      console.error("Data insights error:", err);

      const message =
        err?.response?.data?.message ||
        "Failed to fetch data insights";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [asOf]);

  useEffect(() => {
    fetchDataInsights();
  }, [fetchDataInsights]);

  const formatEventName = (event) => {
    return event
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatChange = (value) => {
    if (value === null || value === undefined) {
      return "-";
    }

    if (value === 0) {
      return "0%";
    }

    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const getChangeStyle = (value) => {
    if (value === null || value === undefined) {
      return {
        color: colors.textMuted,
      };
    }

    if (value > 0) {
      return {
        color: colors.success,
        fontWeight: 600,
      };
    }

    if (value < 0) {
      return {
        color: colors.danger,
        fontWeight: 600,
      };
    }

    return {
      color: colors.textSecondary,
      fontWeight: 600,
    };
  };

  const columns = [
    {
      key: "event",
      label: "Event",
      width: "2fr",
      align: "left",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
            fontWeight: 600,
          }}
        >
          {formatEventName(value)}
        </span>
      ),
    },
    {
      key: "today",
      label: "Today",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.accentLight,
            fontWeight: 600,
          }}
        >
          {value ?? 0}
        </span>
      ),
    },
    {
      key: "yesterday",
      label: "Yesterday",
      width: "1fr",
      render: (value) => (
        <span style={{ color: colors.textPrimary }}>
          {value ?? 0}
        </span>
      ),
    },
    {
      key: "thisMonth",
      label: "This Month",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.accent,
            fontWeight: 700,
          }}
        >
          {value ?? 0}
        </span>
      ),
    },
    {
      key: "lastMonth",
      label: "Last Month",
      width: "1fr",
      render: (value) => (
        <span style={{ color: colors.textPrimary }}>
          {value ?? 0}
        </span>
      ),
    },
    {
      key: "changePercent",
      label: "Change %",
      width: "1.2fr",
      render: (value) => (
        <span style={getChangeStyle(value)}>
          {formatChange(value)}
        </span>
      ),
    },
    {
      key: "overall",
      label: "Overall",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
            fontWeight: 600,
          }}
        >
          {value ?? 0}
        </span>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: colors.textPrimary }}
        >
          Data Insights
        </h1>

        <p
          className="mt-1 text-sm"
          style={{ color: colors.textSecondary }}
        >
          Event counts for registration and Cashfree
          subscription/trial lifecycle events.
        </p>
      </div>

      {/* FILTER CARD */}
      {/* <div
        className="rounded-2xl p-5"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div className="flex flex-wrap items-end gap-4">
          
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold"
              style={{ color: colors.textSecondary }}
            >
              As Of
            </label>

            <input
              type="datetime-local"
              value={asOf}
              onChange={(e) => setAsOf(e.target.value)}
              className="rounded-lg px-3 py-2 outline-none"
              style={{
                width: 260,
                background: colors.inputBg,
                color: colors.textPrimary,
                border: `1px solid ${colors.inputBorder}`,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.inputFocus;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.inputBorder;
              }}
            />
          </div>

          
          <button
            type="button"
            onClick={fetchDataInsights}
            disabled={loading}
            className="rounded-lg px-5 py-2 font-semibold transition-all"
            style={{
              background: colors.gradientButton,
              color: colors.buttonText,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Apply"}
          </button>

          
          {asOf && (
            <button
              type="button"
              onClick={() => setAsOf("")}
              className="rounded-lg px-5 py-2 font-semibold"
              style={{
                background: colors.cardBg,
                color: colors.textSecondary,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div> */}

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        paginationMode="client"
      />
    </div>
  );
};

export default DataInsightsTable;
