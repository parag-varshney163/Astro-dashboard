// TemplateSearchHeader.jsx
import React, { useState } from "react";

import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";


export default function TemplateSearchHeader({
  onViewChange,
  onSearch,
  onCategoryChange,
}) {
  const [view, setView] = useState("grid");

  const container = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "20px",
  };

  return (
    <div style={container}>
      {/* LEFT: Search bar */}
      <div style={{ flex: 1 }}>
        <SearchBar
          placeholder="Search by keyword..."
          onChange={(value) => onSearch?.(value)}
        />
      </div>

      {/* RIGHT: Dropdown + View Switch */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Filter dropdown */}
        <FilterDropDown
          width={200}
          defaultLabel="All Categories"
          options={[
            // "General/Greeting",
            // "App Info/Getting Started",
            // "Login / Account",
            // "KYC / Verification",
            // "Wallet / Coins / Recharge",
            // "Payment Issues",
            // "Refunds",
            // "Call / Audio Issues",
            // "Creator / Service Quality",
            // "Offers / Coupons",
            // "Safety / Policy",
            // "Feedback / Complaint",
            "Astrology Chat Related",
            "Kundali Related",
            "Horoscope Related",
            "Subscription Related",
            "Login Related",
            "Technical Issues",
            "Account Deletion",
            "Other Queries",
          ]}
          onSelect={(value) => onCategoryChange?.(value)}
        />

        {/* VIEW SWITCH */}
        <div
          style={{
            display: "flex",
            background: colors.cardBg,
            padding: "4px",
            borderRadius: "30px",
            border: `1px solid ${colors.cardBorder}`,
            gap: "6px",
          }}
        >
          {/* Grid View */}
          <Button
            size="sm"
            variant="custom"
            bg={view === "grid" ? colors.accent : colors.cardBg}
            text={view === "grid" ? "#000" : colors.textSecondary}
            style={{
              borderRadius: "20px",
              padding: "8px 18px",
              border: `1px solid ${view === "grid" ? colors.accent : "transparent"
                }`,
            }}
            onClick={() => {
              setView("grid");
              onViewChange?.("grid");
            }}
          >
            Grid View
          </Button>

          {/* List View */}
          <Button
            size="sm"
            variant="custom"
            bg={view === "list" ? colors.accent : colors.cardBg}
            text={view === "list" ? "#000" : colors.textSecondary}
            style={{
              borderRadius: "20px",
              padding: "8px 18px",
              border: `1px solid ${view === "list" ? colors.accent : "transparent"
                }`,
            }}
            onClick={() => {
              setView("list");
              onViewChange?.("list");
            }}
          >
            List View
          </Button>
        </div>
      </div>
    </div>
  );
}
