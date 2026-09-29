import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
// import React from "react";
// import colors from "../../constants/colors";
// const mandateData = [
//   { date: "27 Sep", day: "Today", scheduled: 342, expected: null },
//   { date: "28 Sep", day: "Sun", scheduled: null, expected: 410 },
//   { date: "29 Sep", day: "Mon", scheduled: null, expected: 388 },
//   { date: "30 Sep", day: "Tue", scheduled: null, expected: 296 },
//   { date: "01 Oct", day: "Wed", scheduled: null, expected: 452 },
//   { date: "02 Oct", day: "Thu", scheduled: null, expected: 370 },
//   { date: "03 Oct", day: "Fri", scheduled: null, expected: 310 },
// ];
// const executionData = [
//   {
//     label: "Success",
//     value: 68,
//     percentage: 20,
//     color: colors.success,
//   },
//   {
//     label: "Failed",
//     value: 24,
//     percentage: 7,
//     color: colors.danger,
//   },
//   {
//     label: "In Progress",
//     value: 110,
//     percentage: 32,
//     color: colors.warning,
//   },
//   {
//     label: "Pending",
//     value: 140,
//     percentage: 41,
//     color: "#AEB4BD",
//   },
// ];
// const MAX_VALUE = 600;
// const MandateExecution = () => {
//   return (
//     <div
//       className="w-full rounded-2xl p-4 md:p-5"
//       style={{
//         background: colors.pageBg,
//       }}
//     >
//       <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
//         {/* =====================================================
//             SCHEDULED MANDATES
//         ====================================================== */}
//         <div
//           className="rounded-2xl border p-5"
//           style={{
//             background: colors.cardBg,
//             borderColor: colors.cardBorder,
//             boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//           }}
//         >
//           {/* Header */}
//           <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <h2
//               className="text-lg font-bold"
//               style={{ color: colors.textPrimary }}
//             >
//               Scheduled Mandates for Deduction
//             </h2>
//             <div className="flex flex-wrap items-center gap-5 text-sm">
//               <div className="flex items-center gap-2">
//                 <span
//                   className="h-3 w-3 rounded-full"
//                   style={{ background: colors.accentDark }}
//                 />
//                 <span style={{ color: colors.textSecondary }}>
//                   Scheduled Mandates
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span
//                   className="h-3 w-3 rounded-full"
//                   style={{ background: colors.accentLight }}
//                 />
//                 <span style={{ color: colors.textSecondary }}>
//                   Expected Success (Est.)
//                 </span>
//               </div>
//             </div>
//           </div>
//           {/* Chart */}
//           <div className="flex">
//             {/* Y Axis */}
//             <div className="relative mr-3 flex h-[245px] w-10 flex-shrink-0 flex-col justify-between pb-8 pt-1">
//               {[600, 450, 300, 150, 0].map((value) => (
//                 <span
//                   key={value}
//                   className="text-right text-xs"
//                   style={{ color: colors.textMuted }}
//                 >
//                   {value}
//                 </span>
//               ))}
//               <span
//                 className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xs"
//                 style={{ color: colors.textSecondary }}
//               >
//                 No. of Mandates
//               </span>
//             </div>
//             {/* Chart Area */}
//             <div className="relative flex-1">
//               {/* Grid */}
//               <div className="absolute inset-x-0 top-0 h-[200px]">
//                 {[0, 25, 50, 75, 100].map((position) => (
//                   <div
//                     key={position}
//                     className="absolute left-0 right-0 border-t"
//                     style={{
//                       top: `${position}%`,
//                       borderColor: "rgba(200,193,179,0.12)",
//                     }}
//                   />
//                 ))}
//               </div>
//               {/* Bars */}
//               <div className="relative z-10 flex h-[245px] items-end justify-between gap-2">
//                 {mandateData.map((item, index) => {
//                   const value = item.scheduled ?? item.expected;
//                   const isToday = item.scheduled !== null;
//                   const height = `${(value / MAX_VALUE) * 100}%`;
//                   return (
//                     <div
//                       key={`${item.date}-${index}`}
//                       className="flex h-full flex-1 flex-col items-center justify-end"
//                     >
//                       {/* Value */}
//                       <div
//                         className="mb-2 text-sm font-bold"
//                         style={{ color: colors.textPrimary }}
//                       >
//                         {value}
//                       </div>
//                       {/* Bar */}
//                       <div
//                         className="relative w-full max-w-[86px] rounded-t-md transition-all duration-300 hover:opacity-80"
//                         style={{
//                           height,
//                           minHeight: "8px",
//                           background: isToday
//                             ? colors.accentDark
//                             : colors.accentLight,
//                           boxShadow: isToday
//                             ? `0 5px 15px rgba(143,106,29,0.25)`
//                             : "none",
//                         }}
//                       />
//                       {/* Date */}
//                       <div
//                         className="mt-2 text-xs font-medium"
//                         style={{ color: colors.textSecondary }}
//                       >
//                         {item.date}
//                       </div>
//                       {/* Day */}
//                       <div
//                         className={`text-xs ${
//                           isToday ? "font-bold" : ""
//                         }`}
//                         style={{
//                           color: isToday
//                             ? colors.accentLight
//                             : colors.textMuted,
//                         }}
//                       >
//                         {item.day}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* =====================================================
//             TODAY'S EXECUTION PROGRESS
//         ====================================================== */}
//         <div
//           className="rounded-2xl border p-5"
//           style={{
//             background: colors.cardBg,
//             borderColor: colors.cardBorder,
//             boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//           }}
//         >
//           <h2
//             className="mb-5 text-lg font-bold"
//             style={{ color: colors.textPrimary }}
//           >
//             Today's Execution Progress
//           </h2>
//           <div className="flex flex-col gap-5">
//             {/* Donut + Legend */}
//             <div className="flex items-center justify-center gap-5">
//               {/* Donut */}
//               <div className="relative h-[180px] w-[180px] flex-shrink-0">
//                 <svg
//                   viewBox="0 0 200 200"
//                   className="h-full w-full -rotate-90"
//                 >
//                   {/* Background */}
//                   <circle
//                     cx="100"
//                     cy="100"
//                     r="72"
//                     fill="none"
//                     stroke="rgba(174,180,189,0.28)"
//                     strokeWidth="30"
//                   />
//                   {/* Success */}
//                   <circle
//                     cx="100"
//                     cy="100"
//                     r="72"
//                     fill="none"
//                     stroke={colors.success}
//                     strokeWidth="30"
//                     strokeDasharray="90.48 361.91"
//                     strokeDashoffset="0"
//                   />
//                   {/* Failed */}
//                   <circle
//                     cx="100"
//                     cy="100"
//                     r="72"
//                     fill="none"
//                     stroke={colors.danger}
//                     strokeWidth="30"
//                     strokeDasharray="31.67 361.91"
//                     strokeDashoffset="-90.48"
//                   />
//                   {/* In Progress */}
//                   <circle
//                     cx="100"
//                     cy="100"
//                     r="72"
//                     fill="none"
//                     stroke={colors.warning}
//                     strokeWidth="30"
//                     strokeDasharray="115.81 361.91"
//                     strokeDashoffset="-122.15"
//                   />
//                   {/* Pending */}
//                   <circle
//                     cx="100"
//                     cy="100"
//                     r="72"
//                     fill="none"
//                     stroke="#AEB4BD"
//                     strokeWidth="30"
//                     strokeDasharray="148.42 361.91"
//                     strokeDashoffset="-237.96"
//                   />
//                 </svg>
//                 {/* Center */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <span
//                     className="text-2xl font-bold"
//                     style={{ color: colors.textPrimary }}
//                   >
//                     342
//                   </span>
//                   <span
//                     className="text-sm"
//                     style={{ color: colors.textSecondary }}
//                   >
//                     Scheduled
//                   </span>
//                   <span
//                     className="text-sm"
//                     style={{ color: colors.textSecondary }}
//                   >
//                     Today
//                   </span>
//                 </div>
//               </div>
//               {/* Legend */}
//               <div className="min-w-0 flex-1 space-y-4">
//                 {executionData.map((item) => (
//                   <div
//                     key={item.label}
//                     className="flex items-center gap-2"
//                   >
//                     <span
//                       className="h-3 w-3 flex-shrink-0 rounded-full"
//                       style={{ background: item.color }}
//                     />
//                     <span
//                       className="min-w-0 flex-1 text-sm"
//                       style={{ color: colors.textSecondary }}
//                     >
//                       {item.label}
//                     </span>
//                     <span
//                       className="text-sm font-bold"
//                       style={{ color: colors.textPrimary }}
//                     >
//                       {item.value}
//                     </span>
//                     <span
//                       className="w-9 text-right text-sm"
//                       style={{ color: colors.textMuted }}
//                     >
//                       {item.percentage}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Revenue */}
//             <div
//               className="flex items-center justify-between rounded-xl px-4 py-3"
//               style={{
//                 background: `linear-gradient(90deg, rgba(61,190,108,0.12), rgba(61,190,108,0.04))`,
//                 border: `1px solid rgba(61,190,108,0.15)`,
//               }}
//             >
//               <div>
//                 <div
//                   className="text-2xl font-bold"
//                   style={{ color: colors.success }}
//                 >
//                   ₹ 47,392
//                 </div>
//                 <div
//                   className="text-sm"
//                   style={{ color: colors.textSecondary }}
//                 >
//                   Revenue Collected So Far
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div
//                   className="text-sm font-bold"
//                   style={{ color: colors.success }}
//                 >
//                   ↑ 12%
//                 </div>
//                 <div
//                   className="text-xs"
//                   style={{ color: colors.textMuted }}
//                 >
//                   vs yesterday
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MandateExecution;
import React, { useEffect, useMemo, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";


const DAYS_OPTIONS = [7, 14, 30];

const MandateExecution = () => {
  const getToday = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);

    return localDate.toISOString().split("T")[0];
  };

  const [fromDate, setFromDate] = useState(getToday());
  const [days, setDays] = useState(7);

  const [mandateData, setMandateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ============================================================
     FETCH SCHEDULE CHART
  ============================================================ */
  const fetchScheduleChart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get(
        "/api/v1/juspay/admin/mandates/schedule-chart",
        {
          params: {
            from: fromDate,
            days,
          },
        }
      );

      if (response?.data?.success) {
        setMandateData(response.data.data || []);
      } else {
        setMandateData([]);
        setError(
          response?.data?.message || "Failed to fetch mandate schedule"
        );
      }
    } catch (err) {
      console.error("Schedule chart error:", err);

      setMandateData([]);

      setError(
        err?.response?.data?.message ||
          "Unable to fetch mandate schedule"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleChart();
  }, [fromDate, days]);

  /* ============================================================
     MAX VALUE FOR CHART
  ============================================================ */
  const maxValue = useMemo(() => {
    const max = Math.max(
      ...mandateData.map((item) => Number(item.count) || 0),
      0
    );

    if (max <= 100) return 100;

    return Math.ceil(max / 100) * 100;
  }, [mandateData]);

  /* ============================================================
     SELECTED / TODAY EXECUTION DATA
  ============================================================ */
  const executionData = useMemo(() => {
    if (!mandateData.length) {
      return {
        total: 0,
        success: 0,
        failed: 0,
        notAttempted: 0,
      };
    }

    // Prefer today's record.
    // If today is not present in selected range,
    // use the first record.
    const todayData =
      mandateData.find((item) => item.isToday) || mandateData[0];

    return {
      total: Number(todayData?.count) || 0,
      success: Number(todayData?.success) || 0,
      failed: Number(todayData?.failed) || 0,
      notAttempted: Number(todayData?.notAttempted) || 0,
      date: todayData?.date,
      weekday: todayData?.weekday,
    };
  }, [mandateData]);

  const executionTotal =
    executionData.success +
    executionData.failed +
    executionData.notAttempted;

  const successPercentage =
    executionTotal > 0
      ? Math.round((executionData.success / executionTotal) * 100)
      : 0;

  const failedPercentage =
    executionTotal > 0
      ? Math.round((executionData.failed / executionTotal) * 100)
      : 0;

  const notAttemptedPercentage =
    executionTotal > 0
      ? Math.round(
          (executionData.notAttempted / executionTotal) * 100
        )
      : 0;

  /* ============================================================
     DONUT DATA
  ============================================================ */
  const donutData = [
    {
      label: "Success",
      value: executionData.success,
      percentage: successPercentage,
      color: colors.success,
    },
    {
      label: "Failed",
      value: executionData.failed,
      percentage: failedPercentage,
      color: colors.danger,
    },
    {
      label: "Not Attempted",
      value: executionData.notAttempted,
      percentage: notAttemptedPercentage,
      color: "#AEB4BD",
    },
  ];

  /* ============================================================
     DATE FORMAT
  ============================================================ */
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  /* ============================================================
     CHANGE DATE
  ============================================================ */
  const changeDate = (amount) => {
    const date = new Date(`${fromDate}T00:00:00`);

    date.setDate(date.getDate() + amount);

    const offset = date.getTimezoneOffset();
    const localDate = new Date(
      date.getTime() - offset * 60000
    );

    setFromDate(localDate.toISOString().split("T")[0]);
  };

  return (
    <div
      className="w-full rounded-2xl p-4 md:p-5"
      style={{
        background: colors.pageBg,
      }}
    >
      {/* ======================================================
          FILTER HEADER
      ======================================================= */}
      <div
        className="mb-4 rounded-2xl border p-4"
        style={{
          background: colors.cardBg,
          borderColor: colors.cardBorder,
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          {/* Title */}
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: colors.textPrimary }}
            >
              Mandate Execution
            </h2>

            <p
              className="mt-1 text-sm"
              style={{ color: colors.textSecondary }}
            >
              Day-wise mandate debit schedule and execution status
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-end gap-3">
            {/* From Date */}
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: colors.textSecondary }}
              >
                From Date
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="h-[42px] rounded-lg border px-3 text-sm outline-none"
                style={{
                  background: colors.inputBg,
                  color: colors.textPrimary,
                  borderColor: colors.cardBorder,
                  colorScheme: "dark",
                }}
              />
            </div>

            {/* Days Dropdown */}
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: colors.textSecondary }}
              >
                Range
              </label>

              <FilterDropDown
                options={DAYS_OPTIONS.map((item) => `${item} Days`)}
                defaultLabel={`${days} Days`}
                width={130}
                onSelect={(value) => {
                  const selectedDays = Number(
                    value.replace(" Days", "")
                  );

                  setDays(selectedDays);
                }}
              />
            </div>

            {/* Previous */}
            <button
              type="button"
              onClick={() => changeDate(-days)}
              disabled={loading}
              className="flex h-[42px] items-center justify-center rounded-lg border px-3 transition hover:opacity-80 disabled:opacity-50"
              style={{
                background: colors.cardBg,
                color: colors.textPrimary,
                borderColor: colors.cardBorder,
              }}
              title={`Previous ${days} days`}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={() => changeDate(days)}
              disabled={loading}
              className="flex h-[42px] items-center justify-center rounded-lg border px-3 transition hover:opacity-80 disabled:opacity-50"
              style={{
                background: colors.cardBg,
                color: colors.textPrimary,
                borderColor: colors.cardBorder,
              }}
              title={`Next ${days} days`}
            >
              <ChevronRight size={18} />
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={fetchScheduleChart}
              disabled={loading}
              className="flex h-[42px] items-center justify-center rounded-lg border px-3 transition hover:opacity-80 disabled:opacity-50"
              style={{
                background: colors.buttonBg,
                color: "#fff",
                borderColor: colors.buttonBg,
              }}
              title="Refresh"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ======================================================= */}
      <div className="grid grid-cols-1 gap-4 ">
        {/* ====================================================
            SCHEDULED MANDATES CHART
        ===================================================== */}
        <div
          className="min-w-0 rounded-2xl border p-5"
          style={{
            background: colors.cardBg,
            borderColor: colors.cardBorder,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          {/* Header */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: colors.textPrimary }}
              >
                Scheduled Mandates for Deduction
              </h2>

              <p
                className="mt-1 text-xs"
                style={{ color: colors.textMuted }}
              >
                {fromDate} · {days} days
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: colors.accentDark,
                  }}
                />

                <span
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Scheduled Mandates
                </span>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div
              className="flex h-[300px] items-center justify-center"
              style={{ color: colors.textSecondary }}
            >
              <RefreshCw size={22} className="mr-2 animate-spin" />
              Loading schedule...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className="flex h-[300px] items-center justify-center text-sm"
              style={{ color: colors.danger }}
            >
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && mandateData.length === 0 && (
            <div
              className="flex h-[300px] items-center justify-center text-sm"
              style={{ color: colors.textMuted }}
            >
              No mandate schedule data found.
            </div>
          )}

          {/* Chart */}
          {!loading && !error && mandateData.length > 0 && (
            <div className="flex min-w-0">
              {/* Y Axis */}
              <div className="relative mr-3 flex h-[275px] w-10 flex-shrink-0 flex-col justify-between pb-8 pt-1">
                {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map(
                  (value, index) => (
                    <span
                      key={index}
                      className="text-right text-xs"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      {Math.round(value)}
                    </span>
                  )
                )}

                <span
                  className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xs"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  No. of Mandates
                </span>
              </div>

              {/* =================================================
                  HORIZONTAL SCROLL AREA
              ================================================== */}
              <div className="min-w-0 flex-1 overflow-x-auto pb-2">
                <div
                  className="relative"
                  style={{
                    minWidth: `${Math.max(
                      mandateData.length * 100,
                      650
                    )}px`,
                  }}
                >
                  {/* Grid */}
                  <div className="absolute inset-x-0 top-0 h-[225px]">
                    {[0, 25, 50, 75, 100].map((position) => (
                      <div
                        key={position}
                        className="absolute left-0 right-0 border-t"
                        style={{
                          top: `${position}%`,
                          borderColor:
                            "rgba(200,193,179,0.12)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Bars */}
                  <div className="relative z-10 flex h-[275px] items-end gap-4">
                    {mandateData.map((item, index) => {
                      const value = Number(item.count) || 0;

                      const height =
                        maxValue > 0
                          ? `${(value / maxValue) * 100}%`
                          : "0%";

                      const isToday = item.isToday;

                      return (
                        <div
                          key={`${item.date}-${index}`}
                          className="flex h-full min-w-[80px] flex-1 flex-col items-center justify-end"
                        >
                          {/* Value */}
                          <div
                            className="mb-2 text-sm font-bold"
                            style={{
                              color: colors.textPrimary,
                            }}
                          >
                            {value}
                          </div>

                          {/* Bar */}
                          <div
                            className="relative w-full max-w-[70px] rounded-t-md transition-all duration-300 hover:opacity-80"
                            style={{
                              height,
                              minHeight:
                                value > 0 ? "8px" : "0px",
                              background: isToday
                                ? colors.accentDark
                                : colors.accentLight,
                              boxShadow: isToday
                                ? "0 5px 15px rgba(143,106,29,0.25)"
                                : "none",
                            }}
                          />

                          {/* Date */}
                          <div
                            className="mt-2 text-xs font-medium"
                            style={{
                              color: colors.textSecondary,
                            }}
                          >
                            {formatDate(item.date)}
                          </div>

                          {/* Day */}
                          <div
                            className={`text-xs ${
                              isToday ? "font-bold" : ""
                            }`}
                            style={{
                              color: isToday
                                ? colors.accentLight
                                : colors.textMuted,
                            }}
                          >
                            {item.weekday}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ====================================================
            EXECUTION PROGRESS
        ===================================================== */}
        {/* <div
          className="rounded-2xl border p-5"
          style={{
            background: colors.cardBg,
            borderColor: colors.cardBorder,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          <h2
            className="mb-2 text-lg font-bold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Execution Progress
          </h2>

          <p
            className="mb-5 text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            {executionData.date
              ? `${formatDate(executionData.date)} · ${
                  executionData.weekday || ""
                }`
              : "Selected period"}
          </p>

          <div className="flex flex-col gap-5">
            
            <div className="flex items-center justify-center gap-5">
        
              <div className="relative h-[180px] w-[180px] flex-shrink-0">
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full -rotate-90"
                >
                  
                  <circle
                    cx="100"
                    cy="100"
                    r="72"
                    fill="none"
                    stroke="rgba(174,180,189,0.18)"
                    strokeWidth="30"
                  />

                  {executionTotal > 0 && (
                    <>
                      
                      <circle
                        cx="100"
                        cy="100"
                        r="72"
                        fill="none"
                        stroke={colors.success}
                        strokeWidth="30"
                        strokeDasharray={`${successPercentage * 4.5239} 452.39`}
                        strokeDashoffset="0"
                      />

                      
                      <circle
                        cx="100"
                        cy="100"
                        r="72"
                        fill="none"
                        stroke={colors.danger}
                        strokeWidth="30"
                        strokeDasharray={`${failedPercentage * 4.5239} 452.39`}
                        strokeDashoffset={`-${
                          successPercentage * 4.5239
                        }`}
                      />

                      
                      <circle
                        cx="100"
                        cy="100"
                        r="72"
                        fill="none"
                        stroke="#AEB4BD"
                        strokeWidth="30"
                        strokeDasharray={`${notAttemptedPercentage * 4.5239} 452.39`}
                        strokeDashoffset={`-${
                          (successPercentage + failedPercentage) *
                          4.5239
                        }`}
                      />
                    </>
                  )}
                </svg>

                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    {executionData.total}
                  </span>

                  <span
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    Scheduled
                  </span>
                </div>
              </div>

              
              <div className="min-w-0 flex-1 space-y-4">
                {donutData.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="h-3 w-3 flex-shrink-0 rounded-full"
                      style={{
                        background: item.color,
                      }}
                    />

                    <span
                      className="min-w-0 flex-1 text-sm"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      {item.label}
                    </span>

                    <span
                      className="text-sm font-bold"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      {item.value}
                    </span>

                    <span
                      className="w-9 text-right text-sm"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            
            <div
              className="grid grid-cols-3 gap-2 rounded-xl border p-3"
              style={{
                background: colors.inputBg,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{
                    color: colors.success,
                  }}
                >
                  {executionData.success}
                </div>

                <div
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Success
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{
                    color: colors.danger,
                  }}
                >
                  {executionData.failed}
                </div>

                <div
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Failed
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{
                    color: "#AEB4BD",
                  }}
                >
                  {executionData.notAttempted}
                </div>

                <div
                  className="text-xs"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Not Attempted
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MandateExecution;