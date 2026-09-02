import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const AutoPayReminderModal = ({
  open,
  onClose,
  reminder = null,
  onSuccess,
}) => {
  const isEdit = Boolean(reminder);

  const [form, setForm] = useState({
    amount: "",
    months: "",
    currency: "INR",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // SET FORM FOR EDIT
  // ==========================================
  useEffect(() => {
    if (reminder) {
      setForm({
        amount: reminder.amount ?? "",
        months: reminder.months ?? "",
        currency: reminder.currency ?? "INR",
        isActive: reminder.isActive ?? true,
      });
    } else {
      setForm({
        amount: "",
        months: "",
        currency: "INR",
        isActive: true,
      });
    }
  }, [reminder, open]);

  if (!open) return null;

  // ==========================================
  // HANDLE CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!form.months || Number(form.months) <= 0) {
      toast.error("Please enter valid months");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        amount: Number(form.amount),
        months: Number(form.months),
        currency: form.currency,
        isActive: Boolean(form.isActive),
      };

      let response;

      if (isEdit) {
        response = await axiosInstance.put(
          `/api/v1/auto-pay-reminder/${reminder.id}`,
          payload
        );
      } else {
        response = await axiosInstance.post(
          "/api/v1/auto-pay-reminder",
          payload
        );
      }

      if (
        response?.data?.success ||
        response?.data?.data?.success
      ) {
        toast.success(
          isEdit
            ? "AutoPay reminder updated successfully"
            : "AutoPay reminder created successfully"
        );

        onSuccess?.();
      } else {
        throw new Error(
          response?.data?.message ||
            "Something went wrong"
        );
      }
    } catch (err) {
      console.error("AutoPay reminder save error:", err);

      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save AutoPay reminder"
      );
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: colors.overlay,
        backdropFilter: "blur(4px)",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ==========================================
            HEADER
        ========================================== */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{
            borderBottom: `1px solid ${colors.cardBorder}`,
          }}
        >
          <div>
            <h2
              className="text-xl font-bold"
              style={{
                color: colors.textPrimary,
              }}
            >
              {isEdit
                ? "Edit AutoPay Reminder"
                : "Add AutoPay Reminder"}
            </h2>

            <p
              className="mt-1 text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              {isEdit
                ? "Update reminder configuration"
                : "Create a new reminder configuration"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              border: `1px solid ${colors.cardBorder}`,
              background: colors.inputBg,
              color: colors.textSecondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ==========================================
            FORM
        ========================================== */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* AMOUNT */}
            <div>
              <label
                className="block mb-2 text-sm font-semibold"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="1"
                step="0.01"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: colors.inputBg,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.inputBorder}`,
                  outline: "none",
                }}
              />
            </div>

            {/* MONTHS */}
            <div>
              <label
                className="block mb-2 text-sm font-semibold"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Months
              </label>

              <input
                type="number"
                name="months"
                value={form.months}
                onChange={handleChange}
                placeholder="Enter months"
                min="1"
                step="1"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: colors.inputBg,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.inputBorder}`,
                  outline: "none",
                }}
              />
            </div>

            {/* CURRENCY */}
            <div>
              <label
                className="block mb-2 text-sm font-semibold"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Currency
              </label>

              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: colors.inputBg,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.inputBorder}`,
                  outline: "none",
                }}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {/* ACTIVE */}
            <div
              className="flex items-center justify-between rounded-xl p-4"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
              }}
            >
              <div>
                <p
                  className="font-semibold"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  Active
                </p>

                <p
                  className="text-xs mt-1"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Enable this reminder configuration
                </p>
              </div>

              <label
                style={{
                  position: "relative",
                  width: 48,
                  height: 26,
                  display: "inline-block",
                  cursor: loading
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  disabled={loading}
                  style={{
                    opacity: 0,
                    width: 0,
                    height: 0,
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    background: form.isActive
                      ? colors.accent
                      : colors.inputBorder,
                    transition: "0.2s",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    top: 3,
                    left: form.isActive
                      ? 25
                      : 3,
                    borderRadius: "50%",
                    background: colors.white,
                    transition: "0.2s",
                  }}
                />
              </label>
            </div>

            {/* PREVIEW */}
            {form.amount && form.months && (
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: `1px solid ${colors.accentDark}`,
                }}
              >
                <p
                  className="text-xs mb-1"
                  style={{
                    color: colors.textMuted,
                  }}
                >
                  Display Preview
                </p>

                <p
                  className="font-bold"
                  style={{
                    color: colors.accentLight,
                  }}
                >
                  {form.currency === "INR"
                    ? "₹"
                    : form.currency}{" "}
                  {Number(form.amount).toLocaleString(
                    "en-IN"
                  )}{" "}
                  for {form.months}{" "}
                  {Number(form.months) === 1
                    ? "month"
                    : "months"}
                </p>
              </div>
            )}
          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}
          <div
            className="flex justify-end gap-3 px-6 py-5"
            style={{
              borderTop: `1px solid ${colors.cardBorder}`,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                background: colors.inputBg,
                color: colors.textSecondary,
                border: `1px solid ${colors.cardBorder}`,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                background: colors.gradientButton,
                color: colors.buttonText,
                border: "none",
                fontWeight: 700,
                opacity: loading ? 0.6 : 1,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Reminder"
                : "Create Reminder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutoPayReminderModal;
