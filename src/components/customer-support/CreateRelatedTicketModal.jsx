import React, { useState } from "react";
import { X } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import Button from "../ui/Button";


export default function CreateRelatedTicketModal({
  open,
  onClose,
  ticket,
}) {
  const [issueType, setIssueType] = useState("");
  const [priority, setPriority] = useState("low");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const user = {
    name: ticket?.userId?.name || "Unknown User",
    cid: ticket?.roomId || "N/A",
  };

  const handleCreateTicket = async () => {
    if (!ticket?._id) {
      alert("Chat not found");
      return;
    }

    if (!issueType || !description) {
      alert("Please fill all required fields");
      return;
    }
    if(description.length<10){
      alert("message length should be greater than 10");
      return;
    }

    try {
      setLoading(true);

      const res=await axiosInstance.post("/api/v1/customer/create-ticket", {
        chatId: ticket._id,
        issueType,
        description,
        priority,
      });

      alert(res?.data?.message||"Ticket created successfully");
      onClose();
    } catch (error) {
      console.error("Create ticket error:", error);
      alert(error?.response?.data?.message||"Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "580px",
          background: colors.cardBg,
          border: `1px solid ${colors.accent}`,
          borderRadius: "22px",
          padding: "34px 40px",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <X size={26} color={colors.textPrimary} />
        </button>

        {/* Header */}
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 700,
            textAlign: "center",
            color: colors.textPrimary,
          }}
        >
          Create Related <span style={{ color: colors.accent }}>Ticket</span>
        </h2>

        <p
          style={{
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "22px",
            fontSize: "14px",
            color: colors.textSecondary,
          }}
        >
          Create a new ticket from the selected conversation.
        </p>

        {/* User Info */}
        <div
          style={{
            background: colors.secondary,
            borderRadius: "16px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "26px",
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: colors.accent,
            }}
          />

          <div>
            <p style={{ color: colors.textPrimary, fontWeight: 600 }}>
              {user.name}
            </p>
            <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
              {user.cid}
            </p>
          </div>
        </div>

        {/* Issue Type */}
        <label style={{ color: colors.textPrimary, fontWeight: 500 }}>
          Issue <span style={{ color: colors.accent }}>Type</span>
        </label>
        <div style={{ marginTop: "6px", marginBottom: "20px" }}>
          <FilterDropDown
            defaultLabel="Select issue type"
            options={["account", "payment", "technical", "report", "other"]}
            onSelect={setIssueType}
          />
        </div>

        {/* Priority */}
        <label style={{ color: colors.textPrimary, fontWeight: 500 }}>
          Priority
        </label>
        <div style={{ marginTop: "6px", marginBottom: "20px" }}>
          <FilterDropDown
            defaultLabel="Select priority"
            options={["High", "Medium", "Low"]}
            onSelect={(val) => setPriority(val.toLowerCase())}
          />
        </div>

        {/* Description */}
        <label style={{ color: colors.textPrimary, fontWeight: 500 }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description..."
          style={{
            marginTop: "6px",
            width: "100%",
            height: "110px",
            resize: "none",
            background: colors.inputBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: "16px",
            padding: "14px",
            color: colors.textPrimary,
            fontSize: "14px",
            outline: "none",
            marginBottom: "28px",
          }}
        />

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Button
            variant="custom"
            bg={colors.secondary}
            text={colors.textPrimary}
            size="md"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="custom"
            bg={colors.accent}
            text="#000"
            size="md"
            onClick={handleCreateTicket}
            disabled={loading}
            style={{ fontWeight: 600 }}
          >
            {loading ? "Creating..." : "Create Ticket"}
          </Button>
        </div>
      </div>
    </div>
  );
}
