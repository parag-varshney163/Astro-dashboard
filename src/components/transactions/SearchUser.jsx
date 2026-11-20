import React from "react";

import colors from "../../constants/colors";


const SearchUser = ({
  filters,
  setFilters,
  onSearch,
  onClear,
  loading,
}) => {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputStyle = {
    width: "100%",
    height: "46px",
    padding: "0 14px",
    borderRadius: "10px",
    border: `1px solid ${colors.inputBorder}`,
    background: colors.inputBg,
    color: colors.textPrimary,
    outline: "none",
    fontSize: "13px",
    boxSizing: "border-box",
  };

  const fields = [
    { name: "orderId", label: "Order ID", placeholder: "Search by Order ID" },
    { name: "userId", label: "User ID", placeholder: "Search by User ID" },
    { name: "phone", label: "Phone Number", placeholder: "Search by phone" },
  ];

  const hasFilters = Object.values(filters).some(
    (value) => value.trim()
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div
      style={{
        padding: "22px",
        borderRadius: "17px",
        border: `1px solid ${colors.cardBorder}`,
        background: colors.gradientCard,
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          margin: "0 0 18px",
          color: colors.textPrimary,
          fontSize: "16px",
          fontWeight: 700,
        }}
      >
        Search User
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr)) auto",
          gap: "14px",
          alignItems: "end",
        }}
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: colors.textSecondary,
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {field.label}
            </label>

            <input
              name={field.name}
              value={filters[field.name]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={field.placeholder}
              style={inputStyle}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={onSearch}
          disabled={loading}
          style={{
            height: "46px",
            padding: "0 24px",
            borderRadius: "10px",
            border: `1px solid ${colors.accent}`,
            background: colors.gradientButton,
            color: colors.buttonText,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <span style={{ color: colors.accentLight, fontSize: "12px" }}>
          Search using Order ID, User ID or matching phone number.
        </span>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            style={{
              border: "none",
              background: "transparent",
              color: colors.accent,
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchUser;

