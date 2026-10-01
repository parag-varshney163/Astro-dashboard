import { Search, RefreshCw, AlertCircle, CalendarDays, CreditCard, Clock3, RotateCcw, User, FileWarning, CalendarClock, } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const CHARGE_TYPE_OPTIONS = [
    "All",
    "trial_conversion",
    "recurring",
];

const LOOKBACK_OPTIONS = [
    "All",
    "1",
    "3",
    "7",
    "15",
    "30",
    "60",
    "90",
];

const LIMIT_OPTIONS = ["10", "25", "50", "100"];

const JuspayFailedDebitsTable = () => {
    const [failedDebits, setFailedDebits] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const [chargeType, setChargeType] = useState("All");
    const [lookbackDays, setLookbackDays] = useState("All");

    // Search input shown to user
    const [searchInput, setSearchInput] = useState("");

    // Actual search sent to API
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [lastResponseTime, setLastResponseTime] = useState(null);

    // --------------------------------------------------
    // FETCH FAILED DEBITS
    // --------------------------------------------------

    const fetchFailedDebits = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const params = {
                page,
                limit,
            };

            if (chargeType && chargeType !== "All") {
                params.chargeType = chargeType;
            }

            if (search.trim()) {
                params.search = search.trim();
            }

            if (lookbackDays && lookbackDays !== "All") {
                params.lookbackDays = Number(lookbackDays);
            }

            const response = await axiosInstance.get(
                "/api/v1/juspay/admin/mandates/failed-debits",
                {
                    params,
                }
            );

            const result = response?.data;

            if (!result?.success) {
                throw new Error(
                    result?.message || "Failed to fetch failed debits"
                );
            }

            setFailedDebits(result?.data || []);

            setTotalRecords(result?.pagination?.total || 0);
            setTotalPages(result?.pagination?.totalPages || 1);

            setLastResponseTime(result?.responseTimeMs ?? null);
        } catch (err) {
            console.error("Failed to fetch failed debits:", err);

            setFailedDebits([]);

            setTotalRecords(0);
            setTotalPages(1);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch failed debits"
            );
        } finally {
            setLoading(false);
        }
    }, [page, limit, chargeType, search, lookbackDays]);

    useEffect(() => {
        fetchFailedDebits();
    }, [fetchFailedDebits]);

    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchInput(value);
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
    // CHARGE TYPE FILTER
    // --------------------------------------------------

    const handleChargeTypeChange = (value) => {
        setChargeType(value);
        setPage(1);
    };

    // --------------------------------------------------
    // LOOKBACK FILTER
    // --------------------------------------------------

    const handleLookbackChange = (value) => {
        setLookbackDays(value);
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
        fetchFailedDebits();
    };

    // --------------------------------------------------
    // FORMAT TEXT
    // --------------------------------------------------

    const formatText = (value) => {
        if (!value) return "-";

        return String(value)
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // --------------------------------------------------
    // CHARGE TYPE BADGE
    // --------------------------------------------------

    const renderChargeType = (value) => {
        const normalized = String(value || "").toLowerCase();

        let color = colors.accentLight;
        let background = `${colors.accent}18`;
        let border = `${colors.accent}55`;

        if (normalized === "trial_conversion") {
            color = colors.accentLight;
            background = `${colors.accent}18`;
            border = `${colors.accent}55`;
        } else if (normalized === "recurring") {
            color = colors.buttonBg;
            background = `${colors.buttonBg}18`;
            border = `${colors.buttonBg}55`;
        }

        return (
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 10px",
                    borderRadius: 999,
                    background,
                    border: `1px solid ${border}`,
                    color,
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                }}
            >
                <CreditCard size={14} />
                {formatText(value)}
            </div>
        );
    };

    // --------------------------------------------------
    // SUBSCRIPTION STATUS
    // --------------------------------------------------

    const renderSubscriptionStatus = (value) => {
        const normalized = String(value || "").toLowerCase();

        let color = colors.textSecondary;
        let background = `${colors.textSecondary}12`;
        let border = `${colors.textSecondary}30`;

        if (normalized === "trial_active") {
            color = colors.accentLight;
            background = `${colors.accent}18`;
            border = `${colors.accent}55`;
        } else if (normalized === "active") {
            color = colors.success;
            background = `${colors.success}18`;
            border = `${colors.success}55`;
        } else if (
            normalized === "cancelled" ||
            normalized === "failed"
        ) {
            color = colors.danger;
            background = `${colors.danger}18`;
            border = `${colors.danger}55`;
        }

        return (
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 10px",
                    borderRadius: 999,
                    background,
                    border: `1px solid ${border}`,
                    color,
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                }}
            >
                <Clock3 size={14} />
                {formatText(value || "unknown")}
            </div>
        );
    };

    // --------------------------------------------------
    // FAILURE REASON
    // --------------------------------------------------

    const renderFailureReason = (value) => {
        if (!value) {
            return (
                <span
                    style={{
                        color: colors.textMuted,
                        fontSize: 13,
                    }}
                >
                    -
                </span>
            );
        }

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    minWidth: 280,
                    maxWidth: 420,
                    lineHeight: 1.45,
                }}
            >
                <AlertCircle
                    size={15}
                    color={colors.danger}
                    style={{
                        flexShrink: 0,
                        marginTop: 2,
                    }}
                />

                <span
                    style={{
                        fontSize: 12,
                        color: colors.textSecondary,
                        wordBreak: "break-word",
                    }}
                >
                    {value}
                </span>
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
                <span
                    style={{
                        color: colors.textMuted,
                        fontSize: 13,
                    }}
                >
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
                    style={{
                        flexShrink: 0,
                    }}
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
    // ID DISPLAY
    // --------------------------------------------------

    const renderId = (value, icon = null) => {
        if (!value) {
            return (
                <span
                    style={{
                        color: colors.textMuted,
                        fontSize: 13,
                    }}
                >
                    -
                </span>
            );
        }

        const Icon = icon;

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    minWidth: 150,
                }}
            >
                {Icon && (
                    <Icon
                        size={14}
                        color={colors.textMuted}
                        style={{
                            flexShrink: 0,
                        }}
                    />
                )}

                <span
                    title={value}
                    style={{
                        fontSize: 12,
                        color: colors.textSecondary,
                        fontFamily: "monospace",
                        maxWidth: 190,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {value}
                </span>
            </div>
        );
    };

    // --------------------------------------------------
    // AMOUNT
    // --------------------------------------------------

    const renderAmount = (value) => {
        if (value === null || value === undefined) {
            return "-";
        }

        return (
            <span
                style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: colors.textPrimary,
                    whiteSpace: "nowrap",
                }}
            >
                ₹{Number(value).toLocaleString("en-IN")}
            </span>
        );
    };

    // --------------------------------------------------
    // ATTEMPT / RETRY
    // --------------------------------------------------

    const renderAttempt = (value) => {
        return (
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    color: colors.textSecondary,
                    fontSize: 13,
                    fontWeight: 600,
                }}
            >
                <RotateCcw size={14} color={colors.textMuted} />
                {value ?? 0}
            </div>
        );
    };

    // --------------------------------------------------
    // TABLE COLUMNS
    // --------------------------------------------------

    const columns = useMemo(
        () => [
            {
                key: "subscriptionId",
                label: "Subscription ID",
                width: "180px",
                render: (value) => renderId(value, CreditCard),
            },
            {
                key: "mandateId",
                label: "Mandate ID",
                width: "180px",
                render: (value) => renderId(value, CreditCard),
            },

            // {
            //     key: "customerId",
            //     label: "Customer ID",
            //     width: "190px",
            //     render: (value) => renderId(value, User),
            // },

            {
                key: "subscriptionStatus",
                label: "Subscription",
                width: "140px",
                render: (value) => renderSubscriptionStatus(value),
            },

            {
                key: "chargeType",
                label: "Charge Type",
                width: "160px",
                render: (value) => renderChargeType(value),
            },

            {
                key: "amount",
                label: "Amount",
                width: "100px",
                render: (value) => renderAmount(value),
            },

            // {
            //     key: "failureReason",
            //     label: "Failure Reason",
            //     width: "2fr",
            //     render: (value) => renderFailureReason(value),
            // },

            // {
            //     key: "failedAt",
            //     label: "Failed At",
            //     width: "1.2fr",
            //     render: (_, row) =>
            //         renderDate(row.failedAtIST, row.failedAt),
            // },

            // {
            //     key: "attemptNumber",
            //     label: "Attempt",
            //     width: "100px",
            //     render: (value) => renderAttempt(value),
            // },

            // {
            //     key: "retryRound",
            //     label: "Retry Round",
            //     width: "110px",
            //     render: (value) => (
            //         <span
            //             style={{
            //                 fontSize: 13,
            //                 color: colors.textSecondary,
            //                 fontWeight: 600,
            //             }}
            //         >
            //             {value ?? 0}
            //         </span>
            //     ),
            // },

            {
                key: "billingRetryStage",
                label: "Retry Stage",
                width: "110px",
                render: (value) => (
                    <span
                        style={{
                            fontSize: 13,
                            color: colors.accentLight,
                            fontWeight: 700,
                        }}
                    >
                        Stage {value ?? 0}
                    </span>
                ),
            },

            {
                key: "nextRetryAt",
                label: "Next Retry",
                width: "1.2fr",
                render: (_, row) =>
                    renderDate(row.nextRetryAtIST, row.nextRetryAt),
            },
            {
                key: "action",
                label: "Action",
                width: "150px",
                render: (_, row) => {
                    const isRetrying =
                        retryingSubscriptionId === row?.subscriptionId;

                    return (
                        <button
                            type="button"
                            onClick={() => handleScheduleNow(row)}
                            disabled={isRetrying}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 7,
                                padding: "8px 13px",
                                borderRadius: 9,
                                border: `1px solid ${colors.buttonBg}55`,
                                background: `${colors.buttonBg}18`,
                                color: colors.buttonBg,
                                cursor: isRetrying ? "not-allowed" : "pointer",
                                opacity: isRetrying ? 0.6 : 1,
                                fontSize: 12,
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                if (!isRetrying) {
                                    e.currentTarget.style.background =
                                        `${colors.buttonBg}30`;
                                    e.currentTarget.style.borderColor =
                                        colors.buttonBg;
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    `${colors.buttonBg}18`;
                                e.currentTarget.style.borderColor =
                                    `${colors.buttonBg}55`;
                            }}
                        >
                            <CalendarClock
                                size={15}
                                style={{
                                    animation: isRetrying
                                        ? "spin 1s linear infinite"
                                        : "none",
                                }}
                            />

                            {isRetrying ? "Scheduling..." : "Schedule Now"}
                        </button>
                    );
                },
            },
        ],
        []
    );

    // --------------------------------------------------
    // ACTIVE FILTERS
    // --------------------------------------------------

    const hasFilters =
        chargeType !== "All" ||
        lookbackDays !== "All" ||
        search;

    const clearFilters = () => {
        setChargeType("All");
        setLookbackDays("All");
        setSearchInput("");
        setSearch("");
        setPage(1);
    };

    // --------------------------------------------------
    // RETURN
    // --------------------------------------------------

    const [retryingSubscriptionId, setRetryingSubscriptionId] =
        useState(null);

    // const handleScheduleNow = async (row) => {
    //   const subscriptionId = row?.subscriptionId;

    //   if (!subscriptionId) {
    //     toast.error("Subscription ID is missing");
    //     return;
    //   }

    //   const confirmed = window.confirm(
    //     "Are you sure you want to schedule a retry for this failed debit?"
    //   );

    //   if (!confirmed) return;

    //   try {
    //     setRetryingSubscriptionId(subscriptionId);

    //     const response = await axiosInstance.post(
    //       `/api/v1/juspay/admin/mandates/${subscriptionId}/retry`
    //     );

    //     if (!response?.data?.success) {
    //       throw new Error(
    //         response?.data?.message || "Failed to schedule retry"
    //       );
    //     }

    //     toast.success(
    //       response?.data?.message || "Retry scheduled successfully"
    //     );

    //     // Refresh the failed debit list
    //     await fetchFailedDebits();
    //   } catch (error) {
    //     console.error("Schedule retry error:", error);

    //     toast.error(
    //       error?.response?.data?.message ||
    //         error?.message ||
    //         "Failed to schedule retry"
    //     );
    //   } finally {
    //     setRetryingSubscriptionId(null);
    //   }
    // };


    const handleScheduleNow = async (row) => {
        const subscriptionId = row?.subscriptionId;

        if (!subscriptionId) {
            alert("Subscription ID is missing");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to schedule a retry for this failed debit?"
        );

        if (!confirmed) return;

        try {
            setRetryingSubscriptionId(subscriptionId);

            const response = await axiosInstance.post(
                `/api/v1/juspay/admin/mandates/${subscriptionId}/retry`
            );

            const result = response?.data;

            if (result?.success === true) {
                alert(result?.message || "Mandate retry triggered");

                await fetchFailedDebits();
            } else {
                alert(
                    result?.message ||
                    "Failed to trigger mandate retry"
                );
            }
        } catch (error) {
            console.error("Schedule retry error:", error);

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to trigger mandate retry"
            );
        } finally {
            setRetryingSubscriptionId(null);
        }
    };
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
                                background: `${colors.danger}18`,
                                border: `1px solid ${colors.danger}55`,
                            }}
                        >
                            <FileWarning
                                size={22}
                                color={colors.danger}
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
                                Failed Debits
                            </h1>

                            <p
                                style={{
                                    margin: "5px 0 0",
                                    color: colors.textSecondary,
                                    fontSize: 13,
                                }}
                            >
                                Monitor failed Juspay mandate debit attempts and
                                upcoming retries
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
                            flex: "1 1 320px",
                            minWidth: 260,
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

                    {/* CHARGE TYPE */}

                    {/* <FilterDropDown
                        key={`charge-${chargeType}`}
                        options={CHARGE_TYPE_OPTIONS}
                        defaultLabel={
                            chargeType === "All"
                                ? "All Charge Types"
                                : formatText(chargeType)
                        }
                        onSelect={handleChargeTypeChange}
                        width={170}
                    /> */}

                    {/* LOOKBACK */}

                    <FilterDropDown
                        key={`lookback-${lookbackDays}`}
                        options={LOOKBACK_OPTIONS}
                        defaultLabel={
                            lookbackDays === "All"
                                ? "All Time"
                                : `${lookbackDays} days`
                        }
                        onSelect={handleLookbackChange}
                        width={140}
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

                {hasFilters && (
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

                        {chargeType !== "All" && (
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
                                Charge: {formatText(chargeType)}
                            </span>
                        )}

                        {lookbackDays !== "All" && (
                            <span
                                style={{
                                    padding: "5px 9px",
                                    borderRadius: 8,
                                    background: `${colors.buttonBg}18`,
                                    border: `1px solid ${colors.buttonBg}45`,
                                    color: colors.buttonBg,
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                Last {lookbackDays} days
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
                                    maxWidth: 300,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Search: {search}
                            </span>
                        )}

                        <button
                            onClick={clearFilters}
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

            {/* <DataTable
        columns={columns}
        data={failedDebits}
        loading={loading}
        error={error}
        paginationMode="server"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      /> */}
            {/* =========================================
    TABLE
========================================= */}

            <div
                className="failed-debits-table-wrapper"
                style={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: 12,
                }}
            >
                <div
                    style={{
                        minWidth: "1400px",
                    }}
                >
                    <DataTable
                        columns={columns}
                        data={failedDebits}
                        loading={loading}
                        error={error}
                        paginationMode="server"
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </div>

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
                        Showing {failedDebits.length} records on page {page}
                    </span>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                        }}
                    >
                        <span>
                            Total {totalRecords.toLocaleString()} failed debits
                        </span>

                        {lastResponseTime !== null && (
                            <span>
                                API: {lastResponseTime} ms
                            </span>
                        )}
                    </div>
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
            .failed-debits-table-wrapper {
              overflow-x: auto;
            }
          }
        `}
            </style>
        </div>
    );
};

export default JuspayFailedDebitsTable;
