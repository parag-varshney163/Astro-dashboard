// import { useState } from "react";
// import React from "react";
// import colors from "../../constants/colors";
// const DataTable = ({
//   columns,
//   data = [],
//   loading = false,
//   error = null,
//   onRowClick = null, 
//   rowStyle = {}
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
// const rowsPerPage = 25;
// const totalPages = Math.ceil(data.length / rowsPerPage);
// const paginatedData = data.slice(
//   (currentPage - 1) * rowsPerPage,
//   currentPage * rowsPerPage
// );
//   const gridTemplateColumns = columns.map((c) => c.width || "1fr").join(" ");
//   const renderSkeleton = () => (
//     <div className="flex flex-col gap-3 mt-3">
//       {Array.from({ length: 4 }).map((_, i) => (
//         <div
//           key={i}
//           style={{
//             display: "grid",
//             gridTemplateColumns,
//             columnGap: "24px",
//             padding: "16px 24px",
//             background: colors.cardBg,
//             border: `1px solid ${colors.cardBorder}`,
//             alignItems: "center",
//             borderRadius: 12,
//           }}
//         >
//           {columns.map((_, j) => (
//             <div
//               key={j}
//               style={{
//                 height: 12,
//                 borderRadius: 6,
//                 background: colors.cardBorder,
//                 width: "80%",
//               }}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
//   return (
//     <div
//       className="rounded-3xl p-6 mt-8"
//       style={{
//         background: colors.gradientVertical,
//         border: `1px solid ${colors.cardBorder}`,
//       }}
//     >
//       {/* HEADER */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns,
//           columnGap: "24px",
//           padding: "16px 24px",
//           borderBottom: `1px solid ${colors.cardBorder}`,
//           color: colors.textSecondary,
//           textTransform: "uppercase",
//           fontSize: 13,
//           fontWeight: 700,
//           textAlign: "center",
//           alignItems: "center"
//         }}
//       >
//         {columns.map((col) => (
//           <div
//             key={col.key}
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               whiteSpace: "nowrap",
//               width: "100%",
//               fontSize: "12px"
//             }}
//           >
//             {col.label}
//           </div>
//         ))}
//       </div>
//       {/* CONTENT */}
//       <div style={{ marginTop: 12, overflow: "visible" }}>
//         {loading && renderSkeleton()}
//         {!loading && error && (
//           <div style={{ padding: 24, color: colors.danger, textAlign: "center" }}>
//             ⚠️ {error}
//           </div>
//         )}
//         {!loading && !error && (
//           <div className="flex flex-col gap-3 mt-3">
//             {data.length > 0 ? (
//               paginatedData.map((row, rowIndex) => (
//                 <div
//                   key={rowIndex}
//                   onClick={() => onRowClick && onRowClick(row)}   // ✅ FIX: enable click
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns,
//                     columnGap: "24px",
//                     padding: "16px 24px",
//                     background: colors.cardBg,
//                     border: `1px solid ${colors.cardBorder}`,
//                     borderRadius: 12,
//                     alignItems: "center",
//                     cursor: onRowClick ? "pointer" : "default",  // pointer cursor
//                     transition: "background-color .15s",
//                     ...rowStyle,
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = colors.hover)
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = colors.cardBg)
//                   }
//                 >
//                   {columns.map((col) => (
//                     <div
//                       key={col.key}
//                       className={col.cellClassName || ""}
//                       style={{
//                         color: colors.textPrimary,
//                         display: "flex",
//                         justifyContent:
//                           col.align === "left"
//                             ? "flex-start"
//                             : col.align === "right"
//                               ? "flex-end"
//                               : "center",
//                          alignItems: "center",
//                         gap: 12,
//                         minWidth: 0,
//                       }}
//                     >
//                       {col.render ? (
//                         col.render(row[col.key], row, rowIndex)
//                       ) : (
//                         <span
//                           style={{
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {row[col.key] ?? "-"}
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))
//             ) : (
//               <div
//                 style={{
//                   padding: 24,
//                   color: colors.textSecondary,
//                   textAlign: "center",
//                 }}
//               >
//                 No records found
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       {data.length > rowsPerPage && (
//   <div
//     className="flex justify-end items-center gap-3 mt-6"
//     style={{ color: colors.textSecondary }}
//   >
//     <button
//       disabled={currentPage === 1}
//       onClick={() => setCurrentPage((p) => p - 1)}
//       style={{
//         padding: "6px 12px",
//         borderRadius: 8,
//         background: colors.cardBg,
//         border: `1px solid ${colors.cardBorder}`,
//         opacity: currentPage === 1 ? 0.5 : 1,
//         cursor: currentPage === 1 ? "not-allowed" : "pointer",
//       }}
//     >
//       Prev
//     </button>
//     <span>
//       Page {currentPage} of {totalPages}
//     </span>
//     <button
//       disabled={currentPage === totalPages}
//       onClick={() => setCurrentPage((p) => p + 1)}
//       style={{
//         padding: "6px 12px",
//         borderRadius: 8,
//         background: colors.cardBg,
//         border: `1px solid ${colors.cardBorder}`,
//         opacity: currentPage === totalPages ? 0.5 : 1,
//         cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//       }}
//     >
//       Next
//     </button>
//   </div>
// )}
//     </div>
//   );
// };
// export default DataTable;  
import React, { useState } from "react";

import colors from "../../constants/colors";


const DataTable = ({
  columns,
  data = [],
  loading = false,
  error = null,
  onRowClick = null,
  rowStyle = {},

  // 🔽 Pagination (optional)
  paginationMode = "client", // "client" | "server"
  page = 1,                 // used in server mode
  totalPages = 1,           // used in server mode
  onPageChange = () => { },  // used in server mode
}) => {
  // 🔹 Client-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [jumpPage, setJumpPage] = useState("");

  const isServer = paginationMode === "server";

  // 🔹 Client-side total pages
  const totalClientPages = Math.ceil(data.length / rowsPerPage);

  // 🔹 Decide what data to render
  const displayData = isServer
    ? data
    : data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

  const gridTemplateColumns = columns
    .map((c) => c.width || "1fr")
    .join(" ");

  const renderSkeleton = () => (
    <div className="flex flex-col gap-3 mt-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns,
            columnGap: "24px",
            padding: "16px 24px",
            background: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            alignItems: "center",
            borderRadius: 12,
          }}
        >
          {columns.map((_, j) => (
            <div
              key={j}
              style={{
                height: 12,
                borderRadius: 6,
                background: colors.cardBorder,
                width: "80%",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  const handleJump = (e) => {
    if (e.key === "Enter") {
      let pageNumber = Number(jumpPage);

      if (isNaN(pageNumber)) return;

      if (isServer) {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
          onPageChange(pageNumber);
        }
      } else {
        if (pageNumber >= 1 && pageNumber <= totalClientPages) {
          setCurrentPage(pageNumber);
        }
      }

      setJumpPage(""); // clear input
    }
  };

  return (
    <div
      className="rounded-3xl p-6 mt-8"
      style={{
        background: colors.gradientVertical,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns,
          columnGap: "24px",
          padding: "16px 24px",
          borderBottom: `1px solid ${colors.cardBorder}`,
          color: colors.textSecondary,
          textTransform: "uppercase",
          fontSize: 13,
          fontWeight: 700,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "nowrap",
              width: "100%",
              fontSize: "12px",
            }}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ marginTop: 12 }}>
        {loading && renderSkeleton()}

        {!loading && error && (
          <div
            style={{
              padding: 24,
              color: colors.danger,
              textAlign: "center",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-3 mt-3">
            {displayData.length > 0 ? (
              displayData.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{
                    display: "grid",
                    gridTemplateColumns,
                    columnGap: "24px",
                    padding: "16px 24px",
                    background: colors.cardBg,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: 12,
                    alignItems: "center",
                    cursor: onRowClick ? "pointer" : "default",
                    transition: "background-color .15s",
                    ...rowStyle,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = colors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = colors.cardBg)
                  }
                >
                  {columns.map((col) => (
                    <div
                      key={col.key}
                      style={{
                        color: colors.textPrimary,
                        display: "flex",
                        justifyContent:
                          col.align === "left"
                            ? "flex-start"
                            : col.align === "right"
                              ? "flex-end"
                              : "center",
                        alignItems: "center",
                        gap: 12,
                        minWidth: 0,
                      }}
                    >
                      {col.render ? (
                        col.render(row[col.key], row, rowIndex)
                      ) : (
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row[col.key] ?? "-"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: 24,
                  color: colors.textSecondary,
                  textAlign: "center",
                }}
              >
                No records found
              </div>
            )}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {(isServer ? totalPages > 1 : data.length > rowsPerPage) && (
        <div
          className="flex justify-end items-center gap-3 mt-6"
          style={{ color: colors.textSecondary }}
        >
          <input
            type="number"
            placeholder="Go to page"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={handleJump}
            style={{
              width: 150,
              padding: "6px 10px",
              borderRadius: 8,
              border: `1px solid ${colors.cardBorder}`,
              background: colors.cardBg,
              color: colors.textPrimary,
              outline: "none",
            }}
          />
          <button
            disabled={isServer ? page === 1 : currentPage === 1}
            onClick={() =>
              isServer
                ? onPageChange(page - 1)
                : setCurrentPage((p) => p - 1)
            }
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              opacity:
                (isServer ? page === 1 : currentPage === 1) ? 0.5 : 1,
              cursor:
                (isServer ? page === 1 : currentPage === 1)
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Prev
          </button>

          <span>
            Page {isServer ? page : currentPage} of{" "}
            {isServer ? totalPages : totalClientPages}
          </span>

          <button
            disabled={
              isServer
                ? page === totalPages
                : currentPage === totalClientPages
            }
            onClick={() =>
              isServer
                ? onPageChange(page + 1)
                : setCurrentPage((p) => p + 1)
            }
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              opacity:
                (isServer
                  ? page === totalPages
                  : currentPage === totalClientPages)
                  ? 0.5
                  : 1,
              cursor:
                (isServer
                  ? page === totalPages
                  : currentPage === totalClientPages)
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
