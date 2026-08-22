import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft, } from "lucide-react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import axiosInstance from "../api/axiosInstance";
// import colors from "../constants/colors";
// import logo from "../assets/logo.webp";
// const UpdatePassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//     const {token}=useParams();
//   const handleUpdatePassword = async () => {
//     if (!password || !confirmPassword) {
//       alert("Please fill both fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await axiosInstance.put("/api/v1/admin/update-password", {
//         token,
//         newPassword:password,
//       });
//       if (res.data?.success) {
//         alert("Password updated successfully!");
//         navigate("/login");
//       } else {
//         alert(res.data?.message || "Something went wrong");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update password.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center relative overflow-hidden"
//       style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="relative z-10 bg-[#0f1424]/60 backdrop-blur-md rounded-2xl p-8 w-[90%] max-w-md text-white shadow-2xl"
//       >
//         <div className="flex justify-center mb-4">
//           <img src={logo} alt="ChatSpark logo" className="w-20 h-20" />
//         </div>
//         <h1 className="text-3xl font-bold text-center mb-2">
//           Reset <span style={{ color: colors.accent }}>Password</span>
//         </h1>
//         <p className="text-center text-gray-400 mb-6">
//           Enter your new password below
//         </p>
//         {/* New Password */}
//         <div className="mb-4">
//           <label className="block mb-2 text-sm text-gray-300">New Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 rounded-md bg-[#1a2238] text-white focus:outline-none"
//             placeholder="Enter new password"
//           />
//         </div>
//         {/* Confirm Password */}
//         <div className="mb-6">
//           <label className="block mb-2 text-sm text-gray-300">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 rounded-md bg-[#1a2238] text-white focus:outline-none"
//             placeholder="Confirm your password"
//           />
//         </div>
//         {/* Update Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           disabled={loading}
//           onClick={handleUpdatePassword}
//           className="w-full py-2 font-semibold rounded-full shadow-lg"
//           style={{
//             backgroundColor: loading ? colors.textSecondary : colors.buttonBg,
//             color: colors.textPrimary,
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Updating..." : "Update Password"}
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };
// export default UpdatePassword;
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";
import colors from "../constants/colors";
import logo from "../assets/logo.webp";


const UpdatePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      alert("Please fill both fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.put(
        "/api/v1/admin/update-password",
        {
          token,
          newPassword: password,
        }
      );

      if (res.data?.success) {
        alert("Password updated successfully!");
        navigate("/login");
      } else {
        alert(
          res.data?.message ||
            "Something went wrong"
        );
      }
    } catch (err) {
      console.error("Password update error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update password."
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

      {/* Left Gold Glow */}
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

      {/* Right Gold Glow */}
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
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: colors.hover,
                filter: "blur(28px)",
              }}
            />

            {/* Logo Circle */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: colors.primary,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow:
                  "0 0 40px rgba(212,175,55,0.15)",
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
              TITLE
          ================================= */}

          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Reset{" "}
            <span
              style={{
                color: colors.accent,
              }}
            >
              Password
            </span>
          </h1>

          <p
            className="text-center text-sm sm:text-base mt-3 mb-7"
            style={{
              color: colors.textMuted,
            }}
          >
            Enter your new password below
          </p>

          {/* =================================
              DIVIDER
          ================================= */}

          <div className="flex items-center justify-center gap-3 mb-7">
            <div
              className="h-[1px] w-[65px]"
              style={{
                background: colors.accentDark,
              }}
            />

            <CheckCircle2
              size={16}
              style={{
                color: colors.accent,
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
              NEW PASSWORD
          ================================= */}

          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium"
              style={{
                color: colors.textSecondary,
              }}
            >
              New Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.textMuted,
                }}
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter new password"
                disabled={loading}
                className="
                  w-full
                  pl-11
                  pr-12
                  py-3
                  rounded-xl
                  outline-none
                  transition-all
                  duration-200
                  placeholder:opacity-60
                "
                style={{
                  backgroundColor:
                    colors.inputBg,
                  color:
                    colors.textPrimary,
                  border: `1px solid ${colors.inputBorder}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.inputFocus;

                  e.currentTarget.style.boxShadow =
                    `0 0 0 3px ${colors.hover}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.inputBorder;

                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.textMuted,
                }}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* =================================
              CONFIRM PASSWORD
          ================================= */}

          <div className="mb-7">
            <label
              className="block mb-2 text-sm font-medium"
              style={{
                color: colors.textSecondary,
              }}
            >
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.textMuted,
                }}
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm your password"
                disabled={loading}
                className="
                  w-full
                  pl-11
                  pr-12
                  py-3
                  rounded-xl
                  outline-none
                  transition-all
                  duration-200
                  placeholder:opacity-60
                "
                style={{
                  backgroundColor:
                    colors.inputBg,
                  color:
                    colors.textPrimary,
                  border: `1px solid ${colors.inputBorder}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.inputFocus;

                  e.currentTarget.style.boxShadow =
                    `0 0 0 3px ${colors.hover}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.inputBorder;

                  e.currentTarget.style.boxShadow =
                    "none";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdatePassword();
                  }
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.textMuted,
                }}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* =================================
              UPDATE BUTTON
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
            onClick={handleUpdatePassword}
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
                : "0 8px 25px rgba(212,175,55,0.22)",

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
                    borderColor:
                      colors.buttonText,
                    borderTopColor:
                      "transparent",
                  }}
                />

                Updating...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />

                Update Password
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
          boxShadow:
            `0 0 12px ${colors.accent}`,
        }}
      />

      <div
        className="absolute top-[28%] right-[15%] w-1 h-1 rounded-full"
        style={{
          background: colors.accentLight,
          boxShadow:
            `0 0 12px ${colors.accentLight}`,
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

export default UpdatePassword;