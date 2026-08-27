import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";

import RashifalImagesTable from "../components/rashifal/RashifalImagesTable";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import colors from "../constants/colors";


const Rashifal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{
        background: colors.gradientPrimary,
        color: colors.textPrimary,
      }}
    >
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* MAIN CONTENT */}
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
        className="p-6 overflow-y-auto scrollbar-hide"
        style={{
          color: colors.textPrimary,
        }}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div
          className="space-y-6"
          style={{
            color: colors.textPrimary,
          }}
        >
            <RashifalImagesTable/>
        </div>
      </motion.main>
    </div>
  );
};

export default Rashifal;



