// src/pages/TicketConsole.jsx
import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";

import CreateRelatedTicketModal from "./CreateRelatedTicketModal";
import TransferTicketModal from "./TransferTicketModal";
import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import { AddNoteModal } from "./AddNoteModal";
import colors from "../../constants/colors";
import { TicketCard } from "./TicketCard";
import SmartReply from "./SmartReply";


export default function ResolvedByChatBot() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [smartReply, setSmartReply] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [transferTicketModal, setTransferTicketModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [previousTickets, setPreviousTickets] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [previousTicketsLoading, setPreviousTicketsLoading] = useState(false);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);



  /* ================= FETCH TICKETS ================= */
  const handleSaveNote = async () => {
    if (!noteText.trim()) {
      alert("Note cannot be empty");
      return;
    }

    try {
      const res = await axiosInstance.patch(
        "/api/v1/customer/chat/note",
        {
          id: selectedTicket._id,
          note: noteText,
        }
      );

      alert(res?.data?.message || "Note added successfully 📝");
      setNoteText("");
      setAddNoteModal(false);
    } catch (err) {
      alert(
        err?.response?.data?.message || "Failed to add note ❌"
      );
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/v1/customer/chats?filter=resolved&page=${page}&limit=${limit}`
      );

      setTickets(res.data.data.data || []);

      // adjust this depending on your backend response structure
      setTotalPages(res.data.data.pagination?.totalPages || 1);

      if (res.data.data?.length > 0) {
        setSelectedTicketId(res.data.data[0]._id);
      }
    } catch (err) {
      console.error("Error fetching tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page]);


  const selectedTicket = tickets.find(t => t._id === selectedTicketId);

  /* ================= FETCH USER + PREVIOUS ================= */
  useEffect(() => {
    if (!selectedTicket?.userId?._id) {
      setUserDetails(null);
      setPreviousTickets([]);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        setUserLoading(true);
        const res = await axiosInstance.get(
          `/api/v1/customer/users/${selectedTicket.userId._id}/account-stats`
        );
        setUserDetails(res.data.data);
      } catch (err) {
        console.error("Error fetching user stats", err);
      } finally {
        setUserLoading(false);
      }
    };

    const fetchPreviousTickets = async () => {
      try {
        setPreviousTicketsLoading(true);
        const res = await axiosInstance.get(
          `/api/v1/customer/tickets/latest/${selectedTicket.userId._id}`
        );
        setPreviousTickets(res.data.data || []);
      } catch (err) {
        console.error("Error fetching previous tickets", err);
      } finally {
        setPreviousTicketsLoading(false);
      }
    };
    const userId = selectedTicket?.userId?._id;

    fetchUserDetails();
    fetchPreviousTickets();
    fetchLastTransactions(userId);
  }, [selectedTicketId, tickets]);
  const fetchLastTransactions = async (userId) => {
    if (!userId) return;

    try {
      const res = await axiosInstance.get(
        `/api/v1/customer/last3Transactions/${userId}`
      );

      setLastTransactions(res.data.data?.lastTransactions || []);
    } catch (err) {
      console.error("Error fetching transactions", err);
      setLastTransactions([]);
    }
  };

  const handleFilterSelection = async (value) => {
    if (!selectedTicket?._id) {
      alert("Please select a ticket first");
      return;
    }

    // ✅ APPROVE QC
    if (value === "Approve Qc") {
      const confirmed = window.confirm(
        "Are you sure you want to approve QC and mark this chat as resolved?"
      );

      if (!confirmed) return;

      try {
        const res = await axiosInstance.patch(
          "/api/v1/customer/chat/approve-qc",
          { id: selectedTicket._id }
        );

        alert(res?.data?.message || "QC approved successfully ✅");
        fetchTickets();
        setSelectedTicketId(null);
      } catch (err) {
        alert(
          err?.response?.data?.message || "Failed to approve QC ❌"
        );
      }
      return;
    }

    // 📝 ADD NOTE
    if (value === "Add Note") {
      setAddNoteModal(true);
      return;
    }
    // ---------- MANUAL TAKEOVER ----------
    if (value === "Manual Takeover") {
      const confirmAction = window.confirm(
        "Are you sure you want to take manual control of this chat?"
      );

      if (!confirmAction) return;

      try {
        const res = await axiosInstance.patch(
          `/api/v1/customer/chat/manual-takeover`,
          { id: selectedTicket._id },
        );

        alert(res?.data?.message || "Manual takeover successful");
        fetchTickets();
      } catch (error) {
        alert(
          error?.response?.data?.message ||
          "Failed to take manual control"
        );
      }

      return;
    }

    // ---------- EXISTING ACTIONS ----------
    if (value === "Create Ticket") setOpenTicketModal(true);
    if (value === "Transfer Ticket") setTransferTicketModal(true);
    if (value === "Auto Reply") setSmartReply(true);
  };


  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: colors.gradientVertical,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "20px", flex: 1, overflow: "hidden" }}>
        {/* LEFT PANEL */}
        <div
          style={{
            width: "25%",
            background: colors.cardBg,
            borderRadius: "18px",
            border: `1px solid ${colors.cardBorder}`,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflowY: "auto"
          }}
        >
          {loading ? (
            <p style={{ color: colors.textSecondary }}>Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <p style={{ color: colors.textSecondary }}>No tickets found</p>
          ) : (
            tickets.map(ticket => (
              <TicketCard
                key={ticket._id}
                id={ticket.roomId}                 // ✅ FIX
                priority={ticket.priority}        // keep as-is
                user={ticket.userId?.name}        // ✅ FIX
                time={new Date(ticket.createdAt).toLocaleString()}
                status={ticket.status}
                isActive={selectedTicketId === ticket._id}
                onClick={() => setSelectedTicketId(ticket._id)}
              />
            ))
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Prev
            </button>

            <span style={{ color: colors.textSecondary }}>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>

        </div>

        {/* MIDDLE CHAT PANEL */}
        <div
          style={{
            flex: 1,
            background: colors.cardBg,
            borderRadius: "18px",
            border: `1px solid ${colors.cardBorder}`,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minHeight: 0,
          }}
        >
          <div style={{ width: "160px", marginLeft: "auto" }}>
            <FilterDropDown
              options={["Approve Qc", "Manual Takeover", "Add Note"]}
              defaultLabel="All Types"
              onSelect={handleFilterSelection}
            />
          </div>

          <div
            style={{
              flex: 1,
              background: colors.inputBg,
              borderRadius: "14px",
              border: `1px solid ${colors.cardBorder}`,
              padding: "20px",
              overflowY: "auto",
              minHeight: 0,
            }}
          >
            {selectedTicket?.messages?.length > 0 ? (    // ✅ FIX
              // selectedTicket.messages.map((msg, idx) => (
              //   <ChatBubble
              //     key={idx}
              //     text={msg.message}
              //     type={msg.sender === "user" ? "user" : "agent"}
              //   />
              // ))
              selectedTicket.messages.map((msg) => (
                <ChatBubble
                  key={msg._id}
                  message={msg}
                />
              ))
            ) : (
              <p style={{ color: colors.textSecondary }}>No chat available</p>
            )}
          </div>

          {/* Auto Resolved Banner (UNCHANGED) */}
          <div
            style={{
              background: colors.gradientVertical,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 16,
              padding: "16px 24px",
              textAlign: "center",
              color: colors.textPrimary,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <Bot size={32} style={{ color: colors.accent }} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
              Auto-Resolved by <span style={{ color: colors.accent }}>ChatBot</span>
            </h3>
            <p style={{ fontSize: 13, color: colors.textSecondary }}>
              Review accuracy and approve or take manual control
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            width: "25%",
            background: colors.cardBg,
            borderRadius: "18px",
            border: `1px solid ${colors.cardBorder}`,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",


          }}
        >
          {userLoading ? (
            <p style={{ color: colors.textSecondary, textAlign: "center" }}>
              Loading user details...
            </p>
          ) : (
            <>
              <UserHeader user={userDetails} />
              <UserStats user={userDetails} />
            </>
          )}

          <div className="mt-6">
            <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
              Previous <span style={{ color: colors.accent }}>Tickets</span>
            </p>

            <div style={{ marginTop: "10px" }}>
              {previousTicketsLoading ? (
                <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
                  Loading previous tickets...
                </p>
              ) : previousTickets.length > 0 ? (
                previousTickets.map((ticket, index) => (
                  <TicketCard
                    key={index}
                    id={ticket.ticketNumber}
                    priority={ticket.priority}
                    time={new Date(ticket.createdAt).toLocaleString()}
                    status={ticket.status}
                    user={selectedTicket?.userId?.name}   // ✅ FIX
                  />
                ))
              ) : (
                <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
                  No previous tickets found
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
              Last 3 <span style={{ color: colors.accent }}>Transactions</span>
            </p>

            <div style={{ marginTop: "10px" }}>
              {lastTransactions.length > 0 ? (
                lastTransactions.map((tx) => (
                  <div
                    key={tx._id}
                    style={{
                      background: colors.inputBg,
                      padding: "10px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      border: `1px solid ${colors.cardBorder}`,
                      fontSize: "13px",
                    }}
                  >
                    <p style={{ color: colors.textPrimary }}>
                      ₹ {tx.amount}
                    </p>

                    <p
                      style={{
                        color:
                          tx.status === "paid"
                            ? "#22c55e"
                            : tx.status === "failed"
                              ? "#ef4444"
                              : colors.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      {tx.status.toUpperCase()}
                    </p>

                    <p style={{ color: colors.textSecondary }}>
                      Payment ID: {tx.cf_paymentId || "-"}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
                  No transactions found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {smartReply && <SmartReply />}

      <CreateRelatedTicketModal
        open={openTicketModal}
        onClose={() => setOpenTicketModal(false)}
      />
      <TransferTicketModal
        open={transferTicketModal}
        onClose={() => setTransferTicketModal(false)}
      />
      <AddNoteModal
        open={addNoteModal}
        onClose={() => setAddNoteModal(false)}
        onSave={handleSaveNote}
        value={noteText}
        setValue={setNoteText}
      />

    </div>
  );
}
function UserHeader({ user }) {
  if (!user) return null;

  const statusColor =
    user.accountStatus === "online"
      ? colors.success
      : user.accountStatus === "offline"
        ? colors.warning
        : colors.textSecondary;

  return (
    <div>
      <h2 style={{ color: colors.textPrimary, textAlign: "center" }}>
        User <span style={{ color: colors.accent }}>Detail</span>
      </h2>

      <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
        {/* Status Dot */}
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: statusColor,
            marginTop: "6px",
          }}
        />

        {/* User Info */}
        <div>
          <p style={{ color: colors.textPrimary }}>
            {user.name}
          </p>

          <p style={{ color: colors.textSecondary, fontSize: "12px" }}>
            {user.id} • {user.role} • {user.gender}• {user.language} •Lvl {user.level?.levelNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= USER STATS ================= */
function UserStats({ user }) {
  if (!user) return null;

  const statBox = {
    background: colors.secondary,
    padding: "16px",
    borderRadius: "12px",
    border: `1px solid ${colors.cardBorder}`,
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px",
        marginTop: "20px",
        justifyContent: "center"
      }}
    >
      <div style={statBox}>
        <p>Status</p>
        <p style={{ color: colors.accent }}>{user.accountStatus}</p>
      </div>
      <div style={statBox}>
        <p>Total Calls</p>
        <p style={{ color: colors.accent }}>{user.totalCalls}</p>
      </div>
      <div style={statBox}>
        <p>Time Spent</p>
        <p style={{ color: colors.accent }}>{user.totalTimeSpentReadable}</p>
      </div>
      <div style={statBox}>
        <p>Role</p>
        <p style={{ color: colors.accent }}>{user.role}</p>
      </div>
    </div>
  );
}
// function ChatBubble({ text, type }) {
//   const isAgent = type === "agent";

//   return (
//     <div style={{ marginBottom: "16px", display: "flex", justifyContent: isAgent ? "flex-end" : "flex-start" }}>
//       <div style={{
//         background: isAgent ? colors.accent : colors.secondary, color: isAgent ? "#000" : colors.textPrimary, borderRadius: "10px", padding: "10px 14px", maxWidth: "60%",
//         wordBreak: "break-word",
//         overflowWrap: "anywhere",
//         whiteSpace: "pre-wrap",
//       }}>
//         {text}
//       </div>
//     </div>
//   );
// }

function ChatBubble({ message }) {
  const isSupport = message.sender === "support";

  const bubbleStyle = {
    background: isSupport ? colors.accent : colors.secondary,
    color: isSupport ? "#000" : colors.textPrimary,
    borderRadius: "12px",
    padding: "12px 14px",
    maxWidth: "75%",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isSupport ? "flex-end" : "flex-start",
        marginBottom: "18px",
      }}
    >
      <div style={bubbleStyle}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            opacity: 0.8,
            marginBottom: 4,
          }}
        >
          <strong>
            {message.sender === "support"
              ? "Support"
              : message.sender === "user"
                ? "User"
                : message.sender}
          </strong>

          <span>
            {new Date(message.timestamp).toLocaleString()}
          </span>
        </div>

        {/* Message */}
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {message.message}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.15)",
            paddingTop: 8,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            fontSize: 11,
          }}
        >
          <div>
            <strong>Model:</strong> {message.senderModel || "-"}
          </div>

          {/* <div>
            <strong>Sender ID:</strong>{" "}
            {message.senderId || "System"}
          </div>

          <div>
            <strong>Action:</strong>{" "}
            {message.meta?.actionType || "Normal"}
          </div>

          <div>
            <strong>Options:</strong>{" "}
            {message.meta?.options?.length || 0}
          </div> */}
        </div>

        {/* Interactive Options */}
        {message.meta?.options?.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 4,
            }}
          >
            {message.meta.options.map((option) => (
              <span
                key={option._id}
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: "rgba(0,0,0,.15)",
                  fontSize: 12,
                }}
              >
                {option.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}