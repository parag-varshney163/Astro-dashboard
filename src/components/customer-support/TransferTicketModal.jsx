import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


export default function TransferTicketModal({ open, onClose, onTransfer }) {

  // ✅ ALL hooks at top
  const [executives, setExecutives] = useState([]);
  const [executive, setExecutive] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Hook is always called
  useEffect(() => {
    if (!open) return;

    const fetchExecutives = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          "/api/v1/admin/moderation-users"
        );
        setExecutives(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch executives", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExecutives();
  }, [open]);

  // ✅ Conditional render AFTER hooks
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
          width: "520px",
          background: colors.cardBg,
          border: `1px solid ${colors.accent}`,
          borderRadius: "26px",
          padding: "38px 40px",
          position: "relative",
        }}
      >
        {/* CLOSE */}
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

        <h2 style={{ textAlign: "center", marginBottom: 8 }}>
          Transfer <span style={{ color: colors.accent }}>Ticket</span>
        </h2>

        <p style={{ textAlign: "center", marginBottom: 32 }}>
          Transfer this ticket to another support executive.
        </p>

        <label style={{ marginBottom: 6, display: "block" }}>
          Transfer to <span style={{ color: colors.accent }}>Required</span>
        </label>

        <FilterDropDown
          defaultLabel={loading ? "Loading..." : "Select Executive"}
          options={executives.map((exec) => exec.name)}
          onSelect={(name) => {
            const selected = executives.find((e) => e.name === name);
            setExecutive(selected?._id);
          }}
        />


        <div style={{ marginTop: 30, display: "flex", gap: 18 }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="accent"
            disabled={!executive}
            onClick={() => onTransfer(executive)}
          >
            Transfer Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
