// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import CreateRelatedTicketModal from "./CreateRelatedTicketModal";
// import TransferTicketModal from "./TransferTicketModal";
// import axiosInstance from "../../api/axiosInstance";
// import FilterDropDown from "../ui/FilterDropDown";
// import colors from "../../constants/colors";
// import { TicketCard } from "./TicketCard";
// import SmartReply from "./SmartReply";
// import Button from "../ui/Button";
// export default function EscalatedByChatBot() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [smartReply, setSmartReply] = useState(false);
//   const [openTicketModal, setOpenTicketModal] = useState(false);
//   const [transferTicketModal, setTransferTicketModal] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [previousTickets, setPreviousTickets] = useState([]);
//   const [userLoading, setUserLoading] = useState(false);
//   const [previousTicketsLoading, setPreviousTicketsLoading] = useState(false);
//   const [lastTransactions, setLastTransactions] = useState([]);
//   const [input, setInput] = useState("");
//   const socketRef = useRef(null);
//   const bottomRef = useRef(null);
//   const [typing, setTyping] = useState(false);
//   const typingTimeoutRef = useRef(null);
//   const notificationSound = useRef(null);
//   /* ================= SOCKET ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     const socket = io("https://api.chatspark.in", {
//       transports: ["websocket"],
//     });
//     socketRef.current = socket;
//     socket.emit("supportJoin", { token });
//     /* 🔥 NEW MESSAGE */
//     // socket.on("newMessage", (msg) => {
//     //   setTickets((prev) =>
//     //     prev.map((t) =>
//     //       t.roomId === msg.roomId
//     //         ? { ...t, messages: [...(t.messages || []), msg] }
//     //         : t
//     //     )
//     //   );
//     // });
//     socket.on("newMessage", (msg) => {
//        if (msg.sender === "user") {
//     const shouldNotify =
//       msg.roomId !== currentRoom ||
//       document.hidden ||
//       !document.hasFocus();
//     if (shouldNotify) {
//       notificationSound.current?.play().catch(() => {});
//     }
//     if (
//       Notification.permission === "granted" &&
//       (document.hidden || !document.hasFocus())
//     ) {
//       new Notification("New Customer Message", {
//         body: msg.message,
//         icon: "/logo192.png",
//       });
//     }
//   }
//       setTickets((prev) =>
//         prev.map((t) => {
//           if (t.roomId !== msg.roomId) return t;
//           const isCurrentChat = msg.roomId === currentRoom;
//           return {
//             ...t,
//             messages: [...(t.messages || []), msg],
//             // 🔴 unread dot if message comes in another chat
//             hasUnread:
//               !isCurrentChat && msg.sender === "user"
//                 ? true
//                 : t.hasUnread || false,
//           };
//         })
//       );
//     });
//     /* 🔥 TYPING START */
//     socket.on("typing:start", ({ roomId }) => {
//       if (roomId === currentRoom) {
//         setTyping(true);
//         console.log(roomId === currentRoom);
//       }
//     });
//     /* 🔥 TYPING STOP */
//     socket.on("typing:stop", ({ roomId }) => {
//       if (roomId === currentRoom) {
//         setTyping(false);
//       }
//     });
//     return () => {
//       socket.off();
//       socket.disconnect();
//     };
//   }, [currentRoom]);
//   useEffect(() => {
//   notificationSound.current = new Audio("/text_message.mp3");
//   notificationSound.current.volume = 0.8;
// }, []);
// useEffect(() => {
//   if ("Notification" in window && Notification.permission !== "granted") {
//     Notification.requestPermission();
//   }
// }, []);
//   /* ================= FETCH TICKETS ================= */
//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const res = await axiosInstance.get(
//           "/api/v1/customer/chatbot/chats?filter=escalated"
//         );
//         // setTickets(res.data.data || []);
//         const formattedTickets = (res.data.data || []).map(ticket => ({
//           ...ticket,
//           hasUnread: !ticket.isRead, // if isRead=false => show red dot
//         }));
//         setTickets(formattedTickets);
//         // console.log(res.data.data[0].roomId);
//         if (res.data.data?.length > 0) {
//           setSelectedTicketId(res.data.data[0]._id);
//           setCurrentRoom(res.data.data[0].roomId);
//         }
//       } catch (err) {
//         console.error("Error fetching tickets", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTickets();
//   }, []);
//   const selectedTicket = tickets.find((t) => t._id === selectedTicketId);
//   /* ================= FETCH USER + PREVIOUS ================= */
//   useEffect(() => {
//     if (!selectedTicket?.userId?._id) {
//       setUserDetails(null);
//       setPreviousTickets([]);
//       return;
//     }
//     const fetchUserDetails = async () => {
//       try {
//         setUserLoading(true);
//         const res = await axiosInstance.get(
//           `/api/v1/customer/users/${selectedTicket.userId._id}/account-stats`
//         );
//         setUserDetails(res.data.data);
//       } finally {
//         setUserLoading(false);
//       }
//     };
//     const fetchPreviousTickets = async () => {
//       try {
//         setPreviousTicketsLoading(true);
//         const res = await axiosInstance.get(
//           `/api/v1/customer/tickets/latest/${selectedTicket.userId._id}`
//         );
//         setPreviousTickets(res.data.data || []);
//       } finally {
//         setPreviousTicketsLoading(false);
//       }
//     };
//     const userId = selectedTicket?.userId?._id;
//     fetchUserDetails();
//     fetchPreviousTickets();
//     fetchLastTransactions(userId);
//   }, [selectedTicketId]);
//   const fetchLastTransactions = async (userId) => {
//     if (!userId) return;
//     try {
//       const res = await axiosInstance.get(
//         `/api/v1/customer/last3Transactions/${userId}`
//       );
//       setLastTransactions(res.data.data?.lastTransactions || []);
//     } catch (err) {
//       console.error("Error fetching transactions", err);
//       setLastTransactions([]);
//     }
//   };
//   const handleFilterSelection = async (value) => {
//     if (value === "Create Ticket") setOpenTicketModal(true);
//     if (value === "Transfer Ticket") setTransferTicketModal(true);
//     if (value === "Auto Reply") setSmartReply(true);
//     if (!selectedTicket) {
//       alert("Please select a ticket first");
//       return;
//     }
//     // 🔵 RESOLVE TICKET
//     if (value === "Resolved") {
//       const confirmed = window.confirm(
//         "Are you sure you want to RESOLVE this ticket?"
//       );
//       if (!confirmed) return;
//       try {
//         const res = await axiosInstance.patch(`/api/v1/customer/chat/${selectedTicket._id}/resolve`, {
//           resolvedDescription: "Ticket resolved by agent",
//         });
//         alert(res.data.message || "Ticket resolved successfully ✅");
//         setTickets((prev) => {
//           const updated = prev.filter(
//             (t) => t._id !== selectedTicket._id
//           );
//           // ✅ auto-select next ticket
//           if (updated.length > 0) {
//             setSelectedTicketId(updated[0]._id);
//             setCurrentRoom(updated[0].roomId);
//           } else {
//             setSelectedTicketId(null);
//             setCurrentRoom(null);
//           }
//           return updated;
//         });
//         // refreshTickets?.(); // optional
//       } catch (err) {
//         alert(
//           err?.response?.data?.message ||
//           "Failed to resolve ticket ❌"
//         );
//       }
//       return;
//     }
//   };
//   /* ================= SEND MESSAGE ================= */
//   const sendMessage = () => {
//     if (!input.trim() || !currentRoom) return;
//     socketRef.current.emit("typing:stop", {
//       token: localStorage.getItem("token"),
//       roomId: currentRoom,
//     });
//     socketRef.current.emit("sendMessage", {
//       token: localStorage.getItem("token"),
//       roomId: currentRoom,
//       message: input,
//     });
//     setInput("");
//   };
//   const handleTyping = (value) => {
//     setInput(value);
//     if (!currentRoom) return;
//     socketRef.current.emit("typing:start", {
//       token: localStorage.getItem("token"),
//       roomId: currentRoom,
//     });
//     clearTimeout(typingTimeoutRef.current);
//     typingTimeoutRef.current = setTimeout(() => {
//       socketRef.current.emit("typing:stop", {
//         token: localStorage.getItem("token"),
//         roomId: currentRoom,
//       });
//     }, 700);
//   };
//   useEffect(() => {
//     if (!selectedTicket?.messages) return;
//     // small timeout ensures DOM is painted
//     setTimeout(() => {
//       bottomRef.current?.scrollIntoView({ behavior: "auto" });
//     }, 0);
//   }, [
//     selectedTicket?._id,              // ticket change
//     selectedTicket?.messages?.length, // messages loaded / updated
//   ]);
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         background: colors.gradientVertical,
//         display: "flex",
//         flexDirection: "column",
//         padding: "20px",
//         gap: "20px",
//       }}
//     >
//       <div style={{ display: "flex", gap: "20px", flex: 1, overflow: "hidden" }}>
//         {/* LEFT PANEL */}
//         <div
//           style={{
//             width: "25%",
//             background: colors.cardBg,
//             borderRadius: "18px",
//             border: `1px solid ${colors.cardBorder}`,
//             padding: "20px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//             overflowY: "auto"
//           }}
//         >
//           {loading ? (
//             <p style={{ color: colors.textSecondary }}>Loading tickets...</p>
//           ) : tickets.length === 0 ? (
//             <p style={{ color: colors.textSecondary }}>No tickets found</p>
//           ) : (
//             tickets.map((ticket) => (
//               <TicketCard
//                 key={ticket._id}
//                 id={ticket.roomId}
//                 priority={ticket.priority}
//                 user={ticket.userId?.name}
//                 time={new Date(ticket.createdAt).toLocaleString()}
//                 status={ticket.status}
//                 isActive={selectedTicketId === ticket._id}
//                 hasUnread={ticket.hasUnread}
//                 onClick={() => {
//                   setSelectedTicketId(ticket._id);
//                   setCurrentRoom(ticket.roomId);
//                   setTickets((prev) =>
//                     prev.map((t) =>
//                       t._id === ticket._id
//                         ? { ...t, hasUnread: false }
//                         : t
//                     )
//                   );
//                 }}
//               />
//             ))
//           )}
//         </div>
//         {/* CHAT PANEL */}
//         <div
//           style={{
//             flex: 1,
//             background: colors.cardBg,
//             borderRadius: "18px",
//             border: `1px solid ${colors.cardBorder}`,
//             padding: "20px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//           }}
//         >
//           <div style={{ width: "160px", marginLeft: "auto" }}>
//             <FilterDropDown
//               options={[
//                 "All Types",
//                 "Resolved",
//                 "Create Ticket",
//               ]}
//               defaultLabel="All Types"
//               onSelect={handleFilterSelection}
//             />
//           </div>
//           <div
//             style={{
//               flex: 1,
//               background: colors.inputBg,
//               borderRadius: "14px",
//               border: `1px solid ${colors.cardBorder}`,
//               padding: "20px",
//               overflowY: "auto",
//             }}
//           >
//             {selectedTicket?.messages?.length > 0 ? (
//               selectedTicket.messages.map((msg, idx) => (
//                 <ChatBubble
//                   key={idx}
//                   // text={msg.message}
//                   // type={msg.sender === "user" ? "user" : "agent"}
//                   message={msg}
//                 />
//               ))
//             ) : (
//               <p style={{ color: colors.textSecondary }}>No chat available</p>
//             )}
//             {typing && (
//               <p style={{ fontSize: "12px", color: colors.textSecondary }}>
//                 User is typing...
//               </p>
//             )}
//             <div ref={bottomRef} />
//           </div>
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               background: colors.inputBg,
//               borderRadius: "14px",
//               padding: "10px 14px",
//               border: `1px solid ${colors.cardBorder}`,
//             }}
//           >
//             {/* <input
//               value={input}
//               onChange={(e) => handleTyping(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               placeholder="Type your message"
//               style={{
//                 flex: 1,
//                 background: "transparent",
//                 border: "none",
//                 color: colors.textPrimary,
//                 outline: "none",
//               }}
//             /> */}
//             <textarea
//               value={input}
//               onChange={(e) => handleTyping(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && e.ctrlKey) {
//                   e.preventDefault();
//                   sendMessage(); // Ctrl + Enter to send
//                 }
//               }}
//               placeholder="Type your message (Ctrl + Enter to send)"
//               style={{
//                 flex: 1,
//                 background: "transparent",
//                 border: "none",
//                 color: colors.textPrimary,
//                 outline: "none",
//                 resize: "none",
//                 minHeight: "40px",
//                 maxHeight: "120px",
//                 overflowY: "auto",
//                 whiteSpace: "pre-wrap",   // 🔥 PRESERVE SPACES + NEWLINES
//               }}
//             />
//             <Button
//               size="sm"
//               variant="custom"
//               bg={colors.Blue}
//               text="#000"
//               onClick={sendMessage}
//             >
//               ➤
//             </Button>
//           </div>
//         </div>
//         {/* right pannel */}
//         <div
//           style={{
//             width: "25%",
//             background: colors.cardBg,
//             borderRadius: "18px",
//             border: `1px solid ${colors.cardBorder}`,
//             padding: "20px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//           }}
//         >
//           {userLoading ? (
//             <p style={{ color: colors.textSecondary, textAlign: "center" }}>
//               Loading user details...
//             </p>
//           ) : (
//             <>
//               <UserHeader user={userDetails} />
//               <UserStats user={userDetails} />
//             </>
//           )}
//           <div className="mt-6">
//             <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
//               Previous <span style={{ color: colors.accent }}>Tickets</span>
//             </p>
//             <div style={{ marginTop: "10px" }}>
//               {previousTicketsLoading ? (
//                 <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
//                   Loading previous tickets...
//                 </p>
//               ) : previousTickets.length > 0 ? (
//                 previousTickets.map((ticket, index) => (
//                   <TicketCard
//                     key={index}
//                     id={ticket.ticketNumber}
//                     priority={ticket.priority}
//                     time={new Date(ticket.createdAt).toLocaleString()}
//                     status={ticket.status}
//                     user={selectedTicket?.userId?.name}   // ✅ FIX
//                   />
//                 ))
//               ) : (
//                 <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
//                   No previous tickets found
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="mt-6">
//             <p style={{ color: colors.textSecondary, fontSize: "14px" }}>
//               Last 3 <span style={{ color: colors.accent }}>Transactions</span>
//             </p>
//             <div style={{ marginTop: "10px" }}>
//               {lastTransactions.length > 0 ? (
//                 lastTransactions.map((tx) => (
//                   <div
//                     key={tx._id}
//                     style={{
//                       background: colors.inputBg,
//                       padding: "10px",
//                       borderRadius: "10px",
//                       marginBottom: "10px",
//                       border: `1px solid ${colors.cardBorder}`,
//                       fontSize: "13px",
//                     }}
//                   >
//                     <p style={{ color: colors.textPrimary }}>
//                       ₹ {tx.amount}
//                     </p>
//                     <p
//                       style={{
//                         color:
//                           tx.status === "paid"
//                             ? "#22c55e"
//                             : tx.status === "failed"
//                               ? "#ef4444"
//                               : colors.textSecondary,
//                         fontWeight: 500,
//                       }}
//                     >
//                       {tx.status.toUpperCase()}
//                     </p>
//                     <p style={{ color: colors.textSecondary }}>
//                       Payment ID: {tx.cf_paymentId || "-"}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p style={{ color: colors.textSecondary, fontSize: "13px" }}>
//                   No transactions found
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {smartReply && <SmartReply />}
//       <CreateRelatedTicketModal
//         open={openTicketModal}
//         onClose={() => setOpenTicketModal(false)}
//         ticket={selectedTicket}
//       />
//       <TransferTicketModal
//         open={transferTicketModal}
//         onClose={() => setTransferTicketModal(false)}
//       />
//     </div>
//   );
// }
// /* ================= SUB COMPONENTS ================= */
// function UserHeader({ user }) {
//   if (!user) return null;
//   const statusColor =
//     user.accountStatus === "online"
//       ? colors.success
//       : user.accountStatus === "offline"
//         ? colors.warning
//         : colors.textSecondary;
//   return (
//     <div>
//       <h2 style={{ color: colors.textPrimary, textAlign: "center" }}>
//         User <span style={{ color: colors.accent }}>Detail</span>
//       </h2>
//       <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
//         {/* Status Dot */}
//         <div
//           style={{
//             width: "14px",
//             height: "14px",
//             borderRadius: "50%",
//             background: statusColor,
//             marginTop: "6px",
//           }}
//         />
//         {/* User Info */}
//         <div>
//           <p style={{ color: colors.textPrimary }}>
//             {user.name}
//           </p>
//           <p style={{ color: colors.textSecondary, fontSize: "12px" }}>
//             {user.id} • {user.role} • {user.gender} •Lvl {user.level?.levelNumber} •Version- {user.appVersion}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// function UserStats({ user }) {
//   if (!user) return null;
//   const statBox = {
//     background: colors.secondary,
//     padding: "16px",
//     borderRadius: "12px",
//     border: `1px solid ${colors.cardBorder}`,
//   };
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr",
//         gap: "14px",
//         marginTop: "20px",
//         justifyContent: "center"
//       }}
//     >
//       <div style={statBox}>
//         <p>Status</p>
//         <p style={{ color: colors.accent }}>{user.accountStatus}</p>
//       </div>
//       <div style={statBox}>
//         <p>Total Calls</p>
//         <p style={{ color: colors.accent }}>{user.totalCalls}</p>
//       </div>
//       <div style={statBox}>
//         <p>Time Spent</p>
//         <p style={{ color: colors.accent }}>{user.totalTimeSpentReadable}</p>
//       </div>
//       <div style={statBox}>
//         <p>Role</p>
//         <p style={{ color: colors.accent }}>{user.role}</p>
//       </div>
//     </div>
//   );
// }
// // function ChatBubble({ text, type }) {
// //   const isAgent = type === "agent";
// //   return (
// //     <div
// //       style={{
// //         marginBottom: "16px",
// //         display: "flex",
// //         justifyContent: isAgent ? "flex-end" : "flex-start",
// //       }}
// //     >
// //       <div
// //         style={{
// //           background: isAgent ? colors.accent : colors.secondary,
// //           color: isAgent ? "#000" : colors.textPrimary,
// //           borderRadius: "10px",
// //           padding: "10px 14px",
// //           maxWidth: "60%",
// //           wordBreak: "break-word",
// //           overflowWrap: "anywhere",
// //           whiteSpace: "pre-wrap",
// //         }}
// //       >
// //         {text}
// //       </div>
// //     </div>
// //   );
// // }
// function ChatBubble({ message }) {
//   const isAgent = message.sender !== "user";
//   return (
//     <div
//       style={{
//         marginBottom: 18,
//         display: "flex",
//         justifyContent: isAgent ? "flex-end" : "flex-start",
//       }}
//     >
//       <div
//         style={{
//           background: isAgent ? colors.accent : colors.secondary,
//           color: isAgent ? "#000" : colors.textPrimary,
//           borderRadius: 12,
//           padding: 12,
//           maxWidth: "70%",
//           wordBreak: "break-word",
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 8,
//             fontSize: 11,
//             opacity: 0.8,
//           }}
//         >
//           <strong>
//             {message.sender === "user"
//               ? "👤 User"
//               : message.sender === "support"
//               ? "🎧 Support"
//               : message.sender}
//           </strong>
//           <span>
//             {new Date(message.timestamp).toLocaleString()}
//           </span>
//         </div>
//         {/* Message */}
//         <div
//           style={{
//             fontSize: 14,
//             lineHeight: 1.5,
//           }}
//         >
//           {message.message}
//         </div>
//         {/* Footer */}
//         <div
//           style={{
//             marginTop: 10,
//             fontSize: 11,
//             borderTop: "1px solid rgba(255,255,255,.15)",
//             paddingTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             gap: 4,
//             opacity: 0.9,
//           }}
//         >
//           <div>
//             <strong>Sender Model:</strong> {message.senderModel}
//           </div>
//           {/* {message.senderId && (
//             <div>
//               <strong>Sender ID:</strong> {message.senderId}
//             </div>
//           )} */}
//           {message.meta?.actionType && (
//             <div>
//               <strong>Action:</strong>{" "}
//               <span
//                 style={{
//                   padding: "2px 8px",
//                   borderRadius: 20,
//                   background: "#2563eb22",
//                   color: "#2563eb",
//                   fontWeight: 600,
//                 }}
//               >
//                 {message.meta.actionType}
//               </span>
//             </div>
//           )}
//           {message.meta?.options?.length > 0 && (
//             <div>
//               <strong>Options:</strong>
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 6,
//                   marginTop: 6,
//                 }}
//               >
//                 {message.meta.options.map((option) => (
//                   <span
//                     key={option._id}
//                     style={{
//                       padding: "4px 10px",
//                       borderRadius: 20,
//                       background: "#ffffff20",
//                       fontSize: 11,
//                     }}
//                   >
//                     {option.label}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import CreateRelatedTicketModal from "./CreateRelatedTicketModal";
import TransferTicketModal from "./TransferTicketModal";
import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import { getSocket } from "../socket/socket";
import colors from "../../constants/colors";
import { TicketCard } from "./TicketCard";
import SmartReply from "./SmartReply";
import Button from "../ui/Button";


