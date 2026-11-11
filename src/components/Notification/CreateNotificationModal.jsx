// import { X, Plus, Calendar, Clock, Smartphone } from "lucide-react";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import { label } from "framer-motion/client";
// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { toast } from "sonner";
// import axios from "axios";
// import CreateCohortModal from "./CreateCohortModal"; // Import the modal above
// import axiosInstance from "../../api/axiosInstance";
// import CustomDropdown from "./CustomDropdown";
// import colors from "../../constants/colors";
// import Button from "../ui/Button";
// const CreateNotificationModal = ({ isOpen, onClose }) => {
//   // --- Form State ---
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     message: "",
//     audienceType: "all",
//     languages: [],
//     campaignTag: "",
//     scheduleDate: "",
//     scheduleTime: "",
//     deepLink: "",
//     imageFile: null, // ✅ NEW
//     imagePreview: "",
//     userIds: "",
//     reelId: "",
//   });
//   const isFormValid =
//     formData.title.trim().length > 0 &&
//     formData.message.trim().length > 0 &&
//     (formData.audienceType !== "custom" || formData.userIds.trim().length > 0);
//   const buildScheduledAt = () => {
//     if (!formData.scheduleDate || !formData.scheduleTime) return null;
//     // Split date & time
//     const [year, month, day] = formData.scheduleDate.split("-");
//     const [hour, minute] = formData.scheduleTime.split(":");
//     // India timezone offset
//     const offset = "+05:30";
//     return `${year}-${month}-${day}T${hour}:${minute}:00${offset}`;
//   };
//   const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
//   const audienceOptions = [
//     { label: "All", value: "all" },
//     { label: "Users", value: "users" },
//     { label: "Creators", value: "creators" },
//     { label: "Top Subscriptions", value: "top_subscriptions" },
//     { label: "Today's Signups", value: "todays_signup" },
//     { label: "Yesterday's Signups", value: "yesterdays_signup" },
//     { label: "Signup but No Recharge", value: "signup_no_recharge" },
//     {
//       label: "Recharged once, No Further Recharge",
//       value: "recharge_2_not_another",
//     },
//     { label: "Completed 3+ Min Calls", value: "completed_3_min_calls" },
//     {
//       label: "Creators Inactive Yesterday",
//       value: "creators_inactive_yesterday",
//     },
//     { label: "Creators Inactive (3 Days)", value: "creator_inactive_3days" },
//     { label: "Custom", value: "custom" },
//     { label: "Start Vibe Call Users", value: "start_vibe_call_users" }
//     // { label: "New Users", value: "new_users" },
//     // { label: "New Creators", value: "new_creators" },
//   ];
//   // --- Constants ---
//   // const languageOptions = [
//   //   { id: "hi", label: "हिंदी", value: "Hindi" },
//   //   { id: "en", label: "English", value: "English" },
//   //   { id: "ta", label: "தமிழ்", value: "Tamil" },
//   //   { id: "te", label: "తెలుగు", value: "Telugu" },
//   //   { id: "bn", label: "বাংলা", value: "Bengali" },
//   // ];
//   // const languageOptions = [
//   //   { id: "hi", label: "हिंदी", value: "हिंदी" },
//   //   { id: "en", label: "English", value: "English" },
//   //   { id: "ta", label: "தமிழ்", value: "தமிழ்" },
//   //   { id: "te", label: "తెలుగు", value: "తెలుగు" },
//   //   { id: "bn", label: "বাংলা", value: "বাংলা" },
//   // ];
//   const languageOptions = [
//   { id: "en", label: "English", value: "en" },
//   { id: "hi", label: "Hindi", value: "hi" },
//   { id: "hinglish", label: "Hinglish", value: "hinglish" },
//   { id: "bn", label: "Bengali", value: "bn" },
//   { id: "mr", label: "Marathi", value: "mr" },
//   { id: "gu", label: "Gujarati", value: "gu" },
//   { id: "pa", label: "Punjabi", value: "pa" },
//   { id: "ta", label: "Tamil", value: "ta" },
//   { id: "te", label: "Telugu", value: "te" },
//   { id: "kn", label: "Kannada", value: "kn" },
//   { id: "ml", label: "Malayalam", value: "ml" },
// ];
//   const cohortOptions = [
//     "All Users",
//     "New Users (0-7 days)",
//     "Active Users (7-30 days)",
//     "VIP Users (High spenders)",
//     "Premium Subscribers",
//     "Creators Only",
//   ];
//   const DEEPLINK_OPTIONS = [
//     {
//       label: "Home(User side)",
//       value: "chatspark://home",
//       type: "user",
//     },
//     {
//       label: "Wallet(Creator side)",
//       value: "chatspark://wallet",
//       type: "creator",
//     },
//     {
//       label: "Store(User side)",
//       value: "chatspark://store",
//       type: "user",
//     },
//     {
//       label: "Games Hub or Ludo Start(both sides)",
//       value: "chatspark://games",
//       type: "both",
//     },
//     {
//       label: "Creator Dashboard",
//       value: "chatspark://creator-home",
//       type: "creator",
//     },
//   ];
//   const handleScheduleNotification = async () => {
//     if (!isFormValid || isSubmitting) return;
//     try {
//       setIsSubmitting(true);
//       const formPayload = new FormData();
//       formPayload.append("title", formData.title.trim());
//       formPayload.append("body", formData.message.trim());
//       formPayload.append("channel", "push");
//       const scheduledAt = buildScheduledAt();
//       if (scheduledAt) {
//         formPayload.append("scheduledAt", scheduledAt);
//       }
//       formPayload.append("audience[type]", formData.audienceType);
//       if (formData.audienceType === "custom") {
//         formData.userIds
//           .split(",")
//           .map((id) => id.trim())
//           .filter(Boolean)
//           .forEach((id, index) => {
//             formPayload.append(`audience[userIds][${index}]`, id);
//           });
//       }
//       if (formData.campaignTag) {
//         formPayload.append("campaignTag", formData.campaignTag);
//       }
//       if (formData.deepLink) {
//         formPayload.append("deeplink", formData.deepLink);
//       }
//       if (formData.imageFile) {
//         const MAX_SIZE = 2 * 1024 * 1024;
//         if (formData.imageFile.size > MAX_SIZE) {
//           toast.error("Image size must be less than 2MB");
//           setIsSubmitting(false);
//           return;
//         }
//         formPayload.append("image", formData.imageFile);
//       }
//       // if (formData.languages.length > 0) {
//       //   formData.languages.forEach((lang, index) => {
//       //     formPayload.append(`targetedLanguages[${index}]`, lang);
//       //   });
//       // }
//       if (formData.languages.length > 0) {
//         formData.languages.forEach((lang) => {
//           formPayload.append("targetedLanguages", lang);
//         });
//       }
//       if (formData.reelId.trim()) {
//   formPayload.append("reelId", formData.reelId.trim());
// }
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "https://sandbox.agamiastro.in/api/v1/admin/notifications/send",
//         formPayload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       toast.success("Notification scheduled successfully");
//       onClose();
//     } catch (err) {
//       console.error("Notification send failed", err);
//       toast.error("Failed to schedule notification");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   // const toggleLanguage = (langLabel) => {
//   //   setFormData((prev) => {
//   //     const exists = prev.languages.includes(langLabel);
//   //     if (exists) {
//   //       return {
//   //         ...prev,
//   //         languages: prev.languages.filter((l) => l !== langLabel),
//   //       };
//   //     } else {
//   //       return { ...prev, languages: [...prev.languages, langLabel] };
//   //     }
//   //   });
//   // };
//   const toggleLanguage = (language) => {
//     setFormData((prev) => ({
//       ...prev,
//       languages: prev.languages.includes(language)
//         ? prev.languages.filter((l) => l !== language)
//         : [...prev.languages, language],
//     }));
//   };
//   const handleCohortCreate = (newCohortData) => {
//     // Logic to add the new cohort to your options would go here
//     console.log("New Cohort Created:", newCohortData);
//     // Auto-select the new cohort logic could go here
//     setFormData({ ...formData, cohort: newCohortData.name });
//   };
//   // --- Styles ---
//   const inputClass =
//     "w-full bg-[#303030] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors placeholder-gray-500 text-sm";
//   const labelClass =
//     "block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide";
//   if (!isOpen) return null;
//   const getFilteredDeepLinks = () => {
//     const audience = formData.audienceType;
//     if (audience === "all") {
//       return DEEPLINK_OPTIONS;
//     }
//     if (audience === "users") {
//       return DEEPLINK_OPTIONS.filter(
//         (d) => d.type === "user" || d.type === "both",
//       );
//     }
//     if (audience === "creators") {
//       return DEEPLINK_OPTIONS.filter(
//         (d) => d.type === "creator" || d.type === "both",
//       );
//     }
//     // default fallback
//     return DEEPLINK_OPTIONS;
//   };
// //   return (
// //     <AnimatePresence>
// //       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
// //         {/* Main Modal Container */}
// //         <motion.div
// //           initial={{ scale: 0.95, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //           exit={{ scale: 0.95, opacity: 0 }}
// //           className="w-full max-w-5xl h-[80vh] rounded-3xl border border-yellow-500/20 bg-[#1A1A1A] 
// //           flex flex-col overflow-hidden shadow-2xl relative"
// //         >
// //           {/* Header */}
// //           <div className="px-6 py-2 border-b border-white/5 flex justify-between items-center bg-[#1A1A1A]">
// //             <div>
// //               <h2 className="text-2xl font-bold text-white">
// //                 Create New Notification
// //               </h2>
// //               <p className="text-yellow-500 text-sm mt-1">
// //                 Schedule and customize a new notification
// //               </p>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
// //             >
// //               <X size={28} />
// //             </button>
// //           </div>
// //           {/* Content Grid (Split View) */}
// //           <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
// //             {/* LEFT COLUMN: Form Inputs */}
// //             <div className="flex-1 p-6 overflow-y-auto no-scrollbar border-r border-white/5">
// //               <div className="space-y-4 max-w-xl">
// //                 {/* Title */}
// //                 <div>
// //                   <label className={labelClass}>Notification Title</label>
// //                   <input
// //                     type="text"
// //                     placeholder="e.g., New Feature Available"
// //                     className={inputClass}
// //                     value={formData.title}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, title: e.target.value })
// //                     }
// //                   />
// //                 </div>
// //                 {/* Message */}
// //                 <div>
// //                   <label className={labelClass}>Message</label>
// //                   <textarea
// //                     placeholder="Notification Message"
// //                     className={`${inputClass} h-28 resize-none`}
// //                     value={formData.message}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, message: e.target.value })
// //                     }
// //                   />
// //                 </div>
// //                 {/* Notification Image */}
// //                 {formData.audienceType !== "start_vibe_call_users" && (<div>
// //                   <label className={labelClass}>
// //                     Notification Image (Optional)
// //                   </label>
// //                   <div className="bg-[#303030] border border-white/10 rounded-xl p-4">
// //                     {!formData.imagePreview ? (
// //                       <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-400 hover:text-white transition">
// //                         <Plus size={20} />
// //                         <span className="text-sm font-medium">
// //                           Upload image from your PC
// //                         </span>
// //                         <span className="text-xs text-gray-500">
// //                           PNG, JPG (must be less than 2MB)
// //                         </span>
// //                         <input
// //                           type="file"
// //                           accept="image/png,image/jpeg,image/jpg"
// //                           className="hidden"
// //                           onChange={(e) => {
// //                             const file = e.target.files[0];
// //                             if (!file) return;
// //                             setFormData({
// //                               ...formData,
// //                               imageFile: file,
// //                               imagePreview: URL.createObjectURL(file),
// //                             });
// //                           }}
// //                         />
// //                       </label>
// //                     ) : (
// //                       <div className="relative">
// //                         <img
// //                           src={formData.imagePreview}
// //                           alt="Preview"
// //                           className="w-full h-40 object-cover rounded-lg"
// //                         />
// //                         <button
// //                           onClick={() =>
// //                             setFormData({
// //                               ...formData,
// //                               imageFile: null,
// //                               imagePreview: "",
// //                             })
// //                           }
// //                           className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white rounded-full p-1"
// //                         >
// //                           <X size={16} />
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>)
// //                 }
// //                 {/* User Cohort Row */}
// //                 <div>
// //                   <div className="flex justify-between items-center mb-1.5">
// //                   </div>
// //                   <CustomDropdown
// //                     options={audienceOptions.map((o) => o.label)}
// //                     value={
// //                       audienceOptions.find(
// //                         (o) => o.value === formData.audienceType,
// //                       )?.label
// //                     }
// //                     onChange={(label) => {
// //                       const selected = audienceOptions.find(
// //                         (o) => o.label === label,
// //                       );
// //                       setFormData({
// //                         ...formData,
// //                         audienceType: selected.value,
// //                         deepLink:
// //                           selected.value === "start_vibe_call_users"
// //                             ? ""
// //                             : formData.deepLink,
// //                         imageFile:
// //                           selected.value === "start_vibe_call_users"
// //                             ? null
// //                             : formData.imageFile,
// //                         imagePreview:
// //                           selected.value === "start_vibe_call_users"
// //                             ? ""
// //                             : formData.imagePreview,
// //                       });
// //                     }}
// //                   />
// //                   <p
// //                     className="text-[13px]  mt-1.5"
// //                     style={{ color: colors.accent }}
// //                   >
// //                     Target specific user segments based on behavior and
// //                     activity.
// //                   </p>
// //                 </div>
// //                 {formData.audienceType === "custom" && (
// //                   <div className="mt-3">
// //                     <label className={labelClass}>
// //                       User IDs <span className="text-red-400">*</span>
// //                     </label>
// //                     <textarea
// //                       placeholder="Enter user IDs separated by commas"
// //                       className={`${inputClass} h-24 resize-none`}
// //                       value={formData.userIds}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, userIds: e.target.value })
// //                       }
// //                     />
// //                   </div>
// //                 )}
// //                 {/* Target Languages */}
// //                 {/* <div>
// //                   <label className={labelClass}>Target Languages</label>
// //                   <div className="bg-[#303030] rounded-xl p-4 border border-white/10">
// //                     <div className="flex flex-wrap gap-3">
// //                       {languageOptions.map((lang) => {
// //                         const isSelected = formData.languages.includes(
// //                           lang.label,
// //                         );
// //                         return (
// //                           <div
// //                             key={lang.id}
// //                             onClick={() => toggleLanguage(lang.label)}
// // <<<<<<< HEAD
// //                             className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border ${
// //                               isSelected
// //                                 ? "bg-blue-600/20 border-blue-500"
// //                                 : "bg-[#222222] border-white/5 hover:bg-[#2a2a2a]"
// //                             }`}
// //                           >
// //                             <div
// //                               className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
// //                                 isSelected
// //                                   ? "bg-blue-500 border-blue-500"
// //                                   : "border-gray-500"
// //                               }`}
// // =======
// //                             className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border ${isSelected
// //                               ? "bg-blue-600/20 border-blue-500"
// //                               : "bg-[#222222] border-white/5 hover:bg-[#2a2a2a]"
// //                               }`}
// //                           >
// //                             <div
// //                               className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected
// //                                 ? "bg-blue-500 border-blue-500"
// //                                 : "border-gray-500"
// //                                 }`}
// // >>>>>>> 0ff5faf7b16a0808ff872c1e74ae9e38b5a2ddd4
// //                             >
// //                               {isSelected && (
// //                                 <span className="text-white text-[10px]">
// //                                   ✓
// //                                 </span>
// //                               )}
// //                             </div>
// //                             <span
// //                               className={`text-sm ${isSelected ? "text-blue-400 font-bold" : "text-gray-400"}`}
// //                             >
// //                               {lang.label}
// //                             </span>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                     <div className="mt-3 text-xs text-yellow-500 font-medium">
// //                       Selected:{" "}
// //                       <span className="text-white">
// //                         {formData.languages.length > 0
// //                           ? formData.languages.join(", ")
// //                           : "None"}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div> */}
// //                 <div>
// //                   <label className={labelClass}>Target Languages (Optional)</label>
// //                   <div className="bg-[#303030] rounded-xl p-4 border border-white/10">
// //                     <div className="flex flex-wrap gap-3">
// //                       {languageOptions.map((lang) => {
// //                         const isSelected = formData.languages.includes(lang.value);
// //                         return (
// //                           <div
// //                             key={lang.id}
// //                             onClick={() => toggleLanguage(lang.value)}
// //                             className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition
// //               ${isSelected
// //                                 ? "bg-yellow-500/20 border-yellow-500"
// //                                 : "bg-[#222] border-white/10 hover:bg-[#2a2a2a]"
// //                               }`}
// //                           >
// //                             <div
// //                               className={`w-4 h-4 rounded border flex items-center justify-center
// //                 ${isSelected
// //                                   ? "bg-yellow-500 border-yellow-500"
// //                                   : "border-gray-500"
// //                                 }`}
// //                             >
// //                               {isSelected && (
// //                                 <span className="text-black text-[10px]">✓</span>
// //                               )}
// //                             </div>
// //                             <span
// //                               className={`text-sm ${isSelected ? "text-yellow-400" : "text-gray-300"
// //                                 }`}
// //                             >
// //                               {lang.label}
// //                             </span>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                     <p className="mt-3 text-xs text-gray-400">
// //                       Leave empty to send to all languages.
// //                     </p>
// //                   </div>
// //                 </div>
// //                 {formData.audienceType !== "start_vibe_call_users" && (
// //                   <div>
// //                     <label className={labelClass}>Deep Link (Optional)</label>
// //                     <CustomDropdown
// //                       options={getFilteredDeepLinks().map((d) => d.label)}
// //                       value={
// //                         DEEPLINK_OPTIONS.find(
// //                           (d) => d.value === formData.deepLink,
// //                         )?.label || "Select destination"
// //                       }
// //                       onChange={(label) => {
// //                         const selected = getFilteredDeepLinks().find(
// //                           (d) => d.label === label,
// //                         );
// //                         setFormData({
// //                           ...formData,
// //                           deepLink: selected?.value || "",
// //                         });
// //                       }}
// //                     />
// //                     {formData.deepLink && (
// //                       <p className="mt-2 text-xs text-gray-400">
// //                         Deep link:{" "}
// //                         <span className="text-yellow-500 font-mono">
// //                           {formData.deepLink}
// //                         </span>
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}
// //                 {/* Date & Time Row */}
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className={labelClass}>Schedule Date</label>
// //                     <div className="relative">
// //                       <input
// //                         type="date"
// //                         className={inputClass}
// //                         value={formData.scheduleDate}
// //                         onChange={(e) =>
// //                           setFormData({
// //                             ...formData,
// //                             scheduleDate: e.target.value,
// //                           })
// //                         }
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label className={labelClass}>Schedule Time</label>
// //                     <div className="relative">
// //                       <input
// //                         type="time"
// //                         className={inputClass}
// //                         value={formData.scheduleTime}
// //                         onChange={(e) =>
// //                           setFormData({
// //                             ...formData,
// //                             scheduleTime: e.target.value,
// //                           })
// //                         }
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className={labelClass}>Campaign Tag (Optional)</label>
// //                   <input
// //                     type="text"
// //                     placeholder="Optional Campaign Tag"
// //                     className={inputClass}
// //                     value={formData.campaignTag}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, campaignTag: e.target.value })
// //                     }
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //             {/* RIGHT COLUMN: Mobile Preview */}
// //             <div className="w-full lg:w-[400px] bg-[#151515] p-8 flex flex-col items-center justify-center border-l border-white/5 relative">
// //               <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
// //                 <Smartphone size={16} className="text-yellow-500" />
// //                 Mobile Preview
// //               </h3>
// //               {/* Phone Mockup Frame */}
// //               <div
// //                 className="relative w-80 h-160 bg-black rounded-[2.5rem] 
// //               border-[8px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10"
// //               >
// //                 {/* Status Bar */}
// //                 <div className="h-5 w-full bg-black flex justify-between px-6 items-center pt-2">
// //                   <div className="text-[10px] text-white font-bold">9:41</div>
// //                   <div className="flex gap-1">
// //                     {/* <div className="w-4 h-4 bg-white/20 rounded-full"></div>
// //                     <div className="w-3 h-3 bg-white/20 rounded-full"></div> */}
// //                   </div>
// //                 </div>
// //                 {/* Screen Content - Notification Toast */}
// //                 <div className="p-4 pt-6 bg-gradient-to-b from-[#1a1a1a] to-black h-full relative">
// //                   {/* The Actual Notification Card Preview */}
// //                   <motion.div
// //                     initial={{ y: -20, opacity: 0 }}
// //                     animate={{ y: 0, opacity: 1 }}
// //                     className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg relative overflow-hidden"
// //                   >
// //                     {/* App Icon & Name */}
// //                     <div className="flex items-center gap-2 mb-2">
// //                       <div className="w-5 h-5 rounded-md bg-yellow-500 flex items-center justify-center text-black font-bold text-[10px]">
// //                         H
// //                       </div>
// //                       <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
// //                         HangoutClub
// //                       </span>
// //                       <span className="text-[10px] text-gray-300 ml-auto">
// //                         now
// //                       </span>
// //                     </div>
// //                     {/* Content */}
// //                     <div>
// //                       <h4 className="text-white font-bold text-sm leading-tight mb-1">
// //                         {formData.title || "Notification Title"}
// //                       </h4>
// //                       <p className="text-gray-300 text-xs leading-snug">
// //                         {formData.message ||
// //                           "Your notification message will appear here exactly as the user sees it."}
// //                       </p>
// //                       {/* {formData.imagePreview && (
// //                         <img
// //                           src={formData.imagePreview}
// //                           alt="notification"
// //                           className="mt-2 rounded-lg w-full h-24 object-cover"
// //                         />
// //                       )} */}
// //                       {formData.audienceType === "start_vibe_call_users" ? (
// //                         <button
// //                           className="mt-4 w-full py-3 rounded-full font-bold text-white text-sm
// //     bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg"
// //                         >
// //                           Connect Now
// //                         </button>
// //                       ) : (
// //                         formData.imagePreview && (
// //                           <img
// //                             src={formData.imagePreview}
// //                             alt="notification"
// //                             className="mt-2 rounded-lg w-full h-24 object-cover"
// //                           />
// //                         )
// //                       )}
// //                     </div>
// //                     {/* Glossy Effect */}
// //                     <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/5 to-transparent pointer-events-none"></div>
// //                   </motion.div>
// //                   {/* Tips Box */}
// //                   <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
// //                     <p className="text-blue-200 text-xs leading-relaxed">
// //                       <strong className="text-blue-400">Tip:</strong> Keep
// //                       titles under 40 characters and messages under 120
// //                       characters for the best click-through rates on iOS and
// //                       Android.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           {/* Footer */}
// //           <div className="p-4  border-white/5 bg-[#1A1A1A] flex gap-6 justify-end items-center">
// //             <Button
// //               variant="secondary"
// //               className="text-gray-400 hover:text-white font-bold text-sm transition-colors"
// //             >
// //               Save as Draft
// //             </Button>
// //             {/* <Button
// //               variant="accent"
// //               className="px-8 py-2 rounded-xl"
// //               onClick={handleScheduleNotification}
// //             >
// //               Schedule
// //             </Button> */}
// //             <Button
// //               variant="accent"
// //               className={`px-8 py-2 rounded-xl flex items-center gap-2 ${!isFormValid || isSubmitting
// //                 ? "opacity-60 cursor-not-allowed"
// //                 : ""
// //                 }`}
// //               onClick={handleScheduleNotification}
// //               disabled={!isFormValid || isSubmitting}
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
// //                   Scheduling…
// //                 </>
// //               ) : (
// //                 "Schedule"
// //               )}
// //             </Button>
// //           </div>
// //         </motion.div>
// //         {/* --- Nested Cohort Modal --- */}
// //         <CreateCohortModal
// //           isOpen={isCohortModalOpen}
// //           onClose={() => setIsCohortModalOpen(false)}
// //           onSave={handleCohortCreate}
// //         />
// //       </div>
// //     </AnimatePresence>
// //   );
// return (
//   <AnimatePresence>
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
//       style={{
//         backgroundColor: colors.overlay,
//       }}
//     >
//       {/* Main Modal Container */}
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.95, opacity: 0 }}
//         className="w-full max-w-5xl h-[80vh] rounded-3xl border flex flex-col overflow-hidden shadow-2xl relative"
//         style={{
//           background: colors.gradientCard,
//           borderColor: `${colors.accent}33`,
//         }}
//       >
//         {/* Header */}
//         <div
//           className="px-6 py-3 border-b flex justify-between items-center"
//           style={{
//             backgroundColor: colors.primary,
//             borderColor: colors.cardBorder,
//           }}
//         >
//           <div>
//             <h2
//               className="text-2xl font-bold"
//               style={{ color: colors.textPrimary }}
//             >
//               Create New Notification
//             </h2>
//             <p
//               className="text-sm mt-1"
//               style={{ color: colors.accent }}
//             >
//               Schedule and customize a new notification
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full transition-colors"
//             style={{
//               color: colors.textMuted,
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.color = colors.textPrimary;
//               e.currentTarget.style.backgroundColor = colors.hover;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.color = colors.textMuted;
//               e.currentTarget.style.backgroundColor = "transparent";
//             }}
//           >
//             <X size={28} />
//           </button>
//         </div>
//         {/* Content Grid */}
//         <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
//           {/* LEFT COLUMN */}
//           <div
//             className="flex-1 p-6 overflow-y-auto no-scrollbar border-r"
//             style={{
//               borderColor: colors.cardBorder,
//             }}
//           >
//             <div className="space-y-4 max-w-xl">
//               {/* Title */}
//               <div>
//                 <label className={labelClass}>
//                   Notification Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., New Feature Available"
//                   className={inputClass}
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       title: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               {/* Message */}
//               <div>
//                 <label className={labelClass}>
//                   Message
//                 </label>
//                 <textarea
//                   placeholder="Notification Message"
//                   className={`${inputClass} h-28 resize-none`}
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       message: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               {/* Notification Image */}
//               {formData.audienceType !== "start_vibe_call_users" && (
//                 <div>
//                   <label className={labelClass}>
//                     Notification Image (Optional)
//                   </label>
//                   <div
//                     className="rounded-xl p-4 border"
//                     style={{
//                       backgroundColor: colors.inputBg,
//                       borderColor: colors.inputBorder,
//                     }}
//                   >
//                     {!formData.imagePreview ? (
//                       <label
//                         className="flex flex-col items-center justify-center gap-2 cursor-pointer transition"
//                         style={{
//                           color: colors.textMuted,
//                         }}
//                       >
//                         <Plus size={20} />
//                         <span
//                           className="text-sm font-medium"
//                           style={{
//                             color: colors.textSecondary,
//                           }}
//                         >
//                           Upload image from your PC
//                         </span>
//                         <span
//                           className="text-xs"
//                           style={{
//                             color: colors.textMuted,
//                           }}
//                         >
//                           PNG, JPG (must be less than 2MB)
//                         </span>
//                         <input
//                           type="file"
//                           accept="image/png,image/jpeg,image/jpg"
//                           className="hidden"
//                           onChange={(e) => {
//                             const file = e.target.files[0];
//                             if (!file) return;
//                             setFormData({
//                               ...formData,
//                               imageFile: file,
//                               imagePreview:
//                                 URL.createObjectURL(file),
//                             });
//                           }}
//                         />
//                       </label>
//                     ) : (
//                       <div className="relative">
//                         <img
//                           src={formData.imagePreview}
//                           alt="Preview"
//                           className="w-full h-40 object-cover rounded-lg"
//                         />
//                         <button
//                           onClick={() =>
//                             setFormData({
//                               ...formData,
//                               imageFile: null,
//                               imagePreview: "",
//                             })
//                           }
//                           className="absolute top-2 right-2 rounded-full p-1 transition"
//                           style={{
//                             backgroundColor: colors.overlay,
//                             color: colors.textPrimary,
//                           }}
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//               {/* User Cohort */}
//               {/* <div>
//                 <CustomDropdown
//                   options={audienceOptions.map((o) => o.label)}
//                   value={
//                     audienceOptions.find(
//                       (o) =>
//                         o.value === formData.audienceType
//                     )?.label
//                   }
//                   onChange={(label) => {
//                     const selected =
//                       audienceOptions.find(
//                         (o) => o.label === label
//                       );
//                     setFormData({
//                       ...formData,
//                       audienceType: selected.value,
//                       deepLink:
//                         selected.value ===
//                         "start_vibe_call_users"
//                           ? ""
//                           : formData.deepLink,
//                       imageFile:
//                         selected.value ===
//                         "start_vibe_call_users"
//                           ? null
//                           : formData.imageFile,
//                       imagePreview:
//                         selected.value ===
//                         "start_vibe_call_users"
//                           ? ""
//                           : formData.imagePreview,
//                     });
//                   }}
//                 />
//                 <p
//                   className="text-[13px] mt-1.5"
//                   style={{
//                     color: colors.accent,
//                   }}
//                 >
//                   Target specific user segments based on
//                   behavior and activity.
//                 </p>
//               </div> */}
//               {/* Custom User IDs */}
//               {/* {formData.audienceType === "custom" && (
//                 <div className="mt-3">
//                   <label className={labelClass}>
//                     User IDs{" "}
//                     <span style={{ color: colors.danger }}>
//                       *
//                     </span>
//                   </label>
//                   <textarea
//                     placeholder="Enter user IDs separated by commas"
//                     className={`${inputClass} h-24 resize-none`}
//                     value={formData.userIds}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         userIds: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//               )} */}
//               {/* Target Languages */}
//               <div>
//                 <label className={labelClass}>
//                   Target Languages (Optional)
//                 </label>
//                 <div
//                   className="rounded-xl p-4 border"
//                   style={{
//                     backgroundColor: colors.inputBg,
//                     borderColor: colors.inputBorder,
//                   }}
//                 >
//                   <div className="flex flex-wrap gap-3">
//                     {languageOptions.map((lang) => {
//                       const isSelected =
//                         formData.languages.includes(
//                           lang.value
//                         );
//                       return (
//                         <div
//                           key={lang.id}
//                           onClick={() =>
//                             toggleLanguage(lang.value)
//                           }
//                           className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition"
//                           style={{
//                             backgroundColor: isSelected
//                               ? colors.hover
//                               : colors.cardBg,
//                             borderColor: isSelected
//                               ? colors.accent
//                               : colors.inputBorder,
//                           }}
//                         >
//                           <div
//                             className="w-4 h-4 rounded border flex items-center justify-center"
//                             style={{
//                               backgroundColor: isSelected
//                                 ? colors.accent
//                                 : "transparent",
//                               borderColor: isSelected
//                                 ? colors.accent
//                                 : colors.textMuted,
//                             }}
//                           >
//                             {isSelected && (
//                               <span
//                                 className="text-black text-[10px]"
//                               >
//                                 ✓
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className="text-sm"
//                             style={{
//                               color: isSelected
//                                 ? colors.accentLight
//                                 : colors.textSecondary,
//                             }}
//                           >
//                             {lang.label}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <p
//                     className="mt-3 text-xs"
//                     style={{
//                       color: colors.textMuted,
//                     }}
//                   >
//                     Leave empty to send to all languages.
//                   </p>
//                 </div>
//               </div>
//               {/* Deep Link */}
//               {/* {formData.audienceType !==
//                 "start_vibe_call_users" && (
//                 <div>
//                   <label className={labelClass}>
//                     Deep Link (Optional)
//                   </label>
//                   <CustomDropdown
//                     options={getFilteredDeepLinks().map(
//                       (d) => d.label
//                     )}
//                     value={
//                       DEEPLINK_OPTIONS.find(
//                         (d) =>
//                           d.value === formData.deepLink
//                       )?.label ||
//                       "Select destination"
//                     }
//                     onChange={(label) => {
//                       const selected =
//                         getFilteredDeepLinks().find(
//                           (d) => d.label === label
//                         );
//                       setFormData({
//                         ...formData,
//                         deepLink:
//                           selected?.value || "",
//                       });
//                     }}
//                   />
//                   {formData.deepLink && (
//                     <p
//                       className="mt-2 text-xs"
//                       style={{
//                         color: colors.textMuted,
//                       }}
//                     >
//                       Deep link:{" "}
//                       <span
//                         className="font-mono"
//                         style={{
//                           color: colors.accent,
//                         }}
//                       >
//                         {formData.deepLink}
//                       </span>
//                     </p>
//                   )}
//                 </div>
//               )} */}
//               {/* Date & Time */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelClass}>
//                     Schedule Date
//                   </label>
//                   <input
//                     type="date"
//                     className={inputClass}
//                     value={formData.scheduleDate}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         scheduleDate: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClass}>
//                     Schedule Time
//                   </label>
//                   <input
//                     type="time"
//                     className={inputClass}
//                     value={formData.scheduleTime}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         scheduleTime: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//               </div>
//               {/* Campaign Tag */}
//               <div>
//                 <label className={labelClass}>
//                   Campaign Tag (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Optional Campaign Tag"
//                   className={inputClass}
//                   value={formData.campaignTag}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       campaignTag: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               {/* Reel ID */}
// <div>
//   <label className={labelClass}>
//     Reel ID
//   </label>
//   <input
//     type="text"
//     placeholder="Enter Reel ID"
//     className={inputClass}
//     value={formData.reelId}
//     onChange={(e) =>
//       setFormData({
//         ...formData,
//         reelId: e.target.value,
//       })
//     }
//   />
// </div>
//             </div>
//           </div>
//           {/* RIGHT COLUMN - MOBILE PREVIEW */}
//           <div
//             className="w-full lg:w-[400px] p-8 flex flex-col items-center justify-center border-l relative"
//             style={{
//               backgroundColor: colors.primary,
//               borderColor: colors.cardBorder,
//             }}
//           >
//             <h3
//               className="font-bold text-sm mb-6 flex items-center gap-2"
//               style={{
//                 color: colors.textPrimary,
//               }}
//             >
//               <Smartphone
//                 size={16}
//                 style={{
//                   color: colors.accent,
//                 }}
//               />
//               Mobile Preview
//             </h3>
//             {/* Phone */}
//             <div
//               className="relative w-80 h-[640px] bg-black rounded-[2.5rem] border-[8px] shadow-2xl overflow-hidden"
//               style={{
//                 borderColor: colors.cardHover,
//               }}
//             >
//               {/* Status Bar */}
//               <div className="h-5 w-full bg-black flex justify-between px-6 items-center pt-2">
//                 <div className="text-[10px] text-white font-bold">
//                   9:41
//                 </div>
//               </div>
//               {/* Screen */}
//               <div
//                 className="p-4 pt-6 h-full relative"
//                 style={{
//                   background:
//                     "linear-gradient(to bottom, #1A1A1A, #000000)",
//                 }}
//               >
//                 {/* Notification */}
//                 <motion.div
//                   initial={{ y: -20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   className="backdrop-blur-md border p-4 rounded-2xl shadow-lg relative overflow-hidden"
//                   style={{
//                     backgroundColor:
//                       "rgba(255,255,255,0.08)",
//                     borderColor:
//                       "rgba(255,255,255,0.1)",
//                   }}
//                 >
//                   {/* App Header */}
//                   <div className="flex items-center gap-2 mb-2">
//                     <div
//                       className="w-5 h-5 rounded-md flex items-center justify-center text-black font-bold text-[10px]"
//                       style={{
//                         backgroundColor: colors.accent,
//                       }}
//                     >
//                       H
//                     </div>
//                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
//                       HangoutClub
//                     </span>
//                     <span className="text-[10px] text-gray-300 ml-auto">
//                       now
//                     </span>
//                   </div>
//                   {/* Content */}
//                   <div>
//                     <h4 className="text-white font-bold text-sm leading-tight mb-1">
//                       {formData.title ||
//                         "Notification Title"}
//                     </h4>
//                     <p className="text-gray-300 text-xs leading-snug">
//                       {formData.message ||
//                         "Your notification message will appear here exactly as the user sees it."}
//                     </p>
//                     {/* Vibe Call */}
//                     {formData.audienceType ===
//                     "start_vibe_call_users" ? (
//                       <button
//                         className="mt-4 w-full py-3 rounded-full font-bold text-white text-sm shadow-lg"
//                         style={{
//                           background:
//                             colors.gradientButton,
//                         }}
//                       >
//                         Connect Now
//                       </button>
//                     ) : (
//                       formData.imagePreview && (
//                         <img
//                           src={formData.imagePreview}
//                           alt="notification"
//                           className="mt-2 rounded-lg w-full h-24 object-cover"
//                         />
//                       )
//                     )}
//                   </div>
//                   {/* Glossy Effect */}
//                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
//                 </motion.div>
//                 {/* Tip */}
//                 <div
//                   className="mt-8 p-4 rounded-xl border"
//                   style={{
//                     backgroundColor:
//                       "rgba(212,175,55,0.08)",
//                     borderColor:
//                       "rgba(212,175,55,0.2)",
//                   }}
//                 >
//                   <p
//                     className="text-xs leading-relaxed"
//                     style={{
//                       color: colors.textSecondary,
//                     }}
//                   >
//                     <strong
//                       style={{
//                         color: colors.accent,
//                       }}
//                     >
//                       Tip:
//                     </strong>{" "}
//                     Keep titles under 40 characters and
//                     messages under 120 characters for the
//                     best click-through rates on iOS and
//                     Android.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Footer */}
//         <div
//           className="p-4 border-t flex gap-6 justify-end items-center"
//           style={{
//             backgroundColor: colors.primary,
//             borderColor: colors.cardBorder,
//           }}
//         >
//           <Button
//             variant="secondary"
//             className="font-bold text-sm transition-colors"
//           >
//             Save as Draft
//           </Button>
//           <Button
//             variant="accent"
//             className={`px-8 py-2 rounded-xl flex items-center gap-2 ${
//               !isFormValid || isSubmitting
//                 ? "opacity-60 cursor-not-allowed"
//                 : ""
//             }`}
//             onClick={handleScheduleNotification}
//             disabled={!isFormValid || isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
//                 Scheduling…
//               </>
//             ) : (
//               "Schedule"
//             )}
//           </Button>
//         </div>
//       </motion.div>
//       {/* Nested Cohort Modal */}
//       <CreateCohortModal
//         isOpen={isCohortModalOpen}
//         onClose={() => setIsCohortModalOpen(false)}
//         onSave={handleCohortCreate}
//       />
//     </div>
//   </AnimatePresence>
// );
// };
// export default CreateNotificationModal;
import { X, Plus, Smartphone, Search, Loader2, Play, } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

