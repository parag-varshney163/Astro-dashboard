// import { Image as ImageIcon, Save, Upload, X, } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import colors from "../../constants/colors";
// import Button from "../ui/Button";
// const initialForm = {
//   title: "",
//   isActive: true,
//   sortOrder: 1,
//   image: null,
//   selectedImage: null,
// };
// const CreateHomeBannerModal = ({
//   isOpen,
//   onClose,
//   onSuccess,
//   banner = null,
// }) => {
//   const [form, setForm] = useState(initialForm);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [selectedImagePreview, setSelectedImagePreview] =
//     useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const isEdit = Boolean(banner);
//   // ==========================================================
//   // INITIALIZE FORM
//   // ==========================================================
//   useEffect(() => {
//     if (!isOpen) return;
//     setError("");
//     if (banner) {
//       setForm({
//         title: banner.title || "",
//         isActive:
//           typeof banner.isActive === "boolean"
//             ? banner.isActive
//             : true,
//         sortOrder: banner.sortOrder ?? 1,
//         image: null,
//         selectedImage: null,
//       });
//       setImagePreview(banner.imageUrl || null);
//       setSelectedImagePreview(
//         banner.selectedImageUrl || null
//       );
//     } else {
//       setForm(initialForm);
//       setImagePreview(null);
//       setSelectedImagePreview(null);
//     }
//   }, [isOpen, banner]);
//   // ==========================================================
//   // CLOSE
//   // ==========================================================
//   const handleClose = () => {
//     if (loading) return;
//     setForm(initialForm);
//     setImagePreview(null);
//     setSelectedImagePreview(null);
//     setError("");
//     onClose();
//   };
//   // ==========================================================
//   // INPUT CHANGE
//   // ==========================================================
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : name === "sortOrder"
//             ? value
//             : value,
//     }));
//   };
//   // ==========================================================
//   // DEFAULT IMAGE
//   // ==========================================================
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setForm((prev) => ({
//       ...prev,
//       image: file,
//     }));
//     const url = URL.createObjectURL(file);
//     setImagePreview(url);
//   };
//   // ==========================================================
//   // SELECTED IMAGE
//   // ==========================================================
//   const handleSelectedImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setForm((prev) => ({
//       ...prev,
//       selectedImage: file,
//     }));
//     const url = URL.createObjectURL(file);
//     setSelectedImagePreview(url);
//   };
//   // ==========================================================
//   // VALIDATION
//   // ==========================================================
//   const validateForm = () => {
//     if (!form.title.trim()) {
//       return "Title is required.";
//     }
//     if (
//       form.sortOrder === "" ||
//       Number.isNaN(Number(form.sortOrder))
//     ) {
//       return "Sort order must be a valid number.";
//     }
//     if (Number(form.sortOrder) < 0) {
//       return "Sort order cannot be negative.";
//     }
//     // Images are required only when creating.
//     if (!isEdit && !form.image) {
//       return "Default state image is required.";
//     }
//     if (!isEdit && !form.selectedImage) {
//       return "Selected state image is required.";
//     }
//     return null;
//   };
//   // ==========================================================
//   // SUBMIT
//   // ==========================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }
//     try {
//       setLoading(true);
//       setError("");
//       const formData = new FormData();
//       // Required
//       formData.append("title", form.title.trim());
//       // Boolean
//       formData.append(
//         "isActive",
//         String(form.isActive)
//       );
//       // Integer
//       formData.append(
//         "sortOrder",
//         String(Number(form.sortOrder))
//       );
//       // ======================================================
//       // IMAGE
//       // ======================================================
//       // POST:
//       // required
//       //
//       // PUT:
//       // only append when user selected a new image
//       if (form.image) {
//         formData.append("image", form.image);
//       }
//       if (form.selectedImage) {
//         formData.append(
//           "selectedImage",
//           form.selectedImage
//         );
//       }
//       // ======================================================
//       // API
//       // ======================================================
//       let response;
//       if (isEdit) {
//         response = await axiosInstance.put(
//           `/api/v1/home-banners/${banner._id}`,
//           formData
//         );
//       } else {
//         response = await axiosInstance.post(
//           "/api/v1/home-banners",
//           formData
//         );
//       }
//       // ======================================================
//       // SUCCESS
//       // ======================================================
//       if (response?.data?.success) {
//         onSuccess?.();
//         handleClose();
//       } else {
//         setError(
//           response?.data?.message ||
//             `Failed to ${isEdit ? "update" : "create"} home banner.`
//         );
//       }
//     } catch (error) {
//       console.error(
//         `${isEdit ? "Update" : "Create"} home banner error:`,
//         error
//       );
//       setError(
//         error?.response?.data?.message ||
//           error?.message ||
//           `Failed to ${
//             isEdit ? "update" : "create"
//           } home banner.`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (!isOpen) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{
//         background: colors.overlay,
//       }}
//       onClick={handleClose}
//     >
//       <div
//         className="w-full max-w-2xl rounded-3xl overflow-hidden"
//         style={{
//           background: colors.cardBg,
//           border: `1px solid ${colors.cardBorder}`,
//           boxShadow:
//             "0 25px 80px rgba(0,0,0,0.55)",
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ==================================================
//             HEADER
//         ================================================== */}
//         <div
//           className="flex items-center justify-between px-6 py-5"
//           style={{
//             borderBottom: `1px solid ${colors.cardBorder}`,
//             background: colors.gradientCard,
//           }}
//         >
//           <div>
//             <h2
//               className="text-xl font-semibold"
//               style={{
//                 color: colors.textPrimary,
//               }}
//             >
//               {isEdit
//                 ? "Edit Home Banner"
//                 : "Create Home Banner"}
//             </h2>
//             <p
//               className="text-xs mt-1"
//               style={{
//                 color: colors.textSecondary,
//               }}
//             >
//               {isEdit
//                 ? "Update banner details and images"
//                 : "Create a new home screen banner"}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={handleClose}
//             disabled={loading}
//             style={{
//               width: 36,
//               height: 36,
//               borderRadius: 9,
//               border: `1px solid ${colors.cardBorder}`,
//               background: colors.secondary,
//               color: colors.textSecondary,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: loading
//                 ? "not-allowed"
//                 : "pointer",
//               opacity: loading ? 0.5 : 1,
//             }}
//           >
//             <X size={18} />
//           </button>
//         </div>
//         {/* ==================================================
//             FORM
//         ================================================== */}
//         <form
//           onSubmit={handleSubmit}
//           className="p-6"
//         >
//           {/* ERROR */}
//           {error && (
//             <div
//               className="mb-5 rounded-xl px-4 py-3 text-sm"
//               style={{
//                 background:
//                   "rgba(224,82,82,0.10)",
//                 border:
//                   `1px solid rgba(224,82,82,0.35)`,
//                 color: colors.danger,
//               }}
//             >
//               {error}
//             </div>
//           )}
//           {/* =================================================
//               TITLE
//           ================================================= */}
//           <div className="mb-5">
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{
//                 color: colors.textSecondary,
//               }}
//             >
//               Title{" "}
//               <span style={{ color: colors.danger }}>
//                 *
//               </span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               placeholder="Enter banner title"
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 boxSizing: "border-box",
//                 padding: "11px 13px",
//                 borderRadius: 10,
//                 border:
//                   `1px solid ${colors.inputBorder}`,
//                 background: colors.inputBg,
//                 color: colors.textPrimary,
//                 outline: "none",
//                 fontSize: 14,
//               }}
//             />
//           </div>
//           {/* =================================================
//               SORT ORDER + ACTIVE
//           ================================================= */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             {/* SORT ORDER */}
//             <div>
//               <label
//                 className="block text-sm font-medium mb-2"
//                 style={{
//                   color: colors.textSecondary,
//                 }}
//               >
//                 Sort Order
//               </label>
//               <input
//                 type="number"
//                 name="sortOrder"
//                 min="0"
//                 value={form.sortOrder}
//                 onChange={handleChange}
//                 disabled={loading}
//                 placeholder="1"
//                 style={{
//                   width: "100%",
//                   boxSizing: "border-box",
//                   padding: "11px 13px",
//                   borderRadius: 10,
//                   border:
//                     `1px solid ${colors.inputBorder}`,
//                   background: colors.inputBg,
//                   color: colors.textPrimary,
//                   outline: "none",
//                   fontSize: 14,
//                 }}
//               />
//             </div>
//             {/* ACTIVE */}
//             <div>
//               <label
//                 className="block text-sm font-medium mb-2"
//                 style={{
//                   color: colors.textSecondary,
//                 }}
//               >
//                 Status
//               </label>
//               <button
//                 type="button"
//                 disabled={loading}
//                 onClick={() =>
//                   setForm((prev) => ({
//                     ...prev,
//                     isActive: !prev.isActive,
//                   }))
//                 }
//                 style={{
//                   width: "100%",
//                   minHeight: 43,
//                   borderRadius: 10,
//                   border:
//                     `1px solid ${
//                       form.isActive
//                         ? "rgba(61,190,108,0.45)"
//                         : "rgba(224,82,82,0.45)"
//                     }`,
//                   background: form.isActive
//                     ? "rgba(61,190,108,0.10)"
//                     : "rgba(224,82,82,0.10)",
//                   color: form.isActive
//                     ? colors.success
//                     : colors.danger,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: loading
//                     ? "not-allowed"
//                     : "pointer",
//                   fontWeight: 600,
//                 }}
//               >
//                 {form.isActive
//                   ? "Active"
//                   : "Inactive"}
//               </button>
//             </div>
//           </div>
//           {/* =================================================
//               IMAGES
//           ================================================= */}
//           <div
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             {/* =============================================
//                 DEFAULT IMAGE
//             ============================================= */}
//             <ImageUpload
//               label="Default State Image"
//               required={!isEdit}
//               preview={imagePreview}
//               file={form.image}
//               onChange={handleImageChange}
//               disabled={loading}
//             />
//             {/* =============================================
//                 SELECTED IMAGE
//             ============================================= */}
//             <ImageUpload
//               label="Selected State Image"
//               required={!isEdit}
//               preview={selectedImagePreview}
//               file={form.selectedImage}
//               onChange={handleSelectedImageChange}
//               disabled={loading}
//             />
//           </div>
//           {/* =================================================
//               IMAGE NOTE
//           ================================================= */}
//           <div
//             className="mt-4 rounded-xl px-4 py-3 text-xs"
//             style={{
//               background: colors.secondary,
//               border:
//                 `1px solid ${colors.cardBorder}`,
//               color: colors.textMuted,
//             }}
//           >
//             <div className="font-medium mb-1">
//               Image information
//             </div>
//             <div>
//               Default image is displayed when the
//               banner is unselected. Selected image is
//               displayed when the banner is active/selected.
//             </div>
//             {isEdit && (
//               <div className="mt-1">
//                 Leave an image unchanged if you do not
//                 want to replace it.
//               </div>
//             )}
//           </div>
//           {/* =================================================
//               FOOTER
//           ================================================= */}
//           <div
//             className="flex justify-end gap-3 mt-6 pt-5"
//             style={{
//               borderTop:
//                 `1px solid ${colors.cardBorder}`,
//             }}
//           >
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={loading}
//               style={{
//                 padding: "10px 18px",
//                 borderRadius: 9,
//                 border:
//                   `1px solid ${colors.cardBorder}`,
//                 background: colors.secondary,
//                 color: colors.textSecondary,
//                 cursor: loading
//                   ? "not-allowed"
//                   : "pointer",
//                 opacity: loading ? 0.5 : 1,
//                 fontSize: 13,
//                 fontWeight: 600,
//               }}
//             >
//               Cancel
//             </button>
//             <Button
//               type="submit"
//               icon={Save}
//               disabled={loading}
//             >
//               {loading
//                 ? isEdit
//                   ? "Updating..."
//                   : "Creating..."
//                 : isEdit
//                   ? "Update Banner"
//                   : "Create Banner"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// // ============================================================
// // IMAGE UPLOAD COMPONENT
// // ============================================================
// const ImageUpload = ({
//   label,
//   required = false,
//   preview,
//   file,
//   onChange,
//   disabled,
// }) => {
//   return (
//     <div>
//       {/* LABEL */}
//       <label
//         className="block text-sm font-medium mb-2"
//         style={{
//           color: colors.textSecondary,
//         }}
//       >
//         {label}{" "}
//         {required && (
//           <span
//             style={{
//               color: colors.danger,
//             }}
//           >
//             *
//           </span>
//         )}
//       </label>
//       {/* UPLOAD AREA */}
//       <label
//         style={{
//           display: "block",
//           cursor: disabled
//             ? "not-allowed"
//             : "pointer",
//           opacity: disabled ? 0.6 : 1,
//         }}
//       >
//         <input
//           type="file"
//           accept="image/*"
//           onChange={onChange}
//           disabled={disabled}
//           style={{
//             display: "none",
//           }}
//         />
//         <div
//           className="rounded-xl overflow-hidden"
//           style={{
//             height: 170,
//             background: colors.inputBg,
//             border:
//               `1px dashed ${colors.cardBorder}`,
//             position: "relative",
//           }}
//         >
//           {preview ? (
//             <>
//               <img
//                 src={preview}
//                 alt={label}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//               {/* OVERLAY */}
//               <div
//                 className="absolute inset-0 flex flex-col items-center justify-center"
//                 style={{
//                   background:
//                     "rgba(0,0,0,0.48)",
//                   opacity: 0,
//                   transition: "opacity 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.opacity = 1;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.opacity = 0;
//                 }}
//               >
//                 <Upload
//                   size={24}
//                   color={colors.white}
//                 />
//                 <span
//                   className="text-xs mt-2"
//                   style={{
//                     color: colors.white,
//                   }}
//                 >
//                   Change Image
//                 </span>
//               </div>
//             </>
//           ) : (
//             <div
//               className="w-full h-full flex flex-col items-center justify-center"
//               style={{
//                 color: colors.textMuted,
//               }}
//             >
//               <div
//                 className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
//                 style={{
//                   background: colors.secondary,
//                   border:
//                     `1px solid ${colors.cardBorder}`,
//                 }}
//               >
//                 <ImageIcon
//                   size={22}
//                   color={colors.accent}
//                 />
//               </div>
//               <span
//                 className="text-sm font-medium"
//                 style={{
//                   color: colors.textSecondary,
//                 }}
//               >
//                 Click to upload
//               </span>
//               <span
//                 className="text-xs mt-1"
//                 style={{
//                   color: colors.textMuted,
//                 }}
//               >
//                 PNG, JPG, WEBP
//               </span>
//             </div>
//           )}
//         </div>
//       </label>
//       {/* SELECTED FILE */}
//       {file && (
//         <div
//           className="flex items-center gap-2 mt-2"
//           style={{
//             color: colors.success,
//             fontSize: 11,
//           }}
//         >
//           <Upload size={13} />
//           <span
//             style={{
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {file.name}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };
// export default CreateHomeBannerModal;
import { Image as ImageIcon, Save, Upload, X, Tag, ListOrdered, } from "lucide-react";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import Button from "../ui/Button";


const initialForm = {
  title: "",
  isActive: true,
  sortOrder: 1,
  image: null,
  selectedImage: null,
};

const CreateHomeBannerModal = ({
  isOpen,
  onClose,
  onSuccess,
  banner,
}) => {
  const [form, setForm] = useState(initialForm);

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] =
    useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(banner);

  // ============================================================
  // INITIALIZE FORM
  // ============================================================

  useEffect(() => {
    if (!isOpen) return;

    setError("");

    if (banner) {
      setForm({
        title: banner.title || "",
        isActive:
          banner.isActive !== undefined
            ? banner.isActive
            : true,
        sortOrder: banner.sortOrder ?? 1,
        image: null,
        selectedImage: null,
      });

      setImagePreview(banner.imageUrl || null);

      setSelectedImagePreview(
        banner.selectedImageUrl || null
      );
    } else {
      setForm(initialForm);
      setImagePreview(null);
      setSelectedImagePreview(null);
    }
  }, [isOpen, banner]);

  // ============================================================
  // CLOSE
  // ============================================================

  const handleClose = () => {
    if (loading) return;

    setForm(initialForm);
    setImagePreview(null);
    setSelectedImagePreview(null);
    setError("");

    onClose();
  };

  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "sortOrder"
            ? value
            : value,
    }));
  };

  // ============================================================
  // DEFAULT IMAGE
  // ============================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    console.log("Default image selected:", file);

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // ============================================================
  // SELECTED IMAGE
  // ============================================================

  const handleSelectedImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    console.log("Selected image selected:", file);

    setForm((prev) => ({
      ...prev,
      selectedImage: file,
    }));

    const previewUrl = URL.createObjectURL(file);

    setSelectedImagePreview(previewUrl);
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    if (!form.title.trim()) {
      return "Banner title is required.";
    }

    if (
      form.sortOrder === "" ||
      Number.isNaN(Number(form.sortOrder))
    ) {
      return "Sort order must be a valid number.";
    }

    if (Number(form.sortOrder) < 0) {
      return "Sort order cannot be negative.";
    }

    // POST requires both images
    if (!isEditMode) {
      if (!form.image) {
        return "Default state image is required.";
      }

      if (!form.selectedImage) {
        return "Selected state image is required.";
      }
    }

    return null;
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ========================================================
      // FORMDATA
      // ========================================================

      const formData = new FormData();

      // Text
      formData.append(
        "title",
        form.title.trim()
      );

      // Boolean
      formData.append(
        "isActive",
        String(form.isActive)
      );

      // Integer
      formData.append(
        "sortOrder",
        String(Number(form.sortOrder))
      );

      // ========================================================
      // DEFAULT IMAGE
      // ========================================================

      if (form.image instanceof File) {
        formData.append(
          "image",
          form.image
        );
      }

      // ========================================================
      // SELECTED IMAGE
      // ========================================================

      if (
        form.selectedImage instanceof File
      ) {
        formData.append(
          "selectedImage",
          form.selectedImage
        );
      }

      // ========================================================
      // DEBUG
      // ========================================================

      console.log("===== HOME BANNER FORMDATA =====");

      for (const [key, value] of formData.entries()) {
        console.log(
          key,
          value instanceof File
            ? {
                name: value.name,
                type: value.type,
                size: value.size,
              }
            : value
        );
      }

      // ========================================================
      // API
      // ========================================================

      let response;

      if (isEditMode) {
        // PUT
        response = await axiosInstance.put(
          `/api/v1/home-banners/${banner._id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      } else {
        // POST
        response = await axiosInstance.post(
          "/api/v1/home-banners",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      if (response?.data?.success) {
        setForm(initialForm);
        setImagePreview(null);
        setSelectedImagePreview(null);

        await onSuccess?.();

        onClose();
      } else {
        setError(
          response?.data?.message ||
            `Failed to ${
              isEditMode
                ? "update"
                : "create"
            } home banner.`
        );
      }
    } catch (err) {
      console.error(
        `${
          isEditMode
            ? "Update"
            : "Create"
        } home banner error:`,
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          `Failed to ${
            isEditMode
              ? "update"
              : "create"
          } home banner.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // ============================================================
  // STYLES
  // ============================================================

  const inputStyle = {
    width: "100%",
    borderRadius: "12px",
    border: `1px solid ${colors.inputBorder}`,
    background: colors.inputBg,
    color: colors.textPrimary,
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: colors.overlay,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          overflowY: "auto",
          background:
            colors.gradientCard,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: "22px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          style={{
            padding: "22px 24px",
            borderBottom: `1px solid ${colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            background:
              colors.gradientCard,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color:
                  colors.textPrimary,
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              {isEditMode
                ? "Edit Home Banner"
                : "Create Home Banner"}
            </h2>

            <p
              style={{
                margin:
                  "6px 0 0",
                color:
                  colors.textSecondary,
                fontSize: "13px",
              }}
            >
              {isEditMode
                ? "Update banner details and images."
                : "Add a new banner to the home screen."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${colors.cardBorder}`,
              background:
                colors.cardBg,
              color:
                colors.textSecondary,
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              opacity: loading
                ? 0.5
                : 1,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
        >
          <div
            style={{
              padding: "24px",
            }}
          >
            {/* ERROR */}

            {error && (
              <div
                style={{
                  marginBottom:
                    "20px",
                  padding:
                    "12px 14px",
                  borderRadius:
                    "10px",
                  background:
                    "rgba(224,82,82,.12)",
                  border: `1px solid ${colors.danger}`,
                  color:
                    colors.danger,
                  fontSize: "13px",
                }}
              >
                {error}
              </div>
            )}

            {/* =================================================
                TITLE
            ================================================= */}

            <div
              style={{
                marginBottom:
                  "20px",
              }}
            >
              <label
                style={{
                  display:
                    "block",
                  marginBottom:
                    "8px",
                  color:
                    colors.textSecondary,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Banner Title{" "}
                <span
                  style={{
                    color:
                      colors.danger,
                  }}
                >
                  *
                </span>
              </label>

              <div
                style={{
                  position:
                    "relative",
                }}
              >
                <Tag
                  size={18}
                  color={
                    colors.textMuted
                  }
                  style={{
                    position:
                      "absolute",
                    left: 14,
                    top: 13,
                  }}
                />

                <input
                  type="text"
                  name="title"
                  value={
                    form.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Devotional"
                  disabled={
                    loading
                  }
                  style={{
                    ...inputStyle,
                    height: "46px",
                    paddingLeft:
                      "44px",
                    paddingRight:
                      "14px",
                  }}
                />
              </div>
            </div>

            {/* =================================================
                SORT ORDER + STATUS
            ================================================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "18px",
                marginBottom:
                  "22px",
              }}
            >
              {/* SORT ORDER */}

              <div>
                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "8px",
                    color:
                      colors.textSecondary,
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  Sort Order
                </label>

                <div
                  style={{
                    position:
                      "relative",
                  }}
                >
                  <ListOrdered
                    size={18}
                    color={
                      colors.textMuted
                    }
                    style={{
                      position:
                        "absolute",
                      left: 14,
                      top: 13,
                    }}
                  />

                  <input
                    type="number"
                    name="sortOrder"
                    min="0"
                    value={
                      form.sortOrder
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      loading
                    }
                    placeholder="1"
                    style={{
                      ...inputStyle,
                      height: "46px",
                      paddingLeft:
                        "44px",
                      paddingRight:
                        "14px",
                    }}
                  />
                </div>
              </div>

              {/* STATUS */}

              <div>
                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "8px",
                    color:
                      colors.textSecondary,
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  Status
                </label>

                <select
                  name="isActive"
                  value={String(
                    form.isActive
                  )}
                  onChange={(e) =>
                    setForm(
                      (prev) => ({
                        ...prev,
                        isActive:
                          e.target
                            .value ===
                          "true",
                      })
                    )
                  }
                  disabled={
                    loading
                  }
                  style={{
                    ...inputStyle,
                    height: "46px",
                    padding:
                      "0 14px",
                  }}
                >
                  <option value="true">
                    Active
                  </option>

                  <option value="false">
                    Inactive
                  </option>
                </select>
              </div>
            </div>

            {/* =================================================
                IMAGES
            ================================================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "18px",
              }}
            >
              {/* DEFAULT IMAGE */}

              <BannerImageUpload
                label="Default State Image"
                required={!isEditMode}
                preview={
                  imagePreview
                }
                file={form.image}
                onChange={
                  handleImageChange
                }
                disabled={
                  loading
                }
              />

              {/* SELECTED IMAGE */}

              <BannerImageUpload
                label="Selected State Image"
                required={!isEditMode}
                preview={
                  selectedImagePreview
                }
                file={
                  form.selectedImage
                }
                onChange={
                  handleSelectedImageChange
                }
                disabled={
                  loading
                }
              />
            </div>

            {/* =================================================
                INFORMATION
            ================================================= */}

            <div
              style={{
                marginTop:
                  "18px",
                padding:
                  "13px 14px",
                borderRadius:
                  "12px",
                background:
                  colors.secondary,
                border: `1px solid ${colors.cardBorder}`,
                color:
                  colors.textMuted,
                fontSize:
                  "12px",
                lineHeight: 1.6,
              }}
            >
              <div
                style={{
                  color:
                    colors.textSecondary,
                  fontWeight: 600,
                  marginBottom:
                    "3px",
                }}
              >
                Banner Images
              </div>

              <div>
                Default image is used
                for the normal/unselected
                state.
              </div>

              <div>
                Selected image is used
                for the selected/active
                state.
              </div>

              {isEditMode && (
                <div
                  style={{
                    marginTop:
                      "4px",
                  }}
                >
                  Existing images will remain
                  unchanged unless you select
                  a new image.
                </div>
              )}
            </div>
          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div
            style={{
              padding:
                "20px 24px",
              borderTop: `1px solid ${colors.cardBorder}`,
              display: "flex",
              justifyContent:
                "flex-end",
              gap: "12px",
            }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={
                handleClose
              }
              disabled={
                loading
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              icon={Save}
              disabled={
                loading
              }
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Banner"
                  : "Create Banner"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

const BannerImageUpload = ({
  label,
  required,
  preview,
  file,
  onChange,
  disabled,
}) => {
  return (
    <div>
      {/* LABEL */}

      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color:
            colors.textSecondary,
          fontWeight: 600,
          fontSize: "13px",
        }}
      >
        {label}{" "}
        {required && (
          <span
            style={{
              color:
                colors.danger,
            }}
          >
            *
          </span>
        )}
      </label>

      {/* UPLOAD AREA */}

      <label
        style={{
          display: "block",
          cursor: disabled
            ? "not-allowed"
            : "pointer",
          opacity: disabled
            ? 0.6
            : 1,
        }}
      >
        <input
          type="file"
          name={
            label ===
            "Default State Image"
              ? "image"
              : "selectedImage"
          }
          accept="image/*"
          onChange={onChange}
          disabled={disabled}
          style={{
            display: "none",
          }}
        />

        <div
          style={{
            height: "190px",
            borderRadius:
              "14px",
            overflow: "hidden",
            background:
              colors.inputBg,
            border: `1px dashed ${colors.cardBorder}`,
            position:
              "relative",
          }}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt={label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* HOVER OVERLAY */}

              <div
                style={{
                  position:
                    "absolute",
                  inset: 0,
                  background:
                    "rgba(0,0,0,.55)",
                  display: "flex",
                  flexDirection:
                    "column",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  opacity: 0,
                  transition:
                    "opacity .2s",
                }}
                onMouseEnter={(
                  e
                ) => {
                  e.currentTarget.style.opacity = 1;
                }}
                onMouseLeave={(
                  e
                ) => {
                  e.currentTarget.style.opacity = 0;
                }}
              >
                <Upload
                  size={24}
                  color={
                    colors.white ||
                    "#ffffff"
                  }
                />

                <span
                  style={{
                    marginTop:
                      "8px",
                    color:
                      colors.white ||
                      "#ffffff",
                    fontSize:
                      "12px",
                    fontWeight: 600,
                  }}
                >
                  Change Image
                </span>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection:
                  "column",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius:
                    "12px",
                  background:
                    colors.secondary,
                  border: `1px solid ${colors.cardBorder}`,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  marginBottom:
                    "10px",
                }}
              >
                <ImageIcon
                  size={22}
                  color={
                    colors.accent
                  }
                />
              </div>

              <span
                style={{
                  color:
                    colors.textSecondary,
                  fontSize:
                    "13px",
                  fontWeight: 600,
                }}
              >
                Click to upload
              </span>

              <span
                style={{
                  color:
                    colors.textMuted,
                  fontSize:
                    "11px",
                  marginTop:
                    "4px",
                }}
              >
                PNG, JPG, WEBP
              </span>
            </div>
          )}
        </div>
      </label>

      {/* SELECTED FILE */}

      {file && (
        <div
          style={{
            marginTop:
              "8px",
            display: "flex",
            alignItems:
              "center",
            gap: "6px",
            color:
              colors.success,
            fontSize:
              "11px",
          }}
        >
          <Upload size={13} />

          <span
            style={{
              overflow:
                "hidden",
              textOverflow:
                "ellipsis",
              whiteSpace:
                "nowrap",
            }}
          >
            {file.name}
          </span>
        </div>
      )}

      {/* EXISTING IMAGE */}

      {!file && preview && (
        <div
          style={{
            marginTop:
              "8px",
            color:
              colors.textMuted,
            fontSize:
              "11px",
          }}
        >
          Existing image
        </div>
      )}
    </div>
  );
};

export default CreateHomeBannerModal;