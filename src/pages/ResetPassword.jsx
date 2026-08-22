import { Mail, ArrowLeft, Send } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import axiosInstance from "../api/axiosInstance";
// import colors from "../constants/colors";
// import logo from "../assets/logo.webp";
// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const handleSendLink = async () => {
//     if (!email) {
//       alert("Please enter email.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await axiosInstance.put("/api/v1/admin/request-password", {
//         email,
//         dashboard:'admin'
//       });
//       if (res.data?.success) {
//         alert("✅ Reset link sent to your email!");
//         navigate("/login");
//       } else {
//         alert(res.data?.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("❌ Error:", err);
//       alert(err.response?.data?.message || "Failed to send reset link.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center relative overflow-hidden"
//       style={{
//         background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})`,
//       }}
//     >
//       <div
//         className="absolute inset-0 opacity-[0.05]"
//         style={{
//           backgroundImage:
//             "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
//           backgroundSize: "contain",
//         }}
//       ></div>
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="relative z-10 bg-[#0f1424]/60 backdrop-blur-md rounded-2xl p-8 w-[90%] max-w-md text-white shadow-2xl"
//       >
//         <div className="flex justify-center mb-4">
//           <img src={logo} alt="ChatSpark logo" className="w-20 h-20" loading="lazy" />
//         </div>
//         <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">
//           Chat<span style={{ color: colors.accent }}>Spark</span>
//         </h1>
//         <p
//           className="text-center text-lg md:text-3xl font-semibold mb-6"
//           style={{ color: colors.textSecondary }}
//         >
//           Reset <span style={{ color: colors.accent }}>Password</span>
//         </p>
//         <div
//           className="w-2/3 h-[2px] mx-auto mb-6"
//           style={{ backgroundColor: colors.accent }}
//         ></div>
//         {/* Email Field */}
//         <div className="mb-6">
//           <label className="block mb-2 text-sm font-medium text-gray-300">
//             Enter Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 rounded-md bg-[#1a2238] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your email"
//           />
//         </div>
//         {/* Send Link Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           disabled={loading}
//           className="w-full flex justify-center items-center gap-2 font-semibold px-6 py-2 rounded-full shadow-lg transition duration-300"
//           style={{
//             backgroundColor: loading ? colors.textSecondary : colors.buttonBg,
//             color: colors.textPrimary,
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = colors.buttonHover)
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = colors.buttonBg)
//           }
//           onClick={handleSendLink}
//         >
//           {loading ? "Sending..." : "Send Reset Link"}
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };
// export default ResetPassword;
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";
import logo from "../assets/logo.webp";


