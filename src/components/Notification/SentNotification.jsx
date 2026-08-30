// import React, { useEffect, useState } from "react";
// import { fetchNotifications } from "./FetchNotifications";
// import DateFilterSection from "./DataFilterSection";
// import NotificationCard from "./NotificationCard";
// import colors from "../../constants/colors";
// const SentNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [filters, setFilters] = useState({ page: 1, limit: 10 });
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const loadNotifications = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchNotifications({
//           status: "sent",
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
//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
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
//             Sent <span style={{ color: colors.accent }}>Notifications</span>
//           </h3>
//         </div>
//         {/* 🔄 LOADING */}
//         {loading && (
//           <div className="w-full text-center py-10">
//             <p className="text-sm font-semibold text-gray-400 animate-pulse">
//               Loading sent notifications...
//             </p>
//           </div>
//         )}
//         {/* 📭 EMPTY STATE */}
//         {!loading && notifications.length === 0 && (
//           <div className="w-full text-center py-10">
//             <p className="text-sm text-gray-500">
//               No sent notifications found
//             </p>
//           </div>
//         )}
//         {/* 📦 DATA */}
//         {!loading && notifications.length > 0 && (
//           <div className="flex flex-wrap gap-4">
//             {notifications.map((n) => (
//               <NotificationCard
//                 key={n._id}
//                 type="sent"
//                 title={n.title}
//                 subtitle={AUDIENCE_LABEL_MAP[n.audience?.type] || n.audience?.type}
//                 description={n.message}
//                 tags={[
//                   n.audience?.type,
//                   ...(n.targetedLanguages || []),
//                   n.campaignTag,
//                 ].filter(Boolean)}
//                 footerText={`Sent • Delivered: ${n.stats?.sent
//                   } • Failed: ${n.stats?.failed}`}
//                 createdBy={n.createdBy?.name}
//                 timestamp={formatDateTime(n.updatedAt)}
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
// export default SentNotifications;
import React, { useEffect, useState } from "react";

import { fetchNotifications } from "./FetchNotifications";
import DateFilterSection from "./DataFilterSection";
import NotificationCard from "./NotificationCard";
import colors from "../../constants/colors";


const SentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);

      try {
        const data = await fetchNotifications({
          status: "sent",
          ...filters,
        });

        setNotifications(data?.notifications || []);
        setPagination(data?.pagination || {});
      } catch (error) {
        console.error("Failed to fetch sent notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [filters]);

  /* ===========================
     FORMAT DATE
  =========================== */
  const formatDateTime = (dateString) => {
    if (!dateString) return "--";

    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    recharge_2_not_another: "Recharged once, no further recharge",

    completed_3_min_calls: "Completed 3+ Min Calls",

    creators_inactive_yesterday: "Creators Inactive Yesterday",
    creator_inactive_3days: "Creators Inactive (3 Days)",

    custom: "Custom",
  };

  /* ===========================
     DATE FILTER
  =========================== */
  const handleDateFilter = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  /* ===========================
     PAGINATION
  =========================== */
  const handlePrevious = () => {
    if (!pagination.hasPrevPage) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  const handleNext = () => {
    if (!pagination.hasNextPage) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  return (
    <div
      className="w-full flex flex-col gap-6"
      style={{ color: colors.textPrimary }}
    >
      <div
        className="w-full p-6 md:p-8 rounded-3xl border"
        style={{
          background: colors.gradientCard,
          borderColor: colors.cardBorder,
        }}
      >
        {/* ===========================
            DATE FILTER
        =========================== */}
        <DateFilterSection onChange={handleDateFilter} />

        {/* ===========================
            HEADER
        =========================== */}
        <div className="mb-6">
          <h3
            className="text-2xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            Sent{" "}
            <span style={{ color: colors.accent }}>
              Notifications
            </span>
          </h3>

          <p
            className="text-sm mt-1"
            style={{ color: colors.textSecondary }}
          >
            View and monitor previously sent notifications.
          </p>
        </div>

        {/* ===========================
            LOADING
        =========================== */}
        {loading && (
          <div
            className="w-full flex flex-col items-center justify-center py-16 rounded-2xl border"
            style={{
              backgroundColor: colors.secondary,
              borderColor: colors.cardBorder,
            }}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mb-4"
              style={{
                borderColor: colors.accent,
                borderTopColor: "transparent",
              }}
            />

            <p
              className="text-sm font-semibold"
              style={{ color: colors.textSecondary }}
            >
              Loading sent notifications...
            </p>
          </div>
        )}

        {/* ===========================
            EMPTY STATE
        =========================== */}
        {!loading && notifications.length === 0 && (
          <div
            className="w-full flex flex-col items-center justify-center py-16 rounded-2xl border"
            style={{
              backgroundColor: colors.secondary,
              borderColor: colors.cardBorder,
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{
                backgroundColor: colors.hover,
                color: colors.accent,
              }}
            >
              <span className="text-2xl">🔔</span>
            </div>

            <p
              className="text-base font-bold"
              style={{ color: colors.textPrimary }}
            >
              No Sent Notifications
            </p>

            <p
              className="text-sm mt-1"
              style={{ color: colors.textMuted }}
            >
              No sent notifications were found for the selected dates.
            </p>
          </div>
        )}

        {/* ===========================
            NOTIFICATION CARDS
        =========================== */}
        {!loading && notifications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                type="sent"
                title={notification.title}
                subtitle={
                  AUDIENCE_LABEL_MAP[
                    notification.audience?.type
                  ] || notification.audience?.type
                }
                description={notification.message}
                tags={[
                  notification.audience?.type,
                  ...(notification.targetedLanguages || []),
                  notification.campaignTag,
                ].filter(Boolean)}
                footerText={`Sent • Delivered: ${
                  notification.stats?.sent ?? 0
                } • Failed: ${
                  notification.stats?.failed ?? 0
                }`}
                createdBy={notification.createdBy?.name}
                timestamp={formatDateTime(notification.updatedAt)}
              />
            ))}
          </div>
        )}

        {/* ===========================
            PAGINATION
        =========================== */}
        {!loading && pagination.totalPages > 1 && (
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t"
            style={{ borderColor: colors.cardBorder }}
          >
            {/* Previous */}
            <button
              type="button"
              disabled={!pagination.hasPrevPage}
              onClick={handlePrevious}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: pagination.hasPrevPage
                  ? colors.secondary
                  : colors.inputBg,
                color: pagination.hasPrevPage
                  ? colors.textPrimary
                  : colors.textMuted,
                border: `1px solid ${colors.cardBorder}`,
              }}
              onMouseEnter={(e) => {
                if (pagination.hasPrevPage) {
                  e.currentTarget.style.backgroundColor =
                    colors.hover;
                  e.currentTarget.style.borderColor =
                    colors.accent;
                  e.currentTarget.style.color =
                    colors.accent;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  pagination.hasPrevPage
                    ? colors.secondary
                    : colors.inputBg;
                e.currentTarget.style.borderColor =
                  colors.cardBorder;
                e.currentTarget.style.color =
                  pagination.hasPrevPage
                    ? colors.textPrimary
                    : colors.textMuted;
              }}
            >
              ← Previous
            </button>

            {/* Page Info */}
            <div className="flex flex-col items-center">
              <span
                className="text-sm font-bold"
                style={{ color: colors.textPrimary }}
              >
                Page{" "}
                <span style={{ color: colors.accent }}>
                  {pagination.page || filters.page}
                </span>{" "}
                of{" "}
                <span style={{ color: colors.accent }}>
                  {pagination.totalPages}
                </span>
              </span>

              {pagination.totalItems !== undefined && (
                <span
                  className="text-xs mt-1"
                  style={{ color: colors.textMuted }}
                >
                  {pagination.totalItems} notifications
                </span>
              )}
            </div>

            {/* Next */}
            <button
              type="button"
              disabled={!pagination.hasNextPage}
              onClick={handleNext}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: pagination.hasNextPage
                  ? colors.accent
                  : colors.inputBg,
                color: pagination.hasNextPage
                  ? colors.buttonText
                  : colors.textMuted,
                border: `1px solid ${
                  pagination.hasNextPage
                    ? colors.accent
                    : colors.cardBorder
                }`,
              }}
              onMouseEnter={(e) => {
                if (pagination.hasNextPage) {
                  e.currentTarget.style.background =
                    colors.gradientButton;
                  e.currentTarget.style.transform =
                    "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  colors.accent;
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentNotifications;