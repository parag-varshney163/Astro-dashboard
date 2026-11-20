import React, { useEffect, useRef, useState } from "react";
// import { Download, Eye, FileDown } from "lucide-react";
// import React, { useState } from "react";
// import InvoiceDetailsModal from "./InvoiceDetailsModal";
// import colors from "../../constants/colors";
// import DataTable from "../ui/DataTable";
// const TransactionsInvoicesTab = ({
//   transactions = [],
//   loading,
//   error,
//   page,
//   totalPages,
//   onPageChange,
// }) => {
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [invoiceData, setInvoiceData] = useState(null);
//   const [invoiceHtml, setInvoiceHtml] = useState("");
//   const [invoiceLoading, setInvoiceLoading] = useState(false);
//   const formatDate = (value) => {
//     if (!value) return "-";
//     return new Date(value).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };
//   // Fetch invoice JSON and HTML for the selected transaction
//   const fetchInvoice = async (transaction) => {
//     if (!transaction?.subscriptionId) {
//       alert("Subscription ID is not available for this transaction.");
//       return null;
//     }
//     if (!transaction?.transactionId) {
//       alert("Transaction ID is not available.");
//       return null;
//     }
//     const params = new URLSearchParams({
//       transactionId: transaction.transactionId,
//       format: "json",
//     });
//     const url =
//       `/api/v1/invoices/subscription/${encodeURIComponent(
//         transaction.subscriptionId
//       )}/download?${params.toString()}`;
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//       credentials: "include",
//     });
//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       throw new Error(
//         errorData?.message || "Unable to fetch invoice details."
//       );
//     }
//     const result = await response.json();
//     const html =
//       result?.data?.html ||
//       result?.html ||
//       result?.data?.invoiceHtml ||
//       result?.invoiceHtml;
//     if (!html) {
//       throw new Error("Invoice HTML was not returned by the server.");
//     }
//     return {
//       result,
//       html,
//     };
//   };
//   // View invoice modal
//   const handleViewInvoice = async (transaction) => {
//     try {
//       setInvoiceLoading(true);
//       setSelectedTransaction(transaction);
//       setInvoiceData(null);
//       setInvoiceHtml("");
//       const invoice = await fetchInvoice(transaction);
//       if (!invoice) {
//         setSelectedTransaction(null);
//         return;
//       }
//       setInvoiceData(invoice.result);
//       setInvoiceHtml(invoice.html);
//     } catch (err) {
//       console.error("Invoice view error:", err);
//       alert(err.message || "Failed to load invoice.");
//       setSelectedTransaction(null);
//     } finally {
//       setInvoiceLoading(false);
//     }
//   };
//   // Download actual HTML returned by API
//   const handleDownloadHtml = () => {
//     if (!invoiceHtml) {
//       alert("Invoice HTML is not available.");
//       return;
//     }
//     const blob = new Blob([invoiceHtml], {
//       type: "text/html;charset=utf-8",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `invoice-${selectedTransaction?.orderId || "receipt"}.html`;
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     URL.revokeObjectURL(url);
//   };
//   // Open invoice HTML in print dialog
//   const handlePrintInvoice = () => {
//     if (!invoiceHtml) {
//       alert("Invoice HTML is not available.");
//       return;
//     }
//     const printWindow = window.open("", "_blank");
//     if (!printWindow) {
//       alert("Please allow popups to print or save the invoice.");
//       return;
//     }
//     printWindow.document.open();
//     printWindow.document.write(invoiceHtml);
//     printWindow.document.close();
//     printWindow.onload = () => {
//       printWindow.focus();
//       printWindow.print();
//     };
//   };
//   const closeInvoice = () => {
//     setSelectedTransaction(null);
//     setInvoiceData(null);
//     setInvoiceHtml("");
//   };
//   // Direct PDF download, using the API's default HTML file download
//   const handleDownloadPdf = async (transaction) => {
//     if (!transaction?.subscriptionId || !transaction?.transactionId) {
//       alert("Subscription ID or transaction ID is missing.");
//       return;
//     }
//     try {
//       const params = new URLSearchParams({
//         transactionId: transaction.transactionId,
//         format: "pdf",
//       });
//       const url =
//         `/api/v1/invoices/subscription/${encodeURIComponent(
//           transaction.subscriptionId
//         )}/download?${params.toString()}`;
//       const response = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(errorData?.message || "Invoice download failed.");
//       }
//       const blob = await response.blob();
//       const blobUrl = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = `invoice-${transaction.orderId || "receipt"}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Invoice download error:", err);
//       alert(err.message || "Failed to download invoice.");
//     }
//   };
//   // CSV export
//   const exportCSV = () => {
//     if (!transactions.length) {
//       alert("No transactions available to export.");
//       return;
//     }
//     const headers = [
//       "Order ID",
//       "Transaction ID",
//       "Transaction Date",
//       "Amount",
//       "Status",
//       "Gateway",
//       "Charge Type",
//       "User ID",
//       "User Name",
//       "Phone Number",
//     ];
//     const escapeCSV = (value) =>
//       `"${String(value ?? "").replace(/"/g, '""')}"`;
//     const rows = transactions.map((item) => [
//       item.orderId,
//       item.transactionId,
//       formatDate(item.transactionDate),
//       item.amount,
//       item.transactionStatus,
//       item.gateway,
//       item.chargeType,
//       item.userId,
//       item.userName,
//       item.phoneNumber,
//     ]);
//     const csv = [headers, ...rows]
//       .map((row) => row.map(escapeCSV).join(","))
//       .join("\n");
//     const blob = new Blob(["\uFEFF" + csv], {
//       type: "text/csv;charset=utf-8;",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "user-transactions.csv";
//     link.click();
//     URL.revokeObjectURL(url);
//   };
//   const columns = [
//     {
//       key: "orderId",
//       label: "Order ID",
//       width: "2fr",
//       render: (value) => (
//         <div style={{width:"100%"}}>
//         <span
//           title={value}
//           style={{
//             color: colors.textPrimary,
//             fontSize: "13px",
//             fontWeight: 500,
//             overflowWrap: "anywhere",
//           }}
//         >
//           {value || "-"}
//         </span>
//         </div>
//       ),
//     },
//     {
//       key: "transactionDate",
//       label: "Transaction Date",
//       width: "1.5fr",
//       render: (value) => (
//         <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
//           {formatDate(value)}
//         </span>
//       ),
//     },
//     {
//       key: "amount",
//       label: "Amount",
//       width: "0.8fr",
//       render: (value) => (
//         <strong style={{ color: colors.textPrimary }}>
//           ₹{Number(value || 0).toLocaleString("en-IN")}
//         </strong>
//       ),
//     },
//     {
//       key: "transactionStatus",
//       label: "Status",
//       width: "0.9fr",
//       render: (value) => {
//         const status = String(value || "").toLowerCase();
//         const isPaid = ["paid", "success", "captured"].includes(status);
//         const isPending = status === "pending";
//         const statusColor = isPaid
//           ? colors.success
//           : isPending
//             ? colors.warning
//             : colors.danger;
//         return (
//           <span
//             style={{
//               display: "inline-flex",
//               padding: "5px 12px",
//               borderRadius: "20px",
//               border: `1px solid ${statusColor}`,
//               color: statusColor,
//               fontSize: "12px",
//               fontWeight: 600,
//             }}
//           >
//             {value || "-"}
//           </span>
//         );
//       },
//     },
//     {
//       key: "gateway",
//       label: "Payment Gateway",
//       width: "1fr",
//       render: (value) => (
//         <span style={{ color: colors.textSecondary }}>
//           {value || "-"}
//         </span>
//       ),
//     },
//     {
//       key: "invoiceUrl",
//       label: "Invoice",
//       width: "1.5fr",
//       render: (_, row) => (
//         <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//           <button
//             disabled={!row.subscriptionId || !row.transactionId}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewInvoice(row);
//             }}
//             style={{
//               padding: "8px 13px",
//               borderRadius: "9px",
//               border: `1px solid ${colors.accent}`,
//               background: colors.gradientButton,
//               color: colors.buttonText,
//               cursor:
//                 row.subscriptionId && row.transactionId
//                   ? "pointer"
//                   : "not-allowed",
//               opacity: row.subscriptionId && row.transactionId ? 1 : 0.5,
//               fontWeight: 700,
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//             }}
//           >
//             <Eye size={14} /> View
//           </button>
//           <button
//             disabled={!row.subscriptionId || !row.transactionId}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleDownloadPdf(row);
//             }}
//             style={{
//               padding: "8px 13px",
//               borderRadius: "9px",
//               border: `1px solid ${colors.accent}`,
//               background: "transparent",
//               color: colors.accent,
//               cursor:
//                 row.subscriptionId && row.transactionId
//                   ? "pointer"
//                   : "not-allowed",
//               opacity: row.subscriptionId && row.transactionId ? 1 : 0.5,
//               fontWeight: 700,
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//             }}
//           >
//             <Download size={14} /> Download
//           </button>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <>
//       <div
//         style={{
//           padding: "22px",
//           borderRadius: "17px",
//           border: `1px solid ${colors.cardBorder}`,
//           background: colors.gradientCard,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: "12px",
//             marginBottom: "22px",
//           }}
//         >
//           <h3
//             style={{
//               color: colors.textPrimary,
//               fontSize: "16px",
//               margin: 0,
//             }}
//           >
//             Transactions & Invoices
//           </h3>
//           <button
//             onClick={exportCSV}
//             disabled={!transactions.length}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               padding: "11px 17px",
//               borderRadius: "10px",
//               border: `1px solid ${colors.accent}`,
//               background: "transparent",
//               color: colors.accent,
//               cursor: transactions.length ? "pointer" : "not-allowed",
//               opacity: transactions.length ? 1 : 0.5,
//               fontWeight: 700,
//             }}
//           >
//             <FileDown size={16} /> Export CSV
//           </button>
//         </div>
//         <DataTable
//           columns={columns}
//           data={transactions}
//           loading={loading}
//           error={error}
//           paginationMode="server"
//           page={page}
//           totalPages={totalPages}
//           onPageChange={onPageChange}
//         />
//       </div>
//       {/* Invoice modal */}
//       {invoiceLoading && selectedTransaction && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 10000,
//             background: "rgba(0,0,0,0.75)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: colors.textPrimary,
//             fontSize: "16px",
//           }}
//         >
//           Loading invoice details...
//         </div>
//       )}
//       <InvoiceDetailsModal
//         open={Boolean(selectedTransaction && invoiceData && !invoiceLoading)}
//         transaction={selectedTransaction}
//         invoiceData={invoiceData}
//         onClose={closeInvoice}
//         onDownloadHtml={handleDownloadHtml}
//         onPrint={handlePrintInvoice}
//         downloading={invoiceLoading}
//       />
//     </>
//   );
// };
// export default TransactionsInvoicesTab;
import { Download, Eye, FileDown } from "lucide-react";

