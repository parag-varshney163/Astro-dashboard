// import React from "react";
// import colors from "../../constants/colors";
// const DashboardLoader = ({ height = "70vh" }) => {
//   return (
//     <div style={{ ...styles.wrapper, height }}>
//       <div style={styles.loaderWrapper}>
//         <div style={styles.outerRing}></div>
//         <div style={styles.innerCircle}></div>
//       </div>
//       <p style={styles.text}>Loading Dashboard...</p>
//     </div>
//   );
// };
// const styles = {
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     background: colors.gradientVertical,
//     width: "100%",
//     gap: "25px",
//   },
//   loaderWrapper: {
//     position: "relative",
//     width: "90px",
//     height: "90px",
//   },
//   outerRing: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     borderRadius: "50%",
//     border: `3px solid ${colors.cardBorder}`,
//     borderTop: `3px solid ${colors.accent}`,
//     animation: "spin 1.2s linear infinite",
//     boxShadow: `0 0 20px ${colors.accent}`,
//   },
//   innerCircle: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "45px",
//     height: "45px",
//     borderRadius: "50%",
//     background: colors.accent,
//     animation: "pulse 1.5s ease-in-out infinite",
//   },
//   text: {
//     color: colors.textSecondary,
//     fontSize: "14px",
//     letterSpacing: "1px",
//   },
// };
// export default DashboardLoader;  
import React from "react";

import logo from "../../assets/logo.webp";


const DashboardLoader = ({ height = "100vh" }) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-slate-900"
      style={{ height }}
    >
      <div className="relative flex items-center justify-center">
        
        {/* Rotating Ring */}
        <div className="absolute w-40 h-40 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin"></div>

        {/* Glowing Ring (optional premium effect) */}
        <div className="absolute w-40 h-40 rounded-full border-4 border-transparent border-t-cyan-400 blur-sm opacity-60 animate-spin"></div>

        {/* Logo in Center */}
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 object-contain z-10"
        />
      </div>

      <p className="text-slate-400 mt-14 tracking-widest text-sm animate-pulse">
        Loading Dashboard...
      </p>
    </div>
  );
};

export default DashboardLoader; 




