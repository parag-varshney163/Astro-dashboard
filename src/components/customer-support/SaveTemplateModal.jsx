import React, { useState } from "react";
import { X } from "lucide-react";

import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


export default function SaveTemplateModal({
  open,
  onClose,
  issueType = "Account Issues",
  priority = "HIGH",
  description = "User is unable to access their account. Needs verification and assistance with Login",
  onSave,
}) {
  const [templateName, setTemplateName] = useState("");

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* MODAL */}
      <div
        style={{
          width: "480px", // 🔥 small modal
          background: colors.cardBg,
          border: `1px solid ${colors.accent}`,
          borderRadius: "22px",
          padding: "26px 30px", // 🔥 compact padding
          position: "relative",
        }}
      >
        {/* CLOSE ICON */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "transparent",
            border: "none",
          }}
        >
          <X size={24} color={colors.textPrimary} />
        </button>

        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: 700,
            color: colors.textPrimary,
            marginBottom: "4px",
          }}
        >
          Save as Custom <span style={{ color: colors.accent }}>Template</span>
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: colors.textSecondary,
            marginBottom: "20px",
          }}
        >
          Save the current ticket details as a reusable template.
        </p>

        {/* Template Name */}
        <div className="grid">
        <label
          style={{
            color: colors.textSecondary,
            fontSize: "15px",
          }}
        >
          Template <span style={{ color: colors.accent }}>Name</span>
        </label>

        <input
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Enter template name"
          style={{
            marginTop: "4px",
            width: "100%",
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
            padding: "14px",
            color: colors.textPrimary,
            fontSize: "14px",
            borderRadius: "14px",
            marginBottom: "18px",
          }}
        />
        </div>

        {/* Issue Type */}
        <label
          style={{
            color: colors.textSecondary,
            fontSize: "15px",
          }}
        >
          Issue <span style={{ color: colors.accent }}>Type</span>
        </label>

        <div style={{ marginTop: "4px", marginBottom: "16px" }}>
          <FilterDropDown
            defaultLabel={issueType}
            options={[
              "Account Issues",
              "Payment Issues",
              "Technical Issue",
              "Login Issue",
            ]}
          />
        </div>

        {/* Priority */}
        <label
          style={{
            color: colors.textSecondary,
            fontSize: "15px",
          }}
        >
          Priority
        </label>

        <div style={{ marginTop: "4px", marginBottom: "16px" }}>
          <FilterDropDown
            defaultLabel={priority}
            options={["LOW", "MEDIUM", "HIGH"]}
          />
        </div>

        {/* REVIEW */}
        <label
          style={{
            color: colors.textSecondary,
            fontSize: "15px",
          }}
        >
          Template <span style={{ color: colors.accent }}>Review</span>
        </label>

        <div
          style={{
            background: colors.inputBg,
            borderRadius: "16px",
            border: `1px solid ${colors.cardBorder}`,
            padding: "18px", // 🔥 smaller
            marginTop: "8px",
            marginBottom: "22px",
          }}
        >
          <p style={{ marginBottom: "10px", color: colors.textPrimary }}>
            <strong>Issue Type:</strong>{" "}
            <span style={{ color: colors.accent }}>{issueType}</span>
          </p>

          <p style={{ marginBottom: "10px", color: colors.textPrimary }}>
            <strong>Priority:</strong>{" "}
            <span style={{ color: colors.danger }}>{priority}</span>
          </p>

          <p style={{ color: colors.textPrimary }}>
            <strong>Description:</strong>{" "}
            <span
              style={{
                color: colors.accent,
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {description}
            </span>
          </p>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <Button
            variant="secondary"
            size="lg"
            style={{
              width: "150px",
              borderRadius: "12px",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="accent"
            size="lg"
            style={{
              width: "170px",
              borderRadius: "12px",
            }}
            onClick={() => onSave(templateName)}
          >
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
}