const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendLink = async () => {
    if (!email.trim()) {
      alert("Please enter email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.put(
        "/api/v1/admin/request-password",
        {
          email,
          dashboard: "admin",
        }
      );

      if (res.data?.success) {
        alert("✅ Reset link sent to your email!");
        navigate("/login");
      } else {
        alert(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{
        background: colors.gradientPrimary,
        color: colors.textPrimary,
      }}
    >
      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      {/* Top Gold Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          top: "-280px",
          left: "50%",
          transform: "translateX(-50%)",
          background: colors.hover,
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />

      {/* Left Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          left: "-220px",
          top: "35%",
          background: colors.hover,
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />

      {/* Right Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          right: "-220px",
          bottom: "10%",
          background: colors.hover,
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />

      {/* =================================
          CARD
      ================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-[450px] rounded-[28px] p-[1px]"
        style={{
          background: colors.gradientBorder,
          boxShadow: "0 30px 100px rgba(0,0,0,0.65)",
        }}
      >
        <div
          className="rounded-[27px] px-7 py-9 sm:px-10 sm:py-11"
          style={{
            background: colors.gradientCard,
          }}
        >
          {/* =================================
              LOGO
          ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.5,
            }}
            className="relative mx-auto mb-6 w-[110px] h-[110px]"
          >
            {/* Logo Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: colors.hover,
                filter: "blur(28px)",
              }}
            />

            {/* Logo Container */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: colors.primary,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: `0 0 40px rgba(212,175,55,0.15)`,
              }}
            >
              <img
                src={logo}
                alt="ChatSpark"
                className="w-[82px] h-[82px] object-contain"
              />
            </div>
          </motion.div>

          {/* =================================
              BRAND
          ================================= */}

          <h1 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">
            <span style={{ color: colors.textPrimary }}>
              Chat
            </span>

            <span style={{ color: colors.accent }}>
              Spark
            </span>
          </h1>

          {/* =================================
              TITLE
          ================================= */}

          <p
            className="text-center text-xl sm:text-2xl font-semibold mt-3"
            style={{
              color: colors.textSecondary,
            }}
          >
            Reset{" "}
            <span style={{ color: colors.accent }}>
              Password
            </span>
          </p>

          {/* =================================
              DIVIDER
          ================================= */}

          <div className="flex items-center justify-center gap-3 my-7">
            <div
              className="h-[1px] w-[65px]"
              style={{
                background: colors.accentDark,
              }}
            />

            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: colors.accent,
                boxShadow: `0 0 10px ${colors.accent}`,
              }}
            />

            <div
              className="h-[1px] w-[65px]"
              style={{
                background: colors.accentDark,
              }}
            />
          </div>

          {/* =================================
              DESCRIPTION
          ================================= */}

          <p
            className="text-center text-sm leading-6 mb-7"
            style={{
              color: colors.textMuted,
            }}
          >
            Enter your registered email address and we'll
            send you a secure link to reset your password.
          </p>

          {/* =================================
              EMAIL
          ================================= */}

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium"
              style={{
                color: colors.textSecondary,
              }}
            >
              Email Address
            </label>

            <div className="relative">
              {/* Email Icon */}
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.textMuted,
                }}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  outline-none
                  transition-all
                  duration-200
                  placeholder:opacity-60
                "
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.inputBorder}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.inputFocus;

                  e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.hover}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.inputBorder;

                  e.currentTarget.style.boxShadow = "none";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendLink();
                  }
                }}
              />
            </div>
          </div>

          {/* =================================
              SEND BUTTON
          ================================= */}

          <motion.button
            whileHover={
              !loading
                ? {
                    scale: 1.02,
                  }
                : {}
            }
            whileTap={
              !loading
                ? {
                    scale: 0.98,
                  }
                : {}
            }
            disabled={loading}
            onClick={handleSendLink}
            className="
              w-full
              flex
              justify-center
              items-center
              gap-2
              font-semibold
              px-6
              py-3
              rounded-full
              transition-all
              duration-200
            "
            style={{
              background: loading
                ? colors.accentDark
                : colors.gradientButton,

              color: colors.buttonText,

              boxShadow: loading
                ? "none"
                : `0 8px 25px rgba(212,175,55,0.22)`,

              cursor: loading
                ? "not-allowed"
                : "pointer",

              opacity: loading ? 0.75 : 1,
            }}
          >
            {loading ? (
              <>
                <span
                  className="w-4 h-4 rounded-full border-2 animate-spin"
                  style={{
                    borderColor: colors.buttonText,
                    borderTopColor: "transparent",
                  }}
                />

                Sending...
              </>
            ) : (
              <>
                <Send size={18} />

                Send Reset Link
              </>
            )}
          </motion.button>

          {/* =================================
              BACK TO LOGIN
          ================================= */}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              mt-6
              mx-auto
              flex
              items-center
              gap-2
              text-sm
              transition-all
              duration-200
            "
            style={{
              color: colors.textMuted,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color =
                colors.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                colors.textMuted;
            }}
          >
            <ArrowLeft size={15} />

            Back to Login
          </button>
        </div>
      </motion.div>

      {/* =================================
          DECORATIVE DOTS
      ================================= */}

      <div
        className="absolute top-[18%] left-[12%] w-1 h-1 rounded-full"
        style={{
          background: colors.accent,
          boxShadow: `0 0 12px ${colors.accent}`,
        }}
      />

      <div
        className="absolute top-[28%] right-[15%] w-1 h-1 rounded-full"
        style={{
          background: colors.accentLight,
          boxShadow: `0 0 12px ${colors.accentLight}`,
        }}
      />

      <div
        className="absolute bottom-[20%] left-[18%] w-1 h-1 rounded-full"
        style={{
          background: colors.accentDark,
        }}
      />
    </div>
  );
};

export default ResetPassword;