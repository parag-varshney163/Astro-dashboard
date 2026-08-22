import React from "react";

import colors from "../../constants/colors";
import Button from "../ui/Button";


export function AddNoteModal({ open, onClose, onSave, value, setValue }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 420,
          background: colors.cardBg,
          borderRadius: 20,
          padding: 24,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <h3 style={{ marginBottom: 12,textAlign:"center",fontSize:20 }}>
          Add <span style={{ color: colors.accent }}>Note</span>
        </h3>

        <textarea
          rows={5}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your note here..."
          style={{
            width: "100%",
            borderRadius: 12,
            padding: 12,
            background: colors.inputBg,
            color: colors.textPrimary,
            border: `1px solid ${colors.cardBorder}`,
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 16,
          }}
        >
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="accent" onClick={onSave}>
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
}

