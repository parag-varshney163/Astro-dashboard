import { Pencil, Trash2, Check, X } from "lucide-react";
import React, { useState } from "react";

import EditFlowModal from "./EditFlowModal";
import colors from "../../constants/colors";


export default function FlowCard({ flow, onDelete, onEditSuccess }) {
  const {
    _id,
    flowName,
    description,
    steps,
    updatedAt,
    status,
  } = flow;

  const isActive = status === "active";
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: colors.cardBg,
        borderRadius: 16,
        padding: "24px",
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ color: colors.textPrimary, fontSize: 20 }}>
            {flowName}
          </h2>
          <p style={{ color: colors.accent, fontSize: 14 }}>
            {description}
          </p>
        </div>

        <div
          style={{
            padding: "6px 16px",
            background: isActive ? colors.success : colors.Blue,
            borderRadius: 12,
            color: "white",
            fontWeight: 600,
            height: 32,
          }}
        >
          {isActive ? "Active" : "Inactive"}
        </div>
      </div>

      {/* Info */}
      <div style={{ marginTop: 20 }}>
        <p style={{ color: colors.textSecondary }}>Steps</p>
        <p style={{ color: colors.accent }}>{steps?.length || 0}</p>

        <p style={{ color: colors.textSecondary }}>Last Updated</p>
        <p style={{ color: colors.accent }}>
          {new Date(updatedAt).toISOString().split("T")[0]}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", marginTop: 22 }}>
        {/* Edit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: colors.inputBg,
            padding: "10px 14px",
            borderRadius: 10,
            width: "70%",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          <Pencil size={16} color={colors.textSecondary} />
          <span style={{ marginLeft: 10, color: colors.textSecondary }}>
            Edit
          </span>
        </div>

        <div
          style={{
            height: 28,
            width: 1,
            background: colors.cardBorder,
            margin: "0 16px",
          }}
        />

        {/* Status Icon */}
        <div style={{ background: colors.hover, padding: 10, borderRadius: 10 }}>
          {isActive ? <Check size={18} /> : <X size={18} />}
        </div>

        {/* Delete */}
        <div
          style={{ marginLeft: 14, cursor: "pointer" }}
          onClick={() => onDelete(_id)}
        >
          <Trash2 size={20} color={colors.danger} />
        </div>
      </div>

      {open && (
        <EditFlowModal
          flow={flow}
          onClose={() => setOpen(false)}
          onSuccess={onEditSuccess}
        />
      )}
    </div>
  );
}
