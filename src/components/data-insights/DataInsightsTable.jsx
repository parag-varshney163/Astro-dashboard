import { Activity, AlertCircle, CalendarDays, CheckCircle2, ChevronDown, ChevronUp, Clock3, CreditCard, Filter, RefreshCw, RotateCcw, TrendingDown, TrendingUp, Users, XCircle, Zap, } from "lucide-react";
// import { Activity, AlertCircle, ChevronDown, ChevronUp, Clock3, RefreshCw, TrendingDown, TrendingUp, } from "lucide-react";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { toast } from "sonner";
// import axiosInstance from "../../api/axiosInstance";
// import colors from "../../constants/colors";
// import DataTable from "../ui/DataTable";
// const DataInsightsTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [expandedEvent, setExpandedEvent] = useState(null);
//   const [lastGeneratedAt, setLastGeneratedAt] = useState(null);
//   const fetchDataInsights = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.get(
//         "/api/v1/data-insights"
//       );
//       const result = response?.data?.data?.data;
//       const rows = result?.rows || [];
//       setData(rows);
//       setLastGeneratedAt(result?.generatedAt || null);
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
//   }, []);
//   useEffect(() => {
//     fetchDataInsights();
//   }, [fetchDataInsights]);
//   const formatEventName = (event) => {
//     if (!event) return "-";
//     return event
//       .split("_")
//       .map(
//         (word) =>
//           word.charAt(0).toUpperCase() + word.slice(1)
//       )
//       .join(" ");
//   };
//   const formatNumber = (value) => {
//     if (value === null || value === undefined) {
//       return "0";
//     }
//     return Number(value).toLocaleString("en-IN");
//   };
//   const formatChange = (value) => {
//     if (value === null || value === undefined) {
//       return "N/A";
//     }
//     if (value === 0) {
//       return "0%";
//     }
//     return `${value > 0 ? "+" : ""}${Number(value).toFixed(2)}%`;
//   };
//   const getChangeStyle = (value) => {
//     if (value === null || value === undefined) {
//       return {
//         color: colors.textMuted,
//         background: `${colors.textMuted}15`,
//       };
//     }
//     if (value > 0) {
//       return {
//         color: colors.success,
//         background: `${colors.success}15`,
//       };
//     }
//     if (value < 0) {
//       return {
//         color: colors.danger,
//         background: `${colors.danger}15`,
//       };
//     }
//     return {
//       color: colors.textSecondary,
//       background: `${colors.textSecondary}15`,
//     };
//   };
//   const isCancellationEvent = (event) => {
//     return event?.includes("cancelled");
//   };
//   const selectedCancellation = useMemo(() => {
//     if (!expandedEvent) return null;
//     return (
//       data.find(
//         (item) => item.event === expandedEvent
//       ) || null
//     );
//   }, [data, expandedEvent]);
//   const summary = useMemo(() => {
//     const totalToday = data.reduce(
//       (sum, item) => sum + Number(item.today || 0),
//       0
//     );
//     const totalYesterday = data.reduce(
//       (sum, item) => sum + Number(item.yesterday || 0),
//       0
//     );
//     const totalThisMonth = data.reduce(
//       (sum, item) => sum + Number(item.thisMonth || 0),
//       0
//     );
//     const totalOverall = data.reduce(
//       (sum, item) => sum + Number(item.overall || 0),
//       0
//     );
//     const cancellationEvents = data.filter((item) =>
//       isCancellationEvent(item.event)
//     );
//     const totalCancellationsToday =
//       cancellationEvents.reduce(
//         (sum, item) => sum + Number(item.today || 0),
//         0
//       );
//     return {
//       totalToday,
//       totalYesterday,
//       totalThisMonth,
//       totalOverall,
//       totalCancellationsToday,
//     };
//   }, [data]);
//   const cancellationTypes = [
//     {
//       key: "cancelledByApp",
//       label: "App",
//     },
//     {
//       key: "cancelledByWebhook",
//       label: "Webhook",
//     },
//     {
//       key: "cancelledByAdmin",
//       label: "Admin",
//     },
//     {
//       key: "cancelledByReconciliation",
//       label: "Reconciliation",
//     },
//     {
//       key: "cancelledByOther",
//       label: "Other",
//     },
//   ];
//   const toggleCancellation = (event) => {
//     setExpandedEvent((current) =>
//       current === event ? null : event
//     );
//   };
//   const formatGeneratedAt = (date) => {
//     if (!date) return "-";
//     try {
//       return new Date(date).toLocaleString("en-IN", {
//         dateStyle: "medium",
//         timeStyle: "short",
//       });
//     } catch {
//       return "-";
//     }
//   };
//   const columns = [
//     {
//       key: "event",
//       label: "Event",
//       width: "2.2fr",
//       align: "left",
//       render: (value) => {
//         const canExpand = isCancellationEvent(value);
//         const isExpanded = expandedEvent === value;
//         return (
//           <div
//             className={
//               canExpand
//                 ? "flex items-center gap-2"
//                 : "flex items-center"
//             }
//           >
//             <span
//               style={{
//                 color: colors.textPrimary,
//                 fontWeight: 600,
//               }}
//             >
//               {formatEventName(value)}
//             </span>
//             {canExpand && (
//               <button
//                 type="button"
//                 onClick={() =>
//                   toggleCancellation(value)
//                 }
//                 className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-all"
//                 style={{
//                   color: colors.accent,
//                   background: isExpanded
//                     ? `${colors.accent}20`
//                     : `${colors.accent}10`,
//                   border: `1px solid ${colors.accent}30`,
//                   cursor: "pointer",
//                 }}
//               >
//                 {isExpanded ? (
//                   <>
//                     <ChevronUp size={13} />
//                     Hide
//                   </>
//                 ) : (
//                   <>
//                     <ChevronDown size={13} />
//                     Details
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       key: "today",
//       label: "Today",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.accentLight,
//             fontWeight: 700,
//           }}
//         >
//           {formatNumber(value)}
//         </span>
//       ),
//     },
//     {
//       key: "yesterday",
//       label: "Yesterday",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//           }}
//         >
//           {formatNumber(value)}
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
//           {formatNumber(value)}
//         </span>
//       ),
//     },
//     {
//       key: "lastMonth",
//       label: "Last Month",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//           }}
//         >
//           {formatNumber(value)}
//         </span>
//       ),
//     },
//     {
//       key: "changePercent",
//       label: "Change %",
//       width: "1.2fr",
//       render: (value) => {
//         const style = getChangeStyle(value);
//         return (
//           <span
//             className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
//             style={style}
//           >
//             {value > 0 && (
//               <TrendingUp size={13} />
//             )}
//             {value < 0 && (
//               <TrendingDown size={13} />
//             )}
//             {formatChange(value)}
//           </span>
//         );
//       },
//     },
//     {
//       key: "overall",
//       label: "Overall",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//             fontWeight: 700,
//           }}
//         >
//           {formatNumber(value)}
//         </span>
//       ),
//     },
//   ];
//   return (
//     <div
//       className="min-h-screen p-4 md:p-6"
//       style={{
//         background: colors.pageBg,
//         color: colors.textPrimary,
//       }}
//     >
//       {/* HEADER */}
//       <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div className="flex items-center gap-3">
//           <div
//             className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
//             style={{
//               background: `${colors.accent}15`,
//               color: colors.accent,
//               border: `1px solid ${colors.accent}30`,
//             }}
//           >
//             <Activity size={22} />
//           </div>
//           <div>
//             <h1
//               className="text-2xl font-bold"
//               style={{
//                 color: colors.textPrimary,
//               }}
//             >
//               Data Insights
//             </h1>
//             <p
//               className="mt-1 text-sm"
//               style={{
//                 color: colors.textSecondary,
//               }}
//             >
//               Registration and Cashfree subscription/trial
//               lifecycle events.
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           {lastGeneratedAt && (
//             <div
//               className="hidden items-center gap-2 rounded-lg px-3 py-2 text-xs sm:flex"
//               style={{
//                 background: colors.cardBg,
//                 border: `1px solid ${colors.cardBorder}`,
//                 color: colors.textSecondary,
//               }}
//             >
//               <Clock3 size={14} />
//               <span>
//                 Updated{" "}
//                 {formatGeneratedAt(lastGeneratedAt)}
//               </span>
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={fetchDataInsights}
//             disabled={loading}
//             className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
//             style={{
//               background: colors.buttonBg,
//               color: colors.buttonText,
//               opacity: loading ? 0.6 : 1,
//               cursor: loading
//                 ? "not-allowed"
//                 : "pointer",
//             }}
//           >
//             <RefreshCw
//               size={16}
//               className={
//                 loading ? "animate-spin" : ""
//               }
//             />
//             {loading ? "Refreshing..." : "Refresh"}
//           </button>
//         </div>
//       </div>
//       {/* SUMMARY */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <SummaryCard
//           title="Today's Events"
//           value={summary.totalToday}
//           icon={<Activity size={18} />}
//           iconColor={colors.accentLight}
//         />
//         <SummaryCard
//           title="Yesterday"
//           value={summary.totalYesterday}
//           icon={<Clock3 size={18} />}
//           iconColor={colors.textSecondary}
//         />
//         <SummaryCard
//           title="This Month"
//           value={summary.totalThisMonth}
//           icon={<TrendingUp size={18} />}
//           iconColor={colors.accent}
//           valueColor={colors.accent}
//         />
//         <SummaryCard
//           title="Overall Events"
//           value={summary.totalOverall}
//           icon={<Activity size={18} />}
//           iconColor={colors.success}
//         />
//         <SummaryCard
//           title="Cancellations Today"
//           value={summary.totalCancellationsToday}
//           icon={<AlertCircle size={18} />}
//           iconColor={colors.danger}
//           valueColor={colors.danger}
//         />
//       </div>
//       {/* TABLE */}
//       <div
//         className="overflow-hidden rounded-2xl"
//         style={{
//           background: colors.cardBg,
//           border: `1px solid ${colors.cardBorder}`,
//         }}
//       >
//         <DataTable
//           columns={columns}
//           data={data}
//           loading={loading}
//           error={error}
//           paginationMode="client"
//         />
//       </div>
//       {/* EXPANDED DETAILS */}
//       {selectedCancellation && (
//         <div
//           className="mt-5 overflow-hidden rounded-2xl"
//           style={{
//             background:
//               colors.gradientCard || colors.cardBg,
//             border: `1px solid ${colors.accent}35`,
//             boxShadow: `0 8px 30px ${colors.accent}08`,
//           }}
//         >
//           {/* DETAIL HEADER */}
//           <div
//             className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
//             style={{
//               borderColor: colors.cardBorder,
//             }}
//           >
//             <div>
//               <div className="flex items-center gap-2">
//                 <AlertCircle
//                   size={18}
//                   style={{
//                     color: colors.accent,
//                   }}
//                 />
//                 <h3
//                   className="font-semibold"
//                   style={{
//                     color: colors.textPrimary,
//                   }}
//                 >
//                   {formatEventName(
//                     selectedCancellation.event
//                   )}{" "}
//                   Breakdown
//                 </h3>
//               </div>
//               <p
//                 className="mt-1 text-xs"
//                 style={{
//                   color: colors.textSecondary,
//                 }}
//               >
//                 Cancellation source distribution
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={() =>
//                 setExpandedEvent(null)
//               }
//               className="flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-semibold sm:self-auto"
//               style={{
//                 background: colors.cardBg,
//                 color: colors.textSecondary,
//                 border: `1px solid ${colors.cardBorder}`,
//               }}
//             >
//               <ChevronUp size={14} />
//               Collapse
//             </button>
//           </div>
//           {/* BREAKDOWN CARDS */}
//           <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 xl:grid-cols-5">
//             {cancellationTypes.map((type) => {
//               const breakdown =
//                 selectedCancellation[type.key];
//               if (!breakdown) return null;
//               return (
//                 <div
//                   key={type.key}
//                   className="rounded-xl p-4"
//                   style={{
//                     background: colors.cardBg,
//                     border: `1px solid ${colors.cardBorder}`,
//                   }}
//                 >
//                   <div
//                     className="mb-3 flex items-center justify-between"
//                   >
//                     <span
//                       className="text-sm font-semibold"
//                       style={{
//                         color: colors.textPrimary,
//                       }}
//                     >
//                       {type.label}
//                     </span>
//                     <span
//                       className="rounded-full px-2 py-1 text-[10px] font-semibold"
//                       style={{
//                         color: colors.accent,
//                         background: `${colors.accent}12`,
//                       }}
//                     >
//                       Overall
//                     </span>
//                   </div>
//                   <div
//                     className="mb-4 text-2xl font-bold"
//                     style={{
//                       color: colors.accent,
//                     }}
//                   >
//                     {formatNumber(
//                       breakdown.overall
//                     )}
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <BreakdownValue
//                       label="Today"
//                       value={breakdown.today}
//                     />
//                     <BreakdownValue
//                       label="Yesterday"
//                       value={breakdown.yesterday}
//                     />
//                     <BreakdownValue
//                       label="This Month"
//                       value={breakdown.thisMonth}
//                     />
//                     <BreakdownValue
//                       label="Last Month"
//                       value={breakdown.lastMonth}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//       {/* EMPTY */}
//       {!loading &&
//         !error &&
//         data.length === 0 && (
//           <div
//             className="mt-5 flex flex-col items-center justify-center rounded-2xl p-10"
//             style={{
//               background: colors.cardBg,
//               border: `1px solid ${colors.cardBorder}`,
//             }}
//           >
//             <Activity
//               size={32}
//               style={{
//                 color: colors.textMuted,
//               }}
//             />
//             <h3
//               className="mt-3 font-semibold"
//               style={{
//                 color: colors.textPrimary,
//               }}
//             >
//               No data available
//             </h3>
//             <p
//               className="mt-1 text-sm"
//               style={{
//                 color: colors.textSecondary,
//               }}
//             >
//               There are no data insights available
//               at the moment.
//             </p>
//           </div>
//         )}
//     </div>
//   );
// };
// /* ---------------------------------------------
//    SUMMARY CARD
// --------------------------------------------- */
// const SummaryCard = ({
//   title,
//   value,
//   icon,
//   iconColor,
//   valueColor,
// }) => {
//   return (
//     <div
//       className="rounded-2xl p-5"
//       style={{
//         background: colors.gradientCard || colors.cardBg,
//         border: `1px solid ${colors.cardBorder}`,
//       }}
//     >
//       <div className="flex items-center justify-between">
//         <span
//           className="text-sm"
//           style={{
//             color: colors.textSecondary,
//           }}
//         >
//           {title}
//         </span>
//         <span
//           style={{
//             color: iconColor,
//           }}
//         >
//           {icon}
//         </span>
//       </div>
//       <div
//         className="mt-3 text-2xl font-bold"
//         style={{
//           color: valueColor || colors.textPrimary,
//         }}
//       >
//         {Number(value || 0).toLocaleString("en-IN")}
//       </div>
//     </div>
//   );
// };
// /* ---------------------------------------------
//    BREAKDOWN VALUE
// --------------------------------------------- */
// const BreakdownValue = ({ label, value }) => {
//   return (
//     <div>
//       <div
//         className="text-[11px]"
//         style={{
//           color: colors.textMuted,
//         }}
//       >
//         {label}
//       </div>
//       <div
//         className="mt-1 text-sm font-semibold"
//         style={{
//           color: colors.textPrimary,
//         }}
//       >
//         {Number(value || 0).toLocaleString("en-IN")}
//       </div>
//     </div>
//   );
// };
// export default DataInsightsTable;
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const GATEWAY_OPTIONS = ["all", "juspay", "cashfree"];
const PLATFORM_OPTIONS = ["all", "app", "web"];

const getISTDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString("en-IN") : "—";
};

const formatPercent = (value) => {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return "N/A";
  }

  const number = Number(value);
  return `${number > 0 ? "+" : ""}${number.toFixed(2)}%`;
};

const formatDate = (value) => {
  if (!value) return "—";

  // Keep date-only values in the API's IST calendar day.
  const parts = String(value).split("T")[0].split("-");
  if (parts.length === 3) {
    return new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return value;
};

const formatDateTime = (value) => {
  if (!value) return "Not available";

  return new Date(value).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const eventLabel = (value) =>
  String(value || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getChangeStyle = (value) => {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return {
      color: colors.textMuted,
      background: `${colors.textMuted}15`,
    };
  }

  if (Number(value) > 0) {
    return {
      color: colors.success,
      background: `${colors.success}15`,
    };
  }

  if (Number(value) < 0) {
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

// Supports the nested response shape from existing API middleware as well.
const getPayload = (response) => {
  let payload = response?.data;

  for (let i = 0; i < 3; i += 1) {
    if (payload?.rows || payload?.summary) return payload;
    if (!payload?.data) break;
    payload = payload.data;
  }

  return payload || {};
};

const sumValues = (rows, selector) =>
  rows.reduce((sum, row) => {
    const value = selector(row);
    return sum + (Number(value) || 0);
  }, 0);

const DataInsightsTable = () => {
  const today = useMemo(() => getISTDate(), []);

  const [filters, setFilters] = useState({
    from: today,
    to: today,
    gateway: "all",
    platform: "all",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    from: today,
    to: today,
    gateway: "all",
    platform: "all",
  });

  const [filterKey, setFilterKey] = useState(0);
  const [rows, setRows] = useState([]);
  const [summaryMetrics, setSummaryMetrics] = useState({});
  const [summaryPeriods, setSummaryPeriods] = useState({});
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [generatedAt, setGeneratedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedDate, setExpandedDate] = useState(null);
  const [showComparison, setShowComparison] = useState(true);

  const fetchDataInsights = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get("/api/v1/data-insights/funnel", {
        params: {
          from: appliedFilters.from,
          to: appliedFilters.to,
          gateway: appliedFilters.gateway,
          platform: appliedFilters.platform,
        },
      });

      const payload = getPayload(response);
      const resultRows = Array.isArray(payload?.rows) ? payload.rows : [];

      setRows(resultRows);
      setSummaryMetrics(payload?.summary?.metrics || {});
      setSummaryPeriods({
        last7Days: payload?.summary?.last7Days,
        lastMonth: payload?.summary?.lastMonth,
      });
      setTimezone(payload?.timezone || "Asia/Kolkata");
      setGeneratedAt(payload?.generatedAt || null);
      setExpandedDate(null);
    } catch (err) {
      console.error("Data insights error:", err);

      const message =
        err?.response?.data?.message ||
        "Unable to load data insights. Please try again.";

      setError(message);
      toast.error(message);
      setRows([]);
      setSummaryMetrics({});
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    fetchDataInsights();
  }, [fetchDataInsights]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const applyFilters = () => {
    if (!filters.from || !filters.to) {
      toast.error("Please select both dates.");
      return;
    }

    if (filters.from > filters.to) {
      toast.error("The start date cannot be after the end date.");
      return;
    }

    if (filters.to > today) {
      toast.error("The end date cannot be after today.");
      return;
    }

    const start = new Date(`${filters.from}T00:00:00Z`);
    const end = new Date(`${filters.to}T00:00:00Z`);
    const days = Math.round((end - start) / 86400000) + 1;

    if (days > 90) {
      toast.error("Please select a date range of 90 days or less.");
      return;
    }

    setAppliedFilters({ ...filters });
  };

  const resetFilters = () => {
    const defaults = {
      from: today,
      to: today,
      gateway: "all",
      platform: "all",
    };

    setFilters(defaults);
    setAppliedFilters(defaults);
    setFilterKey((current) => current + 1);
  };

  const totals = useMemo(() => {
    return {
      registrations: sumValues(rows, (row) => row.registrations),
      trialInitiated: sumValues(rows, (row) => row.trialInitiated),
      trialSuccess: sumValues(rows, (row) => row.trialSuccess),
      trialPurchaseFailed: sumValues(rows, (row) => row.trialPurchaseFailed),
      trialCancelled: sumValues(rows, (row) => row.trialCancelled),
      trialReadyForExecution: sumValues(
        rows,
        (row) => row.trialReadyForExecution
      ),
      trialExecuted: sumValues(rows, (row) => row.trialExecuted),
      subscriptionSuccess: sumValues(
        rows,
        (row) => row.subscriptionSuccess?.total
      ),
      subscriptionFailed: sumValues(rows, (row) => row.subscriptionFailed),
      subscriptionRetry: sumValues(
        rows,
        (row) => row.subscriptionRetry?.total
      ),
      newSubscriptions: sumValues(rows, (row) => row.newSubscriptions),
    };
  }, [rows]);

  const latestRow = rows.length ? rows[rows.length - 1] : null;

  const comparisonItems = [
    { key: "registrations", label: "Registrations" },
    { key: "trialInitiated", label: "Trials Initiated" },
    { key: "trialSuccess", label: "Trial Success" },
    { key: "trialPurchaseFailed", label: "Trial Purchase Failed" },
    { key: "trialCancelled", label: "Trial Cancelled" },
    { key: "trialReadyForExecution", label: "Ready for Execution" },
    { key: "trialExecuted", label: "Trials Executed" },
    { key: "subscriptionSuccess", label: "Subscription Success" },
    { key: "subscriptionFailed", label: "Subscription Failed" },
    { key: "subscriptionRetry", label: "Subscription Retry" },
    { key: "newSubscriptions", label: "New Subscriptions" },
    { key: "totalActiveSubscriptions", label: "Active Subscriptions" },
    { key: "totalPaidSubscriptions", label: "Paid Subscriptions" },
  ];

  const columns = [
    {
      key: "date",
      label: "IST Date",
      width: "1.3fr",
      render: (value) => (
        <div className="flex items-center gap-2">
          <CalendarDays size={15} color={colors.accent} />
          <span style={{ color: colors.textPrimary, fontWeight: 600 }}>
            {formatDate(value)}
          </span>
        </div>
      ),
    },
    {
      key: "registrations",
      label: "Registrations",
      width: "1fr",
      render: (value) => (
        <MetricValue value={value} color={colors.accentLight} />
      ),
    },
    {
      key: "trialInitiated",
      label: "Trial Initiated",
      width: "1fr",
      render: (value) => <MetricValue value={value} />,
    },
    {
      key: "trialSuccess",
      label: "Trial Success",
      width: "1fr",
      render: (value) => (
        <MetricValue value={value} color={colors.success} />
      ),
    },
    {
      key: "trialPurchaseFailed",
      label: "Purchase Failed",
      width: "1fr",
      render: (value) => (
        <MetricValue value={value} color={colors.danger} />
      ),
    },
    {
      key: "trialCancelled",
      label: "Trial Cancelled",
      width: "1fr",
      render: (value) => (
        <MetricValue value={value} color={colors.textSecondary} />
      ),
    },
    {
      key: "trialExecuted",
      label: "Trial Executed",
      width: "1fr",
      render: (value) => (
        <MetricValue value={value} color={colors.accent} />
      ),
    },
    {
      key: "newSubscriptions",
      label: "New Subscriptions",
      width: "1fr",
      render: (value) => (
        <MetricValue value={value} color={colors.success} />
      ),
    },
    {
      key: "totalActiveSubscriptions",
      label: "Active Subs.",
      width: "1fr",
      render: (value) => <MetricValue value={value} />,
    },
    {
      key: "totalPaidSubscriptions",
      label: "Paid Subs.",
      width: "1fr",
      render: (value) => (
        <MetricValue value={value} color={colors.accentLight} />
      ),
    },
    {
      key: "details",
      label: "Details",
      width: "0.8fr",
      render: (_, row) => {
        const expanded = expandedDate === row.date;

        return (
          <button
            type="button"
            onClick={() =>
              setExpandedDate(expanded ? null : row.date)
            }
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold"
            style={{
              color: colors.accent,
              background: `${colors.accent}12`,
              border: `1px solid ${colors.accent}30`,
            }}
          >
            {expanded ? "Hide" : "View"}
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        );
      },
    },
  ];

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{ background: colors.pageBg, color: colors.textPrimary }}
    >
      {/* Page heading */}
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: `${colors.accent}18`,
              color: colors.accent,
              border: `1px solid ${colors.accent}35`,
            }}
          >
            <Activity size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Data Insights</h1>
            <p
              className="mt-1 text-sm"
              style={{ color: colors.textSecondary }}
            >
              Registration, trial funnel and subscription analytics
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.textSecondary,
            }}
          >
            <Clock3 size={14} color={colors.accent} />
            <span>
              {generatedAt
                ? `Updated ${formatDateTime(generatedAt)} IST`
                : "Waiting for data"}
            </span>
          </div>

          <button
            type="button"
            onClick={fetchDataInsights}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity"
            style={{
              background: colors.buttonBg,
              color: colors.buttonText,
              opacity: loading ? 0.65 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <section
        className="mb-6 rounded-2xl p-4 md:p-5"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter size={17} color={colors.accent} />
            <h2 className="font-semibold">Filters</h2>
            <span
              className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase"
              style={{
                color: colors.accent,
                background: `${colors.accent}15`,
              }}
            >
              IST
            </span>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: colors.textSecondary }}
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div>
            <label
              className="mb-2 block text-xs font-medium"
              style={{ color: colors.textSecondary }}
            >
              From Date
            </label>
            <input
              type="date"
              value={filters.from}
              max={filters.to || today}
              onChange={(event) => updateFilter("from", event.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{
                background: colors.inputBg,
                color: colors.textPrimary,
                border: `1px solid ${colors.inputBorder}`,
                colorScheme: "dark",
              }}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-xs font-medium"
              style={{ color: colors.textSecondary }}
            >
              To Date
            </label>
            <input
              type="date"
              value={filters.to}
              min={filters.from}
              max={today}
              onChange={(event) => updateFilter("to", event.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{
                background: colors.inputBg,
                color: colors.textPrimary,
                border: `1px solid ${colors.inputBorder}`,
                colorScheme: "dark",
              }}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-xs font-medium"
              style={{ color: colors.textSecondary }}
            >
              Payment Gateway
            </label>
            <FilterDropDown
              key={`gateway-${filterKey}`}
              options={GATEWAY_OPTIONS}
              defaultLabel={filters.gateway}
              width="100%"
              onSelect={(value) => updateFilter("gateway", value)}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-xs font-medium"
              style={{ color: colors.textSecondary }}
            >
              Platform
            </label>
            <FilterDropDown
              key={`platform-${filterKey}`}
              options={PLATFORM_OPTIONS}
              defaultLabel={filters.platform}
              width="100%"
              onSelect={(value) => updateFilter("platform", value)}
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={applyFilters}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
              style={{
                background: colors.accent,
                color: colors.buttonText,
                opacity: loading ? 0.7 : 1,
              }}
            >
              <Filter size={15} />
              Apply Filters
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span style={{ color: colors.textMuted }}>Active filters:</span>
          {[appliedFilters.from, appliedFilters.to].map((date, index) => (
            <span
              key={`${date}-${index}`}
              className="rounded-full px-2.5 py-1"
              style={{
                background: `${colors.accent}12`,
                color: colors.accent,
              }}
            >
              {index === 0 ? "From: " : "To: "}
              {formatDate(date)}
            </span>
          ))}
          <span
            className="rounded-full px-2.5 py-1"
            style={{
              background: `${colors.accent}12`,
              color: colors.accent,
            }}
          >
            Gateway: {appliedFilters.gateway}
          </span>
          <span
            className="rounded-full px-2.5 py-1"
            style={{
              background: `${colors.accent}12`,
              color: colors.accent,
            }}
          >
            Platform: {appliedFilters.platform}
          </span>
        </div>
      </section>

      {/* KPI cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Registrations"
          value={totals.registrations}
          icon={<Users size={19} />}
          iconColor={colors.accentLight}
          subtitle="Users registered in selected period"
          loading={loading}
        />
        <SummaryCard
          title="Trials Initiated"
          value={totals.trialInitiated}
          icon={<Zap size={19} />}
          iconColor={colors.accent}
          subtitle="Trial initiation events"
          loading={loading}
        />
        <SummaryCard
          title="Trial Success"
          value={totals.trialSuccess}
          icon={<CheckCircle2 size={19} />}
          iconColor={colors.success}
          subtitle="Successful trial purchases"
          loading={loading}
        />
        <SummaryCard
          title="Purchase Failed"
          value={totals.trialPurchaseFailed}
          icon={<XCircle size={19} />}
          iconColor={colors.danger}
          subtitle="Failed trial purchase events"
          loading={loading}
        />
        <SummaryCard
          title="Trials Cancelled"
          value={totals.trialCancelled}
          icon={<AlertCircle size={19} />}
          iconColor={colors.danger}
          subtitle="Trial cancellations"
          loading={loading}
        />
        <SummaryCard
          title="Trials Executed"
          value={totals.trialExecuted}
          icon={<Activity size={19} />}
          iconColor={colors.accentLight}
          subtitle="Executed trials"
          loading={loading}
        />
        <SummaryCard
          title="New Subscriptions"
          value={totals.newSubscriptions}
          icon={<CreditCard size={19} />}
          iconColor={colors.success}
          subtitle="New successful subscriptions"
          loading={loading}
        />
        <SummaryCard
          title="Subscription Failures"
          value={totals.subscriptionFailed}
          icon={<AlertCircle size={19} />}
          iconColor={colors.danger}
          subtitle="Subscription failure events"
          loading={loading}
        />
      </div>

      {/* End-of-day subscription snapshot */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <SnapshotCard
          title="Total Active Subscriptions"
          value={latestRow?.totalActiveSubscriptions}
          subtitle={`Latest available snapshot: ${formatDate(latestRow?.date)}`}
          icon={<Activity size={20} />}
          color={colors.accent}
          loading={loading}
        />
        <SnapshotCard
          title="Total Paid Subscriptions"
          value={latestRow?.totalPaidSubscriptions}
          subtitle={`Latest available snapshot: ${formatDate(latestRow?.date)}`}
          icon={<CreditCard size={20} />}
          color={colors.success}
          loading={loading}
        />
      </div>

      {/* Comparison section */}
      <section
        className="mb-6 overflow-hidden rounded-2xl"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <button
          type="button"
          onClick={() => setShowComparison((current) => !current)}
          className="flex w-full items-center justify-between gap-3 p-4 text-left md:p-5"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: `${colors.accent}15`,
                color: colors.accent,
              }}
            >
              <TrendingUp size={19} />
            </div>
            <div>
              <h2 className="font-semibold">Period Comparison</h2>
              <p
                className="mt-1 text-xs"
                style={{ color: colors.textSecondary }}
              >
                7-day daily average vs. previous full calendar month
              </p>
            </div>
          </div>
          {showComparison ? (
            <ChevronUp size={19} color={colors.textSecondary} />
          ) : (
            <ChevronDown size={19} color={colors.textSecondary} />
          )}
        </button>

        {showComparison && (
          <>
            <div
              className="grid grid-cols-1 gap-3 border-t p-4 md:grid-cols-2 md:p-5"
              style={{ borderColor: colors.cardBorder }}
            >
              <PeriodCard
                title="Last 7 Days"
                period={summaryPeriods.last7Days}
                color={colors.accent}
              />
              <PeriodCard
                title="Previous Full Month"
                period={summaryPeriods.lastMonth}
                color={colors.success}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr
                    style={{
                      background: colors.inputBg,
                      color: colors.textSecondary,
                    }}
                  >
                    {[
                      "Metric",
                      "7-Day Daily Avg.",
                      "Last Month Daily Avg.",
                      "Change",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3 text-left text-xs font-semibold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonItems.map((item) => {
                    const metric = summaryMetrics[item.key];
                    const change = metric?.changePercent;
                    const changeStyle = getChangeStyle(change);

                    return (
                      <tr
                        key={item.key}
                        style={{ borderTop: `1px solid ${colors.cardBorder}` }}
                      >
                        <td className="px-5 py-3 font-medium">
                          {item.label}
                        </td>
                        <td className="px-5 py-3">
                          {formatNumber(metric?.last7Avg)}
                        </td>
                        <td className="px-5 py-3">
                          {formatNumber(metric?.lastMonthAvg)}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={changeStyle}
                          >
                            {Number(change) > 0 ? (
                              <TrendingUp size={13} />
                            ) : Number(change) < 0 ? (
                              <TrendingDown size={13} />
                            ) : null}
                            {formatPercent(change)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* Daily metrics table */}
      <section
        className="overflow-hidden rounded-2xl"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div
          className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between md:p-5"
          style={{ borderColor: colors.cardBorder }}
        >
          <div>
            <h2 className="font-semibold">Daily Funnel Breakdown</h2>
            <p
              className="mt-1 text-xs"
              style={{ color: colors.textSecondary }}
            >
              {formatDate(appliedFilters.from)} – {formatDate(appliedFilters.to)}
              {" · "}
              {rows.length} {rows.length === 1 ? "day" : "days"}
              {" · "}
              {timezone}
            </p>
          </div>

          <span
            className="w-fit rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              background: `${colors.accent}15`,
              color: colors.accent,
            }}
          >
            {rows.length} Records
          </span>
        </div>

        {error && (
          <div
            className="m-4 flex items-start gap-3 rounded-xl p-4 text-sm"
            style={{
              color: colors.danger,
              background: `${colors.danger}12`,
              border: `1px solid ${colors.danger}30`,
            }}
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div className="flex-1">{error}</div>
            <button
              type="button"
              onClick={fetchDataInsights}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <div className="min-w-[1450px]">
            <DataTable
              columns={columns}
              data={rows}
              loading={loading}
              error={error}
              paginationMode="client"
            />
          </div>
        </div>

        {!loading && !error && rows.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                color: colors.textMuted,
                background: `${colors.textMuted}12`,
              }}
            >
              <Activity size={26} />
            </div>
            <h3 className="font-semibold">No data available</h3>
            <p
              className="mt-1 max-w-sm text-sm"
              style={{ color: colors.textSecondary }}
            >
              Try changing the date range, gateway, or platform filters.
            </p>
          </div>
        )}

        {/* Expandable daily breakdown */}
        {expandedDate && (
          <DailyBreakdown
            row={rows.find((row) => row.date === expandedDate)}
            onClose={() => setExpandedDate(null)}
          />
        )}
      </section>

      <p
        className="mt-4 text-xs leading-5"
        style={{ color: colors.textMuted }}
      >
        Counts represent users unless otherwise specified. Active and paid
        subscription counts are end-of-day snapshots; today's values may be
        live. Historical snapshot values can be unavailable before snapshots
        began. API cache duration: 45 seconds.
      </p>
    </div>
  );
};

const SummaryCard = ({ title, value, icon, iconColor, subtitle, loading }) => (
  <div
    className="rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
    style={{
      background: colors.gradientCard || colors.cardBg,
      border: `1px solid ${colors.cardBorder}`,
      boxShadow: colors.shadow,
    }}
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          {title}
        </p>
        <div className="mt-3 text-2xl font-bold">
          {loading ? "..." : formatNumber(value)}
        </div>
      </div>

      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: `${iconColor}15`,
          color: iconColor,
        }}
      >
        {icon}
      </div>
    </div>

    <p
      className="mt-3 text-xs leading-5"
      style={{ color: colors.textMuted }}
    >
      {subtitle}
    </p>
  </div>
);

const SnapshotCard = ({ title, value, subtitle, icon, color, loading }) => (
  <div
    className="flex items-center justify-between gap-4 rounded-2xl p-5"
    style={{
      background: colors.gradientCard || colors.cardBg,
      border: `1px solid ${colors.cardBorder}`,
    }}
  >
    <div>
      <p className="text-sm" style={{ color: colors.textSecondary }}>
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold">
        {loading ? "..." : formatNumber(value)}
      </p>
      <p className="mt-2 text-xs" style={{ color: colors.textMuted }}>
        {subtitle}
      </p>
    </div>
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
      style={{ background: `${color}15`, color }}
    >
      {icon}
    </div>
  </div>
);

const MetricValue = ({ value, color = colors.textPrimary }) => (
  <span style={{ color, fontWeight: 650 }}>{formatNumber(value)}</span>
);

const PeriodCard = ({ title, period, color }) => (
  <div
    className="rounded-xl p-4"
    style={{
      background: colors.inputBg,
      border: `1px solid ${colors.cardBorder}`,
    }}
  >
    <div className="mb-2 flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color }}
      />
      <span className="text-sm font-semibold">{title}</span>
    </div>
    <p className="text-sm" style={{ color: colors.textSecondary }}>
      {period?.from && period?.to
        ? `${formatDate(period.from)} – ${formatDate(period.to)}`
        : "Period information unavailable"}
    </p>
  </div>
);

const DailyBreakdown = ({ row, onClose }) => {
  if (!row) return null;

  const cards = [
    {
      title: "Trial Funnel",
      icon: <Activity size={17} />,
      items: [
        ["Trial Initiated", row.trialInitiated],
        ["Trial Success", row.trialSuccess],
        ["Purchase Failed", row.trialPurchaseFailed],
        ["Ready for Execution", row.trialReadyForExecution],
        ["Trial Executed", row.trialExecuted],
        ["Trial Cancelled", row.trialCancelled],
      ],
    },
    {
      title: "Subscription Success",
      icon: <CheckCircle2 size={17} />,
      items: [
        ["First Charge", row.subscriptionSuccess?.firstCharge],
        ["Renewal", row.subscriptionSuccess?.renewal],
        ["Total Success", row.subscriptionSuccess?.total],
        ["New Subscriptions", row.newSubscriptions],
      ],
    },
    {
      title: "Subscription Failures & Retry",
      icon: <RotateCcw size={17} />,
      items: [
        ["Subscription Failed", row.subscriptionFailed],
        ["Juspay Mandate Retry", row.subscriptionRetry?.juspayMandateRetry],
        ["Juspay Manual Retry", row.subscriptionRetry?.juspayManualRetry],
        ["Juspay Auto Recharge", row.subscriptionRetry?.juspayAutoRecharge],
        ["Cashfree Retry", row.subscriptionRetry?.cashfreeRetry],
        ["Total Retry", row.subscriptionRetry?.total],
      ],
    },
  ];

  return (
    <div
      className="border-t p-4 md:p-5"
      style={{
        background: colors.pageBg,
        borderColor: colors.cardBorder,
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">
            Detailed Breakdown — {formatDate(row.date)}
          </h3>
          <p className="mt-1 text-xs" style={{ color: colors.textSecondary }}>
            Trial and subscription event details
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2"
          style={{
            color: colors.textSecondary,
            background: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
          }}
          aria-label="Close breakdown"
        >
          <XCircle size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl p-4"
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span style={{ color: colors.accent }}>{card.icon}</span>
              <h4 className="text-sm font-semibold">{card.title}</h4>
            </div>

            <div className="space-y-3">
              {card.items.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3"
                >
                  <span
                    className="text-xs"
                    style={{ color: colors.textSecondary }}
                  >
                    {label}
                  </span>
                  <span className="text-sm font-semibold">
                    {formatNumber(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataInsightsTable;
