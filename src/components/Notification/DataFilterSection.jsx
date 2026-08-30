// import React, { useState, useEffect } from "react";
// import { Filter } from "lucide-react";
// import colors from "../../constants/colors";
// import Button from "../ui/Button";
// const DateFilterSection = ({ onChange }) => {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   // 🔁 Notify parent whenever dates change
//   useEffect(() => {
//     onChange?.({
//       fromDate: fromDate || undefined,
//       endDate: toDate || undefined,
//     });
//   }, [fromDate, toDate]);
//   // 🧹 Clear handler
//   const handleClear = () => {
//     setFromDate("");
//     setToDate("");
//     onChange?.({}); // reset filters in parent
//   };
//   return (
//     <div className="flex items-end gap-3 mb-4 flex-wrap">
//       {/* From Date */}
//       <div>
//         <label
//           className="block text-xs font-bold mb-1 ml-1"
//           style={{ color: colors.accent }}
//         >
//           From Date
//         </label>
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           className="bg-[#2A2A2A] text-gray-400 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-yellow-500"
//         />
//       </div>
//       <span className="text-gray-500 mb-3 text-sm">to</span>
//       {/* To Date */}
//       <div>
//         <label
//           className="block text-xs font-bold mb-1 ml-1"
//           style={{ color: colors.accent }}
//         >
//           To Date
//         </label>
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           className="bg-[#2A2A2A] text-gray-400 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-yellow-500"
//         />
//       </div>
//       {/* Buttons */}
//       <div className="flex gap-2 mb-0.5">
//         <Button
//           variant="accent"
//           onClick={handleClear}
//           className="text-black font-bold px-6 py-2 rounded-full text-sm"
//         >
//           Clear
//         </Button>
//         <Button
//           variant="secondary"
//           className="flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm border border-white/10 hover:bg-white/5"
//         >
//           <Filter size={16} />
//           Add Filter
//         </Button>
//       </div>
//     </div>
//   );
// };
// export default DateFilterSection;
import React, { useState } from "react";
import { Filter } from "lucide-react";

import colors from "../../constants/colors";
import Button from "../ui/Button";


const DateFilterSection = ({ onChange }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ===========================
     FROM DATE
  =========================== */
  const handleFromDateChange = (e) => {
    const value = e.target.value;

    setFromDate(value);

    onChange?.({
      fromDate: value || undefined,
      endDate: toDate || undefined,
    });
  };

  /* ===========================
     TO DATE
  =========================== */
  const handleToDateChange = (e) => {
    const value = e.target.value;

    setToDate(value);

    onChange?.({
      fromDate: fromDate || undefined,
      endDate: value || undefined,
    });
  };

  /* ===========================
     CLEAR FILTER
  =========================== */
  const handleClear = () => {
    setFromDate("");
    setToDate("");

    onChange?.({
      fromDate: undefined,
      endDate: undefined,
    });
  };

  const inputStyle = {
    backgroundColor: colors.inputBg,
    color: colors.textSecondary,
    border: `1px solid ${colors.inputBorder}`,
  };

  return (
    <div className="flex items-end gap-3 mb-6 flex-wrap">

      {/* ===========================
          FROM DATE
      =========================== */}
      <div>
        <label
          className="block text-xs font-bold mb-1 ml-1"
          style={{
            color: colors.accent,
          }}
        >
          From Date
        </label>

        <input
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          className="rounded-full px-4 py-2 text-sm outline-none transition-all"
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              colors.inputFocus;

            e.currentTarget.style.boxShadow =
              `0 0 0 2px ${colors.accent}22`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              colors.inputBorder;

            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {/* ===========================
          SEPARATOR
      =========================== */}
      <span
        className="mb-3 text-sm font-medium"
        style={{
          color: colors.textMuted,
        }}
      >
        to
      </span>

      {/* ===========================
          TO DATE
      =========================== */}
      <div>
        <label
          className="block text-xs font-bold mb-1 ml-1"
          style={{
            color: colors.accent,
          }}
        >
          To Date
        </label>

        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          className="rounded-full px-4 py-2 text-sm outline-none transition-all"
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              colors.inputFocus;

            e.currentTarget.style.boxShadow =
              `0 0 0 2px ${colors.accent}22`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              colors.inputBorder;

            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {/* ===========================
          ACTIONS
      =========================== */}
      <div className="flex gap-2 mb-0.5">

        {/* CLEAR */}
        <Button
          variant="accent"
          onClick={handleClear}
          className="font-bold px-6 py-2 rounded-full text-sm"
        >
          Clear
        </Button>

        {/* ADD FILTER */}
        <Button
          variant="secondary"
          className="flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm"
          style={{
            border: `1px solid ${colors.inputBorder}`,
          }}
        >
          <Filter size={16} />
          Add Filter
        </Button>

      </div>
    </div>
  );
};

export default DateFilterSection;