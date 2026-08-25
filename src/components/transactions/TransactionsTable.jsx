import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    orderId: "",
    userId: "",
    phone: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    orderId: "",
    userId: "",
    phone: "",
  });

  const limit = 10;

  const fetchTransactions = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pageNumber,
        limit,
      };

      // Only send filters that have values
      if (appliedFilters.orderId.trim()) {
        params.orderId = appliedFilters.orderId.trim();
      }

      if (appliedFilters.userId.trim()) {
        params.userId = appliedFilters.userId.trim();
      }

      if (appliedFilters.phone.trim()) {
        params.phone = appliedFilters.phone.trim();
      }

      const response = await axiosInstance.get(
        "/api/v1/dashboard/transactions",
        {
          params,
        }
      );

      if (response.data?.success) {
        const result = response.data.data;

        setTransactions(result?.data || []);
        setTotalPages(result?.pagination?.totalPages || 1);
        setPage(result?.pagination?.page || pageNumber);
      } else {
        setTransactions([]);
        setError(
          response.data?.message || "Failed to fetch transactions"
        );
      }
    } catch (err) {
      console.error("Transaction fetch error:", err);

      setTransactions([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page, appliedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setPage(1);

    setAppliedFilters({
      orderId: filters.orderId,
      userId: filters.userId,
      phone: filters.phone,
    });
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      orderId: "",
      userId: "",
      phone: "",
    };

    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setPage(1);
  };

  const hasFilters =
    filters.orderId.trim() ||
    filters.userId.trim() ||
    filters.phone.trim();

  const inputStyle = {
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
  };

  const columns = [
    {
      key: "orderId",
      label: "Order ID",
      width: "2fr",
      align: "left",
      render: (value) => (
        <span
          title={value}
          style={{
            color: colors.textPrimary,
            fontSize: "13px",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {value || "-"}
        </span>
      ),
    },

    {
      key: "transactionDate",
      label: "Transaction Date",
      width: "1.5fr",
      render: (value) => {
        if (!value) return "-";

        const date = new Date(value);

        return (
          <span style={{ color: colors.textSecondary }}>
            {date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}{" "}
            {date.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },

    {
      key: "transactionStatus",
      label: "Status",
      width: "1fr",
      render: (value) => {
        const isPaid = value?.toLowerCase() === "paid";

        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              color: isPaid ? colors.success : colors.danger,
              background: colors.cardBg,
              border: `1px solid ${
                isPaid ? colors.success : colors.danger
              }`,
            }}
          >
            {value || "-"}
          </span>
        );
      },
    },

    {
      key: "userName",
      label: "User",
      width: "1.2fr",
      align: "left",
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
      key: "phoneNumber",
      label: "Phone",
      width: "1.2fr",
      render: (value) => (
        <span style={{ color: colors.textSecondary }}>
          {value || "-"}
        </span>
      ),
    },

    {
      key: "invoiceUrl",
      label: "Invoice",
      width: "0.8fr",
      render: (value) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            if (value) {
              window.open(value, "_blank", "noopener,noreferrer");
            }
          }}
          disabled={!value}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: `1px solid ${colors.accent}`,
            background: "transparent",
            color: colors.accent,
            fontSize: "12px",
            fontWeight: 600,
            cursor: value ? "pointer" : "not-allowed",
            opacity: value ? 1 : 0.5,
          }}
        >
          View
        </button>
      ),
    },
  ];

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* HEADER */}
      <div
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
          Transactions
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: colors.textSecondary,
            fontSize: "14px",
          }}
        >
          View and filter transaction records and orders.
        </p>
      </div>

      {/* FILTER CARD */}
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
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: colors.textPrimary,
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Filter Transactions
          </h3>

          {hasFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              style={{
                border: "none",
                background: "transparent",
                color: colors.textMuted,
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr) auto",
            gap: "14px",
            alignItems: "end",
          }}
        >
          {/* ORDER ID */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                color: colors.textSecondary,
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Order ID
            </label>

            <input
              type="text"
              name="orderId"
              value={filters.orderId}
              onChange={handleFilterChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyFilters();
                }
              }}
              placeholder="Search by Order ID"
              style={inputStyle}
            />
          </div>

          {/* USER ID */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                color: colors.textSecondary,
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              User ID
            </label>

            <input
              type="text"
              name="userId"
              value={filters.userId}
              onChange={handleFilterChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyFilters();
                }
              }}
              placeholder="Search by User ID"
              style={inputStyle}
            />
          </div>

          {/* PHONE */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                color: colors.textSecondary,
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyFilters();
                }
              }}
              placeholder="Search by phone"
              style={inputStyle}
            />
          </div>

          {/* APPLY */}
          <button
            type="button"
            onClick={handleApplyFilters}
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
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      <DataTable
        columns={columns}
        data={transactions}
        loading={loading}
        error={error}
        paginationMode="server"
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TransactionsTable;