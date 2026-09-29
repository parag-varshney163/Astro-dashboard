import { CalendarDays, ChevronDown, RefreshCcw } from "lucide-react";

import colors from "../../constants/colors";


const JuspayHeader = () => {
  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between rounded-3xl p-6 border"
      style={{
        background: colors.gradientHero,
        borderColor: colors.cardBorder,
      }}
    >
      {/* Left */}
      <div>
        <h1
          className="text-4xl font-bold"
          style={{ color: colors.textPrimary }}
        >
          Juspay Mandate Tracker
        </h1>

        <p
          className="mt-2 text-base"
          style={{ color: colors.textSecondary }}
        >
          Track upcoming deductions, execution status and mandate health
        </p>
      </div>

      {/* Right */}
      {/* <div className="mt-5 lg:mt-0 flex flex-col items-end gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          
          <button
            className="flex items-center gap-3 px-5 py-3 rounded-xl border"
            style={{
              background: colors.inputBg,
              borderColor: colors.inputBorder,
              color: colors.textPrimary,
            }}
          >
            <CalendarDays size={18} />
            <span>27 Sep 2026</span>
            <ChevronDown size={16} />
          </button>

          
          <button
            className="px-5 py-3 rounded-xl border"
            style={{
              background: colors.inputBg,
              borderColor: colors.inputBorder,
              color: colors.textPrimary,
            }}
          >
            7D
          </button>

          <button
            className="px-5 py-3 rounded-xl border"
            style={{
              background: colors.inputBg,
              borderColor: colors.inputBorder,
              color: colors.textPrimary,
            }}
          >
            30D
          </button>

          <button
            className="px-5 py-3 rounded-xl font-semibold"
            style={{
              background: colors.buttonBg,
              color: colors.buttonText,
            }}
          >
            Today
          </button>

          
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl border"
            style={{
              background: colors.cardBg,
              borderColor: colors.cardBorder,
              color: colors.textPrimary,
            }}
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        <p
          className="text-sm"
          style={{ color: colors.textMuted }}
        >
          Last updated:{" "}
          <span style={{ color: colors.textSecondary }}>
            27 Sep 2026, 02:15 PM
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default JuspayHeader;