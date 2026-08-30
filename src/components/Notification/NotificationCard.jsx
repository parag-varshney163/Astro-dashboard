// import { Edit2, Trash2, Copy } from "lucide-react";
// import React from "react";
// import colors from "../../constants/colors";
// const NotificationCard = ({
//   title,
//   subtitle,
//   description,
//   type, // 'scheduled', 'sent', 'template'
//   footerText,
//   tags = [], // <--- New Prop for Tags
//   onEdit,
//   onDelete,
//   onCopy,
//   createdBy,
//   timestamp
// }) => {
//   return (
//     <div
//       className="w-full p-6 rounded-2xl border border-white/5 flex flex-col gap-4 shadow-lg hover:border-white/10 transition-all"
//       style={{ backgroundColor: colors.cardBg }}
//     >
//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           {/* Title Row with optional subtitle */}
//           <div className="flex flex-wrap items-baseline gap-2 mb-1">
//             <h3 className="text-xl font-bold text-white leading-tight">
//               {title}
//             </h3>
//             {subtitle && (
//               <span
//                 className="text-lg font-bold"
//                 style={{ color: colors.accent }}
//               >
//                 {subtitle}
//               </span>
//             )}
//           </div>
//           <p className="text-[15px] text-gray-300 leading-snug">
//             {description}
//           </p>
//         </div>
//         {/* Action Icons - Kept exactly as requested */}
//         <div className="flex gap-1 ml-4 shrink-0">
//           {(type === "sent" || type === "template") && (
//             <button
//               onClick={onCopy}
//               className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
//               title="Duplicate"
//             >
//               <Copy size={18} />
//             </button>
//           )}
//           {/* {(type === "scheduled" || type === "template") && (
//             <button
//               onClick={onEdit}
//               className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
//               title="Edit"
//             >
//               <Edit2 size={18} />
//             </button>
//           )} */}
//           {(type === "scheduled" || type === "template") && (
//             <button
//               onClick={onDelete}
//               className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
//               title="Delete"
//             >
//               <Trash2 size={18} />
//             </button>
//           )}
//         </div>
//       </div>
//       {/* --- DYNAMIC TAGS SECTION --- */}
//       <div className="flex flex-wrap gap-2 mt-1">
//         {tags.map((tag, index) => {
//           // Simple logic to cycle colors or you can pass color in tag object
//           // For now, mimicking the screenshot's variety
//           let bg = "bg-gray-700/50";
//           let text = "text-gray-300";
//           if (["All Users", "Premium Users", "Creators"].includes(tag)) {
//             bg = "bg-white/10";
//             text = "text-white";
//           }
//           if (
//             ["English", "Hindi", "Spanish", "French", "German"].includes(tag)
//           ) {
//             bg = "bg-blue-500/10";
//             text = "text-blue-400";
//           }
//           if (
//             ["Active Users", "Top Creators", "Premium Subscribers"].includes(
//               tag
//             )
//           ) {
//             bg = "bg-purple-500/10";
//             text = "text-purple-400";
//           }
//           if (
//             ["Weekend Promo", "Product Launch", "Creator Success"].includes(tag)
//           ) {
//             bg = "bg-gray-500/20";
//             text = "text-gray-300";
//           }
//           return (
//             <span
//               key={index}
//               className={`px-3 py-1 rounded-md text-xs font-semibold ${bg} ${text}`}
//             >
//               {tag}
//             </span>
//           );
//         })}
//       </div>
//       {/* Footer Line */}
//       {/* Footer Line */}
//       <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center gap-2">
//         <p className="text-gray-400 text-sm font-medium">
//           {footerText}
//           <span className="mx-2 text-gray-600">•</span>
//           <span className="text-gray-500">{timestamp}</span>
//         </p>
//         {createdBy && (
//           <p className="text-xs text-gray-500">
//             Created by{" "}
//             <span className="text-white font-semibold">
//               {createdBy}
//             </span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default NotificationCard;
import { Edit2, Trash2, Copy } from "lucide-react";
import React from "react";

import colors from "../../constants/colors";


const NotificationCard = ({
  title,
  subtitle,
  description,
  type, // 'scheduled', 'sent', 'template'
  footerText,
  tags = [],
  onEdit,
  onDelete,
  onCopy,
  createdBy,
  timestamp,
}) => {
  /* ===========================
     TAG STYLE
  =========================== */
  const getTagStyle = (tag) => {
    // Audience tags
    if (
      [
        "All",
        "All Users",
        "Premium Users",
        "Users",
        "Creators",
      ].includes(tag)
    ) {
      return {
        backgroundColor: colors.hover,
        color: colors.textPrimary,
        borderColor: colors.cardBorder,
      };
    }

    // Language tags
    if (
      [
        "English",
        "Hindi",
        "Spanish",
        "French",
        "German",
      ].includes(tag)
    ) {
      return {
        backgroundColor: `${colors.accent}15`,
        color: colors.accent,
        borderColor: `${colors.accent}30`,
      };
    }

    // User/activity tags
    if (
      [
        "Active Users",
        "Top Creators",
        "Premium Subscribers",
      ].includes(tag)
    ) {
      return {
        backgroundColor: `${colors.info || colors.accent}15`,
        color: colors.info || colors.accent,
        borderColor: `${colors.info || colors.accent}30`,
      };
    }

    // Default / campaign tags
    return {
      backgroundColor: colors.inputBg,
      color: colors.textSecondary,
      borderColor: colors.inputBorder,
    };
  };

  return (
    <div
      className="w-full p-6 rounded-2xl border flex flex-col gap-4 shadow-lg transition-all"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.cardBorder,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.inputFocus;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.cardBorder;
      }}
    >
      {/* ===========================
          HEADER
      =========================== */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">

          {/* Title + Subtitle */}
          <div className="flex flex-wrap items-baseline gap-2 mb-1">
            <h3
              className="text-xl font-bold leading-tight break-words"
              style={{
                color: colors.textPrimary,
              }}
            >
              {title}
            </h3>

            {subtitle && (
              <span
                className="text-lg font-bold"
                style={{
                  color: colors.accent,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className="text-[15px] leading-snug"
            style={{
              color: colors.textSecondary,
            }}
          >
            {description}
          </p>
        </div>

        {/* ===========================
            ACTION ICONS
        =========================== */}
        <div className="flex gap-1 ml-4 shrink-0">

          {/* COPY */}
          {(type === "sent" || type === "template") && (
            <button
              type="button"
              onClick={onCopy}
              className="p-2 rounded-lg transition-all"
              title="Duplicate"
              style={{
                color: colors.textMuted,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.hover;
                e.currentTarget.style.color =
                  colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.color =
                  colors.textMuted;
              }}
            >
              <Copy size={18} />
            </button>
          )}

          {/* EDIT */}
          {/* 
          {(type === "scheduled" || type === "template") && (
            <button
              type="button"
              onClick={onEdit}
              className="p-2 rounded-lg transition-all"
              title="Edit"
              style={{
                color: colors.textMuted,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.hover;
                e.currentTarget.style.color =
                  colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.color =
                  colors.textMuted;
              }}
            >
              <Edit2 size={18} />
            </button>
          )}
          */}

          {/* DELETE */}
          {(type === "scheduled" || type === "template") && (
            <button
              type="button"
              onClick={onDelete}
              className="p-2 rounded-lg transition-all"
              title="Delete"
              style={{
                color: colors.textMuted,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  `${colors.danger || "#EF4444"}15`;
                e.currentTarget.style.color =
                  colors.danger || "#EF4444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.color =
                  colors.textMuted;
              }}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ===========================
          TAGS
      =========================== */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => {
            const tagStyle = getTagStyle(tag);

            return (
              <span
                key={`${tag}-${index}`}
                className="px-3 py-1 rounded-md text-xs font-semibold border"
                style={{
                  backgroundColor:
                    tagStyle.backgroundColor,
                  color: tagStyle.color,
                  borderColor:
                    tagStyle.borderColor,
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* ===========================
          FOOTER
      =========================== */}
      <div
        className="mt-auto pt-3 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
        style={{
          borderColor: colors.cardBorder,
        }}
      >
        {/* Footer Text */}
        <p
          className="text-sm font-medium"
          style={{
            color: colors.textSecondary,
          }}
        >
          {footerText}

          {timestamp && (
            <>
              <span
                className="mx-2"
                style={{
                  color: colors.textMuted,
                }}
              >
                •
              </span>

              <span
                style={{
                  color: colors.textMuted,
                }}
              >
                {timestamp}
              </span>
            </>
          )}
        </p>

        {/* Created By */}
        {createdBy && (
          <p
            className="text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            Created by{" "}
            <span
              className="font-semibold"
              style={{
                color: colors.textPrimary,
              }}
            >
              {createdBy}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;