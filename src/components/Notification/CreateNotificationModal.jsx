import { X, Plus, Calendar, Clock, Smartphone } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { label } from "framer-motion/client";
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import CreateCohortModal from "./CreateCohortModal"; // Import the modal above
import axiosInstance from "../../api/axiosInstance";
import CustomDropdown from "./CustomDropdown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


const CreateNotificationModal = ({ isOpen, onClose }) => {
  // --- Form State ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audienceType: "all",
    languages: [],
    campaignTag: "",
    scheduleDate: "",
    scheduleTime: "",
    deepLink: "",
    imageFile: null, // ✅ NEW
    imagePreview: "",
    userIds: "",
  });
  const isFormValid =
    formData.title.trim().length > 0 &&
    formData.message.trim().length > 0 &&
    (formData.audienceType !== "custom" || formData.userIds.trim().length > 0);

  const buildScheduledAt = () => {
    if (!formData.scheduleDate || !formData.scheduleTime) return null;

    // Split date & time
    const [year, month, day] = formData.scheduleDate.split("-");
    const [hour, minute] = formData.scheduleTime.split(":");

    // India timezone offset
    const offset = "+05:30";

    return `${year}-${month}-${day}T${hour}:${minute}:00${offset}`;
  };

  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const audienceOptions = [
    { label: "All", value: "all" },
    { label: "Users", value: "users" },
    { label: "Creators", value: "creators" },
    { label: "Top Subscriptions", value: "top_subscriptions" },

    { label: "Today's Signups", value: "todays_signup" },
    { label: "Yesterday's Signups", value: "yesterdays_signup" },

    { label: "Signup but No Recharge", value: "signup_no_recharge" },
    {
      label: "Recharged once, No Further Recharge",
      value: "recharge_2_not_another",
    },

    { label: "Completed 3+ Min Calls", value: "completed_3_min_calls" },

    {
      label: "Creators Inactive Yesterday",
      value: "creators_inactive_yesterday",
    },
    { label: "Creators Inactive (3 Days)", value: "creator_inactive_3days" },
    { label: "Custom", value: "custom" },
    { label: "Start Vibe Call Users", value: "start_vibe_call_users" }
    // { label: "New Users", value: "new_users" },
    // { label: "New Creators", value: "new_creators" },
  ];

  // --- Constants ---
  // const languageOptions = [
  //   { id: "hi", label: "हिंदी", value: "Hindi" },
  //   { id: "en", label: "English", value: "English" },
  //   { id: "ta", label: "தமிழ்", value: "Tamil" },
  //   { id: "te", label: "తెలుగు", value: "Telugu" },
  //   { id: "bn", label: "বাংলা", value: "Bengali" },
  // ];
  const languageOptions = [
    { id: "hi", label: "हिंदी", value: "हिंदी" },
    { id: "en", label: "English", value: "English" },
    { id: "ta", label: "தமிழ்", value: "தமிழ்" },
    { id: "te", label: "తెలుగు", value: "తెలుగు" },
    { id: "bn", label: "বাংলা", value: "বাংলা" },
  ];

  const cohortOptions = [
    "All Users",
    "New Users (0-7 days)",
    "Active Users (7-30 days)",
    "VIP Users (High spenders)",
    "Premium Subscribers",
    "Creators Only",
  ];
  const DEEPLINK_OPTIONS = [
    {
      label: "Home(User side)",
      value: "chatspark://home",
      type: "user",
    },
    {
      label: "Wallet(Creator side)",
      value: "chatspark://wallet",
      type: "creator",
    },
    {
      label: "Store(User side)",
      value: "chatspark://store",
      type: "user",
    },
    {
      label: "Games Hub or Ludo Start(both sides)",
      value: "chatspark://games",
      type: "both",
    },

    {
      label: "Creator Dashboard",
      value: "chatspark://creator-home",
      type: "creator",
    },
  ];

  const handleScheduleNotification = async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const formPayload = new FormData();

      formPayload.append("title", formData.title.trim());
      formPayload.append("body", formData.message.trim());
      formPayload.append("channel", "push");

      const scheduledAt = buildScheduledAt();
      if (scheduledAt) {
        formPayload.append("scheduledAt", scheduledAt);
      }

      formPayload.append("audience[type]", formData.audienceType);

      if (formData.audienceType === "custom") {
        formData.userIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
          .forEach((id, index) => {
            formPayload.append(`audience[userIds][${index}]`, id);
          });
      }

      if (formData.campaignTag) {
        formPayload.append("campaignTag", formData.campaignTag);
      }

      if (formData.deepLink) {
        formPayload.append("deeplink", formData.deepLink);
      }

      if (formData.imageFile) {
        const MAX_SIZE = 2 * 1024 * 1024;

        if (formData.imageFile.size > MAX_SIZE) {
          toast.error("Image size must be less than 2MB");
          setIsSubmitting(false);
          return;
        }

        formPayload.append("image", formData.imageFile);
      }
      // if (formData.languages.length > 0) {
      //   formData.languages.forEach((lang, index) => {
      //     formPayload.append(`targetedLanguages[${index}]`, lang);
      //   });
      // }
      if (formData.languages.length > 0) {
        formData.languages.forEach((lang) => {
          formPayload.append("targetedLanguages", lang);
        });
      }

      const token = localStorage.getItem("token");

      await axios.post(
        "https://sandbox.agamiastro.in/api/v1/admin/notifications/send",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Notification scheduled successfully");
      onClose();
    } catch (err) {
      console.error("Notification send failed", err);
      toast.error("Failed to schedule notification");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const toggleLanguage = (langLabel) => {
  //   setFormData((prev) => {
  //     const exists = prev.languages.includes(langLabel);
  //     if (exists) {
  //       return {
  //         ...prev,
  //         languages: prev.languages.filter((l) => l !== langLabel),
  //       };
  //     } else {
  //       return { ...prev, languages: [...prev.languages, langLabel] };
  //     }
  //   });
  // };
  const toggleLanguage = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const handleCohortCreate = (newCohortData) => {
    // Logic to add the new cohort to your options would go here
    console.log("New Cohort Created:", newCohortData);
    // Auto-select the new cohort logic could go here
    setFormData({ ...formData, cohort: newCohortData.name });
  };

  // --- Styles ---
  const inputClass =
    "w-full bg-[#303030] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors placeholder-gray-500 text-sm";
  const labelClass =
    "block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide";

  if (!isOpen) return null;

  const getFilteredDeepLinks = () => {
    const audience = formData.audienceType;

    if (audience === "all") {
      return DEEPLINK_OPTIONS;
    }

    if (audience === "users") {
      return DEEPLINK_OPTIONS.filter(
        (d) => d.type === "user" || d.type === "both",
      );
    }

    if (audience === "creators") {
      return DEEPLINK_OPTIONS.filter(
        (d) => d.type === "creator" || d.type === "both",
      );
    }

    // default fallback
    return DEEPLINK_OPTIONS;
  };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//         {/* Main Modal Container */}
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           className="w-full max-w-5xl h-[80vh] rounded-3xl border border-yellow-500/20 bg-[#1A1A1A] 
//           flex flex-col overflow-hidden shadow-2xl relative"
//         >
//           {/* Header */}
//           <div className="px-6 py-2 border-b border-white/5 flex justify-between items-center bg-[#1A1A1A]">
//             <div>
//               <h2 className="text-2xl font-bold text-white">
//                 Create New Notification
//               </h2>
//               <p className="text-yellow-500 text-sm mt-1">
//                 Schedule and customize a new notification
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
//             >
//               <X size={28} />
//             </button>
//           </div>

//           {/* Content Grid (Split View) */}
//           <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
//             {/* LEFT COLUMN: Form Inputs */}
//             <div className="flex-1 p-6 overflow-y-auto no-scrollbar border-r border-white/5">
//               <div className="space-y-4 max-w-xl">
//                 {/* Title */}
//                 <div>
//                   <label className={labelClass}>Notification Title</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., New Feature Available"
//                     className={inputClass}
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                   />
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className={labelClass}>Message</label>
//                   <textarea
//                     placeholder="Notification Message"
//                     className={`${inputClass} h-28 resize-none`}
//                     value={formData.message}
//                     onChange={(e) =>
//                       setFormData({ ...formData, message: e.target.value })
//                     }
//                   />
//                 </div>
//                 {/* Notification Image */}
//                 {formData.audienceType !== "start_vibe_call_users" && (<div>
//                   <label className={labelClass}>
//                     Notification Image (Optional)
//                   </label>

//                   <div className="bg-[#303030] border border-white/10 rounded-xl p-4">
//                     {!formData.imagePreview ? (
//                       <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-400 hover:text-white transition">
//                         <Plus size={20} />
//                         <span className="text-sm font-medium">
//                           Upload image from your PC
//                         </span>
//                         <span className="text-xs text-gray-500">
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
//                               imagePreview: URL.createObjectURL(file),
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
//                           className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white rounded-full p-1"
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>)
//                 }

//                 {/* User Cohort Row */}
//                 <div>
//                   <div className="flex justify-between items-center mb-1.5">

//                   </div>
//                   <CustomDropdown
//                     options={audienceOptions.map((o) => o.label)}
//                     value={
//                       audienceOptions.find(
//                         (o) => o.value === formData.audienceType,
//                       )?.label
//                     }
//                     onChange={(label) => {
//                       const selected = audienceOptions.find(
//                         (o) => o.label === label,
//                       );
//                       setFormData({
//                         ...formData,
//                         audienceType: selected.value,
//                         deepLink:
//                           selected.value === "start_vibe_call_users"
//                             ? ""
//                             : formData.deepLink,
//                         imageFile:
//                           selected.value === "start_vibe_call_users"
//                             ? null
//                             : formData.imageFile,

//                         imagePreview:
//                           selected.value === "start_vibe_call_users"
//                             ? ""
//                             : formData.imagePreview,
//                       });
//                     }}
//                   />

//                   <p
//                     className="text-[13px]  mt-1.5"
//                     style={{ color: colors.accent }}
//                   >
//                     Target specific user segments based on behavior and
//                     activity.
//                   </p>
//                 </div>
//                 {formData.audienceType === "custom" && (
//                   <div className="mt-3">
//                     <label className={labelClass}>
//                       User IDs <span className="text-red-400">*</span>
//                     </label>

//                     <textarea
//                       placeholder="Enter user IDs separated by commas"
//                       className={`${inputClass} h-24 resize-none`}
//                       value={formData.userIds}
//                       onChange={(e) =>
//                         setFormData({ ...formData, userIds: e.target.value })
//                       }
//                     />

//                   </div>
//                 )}

//                 {/* Target Languages */}
//                 {/* <div>
//                   <label className={labelClass}>Target Languages</label>
//                   <div className="bg-[#303030] rounded-xl p-4 border border-white/10">
//                     <div className="flex flex-wrap gap-3">
//                       {languageOptions.map((lang) => {
//                         const isSelected = formData.languages.includes(
//                           lang.label,
//                         );
//                         return (
//                           <div
//                             key={lang.id}
//                             onClick={() => toggleLanguage(lang.label)}
// <<<<<<< HEAD
//                             className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border ${
//                               isSelected
//                                 ? "bg-blue-600/20 border-blue-500"
//                                 : "bg-[#222222] border-white/5 hover:bg-[#2a2a2a]"
//                             }`}
//                           >
//                             <div
//                               className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
//                                 isSelected
//                                   ? "bg-blue-500 border-blue-500"
//                                   : "border-gray-500"
//                               }`}
// =======
//                             className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border ${isSelected
//                               ? "bg-blue-600/20 border-blue-500"
//                               : "bg-[#222222] border-white/5 hover:bg-[#2a2a2a]"
//                               }`}
//                           >
//                             <div
//                               className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isSelected
//                                 ? "bg-blue-500 border-blue-500"
//                                 : "border-gray-500"
//                                 }`}
// >>>>>>> 0ff5faf7b16a0808ff872c1e74ae9e38b5a2ddd4
//                             >
//                               {isSelected && (
//                                 <span className="text-white text-[10px]">
//                                   ✓
//                                 </span>
//                               )}
//                             </div>
//                             <span
//                               className={`text-sm ${isSelected ? "text-blue-400 font-bold" : "text-gray-400"}`}
//                             >
//                               {lang.label}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
                   
//                     <div className="mt-3 text-xs text-yellow-500 font-medium">
//                       Selected:{" "}
//                       <span className="text-white">
//                         {formData.languages.length > 0
//                           ? formData.languages.join(", ")
//                           : "None"}
//                       </span>
//                     </div>
//                   </div>
//                 </div> */}

//                 <div>
//                   <label className={labelClass}>Target Languages (Optional)</label>

//                   <div className="bg-[#303030] rounded-xl p-4 border border-white/10">
//                     <div className="flex flex-wrap gap-3">
//                       {languageOptions.map((lang) => {
//                         const isSelected = formData.languages.includes(lang.value);

//                         return (
//                           <div
//                             key={lang.id}
//                             onClick={() => toggleLanguage(lang.value)}
//                             className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition
//               ${isSelected
//                                 ? "bg-yellow-500/20 border-yellow-500"
//                                 : "bg-[#222] border-white/10 hover:bg-[#2a2a2a]"
//                               }`}
//                           >
//                             <div
//                               className={`w-4 h-4 rounded border flex items-center justify-center
//                 ${isSelected
//                                   ? "bg-yellow-500 border-yellow-500"
//                                   : "border-gray-500"
//                                 }`}
//                             >
//                               {isSelected && (
//                                 <span className="text-black text-[10px]">✓</span>
//                               )}
//                             </div>

//                             <span
//                               className={`text-sm ${isSelected ? "text-yellow-400" : "text-gray-300"
//                                 }`}
//                             >
//                               {lang.label}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>

//                     <p className="mt-3 text-xs text-gray-400">
//                       Leave empty to send to all languages.
//                     </p>
//                   </div>
//                 </div>
//                 {formData.audienceType !== "start_vibe_call_users" && (
//                   <div>
//                     <label className={labelClass}>Deep Link (Optional)</label>
//                     <CustomDropdown
//                       options={getFilteredDeepLinks().map((d) => d.label)}
//                       value={
//                         DEEPLINK_OPTIONS.find(
//                           (d) => d.value === formData.deepLink,
//                         )?.label || "Select destination"
//                       }
//                       onChange={(label) => {
//                         const selected = getFilteredDeepLinks().find(
//                           (d) => d.label === label,
//                         );
//                         setFormData({
//                           ...formData,
//                           deepLink: selected?.value || "",
//                         });
//                       }}
//                     />
//                     {formData.deepLink && (
//                       <p className="mt-2 text-xs text-gray-400">
//                         Deep link:{" "}
//                         <span className="text-yellow-500 font-mono">
//                           {formData.deepLink}
//                         </span>
//                       </p>
//                     )}
//                   </div>
//                 )}


//                 {/* Date & Time Row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelClass}>Schedule Date</label>
//                     <div className="relative">
//                       <input
//                         type="date"
//                         className={inputClass}
//                         value={formData.scheduleDate}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             scheduleDate: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Schedule Time</label>
//                     <div className="relative">
//                       <input
//                         type="time"
//                         className={inputClass}
//                         value={formData.scheduleTime}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             scheduleTime: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Campaign Tag (Optional)</label>
//                   <input
//                     type="text"
//                     placeholder="Optional Campaign Tag"
//                     className={inputClass}
//                     value={formData.campaignTag}
//                     onChange={(e) =>
//                       setFormData({ ...formData, campaignTag: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT COLUMN: Mobile Preview */}
//             <div className="w-full lg:w-[400px] bg-[#151515] p-8 flex flex-col items-center justify-center border-l border-white/5 relative">
//               <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
//                 <Smartphone size={16} className="text-yellow-500" />
//                 Mobile Preview
//               </h3>

//               {/* Phone Mockup Frame */}
//               <div
//                 className="relative w-80 h-160 bg-black rounded-[2.5rem] 
//               border-[8px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10"
//               >
//                 {/* Status Bar */}
//                 <div className="h-5 w-full bg-black flex justify-between px-6 items-center pt-2">
//                   <div className="text-[10px] text-white font-bold">9:41</div>
//                   <div className="flex gap-1">
//                     {/* <div className="w-4 h-4 bg-white/20 rounded-full"></div>
//                     <div className="w-3 h-3 bg-white/20 rounded-full"></div> */}
//                   </div>
//                 </div>

//                 {/* Screen Content - Notification Toast */}
//                 <div className="p-4 pt-6 bg-gradient-to-b from-[#1a1a1a] to-black h-full relative">
//                   {/* The Actual Notification Card Preview */}
//                   <motion.div
//                     initial={{ y: -20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg relative overflow-hidden"
//                   >
//                     {/* App Icon & Name */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-5 h-5 rounded-md bg-yellow-500 flex items-center justify-center text-black font-bold text-[10px]">
//                         H
//                       </div>
//                       <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
//                         HangoutClub
//                       </span>
//                       <span className="text-[10px] text-gray-300 ml-auto">
//                         now
//                       </span>
//                     </div>

//                     {/* Content */}
//                     <div>
//                       <h4 className="text-white font-bold text-sm leading-tight mb-1">
//                         {formData.title || "Notification Title"}
//                       </h4>
//                       <p className="text-gray-300 text-xs leading-snug">
//                         {formData.message ||
//                           "Your notification message will appear here exactly as the user sees it."}
//                       </p>
//                       {/* {formData.imagePreview && (
//                         <img
//                           src={formData.imagePreview}
//                           alt="notification"
//                           className="mt-2 rounded-lg w-full h-24 object-cover"
//                         />
//                       )} */}
//                       {formData.audienceType === "start_vibe_call_users" ? (
//                         <button
//                           className="mt-4 w-full py-3 rounded-full font-bold text-white text-sm
//     bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg"
//                         >
//                           Connect Now
//                         </button>
//                       ) : (
//                         formData.imagePreview && (
//                           <img
//                             src={formData.imagePreview}
//                             alt="notification"
//                             className="mt-2 rounded-lg w-full h-24 object-cover"
//                           />
//                         )
//                       )}
//                     </div>

//                     {/* Glossy Effect */}
//                     <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/5 to-transparent pointer-events-none"></div>
//                   </motion.div>

//                   {/* Tips Box */}
//                   <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
//                     <p className="text-blue-200 text-xs leading-relaxed">
//                       <strong className="text-blue-400">Tip:</strong> Keep
//                       titles under 40 characters and messages under 120
//                       characters for the best click-through rates on iOS and
//                       Android.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="p-4  border-white/5 bg-[#1A1A1A] flex gap-6 justify-end items-center">
//             <Button
//               variant="secondary"
//               className="text-gray-400 hover:text-white font-bold text-sm transition-colors"
//             >
//               Save as Draft
//             </Button>
//             {/* <Button
//               variant="accent"
//               className="px-8 py-2 rounded-xl"
//               onClick={handleScheduleNotification}
//             >
//               Schedule
//             </Button> */}
//             <Button
//               variant="accent"
//               className={`px-8 py-2 rounded-xl flex items-center gap-2 ${!isFormValid || isSubmitting
//                 ? "opacity-60 cursor-not-allowed"
//                 : ""
//                 }`}
//               onClick={handleScheduleNotification}
//               disabled={!isFormValid || isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
//                   Scheduling…
//                 </>
//               ) : (
//                 "Schedule"
//               )}
//             </Button>
//           </div>
//         </motion.div>

//         {/* --- Nested Cohort Modal --- */}
//         <CreateCohortModal
//           isOpen={isCohortModalOpen}
//           onClose={() => setIsCohortModalOpen(false)}
//           onSave={handleCohortCreate}
//         />
//       </div>
//     </AnimatePresence>
//   );
return (
  <AnimatePresence>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{
        backgroundColor: colors.overlay,
      }}
    >
      {/* Main Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-5xl h-[80vh] rounded-3xl border flex flex-col overflow-hidden shadow-2xl relative"
        style={{
          background: colors.gradientCard,
          borderColor: `${colors.accent}33`,
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-3 border-b flex justify-between items-center"
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
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            style={{
              color: colors.textMuted,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.textPrimary;
              e.currentTarget.style.backgroundColor = colors.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.textMuted;
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <X size={28} />
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

          {/* LEFT COLUMN */}
          <div
            className="flex-1 p-6 overflow-y-auto no-scrollbar border-r"
            style={{
              borderColor: colors.cardBorder,
            }}
          >
            <div className="space-y-4 max-w-xl">

              {/* Title */}
              <div>
                <label className={labelClass}>
                  Notification Title
                </label>

                <input
                  type="text"
                  placeholder="e.g., New Feature Available"
                  className={inputClass}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>
                  Message
                </label>

                <textarea
                  placeholder="Notification Message"
                  className={`${inputClass} h-28 resize-none`}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                />
              </div>

              {/* Notification Image */}
              {formData.audienceType !== "start_vibe_call_users" && (
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
                        className="flex flex-col items-center justify-center gap-2 cursor-pointer transition"
                        style={{
                          color: colors.textMuted,
                        }}
                      >
                        <Plus size={20} />

                        <span
                          className="text-sm font-medium"
                          style={{
                            color: colors.textSecondary,
                          }}
                        >
                          Upload image from your PC
                        </span>

                        <span
                          className="text-xs"
                          style={{
                            color: colors.textMuted,
                          }}
                        >
                          PNG, JPG (must be less than 2MB)
                        </span>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];

                            if (!file) return;

                            setFormData({
                              ...formData,
                              imageFile: file,
                              imagePreview:
                                URL.createObjectURL(file),
                            });
                          }}
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />

                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              imageFile: null,
                              imagePreview: "",
                            })
                          }
                          className="absolute top-2 right-2 rounded-full p-1 transition"
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
                </div>
              )}

              {/* User Cohort */}
              <div>
                <CustomDropdown
                  options={audienceOptions.map((o) => o.label)}
                  value={
                    audienceOptions.find(
                      (o) =>
                        o.value === formData.audienceType
                    )?.label
                  }
                  onChange={(label) => {
                    const selected =
                      audienceOptions.find(
                        (o) => o.label === label
                      );

                    setFormData({
                      ...formData,
                      audienceType: selected.value,
                      deepLink:
                        selected.value ===
                        "start_vibe_call_users"
                          ? ""
                          : formData.deepLink,
                      imageFile:
                        selected.value ===
                        "start_vibe_call_users"
                          ? null
                          : formData.imageFile,
                      imagePreview:
                        selected.value ===
                        "start_vibe_call_users"
                          ? ""
                          : formData.imagePreview,
                    });
                  }}
                />

                <p
                  className="text-[13px] mt-1.5"
                  style={{
                    color: colors.accent,
                  }}
                >
                  Target specific user segments based on
                  behavior and activity.
                </p>
              </div>

              {/* Custom User IDs */}
              {formData.audienceType === "custom" && (
                <div className="mt-3">
                  <label className={labelClass}>
                    User IDs{" "}
                    <span style={{ color: colors.danger }}>
                      *
                    </span>
                  </label>

                  <textarea
                    placeholder="Enter user IDs separated by commas"
                    className={`${inputClass} h-24 resize-none`}
                    value={formData.userIds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        userIds: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {/* Target Languages */}
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
                  <div className="flex flex-wrap gap-3">
                    {languageOptions.map((lang) => {
                      const isSelected =
                        formData.languages.includes(
                          lang.value
                        );

                      return (
                        <div
                          key={lang.id}
                          onClick={() =>
                            toggleLanguage(lang.value)
                          }
                          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition"
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
                              <span
                                className="text-black text-[10px]"
                              >
                                ✓
                              </span>
                            )}
                          </div>

                          <span
                            className="text-sm"
                            style={{
                              color: isSelected
                                ? colors.accentLight
                                : colors.textSecondary,
                            }}
                          >
                            {lang.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p
                    className="mt-3 text-xs"
                    style={{
                      color: colors.textMuted,
                    }}
                  >
                    Leave empty to send to all languages.
                  </p>
                </div>
              </div>

              {/* Deep Link */}
              {formData.audienceType !==
                "start_vibe_call_users" && (
                <div>
                  <label className={labelClass}>
                    Deep Link (Optional)
                  </label>

                  <CustomDropdown
                    options={getFilteredDeepLinks().map(
                      (d) => d.label
                    )}
                    value={
                      DEEPLINK_OPTIONS.find(
                        (d) =>
                          d.value === formData.deepLink
                      )?.label ||
                      "Select destination"
                    }
                    onChange={(label) => {
                      const selected =
                        getFilteredDeepLinks().find(
                          (d) => d.label === label
                        );

                      setFormData({
                        ...formData,
                        deepLink:
                          selected?.value || "",
                      });
                    }}
                  />

                  {formData.deepLink && (
                    <p
                      className="mt-2 text-xs"
                      style={{
                        color: colors.textMuted,
                      }}
                    >
                      Deep link:{" "}
                      <span
                        className="font-mono"
                        style={{
                          color: colors.accent,
                        }}
                      >
                        {formData.deepLink}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Schedule Date
                  </label>

                  <input
                    type="date"
                    className={inputClass}
                    value={formData.scheduleDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleDate: e.target.value,
                      })
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
                    value={formData.scheduleTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Campaign Tag */}
              <div>
                <label className={labelClass}>
                  Campaign Tag (Optional)
                </label>

                <input
                  type="text"
                  placeholder="Optional Campaign Tag"
                  className={inputClass}
                  value={formData.campaignTag}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      campaignTag: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - MOBILE PREVIEW */}
          <div
            className="w-full lg:w-[400px] p-8 flex flex-col items-center justify-center border-l relative"
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.cardBorder,
            }}
          >
            <h3
              className="font-bold text-sm mb-6 flex items-center gap-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              <Smartphone
                size={16}
                style={{
                  color: colors.accent,
                }}
              />

              Mobile Preview
            </h3>

            {/* Phone */}
            <div
              className="relative w-80 h-[640px] bg-black rounded-[2.5rem] border-[8px] shadow-2xl overflow-hidden"
              style={{
                borderColor: colors.cardHover,
              }}
            >
              {/* Status Bar */}
              <div className="h-5 w-full bg-black flex justify-between px-6 items-center pt-2">
                <div className="text-[10px] text-white font-bold">
                  9:41
                </div>
              </div>

              {/* Screen */}
              <div
                className="p-4 pt-6 h-full relative"
                style={{
                  background:
                    "linear-gradient(to bottom, #1A1A1A, #000000)",
                }}
              >
                {/* Notification */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="backdrop-blur-md border p-4 rounded-2xl shadow-lg relative overflow-hidden"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.08)",
                    borderColor:
                      "rgba(255,255,255,0.1)",
                  }}
                >
                  {/* App Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-black font-bold text-[10px]"
                      style={{
                        backgroundColor: colors.accent,
                      }}
                    >
                      H
                    </div>

                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      HangoutClub
                    </span>

                    <span className="text-[10px] text-gray-300 ml-auto">
                      now
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight mb-1">
                      {formData.title ||
                        "Notification Title"}
                    </h4>

                    <p className="text-gray-300 text-xs leading-snug">
                      {formData.message ||
                        "Your notification message will appear here exactly as the user sees it."}
                    </p>

                    {/* Vibe Call */}
                    {formData.audienceType ===
                    "start_vibe_call_users" ? (
                      <button
                        className="mt-4 w-full py-3 rounded-full font-bold text-white text-sm shadow-lg"
                        style={{
                          background:
                            colors.gradientButton,
                        }}
                      >
                        Connect Now
                      </button>
                    ) : (
                      formData.imagePreview && (
                        <img
                          src={formData.imagePreview}
                          alt="notification"
                          className="mt-2 rounded-lg w-full h-24 object-cover"
                        />
                      )
                    )}
                  </div>

                  {/* Glossy Effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </motion.div>

                {/* Tip */}
                <div
                  className="mt-8 p-4 rounded-xl border"
                  style={{
                    backgroundColor:
                      "rgba(212,175,55,0.08)",
                    borderColor:
                      "rgba(212,175,55,0.2)",
                  }}
                >
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    <strong
                      style={{
                        color: colors.accent,
                      }}
                    >
                      Tip:
                    </strong>{" "}
                    Keep titles under 40 characters and
                    messages under 120 characters for the
                    best click-through rates on iOS and
                    Android.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 border-t flex gap-6 justify-end items-center"
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.cardBorder,
          }}
        >
          <Button
            variant="secondary"
            className="font-bold text-sm transition-colors"
          >
            Save as Draft
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
                Scheduling…
              </>
            ) : (
              "Schedule"
            )}
          </Button>
        </div>
      </motion.div>

      {/* Nested Cohort Modal */}
      <CreateCohortModal
        isOpen={isCohortModalOpen}
        onClose={() => setIsCohortModalOpen(false)}
        onSave={handleCohortCreate}
      />
    </div>
  </AnimatePresence>
);
};

export default CreateNotificationModal;
