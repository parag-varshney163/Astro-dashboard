// TemplateContent.jsx
import React, { useEffect, useState } from "react";

import TemplateSearchHeader from "./TemplateSearchHeader";
import DashboardLoader from "../ui/DashboardLoader";
import axiosInstance from "../../api/axiosInstance";
import TemplateGrid from "./TemplateGrid";


const TemplateContent = ({ templates = [], onTemplateUpdate,onTemplateDelete }) => {
  const [active, setActive] = useState("grid");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/chatbot-template/search", {
        params: {
          page: 1,
          limit: 16,
          keyword: keyword || undefined,
          category: category || undefined,
        },
      });

      if (res.data?.success) {
        const mappedTemplates = res.data.data.results.map((item) => ({
          id: item._id,
          title: item.category,
          keywords: item.keywords,
          subTopic: item.subTopic,
          response: item.botResponse,
          updated: new Date(item.updatedAt).toISOString().split("T")[0],
          status: item.status,
        }));

        onTemplateUpdate(mappedTemplates);
      }
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on search / filter change
  useEffect(() => {
    fetchTemplates();
  }, [keyword, category]);

  return (
    <div>
      <TemplateSearchHeader
        onViewChange={setActive}
        onSearch={setKeyword}
        onCategoryChange={setCategory}
      />

      {loading ? (
        // <div style={{ marginTop: 30 }}>Loading templates...</div>
        <DashboardLoader/>
      ) : (
        <TemplateGrid
          templates={templates}
          view={active}
          onUpdate={onTemplateUpdate}
          onDelete={onTemplateDelete}
        />
      )}
    </div>
  );
};

export default TemplateContent;
