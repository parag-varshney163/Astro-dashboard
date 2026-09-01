// // TemplateContent.jsx
// import React, { useEffect, useState } from "react";
// import TemplateSearchHeader from "./TemplateSearchHeader";
// import DashboardLoader from "../ui/DashboardLoader";
// import axiosInstance from "../../api/axiosInstance";
// import TemplateGrid from "./TemplateGrid";
// const TemplateContent = ({ templates = [], onTemplateUpdate,onTemplateDelete }) => {
//   const [active, setActive] = useState("grid");
//   const [keyword, setKeyword] = useState("");
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const fetchTemplates = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/api/v1/chatbot-template/search", {
//         params: {
//           page: 1,
//           limit: 16,
//           keyword: keyword || undefined,
//           category: category || undefined,
//         },
//       });
//       if (res.data?.success) {
//         const mappedTemplates = res.data.data.results.map((item) => ({
//           id: item._id,
//           title: item.category,
//           keywords: item.keywords,
//           subTopic: item.subTopic,
//           response: item.botResponse,
//           updated: new Date(item.updatedAt).toISOString().split("T")[0],
//           status: item.status,
//         }));
//         onTemplateUpdate(mappedTemplates);
//       }
//     } catch (error) {
//       console.error("Failed to fetch templates", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Auto-fetch on search / filter change
//   useEffect(() => {
//     fetchTemplates();
//   }, [keyword, category]);
//   return (
//     <div>
//       <TemplateSearchHeader
//         onViewChange={setActive}
//         onSearch={setKeyword}
//         onCategoryChange={setCategory}
//       />
//       {loading ? (
//         // <div style={{ marginTop: 30 }}>Loading templates...</div>
//         <DashboardLoader/>
//       ) : (
//         <TemplateGrid
//           templates={templates}
//           view={active}
//           onUpdate={onTemplateUpdate}
//           onDelete={onTemplateDelete}
//         />
//       )}
//     </div>
//   );
// };
// export default TemplateContent;
import React, { useEffect, useState } from "react";

import TemplateSearchHeader from "./TemplateSearchHeader";
import DashboardLoader from "../ui/DashboardLoader";
import axiosInstance from "../../api/axiosInstance";
import TemplateGrid from "./TemplateGrid";


const TemplateContent = ({
  templates = [],
  onTemplateUpdate,
  onTemplateDelete,
}) => {
  const [active, setActive] = useState("grid");

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTemplates, setTotalTemplates] = useState(0);

  const limit = 16;

  const fetchTemplates = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const params = {
        page: pageNumber,
        limit,
      };

      // Only send keyword if available
      if (keyword.trim()) {
        params.keyword = keyword.trim();
      }

      // Only send category if available
      if (category) {
        params.category = category;
      }

      const res = await axiosInstance.get(
        "/api/v1/chatbot-template/search",
        {
          params,
        }
      );

      if (res.data?.success) {
        const result = res.data.data;

        const mappedTemplates = (result?.results || []).map(
          (item) => ({
            id: item._id,
            title: item.category,
            keywords: item.keywords,
            subTopic: item.subTopic,
            response: item.botResponse,
            updated: item.updatedAt
              ? new Date(item.updatedAt)
                  .toISOString()
                  .split("T")[0]
              : "-",
            status: item.status,

            // Keep original data also
            ...item,
          })
        );

        // Update templates in parent
        onTemplateUpdate(mappedTemplates);

        // Update pagination
        setPage(result?.pagination?.page || pageNumber);
        setTotalPages(
          result?.pagination?.totalPages || 1
        );
        setTotalTemplates(
          result?.pagination?.total || 0
        );
      } else {
        onTemplateUpdate([]);
        setTotalPages(1);
        setTotalTemplates(0);
      }
    } catch (error) {
      console.error(
        "Failed to fetch templates",
        error
      );

      onTemplateUpdate([]);
      setTotalPages(1);
      setTotalTemplates(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever page, keyword or category changes
  useEffect(() => {
    fetchTemplates(page);
  }, [page, keyword, category]);

  // Search
  const handleSearch = (value) => {
    setKeyword(value);

    // Always go back to first page when searching
    setPage(1);
  };

  // Category filter
  const handleCategoryChange = (value) => {
    setCategory(value);

    // Always go back to first page when filtering
    setPage(1);
  };

  // Pagination
  const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === page
    ) {
      return;
    }

    setPage(newPage);
  };

  return (
    <div>
      {/* SEARCH + FILTER */}
      <TemplateSearchHeader
        onViewChange={setActive}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />

      {/* TOTAL COUNT */}
      {!loading && (
        <div
          style={{
            marginTop: "16px",
            marginBottom: "10px",
            color: "#888",
            fontSize: "13px",
          }}
        >
          {totalTemplates > 0
            ? `Showing page ${page} of ${totalPages} • ${totalTemplates} templates`
            : "No templates found"}
        </div>
      )}

      {/* CONTENT */}
      {loading ? (
        <DashboardLoader />
      ) : (
        <TemplateGrid
          templates={templates}
          view={active}
          onUpdate={onTemplateUpdate}
          onDelete={onTemplateDelete}
        />
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "24px",
            paddingBottom: "10px",
          }}
        >
          {/* PREVIOUS */}
          <button
            type="button"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #333",
              background:
                page === 1 ? "#222" : "#111",
              color:
                page === 1 ? "#666" : "#fff",
              cursor:
                page === 1
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Previous
          </button>

          {/* PAGE NUMBERS */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() =>
                handlePageChange(pageNumber)
              }
              style={{
                minWidth: "36px",
                height: "36px",
                padding: "0 10px",
                borderRadius: "8px",
                border: `1px solid ${
                  page === pageNumber
                    ? "#D4AF37"
                    : "#333"
                }`,
                background:
                  page === pageNumber
                    ? "#D4AF37"
                    : "#111",
                color:
                  page === pageNumber
                    ? "#000"
                    : "#fff",
                fontSize: "13px",
                fontWeight:
                  page === pageNumber
                    ? 700
                    : 500,
                cursor: "pointer",
              }}
            >
              {pageNumber}
            </button>
          ))}

          {/* NEXT */}
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #333",
              background:
                page === totalPages
                  ? "#222"
                  : "#111",
              color:
                page === totalPages
                  ? "#666"
                  : "#fff",
              cursor:
                page === totalPages
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

export default TemplateContent;