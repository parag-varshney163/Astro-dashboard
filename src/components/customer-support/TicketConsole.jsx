import React, { useEffect, useState } from "react";

import CreateRelatedTicketModal from "./CreateRelatedTicketModal";
import TransferTicketModal from "./TransferTicketModal";
import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import { TicketCard } from "./TicketCard";
import SmartReply from "./SmartReply";
import Button from "../ui/Button";


/* =========================
   MAIN COMPONENT
========================= */
export default function TicketConsole({ tickets = [], loading = false, refreshTickets, activeTab }) {
  const [selectedTicket, setSelectedTicket] = useState(tickets[0] || null);
  const [userDetails, setUserDetails] = useState(null);
  const [previousTicketDetails, setPreviousTicketDetails] = useState(null);
  const [lastTransactions, setLastTransactions] = useState([]);

  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [transferTicketModal, setTransferTicketModal] = useState(false);
  const [smartReply, setSmartReply] = useState(false);
  const showChatActions =
    activeTab !== "resolved" && activeTab !== "assigned" && activeTab !== "escalated";

  /* =========================
     FETCH USER DETAILS
  ========================= */
  const fetchUserDetails = async (userId) => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(
        `/api/v1/customer/users/${userId}/account-stats`
      );
      setUserDetails(res.data.data);
    } catch (err) {
      console.error("Error fetching user stats", err);
    }
  };
  const fetchPreviousTicketDetails = async (userId) => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(
        `/api/v1/customer/tickets/latest/${userId}`
      );
      setPreviousTicketDetails(res.data.data);
    } catch (err) {
      console.error("Error fetching previous tickets", err);
    }
  };
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

  /* =========================
     Sync selectedTicket with props
  ========================= */
  useEffect(() => {
    if (tickets.length > 0) {
      setSelectedTicket((prev) =>
        prev && tickets.find((t) => t._id === prev._id) ? prev : tickets[0]
      );
    } else {
      setSelectedTicket(null);
    }
  }, [tickets]);
  /* =========================
     Fetch user info on selectedTicket change
  ========================= */
  useEffect(() => {
    if (selectedTicket?.user?._id) {
      const userId = selectedTicket.user._id;
      fetchUserDetails(selectedTicket.user._id);
      fetchPreviousTicketDetails(selectedTicket.user._id);
      fetchLastTransactions(userId);
    } else {
      setUserDetails(null);
      setPreviousTicketDetails(null);
    }
  }, [selectedTicket]);
  /* =========================
     FILTER ACTIONS
  ========================= */
  const handleFilterSelection = async (value) => {
    // 🟢 Existing actions
    if (value === "Create Ticket") {
      setOpenTicketModal(true);
      return;
    }

    if (value === "Transfer Ticket") {
      setTransferTicketModal(true);
      return;
    }

    if (value === "Auto Reply") {
      setSmartReply(true);
      return;
    }

    // 🔴 Ticket must be selected
    if (!selectedTicket) {
      alert("Please select a ticket first");
      return;
    }

    // 🔵 RESOLVE TICKET
    if (value === "Resolved") {
      const confirmed = window.confirm(
        "Are you sure you want to RESOLVE this ticket?"
      );

      if (!confirmed) return;

      try {
        const res = await axiosInstance.patch(`/api/v1/customer/${selectedTicket._id}/resolved`, {
          resolvedDescription: "Ticket resolved by agent",
        });

        alert(res.data.message || "Ticket resolved successfully ✅");
        await refreshTickets?.();

        // refreshTickets?.(); // optional
      } catch (err) {
        alert(
          err?.response?.data?.message ||
          "Failed to resolve ticket ❌"
        );
      }
      return;
    }

    // 🔵 ESCALATE TICKET
    if (value === "Escalate") {
      const confirmed = window.confirm(
        "Are you sure you want to ESCALATE this ticket?"
      );

      if (!confirmed) return;

      try {
        const res = await axiosInstance.patch(`/api/v1/customer/${selectedTicket._id}/escalate`, {
          reason: "i want to escalate",
        });

        alert(res.data.message || "Ticket escalated successfully 🚀");
        await refreshTickets?.();

        // refreshTickets?.(); // optional
      } catch (err) {
        alert(
          err?.response?.data?.message ||
          "Failed to escalate ticket ❌"
        );
      }
    }
  };
  const handleTransferTicket = async (newSupportId) => {
    if (!selectedTicket?._id || !newSupportId) {
      alert("Please select a valid executive before transferring the ticket.");
      return;
    }

    try {
      await axiosInstance.patch(
        "/api/v1/customer/tickets/transfer",
        {
          ticketId: selectedTicket._id,
          newSupportId,
        }
      );

      alert("Ticket transferred successfully.");
      refreshTickets?.();
      setTransferTicketModal(false);
    } catch (err) {
      alert("Failed to transfer ticket. Please try again.");
      console.error("Transfer ticket error:", err);
    }
  };



  /* =========================
     RENDER
  ========================= */
  return (
    <div style={{ width: "100%", height: "100vh", background: colors.gradientVertical, padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px", height: "100%" }}>
        {/* LEFT PANEL */}
        <div style={{ width: "25%", background: colors.cardBg, borderRadius: "18px", border: `1px solid ${colors.cardBorder}`, padding: "20px", overflowY: "auto", alignItems: "stretch", }}>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard
                key={ticket._id}
                id={ticket.ticketNumber}
                priority={ticket.priority}
                user={ticket.user?.name || "Unassigned"}
                time={new Date(ticket.createdAt).toLocaleString()}
                status={ticket.status}
                isActive={selectedTicket?._id === ticket._id}
                onClick={() => setSelectedTicket(ticket)}
              />
            ))
          ) : (
            <p style={{ color: colors.textSecondary, textAlign: "center" }}>No tickets found</p>
          )}
        </div>
        {/* MIDDLE CHAT PANEL */}
        <div style={{ flex: 1, background: colors.cardBg, borderRadius: "18px", border: `1px solid ${colors.cardBorder}`, padding: "20px", display: "flex", flexDirection: "column" }}>
          {showChatActions && <div style={{ width: "160px", marginLeft: "auto" }}>
            <FilterDropDown
              options={["All Types", "Resolved", "Escalate", "Transfer Ticket",]}
              defaultLabel="All Types"
              onSelect={handleFilterSelection}
            />
          </div>}
          <div style={{ flex: 1, background: colors.inputBg, borderRadius: "14px", border: `1px solid ${colors.cardBorder}`, padding: "20px", overflowY: "auto", marginTop: "12px" }}>
            {selectedTicket?.chatId?.messages?.map((msg) => (
              <ChatBubble key={msg._id} text={msg.message} type={msg.sender === "support" ? "agent" : "user"} />
            ))}
          </div>
          {/* <div style={{ display: "flex", gap: "10px", background: colors.inputBg, borderRadius: "14px", padding: "10px 14px", border: `1px solid ${colors.cardBorder}`, marginTop: "12px" }}>
            <input placeholder="Type your message" style={{ flex: 1, background: "transparent", border: "none", color: colors.textPrimary, outline: "none" }} />
            <Button size="sm" variant="custom" bg={colors.Blue} text="#000">➤</Button>
          </div> */}
        </div>
        {/* RIGHT PANEL */}
        <div style={{ width: "25%", background: colors.cardBg, borderRadius: "18px", border: `1px solid ${colors.cardBorder}`, padding: "20px", overflowY: "auto" }}>
          <UserHeader user={userDetails} />
          <UserStats user={userDetails} />
          <div className="mt-6">
            <p style={{ color: colors.textSecondary, fontSize: "14px" }}>Previous <span style={{ color: colors.accent }}>Tickets</span></p>
            <div style={{ marginTop: "10px" }}>
              {Array.isArray(previousTicketDetails) && previousTicketDetails.length > 0 ? (
                previousTicketDetails.map((ticket, index) => (
                  <TicketCard
                    key={ticket.ticketNumber || index}
                    priority={ticket.priority}
                    time={new Date(ticket.createdAt).toLocaleString()}
                    status={ticket.status}
                    id={ticket.ticketNumber}
                    user={selectedTicket?.user?.name}
                  />
                ))
              ) : (
                <p style={{ color: colors.textSecondary, fontSize: "13px" }}>No previous tickets found</p>
              )}
            </div>
          </div>
          {/* =======================
   Last 3 Transactions
======================= */}
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
      <CreateRelatedTicketModal open={openTicketModal} onClose={() => setOpenTicketModal(false)} />
      <TransferTicketModal open={transferTicketModal} onClose={() => setTransferTicketModal(false)} onTransfer={handleTransferTicket} />
    </div>
  );
}
/* =========================
   CHAT BUBBLE
========================= */
function ChatBubble({ text, type }) {
  const isAgent = type === "agent";
  return (
    <div
      style={{
        marginBottom: "16px",
        display: "flex",
        justifyContent: isAgent ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          background: isAgent ? colors.accent : colors.secondary,
          color: isAgent ? "#000" : colors.textPrimary,
          borderRadius: "10px",
          padding: "10px 14px",
          maxWidth: "60%",

          wordBreak: "break-word",
          overflowWrap: "anywhere",
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}
/* =========================
   USER HEADER
========================= */
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
            {user.id} • {user.role} • {user.gender} •Lvl {user.level?.levelNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
/* =========================
   USER STATS
========================= */
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
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// import CreateRelatedTicketModal from "./CreateRelatedTicketModal";
// import TransferTicketModal from "./TransferTicketModal";
// import axiosInstance from "../../api/axiosInstance";
// import FilterDropDown from "../ui/FilterDropDown";
// import colors from "../../constants/colors";
// import { TicketCard } from "./TicketCard";
// import SmartReply from "./SmartReply";
// import Button from "../ui/Button";


// /* =========================
//    SOCKET
// ========================= */
// const socket = io("https://api.chatspark.in", {
//   transports: ["websocket"],
// });

// /* =========================
//    MAIN COMPONENT
// ========================= */
// export default function TicketConsole({ tickets = [], loading = false }) {
//   const [selectedTicket, setSelectedTicket] = useState(tickets[0] || null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const [userDetails, setUserDetails] = useState(null);
//   const [previousTicketDetails, setPreviousTicketDetails] = useState(null);

//   const [openTicketModal, setOpenTicketModal] = useState(false);
//   const [transferTicketModal, setTransferTicketModal] = useState(false);
//   const [smartReply, setSmartReply] = useState(false);

//   /* =========================
//      FETCH USER DETAILS
//   ========================= */
//   const fetchUserDetails = async (userId) => {
//     if (!userId) return;
//     try {
//       const res = await axiosInstance.get(
//         `/api/v1/customer/users/${userId}/account-stats`
//       );
//       setUserDetails(res.data.data);
//     } catch (err) {
//       console.error("Error fetching user stats", err);
//     }
//   };

//   const fetchPreviousTicketDetails = async (userId) => {
//     if (!userId) return;
//     try {
//       const res = await axiosInstance.get(
//         `/api/v1/customer/tickets/latest/${userId}`
//       );
//       setPreviousTicketDetails(res.data.data);
//     } catch (err) {
//       console.error("Error fetching previous tickets", err);
//     }
//   };

//   /* =========================
//      SYNC SELECTED TICKET
//   ========================= */
//   useEffect(() => {
//     if (tickets.length > 0) {
//       setSelectedTicket((prev) =>
//         prev && tickets.find((t) => t._id === prev._id) ? prev : tickets[0]
//       );
//     } else {
//       setSelectedTicket(null);
//     }
//   }, [tickets]);

//   /* =========================
//      JOIN ROOM & LOAD MESSAGES
//   ========================= */
//   useEffect(() => {
//     if (!selectedTicket?.chatId?.roomId) return;

//     socket.emit("joinRoom", {
//       roomId: selectedTicket.chatId.roomId,
//     });

//     setMessages(selectedTicket.chatId.messages || []);

//     if (selectedTicket.user?._id) {
//       fetchUserDetails(selectedTicket.user._id);
//       fetchPreviousTicketDetails(selectedTicket.user._id);
//     }
//   }, [selectedTicket]);

//   /* =========================
//      RECEIVE MESSAGES
//   ========================= */
//   useEffect(() => {
//     socket.on("newMessage", (msg) => {
//       if (msg.roomId !== selectedTicket?.chatId?.roomId) return;
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => socket.off("newMessage");
//   }, [selectedTicket]);

//   /* =========================
//      SEND MESSAGE
//   ========================= */
//   const sendMessage = () => {
//     if (!input.trim() || !selectedTicket?.chatId?.roomId) return;

//     socket.emit("sendMessage", {
//       token: localStorage.getItem("token"),
//       message: input,
//     });

//     setInput("");
//   };

//   /* =========================
//      FILTER ACTIONS
//   ========================= */
//   const handleFilterSelection = (value) => {
//     if (value === "Create Ticket") setOpenTicketModal(true);
//     if (value === "Transfer Ticket") setTransferTicketModal(true);
//     if (value === "Auto Reply") setSmartReply(true);
//   };

//   /* =========================
//      RENDER
//   ========================= */
//   return (
//     <div style={{ width: "100%", height: "100vh", background: colors.gradientVertical, padding: "20px" }}>
//       <div style={{ display: "flex", gap: "20px", height: "100%" }}>

//         {/* LEFT PANEL */}
//         <div style={{ width: "380px", background: colors.cardBg, borderRadius: "18px", border: `1px solid ${colors.cardBorder}`, padding: "20px", overflowY: "auto" }}>
//           {tickets.length > 0 ? (
//             tickets.map((ticket) => (
//               <TicketCard
//                 key={ticket._id}
//                 id={ticket.ticketNumber}
//                 priority={ticket.priority}
//                 user={ticket.user?.name || "Unassigned"}
//                 time={new Date(ticket.createdAt).toLocaleString()}
//                 status={ticket.status}
//                 isActive={selectedTicket?._id === ticket._id}
//                 onClick={() => setSelectedTicket(ticket)}
//               />
//             ))
//           ) : (
//             <p style={{ color: colors.textSecondary, textAlign: "center" }}>No tickets found</p>
//           )}
//         </div>

//         {/* MIDDLE CHAT PANEL */}
//         <div style={{ flex: 1, background: colors.cardBg, borderRadius: "18px", border: `1px solid ${colors.cardBorder}`, padding: "20px", display: "flex", flexDirection: "column" }}>
//           <div style={{ width: "160px", marginLeft: "auto" }}>
//             <FilterDropDown
//               options={["All Types", "Resolved", "Escalate", "Create Ticket", "Transfer Ticket", "Auto Reply"]}
//               defaultLabel="All Types"
//               onSelect={handleFilterSelection}
//             />
//           </div>

//           <div style={{ flex: 1, background: colors.inputBg, borderRadius: "14px", border: `1px solid ${colors.cardBorder}`, padding: "20px", overflowY: "auto", marginTop: "12px" }}>
//             {messages.map((msg, index) => (
//               <ChatBubble
//                 key={msg._id || index}
//                 text={msg.message}
//                 type={msg.sender === "support" ? "agent" : "user"}
//               />
//             ))}
//           </div>

//           <div style={{ display: "flex", gap: "10px", background: colors.inputBg, borderRadius: "14px", padding: "10px 14px", border: `1px solid ${colors.cardBorder}`, marginTop: "12px" }}>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Type your message"
//               style={{ flex: 1, background: "transparent", border: "none", color: colors.textPrimary, outline: "none" }}
//             />
//             <Button size="sm" variant="custom" bg={colors.Blue} text="#000" onClick={sendMessage}>
//               ➤
//             </Button>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div style={{ width: "380px", background: colors.cardBg, borderRadius: "18px", border: `1px solid ${colors.cardBorder}`, padding: "20px",overflowY:"auto" }}>
//           <UserHeader user={userDetails} />
//           <UserStats user={userDetails} />

//           <div style={{ marginTop: "20px", }}>
//             <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
//               Previous <span style={{ color: colors.accent }}>Tickets</span>
//             </p>

//             {Array.isArray(previousTicketDetails) && previousTicketDetails.length > 0 ? (
//               previousTicketDetails.map((ticket, index) => (
//                 <TicketCard
//                   key={ticket.ticketNumber || index}
//                   priority={ticket.priority}
//                   time={new Date(ticket.createdAt).toLocaleString()}
//                   status={ticket.status}
//                   id={ticket.ticketNumber}
//                   user={selectedTicket?.user?.name}
//                 />
//               ))
//             ) : (
//               <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
//                 No previous tickets found
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {smartReply && <SmartReply />}
//       <CreateRelatedTicketModal open={openTicketModal} onClose={() => setOpenTicketModal(false)} ticket={selectedTicket} />
//       <TransferTicketModal open={transferTicketModal} onClose={() => setTransferTicketModal(false)} />
//     </div>
//   );
// }

// /* =========================
//    CHAT BUBBLE
// ========================= */
// function ChatBubble({ text, type }) {
//   const isAgent = type === "agent";

//   return (
//     <div style={{ marginBottom: "16px", display: "flex", justifyContent: isAgent ? "flex-end" : "flex-start" }}>
//       <div style={{ background: isAgent ? colors.accent : colors.secondary, color: isAgent ? "#000" : colors.textPrimary, borderRadius: "10px", padding: "10px 14px", maxWidth: "60%" }}>
//         {text}
//       </div>
//     </div>
//   );
// }

// /* =========================
//    USER HEADER
// ========================= */
// function UserHeader({ user }) {
//   if (!user) return null;

//   return (
//     <div>
//       <h2 style={{ color: colors.textPrimary, textAlign: "center" }}>
//         User <span style={{ color: colors.accent }}>Detail</span>
//       </h2>

//       <p style={{ color: colors.textPrimary, marginTop: "10px" }}>{user.name}</p>
//       <p style={{ color: colors.textSecondary, fontSize: "12px" }}>
//         {user.id} • {user.role} • {user.gender} • Lvl {user.level?.xp}
//       </p>
//     </div>
//   );
// }

// /* =========================
//    USER STATS
// ========================= */
// function UserStats({ user }) {
//   if (!user) return null;

//   const statBox = {
//     background: colors.secondary,
//     padding: "16px",
//     borderRadius: "12px",
//     border: `1px solid ${colors.cardBorder}`,
//   };

//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "20px" }}>
//       <div style={statBox}><p>Status</p><p style={{ color: colors.accent }}>{user.accountStatus}</p></div>
//       <div style={statBox}><p>Total Calls</p><p style={{ color: colors.accent }}>{user.totalCalls}</p></div>
//       <div style={statBox}><p>Time Spent</p><p style={{ color: colors.accent }}>{user.totalTimeSpentReadable}</p></div>
//       <div style={statBox}><p>Role</p><p style={{ color: colors.accent }}>{user.role}</p></div>
//     </div>
//   );
// }