import agamiastroinstance from "../../api/agamiastroinstance";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const PAID_STATUSES = new Set(["paid", "success", "captured"]);

const hasInvoiceSource = (tx) =>
  Boolean(tx?.invoiceUrl || (tx?.subscriptionId && tx?.transactionId));

const getInvoiceUrl = (transaction, format) => {
  if (transaction?.invoiceUrl) {
    const separator = transaction.invoiceUrl.includes("?") ? "&" : "?";
    return `${transaction.invoiceUrl}${separator}format=${encodeURIComponent(
      format
    )}`;
  }

  if (!transaction?.subscriptionId || !transaction?.transactionId) {
    return null;
  }

  const params = new URLSearchParams({
    transactionId: transaction.transactionId,
    format,
  });

  return `/api/v1/invoices/subscription/${encodeURIComponent(
    transaction.subscriptionId
  )}/download?${params.toString()}`;
};

const TransactionsInvoicesTab = ({
  transactions = [],
  loading,
  error,
  page,
  totalPages,
  onPageChange,
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceHtml, setInvoiceHtml] = useState("");
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  const requestSeqRef = useRef(0);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const triggerBlobDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Fetch invoice JSON and HTML for the selected transaction
  const fetchInvoice = async (transaction, signal) => {
    if (!hasInvoiceSource(transaction)) {
      alert("Invoice source, subscription ID, or transaction ID is missing.");
      return null;
    }

    const url = getInvoiceUrl(transaction, "json");

    const response = await agamiastroinstance.get(url, {
      headers: {
        Accept: "application/json",
      },
      signal,
    });

    const result = response.data;
    const html =
      result?.data?.html ||
      result?.html ||
      result?.data?.invoiceHtml ||
      result?.invoiceHtml;

    if (!html) {
      throw new Error("Invoice HTML was not returned by the server.");
    }

    return {
      result,
      html,
    };
  };

  // View invoice modal
  const handleViewInvoice = async (transaction) => {
    if (!hasInvoiceSource(transaction)) return;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const seq = ++requestSeqRef.current;

    try {
      setInvoiceLoading(true);
      setSelectedTransaction(transaction);
      setInvoiceData(null);
      setInvoiceHtml("");

      const invoice = await fetchInvoice(transaction, controller.signal);

      if (seq !== requestSeqRef.current) return;

      if (!invoice) {
        setSelectedTransaction(null);
        return;
      }

      setInvoiceData(invoice.result);
      setInvoiceHtml(invoice.html);
    } catch (err) {
      if (err?.name === "CanceledError" || err?.name === "AbortError" || seq !== requestSeqRef.current) {
        return;
      }

      console.error("Invoice view error:", err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load invoice."
      );
      setSelectedTransaction(null);
    } finally {
      if (seq === requestSeqRef.current) {
        setInvoiceLoading(false);
      }
    }
  };

  // Download actual HTML returned by API
  const handleDownloadHtml = () => {
    if (!invoiceHtml) {
      alert("Invoice HTML is not available.");
      return;
    }

    const blob = new Blob([invoiceHtml], {
      type: "text/html;charset=utf-8",
    });

    triggerBlobDownload(
      blob,
      `invoice-${selectedTransaction?.orderId || "receipt"}.html`
    );
  };

  // Open invoice HTML in print dialog
  const handlePrintInvoice = () => {
    if (!invoiceHtml) {
      alert("Invoice HTML is not available.");
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow popups to print or save the invoice.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();

    const triggerPrint = () => {
      printWindow.focus();
      printWindow.print();
    };

    if (printWindow.document.readyState === "complete") {
      setTimeout(triggerPrint, 100);
    } else {
      printWindow.onload = () => setTimeout(triggerPrint, 100);
    }
  };

  const closeInvoice = () => {
    abortControllerRef.current?.abort();
    requestSeqRef.current += 1;
    setInvoiceLoading(false);
    setSelectedTransaction(null);
    setInvoiceData(null);
    setInvoiceHtml("");
  };

  // Direct PDF download
  const handleDownloadPdf = async (transaction) => {
    if (!hasInvoiceSource(transaction)) {
      alert("Invoice source, subscription ID, or transaction ID is missing.");
      return;
    }

    const rowKey = transaction.transactionId || transaction.orderId;
    if (downloadingId === rowKey) return;

    try {
      setDownloadingId(rowKey);
      const url = getInvoiceUrl(transaction, "pdf");

      const response = await agamiastroinstance.get(url, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      });

      const contentType = response.headers?.["content-type"] || "";
      if (contentType.includes("application/json")) {
        const text = await response.data.text();
        const parsed = JSON.parse(text);
        throw new Error(parsed?.message || "Unexpected JSON response for PDF.");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      triggerBlobDownload(
        blob,
        `invoice-${transaction.orderId || "receipt"}.pdf`
      );
    } catch (err) {
      console.error("Invoice download error:", err);

      if (err?.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const parsed = JSON.parse(text);
          alert(parsed?.message || "Failed to download invoice.");
          return;
        } catch {
          // Fall back to standard error message
        }
      }

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to download invoice."
      );
    } finally {
      setDownloadingId(null);
    }
  };

  // CSV export
  const exportCSV = () => {
    if (!transactions.length) {
      alert("No transactions available to export.");
      return;
    }

    const headers = [
      "Order ID",
      "Transaction ID",
      "Transaction Date",
      "Amount",
      "Status",
      "Gateway",
      "Charge Type",
      "User ID",
      "User Name",
      "Phone Number",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = transactions.map((item) => [
      item.orderId,
      item.transactionId,
      formatDate(item.transactionDate),
      item.amount,
      item.transactionStatus,
      item.gateway,
      item.chargeType,
      item.userId,
      item.userName,
      item.phoneNumber,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    triggerBlobDownload(blob, "user-transactions.csv");
  };

  const columns = [
    {
      key: "orderId",
      label: "Order ID",
      width: "2fr",
      render: (value) => (
        <div style={{ width: "100%" }}>
          <span
            title={value}
            style={{
              color: colors.textPrimary,
              fontSize: "13px",
              fontWeight: 500,
              overflowWrap: "anywhere",
            }}
          >
            {value || "-"}
          </span>
        </div>
      ),
    },
    {
      key: "transactionDate",
      label: "Transaction Date",
      width: "1.5fr",
      render: (value) => (
        <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
          {formatDate(value)}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      width: "0.8fr",
      render: (value) => (
        <strong style={{ color: colors.textPrimary }}>
          ₹{Number(value || 0).toLocaleString("en-IN")}
        </strong>
      ),
    },
    {
      key: "transactionStatus",
      label: "Status",
      width: "0.9fr",
      render: (value) => {
        const status = String(value || "").toLowerCase();
        const isPaid = PAID_STATUSES.has(status);
        const isPending = status === "pending";

        const statusColor = isPaid
          ? colors.success
          : isPending
            ? colors.warning
            : colors.danger;

        return (
          <span
            style={{
              display: "inline-flex",
              padding: "5px 12px",
              borderRadius: "20px",
              border: `1px solid ${statusColor}`,
              color: statusColor,
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {value || "-"}
          </span>
        );
      },
    },
    {
      key: "gateway",
      label: "Payment Gateway",
      width: "1fr",
      render: (value) => (
        <span style={{ color: colors.textSecondary }}>
          {value || "-"}
        </span>
      ),
    },
    {
      key: "invoiceUrl",
      label: "Invoice",
      width: "1.8fr",
      render: (_, row) => {
        const enabled = hasInvoiceSource(row);
        const rowKey = row.transactionId || row.orderId;
        const isDownloading = downloadingId === rowKey;

        return (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              disabled={!enabled}
              onClick={(e) => {
                e.stopPropagation();
                handleViewInvoice(row);
              }}
              style={{
                padding: "8px 13px",
                borderRadius: "9px",
                border: `1px solid ${colors.accent}`,
                background: colors.gradientButton,
                color: colors.buttonText,
                cursor: enabled ? "pointer" : "not-allowed",
                opacity: enabled ? 1 : 0.5,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Eye size={14} /> View
            </button>

            <button
              type="button"
              disabled={!enabled || isDownloading}
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPdf(row);
              }}
              style={{
                padding: "8px 13px",
                borderRadius: "9px",
                border: `1px solid ${colors.accent}`,
                background: "transparent",
                color: colors.accent,
                cursor: enabled && !isDownloading ? "pointer" : "not-allowed",
                opacity: enabled && !isDownloading ? 1 : 0.5,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Download size={14} />{" "}
              {isDownloading ? "Downloading..." : "Download"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          padding: "22px",
          borderRadius: "17px",
          border: `1px solid ${colors.cardBorder}`,
          background: colors.gradientCard,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "22px",
          }}
        >
          <h3
            style={{
              color: colors.textPrimary,
              fontSize: "16px",
              margin: 0,
            }}
          >
            Transactions & Invoices
          </h3>

          <button
            type="button"
            onClick={exportCSV}
            disabled={!transactions.length}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 17px",
              borderRadius: "10px",
              border: `1px solid ${colors.accent}`,
              background: "transparent",
              color: colors.accent,
              cursor: transactions.length ? "pointer" : "not-allowed",
              opacity: transactions.length ? 1 : 0.5,
              fontWeight: 700,
            }}
          >
            <FileDown size={16} /> Export CSV
          </button>
        </div>

        <DataTable
          columns={columns}
          data={transactions}
          loading={loading}
          error={error}
          paginationMode="server"
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

      {/* Invoice modal */}
      {invoiceLoading && selectedTransaction && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.textPrimary,
            fontSize: "16px",
          }}
        >
          Loading invoice details...
        </div>
      )}

      <InvoiceDetailsModal
        open={Boolean(selectedTransaction && invoiceData && !invoiceLoading)}
        transaction={selectedTransaction}
        invoiceData={invoiceData}
        onClose={closeInvoice}
        onDownloadHtml={handleDownloadHtml}
        onPrint={handlePrintInvoice}
        downloading={invoiceLoading}
      />
    </>
  );
};

export default TransactionsInvoicesTab;