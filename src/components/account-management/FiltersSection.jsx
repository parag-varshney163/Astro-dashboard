// src/components/FiltersSection.jsx
import React, { useState } from "react";

import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";


export default function FiltersSection({ filters, setFilters }) {
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      action: "",
      role: "",
      engagement: "",
      reason: "",
      gender: "",
      date: "",
      page: 1,
      limit: 10,
    });
    setLocalSearch("");
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "42px",
        flexWrap: "wrap",
      }}
    >
      {/* Status */}
      <FilterDropDown
        defaultLabel="All Status"
        width={150}
        options={["requested", "approved", "rejected"]}
        onSelect={(val) => handleFilterChange("action", val)}
      />

      {/* Type */}
      <FilterDropDown
        defaultLabel="All Types"
        width={150}
        options={["user", "creator"]}
        onSelect={(val) => handleFilterChange("role", val)}
      />

      {/* Engagement */}
      <FilterDropDown
        defaultLabel="Engagement"
        width={150}
        options={["Low(0-30)", "Medium(30-60)", "High(60+)"]}
        onSelect={(val) => handleFilterChange("engagement", val)}
      />

      {/* Reason */}
      <FilterDropDown
        defaultLabel="Reason"
        width={150}
        options={["Privacy", "Quality", "Account Issues", "Other"]}
        onSelect={(val) => handleFilterChange("reason", val)}
      />

      {/* Gender */}
      <FilterDropDown
        defaultLabel="Gender"
        width={150}
        options={["Male", "Female", "Other"]}
        onSelect={(val) => handleFilterChange("gender", val)}
      />

      {/* Date */}
      <FilterDropDown
        defaultLabel="Date"
        width={150}
        options={["Today", "Yesterday", "Last 7 Days", "Last 30 Days"]}
        onSelect={(val) => handleFilterChange("date", val)}
      />

      {/* Reset */}
      <Button
        variant="custom"
        bg={colors.cardBg}
        text={colors.textPrimary}
        size="md"
        style={{
          borderRadius: "20px",
          padding: "10px 20px",
          border: `1px solid ${colors.cardBorder}`,
        }}
        onClick={handleReset}
      >
        Reset
      </Button>

      {/* Search */}
      <div
        style={{
          marginLeft: "auto",
          minWidth: "460px",
          flex: 1,
          marginTop: "-25px",
        }}
      >
        <SearchBar
          value={localSearch}
          onChange={(val) => setLocalSearch(val)}
          onSearch={() =>
            setFilters((prev) => ({
              ...prev,
              search: localSearch,
              page: 1,
            }))
          }
        />
      </div>
    </div>
  );
}
