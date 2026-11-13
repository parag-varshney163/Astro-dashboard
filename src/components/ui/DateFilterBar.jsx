import { Calendar, RefreshCw } from "lucide-react";
import React, { useState } from "react";

import FilterDropDown from "./FilterDropDown";
import colors from "../../constants/colors";
import Button from "./Button";


export default function DateFilterBar({
  onFilterChange,
  onRefresh,
}) {
  const [selectedFilter, setSelectedFilter] = useState("Yesterday");

  const filterOptions = [
    "Yesterday",
    "Before Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
  ];

  const handleFilterChange = (value) => {
    setSelectedFilter(value);

    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "10px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${colors.cardBorder}`,
        background: colors.primary,
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: colors.textPrimary,
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          <Calendar size={28} />
          <span>{selectedFilter}</span>
        </div>

        <FilterDropDown
          width={180}
          defaultLabel="Yesterday"
          options={filterOptions}
          onSelect={handleFilterChange}
        />
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span
          style={{
            color: colors.textSecondary,
            fontSize: "14px",
          }}
        >
          
        </span>

        <Button
          variant="secondary"
          icon={RefreshCw}
          onClick={onRefresh}
          style={{
            borderRadius: "12px",
            padding: "12px 24px",
            minWidth: "140px",
          }}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
