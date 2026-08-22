import React, { useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


export default function AddTemplateModal({
  onClose,
  onSuccess,
  mode = "add",
  templateData = {},
}) {
  const isEdit = mode === "edit";

  const [category, setCategory] = useState(templateData.category || "");
  const [keywords, setKeywords] = useState(templateData.keywords || "");
  const [response, setResponse] = useState(templateData.response || "");
  const [status, setStatus] = useState(templateData.status || "Active");
  const [loading, setLoading] = useState(false);
  const [subTopic, setSubTopic] = useState(
  templateData.subTopic || ""
);

  const handleSubmit = async () => {
  try {
    setLoading(true);

    const payload = {
      category,
      subTopic,
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
        .join(", "), // ✅ backend expects string
      botResponse: response,
      status: status.toLowerCase(),
    };

    let res;

    if (isEdit) {
      res = await axiosInstance.put(
        `/api/v1/chatbot-template/${templateData.id}`,
        payload
      );
    } else {
      res = await axiosInstance.post(
        "/api/v1/chatbot-template",
        payload
      );
    }

    const updated = res.data.data;
    alert(
      isEdit
        ? "Template updated successfully ✅"
        : "Template created successfully ✅"
    );

    // ✅ IMPORTANT: send updated data back to parent
    onSuccess?.({
      id: updated._id,
      title: updated.category,
      category: updated.category,
      keywords: updated.keywords, // backend may return array or string
      response: updated.botResponse,
      subTopic: updated.subTopic,
      status: updated.status,
      updated: new Date(updated.updatedAt)
        .toISOString()
        .split("T")[0],
    });
    onClose();
  } catch (err) {
    console.error("Template save failed", err);
    const apiMessage =
      err?.response?.data?.message ||
      "Something went wrong ❌ Please try again.";

    alert(apiMessage);
  } finally {
    setLoading(false);
  }
};



  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#00000088",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 450,
          background: colors.cardBg,
          borderRadius: 20,
          padding: "28px 32px",
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <h2 style={{ textAlign: "center",fontSize:"30px",fontWeight:500 }}>
          {isEdit ? "Edit" : "Add New"}{" "}
          <span style={{ color: colors.accent }}>Template</span>
        </h2>

        <label style={labelStyle}>Category</label>
        <FilterDropDown
          width="100%"
          defaultLabel={category || "Select Category"}
          // options={[
          //   "General/Greeting",
          //   "Payment Issues",
          //   "Refunds",
          //   "Login / Account",
          // ]}
           options={[
            "General/Greeting",
            "App Info/Getting Started",
            "Login / Account",
            "KYC / Verification",
            "Wallet / Coins / Recharge",
            "Payment Issues",
            "Refunds",
            "Call / Audio Issues",
            "Creator / Service Quality",
            "Offers / Coupons",
            "Safety / Policy",
            "Feedback / Complaint",
          ]}
          onSelect={setCategory}
        />
        <label style={labelStyle}>Sub Topic</label>

<input
  style={inputStyle}
  value={subTopic}
  placeholder="Enter sub topic"
  onChange={(e) => setSubTopic(e.target.value)}
/>

        <label style={labelStyle}>Keywords</label>
        <input
          style={inputStyle}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <label style={labelStyle}>Bot Response</label>
        <textarea
          rows={4}
          style={{ ...inputStyle, resize: "none" }}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />

        <label style={labelStyle}>Status</label>
        <div style={{ display: "flex", gap: 12 }}>
          {["Active", "Inactive"].map((s) => (
            <div
              key={s}
              onClick={() => setStatus(s)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "center",
                background:
                  status === s ? colors.accent : colors.cardBg,
                  color: status ===s? "#000":colors.textPrimary,
                border:`1px solid ${colors.cardBorder}`  
              }}
            >
              {s}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  marginTop: 16,
  marginBottom: 6,
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: `1px solid ${colors.cardBorder}`,
  background: colors.inputBg,
  color: colors.textPrimary,
};
