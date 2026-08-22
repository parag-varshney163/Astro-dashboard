// src/components/modals/CreateTicketModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


export default function CreateTicketModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("custom"); 
  const [issueType, setIssueType] = useState("All Types");
  const [priority, setPriority] = useState("Priority");
  const [description, setDescription] = useState("");

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: "720px",
          maxHeight: "96vh",
          overflowY: "auto",
          background: colors.primary,
          borderRadius: 16,
          border: `1.5px solid ${colors.accent}`,
          padding: "28px 32px",
          boxSizing: "border-box",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1
              style={{
                margin: 0,
                color: colors.textPrimary,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 0.2,
                textAlign:"center",
                marginLeft:"100px"
              }}
            >
              Create New Support <span style={{ color: colors.accent }}>Ticket</span>
            </h1>

            <p
              style={{
                marginTop: 8,
                marginBottom: 18,
                color: colors.textSecondary,
                fontSize: 13,
                maxWidth: 520,
                lineHeight: "18px",
                textAlign:"center",
                marginLeft:"80px"
              }}
            >
              Fill in the details below to create a new support ticket. User data will be auto-fetched.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              padding: 8,
              marginLeft: 12,
              cursor: "pointer",
            }}
          >
            <X size={20} color={colors.textPrimary} />
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 12, marginTop: 6 ,justifyContent:"center"}}>
          <div
            onClick={() => setActiveTab("pre")}
            style={{
              cursor: "pointer",
              width: 240,
              textAlign: "center",
              padding: "12px 18px",
              background: activeTab === "pre" ? colors.accent : colors.cardBg,
              color: activeTab === "pre" ? "#000" : colors.textSecondary,
              borderRadius: 10,
              border: `1px solid ${colors.cardBorder}`,
              fontWeight: 600,
              boxShadow: activeTab === "pre" ? "inset 0 -4px 0 rgba(0,0,0,0.06)" : "none",
            }}
          >
            Pre-Defined
          </div>

          <div
            onClick={() => setActiveTab("custom")}
            style={{
              cursor: "pointer",
              width: 240,
              textAlign: "center",
              padding: "12px 18px",
              background: activeTab === "custom" ? colors.accent : colors.cardBg,
              color: activeTab === "custom" ? "#000" : colors.textSecondary,
              borderRadius: 10,
              border: `1px solid ${colors.cardBorder}`,
              fontWeight: 600,
              boxShadow: activeTab === "custom" ? "inset 0 -4px 0 rgba(0,0,0,0.06)" : "none",
            }}
          >
            Custom
          </div>
        </div>

        {/* ------------------------------------------ */}
        {/* PRE-DEFINED VIEW (EXACTLY AS SCREENSHOT)   */}
        {/* ------------------------------------------ */}
        {activeTab === "pre" && (
          <>
            {/* Issue Type Label */}
            <div style={{ marginTop: 22 }}>
              <label
                style={{
                  color: colors.textSecondary,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Issue Type
              </label>
            </div>

            {/* Dropdown */}
            <div style={{ width: 160, marginTop: 10 }}>
              <FilterDropDown
                options={["All Types", "Account Issue", "Verification", "Abuse", "Balance Error"]}
                defaultLabel={issueType}
              />
            </div>

            {/* Pre-defined Templates (TEXT BLOCKS) */}
            {[1, 2].map((_, i) => (
              <div
                key={i}
                style={{
                  marginTop: 18,
                  background: colors.cardBg,
                  borderRadius: 12,
                  border: `1px solid ${colors.cardBorder}`,
                  padding: "14px 18px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontWeight: 700, color: colors.textPrimary, fontSize: 14 }}>
                  Account Access <span style={{ color: colors.accent }}>Problem</span>
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: colors.textSecondary,
                    fontSize: 13,
                    lineHeight: "20px",
                  }}
                >
                  User is unable to access their account. Needs verification and assistance with login.
                </div>
              </div>
            ))}
          </>
        )}

        {/* ------------------------------------------ */}
        {/* CUSTOM VIEW (your existing template box)   */}
        {/* ------------------------------------------ */}
        {activeTab === "custom" && (
          <>
            {/* TEMPLATE BOX */}
            <div
              style={{
                marginTop: 18,
                background: colors.cardBg,
                borderRadius: 12,
                border: `1px solid ${colors.cardBorder}`,
                padding: "28px 26px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 46,
                  borderRadius: 6,
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.textSecondary,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 34,
                    borderRadius: 4,
                    background: "#bfc6d6",
                    opacity: 0.65,
                  }}
                />
              </div>

              <div style={{ marginTop: 12, textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: colors.textPrimary, fontSize: 15 }}>
                  No Custom Templates <span style={{ color: colors.accent }}>Yet</span>
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: colors.textSecondary,
                    fontSize: 13,
                    maxWidth: 520,
                  }}
                >
                  Create one by filling the form and clicking "Save as Template"
                </div>
              </div>
            </div>

            {/* Template Action Buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <Button variant="secondary" size="md" style={{ width: 140 }}>
                Use Template
              </Button>

              <Button variant="secondary" size="md" style={{ width: 160 }}>
                Save as Template
              </Button>
            </div>
          </>
        )}

        {/* USER ROW */}
        <div
          style={{
            marginTop: 26,
            background: colors.cardBg,
            borderRadius: 12,
            border: `1px solid ${colors.cardBorder}`,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: colors.accent,
              flex: "0 0 42px",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: colors.textPrimary, fontWeight: 700, fontSize: 14 }}>Mike Geller</div>
            <div style={{ color: "#d9c36b", fontSize: 12, marginTop: 2 }}>C-12034</div>
          </div>
        </div>

        {/* FORM FIELDS */}
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Issue Type */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 700 }}>
              Issue Type
            </label>
            <div style={{ width: 180 }}>
              <FilterDropDown
                options={["All Types", "Account Issue", "Verification", "Abuse", "Balance Error"]}
                defaultLabel={issueType}
              />
            </div>
          </div>

          {/* Priority */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 700 }}>
              Priority
            </label>
            <div style={{ width: 180 }}>
              <FilterDropDown
                options={["Priority", "Low", "Medium", "High", "Critical"]}
                defaultLabel={priority}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 700 }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description..."
              style={{
                width: "100%",
                height: 86,
                borderRadius: 12,
                background: colors.inputBg,
                border: `1px solid ${colors.cardBorder}`,
                padding: 14,
                color: colors.textPrimary,
                fontSize: 14,
                resize: "none",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 8,
          }}
        >
          <div />

          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Button variant="secondary" size="md" onClick={onClose} style={{ width: 120 }}>
              Cancel
            </Button>

            <Button
              variant="custom"
              size="md"
              bg={colors.accent}
              text="#000"
              style={{
                width: 150,
                borderRadius: 999,
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
            >
              Create Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
