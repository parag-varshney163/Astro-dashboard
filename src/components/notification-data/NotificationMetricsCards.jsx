import React from "react";

import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


export default function NotificationMetricsCards({ data }) {
  const sections = [
    {
      title: "Performance Metrics",
      rows: data?.performanceMetrics || [],
    },
    {
      title: "Type Breakdown",
      rows: data?.typeBreakdown || [],
    },
  ];

  // const getChangeText = (change) => {
  //   if (!change || change.hide) return "—";

  //   return `${change.direction === "up" ? "↗" : "↘"} ${change.pct}%`;
  // };
  const getChangeText = (change) => {
  if (!change || change.hide) return "—";

  return `${change.direction === "up" ? "↗" : "↘"} ${change.pct}%`;
};

const tableData = [
  ...(data?.performanceMetrics || []).map((row) => ({
    category: "Performance Metrics",
    metric: row.metric,
    yesterday: row.yesterday,
    beforeYesterday: row.beforeYesterday,
    sevenDay: row["7d"],
    change: getChangeText(row.change),
    positive: row.change?.direction === "up",
    hidden: row.change?.hide,
  })),

  ...(data?.typeBreakdown || []).map((row) => ({
    category: "Type Breakdown",
    metric: row.metric,
    yesterday: row.yesterday,
    beforeYesterday: row.beforeYesterday,
    sevenDay: row["7d"],
    change: getChangeText(row.change),
    positive: row.change?.direction === "up",
    hidden: row.change?.hide,
  })),
];

  const getChangeColor = (change) => {
    if (!change || change.hide) return colors.textSecondary;

    return change.direction === "up" ? "#6EF7C8" : "#FF6B6B";
  };
  const columns = [
  {
    key: "category",
    label: "Category",
    width: "1fr",
    align: "left",
  },
  {
    key: "metric",
    label: "Metric",
    width: "1fr",
    align: "left",
  },
  {
    key: "yesterday",
    label: "Yesterday",
    width: "1fr",
    render: (value) =>
      typeof value === "number" ? value.toLocaleString() : value,
  },
  {
    key: "beforeYesterday",
    label: "Prev Day",
    width: "1fr",
    render: (value) =>
      typeof value === "number" ? value.toLocaleString() : value,
  },
  {
    key: "sevenDay",
    label: "7D Avg",
    width: "1fr",
    render: (value) =>
      typeof value === "number" ? value.toLocaleString() : value,
  },
  {
    key: "change",
    label: "Change",
    width: "1fr",
    render: (value, row) => (
      <span
        style={{
          color:
            value === "—"
              ? colors.textSecondary
              : row.positive
              ? "#6EF7C8"
              : "#FF6B6B",
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    ),
  },
];

  // return (
  //   <div
  //     style={{
  //       display: "grid",
  //       gridTemplateColumns: "repeat(2, 1fr)",
  //       gap: "24px",
  //       marginTop: "24px",
  //     }}
  //   >
  //     {sections.map((section) => (
  //       <div
  //         key={section.title}
  //         style={{
  //           background: colors.cardBg,
  //           border: `1px solid ${colors.cardBorder}`,
  //           borderRadius: "24px",
  //           overflow: "hidden",
  //         }}
  //       >
  //         {/* Header */}
  //         <div
  //           style={{
  //             padding: "24px 32px",
  //             borderBottom: `1px solid ${colors.cardBorder}`,
  //           }}
  //         >
  //           <h3
  //             style={{
  //               margin: 0,
  //               color: colors.textPrimary,
  //               fontSize: "20px",
  //               fontWeight: 600,
  //             }}
  //           >
  //             {section.title}
  //           </h3>
  //         </div>

  //         {/* Table Header */}
  //         {/* <div
  //           style={{
  //             display: "grid",
  //             gridTemplateColumns: "2fr 1fr 1fr",
  //             padding: "18px 32px",
  //             borderBottom: `1px solid ${colors.cardBorder}`,
  //             color: colors.accent,
  //             fontSize: "16px",
  //             fontWeight: 600,
  //           }}
  //         >
  //           <span>Metric</span>
  //           <span style={{ textAlign: "center" }}>Value</span>
  //           <span style={{ textAlign: "right" }}>Change</span>
  //         </div> */}
  //         <div
  //           style={{
  //             display: "grid",
  //             gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
  //             padding: "18px 32px",
  //             borderBottom: `1px solid ${colors.cardBorder}`,
  //             color: colors.accent,
  //             fontSize: "16px",
  //             fontWeight: 600,
  //           }}
  //         >
  //           <span>Metric</span>
  //           <span style={{ textAlign: "center" }}>Yesterday</span>
  //           <span style={{ textAlign: "center" }}> Before Yesterday</span>
  //           <span style={{ textAlign: "center" }}>7D Avg</span>
  //           <span style={{ textAlign: "right" }}>Change</span>
  //         </div>

  //         {/* Rows */}
  //         {/* {section.rows.map((row, index) => (
  //           <div
  //             key={index}
  //             style={{
  //               display: "grid",
  //               gridTemplateColumns: "2fr 1fr 1fr",
  //               alignItems: "center",
  //               padding: "22px 32px",
  //               borderBottom:
  //                 index !== section.rows.length - 1
  //                   ? `1px solid ${colors.cardBorder}`
  //                   : "none",
  //             }}
  //           >
  //             <span
  //               style={{
  //                 color: colors.textPrimary,
  //                 fontSize: "15px",
  //               }}
  //             >
  //               {row.metric}
  //             </span>

  //             <span
  //               style={{
  //                 color: colors.textPrimary,
  //                 fontSize: "15px",
  //                 textAlign: "center",
  //               }}
  //             >
  //               {typeof row.value === "number"
  //                 ? row.value.toLocaleString()
  //                 : row.value}
  //             </span>

  //             <span
  //               style={{
  //                 textAlign: "right",
  //                 fontSize: "15px",
  //                 fontWeight: 500,
  //                 color: getChangeColor(row.change),
  //               }}
  //             >
  //               {getChangeText(row.change)}
  //             </span>
  //           </div>
  //         ))} */}
  //         {section.rows.map((row, index) => (
  //           <div
  //             key={index}
  //             style={{
  //               display: "grid",
  //               gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
  //               alignItems: "center",
  //               padding: "22px 32px",
  //               borderBottom:
  //                 index !== section.rows.length - 1
  //                   ? `1px solid ${colors.cardBorder}`
  //                   : "none",
  //             }}
  //           >
  //             <span
  //               style={{
  //                 color: colors.textPrimary,
  //                 fontSize: "15px",
  //               }}
  //             >
  //               {row.metric}
  //             </span>

  //             <span
  //               style={{
  //                 color: colors.textPrimary,
  //                 textAlign: "center",
  //               }}
  //             >
  //               {typeof row.yesterday === "number"
  //                 ? row.yesterday.toLocaleString()
  //                 : row.yesterday}
  //             </span>

  //             <span
  //               style={{
  //                 color: colors.textPrimary,
  //                 textAlign: "center",
  //               }}
  //             >
  //               {typeof row.beforeYesterday === "number"
  //                 ? row.beforeYesterday.toLocaleString()
  //                 : row.beforeYesterday}
  //             </span>

  //             <span
  //               style={{
  //                 color: colors.textPrimary,
  //                 textAlign: "center",
  //               }}
  //             >
  //               {typeof row["7d"] === "number"
  //                 ? row["7d"].toLocaleString()
  //                 : row["7d"]}
  //             </span>

  //             <span
  //               style={{
  //                 textAlign: "right",
  //                 fontWeight: 500,
  //                 color: getChangeColor(row.change),
  //               }}
  //             >
  //               {getChangeText(row.change)}
  //             </span>
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );

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
        Notification Metrics Overview
      </h2>

      <p
        style={{
          color: colors.textSecondary,
          fontSize: "14px",
          marginTop: "6px",
        }}
      >
        Track notification delivery performance, engagement trends,
        and notification type distribution with daily and 7-day comparisons.
      </p>
    </div>

    <DataTable
      columns={columns}
      data={tableData}
      paginationMode="client"
    />
  </div>
);

}
