import { FileText, X, Download, Printer } from "lucide-react";
import React, { useEffect } from "react";

import colors from "../../constants/colors";


const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatAmount = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const InvoiceDetailsModal = ({
  open,
  transaction,
  invoiceData,
  onClose,
  onDownloadHtml,
  onPrint,
  downloading,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !transaction) return null;

  const metadata =
    invoiceData?.invoice ||
    invoiceData?.data?.invoice ||
    invoiceData?.data ||
    invoiceData ||
    {};

  const amount = Number(
    metadata.totalPaid ??
      metadata.total ??
      metadata.amount ??
      transaction.amount ??
      0
  );

  const invoiceNumber =
    metadata.invoiceNumber ||
    metadata.invoiceNo ||
    metadata.number ||
    "-";

  const customer =
    metadata.customerName ||
    metadata.userName ||
    transaction.userName ||
    "-";

  const phone =
    metadata.phoneNumber ||
    metadata.phone ||
    transaction.phoneNumber ||
    "-";

  const subscriptionName =
    metadata.subscriptionName ||
    metadata.planName ||
    metadata.description ||
    transaction.plan ||
    "Subscription Payment";

  const paymentMethod =
    metadata.paymentMethod ||
    metadata.paymentMode ||
    "-";

  const gatewayReference =
    metadata.gatewayReference ||
    metadata.gatewayTransactionId ||
    metadata.utr ||
    transaction.transactionId ||
    "-";

  const subtotal = Number(metadata.subtotal ?? amount);
  const tax = Number(metadata.tax ?? metadata.taxAmount ?? 0);

  const status = transaction.transactionStatus || "Unknown";
  const isPaid = ["success", "paid", "captured"].includes(
    String(status).toLowerCase()
  );

  const labelStyle = {
    color: colors.textMuted,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const valueStyle = {
    color: colors.textPrimary,
    fontSize: "13px",
    fontWeight: 600,
    overflowWrap: "anywhere",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "10px 0",
    borderBottom: `1px solid ${colors.inputBorder}`,
    color: colors.textPrimary,
    fontSize: "13px",
  };

  const actionButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "9px 14px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "820px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "18px",
          border: `1px solid ${colors.cardBorder}`,
          background: colors.gradientCard,
          padding: "20px 24px",
          boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2
              style={{
                color: colors.textPrimary,
                fontSize: "18px",
                fontWeight: 700,
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FileText size={18} />
              Invoice Details
            </h2>
            <p
              style={{
                color: colors.textSecondary,
                margin: "3px 0 0",
                fontSize: "12.5px",
              }}
            >
              Payment receipt and transaction summary
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "9px",
              border: `1px solid ${colors.cardBorder}`,
              background: "transparent",
              color: colors.textPrimary,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Invoice receipt card */}
        <div
          style={{
            background: "#1E1712",
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          {/* Top brand + status bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              paddingBottom: "14px",
              borderBottom: `1px solid ${colors.inputBorder}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  color: colors.accentLight,
                  fontSize: "15px",
                  fontWeight: 800,
                  letterSpacing: "2.5px",
                  lineHeight: 1.15,
                }}
              >
                ✺ AGAMI
                <div
                  style={{
                    fontSize: "9px",
                    letterSpacing: "3px",
                    marginLeft: "18px",
                  }}
                >
                  ASTRO
                </div>
              </div>

              <div>
                <div
                  style={{
                    color: colors.textPrimary,
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  Invoice Receipt
                </div>
                <div
                  style={{
                    color: colors.textSecondary,
                    fontSize: "12px",
                  }}
                >
                  {invoiceNumber !== "-" ? `#${invoiceNumber}` : "Subscription Payment"}
                </div>
              </div>
            </div>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 12px",
                borderRadius: "999px",
                border: `1px solid ${isPaid ? colors.success : colors.danger}`,
                color: isPaid ? colors.success : colors.danger,
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {isPaid ? "✓ Paid" : status}
            </span>
          </div>

          {/* Metadata grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px 18px",
              padding: "16px 0",
            }}
          >
            {[
              ["Invoice Number", invoiceNumber],
              ["Order ID", transaction.orderId],
              ["Transaction Date", formatDate(transaction.transactionDate)],
              ["User ID", transaction.userId],
              ["Customer", customer],
              ["Phone", phone],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}
              >
                <span style={labelStyle}>{label}</span>
                <span style={valueStyle}>{value || "-"}</span>
              </div>
            ))}
          </div>

          {/* Payment & breakdown */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "4px",
            }}
          >
            <div>
              <div
                style={{
                  color: colors.textPrimary,
                  fontSize: "13.5px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Payment Details
              </div>

              {[
                ["Subscription", subscriptionName],
                ["Payment Method", paymentMethod],
                ["Gateway Ref", gatewayReference],
              ].map(([label, value]) => (
                <div key={label} style={rowStyle}>
                  <span style={{ color: colors.textSecondary }}>{label}</span>
                  <strong
                    style={{
                      textAlign: "right",
                      overflowWrap: "anywhere",
                      fontWeight: 600,
                    }}
                  >
                    {value || "-"}
                  </strong>
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  color: colors.textPrimary,
                  fontSize: "13.5px",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Amount Breakdown
              </div>

              <div style={rowStyle}>
                <span style={{ color: colors.textSecondary }}>Subtotal</span>
                <strong>{formatAmount(subtotal)}</strong>
              </div>

              <div style={rowStyle}>
                <span style={{ color: colors.textSecondary }}>Tax</span>
                <strong>{formatAmount(tax)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  background: "rgba(212,175,55,0.18)",
                  border: `1px solid ${colors.accent}`,
                  color: colors.accentLight,
                  fontSize: "16px",
                  fontWeight: 800,
                }}
              >
                <span>Total Paid</span>
                <span>{formatAmount(amount)}</span>
              </div>
            </div>
          </div>

          <p
            style={{
              color: colors.textMuted,
              fontSize: "11.5px",
              lineHeight: 1.5,
              margin: "14px 0 0",
            }}
          >
            Generated by the Agami Astro billing system. Refer to the downloaded or
            printed receipt for official tax and billing records.
          </p>
        </div>

        {/* Footer actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "16px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              ...actionButtonStyle,
              background: "transparent",
              border: `1px solid ${colors.cardBorder}`,
              color: colors.textPrimary,
            }}
          >
            Close
          </button>

          <button
            type="button"
            onClick={onDownloadHtml}
            disabled={downloading}
            style={{
              ...actionButtonStyle,
              background: "transparent",
              border: `1px solid ${colors.accent}`,
              color: colors.accentLight,
              opacity: downloading ? 0.6 : 1,
            }}
          >
            <Download size={15} />
            Download HTML
          </button>

          <button
            type="button"
            onClick={onPrint}
            style={{
              ...actionButtonStyle,
              background: colors.gradientButton,
              border: "none",
              color: colors.buttonText,
            }}
          >
            <Printer size={15} />
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;