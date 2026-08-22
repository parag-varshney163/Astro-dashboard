// src/components/TemplatesOverview.jsx
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import DashboardCard from "../ui/DashboardCard";
import colors from "../../constants/colors";


export default function ChatBotStats() {
  const [stats, setStats] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= FETCH STATS =================
  const fetchTemplateStats = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/chatbot-template/stats"); 

      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch template stats", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= TOGGLE HANDLER =================
  const handleToggle = () => {
    if (!showStats && !stats) {
      fetchTemplateStats();
    }
    setShowStats((prev) => !prev);
  };

  // ================= STYLES =================
  const containerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    
    gap: 20,
  };

  const toggleStyle = {
    alignSelf: "flex-start",
    padding: "8px 14px",
    borderRadius: 10,
    background: colors.inputBg,
    color: colors.textPrimary,
    border: `1px solid ${colors.cardBorder}`,
    cursor: "pointer",
    fontSize: 13,
  };

  const wrapperStyle = {
    display: "flex",
    gap: "50px",
    maxWidth: "100%",
    justifyContent:"center",
    
  };

  // ================= RENDER =================
  return (
    <div style={containerStyle}>
      {/* ===== TOGGLE BUTTON ===== */}
      <button style={toggleStyle} onClick={handleToggle}>
        {showStats ? "Hide" : "Show"}
      </button>

      {/* ===== STATS CARDS ===== */}
      {showStats && (
        <div style={wrapperStyle}>
          {loading ? (
            <span style={{ color: colors.textSecondary }}>Loading...</span>
          ) : (
            <>
              <DashboardCard
                title="Total"
                highlight="Template"
                value={stats?.totalTemplates ?? 0}
                trendText="Conversation responses"
                trendColor={colors.accent}
                width={280}
              />

              <DashboardCard
                title="Active"
                highlight="Template"
                value={stats?.activeTemplates ?? 0}
                trendText="Currently in use"
                trendColor={colors.accent}
                width={280}
              />

              <DashboardCard
                title="Catego"
                highlight="ries"
                value={stats?.totalCategories ?? 0}
                trendText="Template categories"
                trendColor={colors.accent}
                width={280}
                noSpace
              />

              <DashboardCard
                title="Conversation"
                highlight="Flows"
                value={stats?.ConversationFlows ?? 0}
                trendText="Multi-step conversations"
                trendColor={colors.accent}
                width={280}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
