import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, } from "recharts";
// src/components/UserActivityTrend.jsx
import React from "react";

import colors from "../../constants/colors";


export default function UserActivityTrend({ title = "User Activity", data }) {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        width: "620px",                
        height: "360px",
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* Title */}
      <h2
        className="text-lg font-semibold mb-6"
        style={{ color: colors.textSecondary,textAlign:"center" }}
      >
        {title} <span style={{ color: colors.accent }}>Trend</span>
      </h2>

      {/* Chart */}
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
            }}
          >
            {/* AXIS */}
            <XAxis
              dataKey="name"
              axisLine={{ stroke: colors.textPrimary }}
              tick={false}
            />

            <YAxis
              axisLine={{ stroke: colors.textPrimary }}
              tick={false}
            />

            {/* LINES */}
            <Line
              type="monotone"
              dataKey="a"
              stroke={colors.accent}
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="b"
              stroke={colors.Blue}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

