// TemplateGrid.jsx
import React from "react";

import TemplateCard from "./TemplateCard";


export default function TemplateGrid({ templates = [], view = "grid",onUpdate,onDelete }) {
  if (!templates.length) {
    return (
      <div
        style={{
          marginTop: 40,
          textAlign: "center",
          color: "#888",
        }}
      >
        No templates found
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",

        // ⭐ Responsive Grid — adjusts automatically
        gridTemplateColumns:
          view === "grid"
            ? "repeat(4, minmax(0, 1fr))"
            : "1fr",

        width: "100%",
        gap: "40px 20px",
        marginTop: "30px",
        marginLeft: "10px",
      }}
    >
      {templates.map((t) => (
        <TemplateCard key={t.id || t._id} template={t} view={view} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
