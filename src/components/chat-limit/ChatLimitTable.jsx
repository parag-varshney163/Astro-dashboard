import { Edit, X, Save, MessageCircle, Power } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


export default function ChatLimitTable() {
  const [chatLimit, setChatLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    dailyMessageLimit: "",
    isActive: true,
    notes: "",
  });

  // =========================
  // FETCH CHAT LIMIT
  // =========================
  const fetchChatLimit = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get("/api/v1/chat-limits");

      const data = res.data?.data;

      setChatLimit(data || null);
    } catch (err) {
      console.error("Chat limit API error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to fetch chat limit configuration"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChatLimit();
  }, [fetchChatLimit]);

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const handleEdit = (row) => {
    setFormData({
      dailyMessageLimit: row?.dailyMessageLimit ?? "",
      isActive: row?.isActive ?? false,
      notes: row?.notes ?? "",
    });

    setEditModalOpen(true);
  };

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE CHAT LIMIT
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      formData.dailyMessageLimit === "" ||
      Number(formData.dailyMessageLimit) < 0
    ) {
      return;
    }

    setSaving(true);

    try {
      const payload = {
        dailyMessageLimit: Number(formData.dailyMessageLimit),
        isActive: formData.isActive,
        notes: formData.notes,
      };

      const res = await axiosInstance.put(
        "/api/v1/chat-limits",
        payload
      );

      const updatedData = res.data?.data;

      if (updatedData) {
        setChatLimit(updatedData);
      } else {
        await fetchChatLimit();
      }

      setEditModalOpen(false);
    } catch (err) {
      console.error("Update chat limit error:", err);

      alert(
        err?.response?.data?.message ||
          "Failed to update chat limit"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // TABLE COLUMNS
  // =========================
  const columns = [
    {
      key: "key",
      label: "Configuration",
      width: "1.2fr",
      align: "left",
      render: (value) => (
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colors.hover,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.accent,
            }}
          >
            <MessageCircle size={19} />
          </div>

          <div>
            <div
              style={{
                color: colors.textPrimary,
                fontWeight: 600,
              }}
            >
              Global Chat Limit
            </div>

            <div
              style={{
                color: colors.textMuted,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              {value || "global"}
            </div>
          </div>
        </div>
      ),
    },

    {
      key: "dailyMessageLimit",
      label: "Daily Limit",
      width: "1fr",
      render: (value) => (
        <div
          style={{
            color: colors.accentLight,
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {value ?? 0}
        </div>
      ),
    },

    {
      key: "isActive",
      label: "Status",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            background: value
              ? "rgba(61,190,108,0.12)"
              : "rgba(224,82,82,0.12)",
            color: value ? colors.success : colors.danger,
            border: `1px solid ${
              value ? colors.success : colors.danger
            }`,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: value
                ? colors.success
                : colors.danger,
            }}
          />

          {value ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      key: "notes",
      label: "Notes",
      width: "1.5fr",
      align: "center",
      render: (value) => (
        <span
          style={{
            color: colors.textSecondary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 250,
            display: "block",
          }}
          title={value || ""}
        >
          {value || "-"}
        </span>
      ),
    },

    {
      key: "updatedAt",
      label: "Last Updated",
      width: "1.2fr",
      render: (value) => {
        if (!value) return "-";

        return (
          <span style={{ color: colors.textSecondary }}>
            {new Date(value).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "Actions",
      width: "100px",
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(row);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 13px",
            borderRadius: 8,
            border: `1px solid ${colors.cardBorder}`,
            background: colors.hover,
            color: colors.accentLight,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 13,
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.accent;
            e.currentTarget.style.color = colors.buttonText;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.hover;
            e.currentTarget.style.color = colors.accentLight;
          }}
        >
          <Edit size={15} />
          Edit
        </button>
      ),
    },
  ];

  // DataTable expects an array
  const tableData = chatLimit ? [chatLimit] : [];

  return (
    <div
      className="p-6"
      style={{
        minHeight: "100%",
        background: colors.pageBg,
      }}
    >
      {/* ================= HEADER ================= */}
      <div
        className="flex items-center justify-between mb-6"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 16,
          padding: "20px 24px",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colors.hover,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.accent,
            }}
          >
            <MessageCircle size={24} />
          </div>

          <div>
            <h1
              style={{
                color: colors.textPrimary,
                fontSize: 24,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Chat Limit
            </h1>

            <p
              style={{
                color: colors.textSecondary,
                margin: "5px 0 0",
                fontSize: 14,
              }}
            >
              Manage the global daily chat message limit
            </p>
          </div>
        </div>

        {chatLimit && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 10,
              background: chatLimit.isActive
                ? "rgba(61,190,108,0.1)"
                : "rgba(224,82,82,0.1)",
              color: chatLimit.isActive
                ? colors.success
                : colors.danger,
              border: `1px solid ${
                chatLimit.isActive
                  ? colors.success
                  : colors.danger
              }`,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <Power size={15} />

            {chatLimit.isActive
              ? "Limit Active"
              : "Limit Disabled"}
          </div>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <DataTable
        columns={columns}
        data={tableData}
        loading={loading}
        error={error}
      />

      {/* ================= EDIT MODAL ================= */}
      {editModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: colors.overlay,
            backdropFilter: "blur(5px)",
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) {
              setEditModalOpen(false);
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 18,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 22px",
                borderBottom: `1px solid ${colors.cardBorder}`,
                background: colors.secondary,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: colors.textPrimary,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Edit Chat Limit
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: colors.textMuted,
                    fontSize: 13,
                  }}
                >
                  Update global daily chat configuration
                </p>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() => setEditModalOpen(false)}
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
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <form onSubmit={handleUpdate}>
              <div
                style={{
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* DAILY LIMIT */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: colors.textSecondary,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Daily Message Limit
                  </label>

                  <input
                    type="number"
                    name="dailyMessageLimit"
                    min="0"
                    value={formData.dailyMessageLimit}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: `1px solid ${colors.inputBorder}`,
                      background: colors.inputBg,
                      color: colors.textPrimary,
                      outline: "none",
                      fontSize: 14,
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

                {/* ACTIVE TOGGLE */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: `1px solid ${colors.cardBorder}`,
                    background: colors.inputBg,
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: colors.textPrimary,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Enable Chat Limit
                    </div>

                    <div
                      style={{
                        color: colors.textMuted,
                        fontSize: 12,
                        marginTop: 3,
                      }}
                    >
                      Apply the global daily message limit
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: !prev.isActive,
                      }))
                    }
                    style={{
                      width: 48,
                      height: 26,
                      borderRadius: 20,
                      border: "none",
                      padding: 3,
                      background: formData.isActive
                        ? colors.success
                        : colors.cardBorder,
                      cursor: "pointer",
                      transition: "all .2s",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: colors.white,
                        transform: formData.isActive
                          ? "translateX(22px)"
                          : "translateX(0)",
                        transition: "transform .2s",
                      }}
                    />
                  </button>
                </div>

                {/* NOTES */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: colors.textSecondary,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter notes..."
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: `1px solid ${colors.inputBorder}`,
                      background: colors.inputBg,
                      color: colors.textPrimary,
                      outline: "none",
                      fontSize: 14,
                      resize: "vertical",
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
              </div>

              {/* MODAL FOOTER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  padding: "16px 22px",
                  borderTop: `1px solid ${colors.cardBorder}`,
                  background: colors.secondary,
                }}
              >
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setEditModalOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 9,
                    border: `1px solid ${colors.cardBorder}`,
                    background: colors.inputBg,
                    color: colors.textSecondary,
                    cursor: saving
                      ? "not-allowed"
                      : "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 9,
                    border: "none",
                    background: colors.gradientButton,
                    color: colors.buttonText,
                    cursor: saving
                      ? "not-allowed"
                      : "pointer",
                    fontWeight: 700,
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  <Save size={16} />

                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
