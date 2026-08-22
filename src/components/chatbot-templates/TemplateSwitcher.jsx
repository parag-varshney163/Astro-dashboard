// TemplateSwitcher.jsx
import React, { useState } from "react";

import FlowConversation from "./FlowConversation";
import AddTemplateModal from "./AddTemplateModal";
import TemplateContent from "./TemplateContent";
import colors from "../../constants/colors";
import FlowHeader from "./FlowHeader";
import Button from "../ui/Button";


export default function TemplateSwitcher() {
  const [active, setActive] = useState("template");
  const [templates, setTemplates] = useState([]);
  const [open, setOpen] = useState(false);
   const [flows, setFlows] = useState([]);
   const handleFlowCreated = (newFlow) => {
    setFlows((prev) => [newFlow, ...prev]);
  };

  const wrapper = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  };

  const handleTemplateUpdate = (updatedTemplate) => {
    setTemplates((prev) => {
      const exists = prev.some((t) => t.id === updatedTemplate?.id);
      if (exists) {
        return prev.map((t) =>
          t.id === updatedTemplate.id ? { ...t, ...updatedTemplate } : t
        );
      } else if (Array.isArray(updatedTemplate)) {
        // when updating with fetched templates array
        return updatedTemplate;
      } else {
        return [updatedTemplate, ...prev];
      }
    });
  };
  const handleTemplateDelete = (id) => {
  setTemplates((prev) => prev.filter((t) => t.id !== id));
};


  return (
    <>
      {/* TOP SWITCHER BAR */}
      <div style={wrapper}>
        {/* LEFT SIDE SWITCHER */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            size="md"
            variant="custom"
            bg={active === "template" ? colors.accent : colors.cardBg}
            text={active === "template" ? "#000" : colors.textSecondary}
            style={{
              border: `1px solid ${
                active === "template" ? colors.accent : colors.cardBorder
              }`,
              borderRadius: "30px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
            onClick={() => setActive("template")}
          >
            Template
          </Button>

          <Button
            size="md"
            variant="custom"
            bg={active === "flow" ? colors.accent : colors.cardBg}
            text={active === "flow" ? "#000" : colors.textSecondary}
            style={{
              border: `1px solid ${
                active === "flow" ? colors.accent : colors.cardBorder
              }`,
              borderRadius: "30px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
            onClick={() => setActive("flow")}
          >
            Conversation Flow
          </Button>
        </div>

        {/* RIGHT BUTTON */}
        <Button
          variant="primary"
          size="md"
          style={{ borderRadius: "30px" }}
          onClick={() => setOpen(true)}
        >
          Add Template
        </Button>
      </div>

      {/* CONTENT BELOW */}
      <div>
        {active === "template" && (
          <TemplateContent
            templates={templates}
            onTemplateUpdate={handleTemplateUpdate}
            onTemplateDelete={handleTemplateDelete}
          />
        )}

        {active === "flow" && (
          <>
            <FlowHeader onFlowCreated={handleFlowCreated} />
            <FlowConversation flows={flows} setFlows={setFlows} />
          </>
        )}
      </div>

      {open && (
        <AddTemplateModal
          onClose={() => setOpen(false)}
          onSuccess={handleTemplateUpdate}
        />
      )}
    </>
  );
}
