import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";
import FaqModal from "./FaqModal";


const FaqsTable = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);

    const limit = 10;

    /* =========================
       FETCH FAQs
    ========================= */
    const fetchFAQs = async (pageNumber = 1) => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                page: pageNumber,
                limit,
            };

            if (appliedSearch.trim()) {
                params.search = appliedSearch.trim();
            }

            const response = await axiosInstance.get(
                "/api/v1/faqs",
                {
                    params,
                }
            );

            if (response.data?.success) {
                const result = response.data.data;

                setFaqs(result?.faqs || []);
                setTotalPages(result?.pagination?.totalPages || 1);
                setPage(result?.pagination?.page || pageNumber);
            } else {
                setFaqs([]);
                setError(
                    response.data?.message || "Failed to fetch FAQs"
                );
            }
        } catch (err) {
            console.error("FAQ fetch error:", err);

            setFaqs([]);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch FAQs"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFAQs(page);
    }, [page, appliedSearch]);

    /* =========================
       SEARCH
    ========================= */
    const handleSearch = () => {
        setPage(1);
        setAppliedSearch(search);
    };

    const handleClearSearch = () => {
        setSearch("");
        setAppliedSearch("");
        setPage(1);
    };
    const handleCreate = () => {
        setSelectedFaq(null);
        setModalOpen(true);
    };

    const handleEdit = (faq) => {
        setSelectedFaq(faq);
        setModalOpen(true);
    };

    const handleModalSuccess = () => {
        fetchFAQs(page);
    };

    /* =========================
       DELETE FAQ
    ========================= */
    const handleDelete = async (faq) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this FAQ?"
        );

        if (!confirmed) return;

        try {
            await axiosInstance.delete(
                `/api/v1/faqs/${faq._id}`
            );

            fetchFAQs(page);
        } catch (err) {
            console.error("Delete FAQ error:", err);

            alert(
                err?.response?.data?.message ||
                "Failed to delete FAQ"
            );
        }
    };

    /* =========================
       TOGGLE STATUS
    ========================= */
    const handleToggleStatus = async (faq) => {
        try {
            await axiosInstance.patch(
                `/api/v1/faqs/${faq._id}/toggle-status`,
                {
                    isActive: !faq.isActive,
                }
            );

            fetchFAQs(page);
        } catch (err) {
            console.error("Toggle FAQ status error:", err);

            alert(
                err?.response?.data?.message ||
                "Failed to update FAQ status"
            );
        }
    };

    /* =========================
       COLUMNS
    ========================= */
    const columns = [
        {
            key: "question",
            label: "Question",
            width: "1.8fr",
            align: "left",
            render: (value) => (
                <span
                    title={value}
                    style={{
                        color: colors.textPrimary,
                        fontSize: "14px",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                        maxWidth: "100%",
                    }}
                >
                    {value || "-"}
                </span>
            ),
        },

        {
            key: "answer",
            label: "Answer",
            width: "2.2fr",
            align: "left",
            render: (value) => (
                <span
                    title={value}
                    style={{
                        color: colors.textSecondary,
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                        maxWidth: "100%",
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
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: value
                            ? colors.success
                            : colors.danger,
                        background: value
                            ? "rgba(61,190,108,0.12)"
                            : "rgba(224,82,82,0.12)",
                        border: `1px solid ${value ? colors.success : colors.danger
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
            width: "1.3fr",
            render: (value) => {
                if (!value) return "-";

                const date = new Date(value);

                return (
                    <span
                        style={{
                            color: colors.textSecondary,
                            fontSize: "13px",
                        }}
                    >
                        {date.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                );
            },
        },

        {
            key: "actions",
            label: "Actions",
            width: "1.6fr",
            render: (_, row) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
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
                            padding: "6px 11px",
                            borderRadius: "8px",
                            border: `1px solid ${colors.accent}`,
                            background: "transparent",
                            color: colors.accent,
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Edit
                    </button>

                    {/* STATUS */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(row);
                        }}
                        style={{
                            padding: "6px 11px",
                            borderRadius: "8px",
                            border: `1px solid ${row.isActive
                                    ? colors.warning
                                    : colors.success
                                }`,
                            background: "transparent",
                            color: row.isActive
                                ? colors.warning
                                : colors.success,
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        {row.isActive ? "Disable" : "Enable"}
                    </button>

                    {/* DELETE */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row);
                        }}
                        style={{
                            padding: "6px 11px",
                            borderRadius: "8px",
                            border: `1px solid ${colors.danger}`,
                            background: "transparent",
                            color: colors.danger,
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    /* =========================
       PAGINATION
    ========================= */
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;

        setPage(newPage);
    };

    return (
        <div style={{ width: "100%" }}>
            {/* HEADER */}
            {/* <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: colors.textPrimary,
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          FAQs
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: colors.textSecondary,
            fontSize: "14px",
          }}
        >
          Manage frequently asked questions and their
          availability.
        </p>
      </div> */}
            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                }}
            >
                <div>
                    <h2
                        style={{
                            margin: 0,
                            color: colors.textPrimary,
                            fontSize: "22px",
                            fontWeight: 600,
                        }}
                    >
                        FAQs
                    </h2>

                    <p
                        style={{
                            marginTop: "6px",
                            color: colors.textSecondary,
                            fontSize: "14px",
                        }}
                    >
                        Manage frequently asked questions and their availability.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    style={{
                        height: "42px",
                        padding: "0 20px",
                        borderRadius: "10px",
                        border: `1px solid ${colors.accent}`,
                        background: colors.gradientButton,
                        color: colors.buttonText,
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        boxShadow: `0 4px 14px rgba(212,175,55,0.15)`,
                    }}
                >
                    + Create FAQ
                </button>
            </div>

            {/* FILTER */}
            <div
                style={{
                    background: colors.gradientCard,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: "16px",
                    padding: "18px",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-end",
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "7px",
                                color: colors.textSecondary,
                                fontSize: "12px",
                                fontWeight: 600,
                            }}
                        >
                            Search FAQ
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            placeholder="Search by question..."
                            style={{
                                width: "100%",
                                height: "42px",
                                padding: "0 13px",
                                borderRadius: "10px",
                                border: `1px solid ${colors.inputBorder}`,
                                background: colors.inputBg,
                                color: colors.textPrimary,
                                outline: "none",
                                fontSize: "13px",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSearch}
                        style={{
                            height: "42px",
                            padding: "0 20px",
                            borderRadius: "10px",
                            border: `1px solid ${colors.accent}`,
                            background: colors.gradientButton,
                            color: colors.buttonText,
                            fontSize: "13px",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Search
                    </button>

                    {appliedSearch && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
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
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* TABLE */}
            <DataTable
                columns={columns}
                data={faqs}
                loading={loading}
                error={error}
                paginationMode="server"
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <FaqModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedFaq(null);
                }}
                faq={selectedFaq}
                onSuccess={handleModalSuccess}
            />
        </div>
    );
};

export default FaqsTable;
