// src/components/DashboardCard.jsx
import React from "react";

import colors from "../../constants/colors";


const DashboardCard = ({ title, highlight, value, trendIcon, trendText, trendColor,noSpace=false,width=260 }) => {
  return (
    <div
      className="rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center"
      style={{
        width: width,
        backgroundColor: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        height: "130px"
      }}
    >
      {/* TITLE */}
      <h2 className="text-lg font-medium" style={{ color: colors.textSecondary }}>
        {title}
        {!noSpace && " "} 
        <span style={{ color: colors.accent }}>{highlight}</span>
      </h2>

      {/* MAIN VALUE */}
      <div
        className="text-4xl font-semibold mt-3"
        style={{ color: colors.textPrimary }}
      >
        {value}
      </div>

      {/* TREND SECTION */}
      <div
        className="flex items-center gap-1 mt-3 text-sm justify-center"
        style={{ color: trendColor }}
      >
        {trendIcon}
        <span>{trendText}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
