// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import React from "react";
// import NotificationTemplateTable from "../components/notification/NotificationTemplateTable";
// import NotificationMetricsCards from "../components/notification/NotificationMetricsCards";
// import NotificationCharts from "../components/notification/NotificationCharts";
// import NotificationStats from "../components/notification/NotificationStats";
// import DateFilterBar from "../components/ui/DateFilterBar";
// import axiosInstance from "../api/axiosInstance";
// import Sidebar from "../components/ui/Sidebar";
// import colors from "../constants/colors";
// const filterMap = {
//     Yesterday: "yesterday",
//     "Before Yesterday": "day_before_yesterday",
//     "Last 7 Days": "7d",
//     "Last 30 Days": "30d",
//     "This Month": "30d",
// };
// const Notifications = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [filter, setFilter] = useState("yesterday");
//     const [notificationStats, setNotificationStats] = useState(null);
//     const [packDistributionData, setPackDistributionData] = useState([]);
//     const [notificationChartData, setNotificationChartData] = useState(null);
//     const [hourlyRechargeData, setHourlyRechargeData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const fetchData = async (selectedFilter = filter) => {
//         try {
//             setLoading(true);
//             const [kpiRes, revenueMixRes, packDistributionRes, hourlyRes] =
//                 await Promise.all([
//                     axiosInstance.get("/api/v1/customer/notification/stats", {
//                         params: { filter: selectedFilter },
//                     }),
//                     axiosInstance.get("/api/v1/customer/notification/funnel", {
//                         params: { filter: selectedFilter },
//                     }),
//                     axiosInstance.get("/api/v1/customer/notification/insights", {
//                         params: { filter: selectedFilter },
//                     }),
//                     // axiosInstance.get("/api/v1/notifications/temp", {
//                     //     params: { filter: selectedFilter },
//                     // }),
//                     axiosInstance.get("/api/v1/notifications/temp", {
//                         params: {
//                             filter: selectedFilter,
//                             page,
//                             limit,
//                         },
//                     })
//                 ]);
//             setNotificationStats(kpiRes?.data.data);
//             setNotificationChartData(revenueMixRes.data.data);
//             //setHourlyRechargeData(hourlyRes.data.data || []);
//             setPackDistributionData(packDistributionRes.data.data || []);
//             setHourlyRechargeData(hourlyRes.data.data || []);
//             setTotalPages(hourlyRes.data.pagination.totalPages);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchData(filter);
//     }, [filter, page, limit]);
//     return (
//         <div
//             className="min-h-screen flex text-white overflow-hidden"
//             style={{ background: colors.gradientVertical }}
//         >
//             <Sidebar
//                 isOpen={sidebarOpen}
//                 toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//             />
//             <motion.main
//                 animate={{
//                     marginLeft: sidebarOpen ? 220 : 70,
//                     width: sidebarOpen
//                         ? "calc(100% - 220px)"
//                         : "calc(100% - 70px)",
//                 }}
//                 transition={{ duration: 0.4, type: "tween" }}
//                 className="p-6 overflow-y-auto scrollbar-hide"
//             >
//                 <div className="space-y-1">
//                     <DateFilterBar
//                         onFilterChange={(value) =>
//                             setFilter(filterMap[value] || "yesterday")
//                         }
//                         onRefresh={() => fetchData(filter)}
//                     />
//                     <NotificationStats
//                         data={notificationStats}
//                         loading={loading}
//                     />
//                     <NotificationCharts data={notificationChartData} />
//                     <NotificationMetricsCards data={packDistributionData} />
//                     {/* <TimeOfDayRechargeChart data={hourlyRechargeData} />
//                     <RechargeMetricsTable data={packDistributionData}/> */}
//                     {/* <NotificationHighlightsCards data={hourlyRechargeData}/> */}
//                     <NotificationTemplateTable data={hourlyRechargeData} page={page} loading={loading} totalPages={totalPages}
//                         limit={limit}
//                         onPageChange={setPage} />
//                 </div>
//             </motion.main>
//         </div>
//     );
// };
// export default Notifications;
// import React, { useEffect, useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import NotificationTemplateTable from "../components/notification/NotificationTemplateTable";
// import NotificationMetricsCards from "../components/notification/NotificationMetricsCards";
// import NotificationCharts from "../components/notification/NotificationCharts";
// import NotificationStats from "../components/notification/NotificationStats";
// import DateFilterBar from "../components/ui/DateFilterBar";
// import axiosInstance from "../api/axiosInstance";
// import Sidebar from "../components/ui/Sidebar";
// import colors from "../constants/colors";
// const filterMap = {
//   Yesterday: "yesterday",
//   "Before Yesterday": "day_before_yesterday",
//   "Last 7 Days": "7d",
//   "Last 30 Days": "30d",
//   "This Month": "this_month",
// };
// const Notifications = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [filter, setFilter] = useState("yesterday");
//   const [notificationStats, setNotificationStats] = useState(null);
//   const [packDistributionData, setPackDistributionData] = useState([]);
//   const [notificationChartData, setNotificationChartData] = useState(null);
//   const [hourlyRechargeData, setHourlyRechargeData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
// //   const fetchData = useCallback(async (selectedFilter = filter) => {
// //     try {
// //       setLoading(true);
// //       const [
// //         kpiRes,
// //         revenueMixRes,
// //         packDistributionRes,
// //         hourlyRes,
// //       ] = await Promise.all([
// //         axiosInstance.get("/api/v1/customer/notification/stats", {
// //           params: { filter: selectedFilter },
// //         }),
// //         axiosInstance.get("/api/v1/customer/notification/funnel", {
// //           params: { filter: selectedFilter },
// //         }),
// //         axiosInstance.get("/api/v1/customer/notification/insights", {
// //           params: { filter: selectedFilter },
// //         }),
// //         // axiosInstance.get("/api/v1/customer/filter", {
// //         //   params: {
// //         //     filter: selectedFilter,
// //         //     page,
// //         //     limit,
// //         //   },
// //         // }),
// //       ]);
// //       setNotificationStats(kpiRes?.data?.data || null);
// //       setNotificationChartData(revenueMixRes?.data?.data || null);
// //       setPackDistributionData(
// //         packDistributionRes?.data?.data || []
// //       );
// //       setHourlyRechargeData(hourlyRes?.data?.data || []);
// //       setTotalPages(hourlyRes?.data?.pagination?.totalPages || 1);
// //     } catch (err) {
// //       console.error("Notification dashboard fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [filter, page, limit]);
// const fetchData = useCallback(async (selectedFilter = filter) => {
//   try {
//     setLoading(true);
//     const [kpiRes, revenueMixRes, packDistributionRes] =
//       await Promise.all([
//         axiosInstance.get("/api/v1/customer/notification/stats", {
//           params: { filter: selectedFilter },
//         }),
//         axiosInstance.get("/api/v1/customer/notification/funnel", {
//           params: { filter: selectedFilter },
//         }),
//         axiosInstance.get("/api/v1/customer/notification/insights", {
//           params: { filter: selectedFilter },
//         }),
//       ]);
//     // Notification Stats
//     const statsData = kpiRes?.data?.data || null;
//     console.log("Notification Stats API:", kpiRes?.data);
//     console.log("Notification Stats State:", statsData);
//     setNotificationStats(statsData);
//     // Charts
//     setNotificationChartData(revenueMixRes?.data?.data || null);
//     // Metrics
//     setPackDistributionData(
//       packDistributionRes?.data?.data || []
//     );
//   } catch (err) {
//     console.error("Notification dashboard fetch error:", err);
//   } finally {
//     setLoading(false);
//   }
// }, [filter]);
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);
//   const handleFilterChange = (value) => {
//     const nextFilter = filterMap[value] || "yesterday";
//     if (nextFilter !== filter) {
//       setFilter(nextFilter);
//       setPage(1);
//     }
//   };
//   const handleRefresh = () => {
//     fetchData(filter);
//   };
//   return (
//     <div
//       className="min-h-screen flex text-white overflow-hidden"
//       style={{
//         background: colors.pageBg,
//       }}
//     >
//       <Sidebar
//         isOpen={sidebarOpen}
//         toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//       />
//       <motion.main
//         animate={{
//           marginLeft: sidebarOpen ? 220 : 70,
//           width: sidebarOpen
//             ? "calc(100% - 220px)"
//             : "calc(100% - 70px)",
//         }}
//         transition={{ duration: 0.4, type: "tween" }}
//         className="p-6 overflow-y-auto scrollbar-hide"
//       >
//         <div className="space-y-4">
//           <DateFilterBar
//             onFilterChange={handleFilterChange}
//             onRefresh={handleRefresh}
//           />
//           <NotificationStats
//             data={notificationStats}
//             loading={loading}
//           />
//           <NotificationCharts
//             data={notificationChartData}
//           />
//           <NotificationMetricsCards
//             data={packDistributionData}
//           />
//           <NotificationTemplateTable
//             data={hourlyRechargeData}
//             page={page}
//             loading={loading}
//             totalPages={totalPages}
//             limit={limit}
//             onPageChange={setPage}
//           />
//         </div>
//       </motion.main>
//     </div>
//   );
// };
// export default Notifications;
import React, { useState } from "react";
import { motion } from "framer-motion";

import NotificationTemplateTable from "../components/notification-data/NotificationTemplateTable";
import NotificationInsights from "../components/notification-data/NotificationInsights";
import NotificationStatsData from "../components/notification-data/NotificationStats";
import NotificationCharts from "../components/notification-data/NotificationCharts";
import DateFilterBar from "../components/ui/DateFilterBar";
import Sidebar from "../components/ui/Sidebar";
import colors from "../constants/colors";


const filterMap = {
  Yesterday: "yesterday",
  "Before Yesterday": "day_before_yesterday",
  "Last 7 Days": "7d",
  "Last 30 Days": "30d",
  "This Month": "this_month",
};

const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("yesterday");
  const [refreshKey, setRefreshKey] = useState(0);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const handleFilterChange = (value) => {
    const nextFilter = filterMap[value] || "yesterday";

    setFilter(nextFilter);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div
      className="min-h-screen flex text-white overflow-hidden"
      style={{ background: colors.pageBg }}
    >
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <motion.main
        animate={{
          marginLeft: sidebarOpen ? 220 : 70,
          width: sidebarOpen
            ? "calc(100% - 220px)"
            : "calc(100% - 70px)",
        }}
        transition={{ duration: 0.4, type: "tween" }}
        className="p-6 overflow-y-auto scrollbar-hide"
      >
        <div className="space-y-4">
          <DateFilterBar
            onFilterChange={handleFilterChange}
            onRefresh={handleRefresh}
          />

          <NotificationStatsData
            filter={filter}
            refreshKey={refreshKey}
          />
           <NotificationCharts
            filter={filter}
            refreshKey={refreshKey}
          />
            <NotificationInsights
            filter={filter}
            refreshKey={refreshKey}
          />
          <NotificationTemplateTable
            filter={filter}
            refreshKey={refreshKey}
          />
          {/* <NotificationCharts
            filter={filter}
            refreshKey={refreshKey}
          />

          <NotificationMetricsCards
            filter={filter}
            refreshKey={refreshKey}
          />

          <NotificationTemplateTable
            page={page}
            limit={limit}
            filter={filter}
            refreshKey={refreshKey}
            onPageChange={setPage}
          /> */}
        </div>
      </motion.main>
    </div>
  );
};

export default Notifications;
