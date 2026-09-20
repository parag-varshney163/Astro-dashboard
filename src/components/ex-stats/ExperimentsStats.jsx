import { RefreshCcw, Search, Activity, Users, Zap, TrendingUp } from "lucide-react";
import React, { useState } from "react";

import FilterDropDown from "../../components/ui/FilterDropDown";
import DataTable from "../../components/ui/DataTable";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const EXPERIMENT_KEYS = [
  "onboarding_flow",
  "subscription_price",
];

const ExperimentStats = () => {
  const [experimentKey, setExperimentKey] = useState("onboarding_flow");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------------------
  // Fetch Experiment Stats
  // -----------------------------------------
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        experimentKey,
      };

      if (from) {
        params.from = from;
      }

      if (to) {
        params.to = to;
      }

      const response = await axiosInstance.get(
        "/api/v1/experiments/stats",
        {
          params,
        }
      );

      if (response?.data?.success) {
        setStats(response.data.data);
      } else {
        setStats(null);
        setError(
          response?.data?.message || "Failed to fetch experiment stats"
        );
      }
    } catch (err) {
      console.error("Experiment stats error:", err);

      setStats(null);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while fetching experiment stats"
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Reset Filters
  // -----------------------------------------
  const handleReset = () => {
    setExperimentKey("onboarding_flow");
    setFrom("");
    setTo("");
    setStats(null);
    setError("");
  };

  // -----------------------------------------
  // Table Columns
  // -----------------------------------------
  const columns = [
    {
      key: "variant",
      label: "Variant",
      width: "1.5fr",
      align: "left",
      render: (value) => (
        <span
          style={{
            color: colors.accentLight,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {value || "-"}
        </span>
      ),
    },

    {
      key: "registrations",
      label: "Registrations",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
            fontWeight: 600,
          }}
        >
          {Number(value || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "trials",
      label: "Trials",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
            fontWeight: 600,
          }}
        >
          {Number(value || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "activeTrials",
      label: "Active Trials",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.success,
            fontWeight: 600,
          }}
        >
          {Number(value || 0).toLocaleString()}
        </span>
      ),
    },

    {
      key: "trialRatePct",
      label: "Trial Rate",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.warning,
            fontWeight: 600,
          }}
        >
          {value ?? 0}%
        </span>
      ),
    },

    {
      key: "activeTrialRatePct",
      label: "Active Trial Rate",
      width: "1.2fr",
      render: (value) => (
        <span
          style={{
            color: colors.accentLight,
            fontWeight: 600,
          }}
        >
          {value ?? 0}%
        </span>
      ),
    },
  ];

  // -----------------------------------------
  // Summary Card
  // -----------------------------------------
  const SummaryCard = ({
    title,
    value,
    icon: Icon,
    valueColor = colors.textPrimary,
  }) => {
    return (
      <div
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 16,
          padding: "20px",
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {title}
          </span>

          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: colors.hover,
              border: `1px solid ${colors.cardBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={colors.accentLight} />
          </div>
        </div>

        <div
          style={{
            color: valueColor,
            fontSize: 26,
            fontWeight: 700,
            marginTop: 12,
          }}
        >
          {value}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.pageBg,
        padding: "24px",
        color: colors.textPrimary,
      }}
    >
      {/* -------------------------------- */}
      {/* PAGE HEADER */}
      {/* -------------------------------- */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: colors.textPrimary,
          }}
        >
          Experiment Stats
        </h1>

        <p
          style={{
            marginTop: 6,
            color: colors.textSecondary,
            fontSize: 14,
          }}
        >
          Analyze A/B experiment funnel performance by variant.
        </p>
      </div>

      {/* -------------------------------- */}
      {/* FILTER CARD */}
      {/* -------------------------------- */}
      <div
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 18,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 18,
          }}
        >
          <Activity size={18} color={colors.accent} />

          <h2
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              color: colors.textPrimary,
            }}
          >
            Experiment Filters
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {/* Experiment Key */}
          <div style={{ minWidth: 220 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                color: colors.textSecondary,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Experiment Key
            </label>

            <FilterDropDown
              options={EXPERIMENT_KEYS}
              defaultLabel={experimentKey}
              width={220}
              onSelect={(value) => {
                setExperimentKey(value);
              }}
            />
          </div>

          {/* From */}
          <div style={{ minWidth: 200 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                color: colors.textSecondary,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              From
            </label>

            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={{
                width: "100%",
                height: 42,
                padding: "0 12px",
                borderRadius: 10,
                border: `1px solid ${colors.inputBorder}`,
                background: colors.inputBg,
                color: colors.textPrimary,
                outline: "none",
                fontSize: 14,
                boxSizing: "border-box",
                colorScheme: "dark",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.inputFocus;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.inputBorder;
              }}
            />
          </div>

          {/* To */}
          <div style={{ minWidth: 200 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                color: colors.textSecondary,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              To
            </label>

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={{
                width: "100%",
                height: 42,
                padding: "0 12px",
                borderRadius: 10,
                border: `1px solid ${colors.inputBorder}`,
                background: colors.inputBg,
                color: colors.textPrimary,
                outline: "none",
                fontSize: 14,
                boxSizing: "border-box",
                colorScheme: "dark",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.inputFocus;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.inputBorder;
              }}
            />
          </div>

          {/* Apply */}
          <button
            onClick={fetchStats}
            disabled={loading}
            style={{
              height: 42,
              padding: "0 20px",
              borderRadius: 10,
              border: "none",
              background: colors.gradientButton,
              color: colors.buttonText,
              fontWeight: 700,
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Search size={17} />

            {loading ? "Loading..." : "Apply Filters"}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            style={{
              height: 42,
              padding: "0 18px",
              borderRadius: 10,
              border: `1px solid ${colors.cardBorder}`,
              background: colors.cardBg,
              color: colors.textSecondary,
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.hover;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.cardBg;
              e.currentTarget.style.color = colors.textSecondary;
            }}
          >
            <RefreshCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* ERROR */}
      {/* -------------------------------- */}
      {error && (
        <div
          style={{
            marginBottom: 20,
            padding: "14px 18px",
            borderRadius: 12,
            border: `1px solid ${colors.danger}`,
            background: "rgba(224,82,82,0.08)",
            color: colors.danger,
            fontSize: 14,
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* -------------------------------- */}
      {/* RESULT */}
      {/* -------------------------------- */}
      {stats && (
        <>
          {/* Experiment Info */}
          <div
            style={{
              background: colors.gradientHero,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 18,
              padding: "18px 20px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  color: colors.textMuted,
                  fontSize: 12,
                  textTransform: "uppercase",
                  marginBottom: 6,
                  letterSpacing: 0.5,
                }}
              >
                Experiment
              </div>

              <div
                style={{
                  color: colors.accentLight,
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {stats.experimentKey}
              </div>
            </div>

            <div
              style={{
                padding: "7px 14px",
                borderRadius: 20,
                background: stats.isActive
                  ? "rgba(61,190,108,0.12)"
                  : "rgba(224,82,82,0.12)",
                border: `1px solid ${
                  stats.isActive ? colors.success : colors.danger
                }`,
                color: stats.isActive
                  ? colors.success
                  : colors.danger,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {stats.isActive ? "Active" : "Inactive"}
            </div>
          </div>

          {/* Summary Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <SummaryCard
              title="Total Registrations"
              value={Number(
                stats.totals?.registrations || 0
              ).toLocaleString()}
              icon={Users}
            />

            <SummaryCard
              title="Total Trials"
              value={Number(
                stats.totals?.trials || 0
              ).toLocaleString()}
              icon={TrendingUp}
              valueColor={colors.warning}
            />

            <SummaryCard
              title="Active Trials"
              value={Number(
                stats.totals?.activeTrials || 0
              ).toLocaleString()}
              icon={Zap}
              valueColor={colors.success}
            />

            <SummaryCard
              title="Trial Rate"
              value={`${stats.totals?.trialRatePct ?? 0}%`}
              icon={Activity}
              valueColor={colors.accentLight}
            />
          </div>

          {/* -------------------------------- */}
          {/* VARIANT TABLE */}
          {/* -------------------------------- */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: colors.textPrimary,
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Variant Performance
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: colors.textMuted,
                    fontSize: 13,
                  }}
                >
                  Funnel statistics for each experiment variant.
                </p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={stats.variants || []}
              loading={loading}
              error={error}
            />
          </div>

          {/* -------------------------------- */}
          {/* NOTE */}
          {/* -------------------------------- */}
          {stats.note && (
            <div
              style={{
                marginTop: 18,
                padding: "14px 18px",
                borderRadius: 12,
                background: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                color: colors.textMuted,
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              <strong
                style={{
                  color: colors.textSecondary,
                }}
              >
                Note:
              </strong>{" "}
              {stats.note}
            </div>
          )}
        </>
      )}

      {/* -------------------------------- */}
      {/* INITIAL STATE */}
      {/* -------------------------------- */}
      {!stats && !loading && !error && (
        <div
          style={{
            background: colors.gradientCard,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 18,
            padding: "60px 20px",
            textAlign: "center",
          }}
        >
          <Activity
            size={42}
            color={colors.accent}
            style={{ marginBottom: 12 }}
          />

          <h3
            style={{
              margin: 0,
              color: colors.textPrimary,
              fontSize: 18,
            }}
          >
            Select Experiment & Apply Filters
          </h3>

          <p
            style={{
              marginTop: 8,
              color: colors.textMuted,
              fontSize: 14,
            }}
          >
            Choose an experiment key and optional date range to view
            funnel statistics.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExperimentStats;
