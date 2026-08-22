// // src/pages/CustomerSupport.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import FiltersHeader from "../components/customer-support/FiltersHeader";
// import CustomerStats from "../components/customer-support/CustomerStats";
// import ChatTabs from "../components/customer-support/ChatTabs";
// import axiosInstance from "../api/axiosInstance";
// import Sidebar from "../components/ui/Sidebar";
// import Navbar from "../components/ui/Navbar";
// import colors from "../constants/colors";
// const CustomerSupport = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   /* =========================
//      FILTER STATE (GLOBAL)
//   ========================= */
//   const [filters, setFilters] = useState({
//     filter: "escalated_by_chatbot",      // ticket status
//     priority: "",
//     issueType: "",
//     dateFilter: "",
//     search: "",
//   });
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   /* =========================
//      FETCH TICKETS (FIXED)
//   ========================= */
//   const fetchTickets = async () => {
//     try {
//       setLoading(true);
//       const cleanedFilters = Object.fromEntries(
//         Object.entries(filters).filter(
//           ([_, value]) =>
//             value !== "" && value !== null && value !== undefined
//         )
//       );
//       const res = await axiosInstance.get(
//         "/api/v1/customer/tickets",
//         { params: cleanedFilters }
//       );
//       if (res.data?.success) {
//         setTickets(res.data.data || []);
//       }
//     } catch (err) {
//       console.error("Ticket fetch failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   /* =========================
//      FETCH ON FILTER CHANGE
//   ========================= */
//   useEffect(() => {
//     fetchTickets();
//   }, [filters]);
//   return (
//     <div
//       className="min-h-screen flex text-white overflow-hidden "
//       style={{ background: colors.gradientVertical,zoom:"95%" }}
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
//         transition={{ duration: 0.4 }}
//         className="p-6 overflow-y-auto scrollbar-hide"
//       >
//         <Navbar />
//         <div className="space-y-6">
//           <CustomerStats />
//           {/* 🔹 Filters */}
//           <FiltersHeader
//             filters={filters}
//             setFilters={setFilters}
//           />
//           {/* 🔹 Tabs + Tickets */}
//           <ChatTabs
//             filters={filters}
//             setFilters={setFilters}
//             tickets={tickets}
//             loading={loading}
//             refreshTickets={fetchTickets}
//           />
//         </div>
//       </motion.main>
//     </div>
//   );
// };
// export default CustomerSupport;
// src/pages/CustomerSupport.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import FiltersHeader from "../components/customer-support/FiltersHeader";
import CustomerStats from "../components/customer-support/CustomerStats";
import ChatTabs from "../components/customer-support/ChatTabs";
import agamiastroinstance from "../api/agamiastroinstance";
import axiosInstance from "../api/axiosInstance";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import colors from "../constants/colors";


const CustomerSupport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================
     FILTER STATE
  ========================= */

  const [filters, setFilters] = useState({
    filter: "escalated_by_chatbot",
    priority: "",
    issueType: "",
    dateFilter: "",
    search: "",
  });

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH TICKETS
  ========================= */

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
        )
      );

      const res = await axiosInstance.get(
        "/api/v1/customer/tickets",
        {
          params: cleanedFilters,
        }
      );

      if (res.data?.success) {
        setTickets(res.data.data || []);
      }
    } catch (err) {
      console.error("Ticket fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FETCH ON FILTER CHANGE
  ========================= */

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  return (
    <div
      className="min-h-screen w-full flex overflow-hidden"
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* =========================
          BACKGROUND GLOW
      ========================= */}

      <div
        className="fixed pointer-events-none"
        style={{
          width: "450px",
          height: "450px",
          top: "-220px",
          left: "35%",
          borderRadius: "50%",
          background: colors.hover,
          filter: "blur(130px)",
          opacity: 0.7,
        }}
      />

      <div
        className="fixed pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          right: "-180px",
          bottom: "5%",
          borderRadius: "50%",
          background: colors.hover,
          filter: "blur(120px)",
          opacity: 0.5,
        }}
      />

      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <motion.main
        animate={{
          marginLeft: sidebarOpen ? 220 : 70,
          width: sidebarOpen
            ? "calc(100% - 220px)"
            : "calc(100% - 70px)",
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="relative z-10 min-h-screen p-6 overflow-y-auto scrollbar-hide"
        style={{
          color: colors.textPrimary,
          zoom: "95%",
        }}
      >
        {/* =========================
            NAVBAR
        ========================= */}

        <Navbar />

        {/* =========================
            CONTENT
        ========================= */}

        <div className="space-y-6">

          {/* Stats */}
          <CustomerStats />

          {/* =========================
              FILTERS
          ========================= */}

          <div
            className="rounded-2xl p-[1px]"
            style={{
              background: colors.gradientBorder,
              boxShadow:
                "0 15px 50px rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="rounded-2xl"
              style={{
                background: colors.gradientCard,
              }}
            >
              <FiltersHeader
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>

          {/* =========================
              CHAT TABS / TICKETS
          ========================= */}

          <div
            className="rounded-2xl p-[1px]"
            style={{
              background: colors.gradientBorder,
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.30)",
            }}
          >
            <div
              className="rounded-2xl"
              style={{
                background: colors.gradientCard,
              }}
            >
              <ChatTabs
                filters={filters}
                setFilters={setFilters}
                tickets={tickets}
                loading={loading}
                refreshTickets={fetchTickets}
              />
            </div>
          </div>

        </div>

        {/* =========================
            FOOTER
        ========================= */}

        <div
          className="text-center py-6"
          style={{
            color: colors.textMuted,
            fontSize: "11px",
          }}
        >
          © {new Date().getFullYear()} ChatSpark. All rights
          reserved.
        </div>
      </motion.main>
    </div>
  );
};

export default CustomerSupport;