import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from "recharts";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../../api/axiosInstance";
import colors from "../../../constants/colors";


const HourlyStatsChart = () => {
  const [stats, setStats] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStats = async (selectedDate = "") => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "/api/v1/customer/user-hourly-stats",
        {
          params: selectedDate ? { date: selectedDate } : {},
        }
      );

      setStats(res.data.data.data);
    } catch (error) {
      console.error("Failed to fetch hourly stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: colors.gradientVertical,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-xl font-semibold"
          style={{ color: colors.textPrimary }}
        >
          Hourly User & Creator <span style={{color:colors.accent}}>Activity</span>
        </h2>

        {/* Date Filter */}
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            fetchStats(e.target.value);
          }}
          className="px-3 py-2 rounded-lg outline-none"
          style={{
            background: colors.inputBg,
            color: colors.textPrimary,
            border: `1px solid ${colors.cardBorder}`,
          }}
        />
      </div>

      {loading ? (
        <p style={{ color: colors.textSecondary }}>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3b" />

            <XAxis
              dataKey="time"
              stroke={colors.textSecondary}
            />
            <YAxis stroke={colors.textSecondary} />

            <Tooltip
              contentStyle={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                color: colors.textPrimary,
              }}
            />

            <Legend />

            {/* Users Line */}
            <Line
              type="monotone"
              dataKey="users"
              stroke={colors.accent}
              strokeWidth={3}
              dot={false}
            />

            {/* Creators Line */}
            <Line
              type="monotone"
              dataKey="creators"
              stroke={colors.Blue}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HourlyStatsChart;
