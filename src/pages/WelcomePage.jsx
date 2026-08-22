// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { LogIn } from "lucide-react";
// import React from "react";
// import Button from "../components/ui/Button";
// import colors from "../constants/colors";
// import logo from "../assets/logo.webp";
// const WelcomePage = () => {
//     const navigate = useNavigate();
//     return (
//         <div
//             className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
//             style={{ background: colors.gradientVertical }}
//         >
//             {/* Subtle Texture */}
//             <div
//                 className="absolute inset-0 opacity-[0.08]"
//                 style={{
//                     backgroundImage:
//                         "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
//                     backgroundSize: "contain",
//                 }}
//             />
//             {/* Content */}
//             <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7 }}
//                 className="relative z-10 flex flex-col items-center text-center"
//             >
//                 {/* Logo */}
//                 <img
//                     src={logo}
//                     alt="ChatSpark Logo"
//                     width={120}
//                     height={120}
//                     className="mb-6"
//                     loading="lazy"
//                 />
//                 {/* Branding */}
//                 <h1 className="text-[42px] font-bold mb-1">
//                     <span style={{ color: colors.textSecondary }}>Chat</span>
//                     <span style={{ color: colors.accent }}>Spark</span>
//                 </h1>
//                 <p
//                     className="text-[28px] font-semibold mb-4"
//                     style={{ color: colors.textSecondary }}
//                 >
//                     Welcome To <span style={{ color: colors.accent }}>ChatSpark</span>
//                 </p>
//                 {/* Divider */}
//                 <div
//                     className="w-[400px] h-[2px] mb-8"
//                     style={{ backgroundColor: colors.accent }}
//                 />
//                 {/* Button using reusable component */}
//                 <Button
//                     variant="custom"
//                     bg={colors.buttonBg}
//                     text={colors.textPrimary}
//                     size="lg"
//                     onClick={() => navigate("/login")}
//                     icon={LogIn}
//                     motionEffect={true}
//                     whileHover={{scale:1.05}}
//                     whileTap={{scale:0.95}}
//                 >
//                     Log In
//                 </Button>
//             </motion.div>
//         </div>
//     );
// };
// export default WelcomePage;
import { useNavigate } from "react-router-dom";
import { LogIn, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

import colors from "../constants/colors";
import logo from "../assets/logo.webp";


const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      {/* Top Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "550px",
          height: "550px",
          top: "-300px",
          left: "50%",
          transform: "translateX(-50%)",
          background: colors.hover,
          filter: "blur(130px)",
          borderRadius: "50%",
        }}
      />

      {/* Left Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          left: "-250px",
          top: "25%",
          background: colors.hover,
          filter: "blur(130px)",
          borderRadius: "50%",
        }}
      />

      {/* Right Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          right: "-250px",
          bottom: "10%",
          background: colors.hover,
          filter: "blur(130px)",
          borderRadius: "50%",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-[560px] px-5 py-8"
      >
        {/* =====================================================
            CARD
        ====================================================== */}

        <div
          className="relative rounded-[30px] p-[1px]"
          style={{
            background: colors.gradientBorder,
            boxShadow: "0 30px 100px rgba(0,0,0,0.7)",
          }}
        >
          <div
            className="rounded-[29px] px-7 py-12 sm:px-12 sm:py-14 text-center"
            style={{
              background: colors.gradientCard,
            }}
          >
            {/* =================================================
                LOGO
            ================================================== */}

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
                duration: 0.6,
                ease: "easeOut",
              }}
              className="relative mx-auto mb-8 w-[145px] h-[145px]"
            >
              {/* Logo Glow */}
              <div
                className="absolute inset-[-15px] rounded-full pointer-events-none"
                style={{
                  background: colors.hover,
                  filter: "blur(30px)",
                  opacity: 0.8,
                }}
              />

              {/* Logo Circle */}
              <div
                className="relative w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: colors.primary,
                  border: `1px solid ${colors.cardBorder}`,
                  boxShadow: `
                    0 0 40px rgba(212,175,55,0.16),
                    inset 0 0 30px rgba(212,175,55,0.04)
                  `,
                }}
              >
                <img
                  src={logo}
                  alt="Agami Astro"
                  className="w-[115px] h-[115px] object-contain"
                />
              </div>
            </motion.div>

            {/* =================================================
                WELCOME TEXT
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.5,
              }}
              className="text-[13px] font-semibold tracking-[5px] uppercase mb-4"
              style={{
                color: colors.accentLight,
              }}
            >
              Welcome To
            </motion.div>

            {/* =================================================
                CHATSPARK
            ================================================== */}

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.5,
              }}
              className="text-[48px] sm:text-[56px] font-bold tracking-[-2px]"
              style={{
                lineHeight: 1,
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
            </motion.h1>

            {/* =================================================
                DIVIDER
            ================================================== */}

            <div className="flex items-center justify-center gap-4 my-8">
              <div
                className="h-[1px] w-[65px]"
                style={{
                  background: colors.accentDark,
                }}
              />

              <Sparkles
                size={18}
                strokeWidth={1.8}
                style={{
                  color: colors.accent,
                  filter: `drop-shadow(0 0 6px ${colors.accent})`,
                }}
              />

              <div
                className="h-[1px] w-[65px]"
                style={{
                  background: colors.accentDark,
                }}
              />
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.55,
                duration: 0.6,
              }}
              className="max-w-[400px] mx-auto text-[15px] sm:text-[16px] leading-[1.8]"
              style={{
                color: colors.textSecondary,
              }}
            >
              Connect, communicate and spark meaningful
              conversations with your community.
            </motion.p>

            {/* =================================================
                SIGN IN BUTTON
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
              className="mt-10 flex justify-center"
            >
              <motion.button
                type="button"
                onClick={() => navigate("/login")}
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 14px 35px rgba(212,175,55,0.30)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                style={{
                  width: "280px",
                  height: "58px",
                  border: "none",
                  borderRadius: "999px",
                  background: colors.gradientButton,
                  color: colors.buttonText,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "17px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow:
                    "0 10px 30px rgba(212,175,55,0.18)",
                  transition: "box-shadow 0.25s ease",
                }}
              >
                <LogIn
                  size={21}
                  strokeWidth={2.2}
                />

                <span>Sign In</span>
              </motion.button>
            </motion.div>

            {/* =================================================
                SECURITY TEXT
            ================================================== */}

            <div
              className="mt-6 flex items-center justify-center gap-3 text-[12px]"
              style={{
                color: colors.textMuted,
              }}
            >
              <span>Secure access</span>

              <span
                style={{
                  color: colors.accent,
                }}
              >
                •
              </span>

              <span>Private conversations</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.9,
            duration: 0.5,
          }}
          className="text-center mt-6"
        >
          <p
            className="text-[11px]"
            style={{
              color: colors.textMuted,
            }}
          >
            © {new Date().getFullYear()} ChatSpark. All rights
            reserved.
          </p>
        </motion.div>
      </motion.div>

      {/* =====================================================
          DECORATIVE DOTS
      ====================================================== */}

      <div
        className="absolute top-[18%] left-[10%] w-1 h-1 rounded-full"
        style={{
          background: colors.accent,
          boxShadow: `0 0 12px ${colors.accent}`,
        }}
      />

      <div
        className="absolute top-[28%] right-[12%] w-1 h-1 rounded-full"
        style={{
          background: colors.accentLight,
          boxShadow: `0 0 12px ${colors.accentLight}`,
        }}
      />

      <div
        className="absolute bottom-[20%] left-[15%] w-1 h-1 rounded-full"
        style={{
          background: colors.accentDark,
        }}
      />
    </div>
  );
};

export default WelcomePage;