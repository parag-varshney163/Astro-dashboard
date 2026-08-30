import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import NotificationCard from "./NotificationCard";
import colors from "../../constants/colors";
import { toast } from "sonner";

const NotificationTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📡 Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/v1/notifications/template");

        setTemplates(res.data?.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // 📋 Copy handler
  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        className="w-max p-8 rounded-3xl border border-white/5"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white">
            Notification <span style={{ color: colors.accent }}>Templates</span>
          </h3>
          <p className="text-lg mt-1" style={{ color: colors.accent }}>
            Predefined templates with placeholders
          </p>
        </div>

        {/* 🔄 LOADING */}
        {loading && (
          <div className="w-full text-center py-10">
            <p className="text-sm font-semibold text-gray-400 animate-pulse">
              Loading templates...
            </p>
          </div>
        )}

        {/* 📭 EMPTY STATE */}
        {!loading && templates.length === 0 && (
          <div className="w-full text-center py-10">
            <p className="text-sm text-gray-500">No templates available</p>
          </div>
        )}

        {/* 📦 DATA */}
        {!loading && templates.length > 0 && (
          <div className="flex flex-row gap-4 flex-wrap">
            {templates.map((item) => (
              <NotificationCard
                key={item._id}
                type="template"
                title={item.title}
                subtitle={item.type}
                description={item.description}
                tags={["All Users", ...(item.languages || [])]}
                footerText={`Created: ${new Date(
                  item.createdAt,
                ).toLocaleDateString()}`}
                onCopy={() => handleCopy(item.description)}
                onEdit={() => console.log("Edit", item._id)}
                onDelete={() => console.log("Delete", item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationTemplates;