export default function EscalatedByChatBot() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [smartReply, setSmartReply] = useState(false);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [transferTicketModal, setTransferTicketModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [previousTickets, setPreviousTickets] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [previousTicketsLoading, setPreviousTicketsLoading] = useState(false);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  //const notificationSound = useRef(null);

  /* ================= SOCKET ================= */
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   const socket = io("https://api.chatspark.in", {
  //     transports: ["websocket"],
  //   });

  //   socketRef.current = socket;
  //   socket.emit("supportJoin", { token });

  //   /* 🔥 NEW MESSAGE */
  //   // socket.on("newMessage", (msg) => {
  //   //   setTickets((prev) =>
  //   //     prev.map((t) =>
  //   //       t.roomId === msg.roomId
  //   //         ? { ...t, messages: [...(t.messages || []), msg] }
  //   //         : t
  //   //     )
  //   //   );
  //   // });
  //   socket.on("newMessage", (msg) => {
  //      if (msg.sender === "user") {
  //   const shouldNotify =
  //     msg.roomId !== currentRoom ||
  //     document.hidden ||
  //     !document.hasFocus();

  //   if (shouldNotify) {
  //     notificationSound.current?.play().catch(() => {});
  //   }

  //   if (
  //     Notification.permission === "granted" &&
  //     (document.hidden || !document.hasFocus())
  //   ) {
  //     new Notification("New Customer Message", {
  //       body: msg.message,
  //       icon: "/logo192.png",
  //     });
  //   }
  // }
  //     setTickets((prev) =>
  //       prev.map((t) => {
  //         if (t.roomId !== msg.roomId) return t;

  //         const isCurrentChat = msg.roomId === currentRoom;

  //         return {
  //           ...t,
  //           messages: [...(t.messages || []), msg],

  //           // 🔴 unread dot if message comes in another chat
  //           hasUnread:
  //             !isCurrentChat && msg.sender === "user"
  //               ? true
  //               : t.hasUnread || false,
  //         };
  //       })
  //     );
  //   });

  //   /* 🔥 TYPING START */
  //   socket.on("typing:start", ({ roomId }) => {
  //     if (roomId === currentRoom) {
  //       setTyping(true);
  //       console.log(roomId === currentRoom);
  //     }
  //   });

  //   /* 🔥 TYPING STOP */
  //   socket.on("typing:stop", ({ roomId }) => {
  //     if (roomId === currentRoom) {
  //       setTyping(false);
  //     }
  //   });

  //   return () => {
  //     socket.off();
  //     socket.disconnect();
  //   };
  // }, [currentRoom]);

  useEffect(() => {
  const socket = getSocket();

  if (!socket) return;

  socketRef.current = socket;

  const handleNewMessage = (msg) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.roomId !== msg.roomId) return t;

        const isCurrentChat = msg.roomId === currentRoom;

        return {
          ...t,
          messages: [...(t.messages || []), msg],
          hasUnread:
            !isCurrentChat && msg.sender === "user"
              ? true
              : t.hasUnread,
        };
      })
    );
  };

  const handleTypingStart = ({ roomId }) => {
    if (roomId === currentRoom) {
      setTyping(true);
    }
  };

  const handleTypingStop = ({ roomId }) => {
    if (roomId === currentRoom) {
      setTyping(false);
    }
  };

  socket.on("newMessage", handleNewMessage);
  socket.on("typing:start", handleTypingStart);
  socket.on("typing:stop", handleTypingStop);

  return () => {
    socket.off("newMessage", handleNewMessage);
    socket.off("typing:start", handleTypingStart);
    socket.off("typing:stop", handleTypingStop);
  };
}, [currentRoom]);
//   useEffect(() => {
//   notificationSound.current = new Audio("/text_message.mp3");
//   notificationSound.current.volume = 0.8;
// }, []);

