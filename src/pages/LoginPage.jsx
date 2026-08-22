// // import { Link, useNavigate } from "react-router-dom";
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { LogIn } from "lucide-react";
// // import axiosInstance from "../api/axiosInstance";
// // import ROUTES from "../constants/Routes";
// // import colors from "../constants/colors";
// // import logo from "../assets/logo.webp";
// // const LoginPage = () => {
// //     const navigate = useNavigate();
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [error, setError] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         setError("");
// //         setLoading(true);
// //         try {
// //             const { data } = await axiosInstance.post("/api/v1/admin/login", {
// //                 email,
// //                 password,
// //             });
// //             const token = data?.data?.accessToken;
// //             if (!token) throw new Error("Token missing from response");
// //             localStorage.setItem("token", token);
// //             localStorage.setItem("admin", JSON.stringify(data.data.admin));
// //             navigate(ROUTES.DASHBOARD, { replace: true });
// //         } catch (err) {
// //             console.error("❌ Login error:", err);
// //             setError(err.response?.data?.message || "Invalid email or password");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //     return (
// //         <div
// //             className="min-h-screen flex items-center justify-center text-white overflow-hidden"
// //             style={{ background: colors.gradientVertical }}
// //         >
// //             <div className="bg-[#0f1424]/70 backdrop-blur-xl rounded-2xl p-10 w-[420px] shadow-2xl">
// //                 {/* Logo */}
// //                 <div className="flex justify-center mb-5">
// //                     <img src={logo} alt="ChatSpark" width={90} height={90} />
// //                 </div>
// //                 <h1 className="text-4xl font-bold text-center mb-6">
// //                     Chat<span style={{ color: colors.accent }}>Spark</span>
// //                 </h1>
// //                 <form onSubmit={handleLogin}>
// //                     {/* Email */}
// //                     <label className="block mb-2 text-sm text-gray-300">Email</label>
// //                     <input
// //                         type="email"
// //                         className="w-full mb-4 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                         style={{ backgroundColor: colors.inputBg }}
// //                         placeholder="Enter email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                     />
// //                     {/* Password */}
// //                     <label className="block mb-2 text-sm text-gray-300">Password</label>
// //                     <input
// //                         type="password"
// //                         className="w-full mb-3 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                         style={{ backgroundColor: colors.inputBg }}
// //                         placeholder="Enter password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                     {/* Forgot Password */}
// //                     <div className="mb-4 text-left">
// //                         <Link
// //                             to={ROUTES.RESET_PASSWORD}
// //                             style={{ color: colors.accent }}
// //                             className="text-sm hover:underline"
// //                         >
// //                             Forgot Password?
// //                         </Link>
// //                     </div>
// //                     {/* Error */}
// //                     {error && <p className="text-red-400 text-center mb-3">{error}</p>}
// //                     <motion.button
// //                         whileHover={{ scale: 1.05 }}
// //                         whileTap={{ scale: 0.95 }}
// //                         type="submit"
// //                         disabled={loading}
// //                         className="w-full flex justify-center items-center gap-2 font-semibold px-8 py-3 rounded-full shadow-lg"
// //                         style={{
// //                             backgroundColor: colors.buttonBg,
// //                             color: colors.textPrimary,
// //                             opacity: loading ? 0.7 : 1,
// //                         }}
// //                     >
// //                         {loading ? "Logging in..." : (
// //                             <>
// //                                 <LogIn size={18} /> Log In
// //                             </>
// //                         )}
// //                     </motion.button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };
// // export default LoginPage;
// import { Link, useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { LogIn } from "lucide-react";
// import axiosInstance from "../api/axiosInstance";
// import ROUTES from "../constants/Routes";
// import colors from "../constants/colors";
// import logo from "../assets/logo.webp";
// /** ---------------------------------------
//  * 🔥 FIRST ACCESSIBLE ROUTE FINDER
//  * -------------------------------------- */
// const findFirstAccessibleRoute = (permissions) => {
//   if (!permissions) return ROUTES.UNAUTHORIZED;
//   const p = permissions.moderationDashboard || {};
//   // if (p.report) return ROUTES.DASHBOARD;
//   // if (p.moderationPanel) return ROUTES.MODERATION_PANEL;
//   // if (p.activityLog) return ROUTES.ACTIVITY_LOG;
//   // if (p.qualityReview) return ROUTES.QUALITY_REVIEW;
//   // if (p.creatorScores) return ROUTES.CREATOR_SCORES;
//   if (p.customerSupport) return ROUTES.CUSTOMER_SUPPORT;
//   // if (p.insightsAndMetrices) return ROUTES.INSIGHTS_METRICES;
//   // if (p.flagged) return ROUTES.FLAGGED;
//   // if (p.chatbotTemplate) return ROUTES.CHATBOT_TEMPLATES;
//   return ROUTES.UNAUTHORIZED;
// };
// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.post("/api/v1/admin/login", {
//         email,
//         password,
//       });
//       const token = data?.data?.accessToken;
//       if (!token) throw new Error("Token missing");
//       // Save auth details
//       localStorage.setItem("token", token);
//       localStorage.setItem("admin", JSON.stringify(data.data.admin));
//       localStorage.setItem("roleName", data.data.admin.role);
//       /** -------------------------------------
//        * 1️⃣ Fetch role-based permissions immediately
//        * (We need this BEFORE redirecting)
//        * ------------------------------------- */
//       const roleRes = await axiosInstance.get("/api/v1/admin/roles");
//       const allRoles = roleRes.data?.data || [];
//       const roleName = data.data.admin.role;
//       const userRole = allRoles.find((r) => r.roleName === roleName);
//       const rolePermissions = userRole?.permissions || {};
//       localStorage.setItem("rolePermissions", JSON.stringify(rolePermissions));
//       /** -------------------------------------
//        * 2️⃣ Redirect to first accessible route
//        * ------------------------------------- */
//       const firstRoute = findFirstAccessibleRoute(rolePermissions);
//       navigate(firstRoute, { replace: true });
//     } catch (err) {
//       console.error("❌ Login error:", err);
//       setError(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
//       style={{ background: colors.gradientVertical }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-[#0f1424]/70 backdrop-blur-md rounded-2xl p-10 w-[420px] shadow-2xl relative z-10"
//       >
//         {/* Logo */}
//         <div className="flex justify-center mb-5">
//           <img src={logo} alt="ChatSpark" width={90} height={90} />
//         </div>
//         <h1 className="text-3xl font-bold text-center mb-6">
//           Chat<span style={{ color: colors.accent }}>Spark</span>
//         </h1>
//         <form onSubmit={handleLogin}>
//           {/* Email */}
//           <label className="block mb-2 text-sm text-gray-300">Email</label>
//           <input
//             type="email"
//             className="w-full mb-4 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             style={{ backgroundColor: colors.inputBg }}
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           {/* Password */}
//           <label className="block mb-2 text-sm text-gray-300">Password</label>
//           <input
//             type="password"
//             className="w-full mb-2 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             style={{ backgroundColor: colors.inputBg }}
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {/* Forgot Password */}
//           <div className="mb-4 text-left">
//             <Link
//               to={ROUTES.RESET_PASSWORD}
//               style={{ color: colors.accent }}
//               className="text-sm hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//           {/* Error */}
//           {error && <p className="text-red-400 text-center mb-3">{error}</p>}
//           {/* Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center items-center gap-2 font-semibold px-8 py-3 rounded-full shadow-lg"
//             style={{
//               backgroundColor: colors.buttonBg,
//               color: colors.textPrimary,
//               opacity: loading ? 0.7 : 1,
//             }}
//           >
//             {loading ? "Logging in..." : (
//               <>
//                 <LogIn size={18} /> Log In
//               </>
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };
// export default LoginPage;
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";
import Button from "../components/ui/Button";
import ROUTES from "../constants/Routes";
import colors from "../constants/colors";
import logo from "../assets/logo.webp";


