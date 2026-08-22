// import { useLocation } from "react-router-dom";
// import React from "react";
// import colors from "../../constants/colors";
// import logo from "../../assets/logo.webp";
// const Navbar = ({callName}) => {
//   const location = useLocation();
//   const pathname=location.pathname;
//   const isQualityCategory = pathname.startsWith("/quality-category/");
//   const isQualityReview = pathname.startsWith("/quality-review/");
//   // Function to return the heading text based on route
//   const getHeading = () => {
//     if (isQualityCategory) {
//       return (
//         <>
//           Quality <span style={{ color: colors.accent }}>Review</span>
//         </>
//       );
//     }
//     if (isQualityReview) {
//       return (
//         <>
//           Quality <span style={{ color: colors.accent }}>Review</span>
//         </>
//       );
//     }
//     switch (location.pathname) {
//       case "/":
//         return (
//           <>
//             Welcome Back{" "}
//             <span style={{ color: colors.accent }} className="font-bold">
//               User
//             </span>
//           </>
//         );
//       case "/reported-calls":
//         return (
//           <>
//             Report <span style={{ color: colors.accent }}>Center</span>
//           </>
//       );
//       case "/moderation-panel":
//         return (
//           <>
//             Moderation <span style={{ color: colors.accent }}>Panel</span>
//           </>
//       );
//        case "/activity-log":
//         return (
//           <>
//             Action <span style={{ color: colors.accent }}>Log</span>
//           </>
//       );
//        case "/flagged":
//         return (
//           <>
//             Flagged Calls <span style={{ color: colors.accent }}>Moderation</span>
//           </>
//       );
//        case "/quality-review":
//         return (
//           <>
//             Quality <span style={{ color: colors.accent }}>Review</span>
//           </>
//       );
//        case "/quality-category/:title":
//         return (
//           <>
//             Quality <span style={{ color: colors.accent }}>Review</span>
//           </>
//       );
//        case "/customer-support":
//         return (
//           <>
//             Customer <span style={{ color: colors.accent }}>Support</span>
//           </>
//       );
//        case "/creator-scores":
//         return (
//           <>
//             Creator <span style={{ color: colors.accent }}>Score</span>
//           </>
//       );
//        case "/account-management":
//         return (
//           <>
//             Account <span style={{ color: colors.accent }}>Management</span>
//           </>
//       );
//       case "/insights-metrics":
//         return (
//           <>
//             Analytics & <span style={{ color: colors.accent }}>Insights</span>
//           </>
//       );
//       case "/chatbot-templates":
//         return (
//           <>
//             ChatBot <span style={{ color: colors.accent }}>Templates</span>
//           </>
//       );
//       case "/live-feed":
//         return (
//           <>
//             Live Feed <span style={{ color: colors.accent }}>Management</span>
//           </>
//       );
//       case "/graph":
//         return (
//           <>
//             User & Creator <span style={{ color: colors.accent }}>Anaylsis</span>
//           </>
//       );
//       case "/last-5-calls":
//         return (
//           <>
//             Last 5 <span style={{ color: colors.accent }}>Calls</span>
//           </>
//       );
//       case "/revoke-access":
//         return (
//           <>
//             Bulk Revoke <span style={{ color: colors.accent }}>Access</span>
//           </>
//       );
//        case "/trans-settle":
//         return (
//           <>
//             User Transactions <span style={{ color: colors.accent }}>Settlement</span>
//           </>
//       );
//       case "/chat-moderation":
//         return (
//           <>
//             Chat <span style={{ color: colors.accent }}>Moderation</span>
//           </>
//       );
//       case "/chat-access":
//         return (
//           <>
//             Chat <span style={{ color: colors.accent }}>Access</span>
//           </>
//       );
//       case "/mute-calls":
//         return (
//           <>
//             Mute <span style={{ color: colors.accent }}>Calls</span>
//           </>
//       );
//        case "/device-association":
//         return (
//           <>
//             Device <span style={{ color: colors.accent }}>Association</span>
//           </>
//       );
//       case "/chat-reports":
//         return (
//           <>
//             Chat <span style={{ color: colors.accent }}>Reports</span>
//           </>
//       );
//       //  case "/application":
//       //   return(
//       //     <>
//       //       Creator <span style={{color:colors.accent}}>Applications</span>
//       //     </>
//       //   );
//       //   case "/payouts":
//       //   return(
//       //     <>
//       //       Pay<span style={{color:colors.accent}}>outs</span>
//       //     </>
//       //   );
//       //   case "/payoutRequest":
//       //   return(
//       //     <>
//       //       Payout <span style={{color:colors.accent}}>Request</span>
//       //     </>
//       //   );
//       //   case "/kycReviews":
//       //   return(
//       //     <>
//       //       KYC <span style={{color:colors.accent}}>Review</span>
//       //     </>
//       //   );
//       //   case "/settings":
//       //   return(
//       //     <>
//       //       Sett<span style={{color:colors.accent}}>ings</span>
//       //     </>
//       //   );
//       //   case "/roleManagement":
//       //   return(
//       //     <>
//       //       Role <span style={{color:colors.accent}}>Management</span>
//       //     </>
//       //   );
//       //   case "/userAnalytics":
//       //   return(
//       //     <>
//       //       User Analytic: <span style={{color:colors.accent}}>Jane Doe</span>
//       //     </>
//       //   );
//       default:
//         //✅ If a call name is passed, show that
//         if (callName) {
//           return (
//             <>
//               Call Review:{" "}
//               <span style={{ color: colors.accent }} className="font-bold">
//                 {callName.creator}
//               </span>
//             </>
//           );
//         }
//         // if (appName) {
//         //   return (
//         //     <>
//         //       Application Review:{" "}
//         //       <span style={{ color: colors.accent }} className="font-bold">
//         //         {appName}
//         //       </span>
//         //     </>
//         //   );
//         // }
//         // if (kycUserName) {
//         //   return (
//         //     <>
//         //       KYC Review:{" "}
//         //       <span style={{ color: colors.accent }} className="font-bold">
//         //         {kycUserName}
//         //       </span>
//         //     </>
//         //   );
//         // }
//         // Fallback (for other unknown routes)
//         return (
//           <>
//             Welcome <span style={{ color: colors.accent }}>User</span>
//           </>
//         );
//     }
//   };
//   return (
//     <nav
//       className="flex flex-col h-20 md:flex-row justify-between items-center gap-4 md:gap-0 p-6 rounded-3xl mb-8 shadow-md"
//       style={{
//         background: colors.gradientVertical,
//         height: "60px"
//       }}
//     >
//       {/* Left spacer for symmetry */}
//       <div className="hidden md:block w-16" />
//       {/* Center Dynamic Title */}
//       <h1 className="text-2xl sm:text-3xl font-semibold text-center">
//         {getHeading()}
//       </h1>
//       {/* Right Logo */}
//       <div className="flex justify-center md:justify-end w-16">
//         <img
//           src={logo}
//           alt="ChatSpark"
//           className="w-12 sm:w-14 md:w-16 object-contain"
//           loading="lazy"
//         />
//       </div>
//     </nav>
//   );
// };
// export default Navbar;
// src/components/ui/Navbar.jsx
import { useLocation } from "react-router-dom";
import React from "react";

