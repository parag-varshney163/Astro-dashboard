import { Copy, Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import AddTemplateModal from "./AddTemplateModal";
import colors from "../../constants/colors";


export default function TemplateCard({ template, view, onUpdate, onDelete }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Delete template function
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;

    try {
      setDeleting(true);
      await axiosInstance.delete(`/api/v1/chatbot-template/${template.id}`);


      onDelete(template.id);
    } catch (error) {
      console.error("Failed to delete template", error);
      alert("Failed to delete template");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      style={{
        width: view === "grid" ? "380px" : "100%",
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: "20px",
        padding: "22px",
        color: colors.textPrimary,
        position: "relative",
        maxWidth: "100%",
        opacity: deleting ? 0.5 : 1, // indicate deletion
      }}
    >
      {/* Title + Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "600" }}>{template.title}</p>

        <span
          style={{
            background: template.status === "active" ? "#4CAF50" : "#999",
            color: "#fff",
            padding: "4px 14px",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {template.status === "active" ? "Active" : "Inactive"}
        </span>
      </div>
      {/* Sub Topic */}
      <p
        style={{
          fontSize: "14px",
          color: colors.textSecondary,
          marginBottom: "12px",
          fontWeight: 500,
        }}
      >
        <strong style={{ color: colors.textPrimary }}>Sub Topic:</strong>{" "}
        {template.subTopic}
      </p>

      {/* Keywords */}
      <p
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: colors.textSecondary,
          marginBottom: "6px",
        }}
      >
        Keywords
      </p>


      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {(template.keywords || []).map((k, i) => (
          <span
            key={i}
            style={{
              background: colors.accent,
              color: "#000",
              padding: "4px 12px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            {k}
          </span>
        ))}
      </div>

      {/* Response */}
      <p style={{ fontSize: "15px", marginTop: "14px", marginBottom: "18px" }}>
        {template.response}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "13px", color: colors.textSecondary }}>
          Updated: {template.updated}
        </p>

        <div style={{ display: "flex", gap: "14px" }}>
          <Copy size={18} style={{ cursor: "pointer" }} />
          <Edit2
            size={18}
            style={{ cursor: "pointer" }}
            onClick={() => setOpenEdit(true)}
          />
          <Trash2
            size={18}
            color="#d9534f"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* EDIT MODAL */}
      {openEdit && (
        <AddTemplateModal
          mode="edit"
          templateData={{
            id: template.id,
            category: template.title,
            keywords: (template.keywords || []).join(", "),
            response: template.response,
            subTopic: template.subTopic,
            status: template.status === "active" ? "Active" : "Inactive",
          }}
          onClose={() => setOpenEdit(false)}
          onSuccess={(updatedTemplate) => {
            setOpenEdit(false);
            onUpdate?.(updatedTemplate);
          }}
        />
      )}
    </div>
  );
}
