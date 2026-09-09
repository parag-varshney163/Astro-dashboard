import { RefreshCw, Search, CreditCard, CheckCircle, Clock, XCircle, AlertTriangle, RotateCcw, } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const CashfreeStats = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [stats, setStats] = useState(null);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    amounts: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Table filters
  const [tableSearch, setTableSearch] = useState("");
  const [amountFilter, setAmountFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");

  // =========================================================
  // FETCH API
  // =========================================================

  const fetchStats = async (filterValues = filters) => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (filterValues.startDate) {
        params.startDate = filterValues.startDate;
      }

      if (filterValues.endDate) {
        params.endDate = filterValues.endDate;
      }

      if (filterValues.amounts) {
        params.amounts = filterValues.amounts;
      }

      const response = await axiosInstance.get(
        "/api/v1/cashfree/admin/stats",
        {
          params,
        }
      );

      if (response?.data?.success) {
        setStats(response.data.data);
      } else {
        setError(
          response?.data?.message || "Unable to fetch Cashfree statistics"
        );
      }
    } catch (err) {
      console.error("Cashfree stats error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while fetching Cashfree statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial API call
  useEffect(() => {
    fetchStats();
  }, []);

  // =========================================================
  // FILTER HANDLERS
  // =========================================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Reset client-side table filters
    setTableSearch("");
    setAmountFilter("all");
    setReasonFilter("all");

    fetchStats(filters);
  };

  const handleResetFilters = () => {
    const reset = {
      startDate: "",
      endDate: "",
      amounts: "",
    };

    setFilters(reset);

    setTableSearch("");
    setAmountFilter("all");
    setReasonFilter("all");

    fetchStats(reset);
  };

  // =========================================================
  // SUBSCRIPTION COUNTS
  // =========================================================

  const subscriptionCounts = stats?.subscriptionCounts || {};

  const totalMandates = subscriptionCounts?.totalMandates || 0;

  const trialActive = subscriptionCounts?.trialActive || 0;

  const active = subscriptionCounts?.active || 0;

  const failed = subscriptionCounts?.failed || 0;

  // =========================================================
  // FAILED TRANSACTIONS
  // =========================================================

  const failedTransactions = stats?.failedTransactions || {};

  /*
    Convert:

    {
      amount_1: {...},
      amount_599: {...}
    }

    into:

    [
      {
        amount: 1,
        total: 34,
        byReason: [...],
        transactions: [...]
      },
      ...
    ]
  */

  const amountGroups = useMemo(() => {
    return Object.entries(failedTransactions).map(
      ([key, value]) => {
        const amount = Number(
          key.replace("amount_", "")
        );

        return {
          amount,
          total: value?.total || 0,
          byReason: value?.byReason || [],
          transactions: value?.transactions || [],
        };
      }
    );
  }, [failedTransactions]);

  // =========================================================
  // FLATTEN TRANSACTIONS
  // =========================================================

  const allTransactions = useMemo(() => {
    const result = [];

    amountGroups.forEach((group) => {
      group.transactions.forEach((transaction) => {
        result.push({
          ...transaction,

          // Add amount from parent amount group
          amount: group.amount,

          // Normalize reason
          reason:
            transaction.failureReason ||
            transaction.gatewayMessage ||
            "Unknown",
        });
      });
    });

    return result;
  }, [amountGroups]);

  // =========================================================
  // AMOUNT OPTIONS
  // =========================================================

  const amountOptions = useMemo(() => {
    return [...new Set(
      allTransactions.map((item) => item.amount)
    )].sort((a, b) => a - b);
  }, [allTransactions]);

  // =========================================================
  // REASON OPTIONS
  // =========================================================

  const reasonOptions = useMemo(() => {
    return [
      ...new Set(
        allTransactions.map(
          (item) => item.reason || "Unknown"
        )
      ),
    ].sort();
  }, [allTransactions]);

  // =========================================================
  // FILTER TRANSACTIONS
  // =========================================================

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((transaction) => {
      const search = tableSearch.toLowerCase().trim();

      const matchesSearch =
        !search ||
        transaction._id?.toLowerCase().includes(search) ||
        transaction.userId?.toLowerCase().includes(search) ||
        transaction.subscriptionId
          ?.toLowerCase()
          .includes(search) ||
        transaction.cashfreeSubscriptionId
          ?.toLowerCase()
          .includes(search) ||
        transaction.cfSubscriptionId
          ?.toLowerCase()
          .includes(search) ||
        transaction.reason
          ?.toLowerCase()
          .includes(search);

      const matchesAmount =
        amountFilter === "all" ||
        String(transaction.amount) === String(amountFilter);

      const matchesReason =
        reasonFilter === "all" ||
        transaction.reason === reasonFilter;

      return (
        matchesSearch &&
        matchesAmount &&
        matchesReason
      );
    });
  }, [
    allTransactions,
    tableSearch,
    amountFilter,
    reasonFilter,
  ]);

  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  const transactionColumns = [
    {
      key: "amount",
      label: "Amount",
      width: "90px",
      align: "center",

      render: (value) => (
        <span
          className="font-semibold"
          style={{
            color: colors.accentLight,
          }}
        >
          ₹{Number(value || 0).toLocaleString("en-IN")}
        </span>
      ),
    },

    {
      key: "chargeType",
      label: "Charge Type",
      width: "150px",
      align: "center",

      render: (value) => (
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: colors.hover,
            color: colors.accentLight,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          {value || "-"}
        </span>
      ),
    },

    {
      key: "attemptNumber",
      label: "Attempt",
      width: "90px",
      align: "center",

      render: (value) => (
        <span style={{ color: colors.textPrimary }}>
          {value ?? "-"}
        </span>
      ),
    },

    {
      key: "isRetry",
      label: "Retry",
      width: "90px",
      align: "center",

      render: (value) => (
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: value
              ? `${colors.warning}20`
              : `${colors.textMuted}15`,

            color: value
              ? colors.warning
              : colors.textMuted,
          }}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },

    {
      key: "reason",
      label: "Failure Reason",
      width: "2fr",
      align: "left",

      render: (value) => (
        <span
          title={value || "Unknown"}
          style={{
            color:
              value === "Unknown"
                ? colors.textMuted
                : colors.textSecondary,

            whiteSpace: "normal",
            lineHeight: 1.4,
          }}
        >
          {value || "Unknown"}
        </span>
      ),
    },

    {
      key: "cfSubscriptionId",
      label: "CF Subscription",
      width: "150px",
      align: "center",

      render: (value) => (
        <span
          style={{
            color: colors.textSecondary,
            fontSize: 13,
          }}
        >
          {value || "-"}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Created At",
      width: "170px",
      align: "center",

      render: (value) => {
        if (!value) return "-";

        return (
          <span
            style={{
              color: colors.textSecondary,
              fontSize: 13,
            }}
          >
            {new Date(value).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        );
      },
    },
  ];

  // =========================================================
  // STAT CARD
  // =========================================================

  const StatCard = ({
    title,
    value,
    icon: Icon,
    iconColor,
    description,
  }) => {
    return (
      <div
        className="rounded-2xl p-5 transition-all duration-200"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            colors.cardHover;

          e.currentTarget.style.transform =
            "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            colors.gradientCard;

          e.currentTarget.style.transform =
            "translateY(0)";
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="text-sm font-medium"
              style={{
                color: colors.textSecondary,
              }}
            >
              {title}
            </p>

            <h2
              className="text-3xl font-bold mt-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              {Number(value || 0).toLocaleString("en-IN")}
            </h2>

            <p
              className="text-xs mt-2"
              style={{
                color: colors.textMuted,
              }}
            >
              {description}
            </p>
          </div>

          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `${iconColor}20`,
              border: `1px solid ${iconColor}50`,
            }}
          >
            <Icon
              size={21}
              color={iconColor}
            />
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // AMOUNT SUMMARY CARD
  // =========================================================

  const AmountSummaryCard = ({
    amount,
    total,
    byReason,
  }) => {
    return (
      <div
        className="rounded-2xl p-5"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              Failed Amount
            </p>

            <h3
              className="text-2xl font-bold mt-1"
              style={{
                color: colors.accentLight,
              }}
            >
              ₹{amount.toLocaleString("en-IN")}
            </h3>
          </div>

          <div
            className="px-3 py-1.5 rounded-lg text-sm font-semibold"
            style={{
              background: `${colors.danger}15`,
              color: colors.danger,
            }}
          >
            {total} failed
          </div>
        </div>

        <div className="space-y-2">
          {byReason.map((item, index) => (
            <div
              key={`${item.reason}-${index}`}
              className="flex items-start justify-between gap-3 py-2"
              style={{
                borderTop:
                  index > 0
                    ? `1px solid ${colors.inputBorder}`
                    : "none",
              }}
            >
              <span
                className="text-sm"
                style={{
                  color: colors.textSecondary,
                }}
              >
                {item.reason || "Unknown"}
              </span>

              <span
                className="text-sm font-bold shrink-0"
                style={{
                  color: colors.textPrimary,
                }}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Cashfree Statistics
          </h1>

          <p
            className="text-sm mt-1"
            style={{
              color: colors.textSecondary,
            }}
          >
            Subscription and failed transaction overview
          </p>

          {stats?.dateRange && (
            <p
              className="text-xs mt-2"
              style={{
                color: colors.textMuted,
              }}
            >
              Showing data from{" "}
              <strong>
                {stats.dateRange.startDate}
              </strong>{" "}
              to{" "}
              <strong>
                {stats.dateRange.endDate}
              </strong>
            </p>
          )}
        </div>

        <button
          onClick={() => fetchStats()}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold"
          style={{
            background: colors.gradientButton,
            color: colors.buttonText,
            opacity: loading ? 0.6 : 1,
          }}
        >
          <RefreshCw
            size={17}
            className={
              loading ? "animate-spin" : ""
            }
          />

          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <div
        className="rounded-2xl p-5 mb-6"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Search
            size={18}
            color={colors.accent}
          />

          <h2
            className="font-semibold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* START DATE */}

          <div>
            <label
              className="block text-sm mb-2 font-medium"
              style={{
                color: colors.textSecondary,
              }}
            >
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
                color: colors.textPrimary,
              }}
            />
          </div>

          {/* END DATE */}

          <div>
            <label
              className="block text-sm mb-2 font-medium"
              style={{
                color: colors.textSecondary,
              }}
            >
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
                color: colors.textPrimary,
              }}
            />
          </div>

          {/* AMOUNTS */}

          <div>
            <label
              className="block text-sm mb-2 font-medium"
              style={{
                color: colors.textSecondary,
              }}
            >
              Amounts
            </label>

            <input
              type="text"
              name="amounts"
              value={filters.amounts}
              onChange={handleFilterChange}
              placeholder="e.g. 1,599"
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
                color: colors.textPrimary,
              }}
            />

            <p
              className="text-xs mt-1"
              style={{
                color: colors.textMuted,
              }}
            >
              Comma-separated amounts
            </p>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-3 mt-5">
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold"
            style={{
              background: colors.gradientButton,
              color: colors.buttonText,
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Search size={16} />

            Apply Filters
          </button>

          <button
            onClick={handleResetFilters}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold"
            style={{
              background: colors.cardBg,
              color: colors.textSecondary,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            <RotateCcw size={16} />

            Reset
          </button>
        </div>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          className="flex items-center gap-3 rounded-xl p-4 mb-6"
          style={{
            background: `${colors.danger}15`,
            border: `1px solid ${colors.danger}50`,
            color: colors.danger,
          }}
        >
          <AlertTriangle size={20} />

          <span>{error}</span>
        </div>
      )}

      {/* =====================================================
          SUBSCRIPTION STATS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Mandates (Attempted)"
          value={totalMandates}
          icon={CreditCard}
          iconColor={colors.accent}
          description="Total subscription mandates"
        />

        <StatCard
          title="Trial Active"
          value={trialActive}
          icon={Clock}
          iconColor={colors.warning}
          description="Currently active trials"
        />

        <StatCard
          title="Active"
          value={active}
          icon={CheckCircle}
          iconColor={colors.success}
          description="Active subscriptions"
        />

        <StatCard
          title="Failed"
          value={failed}
          icon={XCircle}
          iconColor={colors.danger}
          description="Failed subscriptions"
        />
      </div>

      {/* =====================================================
          FAILED AMOUNT SUMMARY
      ====================================================== */}

      {amountGroups.length > 0 && (
        <div className="mt-8">
          <div className="mb-4">
            <h2
              className="text-xl font-bold"
              style={{
                color: colors.textPrimary,
              }}
            >
              Failed Transactions
            </h2>

            <p
              className="text-sm mt-1"
              style={{
                color: colors.textMuted,
              }}
            >
              Failed transactions grouped by amount and reason
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {amountGroups.map((group) => (
              <AmountSummaryCard
                key={group.amount}
                amount={group.amount}
                total={group.total}
                byReason={group.byReason}
              />
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          TRANSACTION FILTERS
      ====================================================== */}

      {/* <div
        className="rounded-2xl p-5 mt-8"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Search
            size={18}
            color={colors.accent}
          />

          <h2
            className="font-semibold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Transaction Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          

          <div>
            <label
              className="block text-sm mb-2"
              style={{
                color: colors.textSecondary,
              }}
            >
              Search
            </label>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                color={colors.textMuted}
              />

              <input
                type="text"
                value={tableSearch}
                onChange={(e) =>
                  setTableSearch(e.target.value)
                }
                placeholder="Search ID, subscription, reason..."
                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                style={{
                  background: colors.inputBg,
                  border: `1px solid ${colors.inputBorder}`,
                  color: colors.textPrimary,
                }}
              />
            </div>
          </div>

        

          <div>
            <label
              className="block text-sm mb-2"
              style={{
                color: colors.textSecondary,
              }}
            >
              Amount
            </label>

            <select
              value={amountFilter}
              onChange={(e) =>
                setAmountFilter(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
                color: colors.textPrimary,
              }}
            >
              <option value="all">
                All Amounts
              </option>

              {amountOptions.map((amount) => (
                <option
                  key={amount}
                  value={amount}
                >
                  ₹{amount}
                </option>
              ))}
            </select>
          </div>

          

          <div>
            <label
              className="block text-sm mb-2"
              style={{
                color: colors.textSecondary,
              }}
            >
              Failure Reason
            </label>

            <select
              value={reasonFilter}
              onChange={(e) =>
                setReasonFilter(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{
                background: colors.inputBg,
                border: `1px solid ${colors.inputBorder}`,
                color: colors.textPrimary,
              }}
            >
              <option value="all">
                All Reasons
              </option>

              {reasonOptions.map((reason) => (
                <option
                  key={reason}
                  value={reason}
                >
                  {reason}
                </option>
              ))}
            </select>
          </div>
        </div>

        

        <div className="mt-4 flex items-center justify-between">
          <span
            className="text-sm"
            style={{
              color: colors.textMuted,
            }}
          >
            Showing{" "}
            <strong
              style={{
                color: colors.textPrimary,
              }}
            >
              {filteredTransactions.length}
            </strong>{" "}
            of{" "}
            <strong
              style={{
                color: colors.textPrimary,
              }}
            >
              {allTransactions.length}
            </strong>{" "}
            transactions
          </span>

          {(tableSearch ||
            amountFilter !== "all" ||
            reasonFilter !== "all") && (
            <button
              onClick={() => {
                setTableSearch("");
                setAmountFilter("all");
                setReasonFilter("all");
              }}
              className="text-sm font-medium"
              style={{
                color: colors.accentLight,
              }}
            >
              Clear table filters
            </button>
          )}
        </div>
      </div> */}

      {/* =====================================================
          TRANSACTION TABLE
      ====================================================== */}

      {/* <DataTable
        columns={transactionColumns}
        data={filteredTransactions}
        loading={loading}
        error={null}
        paginationMode="client"
      /> */}
    </div>
  );
};

export default CashfreeStats;
