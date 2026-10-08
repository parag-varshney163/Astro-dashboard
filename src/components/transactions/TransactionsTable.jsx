import React, { useState } from "react";

import agamiastroinstance from "../../api/agamiastroinstance";
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

  // Whether user has performed a search
  const [hasSearched, setHasSearched] = useState(false);

  const limit = 10;

  const fetchTransactions = async (
    pageNumber = 1,
    searchFilters = appliedFilters
  ) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pageNumber,
        limit,
      };

      // Add only the filters which have values
      if (searchFilters.orderId.trim()) {
        params.orderId = searchFilters.orderId.trim();
      }

      if (searchFilters.userId.trim()) {
        params.userId = searchFilters.userId.trim();
      }

      if (searchFilters.phone.trim()) {
        params.phone = searchFilters.phone.trim();
      }

      const response = await agamiastroinstance.get(
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
        setTotalPages(1);

        setError(
          response.data?.message || "Failed to fetch transactions"
        );
      }
    } catch (err) {
      console.error("Transaction fetch error:", err);

      setTransactions([]);
      setTotalPages(1);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    const newFilters = {
      orderId: filters.orderId.trim(),
      userId: filters.userId.trim(),
      phone: filters.phone.trim(),
    };

    // Don't show full transaction data
    // if no filter is entered
    const hasSearchFilter =
      newFilters.orderId ||
      newFilters.userId ||
      newFilters.phone;

    if (!hasSearchFilter) {
      setTransactions([]);
      setTotalPages(1);
      setPage(1);
      setAppliedFilters({
        orderId: "",
        userId: "",
        phone: "",
      });
      setHasSearched(false);
      setError(null);
      return;
    }

    // Apply search
    setPage(1);
    setAppliedFilters(newFilters);
    setHasSearched(true);

    // Fetch immediately with the new filters
    fetchTransactions(1, newFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      orderId: "",
      userId: "",
      phone: "",
    };

    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);

    setTransactions([]);
    setTotalPages(1);
    setPage(1);
    setHasSearched(false);
    setError(null);
  };

  const handlePageChange = (newPage) => {
    if (!hasSearched) return;

    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    fetchTransactions(newPage, appliedFilters);
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
      key: "userId",
      label: "User ID",
      width: "2fr",
      align: "center",
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
              border: `1px solid ${isPaid ? colors.success : colors.danger
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

    // {
    //   key: "invoiceUrl",
    //   label: "Invoice",
    //   width: "0.8fr",
    //   render: (value) => {
    //     if (!value) {
    //       return (
    //         <span
    //           style={{
    //             color: colors.textMuted,
    //             fontSize: "12px",
    //           }}
    //         >
    //           -
    //         </span>
    //       );
    //     }

    //     const handleViewInvoice = async (e) => {
    //       e.stopPropagation();

    //       let newTab = null;

    //       try {
    //         // Open tab immediately to avoid popup blocker
    //         newTab = window.open("", "_blank");

    //         if (!newTab) {
    //           alert("Please allow popups to view the invoice.");
    //           return;
    //         }

    //         const response = await agamiastroinstance.get(value, {
    //           responseType: "blob",
    //           headers: {
    //             Accept: "text/html",
    //           },
    //         });

    //         const blob = new Blob([response.data], {
    //           type: "text/html",
    //         });

    //         const blobUrl = window.URL.createObjectURL(blob);

    //         newTab.location.href = blobUrl;

    //         setTimeout(() => {
    //           window.URL.revokeObjectURL(blobUrl);
    //         }, 60000);
    //       } catch (error) {
    //         console.error("Invoice fetch error:", error);

    //         if (newTab) {
    //           newTab.close();
    //         }

    //         alert(
    //           error?.response?.data?.message ||
    //             "Unable to open invoice"
    //         );
    //       }
    //     };

    //     return (
    //       <button
    //         type="button"
    //         onClick={handleViewInvoice}
    //         style={{
    //           padding: "6px 12px",
    //           borderRadius: "8px",
    //           border: `1px solid ${colors.accent}`,
    //           background: "transparent",
    //           color: colors.accent,
    //           fontSize: "12px",
    //           fontWeight: 600,
    //           cursor: "pointer",
    //         }}
    //       >
    //         View
    //       </button>
    //     );
    //   },
    // },
    {
      key: "invoiceUrl",
      label: "Invoice",
      width: "1fr",
      render: (value) => {
        if (!value) {
          return (
            <span
              style={{
                color: colors.textMuted,
                fontSize: "12px",
              }}
            >
              -
            </span>
          );
        }

        const handleViewInvoice = async (e) => {
          e.stopPropagation();

          try {
            const separator = value.includes("?") ? "&" : "?";
            const url = `${value}${separator}format=json`;

            const response = await agamiastroinstance.get(url);

            const html =
              response.data?.data?.html ||
              response.data?.html ||
              response.data?.data?.invoiceHtml;

            if (!html) {
              throw new Error("Invoice HTML not found.");
            }

            const invoiceWindow = window.open("", "_blank");

            if (!invoiceWindow) {
              alert("Please allow popups.");
              return;
            }

            invoiceWindow.document.open();
            invoiceWindow.document.write(html);
            invoiceWindow.document.close();

          } catch (error) {
            console.error("View Invoice error:", error);

            alert(
              error?.response?.data?.message ||
              error.message ||
              "Failed to open invoice."
            );
          }
        };


        // const handleDownloadInvoice = async (e) => {
        //   e.stopPropagation();

        //   try {
        //     const response = await agamiastroinstance.get(value, {
        //       responseType: "blob",
        //     });

        //     const blob = new Blob([response.data], {
        //       type: "application/pdf",
        //     });

        //     const url = window.URL.createObjectURL(blob);

        //     const link = document.createElement("a");
        //     link.href = url;
        //     link.download = "invoice.pdf";

        //     document.body.appendChild(link);
        //     link.click();

        //     link.remove();
        //     window.URL.revokeObjectURL(url);

        //   } catch (error) {
        //     console.error("Download Invoice error:", error);

        //     alert(
        //       error?.response?.data?.message ||
        //       "Failed to download invoice."
        //     );
        //   }
        // };

        const handleDownloadInvoice = async (e) => {
          e.stopPropagation();

          try {
            const separator = value.includes("?") ? "&" : "?";
            const url = `${value}${separator}format=pdf`;

            const response = await agamiastroinstance.get(url, {
              responseType: "blob",
              headers: {
                Accept: "application/pdf",
              },
            });

            const blob = new Blob([response.data], {
              type: "application/pdf",
            });

            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "invoice.pdf";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(blobUrl);
          } catch (error) {
            console.error("Download Invoice error:", error);

            alert(
              error?.response?.data?.message ||
              "Failed to download invoice."
            );
          }
        };

        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={handleViewInvoice}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: `1px solid ${colors.accent}`,
                background: colors.gradientButton,
                color: colors.buttonText,
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              View
            </button>


            <button
              type="button"
              onClick={handleDownloadInvoice}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: `1px solid ${colors.accent}`,
                background: "transparent",
                color: colors.accent,
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Download
            </button>
          </div>
        );
      },
    }
  ];

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
          Search and view transaction records and orders.
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
            Search Transactions
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
            disabled={loading}
            style={{
              height: "42px",
              padding: "0 20px",
              borderRadius: "10px",
              border: `1px solid ${colors.accent}`,
              background: colors.gradientButton,
              color: colors.buttonText,
              fontSize: "13px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      {hasSearched ? (
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
      ) : (
        <div
          style={{
            width: "100%",
            minHeight: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "14px",
            border: `1px solid ${colors.cardBorder}`,
            background: colors.gradientCard,
            color: colors.textMuted,
            fontSize: "14px",
          }}
        >
          Search by Order ID, User ID, or Phone Number to view transactions.
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;