// import { useState, useRef, useEffect } from "react";
// import { createPortal } from "react-dom";
// import colors from "../../constants/colors";
// const CustomDropdown = ({
//   label,
//   options = [],
//   value,
//   onChange,
//   placeholder,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const triggerRef = useRef(null);
//   const [position, setPosition] = useState(null);
//   // --- Helper Functions to Handle Objects vs Strings ---
//   const getOptionLabel = (option) =>
//     typeof option === "object" ? option.label : option;
//   const getOptionValue = (option) =>
//     typeof option === "object" ? option.value : option;
//   // Determine what text to show in the closed box
//   // (Matches the 'value' ID back to its friendly Label)
//   const selectedOption = options.find((opt) => getOptionValue(opt) === value);
//   const displayLabel = selectedOption ? getOptionLabel(selectedOption) : value;
//   /* -----------------------------
//       Calculate dropdown position
//   ------------------------------ */
//   useEffect(() => {
//     if (isOpen && triggerRef.current) {
//       const rect = triggerRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.bottom + 6,
//         left: rect.left,
//         width: rect.width,
//       });
//     }
//   }, [isOpen]);
//   return (
//     <>
//       <div className="w-full flex flex-col relative">
//         {label && (
//           <label className="block text-[14px] font-bold mb-2 uppercase ml-1 text-white tracking-wider">
//             {label}
//           </label>
//         )}
//         {/* Trigger */}
//         <div
//           ref={triggerRef}
//           onClick={() => setIsOpen((v) => !v)}
//           className={`w-full bg-[#2A2A2A] border rounded-xl p-3 flex justify-between items-center cursor-pointer transition-all ${
//             isOpen
//               ? "border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
//               : "border-white/10 hover:border-white/30"
//           }`}
//         >
//           <span
//             className={`text-sm font-bold truncate ${
//               value ? "text-white" : "text-gray-500"
//             }`}
//           >
//             {/* Show the friendly label, not the raw ID */}
//             {displayLabel || placeholder || "Select..."}
//           </span>
//           <span
//             className={`text-white text-xs transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           >
//             ▼
//           </span>
//         </div>
//       </div>
//       {/* ================= DROPDOWN (PORTAL) ================= */}
//       {isOpen &&
//         position &&
//         createPortal(
//           <>
//             {/* Backdrop */}
//             <div
//               className="fixed inset-0 z-[9998]"
//               onClick={() => setIsOpen(false)}
//             />
//             {/* Menu */}
//             <ul
//               className="fixed z-[9999] border border-white/10 rounded-xl shadow-2xl
//                           overflow-y-auto no-scrollbar max-h-60"
//               style={{
//                 top: position.top,
//                 left: position.left,
//                 width: position.width,
//                 backgroundColor: colors.secondary || "#1a1a1a",
//               }}
//             >
//               {options.length > 0 ? (
//                 options.map((option) => {
//                   const optValue = getOptionValue(option);
//                   const optLabel = getOptionLabel(option);
//                   const isSelected = value === optValue;
//                   return (
//                     <li
//                       // FIX 1: Use unique value for key, not the object
//                       key={optValue}
//                       onClick={() => {
//                         onChange(optValue); // Pass back only the value (e.g., "Gold")
//                         setIsOpen(false);
//                       }}
//                       className={`px-4 py-3 text-sm font-medium cursor-pointer
//                         hover:bg-white/10 transition-colors border-b border-white/5
//                         last:border-0 ${
//                           isSelected
//                             ? "text-yellow-400 font-bold bg-white/5"
//                             : "text-gray-300"
//                         }`}
//                     >
//                       {/* FIX 2: Render string label, not the object */}
//                       {optLabel}
//                     </li>
//                   );
//                 })
//               ) : (
//                 <li className="px-4 py-3 text-sm text-gray-500 italic text-center">
//                   No options available
//                 </li>
//               )}
//             </ul>
//           </>,
//           document.body,
//         )}
//     </>
//   );
// };
// export default CustomDropdown;
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import colors from "../../constants/colors";


const CustomDropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const [position, setPosition] = useState(null);

  // Handle objects and strings
  const getOptionLabel = (option) =>
    typeof option === "object" ? option.label : option;

  const getOptionValue = (option) =>
    typeof option === "object" ? option.value : option;

  // Find selected option
  const selectedOption = options.find(
    (option) => getOptionValue(option) === value
  );

  const displayLabel = selectedOption
    ? getOptionLabel(selectedOption)
    : value;

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className="w-full flex flex-col relative">

        {/* Label */}
        {label && (
          <label
            className="block text-[14px] font-bold mb-2 uppercase ml-1 tracking-wider"
            style={{
              color: colors.textPrimary,
            }}
          >
            {label}
          </label>
        )}

        {/* Trigger */}
        <div
          ref={triggerRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full border rounded-xl p-3 flex justify-between items-center cursor-pointer transition-all"
          style={{
            backgroundColor: colors.inputBg,
            borderColor: isOpen
              ? colors.inputFocus
              : colors.inputBorder,
            boxShadow: isOpen
              ? `0 0 10px ${colors.accent}33`
              : "none",
          }}
          onMouseEnter={(e) => {
            if (!isOpen) {
              e.currentTarget.style.borderColor =
                colors.cardBorder;
            }
          }}
          onMouseLeave={(e) => {
            if (!isOpen) {
              e.currentTarget.style.borderColor =
                colors.inputBorder;
            }
          }}
        >
          {/* Selected Value */}
          <span
            className="text-sm font-bold truncate"
            style={{
              color: value
                ? colors.textPrimary
                : colors.textMuted,
            }}
          >
            {displayLabel || placeholder || "Select..."}
          </span>

          {/* Arrow */}
          <span
            className={`text-xs transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            style={{
              color: colors.accent,
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Dropdown Portal */}
      {isOpen &&
        position &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <ul
              className="fixed z-[9999] rounded-xl shadow-2xl overflow-y-auto no-scrollbar max-h-60 border"
              style={{
                top: position.top,
                left: position.left,
                width: position.width,
                backgroundColor: colors.secondary,
                borderColor: colors.cardBorder,
              }}
            >
              {options.length > 0 ? (
                options.map((option) => {
                  const optValue = getOptionValue(option);
                  const optLabel = getOptionLabel(option);
                  const isSelected = value === optValue;

                  return (
                    <li
                      key={optValue}
                      onClick={() => {
                        onChange(optValue);
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 text-sm font-medium cursor-pointer transition-colors border-b last:border-0"
                      style={{
                        color: isSelected
                          ? colors.accentLight
                          : colors.textSecondary,
                        backgroundColor: isSelected
                          ? colors.hover
                          : "transparent",
                        borderColor: colors.inputBorder,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            colors.hover;
                          e.currentTarget.style.color =
                            colors.textPrimary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            "transparent";
                          e.currentTarget.style.color =
                            colors.textSecondary;
                        }
                      }}
                    >
                      {optLabel}
                    </li>
                  );
                })
              ) : (
                <li
                  className="px-4 py-3 text-sm italic text-center"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  No options available
                </li>
              )}
            </ul>
          </>,
          document.body
        )}
    </>
  );
};

export default CustomDropdown;