// import React from "react";
// import logo from "../../assets/logo.webp";
// const DashboardLoader = ({ height = "100vh" }) => {
//   return (
//     <div
//       className="flex flex-col items-center justify-center bg-slate-900"
//       style={{ height }}
//     >
//       <div className="relative flex items-center justify-center">
//         {/* Rotating Ring */}
//         <div className="absolute w-40 h-40 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin"></div>
//         {/* Glowing Ring (optional premium effect) */}
//         <div className="absolute w-40 h-40 rounded-full border-4 border-transparent border-t-cyan-400 blur-sm opacity-60 animate-spin"></div>
//         {/* Logo in Center */}
//         <img
//           src={logo}
//           alt="Logo"
//           className="w-20 h-20 object-contain z-10"
//         />
//       </div>
//       <p className="text-slate-400 mt-14 tracking-widest text-sm animate-pulse">
//         Loading Dashboard...
//       </p>
//     </div>
//   );
// };
// export default DashboardLoader; 
import React from "react";

import colors from "../../constants/colors";
import logo from "../../assets/logo.webp";


const DashboardLoader = ({ height = "100vh" }) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height,
        backgroundColor: colors.pageBg,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Rotating Ring */}
        <div
          className="absolute w-40 h-40 rounded-full border-4 animate-spin"
          style={{
            borderColor: colors.cardBorder,
            borderTopColor: colors.accent,
          }}
        />

        {/* Glowing Ring */}
        <div
          className="absolute w-40 h-40 rounded-full border-4 border-transparent animate-spin blur-sm"
          style={{
            borderTopColor: colors.accentLight,
            opacity: 0.6,
          }}
        />

        {/* Logo in Center */}
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 object-contain z-10"
        />
      </div>

      <p
        className="mt-14 tracking-widest text-sm animate-pulse"
        style={{
          color: colors.textSecondary,
        }}
      >
        Loading Dashboard...
      </p>
    </div>
  );
};

export default DashboardLoader;

