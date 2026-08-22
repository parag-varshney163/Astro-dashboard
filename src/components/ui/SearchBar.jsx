import React, { useState } from "react";
import { Search } from "lucide-react";

import colors from "../../constants/colors";
import Button from "./Button";


export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  width="100%"
}) {
  //const [value, setValue] = useState("");
 
  const handleSearch = () => {
    onSearch?.(value);


  };

  return (
    <div
      style={{
        width: width,
        display: "flex",
        alignItems: "center",
        gap: "14px",
        flexWrap: "wrap",
      }}
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          //setValue(e.target.value);
          onChange?.(e.target.value); // 🔥 live search
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        style={{
          flex: 1,
          maxWidth: "400px",
          background: colors.inputBg,
          color: colors.textPrimary,
          padding: "12px 16px",
          borderRadius: "10px",
          border: `1px solid ${colors.cardBorder}`,
          fontSize: "14px",
          outline: "none",
        }}
      />

      {/* Search Button */}
      <Button
        variant="custom"
        bg={colors.buttonBg}
        text="#fff"
        size="sm"
        icon={Search}
        style={{
          borderRadius: "12px",
          padding: "12px 22px",
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
