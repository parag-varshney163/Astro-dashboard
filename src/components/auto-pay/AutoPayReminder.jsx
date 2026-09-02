import React, { useCallback, useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import FilterDropDown from "../../components/ui/FilterDropDown";
import AutoPayReminderModal from "./AutoPayReminderModal";
import DataTable from "../../components/ui/DataTable";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const AutoPayReminder = () => {
    const [reminders, setReminders] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [activeFilter, setActiveFilter] = useState("All");

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState(null);

    const limit = 20;

    // ==========================================
    // FETCH REMINDERS
    // ==========================================
    const fetchReminders = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = {
                page,
                limit,
            };

            if (activeFilter === "Active") {
                params.isActive = true;
            }

            if (activeFilter === "Inactive") {
                params.isActive = false;
            }

            const response = await axiosInstance.get(
                "/api/v1/auto-pay-reminder",
                {
                    params,
                }
            );

            const responseData = response?.data?.data;

            setReminders(responseData?.data || []);

            setTotalPages(
                responseData?.pagination?.totalPages || 1
            );
        } catch (err) {
            console.error("Failed to fetch AutoPay reminders:", err);

            const message =
                err?.response?.data?.message ||
                "Failed to fetch AutoPay reminders";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [page, activeFilter]);

    useEffect(() => {
        fetchReminders();
    }, [fetchReminders]);
    const handleDelete = async (reminder) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${reminder.displayText}"?`
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            await axiosInstance.delete(
                `/api/v1/auto-pay-reminder/${reminder.id}`
            );

            toast.success("AutoPay reminder deleted successfully");

            // If deleting the last item on a page, go to previous page
            if (reminders.length === 1 && page > 1) {
                setPage((prev) => prev - 1);
            } else {
                fetchReminders();
            }
        } catch (err) {
            console.error("Delete AutoPay reminder error:", err);

            toast.error(
                err?.response?.data?.message ||
                "Failed to delete AutoPay reminder"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FILTER
    // ==========================================
    const handleFilter = (value) => {
        setActiveFilter(value);
        setPage(1);
    };

    // ==========================================
    // CREATE
    // ==========================================
    const handleCreate = () => {
        setSelectedReminder(null);
        setModalOpen(true);
    };

    // ==========================================
    // EDIT
    // ==========================================
    const handleEdit = (reminder) => {
        setSelectedReminder(reminder);
        setModalOpen(true);
    };

    // ==========================================
    // MODAL SUCCESS
    // ==========================================
    const handleModalSuccess = () => {
        setModalOpen(false);
        setSelectedReminder(null);

        fetchReminders();
    };

    // ==========================================
    // TABLE COLUMNS
    // ==========================================
    const columns = [
        {
            key: "amount",
            label: "Amount",
            width: "1fr",
            render: (value, row) => (
                <span
                    style={{
                        color: colors.accentLight,
                        fontWeight: 700,
                    }}
                >
                    {row.currency === "INR" ? "₹" : ""}
                    {Number(value || 0).toLocaleString("en-IN")}
                </span>
            ),
        },

        {
            key: "months",
            label: "Months",
            width: "1fr",
            render: (value) => (
                <span
                    style={{
                        color: colors.textPrimary,
                        fontWeight: 600,
                    }}
                >
                    {value} {value === 1 ? "Month" : "Months"}
                </span>
            ),
        },

        {
            key: "currency",
            label: "Currency",
            width: "1fr",
            render: (value) => (
                <span
                    style={{
                        color: colors.textSecondary,
                    }}
                >
                    {value || "-"}
                </span>
            ),
        },

        {
            key: "displayText",
            label: "Display Text",
            width: "2fr",
            align: "center",
            render: (value) => (
                <span
                    style={{
                        color: colors.textPrimary,
                        fontWeight: 500,
                    }}
                >
                    {value || "-"}
                </span>
            ),
        },

        {
            key: "isActive",
            label: "Status",
            width: "1fr",
            render: (value) => (
                <span
                    style={{
                        padding: "6px 12px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 700,
                        background: value
                            ? "rgba(61,190,108,0.12)"
                            : "rgba(224,82,82,0.12)",
                        color: value
                            ? colors.success
                            : colors.danger,
                        border: `1px solid ${value
                                ? "rgba(61,190,108,0.25)"
                                : "rgba(224,82,82,0.25)"
                            }`,
                    }}
                >
                    {value ? "Active" : "Inactive"}
                </span>
            ),
        },

        {
            key: "createdAt",
            label: "Created At",
            width: "1.5fr",
            render: (value) => (
                <span
                    style={{
                        color: colors.textSecondary,
                        fontSize: 13,
                    }}
                >
                    {value
                        ? new Date(value).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                        : "-"}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Actions",
            width: "1.2fr",
            render: (_, row) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                    }}
                >
                    {/* EDIT */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(row);
                        }}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 9,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: colors.inputBg,
                            color: colors.accentLight,
                            border: `1px solid ${colors.cardBorder}`,
                            cursor: "pointer",
                        }}
                        title="Edit"
                    >
                        <Edit size={16} />
                    </button>

                    {/* DELETE */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row);
                        }}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 9,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(224,82,82,0.08)",
                            color: colors.danger,
                            border: `1px solid rgba(224,82,82,0.25)`,
                            cursor: "pointer",
                        }}
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div
            className="min-h-screen p-6"
            style={{
                background: colors.pageBg,
                color: colors.textPrimary,
            }}
        >
            {/* ==========================================
          HEADER
      ========================================== */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h1
                        className="text-2xl font-bold"
                        style={{
                            color: colors.textPrimary,
                        }}
                    >
                        AutoPay Reminder
                    </h1>

                    <p
                        className="mt-1 text-sm"
                        style={{
                            color: colors.textSecondary,
                        }}
                    >
                        Manage AutoPay reminder configurations
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className="flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
                    style={{
                        background: colors.gradientButton,
                        color: colors.buttonText,
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <Plus size={18} />
                    Add Reminder
                </button>
            </div>

            {/* ==========================================
          FILTERS
      ========================================== */}
            <div
                className="rounded-2xl p-5"
                style={{
                    background: colors.gradientCard,
                    border: `1px solid ${colors.cardBorder}`,
                }}
            >
                <div className="flex flex-wrap items-end gap-4">
                    <div>
                        <label
                            className="block mb-2 text-sm font-semibold"
                            style={{
                                color: colors.textSecondary,
                            }}
                        >
                            Status
                        </label>

                        <FilterDropDown
                            options={[
                                "All",
                                "Active",
                                "Inactive",
                            ]}
                            defaultLabel="All"
                            width={180}
                            onSelect={handleFilter}
                        />
                    </div>
                </div>
            </div>

            {/* ==========================================
          TABLE
      ========================================== */}
            <DataTable
                columns={columns}
                data={reminders}
                loading={loading}
                error={error}
                paginationMode="server"
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {/* ==========================================
          CREATE / EDIT MODAL
      ========================================== */}
            {modalOpen && (
                <AutoPayReminderModal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedReminder(null);
                    }}
                    reminder={selectedReminder}
                    onSuccess={handleModalSuccess}
                />
            )}
        </div>
    );
};

export default AutoPayReminder;
