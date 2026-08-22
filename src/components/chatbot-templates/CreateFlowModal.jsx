import React, { useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import Button from "../ui/Button";


export default function CreateFlowModal({ onClose, onSuccess }) {
  const [flowName, setFlowName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!flowName.trim()) return;

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "/api/v1/chatbot-template/flow",
        {
          flowName,
          description,
          status: status.toLowerCase(), // "active" | "inactive"
        }
      );

      // 🔹 Update parent list immediately
      alert("Flow created successfully ✅");
      onSuccess?.(res.data.data);
      onClose();
    } catch (err) {
      console.error("Create flow failed", err);
      const apiMessage =
      err?.response?.data?.message ||
      "Failed to create flow ❌";

    alert(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <div style={closeStyle} onClick={onClose}>
          ✕
        </div>

        <h2 style={titleStyle}>
          Create <span style={{ color: colors.accent }}>Flow</span>
        </h2>

        <p style={subtitleStyle}>
          Design a multi-step conversation flow
        </p>

        {/* Flow Name */}
        <label style={labelStyle}>Flow Name</label>
        <input
          style={inputStyle}
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          placeholder="Enter flow name"
        />

        {/* Description */}
        <label style={labelStyle}>Description</label>
        <textarea
          rows={4}
          style={{ ...inputStyle, height: 90, resize: "none" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />

        {/* Status */}
        <label style={labelStyle}>Status</label>
        <div style={{ display: "flex", gap: 12 }}>
          {["Active", "Inactive"].map((s) => (
            <div
              key={s}
              onClick={() => setStatus(s)}
              style={{
                ...statusButtonStyle,
                background:
                  status === s ? colors.accent : colors.inputBg,
                color:
                  status === s ? "#000" : colors.textSecondary,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={actionStyle}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "#00000088",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const cardStyle = {
  width: 520,
  background: colors.cardBg,
  borderRadius: 20,
  padding: "32px 36px",
  border: `1px solid ${colors.cardBorder}`,
  position: "relative",
  boxShadow: "0 10px 30px #00000055",
};

const closeStyle = {
  position: "absolute",
  top: 16,
  right: 16,
  cursor: "pointer",
  fontSize: 18,
  color: colors.textSecondary,
};

const titleStyle = {
  fontSize: 24,
  fontWeight: 700,
  color: colors.textPrimary,
  textAlign: "center",
  marginBottom: 6,
};

const subtitleStyle = {
  fontSize: 14,
  color: colors.textSecondary,
  textAlign: "center",
  marginBottom: 28,
};

const labelStyle = {
  color: colors.textPrimary,
  fontSize: 14,
  marginTop: 16,
  marginBottom: 8,
  display: "block",
};

const inputStyle = {
  width: "100%",
  background: colors.inputBg,
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: 10,
  padding: "10px 14px",
  color: colors.textPrimary,
  fontSize: 14,
  outline: "none",
};

const statusButtonStyle = {
  flex: 1,
  padding: "10px 14px",
  borderRadius: 10,
  textAlign: "center",
  cursor: "pointer",
  transition: "0.2s",
};

const actionStyle = {
  marginTop: 30,
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};