import colors from "../../constants/colors";
import logo from "../../assets/logo.webp";


const Navbar = ({ callName }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isQualityCategory = pathname.startsWith(
    "/quality-category/"
  );

  const isQualityReview = pathname.startsWith(
    "/quality-review/"
  );

  /* ==========================================
     HEADING
  ========================================== */

  const getHeading = () => {
    if (isQualityCategory || isQualityReview) {
      return (
        <>
          Quality{" "}
          <span style={{ color: colors.accent }}>
            Review
          </span>
        </>
      );
    }

    switch (pathname) {
      case "/":
        return (
          <>
            Welcome Back{" "}
            <span
              style={{ color: colors.accent }}
              className="font-bold"
            >
              User
            </span>
          </>
        );

      case "/reported-calls":
        return (
          <>
            Report{" "}
            <span style={{ color: colors.accent }}>
              Center
            </span>
          </>
        );

      case "/moderation-panel":
        return (
          <>
            Moderation{" "}
            <span style={{ color: colors.accent }}>
              Panel
            </span>
          </>
        );

      case "/activity-log":
        return (
          <>
            Action{" "}
            <span style={{ color: colors.accent }}>
              Log
            </span>
          </>
        );

      case "/flagged":
        return (
          <>
            Flagged Calls{" "}
            <span style={{ color: colors.accent }}>
              Moderation
            </span>
          </>
        );

      case "/quality-review":
        return (
          <>
            Quality{" "}
            <span style={{ color: colors.accent }}>
              Review
            </span>
          </>
        );

      case "/customer-support":
        return (
          <>
            Customer{" "}
            <span style={{ color: colors.accent }}>
              Support
            </span>
          </>
        );

      case "/creator-scores":
        return (
          <>
            Creator{" "}
            <span style={{ color: colors.accent }}>
              Score
            </span>
          </>
        );

      case "/account-management":
        return (
          <>
            Account{" "}
            <span style={{ color: colors.accent }}>
              Management
            </span>
          </>
        );

      case "/insights-metrics":
        return (
          <>
            Analytics &{" "}
            <span style={{ color: colors.accent }}>
              Insights
            </span>
          </>
        );

      case "/chatbot-templates":
        return (
          <>
            ChatBot{" "}
            <span style={{ color: colors.accent }}>
              Templates
            </span>
          </>
        );

      case "/live-feed":
        return (
          <>
            Live Feed{" "}
            <span style={{ color: colors.accent }}>
              Management
            </span>
          </>
        );

      case "/graph":
        return (
          <>
            User & Creator{" "}
            <span style={{ color: colors.accent }}>
              Analysis
            </span>
          </>
        );

      case "/last-5-calls":
        return (
          <>
            Last 5{" "}
            <span style={{ color: colors.accent }}>
              Calls
            </span>
          </>
        );

      case "/revoke-access":
        return (
          <>
            Bulk Revoke{" "}
            <span style={{ color: colors.accent }}>
              Access
            </span>
          </>
        );

      case "/trans-settle":
        return (
          <>
            User Transactions{" "}
            <span style={{ color: colors.accent }}>
              Settlement
            </span>
          </>
        );

      case "/chat-moderation":
        return (
          <>
            Chat{" "}
            <span style={{ color: colors.accent }}>
              Moderation
            </span>
          </>
        );

      case "/chat-access":
        return (
          <>
            Chat{" "}
            <span style={{ color: colors.accent }}>
              Access
            </span>
          </>
        );

      case "/mute-calls":
        return (
          <>
            Mute{" "}
            <span style={{ color: colors.accent }}>
              Calls
            </span>
          </>
        );

      case "/device-association":
        return (
          <>
            Device{" "}
            <span style={{ color: colors.accent }}>
              Association
            </span>
          </>
        );

      case "/chat-reports":
        return (
          <>
            Chat{" "}
            <span style={{ color: colors.accent }}>
              Reports
            </span>
          </>
        );

      default:
        if (callName) {
          return (
            <>
              Call Review:{" "}
              <span
                style={{ color: colors.accent }}
                className="font-bold"
              >
                {callName.creator}
              </span>
            </>
          );
        }

        return (
          <>
            Welcome{" "}
            <span style={{ color: colors.accent }}>
              User
            </span>
          </>
        );
    }
  };

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <nav
      className="
        relative
        flex
        items-center
        justify-between
        w-full
        h-[72px]
        px-5
        sm:px-7
        rounded-2xl
        mb-6
        overflow-hidden
      "
      style={{
        background: colors.gradientCard,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.30)",
      }}
    >
      {/* ======================================
          SUBTLE GOLD GLOW
      ====================================== */}

      <div
        className="absolute pointer-events-none"
        style={{
          width: "180px",
          height: "180px",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: colors.hover,
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />

      {/* ======================================
          LEFT SIDE
      ====================================== */}

      <div className="relative z-10 w-16 flex-shrink-0" />

      {/* ======================================
          CENTER TITLE
      ====================================== */}

      <div className="relative z-10 flex-1 flex justify-center">
        <h1
          className="
            text-xl
            sm:text-2xl
            font-semibold
            text-center
            tracking-tight
          "
          style={{
            color: colors.textPrimary,
          }}
        >
          {getHeading()}
        </h1>
      </div>

      {/* ======================================
          RIGHT LOGO
      ====================================== */}

      <div
        className="
          relative
          z-10
          w-16
          flex
          justify-end
          items-center
          flex-shrink-0
        "
      >
        <div
          className="
            w-11
            h-11
            sm:w-12
            sm:h-12
            rounded-full
            flex
            items-center
            justify-center
          "
          style={{
            background: colors.primary,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow:
              "0 0 20px rgba(212,175,55,0.10)",
          }}
        >
          <img
            src={logo}
            alt="ChatSpark"
            className="
              w-8
              h-8
              sm:w-9
              sm:h-9
              object-contain
            "
            loading="lazy"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;