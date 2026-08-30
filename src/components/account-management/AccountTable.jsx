import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";
import Button from "../ui/Button";


export default function AccountTable({ data = [], page,
  totalPages,
  onPageChange, refreshData, onResolved }) {
  const [actionLoading, setActionLoading] = useState({
    userId: null,
    action: null,
  });
  const [selectedIds, setSelectedIds] = useState([]);

  function formatToIST(utcDateString) {
    if (!utcDateString) return "N/A";

    const date = new Date(utcDateString);

    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }


  const handleAction = async (userId, action) => {
    try {
      setActionLoading({ userId, action });

      const res = await axiosInstance.post(
        `/api/v1/customer/deletion-request/${userId}`,
        { action }
      );

      if (res?.data?.message) {
        alert(res.data.message);
      }

      if (refreshData) refreshData();
      onResolved?.();
    } catch (err) {
      console.error(`Failed to ${action} request`, err);

      alert(
        err?.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setActionLoading({ userId: null, action: null });
    }
  };
  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) {
      alert("Please select at least one request.");
      return;
    }

    try {
      setActionLoading({ userId: "bulk", action });

      const res = await axiosInstance.post(
        "/api/v1/customer/bulk-deletion-request",
        {
          userIds: selectedIds,
          action,
        }
      );

      alert(res?.data?.message || "Bulk action successful");

      setSelectedIds([]);
      onResolved?.();
    } catch (err) {
      console.error("Bulk action failed", err);
      alert(
        err?.response?.data?.message ||
        "Bulk action failed. Try again."
      );
    } finally {
      setActionLoading({ userId: null, action: null });
    }
  };


  const columns = [
    {
      key: "select",
      label: (
        <input
          type="checkbox"
          checked={
            data.length > 0 && selectedIds.length === data.length
          }
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedIds(data.map((row) => row.userId));
            } else {
              setSelectedIds([]);
            }
          }}
        />
      ),
      width: "60px",
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.userId)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedIds((prev) => [...prev, row.userId]);
            } else {
              setSelectedIds((prev) =>
                prev.filter((id) => id !== row.userId)
              );
            }
          }}
        />
      ),
    },

    {
      key: "creator",
      label: "Creator",
      width: "2fr",
      render: (_, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: colors.accent,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ color: colors.textPrimary, fontWeight: 600 }}>
              {row.name || "N/A"}
            </div>

            <div style={{ color: colors.textSecondary, fontSize: 12 }}>
              {row.userId}
            </div>

            <div style={{ color: colors.textSecondary, fontSize: 12 }}>
              {row.status === "requested"
                ? "Requested on"
                : row.status === "approved"
                  ? "Approved on"
                  : "Rejected on"}{" "}
              {row.requestTime || "—"}
            </div>

            {row.status === "requested" && (
              <div style={{ display: "flex", gap: 6, color: colors.warning, fontSize: 12 }}>
                <AlertCircle size={14} />
                Deletion Requested
              </div>
            )}

            {row.status === "approved" && (
              <div style={{ display: "flex", gap: 6, color: colors.success, fontSize: 12 }}>
                <CheckCircle size={14} />
                Deletion Approved
              </div>
            )}

            {row.status === "rejected" && (
              <div style={{ display: "flex", gap: 6, color: colors.danger, fontSize: 12 }}>
                <XCircle size={14} />
                Deletion Rejected
              </div>
            )}
          </div>
        </div>
      ),
    },

    // {
    //   key: "totalTime",
    //   label: "Total Time Online",
    //   render: (value) => (
    //     <span style={{ color: colors.accent, fontWeight: 500 }}>
    //       {value || "0h 0m"}
    //     </span>
    //   ),
    // },

    // {
    //   key: "amountSpent",
    //   label: "Amount Spent",
    //   render: (value) => (
    //     <span style={{ color: colors.accent }}>
    //       ₹ {Number(value || 0).toLocaleString()}
    //     </span>
    //   ),
    // },

    // {
    //   key: "totalCalls",
    //   label: "Total Calls",
    //   render: (value) => <span>{value ?? 0}</span>,
    // },

    {
      key: "updatedAt",
      label: "Last Active",
      width: "1.4fr",
      render: (value) => (
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100%",
        }}>
          <span style={{ color: colors.accent }}>
            {formatToIST(value) || "N/A"}
          </span>
        </div>
      ),
    },

    {
      key: "reason",
      label: "Reason",
      width: "2fr",

      render: (value) => (
        <div style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "left",
          wordBreak: "break-word",
          whiteSpace: "normal",
          width: "50%",
          height: "100%"
        }}>
          <span style={{ color: colors.accent, fontWeight: 500 }}>
            {value || "-"}
          </span>
        </div>
      ),

    },



    {
      key: "actions",
      label: "Actions",

      render: (_, row) => {
        // 🚫 Do not show buttons if already processed
        if (row.status !== "requested") {
          return null;
        }

        const approveLoading =
          actionLoading.userId === row.id &&
          actionLoading.action === "approve";

        const rejectLoading =
          actionLoading.userId === row.id &&
          actionLoading.action === "reject";

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Button
              variant="custom"
              size="sm"
              bg={colors.success}
              text="#fff"
              style={{ borderRadius: 16, padding: "8px 22px" }}
              disabled={approveLoading || rejectLoading}
              onClick={() => handleAction(row.id, "approve")}
            >
              {approveLoading ? "Approving..." : "Approve"}
            </Button>

            <Button
              variant="custom"
              size="sm"
              bg="#3a3a4d"
              text={colors.textPrimary}
              style={{ borderRadius: 16, padding: "8px 22px" }}
              disabled={approveLoading || rejectLoading}
              onClick={() => handleAction(row.id, "rejected")}
            >
              {rejectLoading ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        );
      },
    }

  ];

  // return <>
  //   <div
  //     style={{
  //       display: "flex",
  //       justifyContent: "space-between",
  //       alignItems: "center",
  //       marginBottom: 16,
  //     }}
  //   >
  //     <div style={{ color: colors.textSecondary }}>
  //       {selectedIds.length} selected
  //     </div>

  //     <FilterDropDown
  //       defaultLabel="Bulk Actions"
  //       width={180}
  //       options={["approve", "rejected"]}
  //       onSelect={(val) => handleBulkAction(val)}
  //     />
  //   </div>

  //   <DataTable columns={columns} data={data} paginationMode="server"
  //     page={page}
  //     totalPages={totalPages}
  //     onPageChange={onPageChange} />;
  // </>
  return (
  <>
    {/* Header */}
    <div
      className="rounded-3xl p-5 mb-6"
      style={{
        background: colors.gradientCard,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h2
            className="text-xl font-semibold"
            style={{ color: colors.textPrimary }}
          >
            Account Deletion Requests
          </h2>

          <p
            className="text-sm mt-1"
            style={{ color: colors.textMuted }}
          >
            Review, approve or reject account deletion requests.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="px-4 py-2 rounded-xl font-medium"
            style={{
              background: colors.hover,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.accent,
            }}
          >
            {selectedIds.length} Selected
          </div>

          <FilterDropDown
            defaultLabel="Bulk Actions"
            width={180}
            options={["approve", "rejected"]}
            onSelect={(val) => handleBulkAction(val)}
          />
        </div>
      </div>
    </div>

    {/* Table */}
    <DataTable
      columns={columns}
      data={data}
      paginationMode="server"
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />

    {/* Empty State */}
    {!data.length && (
      <div
        className="rounded-3xl mt-6 p-12 text-center"
        style={{
          background: colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div
          className="text-lg font-semibold"
          style={{ color: colors.textPrimary }}
        >
          No Requests Found
        </div>

        <p
          className="mt-2"
          style={{ color: colors.textMuted }}
        >
          There are currently no account deletion requests available.
        </p>
      </div>
    )}
  </>
);
}
