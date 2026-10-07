import { Menu, ChevronDown, ChevronRight, } from "lucide-react";
import { useLocation, useNavigate, } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import React, { useEffect, useRef, useState } from "react";
// import { Menu } from "lucide-react";
// import usePermissions from "../../hooks/usePermissions";
// import MENU_ITEMS from "../../constants/menu";
// import colors from "../../constants/colors";
// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const sidebarRef = useRef(null);
//   const [selected, setSelected] = useState("");
//   const { canAccess, loading } = usePermissions();
//   // Highlight active route
//   useEffect(() => {
//     const current = MENU_ITEMS.find(
//       (item) => item.path === location.pathname
//     );
//     if (current) setSelected(current.name);
//   }, [location.pathname]);
//   // ==============================
//   // CLOSE SIDEBAR ON OUTSIDE CLICK
//   // ==============================
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (
//         isOpen &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target)
//       ) {
//         toggleSidebar();
//       }
//     };
//     document.addEventListener(
//       "mousedown",
//       handleOutsideClick
//     );
//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleOutsideClick
//       );
//     };
//   }, [isOpen, toggleSidebar]);
//   const handleClick = (item) => {
//     if (item.isLogout) {
//       localStorage.clear();
//       navigate("/login");
//       return;
//     }
//     setSelected(item.name);
//     navigate(item.path);
//   };
//   return (
//     <aside
//       ref={sidebarRef}
//       className="
//         h-full fixed left-0 top-0 
//         flex flex-col justify-between
//         shadow-xl transition-all duration-300
//         hide-scrollbar
//       "
//       style={{
//         width: isOpen ? "220px" : "78px",
//         backgroundColor: colors.secondary,
//         zIndex: 50,
//         overflowY: "auto",
//       }}
//     >
//       {/* TOP SECTION */}
//       <div>
//         {/* HAMBURGER */}
//         <div
//           onClick={toggleSidebar}
//           className="
//             flex items-center cursor-pointer
//             transition-all p-4 pl-6
//           "
//           style={{
//             color: colors.textSecondary,
//             backgroundColor: colors.hover,
//           }}
//         >
//           <Menu size={22} />
//           {
//             isOpen &&
//             <span className="ml-3 text-sm">
//               Menu
//             </span>
//           }
//         </div>
//         {/* MENU */}
//         {
//           loading ? (
//             <div
//               className="
//                 text-center mt-20
//                 text-gray-400 text-sm
//               "
//             >
//               Loading permissions...
//             </div>
//           ) : (
//             <nav className="mt-4 flex flex-col">
//               {
//                 MENU_ITEMS.map((item, idx) => {
//                   if (
//                     !item.isLogout &&
//                     item.permission
//                   ) {
//                     if (
//                       !canAccess(
//                         item.permission.section,
//                         item.permission.key
//                       )
//                     ) {
//                       return null;
//                     }
//                   }
//                   const Icon = item.icon;
//                   const active =
//                     selected === item.name;
//                   return (
//                     <div
//                       key={idx}
//                       onClick={() =>
//                         handleClick(item)
//                       }
//                       className="
//                         flex items-center gap-4
//                         cursor-pointer rounded-md
//                         transition-all select-none
//                       "
//                       style={{
//                         padding:"12px 18px",
//                         margin:"2px 6px",
//                         backgroundColor:
//                           active
//                           ? colors.hover
//                           : "transparent",
//                         color:
//                           item.isLogout
//                           ? colors.danger
//                           :
//                           active
//                           ? colors.accent
//                           :
//                           colors.textSecondary,
//                       }}
//                       onMouseEnter={(e)=>
//                         e.currentTarget.style.backgroundColor =
//                           colors.hover
//                       }
//                       onMouseLeave={(e)=>
//                         e.currentTarget.style.backgroundColor =
//                           active
//                           ? colors.hover
//                           : "transparent"
//                       }
//                     >
//                       <Icon size={20}/>
//                       {
//                         isOpen &&
//                         <span className="text-sm">
//                           {item.name}
//                         </span>
//                       }
//                     </div>
//                   );
//                 })
//               }
//             </nav>
//           )
//         }
//       </div>
//       {/* FOOTER */}
//       <div className="mb-4 text-center">
//         {
//           isOpen &&
//           (
//             <p
//               className="text-xs text-gray-500"
//             >
//               © 2025{" "}
//               <span
//                 style={{
//                   color: colors.accent
//                 }}
//               >
//                 Agami Astro
//               </span>
//             </p>
//           )
//         }
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;
import React, { useEffect, useRef, useState } from "react";

import usePermissions from "../../hooks/usePermissions";
import MENU_ITEMS from "../../constants/menu";
import colors from "../../constants/colors";


const Sidebar = ({
  isOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarRef = useRef(null);

  const [selected, setSelected] = useState("");

  const [openSections, setOpenSections] = useState({});

  const { canAccess, loading } = usePermissions();

  // =========================================
  // FIND CURRENT ACTIVE MENU + OPEN ITS GROUP
  // =========================================

  useEffect(() => {
    MENU_ITEMS.forEach((section) => {
      // Normal item like Logout
      if (
        section.path &&
        section.path === location.pathname
      ) {
        setSelected(section.name);
      }

      // Group children
      if (section.children) {
        const currentChild = section.children.find(
          (child) =>
            child.path === location.pathname
        );

        if (currentChild) {
          setSelected(currentChild.name);

          setOpenSections((prev) => ({
            ...prev,
            [section.name]: true,
          }));
        }
      }
    });
  }, [location.pathname]);

  // =========================================
  // CLOSE SIDEBAR ON OUTSIDE CLICK
  // =========================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [isOpen, toggleSidebar]);

  // =========================================
  // CHECK PERMISSION
  // =========================================

  const hasPermission = (item) => {
    if (!item.permission) return true;

    return canAccess(
      item.permission.section,
      item.permission.key
    );
  };

  // =========================================
  // CHECK IF GROUP HAS ACCESSIBLE CHILDREN
  // =========================================

  const getVisibleChildren = (children = []) => {
    return children.filter((child) =>
      hasPermission(child)
    );
  };

  // =========================================
  // SUB MENU CLICK
  // =========================================

  const handleItemClick = (item) => {
    if (item.isLogout) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    setSelected(item.name);

    navigate(item.path);
  };

  // =========================================
  // SECTION CLICK
  // =========================================

  const handleSectionClick = (sectionName) => {
    // If sidebar is collapsed,
    // first open complete sidebar
    if (!isOpen) {
      toggleSidebar();

      setOpenSections((prev) => ({
        ...prev,
        [sectionName]: true,
      }));

      return;
    }

    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  return (
    <aside
      ref={sidebarRef}
      className="
        h-full
        fixed
        left-0
        top-0
        flex
        flex-col
        justify-between
        shadow-xl
        transition-all
        duration-300
        hide-scrollbar
      "
      style={{
        width: isOpen ? "230px" : "78px",
        backgroundColor: colors.secondary,
        zIndex: 50,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* ====================== */}
      {/* TOP */}
      {/* ====================== */}

      <div>
        {/* HAMBURGER */}

        <div
          onClick={toggleSidebar}
          className="
            flex
            items-center
            cursor-pointer
            transition-all
            p-4
            pl-6
          "
          style={{
            color: colors.textSecondary,
            backgroundColor: colors.hover,
          }}
        >
          <Menu size={22} />

          {isOpen && (
            <span className="ml-3 text-sm">
              Menu
            </span>
          )}
        </div>

        {/* ====================== */}
        {/* MENU */}
        {/* ====================== */}

        {loading ? (
          <div
            className="
              text-center
              mt-20
              text-gray-400
              text-sm
            "
          >
            {isOpen ? "Loading permissions..." : "..."}
          </div>
        ) : (
          <nav className="mt-3 flex flex-col pb-5">
            {MENU_ITEMS.map((section) => {
              // ====================================
              // GROUP ITEM
              // ====================================

              if (section.children) {
                const visibleChildren =
                  getVisibleChildren(
                    section.children
                  );

                // Hide complete section if
                // user cannot access any child
                if (visibleChildren.length === 0) {
                  return null;
                }

                const SectionIcon = section.icon;

                const isExpanded =
                  openSections[section.name];

                const isGroupActive =
                  visibleChildren.some(
                    (child) =>
                      child.path ===
                      location.pathname
                  );

                return (
                  <div key={section.name}>
                    {/* ================= */}
                    {/* SECTION HEADER */}
                    {/* ================= */}

                    <div
                      onClick={() =>
                        handleSectionClick(
                          section.name
                        )
                      }
                      className="
                        flex
                        items-center
                        justify-between
                        cursor-pointer
                        rounded-md
                        transition-all
                        select-none
                      "
                      style={{
                        padding: "12px 18px",
                        margin: "2px 6px",

                        backgroundColor:
                          isGroupActive
                            ? colors.hover
                            : "transparent",

                        color: isGroupActive
                          ? colors.accent
                          : colors.textSecondary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          colors.hover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          isGroupActive
                            ? colors.hover
                            : "transparent";
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <SectionIcon
                          size={20}
                          className="shrink-0"
                        />

                        {isOpen && (
                          <span className="text-sm whitespace-nowrap">
                            {section.name}
                          </span>
                        )}
                      </div>

                      {isOpen && (
                        <div>
                          {isExpanded ? (
                            <ChevronDown
                              size={16}
                            />
                          ) : (
                            <ChevronRight
                              size={16}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* ================= */}
                    {/* SUB MENU */}
                    {/* ================= */}

                    {isOpen && isExpanded && (
                      <div
                        className="
                          ml-4
                          mr-2
                          border-l
                        "
                        style={{
                          borderColor:
                            colors.hover,
                        }}
                      >
                        {visibleChildren.map(
                          (item) => {
                            const Icon = item.icon;

                            const active =
                              location.pathname ===
                                item.path ||
                              selected ===
                                item.name;

                            return (
                              <div
                                key={item.name}
                                onClick={() =>
                                  handleItemClick(
                                    item
                                  )
                                }
                                className="
                                  flex
                                  items-center
                                  gap-3
                                  cursor-pointer
                                  rounded-md
                                  transition-all
                                  select-none
                                "
                                style={{
                                  padding:
                                    "10px 12px",

                                  margin:
                                    "2px 4px 2px 8px",

                                  backgroundColor:
                                    active
                                      ? colors.hover
                                      : "transparent",

                                  color: active
                                    ? colors.accent
                                    : colors.textSecondary,
                                }}
                                onMouseEnter={(
                                  e
                                ) => {
                                  e.currentTarget.style.backgroundColor =
                                    colors.hover;
                                }}
                                onMouseLeave={(
                                  e
                                ) => {
                                  e.currentTarget.style.backgroundColor =
                                    active
                                      ? colors.hover
                                      : "transparent";
                                }}
                              >
                                <Icon
                                  size={17}
                                  className="shrink-0"
                                />

                                <span className="text-xs">
                                  {item.name}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              // ====================================
              // NORMAL ITEM (LOGOUT)
              // ====================================

              if (!hasPermission(section)) {
                return null;
              }

              const Icon = section.icon;

              const active =
                selected === section.name;

              return (
                <div
                  key={section.name}
                  onClick={() =>
                    handleItemClick(section)
                  }
                  className="
                    flex
                    items-center
                    gap-4
                    cursor-pointer
                    rounded-md
                    transition-all
                    select-none
                  "
                  style={{
                    padding: "12px 18px",
                    margin: "2px 6px",

                    backgroundColor: active
                      ? colors.hover
                      : "transparent",

                    color: section.isLogout
                      ? colors.danger
                      : active
                      ? colors.accent
                      : colors.textSecondary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      active
                        ? colors.hover
                        : "transparent";
                  }}
                >
                  <Icon
                    size={20}
                    className="shrink-0"
                  />

                  {isOpen && (
                    <span className="text-sm">
                      {section.name}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* ====================== */}
      {/* FOOTER */}
      {/* ====================== */}

      <div className="mb-4 text-center">
        {isOpen && (
          <p className="text-xs text-gray-500">
            © 2026{" "}
            <span
              style={{
                color: colors.accent,
              }}
            >
              Agami Astro
            </span>
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;