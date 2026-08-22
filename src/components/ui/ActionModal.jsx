import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "./FilterDropDown";
import colors from "../../constants/colors";


export default function ActionModal({
  open,
  onClose,
  title,
  subTitle,
  description,
  confirmLabel,
  userId,
  reportId,
  actionType,         
  onSuccess,
}) {
  const [classification, setClassification] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const classificationOptions = [
    "Genuine Report",
    "Fake Report",
    "Incorrect Report",
  ];

  useEffect(() => {
    if (open) {
      setClassification("");
      setReason("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  /* ================= HELPERS ================= */
  const normalizeClassification = () => {
    if (classification === "Genuine Report") return "genuine";
    if (classification === "Fake Report") return "fake";
    return "incorrect_reason_but_violation";
  };

  /* ================= API CALL ================= */
  const handleConfirm = async () => {
    try {
      setLoading(true);

      const payload = {
        userId,
        reportId,
        // type: actionType, 
        note: reason,
        reportClassification: normalizeClassification(),
      };

      const res = await axiosInstance.post(
        "/api/v1/customer/user/offline",
        payload
      );
      if (res?.data?.message) {
        alert(res.data.message);
      }

      if (res.data?.success) {
        onSuccess?.(res.data.data);
        onClose();
      }
    } catch (err) {
      console.error("Action failed:", err);
      alert(err?.response?.data?.errors||"Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div
        className="rounded-2xl p-6 relative"
        style={{
          width: 550,
          background: colors.cardBg,
          border: `2px solid ${colors.accent}`,
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl"
          style={{ color: colors.textSecondary }}
        >
          ✕
        </button>

        <h2
          className="text-2xl font-semibold text-center"
          style={{ color: colors.accent }}
        >
          {title}
        </h2>

        <p className="text-center mt-1" style={{ color: colors.textSecondary }}>
          {subTitle}
        </p>

        <p className="text-center mt-4 text-red-400 text-sm">
          {description}
        </p>

        {/* ================= CLASSIFICATION ================= */}
        <div className="mt-5">
          <label className="text-sm" style={{ color: colors.accent }}>
            Report Classification
          </label>

          <FilterDropDown
            options={classificationOptions}
            value={classification}
            placeholder="Select classification"
            onSelect={setClassification}
          />
        </div>

        {/* ================= REASON ================= */}
        <div className="mt-4">
          <label className="text-sm" style={{ color: colors.accent }}>
            Reason
          </label>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl"
            rows={5}
            style={{
              background: colors.inputBg,
              color: colors.textPrimary,
              border: `1px solid ${colors.cardBorder}`,
            }}
          />
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            style={{
              background: colors.inputBg,
              padding: "10px 20px",
              borderRadius: "12px",
            }}
          >
            Cancel
          </button>

          <button
            disabled={loading || !classification || !reason}
            onClick={handleConfirm}
            style={{
              background: colors.danger,
              padding: "10px 20px",
              borderRadius: "12px",
              color: "white",
              opacity: loading || !classification ? 0.6 : 1,
            }}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
