// import { RefreshCcw, Search, Activity, Users, Zap, TrendingUp } from "lucide-react";
// import React, { useState } from "react";
// import FilterDropDown from "../../components/ui/FilterDropDown";
// import DataTable from "../../components/ui/DataTable";
// import axiosInstance from "../../api/axiosInstance";
// import colors from "../../constants/colors";
// const EXPERIMENT_KEYS = [
//   "onboarding_flow",
//   "subscription_price",
// ];
// const DATE_FILTERS = [
//   "today",
//   "yesterday",
//   "last7days",
//   "last30days",
// ];
// const ExperimentStats = () => {
//   const [experimentKey, setExperimentKey] = useState("onboarding_flow");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   // -----------------------------------------
//   // Fetch Experiment Stats
//   // -----------------------------------------
//   // const fetchStats = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError("");
//   //     const params = {
//   //       experimentKey,
//   //     };
//   //     if (from) {
//   //       params.from = from;
//   //     }
//   //     if (to) {
//   //       params.to = to;
//   //     }
//   //     const response = await axiosInstance.get(
//   //       "/api/v1/experiments/stats",
//   //       {
//   //         params,
//   //       }
//   //     );
//   //     if (response?.data?.success) {
//   //       setStats(response.data.data);
//   //     } else {
//   //       setStats(null);
//   //       setError(
//   //         response?.data?.message || "Failed to fetch experiment stats"
//   //       );
//   //     }
//   //   } catch (err) {
//   //     console.error("Experiment stats error:", err);
//   //     setStats(null);
//   //     setError(
//   //       err?.response?.data?.message ||
//   //         err?.message ||
//   //         "Something went wrong while fetching experiment stats"
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const params = {
//         experimentKey,
//       };
//       if (dateFilter) {
//         params.filter = dateFilter;
//       } else {
//         if (from) {
//           params.from = from;
//         }
//         if (to) {
//           params.to = to;
//         }
//       }
//       const response = await axiosInstance.get(
//         "/api/v1/experiments/stats",
//         {
//           params,
//         }
//       );
//       if (response?.data?.success) {
//         setStats(response.data.data);
//       } else {
//         setStats(null);
//         setError(
//           response?.data?.message || "Failed to fetch experiment stats"
//         );
//       }
//     } catch (err) {
//       console.error("Experiment stats error:", err);
//       setStats(null);
//       setError(
//         err?.response?.data?.message ||
//         err?.message ||
//         "Something went wrong while fetching experiment stats"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   //   const applyDateFilter = (filter) => {
//   //   const today = new Date();
//   //   const formatDate = (date) => {
//   //     return date.toISOString().split("T")[0];
//   //   };
//   //   let fromDate = "";
//   //   let toDate = formatDate(today);
//   //   switch (filter) {
//   //     case "Today":
//   //       fromDate = toDate;
//   //       break;
//   //     case "Yesterday": {
//   //       const yesterday = new Date();
//   //       yesterday.setDate(today.getDate() - 1);
//   //       fromDate = formatDate(yesterday);
//   //       toDate = formatDate(yesterday);
//   //       break;
//   //     }
//   //     case "Last 7 Days": {
//   //       const last7 = new Date();
//   //       last7.setDate(today.getDate() - 6);
//   //       fromDate = formatDate(last7);
//   //       break;
//   //     }
//   //     case "Last 30 Days": {
//   //       const last30 = new Date();
//   //       last30.setDate(today.getDate() - 29);
//   //       fromDate = formatDate(last30);
//   //       break;
//   //     }
//   //     default:
//   //       fromDate = "";
//   //       toDate = "";
//   //   }
//   //   setFrom(fromDate);
//   //   setTo(toDate);
//   // };
//   // -----------------------------------------
//   // Reset Filters
//   // -----------------------------------------
//   const handleReset = () => {
//     setExperimentKey("onboarding_flow");
//     setFrom("");
//     setTo("");
//     setStats(null);
//     setError("");
//     setDateFilter("");
//   };
//   // -----------------------------------------
//   // Table Columns
//   // -----------------------------------------
//   const columns = [
//     {
//       key: "variant",
//       label: "Variant",
//       width: "1.5fr",
//       align: "left",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.accentLight,
//             fontWeight: 600,
//             fontSize: 14,
//           }}
//         >
//           {value || "-"}
//         </span>
//       ),
//     },
//     {
//       key: "registrations",
//       label: "Registrations",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//             fontWeight: 600,
//           }}
//         >
//           {Number(value || 0).toLocaleString()}
//         </span>
//       ),
//     },
//     {
//       key: "trials",
//       label: "Trials",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//             fontWeight: 600,
//           }}
//         >
//           {Number(value || 0).toLocaleString()}
//         </span>
//       ),
//     },
//     {
//       key: "activeTrials",
//       label: "Active Trials",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.success,
//             fontWeight: 600,
//           }}
//         >
//           {Number(value || 0).toLocaleString()}
//         </span>
//       ),
//     },
//     {
//       key: "trialRatePct",
//       label: "Trial Rate",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.warning,
//             fontWeight: 600,
//           }}
//         >
//           {value ?? 0}%
//         </span>
//       ),
//     },
//     {
//       key: "activeTrialRatePct",
//       label: "Active Trial Rate",
//       width: "1.2fr",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.accentLight,
//             fontWeight: 600,
//           }}
//         >
//           {value ?? 0}%
//         </span>
//       ),
//     },
//   ];
//   // -----------------------------------------
//   // Summary Card
//   // -----------------------------------------
//   const SummaryCard = ({
//     title,
//     value,
//     icon: Icon,
//     valueColor = colors.textPrimary,
//   }) => {
//     return (
//       <div
//         style={{
//           background: colors.gradientCard,
//           border: `1px solid ${colors.cardBorder}`,
//           borderRadius: 16,
//           padding: "20px",
//           minHeight: 120,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <span
//             style={{
//               color: colors.textSecondary,
//               fontSize: 13,
//               fontWeight: 600,
//             }}
//           >
//             {title}
//           </span>
//           <div
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: 10,
//               background: colors.hover,
//               border: `1px solid ${colors.cardBorder}`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Icon size={18} color={colors.accentLight} />
//           </div>
//         </div>
//         <div
//           style={{
//             color: valueColor,
//             fontSize: 26,
//             fontWeight: 700,
//             marginTop: 12,
//           }}
//         >
//           {value}
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: colors.pageBg,
//         padding: "24px",
//         color: colors.textPrimary,
//       }}
//     >
//       {/* -------------------------------- */}
//       {/* PAGE HEADER */}
//       {/* -------------------------------- */}
//       <div
//         style={{
//           marginBottom: 24,
//         }}
//       >
//         <h1
//           style={{
//             margin: 0,
//             fontSize: 26,
//             fontWeight: 700,
//             color: colors.textPrimary,
//           }}
//         >
//           Experiment Stats
//         </h1>
//         <p
//           style={{
//             marginTop: 6,
//             color: colors.textSecondary,
//             fontSize: 14,
//           }}
//         >
//           Analyze A/B experiment funnel performance by variant.
//         </p>
//       </div>
//       {/* -------------------------------- */}
//       {/* FILTER CARD */}
//       {/* -------------------------------- */}
//       <div
//         style={{
//           background: colors.gradientCard,
//           border: `1px solid ${colors.cardBorder}`,
//           borderRadius: 18,
//           padding: 20,
//           marginBottom: 24,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             marginBottom: 18,
//           }}
//         >
//           <Activity size={18} color={colors.accent} />
//           <h2
//             style={{
//               margin: 0,
//               fontSize: 16,
//               fontWeight: 600,
//               color: colors.textPrimary,
//             }}
//           >
//             Experiment Filters
//           </h2>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-end",
//             gap: 16,
//             flexWrap: "wrap",
//           }}
//         >
//           {/* Experiment Key */}
//           <div style={{ minWidth: 220 }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: 8,
//                 color: colors.textSecondary,
//                 fontSize: 13,
//                 fontWeight: 600,
//               }}
//             >
//               Experiment Key
//             </label>
//             <FilterDropDown
//               options={EXPERIMENT_KEYS}
//               defaultLabel={experimentKey}
//               width={220}
//               onSelect={(value) => {
//                 setExperimentKey(value);
//               }}
//             />
//           </div>
//           {/* Date Filter */}
//           <div style={{ minWidth: 220 }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: 8,
//                 color: colors.textSecondary,
//                 fontSize: 13,
//                 fontWeight: 600,
//               }}
//             >
//               Date Range
//             </label>
//             {/* <FilterDropDown
//     options={DATE_FILTERS}
//     defaultLabel={dateFilter || "Select Range"}
//     width={220}
//     onSelect={(value) => {
//       setDateFilter(value);
//       applyDateFilter(value);
//     }}
//   /> */}
//             <FilterDropDown
//               options={DATE_FILTERS}
//               defaultLabel={dateFilter || "Select Range"}
//               width={220}
//               onSelect={(value) => {
//                 setDateFilter(value);
//                 // clear manual dates when preset selected
//                 setFrom("");
//                 setTo("");
//               }}
//             />
//           </div>
//           {/* From */}
//           {/* <div style={{ minWidth: 200 }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: 8,
//                 color: colors.textSecondary,
//                 fontSize: 13,
//                 fontWeight: 600,
//               }}
//             >
//               From
//             </label>
//             <input
//               type="date"
//               value={from}
//               onChange={(e) => setFrom(e.target.value)}
//               style={{
//                 width: "100%",
//                 height: 42,
//                 padding: "0 12px",
//                 borderRadius: 10,
//                 border: `1px solid ${colors.inputBorder}`,
//                 background: colors.inputBg,
//                 color: colors.textPrimary,
//                 outline: "none",
//                 fontSize: 14,
//                 boxSizing: "border-box",
//                 colorScheme: "dark",
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = colors.inputFocus;
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = colors.inputBorder;
//               }}
//             />
//           </div> */}
//           {/* To */}
//           {/* <div style={{ minWidth: 200 }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: 8,
//                 color: colors.textSecondary,
//                 fontSize: 13,
//                 fontWeight: 600,
//               }}
//             >
//               To
//             </label>
//             <input
//               type="date"
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               style={{
//                 width: "100%",
//                 height: 42,
//                 padding: "0 12px",
//                 borderRadius: 10,
//                 border: `1px solid ${colors.inputBorder}`,
//                 background: colors.inputBg,
//                 color: colors.textPrimary,
//                 outline: "none",
//                 fontSize: 14,
//                 boxSizing: "border-box",
//                 colorScheme: "dark",
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = colors.inputFocus;
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = colors.inputBorder;
//               }}
//             />
//           </div> */}
//           {/* Apply */}
//           <button
//             onClick={fetchStats}
//             disabled={loading}
//             style={{
//               height: 42,
//               padding: "0 20px",
//               borderRadius: 10,
//               border: "none",
//               background: colors.gradientButton,
//               color: colors.buttonText,
//               fontWeight: 700,
//               fontSize: 14,
//               cursor: loading ? "not-allowed" : "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               opacity: loading ? 0.6 : 1,
//             }}
//           >
//             <Search size={17} />
//             {loading ? "Loading..." : "Apply Filters"}
//           </button>
//           {/* Reset */}
//           <button
//             onClick={handleReset}
//             style={{
//               height: 42,
//               padding: "0 18px",
//               borderRadius: 10,
//               border: `1px solid ${colors.cardBorder}`,
//               background: colors.cardBg,
//               color: colors.textSecondary,
//               fontWeight: 600,
//               fontSize: 14,
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = colors.hover;
//               e.currentTarget.style.color = colors.textPrimary;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = colors.cardBg;
//               e.currentTarget.style.color = colors.textSecondary;
//             }}
//           >
//             <RefreshCcw size={16} />
//             Reset
//           </button>
//         </div>
//       </div>
//       {/* -------------------------------- */}
//       {/* ERROR */}
//       {/* -------------------------------- */}
//       {error && (
//         <div
//           style={{
//             marginBottom: 20,
//             padding: "14px 18px",
//             borderRadius: 12,
//             border: `1px solid ${colors.danger}`,
//             background: "rgba(224,82,82,0.08)",
//             color: colors.danger,
//             fontSize: 14,
//           }}
//         >
//           ⚠️ {error}
//         </div>
//       )}
//       {/* -------------------------------- */}
//       {/* RESULT */}
//       {/* -------------------------------- */}
//       {stats && (
//         <>
//           {/* Experiment Info */}
//           <div
//             style={{
//               background: colors.gradientHero,
//               border: `1px solid ${colors.cardBorder}`,
//               borderRadius: 18,
//               padding: "18px 20px",
//               marginBottom: 20,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               gap: 16,
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   color: colors.textMuted,
//                   fontSize: 12,
//                   textTransform: "uppercase",
//                   marginBottom: 6,
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 Experiment
//               </div>
//               <div
//                 style={{
//                   color: colors.accentLight,
//                   fontSize: 20,
//                   fontWeight: 700,
//                 }}
//               >
//                 {stats.experimentKey}
//               </div>
//             </div>
//             <div
//               style={{
//                 padding: "7px 14px",
//                 borderRadius: 20,
//                 background: stats.isActive
//                   ? "rgba(61,190,108,0.12)"
//                   : "rgba(224,82,82,0.12)",
//                 border: `1px solid ${stats.isActive ? colors.success : colors.danger
//                   }`,
//                 color: stats.isActive
//                   ? colors.success
//                   : colors.danger,
//                 fontSize: 13,
//                 fontWeight: 700,
//               }}
//             >
//               {stats.isActive ? "Active" : "Inactive"}
//             </div>
//           </div>
//           {/* Summary Cards */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns:
//                 "repeat(4, minmax(0, 1fr))",
//               gap: 16,
//               marginBottom: 24,
//             }}
//           >
//             <SummaryCard
//               title="Total Registrations"
//               value={Number(
//                 stats.totals?.registrations || 0
//               ).toLocaleString()}
//               icon={Users}
//             />
//             <SummaryCard
//               title="Total Trials"
//               value={Number(
//                 stats.totals?.trials || 0
//               ).toLocaleString()}
//               icon={TrendingUp}
//               valueColor={colors.warning}
//             />
//             <SummaryCard
//               title="Active Trials"
//               value={Number(
//                 stats.totals?.activeTrials || 0
//               ).toLocaleString()}
//               icon={Zap}
//               valueColor={colors.success}
//             />
//             <SummaryCard
//               title="Trial Rate"
//               value={`${stats.totals?.trialRatePct ?? 0}%`}
//               icon={Activity}
//               valueColor={colors.accentLight}
//             />
//           </div>
//           {/* -------------------------------- */}
//           {/* VARIANT TABLE */}
//           {/* -------------------------------- */}
//           <div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginBottom: 8,
//               }}
//             >
//               <div>
//                 <h2
//                   style={{
//                     margin: 0,
//                     color: colors.textPrimary,
//                     fontSize: 18,
//                     fontWeight: 700,
//                   }}
//                 >
//                   Variant Performance
//                 </h2>
//                 <p
//                   style={{
//                     margin: "5px 0 0",
//                     color: colors.textMuted,
//                     fontSize: 13,
//                   }}
//                 >
//                   Funnel statistics for each experiment variant.
//                 </p>
//               </div>
//             </div>
//             <DataTable
//               columns={columns}
//               data={stats.variants || []}
//               loading={loading}
//               error={error}
//             />
//           </div>
//           {/* -------------------------------- */}
//           {/* NOTE */}
//           {/* -------------------------------- */}
//           {stats.note && (
//             <div
//               style={{
//                 marginTop: 18,
//                 padding: "14px 18px",
//                 borderRadius: 12,
//                 background: colors.cardBg,
//                 border: `1px solid ${colors.cardBorder}`,
//                 color: colors.textMuted,
//                 fontSize: 13,
//                 lineHeight: 1.6,
//               }}
//             >
//               <strong
//                 style={{
//                   color: colors.textSecondary,
//                 }}
//               >
//                 Note:
//               </strong>{" "}
//               {stats.note}
//             </div>
//           )}
//         </>
//       )}
//       {/* -------------------------------- */}
//       {/* INITIAL STATE */}
//       {/* -------------------------------- */}
//       {!stats && !loading && !error && (
//         <div
//           style={{
//             background: colors.gradientCard,
//             border: `1px solid ${colors.cardBorder}`,
//             borderRadius: 18,
//             padding: "60px 20px",
//             textAlign: "center",
//           }}
//         >
//           <Activity
//             size={42}
//             color={colors.accent}
//             style={{ marginBottom: 12 }}
//           />
//           <h3
//             style={{
//               margin: 0,
//               color: colors.textPrimary,
//               fontSize: 18,
//             }}
//           >
//             Select Experiment & Apply Filters
//           </h3>
//           <p
//             style={{
//               marginTop: 8,
//               color: colors.textMuted,
//               fontSize: 14,
//             }}
//           >
//             Choose an experiment key and optional date range to view
//             funnel statistics.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };
// export default ExperimentStats;
import { RefreshCcw, Search, Activity, Users, Zap, TrendingUp, CreditCard, CheckCircle, XCircle, Clock, AlertCircle, } from "lucide-react";
import React, { useState } from "react";

import FilterDropDown from "../../components/ui/FilterDropDown";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const EXPERIMENT_KEYS = [
    "onboarding_flow",
    "subscription_price",
    "predebit_timing",
];

const DATE_FILTERS = [
    "today",
    "yesterday",
    "last7days",
    "last30days",
];


const ExperimentStats = () => {

    const [experimentKey, setExperimentKey] =
        useState("predebit_timing");

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [dateFilter, setDateFilter] = useState("");

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");



    // ==========================================
    // FETCH EXPERIMENT STATS
    // ==========================================

    const fetchStats = async () => {

        try {

            setLoading(true);
            setError("");


            const params = {
                experimentKey,
            };


            if (dateFilter) {

                params.filter = dateFilter;

            } else {

                if (from) {
                    params.from = from;
                }


                if (to) {
                    params.to = to;
                }

            }



            const response =
                await axiosInstance.get(
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
                    response?.data?.message ||
                    "Failed to fetch experiment stats"
                );

            }



        } catch (err) {

            console.error(
                "Experiment Stats Error:",
                err
            );


            setStats(null);


            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong"
            );


        } finally {

            setLoading(false);

        }

    };




    // ==========================================
    // RESET
    // ==========================================

    const handleReset = () => {

        setExperimentKey("predebit_timing");

        setFrom("");

        setTo("");

        setDateFilter("");

        setStats(null);

        setError("");

    };



    // ==========================================
    // FORMAT NUMBER
    // ==========================================

    const formatNumber = (value) => {

        return Number(value || 0)
            .toLocaleString();

    };



    // ==========================================
    // PAYMENT DATA HELPER
    // ==========================================

    const getWaitingCount = (payments) => {

        return (
            Number(payments?.awaitingDebit || 0) +
            Number(payments?.debitPending || 0)
        );

    };



    // ==========================================
    // VARIANT COLORS
    // ==========================================

    const getVariantColor = (variant) => {

        if (variant === "immediate") {

            return colors.accentLight;

        }


        return colors.success;

    };
        // ==========================================
    // PAYMENT CARD
    // ==========================================

    const PaymentCard = ({
        variant,
        data,
    }) => {

        const payments = data?.payments || {};


        return (

            <div
                style={{
                    background: colors.gradientCard,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: 18,
                    padding: 20,
                }}
            >

                {/* Header */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >

                    <div>

                        <div
                            style={{
                                color: colors.textMuted,
                                fontSize: 12,
                                textTransform: "uppercase",
                                marginBottom: 6,
                            }}
                        >
                            Variant
                        </div>


                        <div
                            style={{
                                color: getVariantColor(variant),
                                fontSize: 22,
                                fontWeight: 700,
                            }}
                        >
                            {variant}
                        </div>

                    </div>


                    <div
                        style={{
                            padding: "8px 14px",
                            borderRadius: 20,
                            background:
                                "rgba(212,175,55,0.12)",
                            border:
                                `1px solid ${colors.cardBorder}`,
                            color:
                                colors.accentLight,
                            fontWeight: 700,
                            fontSize: 13,
                        }}
                    >
                        A/B Test
                    </div>


                </div>



                {/* Main Success Rate */}

                <div
                    style={{
                        background: colors.hover,
                        borderRadius: 14,
                        padding: 16,
                        marginBottom: 18,
                    }}
                >

                    <div
                        style={{
                            color: colors.textMuted,
                            fontSize: 12,
                            marginBottom: 6,
                        }}
                    >
                        ₹699 Success Rate
                    </div>


                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 800,
                            color: colors.success,
                        }}
                    >

                        {payments.successRatePct ?? 0}%

                    </div>


                    <div
                        style={{
                            color: colors.textSecondary,
                            fontSize: 13,
                            marginTop: 4,
                        }}
                    >

                        Reached Bank Success:
                        {" "}
                        {payments.successRateOfReachedPct ?? 0}%

                    </div>


                </div>




                {/* Metrics */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2,minmax(0,1fr))",
                        gap: 12,
                    }}
                >


                    <MetricBox
                        title="Trials"
                        value={data?.trials}
                        icon={Users}
                    />


                    <MetricBox
                        title="Paid ₹699"
                        value={payments.paid699}
                        icon={CreditCard}
                        success
                    />



                    <MetricBox
                        title="Cancelled"
                        value={
                            payments.cancelledBefore699
                        }
                        icon={XCircle}
                    />



                    <MetricBox
                        title="Paused"
                        value={
                            payments.pausedBefore699
                        }
                        icon={Clock}
                    />



                    <MetricBox
                        title="Low Balance Failed"
                        value={
                            payments.failedInsufficientBalance
                        }
                        icon={AlertCircle}
                    />



                    <MetricBox
                        title="Other Failed"
                        value={
                            payments.failedOther
                        }
                        icon={XCircle}
                    />



                    <MetricBox
                        title="Still Waiting"
                        value={
                            getWaitingCount(payments)
                        }
                        icon={Clock}
                    />



                    <MetricBox
                        title="Reached Debit"
                        value={
                            payments.reachedDebit
                        }
                        icon={CheckCircle}
                    />


                </div>


            </div>

        );

    };





    // ==========================================
    // SMALL METRIC BOX
    // ==========================================

    const MetricBox = ({
        title,
        value,
        icon: Icon,
        success = false,
    }) => {


        return (

            <div
                style={{
                    padding: 14,
                    borderRadius: 12,
                    background: colors.cardBg,
                    border:
                        `1px solid ${colors.cardBorder}`,
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                    }}
                >

                    <span
                        style={{
                            color:
                                colors.textMuted,
                            fontSize: 12,
                        }}
                    >
                        {title}
                    </span>


                    <Icon
                        size={15}
                        color={
                            success
                                ? colors.success
                                : colors.accentLight
                        }
                    />

                </div>


                <div
                    style={{
                        marginTop: 8,
                        fontSize: 20,
                        fontWeight: 700,
                        color:
                            success
                                ? colors.success
                                : colors.textPrimary,
                    }}
                >

                    {formatNumber(value)}

                </div>


            </div>

        );

    };





    // ==========================================
    // SUMMARY CARD
    // ==========================================

    const SummaryCard = ({
        title,
        value,
        icon: Icon,
        valueColor = colors.textPrimary,
    }) => {


        return (

            <div
                style={{
                    background:
                        colors.gradientCard,

                    border:
                        `1px solid ${colors.cardBorder}`,

                    borderRadius: 16,

                    padding: 20,

                }}
            >


                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                    }}
                >

                    <span
                        style={{
                            color:
                                colors.textSecondary,
                            fontSize:13,
                        }}
                    >

                        {title}

                    </span>


                    <Icon
                        size={18}
                        color={
                            colors.accentLight
                        }
                    />

                </div>


                <div
                    style={{
                        marginTop:14,
                        fontSize:28,
                        fontWeight:800,
                        color:valueColor,
                    }}
                >

                    {value}

                </div>


            </div>

        );

    };





    // ==========================================
    // TABLE COLUMNS
    // ==========================================

    const columns = [

        {
            key:"variant",
            label:"Variant",
            width:"1fr",

            render:(value)=>(
                <span
                    style={{
                        color:
                            getVariantColor(value),
                        fontWeight:700,
                    }}
                >
                    {value}
                </span>
            )
        },


        {
            key:"registrations",
            label:"Registrations",
            width:"1fr",

            render:(value)=>
                formatNumber(value)
        },


        {
            key:"trials",
            label:"Trials",
            width:"1fr",

            render:(value)=>
                formatNumber(value)
        },


        {
            key:"trialRatePct",
            label:"Trial Rate",
            width:"1fr",

            render:(value)=>
                `${value || 0}%`
        },


        {
            key:"paid699",
            label:"Paid ₹699",
            width:"1fr",

            render:(value)=>
                formatNumber(value)
        },


        {
            key:"successRatePct",
            label:"Success Rate",
            width:"1fr",

            render:(value)=>(
                <span
                    style={{
                        color:colors.success,
                        fontWeight:700,
                    }}
                >
                    {value || 0}%
                </span>
            )
        },

    ];
        return (

        <div
            style={{
                minHeight: "100vh",
                background: colors.pageBg,
                padding: "24px",
                color: colors.textPrimary,
            }}
        >


            {/* HEADER */}

            <div
                style={{
                    marginBottom:24,
                }}
            >

                <h1
                    style={{
                        margin:0,
                        fontSize:26,
                        fontWeight:700,
                    }}
                >
                    Experiment Stats
                </h1>


                <p
                    style={{
                        marginTop:6,
                        color:colors.textSecondary,
                        fontSize:14,
                    }}
                >
                    Compare A/B experiment performance and payment conversion.
                </p>

            </div>





            {/* FILTER CARD */}

            <div
                style={{
                    background:colors.gradientCard,
                    border:`1px solid ${colors.cardBorder}`,
                    borderRadius:18,
                    padding:20,
                    marginBottom:24,
                }}
            >

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:8,
                        marginBottom:18,
                    }}
                >

                    <Activity
                        size={18}
                        color={colors.accent}
                    />

                    <h2
                        style={{
                            margin:0,
                            fontSize:16,
                        }}
                    >
                        Experiment Filters
                    </h2>

                </div>




                <div
                    style={{
                        display:"flex",
                        gap:16,
                        alignItems:"flex-end",
                        flexWrap:"wrap",
                    }}
                >



                    <div style={{minWidth:220}}>

                        <label
                            style={{
                                display:"block",
                                marginBottom:8,
                                color:colors.textSecondary,
                                fontSize:13,
                                fontWeight:600,
                            }}
                        >
                            Experiment Key
                        </label>


                        <FilterDropDown
                            options={EXPERIMENT_KEYS}
                            defaultLabel={experimentKey}
                            width={220}

                            onSelect={(value)=>{

                                setExperimentKey(value);

                            }}
                        />


                    </div>





                    <div style={{minWidth:220}}>


                        <label
                            style={{
                                display:"block",
                                marginBottom:8,
                                color:colors.textSecondary,
                                fontSize:13,
                                fontWeight:600,
                            }}
                        >
                            Date Range
                        </label>


                        <FilterDropDown
                            options={DATE_FILTERS}
                            defaultLabel={
                                dateFilter ||
                                "Select Range"
                            }

                            width={220}

                            onSelect={(value)=>{

                                setDateFilter(value);

                                setFrom("");
                                setTo("");

                            }}

                        />


                    </div>




                    <div>


                        <label
                            style={{
                                display:"block",
                                marginBottom:8,
                                color:colors.textSecondary,
                                fontSize:13,
                                fontWeight:600,
                            }}
                        >
                            From
                        </label>


                        <input
                            type="date"
                            value={from}
                            onChange={(e)=>{

                                setFrom(e.target.value);
                                setDateFilter("");

                            }}

                            style={{
                                height:42,
                                padding:"0 12px",
                                borderRadius:10,
                                border:
                                `1px solid ${colors.inputBorder}`,
                                background:
                                colors.inputBg,
                                color:
                                colors.textPrimary,
                            }}

                        />

                    </div>





                    <div>


                        <label
                            style={{
                                display:"block",
                                marginBottom:8,
                                color:colors.textSecondary,
                                fontSize:13,
                                fontWeight:600,
                            }}
                        >
                            To
                        </label>


                        <input
                            type="date"
                            value={to}

                            onChange={(e)=>{

                                setTo(e.target.value);
                                setDateFilter("");

                            }}

                            style={{
                                height:42,
                                padding:"0 12px",
                                borderRadius:10,
                                border:
                                `1px solid ${colors.inputBorder}`,
                                background:
                                colors.inputBg,
                                color:
                                colors.textPrimary,
                            }}

                        />


                    </div>





                    <button

                        onClick={fetchStats}

                        disabled={loading}

                        style={{
                            height:42,
                            padding:"0 20px",
                            borderRadius:10,
                            border:"none",
                            background:
                            colors.gradientButton,
                            color:
                            colors.buttonText,
                            fontWeight:700,
                            display:"flex",
                            alignItems:"center",
                            gap:8,
                            cursor:"pointer",
                        }}

                    >

                        <Search size={17}/>

                        {
                            loading
                            ?
                            "Loading..."
                            :
                            "Apply"
                        }

                    </button>





                    <button

                        onClick={handleReset}

                        style={{
                            height:42,
                            padding:"0 18px",
                            borderRadius:10,
                            background:
                            colors.cardBg,
                            border:
                            `1px solid ${colors.cardBorder}`,
                            color:
                            colors.textSecondary,
                            fontWeight:600,
                            display:"flex",
                            alignItems:"center",
                            gap:8,
                        }}

                    >

                        <RefreshCcw size={16}/>

                        Reset

                    </button>


                </div>


            </div>






            {/* ERROR */}

            {
                error &&

                <div
                    style={{
                        padding:"14px 18px",
                        marginBottom:20,
                        borderRadius:12,
                        color:colors.danger,
                        border:
                        `1px solid ${colors.danger}`,
                    }}
                >

                    ⚠️ {error}

                </div>

            }







            {
                stats &&

                <>


                    {/* SUMMARY */}


                    <div
                        style={{
                            display:"grid",
                            gridTemplateColumns:
                            "repeat(4,1fr)",
                            gap:16,
                            marginBottom:24,
                        }}
                    >


                        <SummaryCard
                            title="Registrations"
                            value={
                                formatNumber(
                                    stats.totals?.registrations
                                )
                            }
                            icon={Users}
                        />


                        <SummaryCard
                            title="Trials"
                            value={
                                formatNumber(
                                    stats.totals?.trials
                                )
                            }
                            icon={TrendingUp}
                        />


                        <SummaryCard
                            title="Active Trials"
                            value={
                                formatNumber(
                                    stats.totals?.activeTrials
                                )
                            }
                            icon={Zap}
                        />


                        <SummaryCard
                            title="Payment Success"
                            value={
                                `${stats.totals?.payments
                                ?.successRatePct || 0}%`
                            }
                            icon={CreditCard}
                            valueColor={colors.success}
                        />



                    </div>







                    {/* TWO VARIANT CARDS */}


                    <div
                        style={{
                            display:"grid",
                            gridTemplateColumns:
                            "repeat(2,1fr)",
                            gap:20,
                            marginBottom:28,
                        }}
                    >

                        {
                            stats.variants?.map(
                                (item)=>(

                                    <PaymentCard

                                        key={
                                            item.variant
                                        }

                                        variant={
                                            item.variant
                                        }

                                        data={
                                            item
                                        }

                                    />

                                )
                            )
                        }


                    </div>








                    {/* TABLE */}


                    <h2
                        style={{
                            fontSize:18,
                            marginBottom:12,
                        }}
                    >
                        Variant Comparison
                    </h2>



                    <DataTable

                        columns={columns}

                        data={
                            stats.variants?.map(
                                item=>({

                                    ...item,

                                    paid699:
                                    item.payments?.paid699,

                                    successRatePct:
                                    item.payments
                                    ?.successRatePct,

                                })
                            )
                        || []
                        }

                        loading={loading}

                        error={error}

                    />






                    {
                        stats.note &&

                        <div
                            style={{
                                marginTop:20,
                                padding:16,
                                borderRadius:12,
                                border:
                                `1px solid ${colors.cardBorder}`,
                                color:
                                colors.textMuted,
                            }}
                        >

                            <b>
                                Note:
                            </b>
                            {" "}
                            {stats.note}

                        </div>

                    }



                </>

            }







            {
                !stats &&
                !loading &&
                !error &&


                <div
                    style={{
                        padding:"60px 20px",
                        textAlign:"center",
                        background:
                        colors.gradientCard,
                        border:
                        `1px solid ${colors.cardBorder}`,
                        borderRadius:18,
                    }}
                >

                    <Activity
                        size={42}
                        color={colors.accent}
                    />


                    <h3>
                        Select Experiment & Apply Filters
                    </h3>


                    <p
                        style={{
                            color:
                            colors.textMuted,
                        }}
                    >
                        View A/B payment experiment performance.
                    </p>


                </div>

            }



        </div>

    );

};


export default ExperimentStats;