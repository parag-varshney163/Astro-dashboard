// import { X, Upload, Image as ImageIcon, Check, Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import colors from "../../constants/colors";
// const RashifalImageModal = ({ isOpen, onClose, editData, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     rashi: "",
//     isActive: true,
//   });
//   const [image, setImage] = useState(null);
//   const [homeImage, setHomeImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [homeImagePreview, setHomeImagePreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         rashi: editData.rashiKey || "",
//         isActive: editData.isActive,
//       });
//       setImage(null);
//       setHomeImage(null);
//       setImagePreview(editData.image || "");
//       setHomeImagePreview(editData.homeImage || "");
//     } else {
//       setFormData({
//         rashi: "",
//         isActive: true,
//       });
//       setImage(null);
//       setHomeImage(null);
//       setImagePreview("");
//       setHomeImagePreview("");
//     }
//     setError("");
//   }, [editData, isOpen]);
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   const handleImageChange = (e, type) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file.");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image size should be less than 5MB.");
//       return;
//     }
//     setError("");
//     const preview = URL.createObjectURL(file);
//     if (type === "detail") {
//       setImage(file);
//       setImagePreview(preview);
//     } else {
//       setHomeImage(file);
//       setHomeImagePreview(preview);
//     }
//   };
//   const removeImage = (type) => {
//     if (type === "detail") {
//       setImage(null);
//       setImagePreview(editData?.image || "");
//     } else {
//       setHomeImage(null);
//       setHomeImagePreview(editData?.homeImage || "");
//     }
//   };
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.rashi.trim()) {
// //       setError("Please enter the Rashi name.");
// //       return;
// //     }
// //     if (!editData && !image) {
// //       setError("Please upload the Rashifal detail image.");
// //       return;
// //     }
// //     if (!editData && !homeImage) {
// //       setError("Please upload the home page image.");
// //       return;
// //     }
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const payload = new FormData();
// //       payload.append("rashi", formData.rashi);
// //       if (image) {
// //         payload.append("image", image);
// //       }
// //       if (homeImage) {
// //         payload.append("homeImage", homeImage);
// //       }
// //       if (editData?._id) {
// //         payload.append("isActive", String(formData.isActive));
// //         await axiosInstance.put(
// //           `/api/v1/rashifal-images/${editData._id}`,
// //           payload,
// //           {
// //             headers: {
// //               "Content-Type": "multipart/form-data",
// //             },
// //           }
// //         );
// //       } else {
// //         await axiosInstance.post("/api/v1/rashifal-images", payload, {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //       }
// //       onSuccess();
// //       onClose();
// //     } catch (err) {
// //       console.error(err);
// //       setError(
// //         err?.response?.data?.message || "Something went wrong. Please try again."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!formData.rashi.trim()) {
//     setError("Please enter the Rashi name.");
//     return;
//   }
//   if (!editData && !image) {
//     setError("Please upload the Rashifal detail image.");
//     return;
//   }
//   if (!editData && !homeImage) {
//     setError("Please upload the Home Page image.");
//     return;
//   }
//   try {
//     setLoading(true);
//     setError("");
//     const payload = new FormData();
//     payload.append("rashi", formData.rashi.trim());
//     if (image) {
//       payload.append("image", image);
//     }
//     if (homeImage) {
//       payload.append("homeImage", homeImage);
//     }
//     if (editData?._id) {
//       payload.append("isActive", String(formData.isActive));
//       await axiosInstance.put(
//         `/api/v1/rashifal-images/${editData._id}`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     } else {
//       await axiosInstance.post(
//         "/api/v1/rashifal-images",
//         payload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     }
//     onSuccess();
//     onClose();
//   } catch (err) {
//     console.error("Rashifal image error:", err);
//     setError(
//       err?.response?.data?.message ||
//         "Something went wrong. Please try again."
//     );
//   } finally {
//     setLoading(false);
//   }
// };
//   if (!isOpen) return null;
//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
//       style={{ background: colors.overlay }}
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget && !loading) {
//           onClose();
//         }
//       }}
//     >
//       <div
//         className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
//         style={{
//           background: colors.primary,
//           border: `1px solid ${colors.cardBorder}`,
//         }}
//       >
//         {/* Header */}
//         <div
//           className="flex items-center justify-between px-5 py-4 sticky top-0 z-10"
//           style={{
//             background: colors.cardBg,
//             borderBottom: `1px solid ${colors.cardBorder}`,
//           }}
//         >
//           <div>
//             <div className="flex items-center gap-2">
//               <div
//                 className="w-9 h-9 rounded-lg flex items-center justify-center"
//                 style={{
//                   background: colors.hover,
//                   color: colors.accentLight,
//                 }}
//               >
//                 <ImageIcon size={19} />
//               </div>
//               <div>
//                 <h2
//                   className="text-lg font-semibold"
//                   style={{ color: colors.textPrimary }}
//                 >
//                   {editData
//                     ? "Update Rashifal Image"
//                     : "Create Rashifal Image"}
//                 </h2>
//                 <p
//                   className="text-xs mt-0.5"
//                   style={{ color: colors.textMuted }}
//                 >
//                   {editData
//                     ? "Update images and status"
//                     : "Add images for a new Rashi"}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={loading}
//             className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
//             style={{
//               background: colors.hover,
//               color: colors.textSecondary,
//             }}
//           >
//             <X size={18} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="p-5">
//           {/* Error */}
//           {error && (
//             <div
//               className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4 text-sm"
//               style={{
//                 background: `${colors.danger}18`,
//                 border: `1px solid ${colors.danger}55`,
//                 color: colors.danger,
//               }}
//             >
//               <span>{error}</span>
//             </div>
//           )}
//           {/* Rashi */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium mb-1.5"
//               style={{ color: colors.textSecondary }}
//             >
//               Rashi Name <span style={{ color: colors.danger }}>*</span>
//             </label>
//             <input
//               name="rashi"
//               value={formData.rashi}
//               onChange={handleChange}
//               disabled={!!editData}
//               placeholder="e.g. Simha"
//               className="w-full px-3.5 py-2.5 rounded-lg outline-none transition-all text-sm disabled:opacity-60"
//               style={{
//                 background: colors.inputBg,
//                 color: colors.textPrimary,
//                 border: `1px solid ${colors.inputBorder}`,
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = colors.inputFocus;
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = colors.inputBorder;
//               }}
//             />
//             <p
//               className="text-[11px] mt-1"
//               style={{ color: colors.textMuted }}
//             >
//               Enter the Rashi key used by the Rashifal system.
//             </p>
//           </div>
//           {/* Images */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {/* Detail Image */}
//             <ImageUploadBox
//               title="Rashifal Detail Image"
//               required={!editData}
//               preview={imagePreview}
//               file={image}
//               onChange={(e) => handleImageChange(e, "detail")}
//               onRemove={() => removeImage("detail")}
//             />
//             {/* Home Image */}
//             <ImageUploadBox
//               title="Home Page Image"
//               required={!editData}
//               preview={homeImagePreview}
//               file={homeImage}
//               onChange={(e) => handleImageChange(e, "home")}
//               onRemove={() => removeImage("home")}
//             />
//           </div>
//           {/* Status */}
//           {editData && (
//             <div className="mt-4">
//               <label
//                 className="block text-sm font-medium mb-1.5"
//                 style={{ color: colors.textSecondary }}
//               >
//                 Status
//               </label>
//               <div
//                 className="flex items-center justify-between px-3.5 py-3 rounded-lg"
//                 style={{
//                   background: colors.inputBg,
//                   border: `1px solid ${colors.inputBorder}`,
//                 }}
//               >
//                 <div>
//                   <p
//                     className="text-sm font-medium"
//                     style={{ color: colors.textPrimary }}
//                   >
//                     {formData.isActive ? "Active" : "Inactive"}
//                   </p>
//                   <p
//                     className="text-[11px] mt-0.5"
//                     style={{ color: colors.textMuted }}
//                   >
//                     Control whether this Rashifal is visible.
//                   </p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       isActive: !prev.isActive,
//                     }))
//                   }
//                   className="relative w-11 h-6 rounded-full transition-all"
//                   style={{
//                     background: formData.isActive
//                       ? colors.accent
//                       : colors.inputBorder,
//                   }}
//                 >
//                   <span
//                     className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
//                     style={{
//                       left: formData.isActive ? "24px" : "4px",
//                     }}
//                   />
//                 </button>
//               </div>
//             </div>
//           )}
//           {/* Footer */}
//           <div
//             className="flex items-center justify-end gap-2 mt-5 pt-4"
//             style={{
//               borderTop: `1px solid ${colors.cardBorder}`,
//             }}
//           >
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
//               style={{
//                 background: colors.hover,
//                 color: colors.textSecondary,
//                 border: `1px solid ${colors.inputBorder}`,
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-60"
//               style={{
//                 background: colors.gradientButton,
//                 color: colors.buttonText,
//               }}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 size={16} className="animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Check size={16} />
//                   {editData ? "Update Image" : "Create Image"}
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// const ImageUploadBox = ({
//   title,
//   required,
//   preview,
//   file,
//   onChange,
//   onRemove,
// }) => {
//   return (
//     <div>
//       <label
//         className="block text-sm font-medium mb-1.5"
//         style={{ color: colors.textSecondary }}
//       >
//         {title}{" "}
//         {required && <span style={{ color: colors.danger }}>*</span>}
//       </label>
//       <div
//         className="relative rounded-xl overflow-hidden transition-all"
//         style={{
//           background: colors.inputBg,
//           border: `1px dashed ${colors.inputBorder}`,
//         }}
//       >
//         {preview ? (
//           <div className="relative h-40 group">
//             <img
//               src={preview}
//               alt={title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//               <label
//                 className="cursor-pointer px-3 py-2 rounded-lg text-xs font-medium"
//                 style={{
//                   background: colors.buttonBg,
//                   color: colors.buttonText,
//                 }}
//               >
//                 Change
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={onChange}
//                   className="hidden"
//                 />
//               </label>
//               {file && (
//                 <button
//                   type="button"
//                   onClick={onRemove}
//                   className="px-3 py-2 rounded-lg text-xs font-medium"
//                   style={{
//                     background: colors.danger,
//                     color: colors.white,
//                   }}
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           </div>
//         ) : (
//           <label className="h-40 flex flex-col items-center justify-center cursor-pointer px-4">
//             <div
//               className="w-11 h-11 rounded-full flex items-center justify-center mb-2"
//               style={{
//                 background: colors.hover,
//                 color: colors.accentLight,
//               }}
//             >
//               <Upload size={20} />
//             </div>
//             <p
//               className="text-sm font-medium"
//               style={{ color: colors.textPrimary }}
//             >
//               Upload Image
//             </p>
//             <p
//               className="text-[11px] mt-1 text-center"
//               style={{ color: colors.textMuted }}
//             >
//               PNG, JPG or WEBP · Max 5MB
//             </p>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={onChange}
//               className="hidden"
//             />
//           </label>
//         )}
//       </div>
//       {file && (
//         <p
//           className="text-[11px] mt-1 truncate"
//           style={{ color: colors.textMuted }}
//           title={file.name}
//         >
//           {file.name}
//         </p>
//       )}
//     </div>
//   );
// };
// export default RashifalImageModal;
import { X, Upload, Image as ImageIcon, Check, Loader2, } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const initialState = {
  rashi: "",
};

const RashifalImageModal = ({
  isOpen,
  onClose,
  editData,
  onSuccess,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [image, setImage] = useState(null);
  const [homeImage, setHomeImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");
  const [homeImagePreview, setHomeImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     RESET / LOAD EDIT DATA
  ========================= */

  useEffect(() => {
    if (!isOpen) return;

    if (editData) {
      setFormData({
        rashi: editData.rashiKey || editData.rashi || "",
      });

      setImage(null);
      setHomeImage(null);

      setImagePreview(editData.image || "");
      setHomeImagePreview(editData.homeImage || "");
    } else {
      setFormData(initialState);

      setImage(null);
      setHomeImage(null);

      setImagePreview("");
      setHomeImagePreview("");
    }

    setError("");
  }, [editData, isOpen]);

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     IMAGE CHANGE
  ========================= */

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    setError("");

    const preview = URL.createObjectURL(file);

    if (type === "detail") {
      setImage(file);
      setImagePreview(preview);
    } else if (type === "home") {
      setHomeImage(file);
      setHomeImagePreview(preview);
    }
  };

  /* =========================
     REMOVE SELECTED IMAGE
  ========================= */

  const removeImage = (type) => {
    if (type === "detail") {
      setImage(null);
      setImagePreview(editData?.image || "");
    } else if (type === "home") {
      setHomeImage(null);
      setHomeImagePreview(editData?.homeImage || "");
    }
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Validation */

    if (!formData.rashi.trim()) {
      setError("Please enter the Rashi name.");
      return;
    }

    /* Create validation */

    if (!editData && !image) {
      setError("Please upload the Rashifal detail image.");
      return;
    }

    if (!editData && !homeImage) {
      setError("Please upload the Home Page image.");
      return;
    }

    /* Edit validation */

    if (editData && !image && !homeImage) {
      setError("Please select at least one image to update.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = new FormData();

      /* =========================
         CREATE
      ========================= */

      if (!editData) {
        payload.append("rashi", formData.rashi.trim());

        if (image) {
          payload.append("image", image);
        }

        if (homeImage) {
          payload.append("homeImage", homeImage);
        }

        await axiosInstance.post(
          "/api/v1/rashifal-images",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      /* =========================
         UPDATE
      ========================= */

      else {
        /*
          According to your PUT API,
          update only the image fields.
        */

        if (image) {
          payload.append("image", image);
        }

        if (homeImage) {
          payload.append("homeImage", homeImage);
        }

        await axiosInstance.put(
          `/api/v1/rashifal-images/${editData._id}`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      /* Success */

      onSuccess?.();
      onClose?.();

    } catch (err) {
      console.error("Rashifal image error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  /* =========================
     INPUT STYLE
  ========================= */

  const inputStyle = {
    width: "100%",
    background: colors.inputBg,
    color: colors.textPrimary,
    border: `1px solid ${colors.inputBorder}`,
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: colors.overlay,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      {/* =========================
          MODAL
      ========================= */}

      <div
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: colors.primary,
          border: `1px solid ${colors.cardBorder}`,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* =========================
            HEADER
        ========================= */}

        <div
          className="flex items-center justify-between px-5 py-4 sticky top-0 z-10"
          style={{
            background: colors.cardBg,
            borderBottom: `1px solid ${colors.cardBorder}`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: colors.hover,
                color: colors.accentLight,
              }}
            >
              <ImageIcon size={19} />
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{
                  color: colors.textPrimary,
                }}
              >
                {editData
                  ? "Update Rashifal Image"
                  : "Create Rashifal Image"}
              </h2>

              <p
                className="text-xs mt-0.5"
                style={{
                  color: colors.textMuted,
                }}
              >
                {editData
                  ? "Update Rashifal images"
                  : "Add images for a new Rashi"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: colors.hover,
              color: colors.textSecondary,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <form onSubmit={handleSubmit}>
          <div className="p-5">

            {/* =========================
                ERROR
            ========================= */}

            {error && (
              <div
                className="px-3 py-2.5 rounded-lg mb-4 text-sm"
                style={{
                  background: `${colors.danger}18`,
                  border: `1px solid ${colors.danger}55`,
                  color: colors.danger,
                }}
              >
                {error}
              </div>
            )}

            {/* =========================
                RASHI
            ========================= */}

            <div className="mb-5">
              <label
                className="block text-sm font-medium mb-1.5"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Rashi Name{" "}
                <span style={{ color: colors.danger }}>
                  *
                </span>
              </label>

              <input
                name="rashi"
                value={formData.rashi}
                onChange={handleChange}
                disabled={!!editData || loading}
                placeholder="e.g. Simha"
                className="w-full px-3.5 py-2.5 rounded-lg outline-none transition-all text-sm disabled:opacity-60"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor =
                    colors.inputFocus;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    colors.inputBorder;
                }}
              />

              <p
                className="text-[11px] mt-1"
                style={{
                  color: colors.textMuted,
                }}
              >
                Enter the Rashi key used by the Rashifal
                system.
              </p>
            </div>

            {/* =========================
                IMAGES
            ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Detail Image */}

              <ImageUploadBox
                title="Rashifal Detail Image"
                required={!editData}
                preview={imagePreview}
                file={image}
                onChange={(e) =>
                  handleImageChange(e, "detail")
                }
                onRemove={() =>
                  removeImage("detail")
                }
              />

              {/* Home Image */}

              <ImageUploadBox
                title="Home Page Image"
                required={!editData}
                preview={homeImagePreview}
                file={homeImage}
                onChange={(e) =>
                  handleImageChange(e, "home")
                }
                onRemove={() =>
                  removeImage("home")
                }
              />
            </div>
          </div>

          {/* =========================
              FOOTER
          ========================= */}

          <div
            className="flex items-center justify-end gap-2 px-5 py-4"
            style={{
              borderTop: `1px solid ${colors.cardBorder}`,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                background: colors.hover,
                color: colors.textSecondary,
                border: `1px solid ${colors.inputBorder}`,
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-60"
              style={{
                background: colors.gradientButton,
                color: colors.buttonText,
              }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} />

                  {editData
                    ? "Update Image"
                    : "Create Image"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =====================================================
   IMAGE UPLOAD BOX
===================================================== */

const ImageUploadBox = ({
  title,
  required,
  preview,
  file,
  onChange,
  onRemove,
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium mb-1.5"
        style={{
          color: colors.textSecondary,
        }}
      >
        {title}{" "}
        {required && (
          <span style={{ color: colors.danger }}>
            *
          </span>
        )}
      </label>

      <div
        className="relative rounded-xl overflow-hidden transition-all"
        style={{
          background: colors.inputBg,
          border: `1px dashed ${colors.inputBorder}`,
        }}
      >
        {/* =========================
            IMAGE PREVIEW
        ========================= */}

        {preview ? (
          <div className="relative h-40 group">
            <img
              src={preview}
              alt={title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">

              {/* Change */}

              <label
                className="cursor-pointer px-3 py-2 rounded-lg text-xs font-medium"
                style={{
                  background: colors.buttonBg,
                  color: colors.buttonText,
                }}
              >
                Change

                <input
                  type="file"
                  accept="image/*"
                  onChange={onChange}
                  className="hidden"
                />
              </label>

              {/* Remove */}

              {file && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="px-3 py-2 rounded-lg text-xs font-medium"
                  style={{
                    background: colors.danger,
                    color: colors.white,
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ) : (
          /* =========================
             EMPTY UPLOAD
          ========================= */

          <label className="h-40 flex flex-col items-center justify-center cursor-pointer px-4">

            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mb-2"
              style={{
                background: colors.hover,
                color: colors.accentLight,
              }}
            >
              <Upload size={20} />
            </div>

            <p
              className="text-sm font-medium"
              style={{
                color: colors.textPrimary,
              }}
            >
              Upload Image
            </p>

            <p
              className="text-[11px] mt-1 text-center"
              style={{
                color: colors.textMuted,
              }}
            >
              PNG, JPG or WEBP · Max 5MB
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* File name */}

      {file && (
        <p
          className="text-[11px] mt-1 truncate"
          style={{
            color: colors.textMuted,
          }}
          title={file.name}
        >
          {file.name}
        </p>
      )}
    </div>
  );
};

export default RashifalImageModal;