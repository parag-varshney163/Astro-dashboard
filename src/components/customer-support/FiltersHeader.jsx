import React, { useState } from "react";

import AddInternalNoteModal from "./AddInternalNoteModal";
import SaveTemplateModal from "./SaveTemplateModal";
import CreateTicketModal from "./CreateTicketModal";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";


export default function FiltersHeader({ filters, setFilters }) {
  const [openModal, setOpenModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);

  /* =========================
     DATE FILTER MAP
  ========================= */
  const dateMap = {
    Today: "today",
    Yesterday: "yesterday",
    "Last 7 Days": "last7days",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "10px 0",
        flexWrap: "wrap",
      }}
    >
      {/* ================= PRIORITY FILTER ================= */}
      <FilterDropDown
        options={["High", "Medium", "Low"]}
        defaultLabel={filters.priority || "Priority"}
        onSelect={(val) =>
          setFilters((f) => ({
            ...f,
            priority: val.toLowerCase(),
          }))
        }
      />

      {/* ================= ISSUE TYPE FILTER ================= */}
      <FilterDropDown
        options={["Account", "Payment", "Technical", "Report", "Other"]}
        defaultLabel={filters.issueType || "All Types"}
        onSelect={(val) =>
          setFilters((f) => ({
            ...f,
            issueType: val.toLowerCase(),
          }))
        }
      />

      {/* ================= DATE FILTER ================= */}
      <FilterDropDown
        options={["Today", "Yesterday", "Last 7 Days"]}
        defaultLabel={filters.dateFilter || "Date"}
        onSelect={(val) =>
          setFilters((f) => ({
            ...f,
            dateFilter: dateMap[val],
          }))
        }
      />

      {/* ================= SEARCH ================= */}
      <SearchBar
        placeholder="Search tickets..."
        value={filters.search || ""}
        onChange={(value) =>
          setFilters((f) => ({
            ...f,
            search: value,
          }))
        }
        width="350px"
      />

      {/* ================= BUTTONS ================= */}
      {/* <Button
        variant="custom"
        bg={colors.cardBg}
        text="#fff"
        size="md"
        style={{ borderRadius: "10px", padding: "10px 18px" }}
        onClick={() => setOpenModal(true)}
      >
        Create Ticket
      </Button> */}

      {/* <Button
        variant="custom"
        bg={colors.cardBg}
        text="#fff"
        size="md"
        style={{ borderRadius: "10px", padding: "10px 18px" }}
        onClick={() => setTemplateModal(true)}
      >
        Templates
      </Button>

      <Button
        variant="custom"
        bg={colors.accent}
        text="#000"
        size="md"
        style={{ borderRadius: "10px", padding: "10px 22px", fontWeight: 600 }}
        onClick={() => setNoteModal(true)}
      >
        Add Note
      </Button> */}

      {/* ================= MODALS ================= */}
      <CreateTicketModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <SaveTemplateModal
        open={templateModal}
        onClose={() => setTemplateModal(false)}
      />
      <AddInternalNoteModal
        open={noteModal}
        onClose={() => setNoteModal(false)}
      />
    </div>
  );
}