// useEffect(() => {
//   if ("Notification" in window && Notification.permission !== "granted") {
//     Notification.requestPermission();
//   }
// }, []);

  /* ================= FETCH TICKETS ================= */
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/v1/customer/chatbot/chats?filter=escalated"
        );
        // setTickets(res.data.data || []);
        const formattedTickets = (res.data.data || []).map(ticket => ({
          ...ticket,
          hasUnread: !ticket.isRead, // if isRead=false => show red dot
        }));

        setTickets(formattedTickets);
        // console.log(res.data.data[0].roomId);
        if (res.data.data?.length > 0) {
          setSelectedTicketId(res.data.data[0]._id);
          setCurrentRoom(res.data.data[0].roomId);
        }
      } catch (err) {
        console.error("Error fetching tickets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);
  const selectedTicket = tickets.find((t) => t._id === selectedTicketId);
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
      } finally {
        setPreviousTicketsLoading(false);
      }
    };
    const userId = selectedTicket?.userId?._id;
    fetchUserDetails();
    fetchPreviousTickets();
    fetchLastTransactions(userId);
  }, [selectedTicketId]);

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
    if (value === "Create Ticket") setOpenTicketModal(true);
    if (value === "Transfer Ticket") setTransferTicketModal(true);
    if (value === "Auto Reply") setSmartReply(true);
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
        const res = await axiosInstance.patch(`/api/v1/customer/chat/${selectedTicket._id}/resolve`, {
          resolvedDescription: "Ticket resolved by agent",
        });
        alert(res.data.message || "Ticket resolved successfully ✅");
        setTickets((prev) => {
          const updated = prev.filter(
            (t) => t._id !== selectedTicket._id
          );
          // ✅ auto-select next ticket
          if (updated.length > 0) {
            setSelectedTicketId(updated[0]._id);
            setCurrentRoom(updated[0].roomId);
          } else {
            setSelectedTicketId(null);
            setCurrentRoom(null);
          }
          return updated;
        });
        // refreshTickets?.(); // optional
      } catch (err) {
        alert(
          err?.response?.data?.message ||
          "Failed to resolve ticket ❌"
        );
      }
      return;
    }
  };
  /* ================= SEND MESSAGE ================= */
  const sendMessage = () => {
    if (!input.trim() || !currentRoom) return;

    socketRef.current.emit("typing:stop", {
      token: localStorage.getItem("token"),
      roomId: currentRoom,
    });

    socketRef.current.emit("sendMessage", {
      token: localStorage.getItem("token"),
      roomId: currentRoom,
      message: input,
    });

    setInput("");
  };
  const handleTyping = (value) => {
    setInput(value);

    if (!currentRoom) return;

    socketRef.current.emit("typing:start", {
      token: localStorage.getItem("token"),
      roomId: currentRoom,
    });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing:stop", {
        token: localStorage.getItem("token"),
        roomId: currentRoom,
      });
    }, 700);
  };

  useEffect(() => {
    if (!selectedTicket?.messages) return;
    // small timeout ensures DOM is painted
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, 0);
  }, [
    selectedTicket?._id,              // ticket change
    selectedTicket?.messages?.length, // messages loaded / updated
  ]);
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
            tickets.map((ticket) => (
              <TicketCard
                key={ticket._id}
                id={ticket.roomId}
                priority={ticket.priority}
                user={ticket.userId?.name}
                time={new Date(ticket.createdAt).toLocaleString()}
                status={ticket.status}
                isActive={selectedTicketId === ticket._id}
                hasUnread={ticket.hasUnread}
                onClick={() => {
                  setSelectedTicketId(ticket._id);
                  setCurrentRoom(ticket.roomId);
                  setTickets((prev) =>
                    prev.map((t) =>
                      t._id === ticket._id
                        ? { ...t, hasUnread: false }
                        : t
                    )
                  );

                }}
              />
            ))
          )}
        </div>
        {/* CHAT PANEL */}
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
          }}
        >
          <div style={{ width: "160px", marginLeft: "auto" }}>
            <FilterDropDown
              options={[
                "All Types",
                "Resolved",
                "Create Ticket",
              ]}
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
            }}
          >
            {selectedTicket?.messages?.length > 0 ? (
              selectedTicket.messages.map((msg, idx) => (
                <ChatBubble
                  key={idx}
                  // text={msg.message}
                  // type={msg.sender === "user" ? "user" : "agent"}
                  message={msg}
                />
              ))
            ) : (
              <p style={{ color: colors.textSecondary }}>No chat available</p>
            )}
            {typing && (
              <p style={{ fontSize: "12px", color: colors.textSecondary }}>
                User is typing...
              </p>
            )}

            <div ref={bottomRef} />
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              background: colors.inputBg,
              borderRadius: "14px",
              padding: "10px 14px",
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            {/* <input
              value={input}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: colors.textPrimary,
                outline: "none",
              }}
            /> */}
            <textarea
              value={input}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault();
                  sendMessage(); // Ctrl + Enter to send
                }
              }}
              placeholder="Type your message (Ctrl + Enter to send)"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: colors.textPrimary,
                outline: "none",
                resize: "none",
                minHeight: "40px",
                maxHeight: "120px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",   // 🔥 PRESERVE SPACES + NEWLINES
              }}
            />
            <Button
              size="sm"
              variant="custom"
              bg={colors.Blue}
              text="#000"
              onClick={sendMessage}
            >
              ➤
            </Button>
          </div>
        </div>
        {/* right pannel */}
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
        ticket={selectedTicket}
      />
      <TransferTicketModal
        open={transferTicketModal}
        onClose={() => setTransferTicketModal(false)}
      />
    </div>
  );
}



