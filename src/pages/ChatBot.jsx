// import { motion } from "framer-motion";
// import { useState } from "react";
// import React from "react";
// import TemplateSwitcher from "../components/chatbot-templates/TemplateSwitcher";
// import ChatBotStats from "../components/chatbot-templates/ChatBotStats";
// import Sidebar from "../components/ui/Sidebar";
// import Navbar from "../components/ui/Navbar";
// import colors from "../constants/colors";
// const ChatBot = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     return (
//         <div
//             className="min-h-screen flex text-white overflow-hidden"
//             style={{ background: colors.gradientVertical }}
//         >
//             <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//             <motion.main
//                 animate={{
//                     marginLeft: sidebarOpen ? 220 : 70,
//                     width: sidebarOpen ? "calc(100% - 220px)" : "calc(100% - 70px)",
//                 }}
//                 transition={{ duration: 0.4, type: "tween" }}
//                 className="p-6 overflow-y-auto scrollbar-hide"
//             >
//                 <Navbar />
//                 <div className="space-y-6">
//                     <ChatBotStats/>
//                     <TemplateSwitcher/>
//                 </div>
//             </motion.main>
//         </div>
//     );
// };
// export default ChatBot;
// src/pages/ChatBot.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";

import TemplateSwitcher from "../components/chatbot-templates/TemplateSwitcher";
import ChatBotStats from "../components/chatbot-templates/ChatBotStats";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import colors from "../constants/colors";


const ChatBot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen
        flex
        text-white
        overflow-hidden
        relative
      "
      style={{
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* ==========================================
          BACKGROUND GLOW
      ========================================== */}

      {/* Top Gold Glow */}
      <div
        className="
          fixed
          pointer-events-none
          rounded-full
          z-0
        "
        style={{
          width: "500px",
          height: "500px",
          top: "-280px",
          left: "50%",
          transform: "translateX(-50%)",
          background: colors.hover,
          filter: "blur(130px)",
          opacity: 0.45,
        }}
      />

      {/* Left Gold Glow */}
      <div
        className="
          fixed
          pointer-events-none
          rounded-full
          z-0
        "
        style={{
          width: "350px",
          height: "350px",
          left: "-220px",
          top: "35%",
          background: colors.hover,
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />

      {/* Right Gold Glow */}
      <div
        className="
          fixed
          pointer-events-none
          rounded-full
          z-0
        "
        style={{
          width: "350px",
          height: "350px",
          right: "-220px",
          bottom: "10%",
          background: colors.hover,
          filter: "blur(120px)",
          opacity: 0.3,
        }}
      />

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <motion.main
        animate={{
          marginLeft: sidebarOpen ? 220 : 70,
          width: sidebarOpen
            ? "calc(100% - 220px)"
            : "calc(100% - 70px)",
        }}
        transition={{
          duration: 0.4,
          type: "tween",
        }}
        className="
          relative
          z-10
          min-h-screen
          p-4
          sm:p-5
          lg:p-6
          overflow-y-auto
          scrollbar-hide
        "
      >
        {/* ========================================
            NAVBAR
        ======================================== */}

        <Navbar />

        {/* ========================================
            PAGE CONTENT
        ======================================== */}

        <div className="space-y-5 sm:space-y-6">

          {/* ======================================
              CHATBOT STATS
          ====================================== */}

          <div
            className="
              w-full
              rounded-2xl
            "
          >
            <ChatBotStats />
          </div>

          {/* ======================================
              TEMPLATE SWITCHER
          ====================================== */}

          <div
            className="
              w-full
              rounded-2xl
            "
          >
            <TemplateSwitcher />
          </div>

        </div>
      </motion.main>
    </div>
  );
};

export default ChatBot;