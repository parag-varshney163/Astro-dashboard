// import React, { useCallback, useEffect, useState } from "react";
// import { Edit2, Trash2 } from "lucide-react";
// import axiosInstance from "../../api/axiosInstance";
// import ExperimentModal from "./ExperimentModal";
// import colors from "../../constants/colors";
// import DataTable from "../ui/DataTable";
// const ExperimentsTable = ({
//   onEdit = () => {},
//   onDelete = () => {},
// }) => {
//   const [experiments, setExperiments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const fetchExperiments = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const { data } = await axiosInstance.get(
//         "/api/v1/experiments"
//       );
//       setExperiments(data?.data || []);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err?.response?.data?.message ||
//           "Unable to fetch experiments."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);
//   useEffect(() => {
//     fetchExperiments();
//   }, [fetchExperiments]);
//   const columns = [
//     {
//       key: "experimentKey",
//       label: "Experiment",
//       width: "1.8fr",
//       render: (_, row) => (
//         <div className="flex flex-col">
//           <span
//             style={{
//               color: colors.textPrimary,
//               fontWeight: 600,
//             }}
//           >
//             {row.experimentKey}
//           </span>
//           <span
//             style={{
//               color: colors.textMuted,
//               fontSize: 12,
//             }}
//           >
//             {row._id}
//           </span>
//         </div>
//       ),
//     },
//     {
//       key: "variants",
//       label: "Variants",
//       width: "2.5fr",
//       render: (variants = []) => (
//         <div className="flex flex-col gap-2 w-full">
//           {variants.map((variant, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center"
//             >
//               <span
//                 style={{
//                   color: colors.textPrimary,
//                   fontSize: 13,
//                 }}
//               >
//                 {variant.key}
//               </span>
//               <span
//                 style={{
//                   color: colors.accent,
//                   fontWeight: 600,
//                 }}
//               >
//                 {variant.weight}%
//               </span>
//             </div>
//           ))}
//         </div>
//       ),
//     },
//     {
//       key: "isActive",
//       label: "Status",
//       width: "1fr",
//       render: (value) => (
//         <span
//           style={{
//             padding: "6px 14px",
//             borderRadius: 999,
//             background: value
//               ? "rgba(61,190,108,.15)"
//               : "rgba(224,82,82,.15)",
//             color: value ? colors.success : colors.danger,
//             fontWeight: 600,
//           }}
//         >
//           {value ? "Active" : "Inactive"}
//         </span>
//       ),
//     },
//     {
//       key: "overrideList",
//       label: "Overrides",
//       width: "0.8fr",
//       render: (value = []) => (
//         <span
//           style={{
//             color: colors.accent,
//             fontWeight: 600,
//           }}
//         >
//           {value.length}
//         </span>
//       ),
//     },
//     {
//       key: "createdAt",
//       label: "Created",
//       width: "1.2fr",
//       render: (value) =>
//         new Date(value).toLocaleDateString(),
//     },
//     {
//       key: "updatedAt",
//       label: "Updated",
//       width: "1.2fr",
//       render: (value) =>
//         new Date(value).toLocaleDateString(),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       width: "1fr",
//       render: (_, row) => (
//         <div className="flex justify-center gap-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit(row);
//             }}
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: 10,
//               background: colors.cardBg,
//               border: `1px solid ${colors.cardBorder}`,
//               color: colors.accent,
//             }}
//           >
//             <Edit2 size={16} />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(row);
//             }}
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: 10,
//               background: "rgba(224,82,82,.15)",
//               border: `1px solid ${colors.danger}`,
//               color: colors.danger,
//             }}
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <>
//     <DataTable
//       columns={columns}
//       data={experiments}
//       loading={loading}
//       error={error}
//       rowStyle={{
//         minHeight: 72,
//       }}
//     />
//      <ExperimentModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         experiment={selectedExperiment}
//         onSuccess={handleSuccess}
//       />
//     </>
//   );
// };
// export default ExperimentsTable;
import React, { useCallback, useEffect, useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import ExperimentModal from "./ExperimentModal";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";
import Button from "../ui/Button";


const ExperimentsTable = () => {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  // --------------------------------------------------
  // Fetch experiments
  // --------------------------------------------------
  const fetchExperiments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axiosInstance.get(
        "/api/v1/experiments"
      );

      setExperiments(data?.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to fetch experiments."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiments();
  }, [fetchExperiments]);

  // --------------------------------------------------
  // Create
  // --------------------------------------------------
  const handleCreate = () => {
    setSelectedExperiment(null);
    setShowModal(true);
  };

  // --------------------------------------------------
  // Edit
  // --------------------------------------------------
  const handleEdit = (row) => {
    setSelectedExperiment(row);
    setShowModal(true);
  };

  // --------------------------------------------------
  // Modal success
  // --------------------------------------------------
  const handleSuccess = async () => {
    await fetchExperiments();
  };

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------
  const handleDelete = async (row) => {
    // Your API screenshot only shows POST/PUT.
    // So don't call DELETE until you have the DELETE endpoint.
    console.log("Delete experiment:", row);
  };

  const columns = [
    {
      key: "experimentKey",
      label: "Experiment",
      width: "1.8fr",

      render: (_, row) => (
        <div className="flex flex-col">
          <span
            style={{
              color: colors.textPrimary,
              fontWeight: 600,
            }}
          >
            {row.experimentKey}
          </span>

          <span
            style={{
              color: colors.textMuted,
              fontSize: 12,
            }}
          >
            {row._id}
          </span>
        </div>
      ),
    },

    {
      key: "variants",
      label: "Variants",
      width: "2.5fr",

      render: (variants = []) => (
        <div className="flex flex-col gap-2 w-full">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="flex justify-between items-center"
            >
              <span
                style={{
                  color: colors.textPrimary,
                  fontSize: 13,
                }}
              >
                {variant.key}
              </span>

              <span
                style={{
                  color: colors.accent,
                  fontWeight: 600,
                }}
              >
                {variant.weight}%
              </span>
            </div>
          ))}
        </div>
      ),
    },

    {
      key: "isActive",
      label: "Status",
      width: "1fr",

      render: (value) => (
        <span
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            background: value
              ? "rgba(61,190,108,.15)"
              : "rgba(224,82,82,.15)",
            color: value
              ? colors.success
              : colors.danger,
            fontWeight: 600,
          }}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      key: "overrideList",
      label: "Overrides",
      width: "0.8fr",

      render: (value = []) => (
        <span
          style={{
            color: colors.accent,
            fontWeight: 600,
          }}
        >
          {value.length}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Created",
      width: "1.2fr",

      render: (value) =>
        value
          ? new Date(value).toLocaleDateString()
          : "-",
    },

    {
      key: "updatedAt",
      label: "Updated",
      width: "1.2fr",

      render: (value) =>
        value
          ? new Date(value).toLocaleDateString()
          : "-",
    },

    {
      key: "actions",
      label: "Actions",
      width: "1fr",

      render: (_, row) => (
        <div className="flex justify-center gap-2">
          {/* EDIT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title="Edit experiment"
          >
            <Edit2 size={16} />
          </button>

          {/* DELETE */}
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(224,82,82,.15)",
              border: `1px solid ${colors.danger}`,
              color: colors.danger,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title="Delete experiment"
          >
            <Trash2 size={16} />
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <>
      {/* ============================================
          HEADER / CREATE BUTTON
      ============================================ */}
      <div className="flex justify-end mb-4">
        <Button
          type="button"
          onClick={handleCreate}
          style={{
            background: colors.gradientButton,
            color: colors.buttonText,
          }}
        >
          <span className="flex items-center gap-2">
            <Plus size={17} />
            Create Experiment
          </span>
        </Button>
      </div>

      {/* ============================================
          TABLE
      ============================================ */}
      <DataTable
        columns={columns}
        data={experiments}
        loading={loading}
        error={error}
        rowStyle={{
          minHeight: 72,
        }}
      />

      {/* ============================================
          CREATE / EDIT MODAL
      ============================================ */}
      <ExperimentModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedExperiment(null);
        }}
        experiment={selectedExperiment}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default ExperimentsTable;
