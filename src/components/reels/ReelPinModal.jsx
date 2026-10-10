// import { Pin, PinOff, X, Loader2 } from "lucide-react";
// import React, { useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import colors from "../../constants/colors";
// const PIN_CATEGORIES = [
//   { value: "all", label: "All Categories" },
//   { value: "for_you", label: "For You" },
//   { value: "mantras", label: "Mantras" },
//   { value: "aarti", label: "Aarti" },
//   { value: "motivation", label: "Motivation" },
//   { value: "trending", label: "Trending" },
// ];
// const ReelPinModal = ({ reel, mode, onClose, refresh }) => {
//   const [selectedCategories, setSelectedCategories] = useState(
//     mode === "unpin"
//       ? []
//       : ["all"]
//   );
//   const [order, setOrder] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const handleCategoryChange = (e) => {
//     const values = Array.from(e.target.selectedOptions).map(
//       (option) => option.value
//     );
//     // "all" represents all categories and cannot be combined
//     // with individual categories.
//     if (values.includes("all")) {
//       setSelectedCategories(["all"]);
//     } else {
//       setSelectedCategories(values);
//     }
//     setError("");
//   };
//   const handleSubmit = async () => {
//     if (!selectedCategories.length) {
//       setError("Please select at least one category.");
//       return;
//     }
//     if (
//       mode === "pin" &&
//       (!Number.isInteger(Number(order)) || Number(order) < 1)
//     ) {
//       setError("Pin order must be a positive whole number.");
//       return;
//     }
//     try {
//       setLoading(true);
//       setError("");
//       const id = reel._id || reel.id;
//       if (mode === "pin") {
//         await axiosInstance.put(
//           `/api/v1/admin-reels/${id}/pin`,
//           {
//             categories: selectedCategories,
//             category: selectedCategories.includes("all")
//               ? "all"
//               : selectedCategories[0],
//             order: Number(order),
//           }
//         );
//       } else {
//         await axiosInstance.delete(
//           `/api/v1/admin-reels/${id}/pin`,
//           {
//             params: {
//               categories: selectedCategories.join(","),
//             },
//           }
//         );
//       }
//       await refresh();
//       onClose();
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           `Failed to ${mode === "pin" ? "pin" : "unpin"} reel.`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     borderRadius: 10,
//     border: `1px solid ${colors.inputBorder}`,
//     background: colors.inputBg,
//     color: colors.textPrimary,
//     outline: "none",
//     boxSizing: "border-box",
//   };
//   return (
//     <div
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget && !loading) onClose();
//       }}
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 10000,
//         background: colors.overlay,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 460,
//           background: colors.cardBg,
//           border: `1px solid ${colors.cardBorder}`,
//           borderRadius: 18,
//           padding: 22,
//           boxShadow: "0 20px 60px rgba(0,0,0,.5)",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 20,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             {mode === "pin" ? (
//               <Pin color={colors.accent} size={21} />
//             ) : (
//               <PinOff color={colors.danger} size={21} />
//             )}
//             <h2
//               style={{
//                 color: colors.textPrimary,
//                 fontSize: 20,
//                 margin: 0,
//               }}
//             >
//               {mode === "pin" ? "Pin Reel" : "Unpin Reel"}
//             </h2>
//           </div>
//           <button
//             type="button"
//             disabled={loading}
//             onClick={onClose}
//             style={{
//               background: "transparent",
//               border: "none",
//               color: colors.textSecondary,
//               cursor: "pointer",
//             }}
//           >
//             <X size={20} />
//           </button>
//         </div>
//         <div
//           style={{
//             color: colors.textSecondary,
//             fontSize: 13,
//             marginBottom: 16,
//           }}
//         >
//           Reel:{" "}
//           <span style={{ color: colors.textPrimary, fontWeight: 600 }}>
//             {reel.title}
//           </span>
//         </div>
//         {error && (
//           <div
//             style={{
//               color: colors.danger,
//               marginBottom: 14,
//               fontSize: 13,
//             }}
//           >
//             {error}
//           </div>
//         )}
//         <label
//           style={{
//             display: "block",
//             color: colors.textSecondary,
//             fontSize: 13,
//             marginBottom: 8,
//             fontWeight: 600,
//           }}
//         >
//           Select Categories *
//         </label>
//         <select
//           multiple
//           value={selectedCategories}
//           onChange={handleCategoryChange}
//           disabled={loading}
//           style={{
//             ...inputStyle,
//             minHeight: 145,
//             cursor: "pointer",
//           }}
//         >
//           {PIN_CATEGORIES.map((category) => (
//             <option key={category.value} value={category.value}>
//               {category.label}
//             </option>
//           ))}
//         </select>
//         <p
//           style={{
//             color: colors.textMuted,
//             fontSize: 12,
//             marginTop: 7,
//             marginBottom: 18,
//           }}
//         >
//           Hold Ctrl (Windows) or Cmd (Mac) to select multiple categories.
//           Select All Categories by itself to apply to all categories.
//         </p>
//         {mode === "pin" && (
//           <div style={{ marginBottom: 20 }}>
//             <label
//               style={{
//                 display: "block",
//                 color: colors.textSecondary,
//                 fontSize: 13,
//                 marginBottom: 8,
//                 fontWeight: 600,
//               }}
//             >
//               Pin Order *
//             </label>
//             <input
//               type="number"
//               min="1"
//               step="1"
//               value={order}
//               disabled={loading}
//               onChange={(e) => setOrder(e.target.value)}
//               style={inputStyle}
//             />
//             <p
//               style={{
//                 color: colors.textMuted,
//                 fontSize: 12,
//                 marginTop: 6,
//               }}
//             >
//               Lower numbers appear first.
//             </p>
//           </div>
//         )}
//         <div style={{ display: "flex", gap: 10 }}>
//           <button
//             type="button"
//             disabled={loading}
//             onClick={onClose}
//             style={{
//               flex: 1,
//               padding: 12,
//               borderRadius: 10,
//               border: `1px solid ${colors.cardBorder}`,
//               background: colors.inputBg,
//               color: colors.textPrimary,
//               cursor: "pointer",
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             disabled={loading}
//             onClick={handleSubmit}
//             style={{
//               flex: 1,
//               padding: 12,
//               borderRadius: 10,
//               border: "none",
//               background:
//                 mode === "pin" ? colors.gradientButton : colors.danger,
//               color: mode === "pin" ? colors.buttonText : "#fff",
//               fontWeight: 700,
//               cursor: loading ? "not-allowed" : "pointer",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 8,
//             }}
//           >
//             {loading ? (
//               <Loader2 size={17} className="animate-spin" />
//             ) : mode === "pin" ? (
//               <Pin size={17} />
//             ) : (
//               <PinOff size={17} />
//             )}
//             {loading
//               ? "Please wait..."
//               : mode === "pin"
//                 ? "Pin Reel"
//                 : "Unpin Reel"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ReelPinModal;
import { Pin, PinOff, X, Loader2, } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const ReelPinModal = ({ reel, mode, onClose, refresh }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [order, setOrder] = useState(1);

  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories and keep only those assigned to this reel.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        setError("");

        const { data } = await axiosInstance.get(
          "/api/v1/home-banners",
          {
            params: {
              page: 1,
              limit: 100,
            },
          }
        );

        const items = data?.data?.items || [];

        // Categories currently assigned to the reel.
        const reelCategories = Array.isArray(reel?.categories)
          ? reel.categories
          : reel?.category
            ? [reel.category]
            : [];

        const activeCategories = items
          .filter(
            (item) =>
              item.isActive &&
              reelCategories.includes(item.key)
          )
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((item) => ({
            value: item.key,
            label: item.title || item.key,
          }));

        setCategories(activeCategories);

        // Initially select the categories already assigned to the reel.
        setSelectedCategories(
          activeCategories.map((item) => item.value)
        );
      } catch (err) {
        console.error("Failed to fetch reel categories:", err);

        setError(
          err?.response?.data?.message ||
            "Failed to fetch categories."
        );
      } finally {
        setCategoryLoading(false);
      }
    };

    if (reel) {
      fetchCategories();
    }
  }, [reel]);

  // Handle multiple category selection.
  const handleCategoryChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedCategories(values);
    setError("");
  };

  // Pin / Unpin API submission.
  const handleSubmit = async () => {
    const id = reel?._id || reel?.id;

    if (!id) {
      setError("Reel ID is missing.");
      return;
    }

    if (categoryLoading) {
      setError("Please wait while categories are loading.");
      return;
    }

    if (!selectedCategories.length) {
      setError("Please select at least one category.");
      return;
    }

    if (
      mode === "pin" &&
      (!Number.isInteger(Number(order)) || Number(order) < 1)
    ) {
      setError("Pin order must be a positive whole number.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (mode === "pin") {
        await axiosInstance.put(
          `/api/v1/admin-reels/${id}/pin`,
          {
            categories: selectedCategories,
            category: selectedCategories[0],
            order: Number(order),
          }
        );
      } else {
        await axiosInstance.delete(
          `/api/v1/admin-reels/${id}/pin`,
          {
            params: {
              categories: selectedCategories.join(","),
            },
          }
        );
      }

      await refresh();
      onClose();
    } catch (err) {
      console.error("Reel pin/unpin error:", err);

      setError(
        err?.response?.data?.message ||
          `Failed to ${mode === "pin" ? "pin" : "unpin"} reel.`
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: `1px solid ${colors.inputBorder}`,
    background: colors.inputBg,
    color: colors.textPrimary,
    outline: "none",
    boxSizing: "border-box",
    fontSize: 14,
  };

  const labelStyle = {
    display: "block",
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 8,
    fontWeight: 600,
  };

  return (
    <div
      onMouseDown={(e) => {
        if (
          e.target === e.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: colors.overlay,
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          maxHeight: "90vh",
          overflowY: "auto",
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 18,
          padding: 22,
          boxShadow: "0 20px 60px rgba(0,0,0,.5)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {mode === "pin" ? (
              <Pin size={21} color={colors.accent} />
            ) : (
              <PinOff size={21} color={colors.danger} />
            )}

            <h2
              style={{
                color: colors.textPrimary,
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
              }}
            >
              {mode === "pin" ? "Pin Reel" : "Unpin Reel"}
            </h2>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${colors.cardBorder}`,
              background: colors.inputBg,
              color: colors.textSecondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            <X size={19} />
          </button>
        </div>

        {/* REEL DETAILS */}
        <div
          style={{
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 10,
            padding: 12,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              color: colors.textMuted,
              fontSize: 12,
              marginBottom: 5,
            }}
          >
            Selected Reel
          </div>

          <div
            style={{
              color: colors.textPrimary,
              fontSize: 14,
              fontWeight: 600,
              overflowWrap: "anywhere",
            }}
          >
            {reel?.title || "Untitled Reel"}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              color: colors.danger,
              background: "rgba(239,68,68,0.08)",
              border: `1px solid ${colors.danger}`,
              borderRadius: 10,
              padding: 11,
              marginBottom: 16,
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {/* CURRENT CATEGORIES */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>
            Current Reel Categories *
          </label>

          <select
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            disabled={loading || categoryLoading}
            style={{
              ...inputStyle,
              minHeight: 130,
              cursor: categoryLoading
                ? "not-allowed"
                : "pointer",
              opacity: categoryLoading ? 0.6 : 1,
            }}
          >
            {categoryLoading ? (
              <option disabled>
                Loading categories...
              </option>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </option>
              ))
            ) : (
              <option disabled value="">
                No matching active categories
              </option>
            )}
          </select>

          <p
            style={{
              color: colors.textMuted,
              fontSize: 12,
              marginTop: 7,
              marginBottom: 0,
              lineHeight: 1.5,
            }}
          >
            Only categories assigned to this reel are shown.
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
          </p>
        </div>

        {/* PIN ORDER */}
        {mode === "pin" && (
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>
              Pin Order *
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={order}
              disabled={loading}
              onChange={(e) => {
                setOrder(e.target.value);
                setError("");
              }}
              placeholder="Enter pin order"
              style={inputStyle}
            />

            <p
              style={{
                color: colors.textMuted,
                fontSize: 12,
                marginTop: 6,
                marginBottom: 0,
              }}
            >
              Lower numbers appear first.
            </p>
          </div>
        )}

        {/* FOOTER BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border: `1px solid ${colors.cardBorder}`,
              background: colors.inputBg,
              color: colors.textPrimary,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              loading ||
              categoryLoading ||
              categories.length === 0
            }
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border: "none",
              background:
                mode === "pin"
                  ? colors.gradientButton
                  : colors.danger,
              color:
                mode === "pin"
                  ? colors.buttonText
                  : "#FFFFFF",
              fontWeight: 700,
              cursor:
                loading || categoryLoading
                  ? "not-allowed"
                  : "pointer",
              opacity:
                loading || categoryLoading ? 0.7 : 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            {loading ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : mode === "pin" ? (
              <Pin size={17} />
            ) : (
              <PinOff size={17} />
            )}

            {loading
              ? "Please wait..."
              : mode === "pin"
                ? "Pin Reel"
                : "Unpin Reel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelPinModal;
