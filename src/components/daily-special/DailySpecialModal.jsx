import { X, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const DailySpecialModal = ({
  isOpen,
  onClose,
  onSuccess,
  editData = null,
}) => {
  const isEdit = Boolean(editData);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    ctaText: "",
    recurrence: "date",
    date: "",
    dayOfWeek: "",
  });

  // Selected image File
  const [image, setImage] = useState(null);

  // Preview URL
  const [imagePreview, setImagePreview] = useState("");

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (editData) {
      setFormData({
        title: editData.title || "",
        subtitle: editData.subtitle || "",
        ctaText: editData.ctaText || "",
        recurrence: editData.recurrence || "date",
        date: editData.date
          ? new Date(editData.date).toISOString().split("T")[0]
          : "",
        dayOfWeek:
          editData.dayOfWeek !== undefined &&
          editData.dayOfWeek !== null
            ? String(editData.dayOfWeek)
            : "",
      });

      // Existing image is only for preview.
      // New image will be stored in `image`.
      setImage(null);
      setImagePreview(editData.imageUrl || "");
    } else {
      setFormData({
        title: "",
        subtitle: "",
        ctaText: "",
        recurrence: "date",
        date: "",
        dayOfWeek: "",
      });

      setImage(null);
      setImagePreview("");
    }

    setErrors({});
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  const handleRecurrenceChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      recurrence: value,
      date: value === "date" ? prev.date : "",
      dayOfWeek: value === "weekday" ? prev.dayOfWeek : "",
    }));

    setErrors((prev) => ({
      ...prev,
      recurrence: "",
      date: "",
      dayOfWeek: "",
      submit: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log("FILE SELECTED:", file);
    console.log("FILE NAME:", file.name);
    console.log("FILE SIZE:", file.size);
    console.log("FILE TYPE:", file.type);

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file.",
      }));
      return;
    }

    // Store actual File object
    setImage(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setErrors((prev) => ({
      ...prev,
      image: "",
      submit: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = "Subtitle is required.";
    }

    if (!formData.recurrence) {
      newErrors.recurrence = "Recurrence is required.";
    }

    if (formData.recurrence === "date" && !formData.date) {
      newErrors.date = "Date is required.";
    }

    if (
      formData.recurrence === "weekday" &&
      formData.dayOfWeek === ""
    ) {
      newErrors.dayOfWeek = "Day of week is required.";
    }

    // Image is required only while creating
    if (!isEdit && !image) {
      newErrors.image = "Banner image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);

      setErrors((prev) => ({
        ...prev,
        submit: "",
      }));

      const payload = new FormData();

      payload.append("title", formData.title.trim());
      payload.append("subtitle", formData.subtitle.trim());

      if (formData.ctaText.trim()) {
        payload.append("ctaText", formData.ctaText.trim());
      }

      payload.append("recurrence", formData.recurrence);

      if (formData.recurrence === "date") {
        payload.append("date", formData.date);
      }

      if (formData.recurrence === "weekday") {
        payload.append("dayOfWeek", String(formData.dayOfWeek));
      }

      // Append actual File object
      if (image instanceof File) {
        payload.append("image", image);
      }

      // Debug
      console.log("Selected image:", image);

      for (const [key, value] of payload.entries()) {
        console.log(
          "FormData:",
          key,
          value instanceof File
            ? {
                name: value.name,
                type: value.type,
                size: value.size,
              }
            : value
        );
      }

      let response;

      const requestConfig = {
        transformRequest: [
          (data, headers) => {
            // Remove axiosInstance's default application/json
            // so browser/Axios can create the multipart boundary.
            delete headers["Content-Type"];
            delete headers["content-type"];

            return data;
          },
        ],
      };

      if (isEdit) {
        response = await axiosInstance.put(
          `/api/v1/daily-special/${editData._id}`,
          payload,
          requestConfig
        );
      } else {
        response = await axiosInstance.post(
          "/api/v1/daily-special",
          payload,
          requestConfig
        );
      }

      console.log("Daily Special response:", response.data);

      if (response.data?.success) {
        await onSuccess?.(response.data);
        onClose();
      } else {
        setErrors({
          submit:
            response.data?.message ||
            `Failed to ${
              isEdit ? "update" : "create"
            } daily special.`,
        });
      }
    } catch (err) {
      console.error(
        `${isEdit ? "Update" : "Create"} daily special error:`,
        err
      );

      setErrors({
        submit:
          err?.response?.data?.message ||
          err?.message ||
          `Failed to ${
            isEdit ? "update" : "create"
          } daily special.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: colors.inputBg,
    border: `1px solid ${
      errors[field] ? colors.danger : colors.inputBorder
    }`,
    color: colors.textPrimary,
    borderRadius: 10,
    padding: "11px 13px",
    outline: "none",
    fontSize: 14,
    transition: "0.2s",
  });

  const labelStyle = {
    display: "block",
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 7,
  };

  const errorStyle = {
    color: colors.danger,
    fontSize: 12,
    marginTop: 5,
  };

  const weekdays = [
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: colors.overlay,
        backdropFilter: "blur(5px)",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !submitting) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          boxShadow: "0 25px 70px rgba(0,0,0,0.45)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{
            background: colors.secondary,
            borderBottom: `1px solid ${colors.cardBorder}`,
          }}
        >
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: colors.textPrimary }}
            >
              {isEdit ? "Edit" : "Add"}{" "}
              <span style={{ color: colors.accent }}>
                Daily Special
              </span>
            </h2>

            <p
              className="text-xs mt-1"
              style={{ color: colors.textMuted }}
            >
              {isEdit
                ? "Update your daily special banner"
                : "Create a new daily special banner"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="flex items-center justify-center rounded-lg transition-all"
            style={{
              width: 36,
              height: 36,
              background: colors.inputBg,
              border: `1px solid ${colors.inputBorder}`,
              color: colors.textSecondary,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className="p-6 space-y-5 overflow-y-auto"
            style={{
              maxHeight: "70vh",
            }}
          >
            {/* Submit Error */}
            {errors.submit && (
              <div
                className="px-4 py-3 rounded-lg text-sm"
                style={{
                  background: `${colors.danger}18`,
                  border: `1px solid ${colors.danger}`,
                  color: colors.danger,
                }}
              >
                {errors.submit}
              </div>
            )}

            {/* Title */}
            <div>
              <label style={labelStyle}>
                Title{" "}
                <span style={{ color: colors.danger }}>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter banner title"
                style={inputStyle("title")}
                disabled={submitting}
              />

              {errors.title && (
                <p style={errorStyle}>{errors.title}</p>
              )}
            </div>

            {/* Subtitle */}
            <div>
              <label style={labelStyle}>
                Subtitle{" "}
                <span style={{ color: colors.danger }}>*</span>
              </label>

              <textarea
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Enter banner subtitle"
                rows={3}
                style={{
                  ...inputStyle("subtitle"),
                  resize: "vertical",
                }}
                disabled={submitting}
              />

              {errors.subtitle && (
                <p style={errorStyle}>{errors.subtitle}</p>
              )}
            </div>

            {/* CTA */}
            <div>
              <label style={labelStyle}>CTA Text</label>

              <input
                type="text"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                placeholder="Example: Explore Now"
                style={inputStyle("ctaText")}
                disabled={submitting}
              />
            </div>

            {/* Recurrence */}
            <div>
              <label style={labelStyle}>
                Recurrence{" "}
                <span style={{ color: colors.danger }}>*</span>
              </label>

              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleRecurrenceChange}
                style={{
                  ...inputStyle("recurrence"),
                  cursor: "pointer",
                }}
                disabled={submitting}
              >
                <option
                  value="date"
                  style={{
                    background: colors.cardBg,
                    color: colors.textPrimary,
                  }}
                >
                  Date
                </option>

                <option
                  value="weekday"
                  style={{
                    background: colors.cardBg,
                    color: colors.textPrimary,
                  }}
                >
                  Weekday
                </option>
              </select>

              {errors.recurrence && (
                <p style={errorStyle}>{errors.recurrence}</p>
              )}
            </div>

            {/* Date */}
            {formData.recurrence === "date" && (
              <div>
                <label style={labelStyle}>
                  Date{" "}
                  <span style={{ color: colors.danger }}>*</span>
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{
                    ...inputStyle("date"),
                    colorScheme: "dark",
                  }}
                  disabled={submitting}
                />

                {errors.date && (
                  <p style={errorStyle}>{errors.date}</p>
                )}
              </div>
            )}

            {/* Weekday */}
            {formData.recurrence === "weekday" && (
              <div>
                <label style={labelStyle}>
                  Day of Week{" "}
                  <span style={{ color: colors.danger }}>*</span>
                </label>

                <select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleChange}
                  style={{
                    ...inputStyle("dayOfWeek"),
                    cursor: "pointer",
                  }}
                  disabled={submitting}
                >
                  <option
                    value=""
                    style={{
                      background: colors.cardBg,
                      color: colors.textMuted,
                    }}
                  >
                    Select day
                  </option>

                  {weekdays.map((day) => (
                    <option
                      key={day.value}
                      value={day.value}
                      style={{
                        background: colors.cardBg,
                        color: colors.textPrimary,
                      }}
                    >
                      {day.label}
                    </option>
                  ))}
                </select>

                <p
                  className="text-xs mt-1"
                  style={{ color: colors.textMuted }}
                >
                  Sunday = 0, Monday = 1 ... Saturday = 6
                </p>

                {errors.dayOfWeek && (
                  <p style={errorStyle}>{errors.dayOfWeek}</p>
                )}
              </div>
            )}

            {/* Image */}
            <div>
              <label style={labelStyle}>
                Banner Image{" "}
                {!isEdit && (
                  <span style={{ color: colors.danger }}>*</span>
                )}
              </label>

              <label
                className="flex items-center justify-center gap-2 rounded-xl cursor-pointer transition-all"
                style={{
                  minHeight: 100,
                  background: colors.inputBg,
                  border: `1px dashed ${
                    errors.image
                      ? colors.danger
                      : colors.inputBorder
                  }`,
                  color: colors.textSecondary,
                }}
              >
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={submitting}
                />

                <div className="flex flex-col items-center gap-2">
                  <Upload size={22} color={colors.accent} />

                  <span className="text-sm">
                    {image
                      ? "Change image"
                      : isEdit
                      ? "Click to replace image"
                      : "Click to upload image"}
                  </span>

                  <span
                    className="text-xs"
                    style={{ color: colors.textMuted }}
                  >
                    PNG, JPG, WEBP
                  </span>
                </div>
              </label>

              {errors.image && (
                <p style={errorStyle}>{errors.image}</p>
              )}

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3 relative">
                  <img
                    src={imagePreview}
                    alt="Banner preview"
                    className="w-full h-40 object-cover rounded-xl"
                    style={{
                      border: `1px solid ${colors.cardBorder}`,
                    }}
                  />

                  <div
                    className="absolute top-2 left-2 px-2 py-1 rounded-md flex items-center gap-1 text-xs"
                    style={{
                      background: colors.overlay,
                      color: colors.textPrimary,
                    }}
                  >
                    <ImageIcon size={13} />
                    Preview
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex justify-end gap-3 px-6 py-4"
            style={{
              borderTop: `1px solid ${colors.cardBorder}`,
              background: colors.secondary,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: "transparent",
                color: colors.textSecondary,
                border: `1px solid ${colors.inputBorder}`,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
              style={{
                background: colors.gradientButton,
                color: colors.buttonText,
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {submitting
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Daily Special"
                : "Create Daily Special"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailySpecialModal;