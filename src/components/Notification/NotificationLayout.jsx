// // import React, { useState, useEffect } from "react";
// // import CreateNotificationModal from "./CreateNotificationModal";
// // // --- Sub-Components ---
// // import ScheduledNotification from "./ScheduledNotification";
// // import NotificationTemplates from "./NotificationTemplates";
// // // import axiosInstance from "../../api/axiosInstance";
// // import SentNotification from "./SentNotification";
// // import AnalyticsGrid from "../ui/AnalyticsGrid";
// // import colors from "../../constants/colors";
// // import Layout from "../../layout/Layout";
// // import Button from "../ui/Button";
// // import axios from "axios";
// // const NotificationLayout = () => {
// //   const [activeTab, setActiveTab] = useState("scheduled");
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   // 🔹 API STATE
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const tabs = [
// //     { name: "Scheduled", id: "scheduled" },
// //     { name: "Sent", id: "sent" },
// //     // { name: "Template", id: "template" },
// //   ];
// //   // 🔹 FETCH NOTIFICATION STATS
// //   useEffect(() => {
// //     const fetchNotificationStats = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         setLoading(true);
// //         const res = await axios.get(
// //           "https://api.chatspark.in/api/v1/notifications/stats",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               "Content-Type": "application/json",
// //             },
// //           },
// //         );
// //         if (res.data?.success) {
// //           setStats(res.data.data);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch notification stats", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNotificationStats();
// //   }, []);
// //   // 🔹 METRICS (Dynamic)
// //   const notificationMetrics = [
// //     {
// //       label: "Sent Today",
// //       value: stats?.totalSentToday ?? "--",
// //       subtext: "Notification Delivered",
// //       subTextColor: colors.accent,
// //     },
// //     {
// //       label: "Open Rate",
// //       value: `${stats?.openRatePercentage ?? "0.00"}%`,
// //       subtext: "Based on opens",
// //       subTextColor: colors.success,
// //     },
// //     {
// //       label: "Click Rate",
// //       value: `${stats?.clickRatePercentage ?? "0.00"}%`,
// //       subtext: "User interactions",
// //       subTextColor: colors.accent,
// //     },
// //     {
// //       label: "Scheduled",
// //       value: stats?.scheduledCount ?? 0,
// //       subtext: "Upcoming Notification",
// //       subTextColor: colors.accent,
// //     },
// //   ];
// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case "scheduled":
// //         return <ScheduledNotification />;
// //       case "sent":
// //         return <SentNotification />;
// //       // case "template":
// //       //   return <NotificationTemplates />;
// //       default:
// //         return <ScheduledNotification />;
// //     }
// //   };
// //   return (
// //     <Layout>
// //       <div className="w-full flex flex-col gap-6">
// //         {/* Header */}
// //         <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 pb-2">
// //           <div>
// //             <h1 className="text-3xl font-bold text-white mb-2">
// //               Notification <span style={{ color: colors.accent }}>System</span>
// //             </h1>
// //             <p className="text-lg font-medium" style={{ color: colors.accent }}>
// //               Manage notification templates, scheduling, and campaigns
// //             </p>
// //           </div>
// //           <div className="flex flex-wrap gap-3">
// //             <Button
// //               onClick={() => setIsModalOpen(true)}
// //               className="flex font-bold"
// //               variant="primary"
// //             >
// //               + Create Notification
// //             </Button>
// //             {tabs.map((tab) => {
// //               const isActive = activeTab === tab.id;
// //               return (
// //                 <Button
// //                   key={tab.id}
// //                   variant={isActive ? "accent" : "secondary"}
// //                   className={`text-[16px] font-bold rounded-full transition-all ${
// //                     isActive
// //                       ? "text-black shadow-lg scale-105"
// //                       : "text-gray-400 hover:text-white"
// //                   }`}
// //                   onClick={() => setActiveTab(tab.id)}
// //                 >
// //                   {tab.name}
// //                 </Button>
// //               );
// //             })}
// //           </div>
// //         </div>
// //         {/* Analytics */}
// //         <AnalyticsGrid
// //           items={notificationMetrics}
// //           gridCols="4"
// //           loading={loading}
// //         />
// //         {/* Content */}
// //         <div className="w-full mt-4 animate-in fade-in zoom-in duration-300">
// //           {renderContent()}
// //         </div>
// //       </div>
// //       <CreateNotificationModal
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //       />
// //     </Layout>
// //   );
// // };
// // export default NotificationLayout;
// import React, { useState, useEffect, Suspense, lazy } from "react";
// import axios from "axios";
// import DashboardLoader from "../ui/DashboardLoader";
// // --- Synchronous Components (Keep critical UI fast) ---
// import colors from "../../constants/colors";
// import AnalyticsGrid from "./AnalyticsGrid";
// import PageLoader from "../ui/PageLoader";
// import Layout from "../../layout/Layout";
// import Button from "../ui/Button";
// // --- Lazy Load Content & Modals ---
// const CreateNotificationModal = lazy(() => import("./CreateNotificationModal"));
// const ScheduledNotification = lazy(() => import("./ScheduledNotification"));
// const SentNotification = lazy(() => import("./SentNotification"));
// // const NotificationTemplates = lazy(() => import("./NotificationTemplates"));
// const NotificationLayout = () => {
//   const [activeTab, setActiveTab] = useState("scheduled");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // 🔹 API STATE
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const tabs = [
//     { name: "Scheduled", id: "scheduled" },
//     { name: "Sent", id: "sent" },
//     // { name: "Template", id: "template" },
//   ];
//   // 🔹 FETCH NOTIFICATION STATS
//   useEffect(() => {
//     const fetchNotificationStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         setLoading(true);
//         const res = await axios.get(
//           "https://operation.chatspark.in/api/v1/notifications/stats",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           },
//         );
//         if (res.data?.success) {
//           setStats(res.data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch notification stats", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotificationStats();
//   }, []);
//   // 🔹 METRICS (Dynamic)
//   const notificationMetrics = [
//     {
//       label: "Sent Today",
//       value: stats?.totalSentToday ?? "--",
//       subtext: "Notification Delivered",
//       subTextColor: colors.accent,
//     },
//     // {
//     //   label: "Open Rate",
//     //   value: `${stats?.openRatePercentage ?? "0.00"}%`,
//     //   subtext: "Based on opens",
//     //   subTextColor: colors.success,
//     // },
//     {
//       label: "Click Rate",
//       value: `${stats?.clickRatePercentage ?? "0.00"}%`,
//       subtext: "User interactions",
//       subTextColor: colors.accent,
//     },
//     {
//       label: "Scheduled",
//       value: stats?.scheduledCount ?? 0,
//       subtext: "Upcoming Notification",
//       subTextColor: colors.accent,
//     },
//   ];
//   const renderContent = () => {
//     switch (activeTab) {
//       case "scheduled":
//         return <ScheduledNotification />;
//       case "sent":
//         return <SentNotification />;
//       // case "template":
//       //   return <NotificationTemplates />;
//       default:
//         return <ScheduledNotification />;
//     }
//   };
//   return (
//     <Layout>
//       <div className="w-full flex flex-col gap-6">
//         {/* Header */}
//         <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 pb-2">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">
//               Notification <span style={{ color: colors.accent }}>System</span>
//             </h1>
//             <p className="text-lg font-medium" style={{ color: colors.accent }}>
//               Manage notification templates, scheduling, and campaigns
//             </p>
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <Button
//               onClick={() => setIsModalOpen(true)}
//               className="flex font-bold"
//               variant="primary"
//             >
//               + Create Notification
//             </Button>
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <Button
//                   key={tab.id}
//                   variant={isActive ? "accent" : "secondary"}
//                   className={`text-[16px] font-bold rounded-full transition-all ${
//                     isActive
//                       ? "text-black shadow-lg scale-105"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                   onClick={() => setActiveTab(tab.id)}
//                 >
//                   {tab.name}
//                 </Button>
//               );
//             })}
//           </div>
//         </div>
//         {/* Analytics */}
//         <AnalyticsGrid
//           items={notificationMetrics}
//           gridCols="3"
//           loading={loading}
//         />
//         {/* Content with Suspense */}
//         <div className="w-full mt-4 animate-in fade-in zoom-in duration-300 min-h-100">
//           <Suspense
//             fallback={<DashboardLoader message={`Loading ${activeTab}...`} />}
//           >
//             {renderContent()}
//           </Suspense>
//         </div>
//       </div>
//       {/* Modal with Suspense */}
//       <Suspense fallback={null}>
//         <CreateNotificationModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       </Suspense>
//     </Layout>
//   );
// };
// export default NotificationLayout;
import React, { useEffect, useState, Suspense, lazy } from "react";

import DashboardLoader from "../ui/DashboardLoader";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import AnalyticsGrid from "./AnalyticsGrid";
import Button from "../ui/Button";


// Lazy load content & modal
const CreateNotificationModal = lazy(
  () => import("./CreateNotificationModal")
);

const ScheduledNotification = lazy(
  () => import("./ScheduledNotification")
);

const SentNotification = lazy(
  () => import("./SentNotification")
);

const NotificationLayout = () => {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    {
      name: "Scheduled",
      id: "scheduled",
    },
    {
      name: "Sent",
      id: "sent",
    },
  ];

  // Fetch notification stats
  useEffect(() => {
    const fetchNotificationStats = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(
          "/api/v1/notifications/stats"
        );

        if (res.data?.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch notification stats",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationStats();
  }, []);

  // Notification metrics
  const notificationMetrics = [
    {
      label: "Sent Today",
      value: stats?.totalSentToday ?? "--",
      subtext: "Notification Delivered",
      subTextColor: colors.accent,
    },
    {
      label: "Click Rate",
      value: `${stats?.clickRatePercentage ?? "0.00"}%`,
      subtext: "User interactions",
      subTextColor: colors.accent,
    },
    {
      label: "Scheduled",
      value: stats?.scheduledCount ?? 0,
      subtext: "Upcoming Notification",
      subTextColor: colors.accent,
    },
  ];

  // Render active tab
  const renderContent = () => {
    switch (activeTab) {
      case "scheduled":
        return <ScheduledNotification />;

      case "sent":
        return <SentNotification />;

      default:
        return <ScheduledNotification />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 pb-2">

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Notification{" "}
            <span style={{ color: colors.accent }}>
              System
            </span>
          </h1>

          <p
            className="text-lg font-medium"
            style={{ color: colors.accent }}
          >
            Manage notification templates, scheduling, and campaigns
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">

          {/* Create Notification */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex font-bold"
            variant="primary"
          >
            + Create Notification
          </Button>

          {/* Tabs */}
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                variant={isActive ? "accent" : "secondary"}
                className={`text-[16px] font-bold rounded-full transition-all ${
                  isActive
                    ? "text-black shadow-lg scale-105"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Analytics */}
      <AnalyticsGrid
        items={notificationMetrics}
        gridCols="3"
        loading={loading}
      />

      {/* Content */}
      <div className="w-full mt-4 animate-in fade-in zoom-in duration-300 min-h-[400px]">
        <Suspense
          fallback={
            <DashboardLoader
              message={`Loading ${activeTab}...`}
            />
          }
        >
          {renderContent()}
        </Suspense>
      </div>

      {/* Create Notification Modal */}
      <Suspense fallback={null}>
        <CreateNotificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Suspense>
    </div>
  );
};

export default NotificationLayout;