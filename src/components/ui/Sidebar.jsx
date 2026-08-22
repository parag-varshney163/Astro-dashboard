import { useNavigate, useLocation } from "react-router-dom";
// import { Menu, Shield, Zap, Calendar, Flag, Star, Award, MessageSquare, Trash2, Users2, BarChart3, Settings, LogOut, Bot, } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import colors from "../../constants/colors";
// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selected, setSelected] = useState("");
//   const menuItems = [
//     { name: "Reported Calls", icon: Shield, path: "/reported-calls" },
//     { name: "Moderation Panel", icon: Zap, path: "/moderation-panel" },
//     { name: "Activity Log", icon: Calendar, path: "/activity-log" },
//     { name: "Flagged", icon: Flag, path: "/flagged" },
//     { name: "Quality Review", icon: Star, path: "/quality-review" },
//     { name: "Creator Scores", icon: Award, path: "/creator-scores" },
//     { name: "Customer Support", icon: MessageSquare, path: "/customer-support" },
//     { name: "ChatBot Templates", icon:Bot ,path: "/chatbot-templates"},
//     { name: "Account Management", icon: Trash2, path: "/account-management" },
//     // { name: "Admin Control", icon: Users2, path: "/admin-control" },
//     { name: "Insights & Metrics", icon: BarChart3, path: "/insights-metrics" },
//   ];
//   useEffect(() => {
//     const current = menuItems.find((item) => location.pathname === item.path);
//     if (current) setSelected(current.name);
//   }, [location.pathname]);
//   const handleClick = (item) => {
//     setSelected(item.name);
//     navigate(item.path);
//   };
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };
//   return (
//     <aside
//       className="h-full fixed left-0 top-0 flex flex-col justify-between shadow-xl transition-all duration-300"
//       style={{
//         width: isOpen ? "250px" : "78px",
//         backgroundColor: colors.secondary,
//       }}
//     >
//       {/* TOP SECTION */}
//       <div>
//         {/* HAMBURGER */}
//         <div
//           onClick={toggleSidebar}
//           className="flex items-center cursor-pointer transition-all p-4 pl-5.5"
//           style={{
//             color: colors.textSecondary,
//             backgroundColor: colors.hover,
//           }}
//         >
//           <Menu size={22} />
//           {isOpen && <span className="ml-3 text-sm">Menu</span>}
//         </div>
//         {/* MENU ITEMS */}
//         <nav className="mt-4 flex flex-col">
//           {menuItems.map((item, idx) => {
//             const Icon = item.icon;
//             const active = selected === item.name;
//             return (
//               <div
//                 key={idx}
//                 onClick={() => handleClick(item)}
//                 className="flex items-center gap-4 cursor-pointer rounded-md transition-all select-none"
//                 style={{
//                   padding: "12px 18px",
//                   margin: "2px 6px",
//                   backgroundColor: active ? colors.hover : "transparent",
//                   color: active ? colors.accent : colors.textSecondary,
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = colors.hover)
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = active
//                     ? colors.hover
//                     : "transparent")
//                 }
//               >
//                 <Icon size={20} />
//                 {isOpen && <span className="text-sm">{item.name}</span>}
//               </div>
//             );
//           })}
//         </nav>
//       </div>
//       {/* BOTTOM SECTION (SETTINGS + LOGOUT) */}
//       <div className="mb-4">
//         {/* SETTINGS */}
//         {/* <div
//           className="flex items-center gap-4 cursor-pointer transition-all rounded-md select-none"
//           style={{
//             padding: "12px 16px",
//             margin: "0 6px",
//             color: colors.textSecondary,
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = colors.hover)
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = "transparent")
//           }
//         >
//           <Settings size={20} />
//           {isOpen && <span className="text-sm">Settings</span>}
//         </div> */}
//         {/* LOGOUT */}
//         <div
//           onClick={handleLogout}
//           className="flex items-center gap-4 cursor-pointer transition-all rounded-md select-none mt-2"
//           style={{
//             padding: "12px 16px",
//             margin: "0 6px",
//             color: colors.danger,
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = colors.hover)
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = "transparent")
//           }
//         >
//           <LogOut size={20} />
//           {isOpen && <span className="text-sm">Logout</span>}
//         </div>
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import usePermissions from "../../hooks/usePermissions";
import MENU_ITEMS from "../../constants/menu";
import colors from "../../constants/colors";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const { canAccess, loading } = usePermissions();

  // Highlight active route
  useEffect(() => {
    const current = MENU_ITEMS.find(
      (item) => item.path === location.pathname
    );
    if (current) setSelected(current.name);
  }, [location.pathname]);

  const handleClick = (item) => {
    if (item.isLogout) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    setSelected(item.name);
    navigate(item.path);
  };

  return (
    <aside
      className="h-full fixed left-0 top-0 flex flex-col justify-between shadow-xl transition-all duration-300 hide-scrollbar"
      style={{
        width: isOpen ? "250px" : "78px",
        backgroundColor: colors.secondary,
        zIndex: 50,
        overflowY:"auto"
      }}
    >
      {/* TOP SECTION */}
      <div>
        {/* HAMBURGER */}
        <div
          onClick={toggleSidebar}
          className="flex items-center cursor-pointer transition-all p-4 pl-6"
          style={{
            color: colors.textSecondary,
            backgroundColor: colors.hover,
          }}
        >
          <Menu size={22} />
          {isOpen && <span className="ml-3 text-sm">Menu</span>}
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center mt-20 text-gray-400 text-sm">
            Loading permissions...
          </div>
        ) : (
          <nav className="mt-4 flex flex-col">
            {MENU_ITEMS.map((item, idx) => {
              // Permission-based visibility
              if (!item.isLogout && item.permission) {
                if (!canAccess(item.permission.section, item.permission.key)) {
                  return null;
                }
              }

              const Icon = item.icon;
              const active = selected === item.name;

              return (
                <div
                  key={idx}
                  onClick={() => handleClick(item)}
                  className="flex items-center gap-4 cursor-pointer rounded-md transition-all select-none"
                  style={{
                    padding: "12px 18px",
                    margin: "2px 6px",
                    backgroundColor: active ? colors.hover : "transparent",
                    color: item.isLogout
                      ? colors.danger
                      : active
                      ? colors.accent
                      : colors.textSecondary,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = active
                      ? colors.hover
                      : "transparent")
                  }
                >
                  <Icon size={20} />
                  {isOpen && <span className="text-sm">{item.name}</span>}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* FOOTER */}
      <div className="mb-4 text-center">
        {isOpen && (
          <p className="text-xs text-gray-500">
            © 2025 <span style={{ color: colors.accent }}>ChatSpark</span>
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