/** ---------------------------------------
 * FIRST ACCESSIBLE ROUTE FINDER
 * -------------------------------------- */
const findFirstAccessibleRoute = (permissions) => {
  if (!permissions) return ROUTES.UNAUTHORIZED;

  const p = permissions.moderationDashboard || {};

  // if (p.report) return ROUTES.DASHBOARD;
  // if (p.moderationPanel) return ROUTES.MODERATION_PANEL;
  // if (p.activityLog) return ROUTES.ACTIVITY_LOG;
  // if (p.qualityReview) return ROUTES.QUALITY_REVIEW;
  // if (p.creatorScores) return ROUTES.CREATOR_SCORES;

  if (p.customerSupport) {
    return ROUTES.CUSTOMER_SUPPORT;
  }

  // if (p.insightsAndMetrices) return ROUTES.INSIGHTS_METRICES;
  // if (p.flagged) return ROUTES.FLAGGED;
  if (p.chatbotTemplate) return ROUTES.CHATBOT_TEMPLATES;

  return ROUTES.UNAUTHORIZED;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /** ---------------------------------------
   * LOGIN
   * -------------------------------------- */
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // -------------------------------------
      // 1. Login
      // -------------------------------------
      const { data } = await axiosInstance.post(
        "/api/v1/admin/login",
        {
          email,
          password,
        }
      );

      const token = data?.data?.accessToken;

      if (!token) {
        throw new Error("Token missing from response");
      }

      const admin = data?.data?.admin;

      // -------------------------------------
      // 2. Save authentication details
      // -------------------------------------
      localStorage.setItem("token", token);

      localStorage.setItem(
        "admin",
        JSON.stringify(admin)
      );

      localStorage.setItem(
        "roleName",
        admin?.role || ""
      );

      // -------------------------------------
      // 3. Fetch roles
      // -------------------------------------
      const roleRes = await axiosInstance.get(
        "/api/v1/admin/roles"
      );

      const allRoles =
        roleRes?.data?.data || [];

      // -------------------------------------
      // 4. Find current user's role
      // -------------------------------------
      const roleName = admin?.role;

      const userRole = allRoles.find(
        (role) => role.roleName === roleName
      );

      const rolePermissions =
        userRole?.permissions || {};

      // -------------------------------------
      // 5. Save permissions
      // -------------------------------------
      localStorage.setItem(
        "rolePermissions",
        JSON.stringify(rolePermissions)
      );

      // -------------------------------------
      // 6. Find first accessible route
      // -------------------------------------
      const firstRoute =
        findFirstAccessibleRoute(
          rolePermissions
        );

      // -------------------------------------
      // 7. Redirect
      // -------------------------------------
      navigate(firstRoute, {
        replace: true,
      });
    } catch (err) {
      console.error("❌ Login error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-5 py-10"
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* =====================================
          BACKGROUND GLOWS
      ====================================== */}

      {/* Top Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          top: "-280px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: colors.hover,
          filter: "blur(120px)",
        }}
      />

      {/* Left Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          left: "-220px",
          top: "25%",
          borderRadius: "50%",
          background: colors.hover,
          filter: "blur(120px)",
        }}
      />

      {/* Right Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          right: "-220px",
          bottom: "15%",
          borderRadius: "50%",
          background: colors.hover,
          filter: "blur(120px)",
        }}
      />

      {/* =====================================
          LOGIN CARD
      ====================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-[470px]"
      >
        {/* Gold Border */}
        <div
          className="rounded-[28px] p-[1px]"
          style={{
            background: colors.gradientBorder,
            boxShadow:
              "0 30px 100px rgba(0,0,0,0.65)",
          }}
        >
          {/* Card */}
          <div
            className="rounded-[27px] px-7 py-9 sm:px-10 sm:py-11"
            style={{
              background: colors.gradientCard,
            }}
          >
            {/* =================================
                LOGO
            ================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.5,
              }}
              className="flex justify-center mb-6"
            >
              <div
                className="relative w-[125px] h-[125px] rounded-full flex items-center justify-center"
                style={{
                  background: colors.primary,
                  border: `1px solid ${colors.cardBorder}`,
                  boxShadow:
                    "0 0 45px rgba(212,175,55,0.15)",
                }}
              >
                {/* Logo Glow */}
                <div
                  className="absolute inset-2 rounded-full pointer-events-none"
                  style={{
                    background: colors.hover,
                    filter: "blur(20px)",
                  }}
                />

                <img
                  src={logo}
                  alt="Agami Astro"
                  className="relative z-10 w-[100px] h-[100px] object-contain"
                />
              </div>
            </motion.div>

            {/* =================================
                BRAND
            ================================== */}

            <div className="text-center mb-8">
              <div
                className="text-[12px] font-semibold tracking-[4px] uppercase mb-3"
                style={{
                  color: colors.accentLight,
                }}
              >
                Welcome Back
              </div>

              <h1
                className="text-[38px] sm:text-[42px] font-bold tracking-[-1.5px]"
                style={{
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  Chat
                </span>

                <span
                  style={{
                    color: colors.accent,
                  }}
                >
                  Spark
                </span>
              </h1>

              <p
                className="mt-3 text-[14px]"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* =================================
                FORM
            ================================== */}

            <form onSubmit={handleLogin}>
              {/* EMAIL */}

              <div className="mb-5">
                <label
                  className="block mb-2 text-[13px] font-medium"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Email
                </label>

                <div className="relative">
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-200"
                    style={{
                      background: colors.inputBg,
                      color: colors.textPrimary,
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
                </div>
              </div>

              {/* PASSWORD */}

              <div className="mb-3">
                <label
                  className="block mb-2 text-[13px] font-medium"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Password
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
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-200"
                    style={{
                      background: colors.inputBg,
                      color: colors.textPrimary,
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
                </div>
              </div>

              {/* FORGOT PASSWORD */}

              <div className="flex justify-end mb-6">
                <Link
                  to={ROUTES.RESET_PASSWORD}
                  className="text-[13px] transition-opacity hover:opacity-75"
                  style={{
                    color: colors.accentLight,
                  }}
                >
                  Forgot Password?
                </Link>
              </div>

              {/* ERROR */}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mb-5 rounded-xl px-4 py-3 text-[13px]"
                  style={{
                    background: `${colors.danger}12`,
                    border: `1px solid ${colors.danger}40`,
                    color: colors.danger,
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* =================================
                  LOGIN BUTTON
              ================================== */}

              <Button
                variant="primary"
                size="lg"
                fullWidth
                type="submit"
                disabled={loading}
                icon={loading ? undefined : LogIn}
                motionEffect={!loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </form>

            {/* =================================
                SECURITY TEXT
            ================================== */}

            <div
              className="mt-7 pt-5 text-center"
              style={{
                borderTop: `1px solid ${colors.inputBorder}`,
              }}
            >
              <p
                className="text-[11px]"
                style={{
                  color: colors.textMuted,
                }}
              >
                <span
                  style={{
                    color: colors.accent,
                  }}
                >
                  🔒
                </span>{" "}
                Secure access • Private conversations
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            FOOTER
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="text-center mt-5"
        >
          <p
            className="text-[11px]"
            style={{
              color: colors.textMuted,
            }}
          >
            © {new Date().getFullYear()} ChatSpark. All
            rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;