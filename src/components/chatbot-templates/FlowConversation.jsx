import React, { useEffect, useState } from "react";

import DashboardLoader from "../ui/DashboardLoader";
import axiosInstance from "../../api/axiosInstance";
import FlowCard from "./FlowCard";


const FlowConversation = ({ flows, setFlows }) => {
  const [loading, setLoading] = useState(false);

  const fetchFlows = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/chatbot-template/flow/all");
      if (res.data?.success) {
        setFlows(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch conversation flows", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!flows.length) fetchFlows();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
    "Are you sure you want to delete this flow?"
  );

  if (!confirmDelete) return;
    try {
      await axiosInstance.delete(
        `/api/v1/chatbot-template/flow/${id}`
      );
      // 🔥 remove card instantly
      setFlows((prev) => prev.filter((f) => f._id !== id));
       alert("Flow deleted successfully ✅");
    } catch (err) {
      console.error("Delete failed", err);
      const apiMessage =
      err?.response?.data?.message ||
      "Failed to delete flow ❌";

    alert(apiMessage);
    }
  };

  const handleEditSuccess = (updatedFlow) => {
    setFlows((prev) =>
      prev.map((f) =>
        f._id === updatedFlow._id ? updatedFlow : f
      )
    );
  };

  if (loading) {
    // return <div style={{ marginTop: 30 }}>Loading conversation flows...</div>;
    return <DashboardLoader/>
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "22px",
      }}
    >
      {flows.map((flow) => (
        <FlowCard
          key={flow._id}
          flow={flow}
          onDelete={handleDelete}
          onEditSuccess={handleEditSuccess}
        />
      ))}
    </div>
  );
};

export default FlowConversation;
