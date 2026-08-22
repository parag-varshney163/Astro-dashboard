import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import colors from "../../constants/colors";


export default function FilterDropDown({
  options = [],
  defaultLabel = "Select",
  onSelect,
  defaultOpen = false,
  width=160,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState(defaultLabel);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: width }}>
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: colors.cardBg,
          color: colors.textPrimary,
          borderRadius: "10px",
          border: `1px solid ${colors.cardBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "14px",
        }}
      >
        {selected}
        <ChevronDown size={18} color={colors.textSecondary} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: 0,
            width: "100%",
            background: colors.cardBg,
            borderRadius: "10px",
            border: `1px solid ${colors.cardBorder}`,
            padding: "6px 0",
            zIndex: 10,
            maxHeight: "230px",
            overflowY: "auto",
          }}
        >
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
                if (onSelect) onSelect(opt);
              }}
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                cursor: "pointer",
                color: colors.textSecondary,
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = colors.hover)
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "transparent")
              }
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
