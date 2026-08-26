import { Calendar, FileText, Image, Tag, X, } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import Button from "../ui/Button";


const initialState = {
  name: "",
  description: "",
  date: "",
  category: "",
  imageUrl: "",
};

const CreateFestivalModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(initialState);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Festival name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!form.date) {
      setError("Festival date is required.");
      return;
    }

    if (!form.category) {
      setError("Category is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.post(
        "/api/v1/festivals",
        {
          name: form.name.trim(),
          description: form.description.trim(),
          date: form.date,
          category: form.category,
          imageUrl: form.imageUrl.trim(),
        }
      );

      if (response.data?.success) {
        setForm(initialState);

        onSuccess?.();
        onClose();
      } else {
        setError(
          response.data?.message ||
            "Failed to create festival."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create festival."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    borderRadius: "12px",
    border: `1px solid ${colors.inputBorder}`,
    background: colors.inputBg,
    color: colors.textPrimary,
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
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
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: "22px",
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
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
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Create Festival
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: colors.textSecondary,
                fontSize: "13px",
              }}
            >
              Add a new festival to the calendar.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${colors.cardBorder}`,
              background: colors.cardBg,
              color: colors.textSecondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div style={{ padding: "24px" }}>
            {/* ERROR */}

            {error && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "rgba(224,82,82,.12)",
                  border: `1px solid ${colors.danger}`,
                  color: colors.danger,
                  fontSize: "13px",
                }}
              >
                {error}
              </div>
            )}

            {/* NAME */}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Festival Name *
              </label>

              <div style={{ position: "relative" }}>
                <Tag
                  size={18}
                  color={colors.textMuted}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 13,
                  }}
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Janmashtami"
                  disabled={loading}
                  style={{
                    ...inputStyle,
                    height: "46px",
                    paddingLeft: "44px",
                    paddingRight: "14px",
                  }}
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Description *
              </label>

              <div style={{ position: "relative" }}>
                <FileText
                  size={18}
                  color={colors.textMuted}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 14,
                  }}
                />

                <textarea
                  rows={4}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter festival description"
                  disabled={loading}
                  style={{
                    ...inputStyle,
                    padding: "12px 14px 12px 44px",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* DATE + CATEGORY */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: colors.textSecondary,
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  Date *
                </label>

                <div style={{ position: "relative" }}>
                  <Calendar
                    size={18}
                    color={colors.textMuted}
                    style={{
                      position: "absolute",
                      left: 14,
                      top: 13,
                    }}
                  />

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      ...inputStyle,
                      height: "46px",
                      paddingLeft: "44px",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: colors.textSecondary,
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  disabled={loading}
                  style={{
                    ...inputStyle,
                    height: "46px",
                    padding: "0 14px",
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="religious">
                    Religious
                  </option>
                  <option value="national">
                    National
                  </option>
                  <option value="cultural">
                    Cultural
                  </option>
                  <option value="international">
                    International
                  </option>
                  <option value="other">
                    Other
                  </option>
                </select>
              </div>
            </div>

            {/* IMAGE URL */}

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.textSecondary,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Image URL
              </label>

              <div style={{ position: "relative" }}>
                <Image
                  size={18}
                  color={colors.textMuted}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 13,
                  }}
                />

                <input
                  type="text"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.png"
                  disabled={loading}
                  style={{
                    ...inputStyle,
                    height: "46px",
                    paddingLeft: "44px",
                    paddingRight: "14px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div
            style={{
              padding: "20px 24px",
              borderTop: `1px solid ${colors.cardBorder}`,
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Festival"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFestivalModal;