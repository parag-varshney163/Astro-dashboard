// import colors from "../../constants/colors";
// export default function AnalyticsGrid({
//   title = "",
//   subtitle = "",
//   items,
//   gridCols = "3",
// }) {
//   return (
//     <div className="w-full flex flex-col gap-4">
//       <h3 className="text-2xl font-bold text-white flex items-center gap-2">
//         {title.split(" ")[0]}{" "}
//         <span style={{ color: colors.accent }}>{title.split(" ")[1]}</span>
//       </h3>
//       <p className="text-sm ml-1 text-yellow-500">{subtitle}</p>
//       <div
//         className="w-full p-8 rounded-2xl "
//         style={{ backgroundColor: colors.secondary }}
//       >
//         <div
//           className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${gridCols} gap-6`}
//         >
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="p-8 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center gap-2 shadow-lg min-h-40"
//               style={{ backgroundColor: colors.cardBg }}
//             >
//               <span className="text-white font-bold text-lg tracking-wide">
//                 {item.label.split(" ").map((word, i, arr) => (
//                   <span
//                     key={i}
//                     style={{
//                       color: i === arr.length - 1 ? colors.accent : "inherit",
//                     }}
//                   >
//                     {word}{" "}
//                   </span>
//                 ))}
//               </span>
//               <span className="text-3xl font-bold text-white tracking-tight mt-2">
//                 {item.value}
//               </span>
//               <span
//                 className="text-[16px] font-bold mt-1"
//                 style={{ color: item.subTextColor || colors.success }}
//               >
//                 {item.subtext}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import colors from "../../constants/colors";


export default function AnalyticsGrid({
  title = "",
  subtitle = "",
  items = [],
  gridCols = "3",
  loading = false,
}) {
  const gridColumnClasses = {
    "1": "xl:grid-cols-1",
    "2": "xl:grid-cols-2",
    "3": "xl:grid-cols-3",
    "4": "xl:grid-cols-4",
    "5": "xl:grid-cols-5",
    "6": "xl:grid-cols-6",
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Title */}
      {title && (
        <h3
          className="text-2xl font-bold flex items-center gap-2"
          style={{ color: colors.textPrimary }}
        >
          {title.split(" ")[0]}{" "}
          <span style={{ color: colors.accent }}>
            {title.split(" ")[1]}
          </span>
        </h3>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className="text-sm ml-1"
          style={{ color: colors.accentLight }}
        >
          {subtitle}
        </p>
      )}

      {/* Analytics Container */}
      <div
        className="w-full p-6 md:p-8 rounded-2xl border"
        style={{
          background: colors.gradientCard,
          borderColor: colors.cardBorder,
        }}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            gridColumnClasses[gridCols] || "xl:grid-cols-3"
          } gap-5 md:gap-6`}
        >
          {loading
            ? Array.from({ length: Number(gridCols) || 3 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="p-6 md:p-8 rounded-xl min-h-[160px] flex flex-col items-center justify-center text-center gap-3 animate-pulse"
                    style={{
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.cardBorder}`,
                    }}
                  >
                    <div
                      className="h-5 w-24 rounded"
                      style={{
                        backgroundColor: colors.cardHover,
                      }}
                    />

                    <div
                      className="h-9 w-20 rounded"
                      style={{
                        backgroundColor: colors.cardHover,
                      }}
                    />

                    <div
                      className="h-4 w-32 rounded"
                      style={{
                        backgroundColor: colors.cardHover,
                      }}
                    />
                  </div>
                )
              )
            : items.map((item, index) => (
                <div
                  key={index}
                  className="p-6 md:p-8 rounded-xl border flex flex-col items-center justify-center text-center gap-2 shadow-lg min-h-[160px] transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  }}
                >
                  {/* Label */}
                  <span
                    className="font-bold text-lg tracking-wide"
                    style={{ color: colors.textPrimary }}
                  >
                    {item.label
                      ?.split(" ")
                      .map((word, i, arr) => (
                        <span
                          key={i}
                          style={{
                            color:
                              i === arr.length - 1
                                ? colors.accent
                                : colors.textPrimary,
                          }}
                        >
                          {word}{" "}
                        </span>
                      ))}
                  </span>

                  {/* Value */}
                  <span
                    className="text-3xl font-bold tracking-tight mt-2"
                    style={{ color: colors.textPrimary }}
                  >
                    {item.value}
                  </span>

                  {/* Subtext */}
                  <span
                    className="text-[16px] font-bold mt-1"
                    style={{
                      color:
                        item.subTextColor || colors.success,
                    }}
                  >
                    {item.subtext}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}