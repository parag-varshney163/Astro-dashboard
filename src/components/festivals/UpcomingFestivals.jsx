// import React, { useEffect, useState } from "react";
// import { Plus } from "lucide-react";
// import CreateFestivalModal from "./CreateFestivalModal";
// import DashboardLoader from "../ui/DashboardLoader";
// import axiosInstance from "../../api/axiosInstance";
// import colors from "../../constants/colors";
// import DataTable from "../ui/DataTable";
// import Button from "../ui/Button";
// const UpcomingFestivals = () => {
//     const [festivals, setFestivals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [openModal, setOpenModal] = useState(false);
//     const fetchFestivals = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axiosInstance.get(
//                 "/api/v1/festivals/upcoming"
//             );
//             if (data.success) {
//                 setFestivals(data.data || []);
//             }
//         } catch (error) {
//             console.error("Error fetching upcoming festivals:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchFestivals();
//     }, []);
//     const columns = [
//         {
//             key: "name",
//             label: "Festival",
//             width: "1.4fr",
//             cellStyle: {
//                 justifyContent: "flex-start",
//                 textAlign: "left",
//             },
//             render: (value, row) => (
//                 <div className="flex items-center gap-3 w-full">
//                     {/* Festival Image */}
//                     <div
//                         className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
//                         style={{
//                             background: colors.secondary,
//                             border: `1px solid ${colors.cardBorder}`,
//                         }}
//                     >
//                         {row.imageUrl ? (
//                             <img
//                                 src={row.imageUrl}
//                                 alt={value}
//                                 className="w-full h-full object-cover"
//                             />
//                         ) : (
//                             <div
//                                 className="w-full h-full flex items-center justify-center text-xs"
//                                 style={{ color: colors.textSecondary }}
//                             >
//                                 N/A
//                             </div>
//                         )}
//                     </div>
//                     <div>
//                         <div
//                             className="font-semibold"
//                             style={{ color: colors.textPrimary }}
//                         >
//                             {value || "-"}
//                         </div>
//                         <div
//                             className="text-xs mt-1 line-clamp-1"
//                             style={{ color: colors.textSecondary }}
//                         >
//                             {row.description || "-"}
//                         </div>
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             key: "date",
//             label: "Date",
//             render: (value) => {
//                 if (!value) return "-";
//                 return (
//                     <div
//                         className="font-medium"
//                         style={{ color: colors.accent }}
//                     >
//                         {new Date(value).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                         })}
//                     </div>
//                 );
//             },
//         },
//         {
//             key: "daysLeft",
//             label: "Days Left",
//             render: (value) => (
//                 <div className="flex justify-center">
//                     <span
//                         className="px-3 py-1 rounded-lg text-xs font-semibold"
//                         style={{
//                             background:
//                                 value === 0
//                                     ? colors.success
//                                     : colors.accent,
//                             color: colors.primary,
//                         }}
//                     >
//                         {value === 0 ? "Today" : `${value} days`}
//                     </span>
//                 </div>
//             ),
//         },
//         {
//             key: "category",
//             label: "Category",
//             render: (value) => (
//                 <span
//                     className="px-3 py-1 rounded-lg text-xs font-semibold capitalize"
//                     style={{
//                         background: colors.secondary,
//                         color: colors.accent,
//                         border: `1px solid ${colors.cardBorder}`,
//                     }}
//                 >
//                     {value || "-"}
//                 </span>
//             ),
//         },
//         {
//             key: "isActive",
//             label: "Status",
//             render: (value) => (
//                 <div className="flex justify-center">
//                     <span
//                         className="px-3 py-1 rounded-lg text-xs font-semibold"
//                         style={{
//                             background: value
//                                 ? colors.success
//                                 : colors.danger,
//                             color: colors.primary,
//                         }}
//                     >
//                         {value ? "Active" : "Inactive"}
//                     </span>
//                 </div>
//             ),
//         },
//     ];
//     if (loading) {
//         return <DashboardLoader />;
//     }
//     return (
//         <div
//             className="rounded-3xl p-6 mt-8"
//             style={{
//                 background: colors.gradientVertical,
//                 border: `1px solid ${colors.cardBorder}`,
//                 boxShadow: `0 0 10px ${colors.shadow}`,
//             }}
//         >
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//                 <div>
//                     <h2
//                         className="text-2xl font-semibold"
//                         style={{ color: colors.textPrimary }}
//                     >
//                         Upcoming{" "}
//                         <span style={{ color: colors.accent }}>
//                             Festivals
//                         </span>
//                     </h2>
//                     <p
//                         className="text-sm mt-1"
//                         style={{ color: colors.textSecondary }}
//                     >
//                         Upcoming festivals and their schedules
//                     </p>
//                 </div>
//                 <div
//                     className="px-4 py-2 rounded-lg text-sm font-semibold"
//                     style={{
//                         background: colors.secondary,
//                         color: colors.accent,
//                         border: `1px solid ${colors.cardBorder}`,
//                     }}
//                 >
//                     {festivals.length} Festivals
//                 </div>
//                 <Button
//                     icon={Plus}
//                     onClick={() => setOpenModal(true)}
//                 >
//                     Create Festival
//                 </Button>
//             </div>
//             {/* Table */}
//             {festivals.length === 0 ? (
//                 <div
//                     className="text-center py-10"
//                     style={{ color: colors.textSecondary }}
//                 >
//                     No upcoming festivals found.
//                 </div>
//             ) : (
//                 <DataTable
//                     columns={columns}
//                     data={festivals}
//                 />
//             )}
//             <CreateFestivalModal
//                 isOpen={openModal}
//                 onClose={() => setOpenModal(false)}
//                 onSuccess={fetchFestivals}
//             />
//         </div>
//     );
// };
// export default UpcomingFestivals;
import React, { useEffect, useState } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";

