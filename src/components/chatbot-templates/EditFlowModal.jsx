import { X, Trash2 } from "lucide-react";
import React, { useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


export default function EditFlowModal({ flow, onClose, onSuccess }) {
  const [flowName, setFlowName] = useState(flow.flowName);
  const [description, setDescription] = useState(flow.description);
  const [status, setStatus] = useState(flow.status);
  const [steps, setSteps] = useState(flow.steps || []);
  const [loading, setLoading] = useState(false);

  const addStep = () => {
    setSteps([...steps, { triggerKeyword: "", botResponse: "", fallbackResponse: "" }]);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index, key, value) => {
    const copy = [...steps];
    copy[index][key] = value;
    setSteps(copy);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(`/api/v1/chatbot-template/flow/${flow._id}`, {
        flowName,
        description,
        status,
        steps,
      });
      alert("Flow updated successfully ✅");
      onSuccess(res.data.data); // update parent
      onClose();
    } catch (err) {
      console.error("Update flow failed", err);
      const apiMessage =
      err?.response?.data?.message ||
      "Failed to update flow ❌";

    alert(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div />
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: colors.textPrimary, fontSize: 22 }}>
              Edit Conversation <span style={{ color: colors.accent }}>Flow</span>
            </h2>
            <p style={{ color: colors.accent, fontSize: 14 }}>
              Manage steps and conversation paths
            </p>
          </div>
          <X onClick={onClose} style={{ justifySelf: "end", cursor: "pointer" }} color="white" />
        </div>

        {/* Flow Info */}
        <input
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          placeholder="Flow Name"
          style={inputStyle}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ ...inputStyle, height: 80 }}
        />

        {/* Steps */}
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ color: colors.textPrimary }}>Conversation step</h3>
            <button
              onClick={addStep}
              style={{
                background: colors.buttonBg,
                padding: "6px 14px",
                borderRadius: 10,
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add Step
            </button>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                background: colors.cardBg,
                padding: 18,
                borderRadius: 16,
                marginTop: 16,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ color: colors.textPrimary }}>Step {index + 1}</h4>
                <Trash2
                  onClick={() => removeStep(index)}
                  color={colors.danger}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <input
                value={step.triggerKeyword}
                onChange={(e) => updateStep(index, "triggerKeyword", e.target.value)}
                placeholder="Trigger Keyword"
                style={inputStyle}
              />
              <textarea
                value={step.botResponse}
                onChange={(e) => updateStep(index, "botResponse", e.target.value)}
                placeholder="Bot Response"
                style={{ ...inputStyle, height: 90 }}
              />
              <input
                value={step.fallbackResponse}
                onChange={(e) => updateStep(index, "fallbackResponse", e.target.value)}
                placeholder="Fallback Response (Optional)"
                style={inputStyle}
              />
            </div>
          ))}
        </div>

        <button onClick={handleSave} style={saveBtn} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

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
  width: 720,
  maxHeight: "90vh",
  overflowY: "auto",
  background: colors.secondary,
  borderRadius: 20,
  padding: 28,
  border: `1px solid ${colors.accent}`,
};

const headerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  marginBottom: 20,
};

const inputStyle = {
  width: "100%",
  background: colors.inputBg,
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: 12,
  padding: "10px 14px",
  color: colors.textPrimary,
  marginTop: 12,
};

const saveBtn = {
  marginTop: 20,
  width: "100%",
  padding: "12px 0",
  background: colors.accent,
  color: "#000",
  fontWeight: 600,
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};
