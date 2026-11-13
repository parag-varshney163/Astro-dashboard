// import React from "react";
// import colors from "../../constants/colors";
// import DataTable from "../ui/DataTable";
// export default function NotificationTemplateTable({ data = [], page,
//   totalPages,
//   limit,
//   onPageChange,loading }) {
//   const tableData = data.map((item, index) => ({
//     id: `${item.Date}-${item.Time}-${index}`,
//     date: item.Date || "-",
//     time: item.Time || "-",
//     target: item.Target || "-",
//     vertical: item["Vertical/Gen"] || "-",
//     cta: item.CTA || "-",
//     subCta: item["Sub CTA"] || "-",
//     delivered: item.Delivered ?? 0,
//     open: item.Open ?? 0,
//     ctr: item.CTR ?? 0,
//   }));
//   const columns = [
//     {
//       key: "date",
//       label: "Date",
//       width: "1fr",
//       align: "center",
//     },
//     {
//       key: "time",
//       label: "Time",
//       width: "1fr",
//       align: "center",
//     },
//     {
//       key: "target",
//       label: "Target",
//       width: "1.5fr",
//       align: "center",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.accent,
//             fontWeight: 600,
//           }}
//         >
//           {value}
//         </span>
//       ),
//     },
//     {
//       key: "vertical",
//       label: "Vertical / Gen",
//       width: "1.4fr",
//       align: "center",
//       render: (value) => (
//         <span
//           style={{
//             color: value === "GENERAL" ? "#60A5FA" : "#C084FC",
//             fontWeight: 600,
//             fontSize: "13px",
//           }}
//         >
//           {value.replaceAll("_", " ")}
//         </span>
//       ),
//     },
//     {
//       key: "cta",
//       label: "CTA",
//       width: "2.2fr",
//       align: "left",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textPrimary,
//             fontWeight: 500,
//           }}
//         >
//           {value}
//         </span>
//       ),
//     },
//     {
//       key: "subCta",
//       label: "Sub CTA",
//       width: "2.5fr",
//       align: "left",
//       render: (value) => (
//         <span
//           style={{
//             color: colors.textSecondary,
//             fontSize: "13px",
//           }}
//         >
//           {value}
//         </span>
//       ),
//     },
//     {
//       key: "delivered",
//       label: "Delivered",
//       width: "1fr",
//       align: "center",
//       render: (value) => value.toLocaleString(),
//     },
//     {
//       key: "open",
//       label: "Open",
//       width: "1fr",
//       align: "center",
//       render: (value) => value.toLocaleString(),
//     },
//     {
//       key: "ctr",
//       label: "CTR",
//       width: "0.8fr",
//       align: "center",
//       render: (value) => (
//         <span
//           style={{
//             color:
//               value >= 15
//                 ? "#6EF7C8"
//                 : value >= 10
//                   ? colors.accent
//                   : "#FF6B6B",
//             fontWeight: 700,
//           }}
//         >
//           {value}
//         </span>
//       ),
//     },
//   ];
//   return (
//     <div>
//       <div style={{ marginTop: "16px" }}>
//         <h2
//           style={{
//             color: colors.textPrimary,
//             fontSize: "24px",
//             fontWeight: 700,
//             margin: 0,
//           }}
//         >
//           Notification Templates
//         </h2>
//         <p
//           style={{
//             color: colors.textSecondary,
//             fontSize: "14px",
//             marginTop: "6px",
//             marginBottom: 0,
//           }}
//         >
//           Track notification delivery, open rate, CTR, target audience, and
//           campaign message performance.
//         </p>
//       </div>
//       <DataTable
//         columns={columns}
//         data={tableData}
//         loading={loading}
//         paginationMode="server"
//         page={page}
//         totalPages={totalPages}
//         onPageChange={onPageChange}
//       />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const API_URL = "/api/v1/customer/filter";

