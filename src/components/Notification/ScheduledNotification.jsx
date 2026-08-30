// import React, { useEffect, useState } from "react";
// import { deleteNotification, fetchNotifications } from "./FetchNotifications";
// import DateFilterSection from "./DataFilterSection";
// import NotificationCard from "./NotificationCard";
// import colors from "../../constants/colors";
// const ScheduledNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [filters, setFilters] = useState({ page: 1, limit: 10 });
//   const [loading, setLoading] = useState(false); // ✅ loading state
//   useEffect(() => {
//     const loadNotifications = async () => {
//       setLoading(true);              // start loading
//       try {
//         const data = await fetchNotifications({
//           status: "scheduled",
//           ...filters,
//         });
//         setNotifications(data?.notifications || []);
//         setPagination(data?.pagination || {});
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadNotifications();
//   }, [filters]);
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this scheduled notification?"
//     );
//     if (!confirmDelete) return;
//     try {
//       await deleteNotification(id);
//       // Remove from UI instantly
//       setNotifications((prev) =>
//         prev.filter((n) => n._id !== id)
//       );
//       alert("Notification deleted successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete notification");
//     }
//   };
//   const AUDIENCE_LABEL_MAP = {
//     all: "All",
//     users: "Users",
//     creators: "Creators",
//     top_subscriptions: "Top Subscriptions",
//     todays_signup: "Today's Signups",
//     yesterdays_signup: "Yesterday's Signups",
//     signup_no_recharge: "Signed up, No Recharge",
//     recharge_2_not_another: "Recharged once,no further recharge",
//     completed_3_min_calls: "Completed 3+ Min Calls",
//     creators_inactive_yesterday: "Creators Inactive Yesterday",
//     creator_inactive_3days: "Creators Inactive (3 Days)",
//     custom: "Custom",
//   };
//   return (
//     <div className="w-full flex flex-col gap-6">
//       <div
//         className="w-full p-8 rounded-3xl border border-white/5"
//         style={{ backgroundColor: colors.secondary }}
//       >
//         {/* <DateFilterSection onChange={setFilters} /> */}
//         <DateFilterSection
//           onChange={(newFilters) =>
//             setFilters((prev) => ({
//               ...prev,
//               ...newFilters,
//               page: 1,
//             }))
//           }
//         />
//         <div className="mb-6">
//           <h3 className="text-2xl font-bold text-white">
//             Scheduled <span style={{ color: colors.accent }}>Notifications</span>
//           </h3>
//         </div>
//         {/* 🔄 LOADING TEXT */}
//         {loading && (
//           <div className="w-full text-center py-10">
//             <p className="text-sm font-semibold text-gray-400 animate-pulse">
//               Loading scheduled notifications...
//             </p>
//           </div>
//         )}
//         {/* 📭 EMPTY STATE */}
//         {!loading && notifications.length === 0 && (
//           <div className="w-full text-center py-10">
//             <p className="text-sm text-gray-500">
//               No scheduled notifications found
//             </p>
//           </div>
//         )}
//         {/* 📦 DATA */}
//         {!loading && notifications.length > 0 && (
//           <div className="flex flex-wrap gap-4">
//             {notifications.map((n) => (
//               <NotificationCard
//                 key={n._id}
//                 type="scheduled"
//                 title={n.title}
//                 subtitle={AUDIENCE_LABEL_MAP[n.audience?.type] || n.audience?.type}
//                 description={n.message}
//                 tags={[
//                   n.audience?.type,
//                   ...(n.targetedLanguages || []),
//                   n.campaignTag,
//                 ].filter(Boolean)}
//                 footerText={`Scheduled for: ${new Date(
//                   n.scheduledAt
//                 ).toLocaleString()}`}
//                 createdBy={n.createdBy?.name}
//                 onDelete={() => handleDelete(n._id)}
//               />
//             ))}
//           </div>
//         )}
//         {!loading && pagination.totalPages > 1 && (
//           <div className="flex items-center justify-center gap-4 mt-6">
//             <button
//               disabled={!pagination.hasPrevPage}
//               onClick={() =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   page: prev.page - 1,
//                 }))
//               }
//               className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <p className="text-white text-sm">
//               Page {pagination.page} of {pagination.totalPages}
//             </p>
//             <button
//               disabled={!pagination.hasNextPage}
//               onClick={() =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   page: prev.page + 1,
//                 }))
//               }
//               className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ScheduledNotifications;
import React, { useCallback, useEffect, useState, } from "react";

import { deleteNotification, fetchNotifications, } from "./FetchNotifications";
import DateFilterSection from "./DataFilterSection";
import NotificationCard from "./NotificationCard";
import colors from "../../constants/colors";


const ScheduledNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(false);

  /* ===========================
     DATE FILTER HANDLER
  =========================== */
  const handleDateChange = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  }, []);

  /* ===========================
     FETCH NOTIFICATIONS
  =========================== */
  useEffect(() => {
    let isMounted = true;

    const loadNotifications = async () => {
      setLoading(true);

      try {
        const data = await fetchNotifications({
          status: "scheduled",
          ...filters,
        });

        if (!isMounted) return;

        setNotifications(data?.notifications || []);
        setPagination(data?.pagination || {});
      } catch (error) {
        console.error(
          "Failed to fetch scheduled notifications:",
          error
        );

        if (isMounted) {
          setNotifications([]);
          setPagination({});
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadNotifications();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  /* ===========================
     DELETE NOTIFICATION
  =========================== */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scheduled notification?"
    );

    if (!confirmDelete) return;

    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );

      alert("Notification deleted successfully");
    } catch (error) {
      console.error(
        "Failed to delete notification:",
        error
      );

      alert("Failed to delete notification");
    }
  };

  /* ===========================
     AUDIENCE LABELS
  =========================== */
  const AUDIENCE_LABEL_MAP = {
    all: "All",
    users: "Users",
    creators: "Creators",

    top_subscriptions: "Top Subscriptions",

    todays_signup: "Today's Signups",
    yesterdays_signup: "Yesterday's Signups",

    signup_no_recharge: "Signed up, No Recharge",
    recharge_2_not_another:
      "Recharged once, no further recharge",

    completed_3_min_calls:
      "Completed 3+ Min Calls",

    creators_inactive_yesterday:
      "Creators Inactive Yesterday",

    creator_inactive_3days:
      "Creators Inactive (3 Days)",

    custom: "Custom",
  };

  return (
    <div className="w-full flex flex-col gap-6">

      {/* ===========================
          MAIN CONTAINER
      =========================== */}
      <div
        className="w-full p-8 rounded-3xl border"
        style={{
          backgroundColor: colors.secondary,
          borderColor: colors.inputBorder,
        }}
      >

        {/* ===========================
            DATE FILTER
        =========================== */}
        <DateFilterSection
          onChange={handleDateChange}
        />

        {/* ===========================
            TITLE
        =========================== */}
        <div className="mb-6">
          <h3
            className="text-2xl font-bold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Scheduled{" "}
            <span style={{ color: colors.accent }}>
              Notifications
            </span>
          </h3>
        </div>

        {/* ===========================
            LOADING
        =========================== */}
        {loading && (
          <div className="w-full text-center py-10">
            <p
              className="text-sm font-semibold animate-pulse"
              style={{
                color: colors.textMuted,
              }}
            >
              Loading scheduled notifications...
            </p>
          </div>
        )}

        {/* ===========================
            EMPTY STATE
        =========================== */}
        {!loading && notifications.length === 0 && (
          <div
            className="w-full text-center py-10 rounded-2xl border"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.inputBorder,
            }}
          >
            <p
              className="text-sm"
              style={{
                color: colors.textMuted,
              }}
            >
              No scheduled notifications found
            </p>
          </div>
        )}

        {/* ===========================
            NOTIFICATION CARDS
        =========================== */}
        {!loading && notifications.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                type="scheduled"
                title={notification.title}
                subtitle={
                  AUDIENCE_LABEL_MAP[
                    notification.audience?.type
                  ] ||
                  notification.audience?.type
                }
                description={notification.message}
                tags={[
                  notification.audience?.type,
                  ...(notification.targetedLanguages || []),
                  notification.campaignTag,
                ].filter(Boolean)}
                footerText={`Scheduled for: ${new Date(
                  notification.scheduledAt
                ).toLocaleString()}`}
                createdBy={notification.createdBy?.name}
                onDelete={() =>
                  handleDelete(notification._id)
                }
              />
            ))}
          </div>
        )}

        {/* ===========================
            PAGINATION
        =========================== */}
        {!loading && pagination.totalPages > 1 && (
          <div
            className="flex items-center justify-center gap-4 mt-8 pt-6 border-t"
            style={{
              borderColor: colors.inputBorder,
            }}
          >
            {/* PREVIOUS */}
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: Math.max(
                    1,
                    prev.page - 1
                  ),
                }))
              }
              className="px-5 py-2 rounded-full font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.inputBg,
                color: colors.textSecondary,
                border: `1px solid ${colors.inputBorder}`,
              }}
              onMouseEnter={(e) => {
                if (!pagination.hasPrevPage) return;

                e.currentTarget.style.backgroundColor =
                  colors.hover;

                e.currentTarget.style.color =
                  colors.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.inputBg;

                e.currentTarget.style.color =
                  colors.textSecondary;
              }}
            >
              Prev
            </button>

            {/* PAGE INFO */}
            <div
              className="px-4 py-2 rounded-full text-sm font-bold"
              style={{
                backgroundColor: colors.cardBg,
                color: colors.textPrimary,
                border: `1px solid ${colors.inputBorder}`,
              }}
            >
              Page{" "}
              <span style={{ color: colors.accent }}>
                {pagination.page || filters.page}
              </span>{" "}
              of{" "}
              <span style={{ color: colors.accent }}>
                {pagination.totalPages}
              </span>
            </div>

            {/* NEXT */}
            <button
              disabled={!pagination.hasNextPage}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className="px-5 py-2 rounded-full font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.inputBg,
                color: colors.textSecondary,
                border: `1px solid ${colors.inputBorder}`,
              }}
              onMouseEnter={(e) => {
                if (!pagination.hasNextPage) return;

                e.currentTarget.style.backgroundColor =
                  colors.hover;

                e.currentTarget.style.color =
                  colors.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.inputBg;

                e.currentTarget.style.color =
                  colors.textSecondary;
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledNotifications;