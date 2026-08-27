// import { useNavigate, useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { Menu } from "lucide-react";
// import usePermissions from "../../hooks/usePermissions";
// import MENU_ITEMS from "../../constants/menu";
// import colors from "../../constants/colors";
// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selected, setSelected] = useState("");
//   const { canAccess, loading } = usePermissions();
//   // Highlight active route
//   useEffect(() => {
//     const current = MENU_ITEMS.find(
//       (item) => item.path === location.pathname
//     );
//     if (current) setSelected(current.name);
//   }, [location.pathname]);
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
//       className="h-full fixed left-0 top-0 flex flex-col justify-between shadow-xl transition-all duration-300 hide-scrollbar"
//       style={{
//         width: isOpen ? "250px" : "78px",
//         backgroundColor: colors.secondary,
//         zIndex: 50,
//         overflowY:"auto"
//       }}
//     >
//       {/* TOP SECTION */}
//       <div>
//         {/* HAMBURGER */}
//         <div
//           onClick={toggleSidebar}
//           className="flex items-center cursor-pointer transition-all p-4 pl-6"
//           style={{
//             color: colors.textSecondary,
//             backgroundColor: colors.hover,
//           }}
//         >
//           <Menu size={22} />
//           {isOpen && <span className="ml-3 text-sm">Menu</span>}
//         </div>
//         {/* LOADING STATE */}
//         {loading ? (
//           <div className="text-center mt-20 text-gray-400 text-sm">
//             Loading permissions...
//           </div>
//         ) : (
//           <nav className="mt-4 flex flex-col">
//             {MENU_ITEMS.map((item, idx) => {
//               // Permission-based visibility
//               if (!item.isLogout && item.permission) {
//                 if (!canAccess(item.permission.section, item.permission.key)) {
//                   return null;
//                 }
//               }
//               const Icon = item.icon;
//               const active = selected === item.name;
//               return (
//                 <div
//                   key={idx}
//                   onClick={() => handleClick(item)}
//                   className="flex items-center gap-4 cursor-pointer rounded-md transition-all select-none"
//                   style={{
//                     padding: "12px 18px",
//                     margin: "2px 6px",
//                     backgroundColor: active ? colors.hover : "transparent",
//                     color: item.isLogout
//                       ? colors.danger
//                       : active
//                       ? colors.accent
//                       : colors.textSecondary,
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.backgroundColor = colors.hover)
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.backgroundColor = active
//                       ? colors.hover
//                       : "transparent")
//                   }
//                 >
//                   <Icon size={20} />
//                   {isOpen && <span className="text-sm">{item.name}</span>}
//                 </div>
//               );
//             })}
//           </nav>
//         )}
//       </div>
//       {/* FOOTER */}
//       <div className="mb-4 text-center">
//         {isOpen && (
//           <p className="text-xs text-gray-500">
//             © 2025 <span style={{ color: colors.accent }}>ChatSpark</span>
//           </p>
//         )}
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import usePermissions from "../../hooks/usePermissions";
import MENU_ITEMS from "../../constants/menu";
import colors from "../../constants/colors";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarRef = useRef(null);

  const [selected, setSelected] = useState("");
  const { canAccess, loading } = usePermissions();


  // Highlight active route
  useEffect(() => {
    const current = MENU_ITEMS.find(
      (item) => item.path === location.pathname
    );

    if (current) setSelected(current.name);
  }, [location.pathname]);


  // ==============================
  // CLOSE SIDEBAR ON OUTSIDE CLICK
  // ==============================
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
      ref={sidebarRef}
      className="
        h-full fixed left-0 top-0 
        flex flex-col justify-between
        shadow-xl transition-all duration-300
        hide-scrollbar
      "
      style={{
        width: isOpen ? "220px" : "70px",
        backgroundColor: colors.secondary,
        zIndex: 50,
        overflowY: "auto",
      }}
    >


      {/* TOP SECTION */}

      <div>

        {/* HAMBURGER */}

        <div
          onClick={toggleSidebar}
          className="
            flex items-center cursor-pointer
            transition-all p-4 pl-6
          "
          style={{
            color: colors.textSecondary,
            backgroundColor: colors.hover,
          }}
        >

          <Menu size={22} />

          {
            isOpen &&
            <span className="ml-3 text-sm">
              Menu
            </span>
          }

        </div>



        {/* MENU */}

        {
          loading ? (

            <div
              className="
                text-center mt-20
                text-gray-400 text-sm
              "
            >
              Loading permissions...
            </div>

          ) : (

            <nav className="mt-4 flex flex-col">

              {
                MENU_ITEMS.map((item, idx) => {


                  if (
                    !item.isLogout &&
                    item.permission
                  ) {

                    if (
                      !canAccess(
                        item.permission.section,
                        item.permission.key
                      )
                    ) {
                      return null;
                    }

                  }



                  const Icon = item.icon;

                  const active =
                    selected === item.name;



                  return (

                    <div
                      key={idx}
                      onClick={() =>
                        handleClick(item)
                      }
                      className="
                        flex items-center gap-4
                        cursor-pointer rounded-md
                        transition-all select-none
                      "
                      style={{
                        padding:"12px 18px",
                        margin:"2px 6px",

                        backgroundColor:
                          active
                          ? colors.hover
                          : "transparent",

                        color:
                          item.isLogout
                          ? colors.danger
                          :
                          active
                          ? colors.accent
                          :
                          colors.textSecondary,
                      }}


                      onMouseEnter={(e)=>
                        e.currentTarget.style.backgroundColor =
                          colors.hover
                      }


                      onMouseLeave={(e)=>
                        e.currentTarget.style.backgroundColor =
                          active
                          ? colors.hover
                          : "transparent"
                      }

                    >

                      <Icon size={20}/>


                      {
                        isOpen &&
                        <span className="text-sm">
                          {item.name}
                        </span>
                      }


                    </div>

                  );


                })
              }

            </nav>

          )
        }


      </div>



      {/* FOOTER */}

      <div className="mb-4 text-center">

        {
          isOpen &&
          (
            <p
              className="text-xs text-gray-500"
            >
              © 2025{" "}
              <span
                style={{
                  color: colors.accent
                }}
              >
                Agami Astro
              </span>
            </p>
          )
        }

      </div>


    </aside>

  );

};


export default Sidebar;