export default function NotificationTemplateTable({
  filter = "yesterday",
  refreshKey = 0,
}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Reset pagination when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  // Fetch notifications
  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(API_URL, {
          params: {
            filter,
            page,
            limit,
          },
        });

        if (!isMounted) return;

        const result = response?.data?.data;

        setNotifications(result?.notifications || []);

        setPagination({
          total: result?.pagination?.total || 0,
          page: result?.pagination?.page || page,
          limit: result?.pagination?.limit || limit,
          totalPages: result?.pagination?.totalPages || 1,
          hasNextPage: result?.pagination?.hasNextPage || false,
          hasPrevPage: result?.pagination?.hasPrevPage || false,
        });
      } catch (err) {
        if (!isMounted) return;

        console.error("Notification fetch error:", err);

        setNotifications([]);
        setError(
          err?.response?.data?.message ||
            "Failed to fetch notifications"
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, [filter, page, limit, refreshKey]);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  const formatTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const tableData = notifications.map((item) => {
    const metrics = item.dashboardMetrics || {};

    return {
      id: item._id,
      date: formatDate(metrics.date || item.createdAt),
      time:
        metrics.time ||
        formatTime(item.scheduledAt || item.createdAt),
      target: metrics.target || item.audience?.type || "-",
      vertical:
        metrics.vertical ||
        item.notificationType ||
        "-",
      cta: metrics.cta || item.title || "-",
      subCta: metrics.subCta || item.message || "-",
      delivered: metrics.delivered ?? item.stats?.sent ?? 0,
      open: metrics.opens ?? 0,
      ctr: metrics.ctr ?? 0,
      status: item.status || "-",
    };
  });

  const columns = [
    {
      key: "date",
      label: "Date",
      width: "1fr",
      align: "center",
    },
    {
      key: "time",
      label: "Time",
      width: "1fr",
      align: "center",
    },
    {
      key: "target",
      label: "Target",
      width: "1.2fr",
      align: "center",
      render: (value) => (
        <span
          style={{
            color: colors.accent,
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {String(value).replaceAll("_", " ")}
        </span>
      ),
    },
    {
      key: "vertical",
      label: "Vertical / Gen",
      width: "1.4fr",
      align: "center",
      render: (value) => (
        <span
          style={{
            color:
              value === "GENERAL" ? "#60A5FA" : "#C084FC",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          {String(value).replaceAll("_", " ")}
        </span>
      ),
    },
    {
      key: "cta",
      label: "CTA",
      width: "2.2fr",
      align: "left",
      render: (value) => (
        <span
          style={{
            color: colors.textPrimary,
            fontWeight: 500,
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "subCta",
      label: "Sub CTA",
      width: "2.5fr",
      align: "left",
      render: (value) => (
        <span
          style={{
            color: colors.textSecondary,
            fontSize: "13px",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "delivered",
      label: "Delivered",
      width: "1fr",
      align: "center",
      render: (value) =>
        Number(value).toLocaleString("en-IN"),
    },
    {
      key: "open",
      label: "Open",
      width: "1fr",
      align: "center",
      render: (value) =>
        Number(value).toLocaleString("en-IN"),
    },
    {
      key: "ctr",
      label: "CTR",
      width: "0.8fr",
      align: "center",
      render: (value) => (
        <span
          style={{
            color:
              value >= 15
                ? "#6EF7C8"
                : value >= 10
                  ? colors.accent
                  : "#FF6B6B",
            fontWeight: 700,
          }}
        >
          {Number(value).toFixed(2)}%
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "1fr",
      align: "center",
      render: (value) => (
        <span
          style={{
            color:
              value === "sent"
                ? colors.success
                : value === "scheduled"
                  ? colors.warning
                  : colors.danger,
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginTop: "16px" }}>
        <h2
          style={{
            color: colors.textPrimary,
            fontSize: "24px",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Notification Templates
        </h2>

        <p
          style={{
            color: colors.textSecondary,
            fontSize: "14px",
            marginTop: "6px",
            marginBottom: 0,
          }}
        >
          Track notification delivery, open rate, CTR,
          target audience, and campaign message performance.
        </p>
      </div>

      {error && (
        <p
          style={{
            color: colors.danger,
            fontSize: "14px",
            marginTop: "12px",
          }}
        >
          {error}
        </p>
      )}

      <DataTable
        columns={columns}
        data={tableData}
        loading={loading}
        paginationMode="server"
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