import CreateFestivalModal from "./CreateFestivalModal";
import DashboardLoader from "../ui/DashboardLoader";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";
import Button from "../ui/Button";


const UpcomingFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchFestivals = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        "/api/v1/festivals/upcoming"
      );

      if (data.success) {
        setFestivals(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching upcoming festivals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  // =========================
  // CREATE
  // =========================
  const handleCreate = () => {
    setSelectedFestival(null);
    setOpenModal(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (festival) => {
    setSelectedFestival(festival);
    setOpenModal(true);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (festival) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${festival?.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(true);

      const response = await axiosInstance.delete(
        `/api/v1/festivals/${festival._id}`
      );

      if (response.data?.success) {
        await fetchFestivals();
      } else {
        alert(
          response.data?.message ||
            "Failed to delete festival."
        );
      }
    } catch (error) {
      console.error("Delete festival error:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete festival."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Festival",
      width: "1.4fr",
      cellStyle: {
        justifyContent: "flex-start",
        textAlign: "left",
      },
      render: (value, row) => (
        <div className="flex items-center gap-3 w-full">
          {/* Festival Image */}
          <div
            className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
            style={{
              background: colors.secondary,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            {row.imageUrl ? (
              <img
                src={row.imageUrl}
                alt={value}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xs"
                style={{
                  color: colors.textSecondary,
                }}
              >
                N/A
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div
              className="font-semibold"
              style={{
                color: colors.textPrimary,
              }}
            >
              {value || "-"}
            </div>

            <div
              className="text-xs mt-1 line-clamp-1"
              style={{
                color: colors.textSecondary,
              }}
            >
              {row.description || "-"}
            </div>
          </div>
        </div>
      ),
    },

    {
      key: "date",
      label: "Date",
      render: (value) => {
        if (!value) return "-";

        return (
          <div
            className="font-medium"
            style={{
              color: colors.accent,
            }}
          >
            {new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        );
      },
    },

    {
      key: "daysLeft",
      label: "Days Left",
      render: (value) => (
        <div className="flex justify-center">
          <span
            className="px-3 py-1 rounded-lg text-xs font-semibold"
            style={{
              background:
                value === 0
                  ? colors.success
                  : colors.accent,
              color: colors.primary,
            }}
          >
            {value === 0 ? "Today" : `${value} days`}
          </span>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
      render: (value) => (
        <span
          className="px-3 py-1 rounded-lg text-xs font-semibold capitalize"
          style={{
            background: colors.secondary,
            color: colors.accent,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          {value || "-"}
        </span>
      ),
    },

    {
      key: "isActive",
      label: "Status",
      render: (value) => (
        <div className="flex justify-center">
          <span
            className="px-3 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: value
                ? colors.success
                : colors.danger,
              color: colors.primary,
            }}
          >
            {value ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },

    // =========================
    // ACTIONS
    // =========================
    {
      key: "actions",
      label: "Action",
      width: "1.2fr",
      align: "center",
      render: (_, row) => (
        <div
          className="flex items-center justify-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* EDIT */}
          <button
            type="button"
            onClick={() => handleEdit(row)}
            disabled={deleteLoading}
            title="Edit Festival"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: `1px solid ${colors.cardBorder}`,
              background: colors.secondary,
              color: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: deleteLoading
                ? "not-allowed"
                : "pointer",
              opacity: deleteLoading ? 0.5 : 1,
            }}
          >
            <Edit2 size={16} />
          </button>

          {/* DELETE */}
          <button
            type="button"
            onClick={() => handleDelete(row)}
            disabled={deleteLoading}
            title="Delete Festival"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: `1px solid ${colors.danger}`,
              background: "transparent",
              color: colors.danger,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: deleteLoading
                ? "not-allowed"
                : "pointer",
              opacity: deleteLoading ? 0.5 : 1,
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <div
      className="rounded-3xl p-6 mt-8"
      style={{
        background: colors.gradientVertical,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: `0 0 10px ${colors.shadow}`,
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-semibold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Upcoming{" "}
            <span style={{ color: colors.accent }}>
              Festivals
            </span>
          </h2>

          <p
            className="text-sm mt-1"
            style={{
              color: colors.textSecondary,
            }}
          >
            Upcoming festivals and their schedules
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* COUNT */}
          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: colors.secondary,
              color: colors.accent,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            {festivals.length} Festivals
          </div>

          {/* CREATE */}
          <Button
            icon={Plus}
            onClick={handleCreate}
          >
            Create Festival
          </Button>
        </div>
      </div>

      {/* TABLE */}
      {festivals.length === 0 ? (
        <div
          className="text-center py-10"
          style={{
            color: colors.textSecondary,
          }}
        >
          No upcoming festivals found.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={festivals}
        />
      )}

      {/* CREATE / EDIT MODAL */}
      <CreateFestivalModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedFestival(null);
        }}
        onSuccess={fetchFestivals}
        festival={selectedFestival}
      />
    </div>
  );
};

export default UpcomingFestivals;