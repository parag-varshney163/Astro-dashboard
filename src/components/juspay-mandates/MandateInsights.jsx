import { Wallet, RefreshCw, XCircle, CircleX, } from "lucide-react";
import React from "react";

import colors from "../../constants/colors";


const failureReasons = [
  { label: "Insufficient Funds", percentage: 62 },
  { label: "UPI/Bank Issue", percentage: 14 },
  { label: "User Revoked", percentage: 10 },
  { label: "Other (Network/Timeout)", percentage: 8 },
  { label: "Unknown", percentage: 6 },
];

const statusData = [
  {
    label: "Active",
    value: "4,320",
    change: "↑ 2%",
    icon: Wallet,
    color: colors.success,
    bg: "rgba(61,190,108,0.10)",
    iconBg: "rgba(61,190,108,0.15)",
  },
  {
    label: "In Retry",
    value: "612",
    change: "→ 0%",
    icon: RefreshCw,
    color: colors.warning,
    bg: "rgba(224,184,78,0.10)",
    iconBg: "rgba(224,184,78,0.15)",
  },
  {
    label: "Cancelled (App)",
    value: "155",
    change: "↑ 5%",
    icon: XCircle,
    color: colors.danger,
    bg: "rgba(224,82,82,0.10)",
    iconBg: "rgba(224,82,82,0.15)",
  },
  {
    label: "Cancelled (UPI)",
    value: "98",
    change: "↑ 3%",
    icon: CircleX,
    color: "#AEB4BD",
    bg: "rgba(174,180,189,0.10)",
    iconBg: "rgba(174,180,189,0.15)",
  },
];

const nextSevenDays = [
  {
    date: "27 Sep 2026",
    scheduled: 342,
    success: "110 - 140",
    revenue: "₹ 76K - 98K",
  },
  {
    date: "28 Sep 2026",
    scheduled: 410,
    success: "130 - 160",
    revenue: "₹ 91K - 1.12L",
  },
  {
    date: "29 Sep 2026",
    scheduled: 388,
    success: "120 - 150",
    revenue: "₹ 84K - 1.05L",
  },
  {
    date: "30 Sep 2026",
    scheduled: 296,
    success: "95 - 120",
    revenue: "₹ 66K - 84K",
  },
  {
    date: "01 Oct 2026",
    scheduled: 452,
    success: "145 - 175",
    revenue: "₹ 1.01L - 1.22L",
  },
  {
    date: "02 Oct 2026",
    scheduled: 370,
    success: "120 - 150",
    revenue: "₹ 84K - 1.05L",
  },
  {
    date: "03 Oct 2026",
    scheduled: 310,
    success: "100 - 125",
    revenue: "₹ 70K - 87K",
  },
];

const MandateInsights = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[1fr_1.1fr_1.15fr]">
      {/* =====================================================
          FAILURE REASONS
      ====================================================== */}
      <div
        className="rounded-2xl border p-5"
        style={{
          background: colors.cardBg,
          borderColor: colors.cardBorder,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          className="mb-7 text-lg font-bold"
          style={{ color: colors.textPrimary }}
        >
          Failure Reasons (Today)
        </h2>

        <div className="space-y-5">
          {failureReasons.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3"
            >
              {/* Label */}
              <div
                className="w-[175px] flex-shrink-0 text-sm"
                style={{ color: colors.textSecondary }}
              >
                {item.label}
              </div>

              {/* Progress */}
              <div className="h-4 min-w-0 flex-1 overflow-hidden rounded-md bg-white/10">
                <div
                  className="h-full rounded-md transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    background: `linear-gradient(90deg, ${colors.danger}, rgba(224,82,82,0.35))`,
                  }}
                />
              </div>

              {/* Percentage */}
              <div
                className="w-9 text-right text-sm font-medium"
                style={{ color: colors.textSecondary }}
              >
                {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          MANDATE STATUS OVERVIEW
      ====================================================== */}
      <div
        className="rounded-2xl border p-5"
        style={{
          background: colors.cardBg,
          borderColor: colors.cardBorder,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          className="mb-4 text-lg font-bold"
          style={{ color: colors.textPrimary }}
        >
          Mandate Status Overview
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {statusData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl p-4 transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: item.bg,
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: item.iconBg,
                      color: item.color,
                    }}
                  >
                    <Icon size={21} />
                  </div>

                  {/* Value */}
                  <div className="min-w-0">
                    <div
                      className="text-xl font-bold"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </div>

                    <div
                      className="truncate text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {item.label}
                    </div>
                  </div>
                </div>

                {/* Change */}
                <div
                  className="mt-2 text-right text-sm font-medium"
                  style={{ color: item.color }}
                >
                  {item.change}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          NEXT 7 DAYS
      ====================================================== */}
      <div
        className="min-w-0 rounded-2xl border p-5"
        style={{
          background: colors.cardBg,
          borderColor: colors.cardBorder,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          className="mb-4 text-lg font-bold"
          style={{ color: colors.textPrimary }}
        >
          Next 7 Days (Expected)
        </h2>

        {/* Table Scroll */}
        <div className="overflow-x-auto rounded-xl border"
          style={{ borderColor: colors.cardBorder }}
        >
          <table className="w-full min-w-[570px] border-collapse">
            <thead>
              <tr
                style={{
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <th
                  className="border-b px-3 py-2 text-left text-xs font-medium"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.cardBorder,
                  }}
                >
                  Date
                </th>

                <th
                  className="border-b px-3 py-2 text-left text-xs font-medium"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.cardBorder,
                  }}
                >
                  Scheduled
                </th>

                <th
                  className="border-b px-3 py-2 text-left text-xs font-medium"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.cardBorder,
                  }}
                >
                  Est. Success
                </th>

                <th
                  className="border-b px-3 py-2 text-left text-xs font-medium"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.cardBorder,
                  }}
                >
                  Est. Revenue
                </th>
              </tr>
            </thead>

            <tbody>
              {nextSevenDays.map((item, index) => (
                <tr
                  key={item.date}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td
                    className="border-b px-3 py-[7px] text-sm"
                    style={{
                      color: colors.textSecondary,
                      borderColor: colors.cardBorder,
                    }}
                  >
                    {item.date}
                  </td>

                  <td
                    className="border-b px-3 py-[7px] text-sm font-medium"
                    style={{
                      color: colors.textPrimary,
                      borderColor: colors.cardBorder,
                    }}
                  >
                    {item.scheduled}
                  </td>

                  <td
                    className="border-b px-3 py-[7px] text-sm"
                    style={{
                      color: colors.textSecondary,
                      borderColor: colors.cardBorder,
                    }}
                  >
                    {item.success}
                  </td>

                  <td
                    className="border-b px-3 py-[7px] text-sm font-medium"
                    style={{
                      color: colors.accentLight,
                      borderColor: colors.cardBorder,
                    }}
                  >
                    {item.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MandateInsights;
