import React, { useState } from "react";
import { X } from "lucide-react";

import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


export default function AddInternalNoteModal({ open, onClose, onSave }) {
  const [executive, setExecutive] = useState("");
  const [note, setNote] = useState("");

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
      <div
        style={{
          width: "540px",
          background: colors.cardBg,
          border: `1px solid ${colors.accent}`,
          borderRadius: "26px",
          padding: "38px 40px",
          position: "relative",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <X size={26} color={colors.textPrimary} />
        </button>

        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "26px",
            fontWeight: 700,
            color: colors.textPrimary,
            marginBottom: "8px",
          }}
        >
          Add Internal <span style={{ color: colors.accent }}>Note</span>
        </h2>

        <p
          style={{
            textAlign: "center",
            color: colors.textSecondary,
            fontSize: "14px",
            marginBottom: "32px",
            lineHeight: 1.4,
          }}
        >
          Add an internal note to this ticket. This will not be visible to the user.
        </p>

        {/* LABEL */}
        <label
          style={{
            color: colors.textSecondary,
            fontSize: "15px",
            marginBottom: "6px",
            display: "block",
          }}
        >
          Note Content <span style={{ color: colors.accent }}>Required</span>
        </label>

        {/* DROPDOWN */}
        <div style={{ marginBottom: "16px" }}>
          <FilterDropDown
            defaultLabel="Select Executive"
            options={["Executive 1", "Executive 2", "Executive 3"]}
            onSelect={(val) => setExecutive(val)}
          />
        </div>

        {/* TEXTAREA */}
        <textarea
          placeholder="Write your internal note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            width: "100%",
            height: "140px",
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: "18px",
            padding: "16px",
            color: colors.textPrimary,
            fontSize: "15px",
            resize: "none",
            outline: "none",
            marginBottom: "26px",
          }}
        />

        {/* BUTTONS ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            marginTop: "10px",
          }}
        >
          <Button
            variant="secondary"
            size="md"
            style={{
              width: "140px",
              padding: "10px 0",
              borderRadius: "14px",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="accent"
            size="md"
            style={{
              width: "160px",
              padding: "10px 0",
              borderRadius: "14px",
            }}
            onClick={() => onSave(executive, note)}
          >
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}