import CustomDropdown from "./CustomDropdown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


const BASE_URL = "https://sandbox.agamiastro.in/api/v1";

// --------------------------------------------------
// DESTINATION OPTIONS
// --------------------------------------------------

const DESTINATION_OPTIONS = [
  { label: "Today (Home)", value: "/today" },
  { label: "Rashifal", value: "/rashifal" },
  { label: "Astrologer Chat", value: "/astrologer" },
  {
    label: "Past Conversations",
    value: "/astrologer/past-conversations",
  },
  {
    label: "Saved Answers",
    value: "/astrologer/saved-answers",
  },
  { label: "Kundali", value: "/kundali" },
  { label: "Profile", value: "/profile" },
  { label: "Bhakti Feed", value: "/bhakti" },
  { label: "Specific Reel/Video", value: "reel" },
];

// --------------------------------------------------
// AUDIENCE OPTIONS
// --------------------------------------------------

const AUDIENCE_OPTIONS = [
  { label: "All", value: "all" },
  // { label: "Users", value: "users" },
  // { label: "Creators", value: "creators" },
  // { label: "Top Subscriptions", value: "top_subscriptions" },
  // { label: "Today's Signups", value: "todays_signup" },
  // { label: "Yesterday's Signups", value: "yesterdays_signup" },
  // {
  //   label: "Signup but No Recharge",
  //   value: "signup_no_recharge",
  // },
  // {
  //   label: "Recharged Once, No Further Recharge",
  //   value: "recharge_2_not_another",
  // },
  // {
  //   label: "Completed 3+ Min Calls",
  //   value: "completed_3_min_calls",
  // },
  // {
  //   label: "Creators Inactive Yesterday",
  //   value: "creators_inactive_yesterday",
  // },
  // {
  //   label: "Creators Inactive (3 Days)",
  //   value: "creator_inactive_3days",
  // },
  // {
  //   label: "Start Vibe Call Users",
  //   value: "start_vibe_call_users",
  // },
  { label: "Custom", value: "custom" },
];

// --------------------------------------------------
// LANGUAGE OPTIONS
// --------------------------------------------------

const LANGUAGE_OPTIONS = [
  { id: "en", label: "English", value: "en" },
  { id: "hi", label: "Hindi", value: "hi" },
  { id: "hinglish", label: "Hinglish", value: "hinglish" },
  { id: "bn", label: "Bengali", value: "bn" },
  { id: "mr", label: "Marathi", value: "mr" },
  { id: "gu", label: "Gujarati", value: "gu" },
  { id: "pa", label: "Punjabi", value: "pa" },
  { id: "ta", label: "Tamil", value: "ta" },
  { id: "te", label: "Telugu", value: "te" },
  { id: "kn", label: "Kannada", value: "kn" },
  { id: "ml", label: "Malayalam", value: "ml" },
];

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const CreateNotificationModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audienceType: "all",
    languages: [],
    scheduleDate: "",
    scheduleTime: "",
    imageFile: null,
    imagePreview: "",
    userIds: "",
    destination: "/today",
  });

  // Reel States
  const [reels, setReels] = useState([]);
  const [reelsLoading, setReelsLoading] = useState(false);
  const [reelSearch, setReelSearch] = useState("");
  const [reelCategory, setReelCategory] = useState("");
  const [selectedReel, setSelectedReel] = useState(null);

  // --------------------------------------------------
  // STYLES
  // --------------------------------------------------

  const labelClass =
    "block text-xs font-bold mb-1.5 uppercase tracking-wide";

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors";

  const inputStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
  };

  // --------------------------------------------------
  // FETCH REELS
  // --------------------------------------------------

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const fetchReels = async () => {
      try {
        setReelsLoading(true);

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${BASE_URL}/admin-reels`,
          {
            params: {
              page: 1,
              limit: 50,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const items = response.data?.data?.items || [];

        if (!isMounted) return;

        // Only published / active reels
        const activeReels = items.filter(
          (reel) => reel.status === "active"
        );

        setReels(activeReels);
      } catch (error) {
        console.error("Failed to fetch reels:", error);

        if (isMounted) {
          toast.error(
            error.response?.data?.message ||
              "Failed to load reels"
          );

          setReels([]);
        }
      } finally {
        if (isMounted) {
          setReelsLoading(false);
        }
      }
    };

    fetchReels();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // --------------------------------------------------
  // REEL SEARCH
  // --------------------------------------------------

  const filteredReels = useMemo(() => {
    return reels.filter((reel) => {
      const matchesSearch = reel.title
        ?.toLowerCase()
        .includes(reelSearch.toLowerCase());

      const categories = Array.isArray(reel.categories)
        ? reel.categories
        : reel.categories
          ? [reel.categories]
          : [];

      const matchesCategory =
        !reelCategory || categories.includes(reelCategory);

      return matchesSearch && matchesCategory;
    });
  }, [reels, reelSearch, reelCategory]);

  // --------------------------------------------------
  // REEL CATEGORIES
  // --------------------------------------------------

  const reelCategories = useMemo(() => {
    const categories = reels.flatMap((reel) =>
      Array.isArray(reel.categories)
        ? reel.categories
        : reel.categories
          ? [reel.categories]
          : []
    );

    return [...new Set(categories)];
  }, [reels]);

  // --------------------------------------------------
  // FORM VALIDATION
  // --------------------------------------------------

  const isFormValid =
    formData.title.trim().length > 0 &&
    formData.message.trim().length > 0 &&
    (formData.destination !== "reel" || !!selectedReel) &&
    (formData.audienceType !== "custom" ||
      formData.userIds.trim().length > 0) &&
    (!!formData.scheduleDate === !!formData.scheduleTime);

  // --------------------------------------------------
  // SCHEDULED TIME - UTC
  // --------------------------------------------------

  const buildScheduledAt = () => {
    if (!formData.scheduleDate || !formData.scheduleTime) {
      return null;
    }

    const date = new Date(
      `${formData.scheduleDate}T${formData.scheduleTime}:00`
    );

    if (Number.isNaN(date.getTime())) {
      throw new Error("Invalid schedule date or time");
    }

    if (date.getTime() <= Date.now()) {
      throw new Error("Scheduled time must be in the future");
    }

    return date.toISOString();
  };

  // --------------------------------------------------
  // TOGGLE LANGUAGES
  // --------------------------------------------------

  const toggleLanguage = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((lang) => lang !== language)
        : [...prev.languages, language],
    }));
  };

  // --------------------------------------------------
  // IMAGE UPLOAD
  // --------------------------------------------------

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG and JPG images are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      e.target.value = "";
      return;
    }

    const preview = URL.createObjectURL(file);

    setFormData((prev) => {
      if (prev.imagePreview) {
        URL.revokeObjectURL(prev.imagePreview);
      }

      return {
        ...prev,
        imageFile: file,
        imagePreview: preview,
      };
    });

    e.target.value = "";
  };

  // --------------------------------------------------
  // REMOVE IMAGE
  // --------------------------------------------------

  const removeImage = () => {
    setFormData((prev) => {
      if (prev.imagePreview) {
        URL.revokeObjectURL(prev.imagePreview);
      }

      return {
        ...prev,
        imageFile: null,
        imagePreview: "",
      };
    });
  };

  // --------------------------------------------------
  // HANDLE DESTINATION CHANGE
  // --------------------------------------------------

  const handleDestinationChange = (label) => {
    const selected = DESTINATION_OPTIONS.find(
      (item) => item.label === label
    );

    if (!selected) return;

    setFormData((prev) => ({
      ...prev,
      destination: selected.value,
    }));

    if (selected.value !== "reel") {
      setSelectedReel(null);
    }
  };

  // --------------------------------------------------
  // HANDLE NOTIFICATION SUBMISSION
  // --------------------------------------------------

  const handleScheduleNotification = async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const formPayload = new FormData();

      // Basic fields
      formPayload.append("title", formData.title.trim());
      formPayload.append("body", formData.message.trim());
      formPayload.append("channel", "push");

      // Audience JSON
      const audience =
        formData.audienceType === "custom"
          ? {
              type: "custom",
              userIds: formData.userIds
                .split(",")
                .map((id) => id.trim())
                .filter(Boolean),
            }
          : {
              type: formData.audienceType,
            };

      formPayload.append(
        "audience",
        JSON.stringify(audience)
      );

      // Destination
      if (formData.destination === "reel") {
        if (!selectedReel?._id) {
          toast.error("Please select a published reel");
          return;
        }

        formPayload.append("reelId", selectedReel._id);
      } else {
        formPayload.append(
          "deeplink",
          formData.destination
        );
      }

      // Target Languages JSON
      if (formData.languages.length > 0) {
        formPayload.append(
          "targetedLanguages",
          JSON.stringify(formData.languages)
        );
      }

      // Schedule
      const scheduledAt = buildScheduledAt();

      if (scheduledAt) {
        formPayload.append("scheduledAt", scheduledAt);
      }

      // Optional Image
      if (formData.imageFile) {
        if (formData.imageFile.size > 2 * 1024 * 1024) {
          toast.error("Image size must be less than 2MB");
          return;
        }

        formPayload.append("image", formData.imageFile);
      }

      // API Request
      const response = await axios.post(
        `${BASE_URL}/admin/notifications/send`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(
          result.message || "Failed to send notification"
        );
      }

      // Success message
      if (result.data?.scheduled) {
        toast.success("Notification scheduled successfully");
      } else {
        toast.success("Notification sent successfully");
      }

      onClose();
    } catch (error) {
      console.error("Notification submission failed:", error);

      const errorCode = error.response?.data?.code;
      const errorMessage = error.response?.data?.message;

      if (errorCode === "REEL_NOT_PUBLISHED") {
        toast.error(
          "This reel is not published. Pick another."
        );
      } else {
        toast.error(
          errorMessage ||
            error.message ||
            "Failed to send notification"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------
  // MOBILE PREVIEW IMAGE
  // Uploaded image has priority over reel thumbnail
  // --------------------------------------------------

  const previewImage =
    formData.imagePreview ||
    selectedReel?.thumbnailUrl ||
    "";

  const destinationLabel =
    formData.destination === "reel"
      ? selectedReel?.title || "Select a reel"
      : DESTINATION_OPTIONS.find(
          (item) => item.value === formData.destination
        )?.label || "";

  if (!isOpen) return null;

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        style={{
          backgroundColor: colors.overlay,
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-5xl h-[85vh] rounded-3xl border flex flex-col overflow-hidden shadow-2xl relative"
          style={{
            background: colors.gradientCard,
            borderColor: `${colors.accent}33`,
          }}
        >
          {/* ==========================================
              HEADER
          ========================================== */}

          <div
            className="px-6 py-3 border-b flex justify-between items-center shrink-0"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.cardBorder,
            }}
          >
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.textPrimary }}
              >
                Create New Notification
              </h2>

              <p
                className="text-sm mt-1"
                style={{ color: colors.accent }}
              >
                Schedule and customize a new notification
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
              style={{ color: colors.textMuted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.textPrimary;
                e.currentTarget.style.backgroundColor = colors.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textMuted;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <X size={26} />
            </button>
          </div>

          {/* ==========================================
              MAIN CONTENT
          ========================================== */}

          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

            {/* ========================================
                LEFT COLUMN - FORM
            ======================================== */}

            <div
              className="flex-1 p-6 overflow-y-auto no-scrollbar border-r"
              style={{
                borderColor: colors.cardBorder,
              }}
            >
              <div className="space-y-5 max-w-xl">

                {/* TITLE */}

                <div>
                  <label className={labelClass}>
                    Notification Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g., New Feature Available"
                    className={inputClass}
                    style={inputStyle}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* MESSAGE */}

                <div>
                  <label className={labelClass}>
                    Message
                  </label>

                  <textarea
                    placeholder="Notification Message"
                    className={`${inputClass} h-28 resize-none`}
                    style={inputStyle}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />

                  <p
                    className="text-xs mt-1 text-right"
                    style={{ color: colors.textMuted }}
                  >
                    {formData.message.length} characters
                  </p>
                </div>

                {/* ==================================
                    DESTINATION DROPDOWN
                ================================== */}

                <div>
                  <label className={labelClass}>
                    Notification Destination
                  </label>

                  <CustomDropdown
                    options={DESTINATION_OPTIONS.map(
                      (item) => item.label
                    )}
                    value={
                      DESTINATION_OPTIONS.find(
                        (item) =>
                          item.value === formData.destination
                      )?.label || "Select destination"
                    }
                    onChange={handleDestinationChange}
                  />

                  <p
                    className="text-xs mt-1.5"
                    style={{ color: colors.textMuted }}
                  >
                    Choose where users should be redirected
                    after tapping the notification.
                  </p>
                </div>

                {/* ==================================
                    REEL PICKER
                ================================== */}

                {formData.destination === "reel" && (
                  <div>
                    <label className={labelClass}>
                      Select Reel
                      <span style={{ color: colors.danger }}>
                        {" "}*
                      </span>
                    </label>

                    {/* SEARCH */}

                    <div
                      className="flex items-center gap-2 rounded-xl px-3 py-3 border mb-3"
                      style={{
                        backgroundColor: colors.inputBg,
                        borderColor: colors.inputBorder,
                      }}
                    >
                      <Search
                        size={18}
                        style={{ color: colors.textMuted }}
                      />

                      <input
                        type="text"
                        placeholder="Search reel by title..."
                        value={reelSearch}
                        onChange={(e) =>
                          setReelSearch(e.target.value)
                        }
                        className="w-full bg-transparent outline-none text-sm"
                        style={{ color: colors.textPrimary }}
                      />

                      {reelSearch && (
                        <button
                          type="button"
                          onClick={() => setReelSearch("")}
                        >
                          <X
                            size={16}
                            style={{ color: colors.textMuted }}
                          />
                        </button>
                      )}
                    </div>

                    {/* CATEGORY FILTER */}

                    <div className="mb-3">
                      <label
                        className="text-xs mb-1.5 block"
                        style={{ color: colors.textMuted }}
                      >
                        Filter by Category
                      </label>

                      <select
                        value={reelCategory}
                        onChange={(e) =>
                          setReelCategory(e.target.value)
                        }
                        className="w-full rounded-xl px-3 py-3 border outline-none text-sm"
                        style={{
                          backgroundColor: colors.inputBg,
                          borderColor: colors.inputBorder,
                          color: colors.textPrimary,
                        }}
                      >
                        <option value="">
                          All Categories
                        </option>

                        {reelCategories.map((category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* REEL LIST */}

                    <div
                      className="rounded-xl border overflow-y-auto max-h-64"
                      style={{
                        backgroundColor: colors.inputBg,
                        borderColor: colors.inputBorder,
                      }}
                    >
                      {reelsLoading ? (
                        <div className="flex flex-col justify-center items-center py-10 gap-2">
                          <Loader2
                            size={24}
                            className="animate-spin"
                            style={{ color: colors.accent }}
                          />

                          <p
                            className="text-xs"
                            style={{ color: colors.textMuted }}
                          >
                            Loading published reels...
                          </p>
                        </div>
                      ) : filteredReels.length === 0 ? (
                        <div className="text-center py-10">
                          <Play
                            size={28}
                            className="mx-auto mb-2"
                            style={{ color: colors.textMuted }}
                          />

                          <p
                            className="text-sm"
                            style={{ color: colors.textMuted }}
                          >
                            No published reels found.
                          </p>
                        </div>
                      ) : (
                        filteredReels.map((reel) => {
                          const isSelected =
                            selectedReel?._id === reel._id;

                          const categories = Array.isArray(
                            reel.categories
                          )
                            ? reel.categories.join(", ")
                            : reel.categories || "Uncategorized";

                          return (
                            <div
                              key={reel._id}
                              onClick={() =>
                                setSelectedReel(reel)
                              }
                              className="flex items-center gap-3 p-3 cursor-pointer border-b transition-colors"
                              style={{
                                backgroundColor: isSelected
                                  ? colors.hover
                                  : "transparent",
                                borderColor: colors.cardBorder,
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.backgroundColor =
                                    colors.cardHover;
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                }
                              }}
                            >
                              <img
                                src={reel.thumbnailUrl}
                                alt={reel.title || "Reel"}
                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                                onError={(e) => {
                                  e.currentTarget.style.visibility =
                                    "hidden";
                                }}
                              />

                              <div className="flex-1 min-w-0">
                                <p
                                  className="text-sm font-semibold truncate"
                                  style={{
                                    color: colors.textPrimary,
                                  }}
                                >
                                  {reel.title || "Untitled Reel"}
                                </p>

                                <p
                                  className="text-xs mt-1 truncate"
                                  style={{
                                    color: colors.textMuted,
                                  }}
                                >
                                  {categories}
                                </p>

                                <p
                                  className="text-xs mt-1"
                                  style={{
                                    color: colors.textMuted,
                                  }}
                                >
                                  {reel.durationSeconds || 0}s
                                </p>
                              </div>

                              {isSelected && (
                                <span
                                  className="text-xs font-bold shrink-0"
                                  style={{
                                    color: colors.accent,
                                  }}
                                >
                                  ✓ Selected
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* SELECTED REEL */}

                    {selectedReel && (
                      <div
                        className="mt-3 p-3 rounded-xl border flex items-center gap-3"
                        style={{
                          backgroundColor: colors.hover,
                          borderColor: colors.accent,
                        }}
                      >
                        <img
                          src={selectedReel.thumbnailUrl}
                          alt={selectedReel.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <p
                            className="text-xs font-semibold"
                            style={{
                              color: colors.textMuted,
                            }}
                          >
                            Selected Reel
                          </p>

                          <p
                            className="text-sm font-semibold truncate mt-1"
                            style={{
                              color: colors.textPrimary,
                            }}
                          >
                            {selectedReel.title}
                          </p>

                          <p
                            className="text-xs mt-1"
                            style={{
                              color: colors.textMuted,
                            }}
                          >
                            ID: {selectedReel._id}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedReel(null)}
                          style={{ color: colors.danger }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ==================================
                    NOTIFICATION IMAGE
                ================================== */}

                <div>
                  <label className={labelClass}>
                    Notification Image (Optional)
                  </label>

                  <div
                    className="rounded-xl p-4 border"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderColor: colors.inputBorder,
                    }}
                  >
                    {!formData.imagePreview ? (
                      <label
                        className="flex flex-col items-center justify-center gap-2 cursor-pointer py-3"
                        style={{ color: colors.textMuted }}
                      >
                        <Plus size={22} />

                        <span
                          className="text-sm font-medium"
                          style={{
                            color: colors.textSecondary,
                          }}
                        >
                          Upload image from your PC
                        </span>

                        <span className="text-xs">
                          PNG, JPG (Maximum 2MB)
                        </span>

                        <input
                          type="file"
                          accept="image/png,image/jpeg"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Uploaded notification"
                          className="w-full h-40 object-cover rounded-lg"
                        />

                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 rounded-full p-2"
                          style={{
                            backgroundColor: colors.overlay,
                            color: colors.textPrimary,
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {selectedReel && !formData.imageFile && (
                    <p
                      className="text-xs mt-2"
                      style={{ color: colors.textMuted }}
                    >
                      Reel thumbnail will be used automatically
                      as the notification image.
                    </p>
                  )}
                </div>

                {/* ==================================
                    AUDIENCE
                ================================== */}

                <div>
                  <label className={labelClass}>
                    Select Audience
                  </label>

                  <CustomDropdown
                    options={AUDIENCE_OPTIONS.map(
                      (item) => item.label
                    )}
                    value={
                      AUDIENCE_OPTIONS.find(
                        (item) =>
                          item.value === formData.audienceType
                      )?.label || "All"
                    }
                    onChange={(label) => {
                      const selected = AUDIENCE_OPTIONS.find(
                        (item) => item.label === label
                      );

                      if (!selected) return;

                      setFormData((prev) => ({
                        ...prev,
                        audienceType: selected.value,
                        userIds:
                          selected.value === "custom"
                            ? prev.userIds
                            : "",
                      }));
                    }}
                  />

                  <p
                    className="text-xs mt-1.5"
                    style={{ color: colors.textMuted }}
                  >
                    Target specific user segments based on
                    behavior and activity.
                  </p>
                </div>

                {/* CUSTOM USER IDS */}

                {formData.audienceType === "custom" && (
                  <div>
                    <label className={labelClass}>
                      User IDs
                      <span style={{ color: colors.danger }}>
                        {" "}*
                      </span>
                    </label>

                    <textarea
                      placeholder="Enter user IDs separated by commas"
                      className={`${inputClass} h-24 resize-none`}
                      style={inputStyle}
                      value={formData.userIds}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          userIds: e.target.value,
                        }))
                      }
                    />

                    <p
                      className="text-xs mt-1"
                      style={{ color: colors.textMuted }}
                    >
                      Enter valid 24-character user IDs.
                      For test notifications, enter one tester ID.
                    </p>
                  </div>
                )}

                {/* ==================================
                    TARGET LANGUAGES
                ================================== */}

                <div>
                  <label className={labelClass}>
                    Target Languages (Optional)
                  </label>

                  <div
                    className="rounded-xl p-4 border"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderColor: colors.inputBorder,
                    }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGE_OPTIONS.map((lang) => {
                        const isSelected =
                          formData.languages.includes(lang.value);

                        return (
                          <button
                            type="button"
                            key={lang.id}
                            onClick={() =>
                              toggleLanguage(lang.value)
                            }
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border transition"
                            style={{
                              backgroundColor: isSelected
                                ? colors.hover
                                : colors.cardBg,
                              borderColor: isSelected
                                ? colors.accent
                                : colors.inputBorder,
                            }}
                          >
                            <div
                              className="w-4 h-4 rounded border flex items-center justify-center"
                              style={{
                                backgroundColor: isSelected
                                  ? colors.accent
                                  : "transparent",
                                borderColor: isSelected
                                  ? colors.accent
                                  : colors.textMuted,
                              }}
                            >
                              {isSelected && (
                                <span className="text-black text-[10px]">
                                  ✓
                                </span>
                              )}
                            </div>

                            <span
                              className="text-sm"
                              style={{
                                color: isSelected
                                  ? colors.accent
                                  : colors.textSecondary,
                              }}
                            >
                              {lang.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <p
                      className="mt-3 text-xs"
                      style={{ color: colors.textMuted }}
                    >
                      Leave empty to send to all languages.
                    </p>
                  </div>
                </div>

                {/* ==================================
                    SCHEDULE DATE & TIME
                ================================== */}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Schedule Date
                    </label>

                    <input
                      type="date"
                      className={inputClass}
                      style={inputStyle}
                      value={formData.scheduleDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          scheduleDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Schedule Time
                    </label>

                    <input
                      type="time"
                      className={inputClass}
                      style={inputStyle}
                      value={formData.scheduleTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          scheduleTime: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <p
                  className="text-xs"
                  style={{ color: colors.textMuted }}
                >
                  Leave both fields empty to send immediately.
                  Scheduled time is converted to UTC before submission.
                </p>

              </div>
            </div>

            {/* ========================================
                RIGHT COLUMN - MOBILE PREVIEW
            ======================================== */}

            <div
              className="w-full lg:w-[400px] p-6 flex flex-col items-center justify-center border-l relative overflow-y-auto"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.cardBorder,
              }}
            >
              <h3
                className="font-bold text-sm mb-5 flex items-center gap-2"
                style={{
                  color: colors.textPrimary,
                }}
              >
                <Smartphone
                  size={18}
                  style={{ color: colors.accent }}
                />

                Mobile Preview
              </h3>

              {/* PHONE FRAME */}

              <div
                className="relative w-full max-w-[300px] h-[560px] bg-black rounded-[2.5rem] border-[8px] shadow-2xl overflow-hidden"
                style={{
                  borderColor: colors.cardHover,
                }}
              >
                {/* STATUS BAR */}

                <div className="h-7 w-full bg-black flex justify-between px-6 items-center">
                  <span className="text-[10px] text-white font-bold">
                    9:41
                  </span>

                  <div className="flex gap-1">
                    <span className="text-[10px] text-white">
                      ● ●
                    </span>
                  </div>
                </div>

                {/* SCREEN */}

                <div
                  className="p-3 pt-5 h-full relative overflow-y-auto"
                  style={{
                    background:
                      "linear-gradient(to bottom, #1A1A1A, #000000)",
                  }}
                >
                  {/* NOTIFICATION CARD */}

                  <motion.div
                    key={formData.destination}
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="backdrop-blur-md border p-4 rounded-2xl shadow-lg relative overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* APP HEADER */}

                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center text-black font-bold text-[10px]"
                        style={{
                          backgroundColor: colors.accent,
                        }}
                      >
                        H
                      </div>

                      <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                        HangoutClub
                      </span>

                      <span className="text-[10px] text-gray-400 ml-auto">
                        now
                      </span>
                    </div>

                    {/* TITLE */}

                    <h4 className="text-white font-bold text-sm leading-tight mb-1">
                      {formData.title || "Notification Title"}
                    </h4>

                    {/* MESSAGE */}

                    <p className="text-gray-300 text-xs leading-snug whitespace-pre-wrap break-words">
                      {formData.message ||
                        "Your notification message will appear here exactly as the user sees it."}
                    </p>

                    {/* IMAGE */}

                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Notification preview"
                        className="mt-3 rounded-lg w-full h-32 object-cover"
                      />
                    )}

                    {/* VIBE CALL BUTTON */}

                    {formData.audienceType ===
                      "start_vibe_call_users" && (
                      <button
                        type="button"
                        className="mt-4 w-full py-3 rounded-full font-bold text-white text-sm shadow-lg"
                        style={{
                          background: colors.gradientButton,
                        }}
                      >
                        Connect Now
                      </button>
                    )}

                    {/* GLOSSY EFFECT */}

                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  </motion.div>

                  {/* DESTINATION PREVIEW */}

                  <div
                    className="mt-4 p-3 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">
                      Notification Opens
                    </p>

                    <p className="text-xs text-white mt-1 font-medium">
                      {destinationLabel}
                    </p>
                  </div>

                  {/* TIP */}

                  <div
                    className="mt-5 p-3 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(212,175,55,0.08)",
                      borderColor: "rgba(212,175,55,0.2)",
                    }}
                  >
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      <strong
                        style={{ color: colors.accent }}
                      >
                        Tip:
                      </strong>{" "}
                      Keep titles under 40 characters and
                      messages under 120 characters for
                      better click-through rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div
            className="p-4 border-t flex gap-4 justify-end items-center shrink-0"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.cardBorder,
            }}
          >
            <Button
              variant="secondary"
              className="font-bold text-sm transition-colors"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="accent"
              className={`px-8 py-2 rounded-xl flex items-center gap-2 ${
                !isFormValid || isSubmitting
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleScheduleNotification}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Sending...
                </>
              ) : formData.scheduleDate &&
                formData.scheduleTime ? (
                "Schedule"
              ) : (
                "Send Notification"
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateNotificationModal;
