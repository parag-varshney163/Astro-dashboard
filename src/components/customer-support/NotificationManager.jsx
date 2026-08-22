import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import { connectSocket } from "../socket/socket";
import ROUTES from "../../constants/Routes";


export default function NotificationManager() {
    const soundRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        soundRef.current = new Audio("/text_message.mp3");
        soundRef.current.volume = 0.8;

        if (
            "Notification" in window &&
            Notification.permission !== "granted"
        ) {
            Notification.requestPermission();
        }

        const token = localStorage.getItem("token");

        if (!token) return;

        const socket = connectSocket(token);

        const handleNewMessage = (msg) => {
            // only notify for customer messages
            if (msg.sender !== "user") return;

            //   const shouldNotify =
            //     document.hidden ||
            //     !document.hasFocus();
            const shouldNotify =
                location.pathname !== ROUTES.CUSTOMER_SUPPORT;

            if (shouldNotify) {
                soundRef.current?.play().catch(() => { });
            }

            if (
                Notification.permission === "granted" &&
                shouldNotify
            ) {
                new Notification("New Customer Message", {
                    body: msg.message,
                    icon: "/logo192.png",
                });
            }

            console.log("Incoming message", msg);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, []);

    return null;
}
