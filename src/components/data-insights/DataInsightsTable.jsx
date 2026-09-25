import { Activity, AlertCircle, ChevronDown, ChevronUp, Clock3, RefreshCw, TrendingDown, TrendingUp, } from "lucide-react";
// import React, { useCallback, useEffect, useState } from "react";
// import { toast } from "sonner";
// import axiosInstance from "../../api/axiosInstance";
// import colors from "../../constants/colors";
// import DataTable from "../ui/DataTable";
// const DataInsightsTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [asOf, setAsOf] = useState("");
//   const fetchDataInsights = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = {};
//       if (asOf) {
//         params.asOf = new Date(asOf).toISOString();
//       }
//       const response = await axiosInstance.get("/api/v1/data-insights", {
//         params,
//       });
//       const rows = response?.data?.data?.data?.rows || [];
//       setData(rows);
//     } catch (err) {
//       console.error("Data insights error:", err);
//       const message =
//         err?.response?.data?.message ||
//         "Failed to fetch data insights";
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   }, [asOf]);
//   useEffect(() => {
//     fetchDataInsights();
//   }, [fetchDataInsights]);
//   const formatEventName = (event) => {
//     return event
//       ?.split("_")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };
//   const formatChange = (value) => {
//     if (value === null || value === undefined) {
//       return "-";
//     }
//     if (value === 0) {
//       return "0%";
//     }
//     return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
//   };
//   const getChangeStyle = (value) => {
//     if (value === null || value === undefined) {
//       return {
//         color: colors.textMuted,
//       };
//     }
//     if (value > 0) {
//       return {
//         color: colors.success,
//         fontWeight: 600,
//       };
//     }
//     if (value < 0) {
//       return {
//         color: colors.danger,
//         fontWeight: 600,
//       };
//     }
//     return {
//       color: colors.textSecondary,
//       fontWeight: 600,
//     };
//   };
//   const columns = [
//     {
//       key: "event",
//       label: "Event",
//       width: "2fr",
//       align: "left",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//             fontWeight: 600,
//           }}
//         >
//           {formatEventName(value)}
//         </span>
//       ),
//     },
//     {
//       key: "today",
//       label: "Today",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.accentLight,
//             fontWeight: 600,
//           }}
//         >
//           {value ?? 0}
//         </span>
//       ),
//     },
//     {
//       key: "yesterday",
//       label: "Yesterday",
//       width: "1fr",
//       render: (value) => (
//         <span style={{ color: colors.textPrimary }}>
//           {value ?? 0}
//         </span>
//       ),
//     },
//     {
//       key: "thisMonth",
//       label: "This Month",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.accent,
//             fontWeight: 700,
//           }}
//         >
//           {value ?? 0}
//         </span>
//       ),
//     },
//     {
//       key: "lastMonth",
//       label: "Last Month",
//       width: "1fr",
//       render: (value) => (
//         <span style={{ color: colors.textPrimary }}>
//           {value ?? 0}
//         </span>
//       ),
//     },
//     {
//       key: "changePercent",
//       label: "Change %",
//       width: "1.2fr",
//       render: (value) => (
//         <span style={getChangeStyle(value)}>
//           {formatChange(value)}
//         </span>
//       ),
//     },
//     {
//       key: "overall",
//       label: "Overall",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//             fontWeight: 600,
//           }}
//         >
//           {value ?? 0}
//         </span>
//       ),
//     },
//   ];
//   return (
//     <div
//       className="min-h-screen p-6"
//       style={{
//         background: colors.pageBg,
//         color: colors.textPrimary,
//       }}
//     >
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1
//           className="text-2xl font-bold"
//           style={{ color: colors.textPrimary }}
//         >
//           Data Insights
//         </h1>
//         <p
//           className="mt-1 text-sm"
//           style={{ color: colors.textSecondary }}
//         >
//           Event counts for registration and Cashfree
//           subscription/trial lifecycle events.
//         </p>
//       </div>
//       {/* FILTER CARD */}
//       {/* <div
//         className="rounded-2xl p-5"
//         style={{
//           background: colors.gradientCard,
//           border: `1px solid ${colors.cardBorder}`,
//         }}
//       >
//         <div className="flex flex-wrap items-end gap-4">
//           <div className="flex flex-col gap-2">
//             <label
//               className="text-sm font-semibold"
//               style={{ color: colors.textSecondary }}
//             >
//               As Of
//             </label>
//             <input
//               type="datetime-local"
//               value={asOf}
//               onChange={(e) => setAsOf(e.target.value)}
//               className="rounded-lg px-3 py-2 outline-none"
//               style={{
//                 width: 260,
//                 background: colors.inputBg,
//                 color: colors.textPrimary,
//                 border: `1px solid ${colors.inputBorder}`,
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = colors.inputFocus;
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = colors.inputBorder;
//               }}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={fetchDataInsights}
//             disabled={loading}
//             className="rounded-lg px-5 py-2 font-semibold transition-all"
//             style={{
//               background: colors.gradientButton,
//               color: colors.buttonText,
//               opacity: loading ? 0.6 : 1,
//               cursor: loading ? "not-allowed" : "pointer",
//             }}
//           >
//             {loading ? "Loading..." : "Apply"}
//           </button>
//           {asOf && (
//             <button
//               type="button"
//               onClick={() => setAsOf("")}
//               className="rounded-lg px-5 py-2 font-semibold"
//               style={{
//                 background: colors.cardBg,
//                 color: colors.textSecondary,
//                 border: `1px solid ${colors.cardBorder}`,
//               }}
//             >
//               Reset
//             </button>
//           )}
//         </div>
//       </div> */}
//       {/* TABLE */}
//       <DataTable
//         columns={columns}
//         data={data}
//         loading={loading}
//         error={error}
//         paginationMode="client"
//       />
//     </div>
//   );
// };
// export default DataInsightsTable;
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const DataInsightsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expandedEvent, setExpandedEvent] = useState(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState(null);

  const fetchDataInsights = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        "/api/v1/data-insights"
      );

      const result = response?.data?.data?.data;

      const rows = result?.rows || [];

      setData(rows);
      setLastGeneratedAt(result?.generatedAt || null);
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
  }, []);

  useEffect(() => {
    fetchDataInsights();
  }, [fetchDataInsights]);

  const formatEventName = (event) => {
    if (!event) return "-";

    return event
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const formatNumber = (value) => {
    if (value === null || value === undefined) {
      return "0";
    }

    return Number(value).toLocaleString("en-IN");
  };

  const formatChange = (value) => {
    if (value === null || value === undefined) {
      return "N/A";
    }

    if (value === 0) {
      return "0%";
    }

    return `${value > 0 ? "+" : ""}${Number(value).toFixed(2)}%`;
  };

  const getChangeStyle = (value) => {
    if (value === null || value === undefined) {
      return {
        color: colors.textMuted,
        background: `${colors.textMuted}15`,
      };
    }

    if (value > 0) {
      return {
        color: colors.success,
        background: `${colors.success}15`,
      };
    }

    if (value < 0) {
      return {
        color: colors.danger,
        background: `${colors.danger}15`,
      };
    }

    return {
      color: colors.textSecondary,
      background: `${colors.textSecondary}15`,
    };
  };

  const isCancellationEvent = (event) => {
    return event?.includes("cancelled");
  };

  const selectedCancellation = useMemo(() => {
    if (!expandedEvent) return null;

    return (
      data.find(
        (item) => item.event === expandedEvent
      ) || null
    );
  }, [data, expandedEvent]);

  const summary = useMemo(() => {
    const totalToday = data.reduce(
      (sum, item) => sum + Number(item.today || 0),
      0
    );

    const totalYesterday = data.reduce(
      (sum, item) => sum + Number(item.yesterday || 0),
      0
    );

    const totalThisMonth = data.reduce(
      (sum, item) => sum + Number(item.thisMonth || 0),
      0
    );

    const totalOverall = data.reduce(
      (sum, item) => sum + Number(item.overall || 0),
      0
    );

    const cancellationEvents = data.filter((item) =>
      isCancellationEvent(item.event)
    );

    const totalCancellationsToday =
      cancellationEvents.reduce(
        (sum, item) => sum + Number(item.today || 0),
        0
      );

    return {
      totalToday,
      totalYesterday,
      totalThisMonth,
      totalOverall,
      totalCancellationsToday,
    };
  }, [data]);

  const cancellationTypes = [
    {
      key: "cancelledByApp",
      label: "App",
    },
    {
      key: "cancelledByWebhook",
      label: "Webhook",
    },
    {
      key: "cancelledByAdmin",
      label: "Admin",
    },
    {
      key: "cancelledByReconciliation",
      label: "Reconciliation",
    },
    {
      key: "cancelledByOther",
      label: "Other",
    },
  ];

  const toggleCancellation = (event) => {
    setExpandedEvent((current) =>
      current === event ? null : event
    );
  };

  const formatGeneratedAt = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "-";
    }
  };

  const columns = [
    {
      key: "event",
      label: "Event",
      width: "2.2fr",
      align: "left",
      render: (value) => {
        const canExpand = isCancellationEvent(value);
        const isExpanded = expandedEvent === value;

        return (
          <div
            className={
              canExpand
                ? "flex items-center gap-2"
                : "flex items-center"
            }
          >
            <span
              style={{
                color: colors.textPrimary,
                fontWeight: 600,
              }}
            >
              {formatEventName(value)}
            </span>

            {canExpand && (
              <button
                type="button"
                onClick={() =>
                  toggleCancellation(value)
                }
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-all"
                style={{
                  color: colors.accent,
                  background: isExpanded
                    ? `${colors.accent}20`
                    : `${colors.accent}10`,
                  border: `1px solid ${colors.accent}30`,
                  cursor: "pointer",
                }}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp size={13} />
                    Hide
                  </>
                ) : (
                  <>
                    <ChevronDown size={13} />
                    Details
                  </>
                )}
              </button>
            )}
          </div>
        );
      },
    },

    {
      key: "today",
      label: "Today",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.accentLight,
            fontWeight: 700,
          }}
        >
          {formatNumber(value)}
        </span>
      ),
    },

    {
      key: "yesterday",
      label: "Yesterday",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
          }}
        >
          {formatNumber(value)}
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
          {formatNumber(value)}
        </span>
      ),
    },

    {
      key: "lastMonth",
      label: "Last Month",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
          }}
        >
          {formatNumber(value)}
        </span>
      ),
    },

    {
      key: "changePercent",
      label: "Change %",
      width: "1.2fr",
      render: (value) => {
        const style = getChangeStyle(value);

        return (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={style}
          >
            {value > 0 && (
              <TrendingUp size={13} />
            )}

            {value < 0 && (
              <TrendingDown size={13} />
            )}

            {formatChange(value)}
          </span>
        );
      },
    },

    {
      key: "overall",
      label: "Overall",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
            fontWeight: 700,
          }}
        >
          {formatNumber(value)}
        </span>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: `${colors.accent}15`,
              color: colors.accent,
              border: `1px solid ${colors.accent}30`,
            }}
          >
            <Activity size={22} />
          </div>

          <div>
            <h1
              className="text-2xl font-bold"
              style={{
                color: colors.textPrimary,
              }}
            >
              Data Insights
            </h1>

            <p
              className="mt-1 text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              Registration and Cashfree subscription/trial
              lifecycle events.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastGeneratedAt && (
            <div
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-xs sm:flex"
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                color: colors.textSecondary,
              }}
            >
              <Clock3 size={14} />

              <span>
                Updated{" "}
                {formatGeneratedAt(lastGeneratedAt)}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={fetchDataInsights}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
            style={{
              background: colors.buttonBg,
              color: colors.buttonText,
              opacity: loading ? 0.6 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            <RefreshCw
              size={16}
              className={
                loading ? "animate-spin" : ""
              }
            />

            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard
          title="Today's Events"
          value={summary.totalToday}
          icon={<Activity size={18} />}
          iconColor={colors.accentLight}
        />

        <SummaryCard
          title="Yesterday"
          value={summary.totalYesterday}
          icon={<Clock3 size={18} />}
          iconColor={colors.textSecondary}
        />

        <SummaryCard
          title="This Month"
          value={summary.totalThisMonth}
          icon={<TrendingUp size={18} />}
          iconColor={colors.accent}
          valueColor={colors.accent}
        />

        <SummaryCard
          title="Overall Events"
          value={summary.totalOverall}
          icon={<Activity size={18} />}
          iconColor={colors.success}
        />

        <SummaryCard
          title="Cancellations Today"
          value={summary.totalCancellationsToday}
          icon={<AlertCircle size={18} />}
          iconColor={colors.danger}
          valueColor={colors.danger}
        />
      </div>

      {/* TABLE */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          error={error}
          paginationMode="client"
        />
      </div>

      {/* EXPANDED DETAILS */}
      {selectedCancellation && (
        <div
          className="mt-5 overflow-hidden rounded-2xl"
          style={{
            background:
              colors.gradientCard || colors.cardBg,
            border: `1px solid ${colors.accent}35`,
            boxShadow: `0 8px 30px ${colors.accent}08`,
          }}
        >
          {/* DETAIL HEADER */}
          <div
            className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            style={{
              borderColor: colors.cardBorder,
            }}
          >
            <div>
              <div className="flex items-center gap-2">
                <AlertCircle
                  size={18}
                  style={{
                    color: colors.accent,
                  }}
                />

                <h3
                  className="font-semibold"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {formatEventName(
                    selectedCancellation.event
                  )}{" "}
                  Breakdown
                </h3>
              </div>

              <p
                className="mt-1 text-xs"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Cancellation source distribution
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setExpandedEvent(null)
              }
              className="flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-semibold sm:self-auto"
              style={{
                background: colors.cardBg,
                color: colors.textSecondary,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <ChevronUp size={14} />
              Collapse
            </button>
          </div>

          {/* BREAKDOWN CARDS */}
          <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 xl:grid-cols-5">
            {cancellationTypes.map((type) => {
              const breakdown =
                selectedCancellation[type.key];

              if (!breakdown) return null;

              return (
                <div
                  key={type.key}
                  className="rounded-xl p-4"
                  style={{
                    background: colors.cardBg,
                    border: `1px solid ${colors.cardBorder}`,
                  }}
                >
                  <div
                    className="mb-3 flex items-center justify-between"
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      {type.label}
                    </span>

                    <span
                      className="rounded-full px-2 py-1 text-[10px] font-semibold"
                      style={{
                        color: colors.accent,
                        background: `${colors.accent}12`,
                      }}
                    >
                      Overall
                    </span>
                  </div>

                  <div
                    className="mb-4 text-2xl font-bold"
                    style={{
                      color: colors.accent,
                    }}
                  >
                    {formatNumber(
                      breakdown.overall
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <BreakdownValue
                      label="Today"
                      value={breakdown.today}
                    />

                    <BreakdownValue
                      label="Yesterday"
                      value={breakdown.yesterday}
                    />

                    <BreakdownValue
                      label="This Month"
                      value={breakdown.thisMonth}
                    />

                    <BreakdownValue
                      label="Last Month"
                      value={breakdown.lastMonth}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        !error &&
        data.length === 0 && (
          <div
            className="mt-5 flex flex-col items-center justify-center rounded-2xl p-10"
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <Activity
              size={32}
              style={{
                color: colors.textMuted,
              }}
            />

            <h3
              className="mt-3 font-semibold"
              style={{
                color: colors.textPrimary,
              }}
            >
              No data available
            </h3>

            <p
              className="mt-1 text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              There are no data insights available
              at the moment.
            </p>
          </div>
        )}
    </div>
  );
};

/* ---------------------------------------------
   SUMMARY CARD
--------------------------------------------- */

const SummaryCard = ({
  title,
  value,
  icon,
  iconColor,
  valueColor,
}) => {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: colors.gradientCard || colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-sm"
          style={{
            color: colors.textSecondary,
          }}
        >
          {title}
        </span>

        <span
          style={{
            color: iconColor,
          }}
        >
          {icon}
        </span>
      </div>

      <div
        className="mt-3 text-2xl font-bold"
        style={{
          color: valueColor || colors.textPrimary,
        }}
      >
        {Number(value || 0).toLocaleString("en-IN")}
      </div>
    </div>
  );
};

/* ---------------------------------------------
   BREAKDOWN VALUE
--------------------------------------------- */

const BreakdownValue = ({ label, value }) => {
  return (
    <div>
      <div
        className="text-[11px]"
        style={{
          color: colors.textMuted,
        }}
      >
        {label}
      </div>

      <div
        className="mt-1 text-sm font-semibold"
        style={{
          color: colors.textPrimary,
        }}
      >
        {Number(value || 0).toLocaleString("en-IN")}
      </div>
    </div>
  );
};

export default DataInsightsTable;