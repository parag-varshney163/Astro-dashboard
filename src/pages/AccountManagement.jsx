// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import DashboardOverview from "../components/account-management/DashboardOverview";
// import FiltersSection from "../components/account-management/FiltersSection";
// import AccountTable from "../components/account-management/AccountTable";
// import DashboardLoader from "../components/ui/DashboardLoader";
// import axiosInstance from "../api/axiosInstance";
// import Sidebar from "../components/ui/Sidebar";
// import Navbar from "../components/ui/Navbar";
// import colors from "../constants/colors";
// const AccountManagement = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [filters, setFilters] = useState({
//     search: "",
//     action: "",
//     role: "",
//     page: 1,
//     limit: 10,
//   });
//   const [loading, setLoading] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [pagination, setPagination] = useState({
//     totalPages: 1,
//     totalRecords: 0,
//   });
//   const fetchAccountData = async () => {
//     try {
//       setLoading(true);
//       const params = {
//         search: filters.search,
//         action: filters.action,
//         role: filters.role,
//         page: filters.page,
//         limit: filters.limit,
//       };
//       const res = await axiosInstance.get("/api/v1/customer/deletion-requests/search", { params });
//       if (res.data?.success) {
//         setTableData(
//           res.data.data.data.map((item) => {
//             const time =
//               item.action === "requested"
//                 ? item.createdAt
//                 : item.updatedAt;
//             return {
//               ...item,
//               creatorId: item.userId,
//               totalTime: `${Math.floor(item.totalTimeOnline / 60)}h ${item.totalTimeOnline % 60}m`,
//               amountSpent: item.amountSpent,
//               totalCalls: item.totalCalls,
//               lastActive: item.lastActive
//                 ? new Date(item.lastActive).toLocaleString()
//                 : "N/A",
//               requestTime: time
//                 ? new Date(time).toLocaleString()
//                 : "N/A",
//               status: item.action, // requested | approved | rejected
//             };
//           })
//         );
//         setPagination({
//           totalPages: res.data.data.totalPages,
//           totalRecords: res.data.data.totalRecords,
//         });
//       }
//     } catch (err) {
//       console.error("Failed to fetch deletion requests:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchAccountData();
//   }, [filters, refreshKey]);
//   useEffect(() => {
//     setFilters((f) => ({ ...f, page: 1 }));
//   }, [filters.search, filters.action, filters.role]);
//   return (
//     <div
//       className="min-h-screen flex text-white overflow-hidden"
//       style={{ background: colors.gradientVertical }}
//     >
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//       <motion.main
//         animate={{
//           marginLeft: sidebarOpen ? 220 : 70,
//           width: sidebarOpen ? "calc(100% - 220px)" : "calc(100% - 70px)",
//         }}
//         transition={{ duration: 0.4, type: "tween" }}
//         className="p-6 overflow-y-auto scrollbar-hide"
//       >
//         <Navbar />
//         <div className="space-y-6">
//           <DashboardOverview />
//           <FiltersSection
//             filters={filters}
//             setFilters={setFilters}
//             fetchData={fetchAccountData}
//           />
//           {loading ? <DashboardLoader/> : <AccountTable data={tableData} page={filters.page}
//             totalPages={pagination.totalPages}
//             onPageChange={(page) =>
//               setFilters((f) => ({ ...f, page }))
//             } onResolved={() => setRefreshKey((k) => k + 1)} />}
//         </div>
//       </motion.main>
//     </div>
//   );
// };
// export default AccountManagement;
// src/pages/AccountManagement.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardOverview from "../components/account-management/DashboardOverview";
import FiltersSection from "../components/account-management/FiltersSection";
import AccountTable from "../components/account-management/AccountTable";
import DashboardLoader from "../components/ui/DashboardLoader";
import axiosInstance from "../api/axiosInstance";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import colors from "../constants/colors";


const AccountManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    action: "",
    role: "",
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalRecords: 0,
  });

  /* ==========================================
     FETCH ACCOUNT DATA
  ========================================== */

  const fetchAccountData = async () => {
    try {
      setLoading(true);

      const params = {
        search: filters.search,
        action: filters.action,
        role: filters.role,
        page: filters.page,
        limit: filters.limit,
      };

      const res = await axiosInstance.get(
        "/api/v1/customer/deletion-requests/search",
        {
          params,
        }
      );

      if (res.data?.success) {
        const records = res.data?.data?.data || [];

        setTableData(
          records.map((item) => {
            const time =
              item.action === "requested"
                ? item.createdAt
                : item.updatedAt;

            return {
              ...item,

              creatorId: item.userId,

              totalTime: `${Math.floor(
                item.totalTimeOnline / 60
              )}h ${item.totalTimeOnline % 60}m`,

              amountSpent: item.amountSpent,

              totalCalls: item.totalCalls,

              lastActive: item.lastActive
                ? new Date(item.lastActive).toLocaleString()
                : "N/A",

              requestTime: time
                ? new Date(time).toLocaleString()
                : "N/A",

              status: item.action,
            };
          })
        );

        setPagination({
          totalPages: res.data?.data?.totalPages || 1,
          totalRecords: res.data?.data?.totalRecords || 0,
        });
      }
    } catch (err) {
      console.error(
        "Failed to fetch deletion requests:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
     FETCH WHEN FILTER / PAGE CHANGES
  ========================================== */

  useEffect(() => {
    fetchAccountData();
  }, [filters, refreshKey]);

  /* ==========================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================== */

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      page: 1,
    }));
  }, [
    filters.search,
    filters.action,
    filters.role,
  ]);

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <div
      className="
        min-h-screen
        flex
        text-white
        overflow-hidden
        relative
      "
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* ======================================
          BACKGROUND GOLD GLOW
      ====================================== */}

      <div
        className="
          fixed
          pointer-events-none
          rounded-full
        "
        style={{
          width: "500px",
          height: "500px",
          top: "-280px",
          left: "50%",
          transform: "translateX(-50%)",
          background: colors.hover,
          filter: "blur(130px)",
          opacity: 0.45,
        }}
      />

      {/* Left Glow */}

      <div
        className="
          fixed
          pointer-events-none
          rounded-full
        "
        style={{
          width: "350px",
          height: "350px",
          left: "-220px",
          top: "35%",
          background: colors.hover,
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />

      {/* Right Glow */}

      <div
        className="
          fixed
          pointer-events-none
          rounded-full
        "
        style={{
          width: "350px",
          height: "350px",
          right: "-220px",
          bottom: "10%",
          background: colors.hover,
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <motion.main
        animate={{
          marginLeft: sidebarOpen ? 220 : 70,
          width: sidebarOpen
            ? "calc(100% - 220px)"
            : "calc(100% - 70px)",
        }}
        transition={{
          duration: 0.4,
          type: "tween",
        }}
        className="
          relative
          z-10
          min-h-screen
          p-6
          overflow-y-auto
          scrollbar-hide
        "
      >
        {/* ====================================
            NAVBAR
        ==================================== */}

        <Navbar />

        {/* ====================================
            CONTENT
        ==================================== */}

        <div className="space-y-6">

          {/* Dashboard Overview */}

          <div
            className="rounded-2xl"
            style={{
              color: colors.textPrimary,
            }}
          >
            <DashboardOverview />
          </div>

          {/* ==================================
              FILTERS
          ================================== */}

          <div
            className="rounded-2xl"
            style={{
              background: colors.gradientCard,
              border: `1px solid ${colors.cardBorder}`,
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.25)",
            }}
          >
            <FiltersSection
              filters={filters}
              setFilters={setFilters}
              fetchData={fetchAccountData}
            />
          </div>

          {/* ==================================
              TABLE
          ================================== */}

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: colors.gradientCard,
              border: `1px solid ${colors.cardBorder}`,
              boxShadow:
                "0 15px 50px rgba(0,0,0,0.30)",
            }}
          >
            {loading ? (
              <DashboardLoader />
            ) : (
              <AccountTable
                data={tableData}
                page={filters.page}
                totalPages={pagination.totalPages}
                onPageChange={(page) =>
                  setFilters((f) => ({
                    ...f,
                    page,
                  }))
                }
                onResolved={() =>
                  setRefreshKey((k) => k + 1)
                }
              />
            )}
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default AccountManagement;