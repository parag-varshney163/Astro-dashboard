import { Search, RefreshCw, CreditCard, CheckCircle2, XCircle, Clock3, AlertCircle, CalendarDays, } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const STATUS_OPTIONS = [
    "All",
    "active",
    "trial_active",
    "on_hold",
    "cancelled",

];

const LIMIT_OPTIONS = ["10", "25", "50", "100"];


const JuspayMandatesTable = () => {
    const [mandates, setMandates] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const [status, setStatus] = useState("All");

    // Search input shown to user
    const [searchInput, setSearchInput] = useState("");

    // Actual search sent to API
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [lastResponseTime, setLastResponseTime] = useState(null);


    // --------------------------------------------------
    // FETCH MANDATES
    // --------------------------------------------------

    const fetchMandates = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const params = {
                page,
                limit,
            };

            if (status && status !== "All") {
                params.status = status;
            }

            if (search.trim()) {
                params.search = search.trim();
            }

            const response = await axiosInstance.get(
                "/api/v1/juspay/admin/mandates",
                {
                    params,
                }
            );

            const result = response?.data;

            if (!result?.success) {
                throw new Error(
                    result?.message || "Failed to fetch Juspay mandates"
                );
            }

            setMandates(result?.data || []);

            setTotalRecords(result?.pagination?.total || 0);
            setTotalPages(result?.pagination?.totalPages || 1);

            setLastResponseTime(result?.responseTimeMs ?? null);
        } catch (err) {
            console.error("Failed to fetch Juspay mandates:", err);

            setMandates([]);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch Juspay mandates"
            );
        } finally {
            setLoading(false);
        }
    }, [page, limit, status, search]);


    useEffect(() => {
        fetchMandates();
    }, [fetchMandates]);


    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchInput(value);

        // Reset page whenever search changes
        setPage(1);
    };


    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput.trim());
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);


    // --------------------------------------------------
    // STATUS FILTER
    // --------------------------------------------------

    const handleStatusChange = (selectedStatus) => {
        setStatus(selectedStatus);
        setPage(1);
    };


    // --------------------------------------------------
    // LIMIT
    // --------------------------------------------------

    const handleLimitChange = (value) => {
        setLimit(Number(value));
        setPage(1);
    };


    // --------------------------------------------------
    // REFRESH
    // --------------------------------------------------

    const handleRefresh = () => {
        fetchMandates();
    };


    // --------------------------------------------------
    // STATUS CONFIG
    // --------------------------------------------------

    const getStatusConfig = (value) => {
        const normalized = String(value || "").toUpperCase();

        switch (normalized) {
            case "ACTIVE":
                return {
                    color: colors.success,
                    background: `${colors.success}18`,
                    border: `${colors.success}55`,
                    icon: CheckCircle2,
                };

            case "CREATED":
                return {
                    color: colors.accentLight,
                    background: `${colors.accent}18`,
                    border: `${colors.accent}55`,
                    icon: Clock3,
                };

            case "REVOKED":
                return {
                    color: colors.warning,
                    background: `${colors.warning}18`,
                    border: `${colors.warning}55`,
                    icon: XCircle,
                };

            case "FAILURE":
                return {
                    color: colors.danger,
                    background: `${colors.danger}18`,
                    border: `${colors.danger}55`,
                    icon: AlertCircle,
                };

            case "CANCELLED":
                return {
                    color: colors.danger,
                    background: `${colors.danger}18`,
                    border: `${colors.danger}55`,
                    icon: XCircle,
                };

            case "ON_HOLD":
                return {
                    color: colors.warning,
                    background: `${colors.warning}18`,
                    border: `${colors.warning}55`,
                    icon: Clock3,
                };

            default:
                return {
                    color: colors.textSecondary,
                    background: `${colors.textSecondary}12`,
                    border: `${colors.textSecondary}30`,
                    icon: Clock3,
                };
        }
    };
    const getLocalStatusConfig = (value) => {
        const status = String(value || "").toLowerCase();

        switch (status) {
            case "active":
                return {
                    color: colors.success,
                    background: `${colors.success}18`,
                    border: `${colors.success}55`,
                    icon: CheckCircle2,
                };

            case "trial_active":
                return {
                    color: colors.accentLight,
                    background: `${colors.accent}18`,
                    border: `${colors.accent}55`,
                    icon: Clock3,
                };

            case "on_hold":
                return {
                    color: colors.warning,
                    background: `${colors.warning}18`,
                    border: `${colors.warning}55`,
                    icon: AlertCircle,
                };

            case "cancelled":
                return {
                    color: colors.danger,
                    background: `${colors.danger}18`,
                    border: `${colors.danger}55`,
                    icon: XCircle,
                };

            default:
                return {
                    color: colors.textSecondary,
                    background: `${colors.textSecondary}12`,
                    border: `${colors.textSecondary}30`,
                    icon: Clock3,
                };
        }
    };
    const renderLocalStatus = (value) => {
        const config = getLocalStatusConfig(value);
        const Icon = config.icon;

        return (
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 11px",
                    borderRadius: 999,
                    background: config.background,
                    border: `1px solid ${config.border}`,
                    color: config.color,
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                }}
            >
                <Icon size={14} />

                {String(value || "unknown").replaceAll("_", " ")}
            </div>
        );
    };


    // --------------------------------------------------
    // STATUS BADGE
    // --------------------------------------------------

    const renderStatus = (value) => {
        const config = getStatusConfig(value);
        const Icon = config.icon;

        return (
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 11px",
                    borderRadius: 999,
                    background: config.background,
                    border: `1px solid ${config.border}`,
                    color: config.color,
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                }}
            >
                <Icon size={14} />

                {String(value || "UNKNOWN").replaceAll("_", " ")}
            </div>
        );
    };


    // --------------------------------------------------
    // DATE
    // --------------------------------------------------

    const renderDate = (istValue, fallbackValue) => {
        const value = istValue || fallbackValue;

        if (!value) {
            return (
                <span style={{ color: colors.textMuted }}>
                    -
                </span>
            );
        }

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    minWidth: 180,
                }}
            >
                <CalendarDays
                    size={15}
                    color={colors.accent}
                />

                <span
                    style={{
                        fontSize: 13,
                        color: colors.textSecondary,
                        whiteSpace: "nowrap",
                    }}
                >
                    {value}
                </span>
            </div>
        );
    };


    // --------------------------------------------------
    // TABLE COLUMNS
    // --------------------------------------------------

    const columns = useMemo(
        () => [
            {
                key: "mandateId",
                label: "Mandate ID",
                width: "150px",
            },
            {
                key: "status",
                label: "Status",
                width: "100px",
                render: (value) => renderStatus(value),
            },
            {
                key: "localStatus",
                label: "Local Status",
                width: "100px",
                render: (value) => renderLocalStatus(value),
            },

            {
                key: "startDate",
                label: "Start Date",
                width: "1.1fr",
                render: (_, row) =>
                    renderDate(
                        row.startDateIST,
                        row.startDate
                    ),
            },

            {
                key: "activatedAt",
                label: "Activated At",
                width: "1.1fr",
                render: (_, row) =>
                    renderDate(
                        row.activatedAtIST,
                        row.activatedAt
                    ),
            },

            {
                key: "lastUpdated",
                label: "Last Updated",
                width: "1.1fr",
                render: (_, row) =>
                    renderDate(
                        row.lastUpdatedIST,
                        row.lastUpdated
                    ),
            },
            {
                key: "endDate",
                label: "End Date",
                width: "1.1fr",
                render: (_, row) =>
                    renderDate(
                        row.endDateIST,
                        row.endDate
                    ),
            },

            {
                key: "nextExecutionDate",
                label: "Next Execution",
                width: "1.1fr",
                render: (_, row) => {
                    if (
                        !row.nextExecutionDate &&
                        !row.nextExecutionDateIST
                    ) {
                        return (
                            <span
                                style={{
                                    color: colors.textMuted,
                                    fontSize: 13,
                                }}
                            >
                                Not scheduled
                            </span>
                        );
                    }

                    return renderDate(
                        row.nextExecutionDateIST,
                        row.nextExecutionDate
                    );
                },
            },
        ],
        []
    );


    // --------------------------------------------------
    // SUMMARY COUNTS
    // --------------------------------------------------

    const summaryCards = [
        {
            title: "Total Mandates",
            value: totalRecords,
            icon: CreditCard,
        },
        {
            title: "Current Page",
            value: mandates.length,
            icon: CheckCircle2,
        },
        {
            title: "Page",
            value: `${page} / ${totalPages}`,
            icon: CalendarDays,
        },
        {
            title: "API Response",
            value:
                lastResponseTime !== null
                    ? `${lastResponseTime} ms`
                    : "-",
            icon: Clock3,
        },
    ];


    return (
        <div
            style={{
                minHeight: "100%",
                padding: "14px",
                color: colors.textPrimary,
            }}
        >
            {/* =========================================
          HEADER
      ========================================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 13,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `${colors.accent}18`,
                                border: `1px solid ${colors.accent}55`,
                            }}
                        >
                            <CreditCard
                                size={22}
                                color={colors.accent}
                            />
                        </div>

                        <div>
                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: 25,
                                    fontWeight: 800,
                                    color: colors.textPrimary,
                                }}
                            >
                                Juspay Mandates
                            </h1>

                            <p
                                style={{
                                    margin: "5px 0 0",
                                    color: colors.textSecondary,
                                    fontSize: 13,
                                }}
                            >
                                Monitor live Juspay mandate status and execution dates
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={loading}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: `1px solid ${colors.cardBorder}`,
                        background: colors.cardBg,
                        color: colors.textPrimary,
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.6 : 1,
                        fontWeight: 600,
                    }}
                >
                    <RefreshCw
                        size={16}
                        style={{
                            animation: loading
                                ? "spin 1s linear infinite"
                                : "none",
                        }}
                    />

                    Refresh
                </button>
            </div>


            {/* =========================================
          SUMMARY
      ========================================= */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: 14,
                    marginTop: 24,
                }}
            >
                {summaryCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            style={{
                                background: colors.cardBg,
                                border: `1px solid ${colors.cardBorder}`,
                                borderRadius: 16,
                                padding: "18px 20px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    style={{
                                        color: colors.textSecondary,
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                >
                                    {card.title}
                                </span>

                                <Icon
                                    size={18}
                                    color={colors.accent}
                                />
                            </div>

                            <div
                                style={{
                                    marginTop: 10,
                                    fontSize: 22,
                                    fontWeight: 800,
                                    color: colors.textPrimary,
                                }}
                            >
                                {card.value}
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* =========================================
          FILTERS
      ========================================= */}

            <div
                style={{
                    marginTop: 24,
                    padding: 18,
                    background: colors.cardBg,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: 18,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        flexWrap: "wrap",
                    }}
                >
                    {/* SEARCH */}

                    <div
                        style={{
                            position: "relative",
                            flex: "1 1 300px",
                            minWidth: 240,
                        }}
                    >
                        <Search
                            size={18}
                            color={colors.textMuted}
                            style={{
                                position: "absolute",
                                left: 13,
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        />

                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearch}
                            placeholder="Search mandate ID, order ID or customer ID..."
                            style={{
                                width: "100%",
                                height: 42,
                                padding: "0 14px 0 40px",
                                boxSizing: "border-box",
                                borderRadius: 10,
                                border: `1px solid ${colors.inputBorder}`,
                                background: colors.inputBg,
                                color: colors.textPrimary,
                                outline: "none",
                                fontSize: 13,
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


                    {/* STATUS */}

                    <FilterDropDown
                        key={`status-${status}`}
                        options={STATUS_OPTIONS}
                        defaultLabel={status}
                        onSelect={handleStatusChange}
                        width={160}
                    />


                    {/* LIMIT */}

                    <FilterDropDown
                        key={`limit-${limit}`}
                        options={LIMIT_OPTIONS}
                        defaultLabel={`${limit} / page`}
                        onSelect={handleLimitChange}
                        width={130}
                    />
                </div>


                {/* ACTIVE FILTER INFO */}

                {(status !== "All" || search) && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            flexWrap: "wrap",
                            marginTop: 14,
                            paddingTop: 14,
                            borderTop: `1px solid ${colors.cardBorder}`,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 12,
                                color: colors.textMuted,
                            }}
                        >
                            Active filters:
                        </span>

                        {status !== "All" && (
                            <span
                                style={{
                                    padding: "5px 9px",
                                    borderRadius: 8,
                                    background: `${colors.accent}18`,
                                    border: `1px solid ${colors.accent}45`,
                                    color: colors.accentLight,
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                Status: {status}
                            </span>
                        )}

                        {search && (
                            <span
                                style={{
                                    padding: "5px 9px",
                                    borderRadius: 8,
                                    background: `${colors.accent}18`,
                                    border: `1px solid ${colors.accent}45`,
                                    color: colors.accentLight,
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                Search: {search}
                            </span>
                        )}

                        <button
                            onClick={() => {
                                setStatus("All");
                                setSearchInput("");
                                setSearch("");
                                setPage(1);
                            }}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: colors.accentLight,
                                cursor: "pointer",
                                fontSize: 12,
                                fontWeight: 700,
                                marginLeft: 4,
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>


            {/* =========================================
          TABLE
      ========================================= */}

            <DataTable
                columns={columns}
                data={mandates}
                loading={loading}
                error={error}
                paginationMode="server"
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />


            {/* =========================================
          FOOTER INFO
      ========================================= */}

            {!loading && !error && (
                <div
                    style={{
                        marginTop: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                        color: colors.textMuted,
                        fontSize: 12,
                        padding: "0 4px",
                    }}
                >
                    <span>
                        Showing {mandates.length} records on page {page}
                    </span>

                    <span>
                        Total {totalRecords.toLocaleString()} mandates
                    </span>
                </div>
            )}


            <style>
                {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            .mandates-table-wrapper {
              overflow-x: auto;
            }
          }
        `}
            </style>
        </div>
    );
};

export default JuspayMandatesTable;
