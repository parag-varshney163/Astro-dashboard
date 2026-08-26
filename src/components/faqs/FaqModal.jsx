import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const FaqModal = ({
  isOpen,
  onClose,
  faq = null,
  onSuccess,
}) => {
  const isEdit = Boolean(faq);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question || "",
        answer: faq.answer || "",
        isActive: faq.isActive ?? true,
      });
    } else {
      setFormData({
        question: "",
        answer: "",
        isActive: true,
      });
    }

    setError("");
  }, [faq, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      setError("Question is required.");
      return;
    }

    if (!formData.answer.trim()) {
      setError("Answer is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let response;

      if (isEdit) {
        response = await axiosInstance.put(
          `/api/v1/faqs/${faq._id}`,
          {
            question: formData.question.trim(),
            answer: formData.answer.trim(),
            isActive: formData.isActive,
          }
        );
      } else {
        response = await axiosInstance.post(
          "/api/v1/faqs",
          {
            question: formData.question.trim(),
            answer: formData.answer.trim(),
            isActive: formData.isActive,
          }
        );
      }

      if (response.data?.success) {
        onSuccess?.();
        onClose();
      } else {
        setError(
          response.data?.message ||
            `Failed to ${isEdit ? "update" : "create"} FAQ`
        );
      }
    } catch (err) {
      console.error("FAQ save error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          `Failed to ${isEdit ? "update" : "create"} FAQ`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: colors.overlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "650px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "22px 24px",
            borderBottom: `1px solid ${colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: colors.textPrimary,
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              {isEdit ? "Edit FAQ" : "Create FAQ"}
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: colors.textSecondary,
                fontSize: "13px",
              }}
            >
              {isEdit
                ? "Update the frequently asked question."
                : "Add a new frequently asked question."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: `1px solid ${colors.cardBorder}`,
              background: colors.cardBg,
              color: colors.textSecondary,
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: "24px" }}>
            {/* ERROR */}
            {error && (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "rgba(224,82,82,0.12)",
                  border: `1px solid ${colors.danger}`,
                  color: colors.danger,
                  fontSize: "13px",
                }}
              >
                {error}
              </div>
            )}

            {/* QUESTION */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.textSecondary,
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Question <span style={{ color: colors.danger }}>*</span>
              </label>

              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter FAQ question"
                disabled={loading}
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 14px",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                  border: `1px solid ${colors.inputBorder}`,
                  background: colors.inputBg,
                  color: colors.textPrimary,
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* ANSWER */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.textSecondary,
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Answer <span style={{ color: colors.danger }}>*</span>
              </label>

              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                placeholder="Enter FAQ answer"
                disabled={loading}
                rows={6}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                  border: `1px solid ${colors.inputBorder}`,
                  background: colors.inputBg,
                  color: colors.textPrimary,
                  outline: "none",
                  fontSize: "14px",
                  resize: "vertical",
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                }}
              />
            </div>

            {/* STATUS */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    color: colors.textPrimary,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  FAQ Status
                </div>

                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  Enable or disable this FAQ
                </div>
              </div>

              <label
                style={{
                  position: "relative",
                  width: "46px",
                  height: "24px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
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
                    borderRadius: "20px",
                    background: formData.isActive
                      ? colors.success
                      : colors.cardBorder,
                    transition: "0.2s",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    left: formData.isActive ? "25px" : "3px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: colors.white,
                    transition: "0.2s",
                  }}
                />
              </label>
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              padding: "18px 24px",
              borderTop: `1px solid ${colors.cardBorder}`,
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                height: "42px",
                padding: "0 18px",
                borderRadius: "10px",
                border: `1px solid ${colors.cardBorder}`,
                background: colors.cardBg,
                color: colors.textSecondary,
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                height: "42px",
                padding: "0 22px",
                borderRadius: "10px",
                border: `1px solid ${colors.accent}`,
                background: colors.gradientButton,
                color: colors.buttonText,
                fontSize: "13px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update FAQ"
                : "Create FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaqModal;
