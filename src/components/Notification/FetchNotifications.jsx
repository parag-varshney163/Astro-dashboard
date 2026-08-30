// // import React from "react";
// // import axios from "axios";
// // export const fetchNotifications = async ({
// //   status,
// //   fromDate,
// //   endDate,
// // }) => {
// //   const params = {};
// //   if (status) params.status = status;
// //   if (fromDate) params.fromDate = fromDate;
// //   if (endDate) params.endDate = endDate;
// //   const res = await axios.get(
// //     "https://api.chatspark.in/api/v1/notifications/filter",
// //     {
// //       params,
// //       // withCredentials: true,
// //       headers: {
// //         Authorization: `Bearer ${localStorage.getItem("token")}`,
// //       },
// //     }
// //   );
// //   return res.data?.data || [];
// // };
import axios from "axios";


const BASE_URL = "https://sandbox.agamiastro.in/api/v1/notifications";

// /* ===========================
//    FETCH NOTIFICATIONS
// =========================== */
// export const fetchNotifications = async ({ status, fromDate, endDate }) => {
//   const params = {};

//   if (status) params.status = status;
//   if (fromDate) params.fromDate = fromDate;
//   if (endDate) params.endDate = endDate;

//   const res = await axios.get(`${BASE_URL}/filter`, {
//     params,
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   return res.data?.data || [];
// };

// /* ===========================
//    DELETE NOTIFICATION
// =========================== */
// export const deleteNotification = async (id) => {
//   const res = await axios.delete(`${BASE_URL}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   return res.data;
// };


export const fetchNotifications = async ({
  status,
  fromDate,
  endDate,
  limit,
  page,
}) => {
  const params = {};

  if (status) params.status = status;
  if (fromDate) params.fromDate = fromDate;
  if (endDate) params.endDate = endDate;
  if (limit) params.limit = limit;
  if (page) params.page = page;

  const res = await axios.get(`${BASE_URL}/filter`, {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data?.data || [];
};
/* ===========================
   DELETE NOTIFICATION
=========================== */
export const deleteNotification = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};
