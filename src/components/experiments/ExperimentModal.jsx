import { Plus, Trash2, X, FlaskConical, Save } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import Button from "../ui/Button";


const defaultForm = {
  experimentKey: "",
  variants: [
    {
      key: "control",
      weight: 100,
    },
  ],
  isActive: true,
};

const ExperimentModal = ({
  isOpen,
  onClose,
  experiment = null,
  onSuccess = () => {},
}) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEdit = Boolean(experiment);

  // --------------------------------------------------
  // Populate form for edit / reset for create
  // --------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    setError("");
    setSuccess("");

    if (experiment) {
      setForm({
        experimentKey: experiment.experimentKey || "",
        variants:
          experiment.variants?.length > 0
            ? experiment.variants.map((variant) => ({
                key: variant.key || "",
                weight: Number(variant.weight) || 0,
              }))
            : [
                {
                  key: "control",
                  weight: 100,
                },
              ],
        isActive:
          typeof experiment.isActive === "boolean"
            ? experiment.isActive
            : true,
      });
    } else {
      setForm(defaultForm);
    }
  }, [isOpen, experiment]);

  // --------------------------------------------------
  // Escape key
  // --------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // --------------------------------------------------
  // Experiment key
  // --------------------------------------------------
  const handleExperimentKeyChange = (e) => {
    setForm((prev) => ({
      ...prev,
      experimentKey: e.target.value,
    }));
  };

  // --------------------------------------------------
  // Variant key
  // --------------------------------------------------
  const handleVariantKeyChange = (index, value) => {
    setForm((prev) => {
      const variants = [...prev.variants];

      variants[index] = {
        ...variants[index],
        key: value,
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  // --------------------------------------------------
  // Variant weight
  // --------------------------------------------------
  const handleVariantWeightChange = (index, value) => {
    setForm((prev) => {
      const variants = [...prev.variants];

      variants[index] = {
        ...variants[index],
        weight: value === "" ? "" : Number(value),
      };

      return {
        ...prev,
        variants,
      };
    });
  };

  // --------------------------------------------------
  // Add variant
  // --------------------------------------------------
  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          key: "",
          weight: 0,
        },
      ],
    }));
  };

  // --------------------------------------------------
  // Remove variant
  // --------------------------------------------------
  const removeVariant = (index) => {
    if (form.variants.length === 1) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  // --------------------------------------------------
  // Active toggle
  // --------------------------------------------------
  const toggleActive = () => {
    setForm((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  // --------------------------------------------------
  // Validation
  // --------------------------------------------------
  const validateForm = () => {
    const experimentKey = form.experimentKey.trim();

    if (!experimentKey) {
      return "Experiment key is required.";
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(experimentKey)) {
      return "Experiment key can only contain letters, numbers, hyphens and underscores.";
    }

    if (!form.variants.length) {
      return "At least one variant is required.";
    }

    const keys = new Set();

    for (let i = 0; i < form.variants.length; i++) {
      const variant = form.variants[i];

      if (!variant.key.trim()) {
        return `Variant ${i + 1} key is required.`;
      }

      if (keys.has(variant.key.trim())) {
        return `Duplicate variant key "${variant.key}".`;
      }

      keys.add(variant.key.trim());

      const weight = Number(variant.weight);

      if (Number.isNaN(weight)) {
        return `Variant ${i + 1} weight must be a number.`;
      }

      if (weight < 0 || weight > 100) {
        return `Variant ${i + 1} weight must be between 0 and 100.`;
      }
    }

    const totalWeight = form.variants.reduce(
      (sum, variant) => sum + Number(variant.weight || 0),
      0
    );

    if (totalWeight !== 100) {
      return `Variant weights must total 100%. Current total: ${totalWeight}%.`;
    }

    return null;
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const experimentKey = form.experimentKey.trim();

      const payload = {
        variants: form.variants.map((variant) => ({
          key: variant.key.trim(),
          weight: Number(variant.weight),
        })),
        isActive: form.isActive,
      };

      const url = `/api/v1/experiments/${encodeURIComponent(
        experimentKey
      )}`;

      let response;

      if (isEdit) {
        response = await axiosInstance.put(url, payload);
      } else {
        response = await axiosInstance.post(url, payload);
      }

      setSuccess(
        response?.data?.message ||
          `Experiment ${isEdit ? "updated" : "created"} successfully.`
      );

      onSuccess(response?.data);

      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      console.error("Experiment save error:", err);

      setError(
        err?.response?.data?.message ||
          `Unable to ${isEdit ? "update" : "create"} experiment.`
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Weight total
  // --------------------------------------------------
  const totalWeight = form.variants.reduce(
    (sum, variant) => sum + Number(variant.weight || 0),
    0
  );

  const weightValid = totalWeight === 100;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{
        background: colors.overlay,
        backdropFilter: "blur(5px)",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          boxShadow: "0 25px 80px rgba(0,0,0,.55)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ============================================
            HEADER
        ============================================ */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-5"
          style={{
            background: colors.cardBg,
            borderBottom: `1px solid ${colors.cardBorder}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl"
              style={{
                background: colors.hover,
                color: colors.accent,
                border: `1px solid ${colors.accentDark}`,
              }}
            >
              <FlaskConical size={21} />
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: colors.textPrimary }}
              >
                {isEdit ? "Edit Experiment" : "Create Experiment"}
              </h2>

              <p
                className="text-xs mt-1"
                style={{ color: colors.textMuted }}
              >
                {isEdit
                  ? "Update experiment variants and active state"
                  : "Configure variants and traffic distribution"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
            style={{
              color: colors.textSecondary,
              background: "transparent",
              border: `1px solid ${colors.cardBorder}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.hover;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = colors.textSecondary;
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ============================================
            FORM
        ============================================ */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error */}
          {error && (
            <div
              className="mb-5 rounded-xl px-4 py-3 text-sm"
              style={{
                color: colors.danger,
                background: "rgba(224,82,82,.10)",
                border: `1px solid rgba(224,82,82,.35)`,
              }}
            >
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              className="mb-5 rounded-xl px-4 py-3 text-sm"
              style={{
                color: colors.success,
                background: "rgba(61,190,108,.10)",
                border: `1px solid rgba(61,190,108,.35)`,
              }}
            >
              {success}
            </div>
          )}

          {/* ==========================================
              EXPERIMENT KEY
          ========================================== */}
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: colors.textPrimary }}
            >
              Experiment Key
              <span style={{ color: colors.danger }}> *</span>
            </label>

            <input
              type="text"
              value={form.experimentKey}
              onChange={handleExperimentKeyChange}
              placeholder="e.g. testing"
              disabled={isEdit || loading}
              className="w-full rounded-xl px-4 py-3 outline-none transition-all"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
                color: colors.textPrimary,
                opacity: isEdit ? 0.65 : 1,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.inputFocus;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.hover}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.inputBorder;
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            {isEdit && (
              <p
                className="text-xs mt-2"
                style={{ color: colors.textMuted }}
              >
                Experiment key cannot be changed while editing.
              </p>
            )}
          </div>

          {/* ==========================================
              VARIANTS HEADER
          ========================================== */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <label
                className="block text-sm font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Variants
                <span style={{ color: colors.danger }}> *</span>
              </label>

              <p
                className="text-xs mt-1"
                style={{ color: colors.textMuted }}
              >
                Define variants and their traffic weights.
              </p>
            </div>

            <button
              type="button"
              onClick={addVariant}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                color: colors.accent,
                background: colors.hover,
                border: `1px solid ${colors.accentDark}`,
              }}
            >
              <Plus size={16} />
              Add Variant
            </button>
          </div>

          {/* ==========================================
              VARIANTS
          ========================================== */}
          <div className="space-y-3">
            {form.variants.map((variant, index) => (
              <div
                key={index}
                className="flex items-end gap-3 p-4 rounded-xl"
                style={{
                  background: colors.inputBg,
                  border: `1px solid ${colors.inputBorder}`,
                }}
              >
                {/* Variant Key */}
                <div className="flex-1">
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Variant Key
                  </label>

                  <input
                    type="text"
                    value={variant.key}
                    onChange={(e) =>
                      handleVariantKeyChange(index, e.target.value)
                    }
                    placeholder="control"
                    disabled={loading}
                    className="w-full rounded-lg px-3 py-2.5 outline-none"
                    style={{
                      background: colors.cardBg,
                      border: `1px solid ${colors.inputBorder}`,
                      color: colors.textPrimary,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        colors.inputFocus;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        colors.inputBorder;
                    }}
                  />
                </div>

                {/* Weight */}
                <div className="w-32">
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Weight (%)
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={variant.weight}
                      onChange={(e) =>
                        handleVariantWeightChange(
                          index,
                          e.target.value
                        )
                      }
                      disabled={loading}
                      className="w-full rounded-lg px-3 py-2.5 pr-8 outline-none"
                      style={{
                        background: colors.cardBg,
                        border: `1px solid ${colors.inputBorder}`,
                        color: colors.textPrimary,
                      }}
                    />

                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                      style={{ color: colors.textMuted }}
                    >
                      %
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  disabled={form.variants.length === 1 || loading}
                  className="flex items-center justify-center w-10 h-10 rounded-lg transition-all"
                  style={{
                    color:
                      form.variants.length === 1
                        ? colors.textMuted
                        : colors.danger,
                    background:
                      form.variants.length === 1
                        ? "transparent"
                        : "rgba(224,82,82,.10)",
                    border: `1px solid ${
                      form.variants.length === 1
                        ? colors.inputBorder
                        : "rgba(224,82,82,.35)"
                    }`,
                    cursor:
                      form.variants.length === 1
                        ? "not-allowed"
                        : "pointer",
                  }}
                  title={
                    form.variants.length === 1
                      ? "At least one variant is required"
                      : "Remove variant"
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* ==========================================
              WEIGHT SUMMARY
          ========================================== */}
          <div
            className="mt-4 flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              background: weightValid
                ? "rgba(61,190,108,.08)"
                : "rgba(224,184,78,.08)",
              border: `1px solid ${
                weightValid
                  ? "rgba(61,190,108,.3)"
                  : "rgba(224,184,78,.3)"
              }`,
            }}
          >
            <span
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              Total traffic
            </span>

            <span
              className="font-semibold"
              style={{
                color: weightValid
                  ? colors.success
                  : colors.warning,
              }}
            >
              {totalWeight}%
              {!weightValid && " / 100%"}
            </span>
          </div>

          {/* ==========================================
              ACTIVE TOGGLE
          ========================================== */}
          <div
            className="mt-6 flex items-center justify-between rounded-xl p-4"
            style={{
              background: colors.inputBg,
              border: `1px solid ${colors.inputBorder}`,
            }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Experiment Status
              </p>

              <p
                className="text-xs mt-1"
                style={{ color: colors.textMuted }}
              >
                {form.isActive
                  ? "This experiment is currently active."
                  : "This experiment is currently inactive."}
              </p>
            </div>

            {/* Toggle */}
            <button
              type="button"
              onClick={toggleActive}
              disabled={loading}
              className="relative w-12 h-6 rounded-full transition-all"
              style={{
                background: form.isActive
                  ? colors.accent
                  : colors.inputBorder,
              }}
            >
              <span
                className="absolute top-1 w-4 h-4 rounded-full transition-all"
                style={{
                  left: form.isActive ? "28px" : "4px",
                  background: form.isActive
                    ? colors.buttonText
                    : colors.textMuted,
                }}
              />
            </button>
          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}
          <div
            className="flex justify-end gap-3 mt-7 pt-5"
            style={{
              borderTop: `1px solid ${colors.inputBorder}`,
            }}
          >
            <Button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                background: "transparent",
                color: colors.textSecondary,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading || !weightValid}
              style={{
                background: colors.gradientButton,
                color: colors.buttonText,
                minWidth: 150,
                opacity: loading || !weightValid ? 0.6 : 1,
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Save size={16} />

                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Experiment"
                  : "Create Experiment"}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperimentModal;