/* ================= SUB COMPONENTS ================= */
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
            {user.id} • {user.phoneNumber} • {user.language} •Lvl {user.level?.levelNumber} •Version- {user.appVersion}
          </p>
        </div>
      </div>
    </div>
  );
}
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
      {/* <div style={statBox}>
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
      </div> */}
      <div style={statBox}>
        <p>Payment Status</p>
        <p style={{ color: colors.accent }}>{}</p>
      </div>
    </div>
  );
}
// function ChatBubble({ text, type }) {
//   const isAgent = type === "agent";
//   return (
//     <div
//       style={{
//         marginBottom: "16px",
//         display: "flex",
//         justifyContent: isAgent ? "flex-end" : "flex-start",
//       }}
//     >
//       <div
//         style={{
//           background: isAgent ? colors.accent : colors.secondary,
//           color: isAgent ? "#000" : colors.textPrimary,
//           borderRadius: "10px",
//           padding: "10px 14px",
//           maxWidth: "60%",
//           wordBreak: "break-word",
//           overflowWrap: "anywhere",
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         {text}
//       </div>
//     </div>
//   );
// }

function ChatBubble({ message }) {
  const isAgent = message.sender !== "user";

  return (
    <div
      style={{
        marginBottom: 18,
        display: "flex",
        justifyContent: isAgent ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          background: isAgent ? colors.accent : colors.secondary,
          color: isAgent ? "#000" : colors.textPrimary,
          borderRadius: 12,
          padding: 12,
          maxWidth: "70%",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            fontSize: 11,
            opacity: 0.8,
          }}
        >
          <strong>
            {message.sender === "user"
              ? "👤 User"
              : message.sender === "support"
              ? "🎧 Support"
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
            marginTop: 10,
            fontSize: 11,
            borderTop: "1px solid rgba(255,255,255,.15)",
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            opacity: 0.9,
          }}
        >
          <div>
            <strong>Sender Model:</strong> {message.senderModel}
          </div>

          {/* {message.senderId && (
            <div>
              <strong>Sender ID:</strong> {message.senderId}
            </div>
          )} */}

          {message.meta?.actionType && (
            <div>
              <strong>Action:</strong>{" "}
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 20,
                  background: "#2563eb22",
                  color: "#2563eb",
                  fontWeight: 600,
                }}
              >
                {message.meta.actionType}
              </span>
            </div>
          )}

          {message.meta?.options?.length > 0 && (
            <div>
              <strong>Options:</strong>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginTop: 6,
                }}
              >
                {message.meta.options.map((option) => (
                  <span
                    key={option._id}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "#ffffff20",
                      fontSize: 11,
                    }}
                  >
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

