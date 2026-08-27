import { Shield, Zap, Calendar, Flag, Star, Award, MessageSquare, Bot, Trash2, BarChart3, LogOut, Radio, GitGraph, LineChart, Phone, Ban, IndianRupee, MessageCircle, ShieldCheck, VolumeX, DivideIcon, ClipboardCheck, Coins, FileQuestionMark, FerrisWheel, View, Radius, } from "lucide-react";


const MENU_ITEMS = [
  // {
  //   name: "Reported Calls",
  //   icon: Shield,
  //   path: "/reported-calls",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "report",
  //   },
  // },
  // {
  //   name: "Moderation Panel",
  //   icon: Zap,
  //   path: "/moderation-panel",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "moderationPanel",
  //   },
  // },
  // {
  //   name: "Activity Log",
  //   icon: Calendar,
  //   path: "/activity-log",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "activityLog",
  //   },
  // },
  // {
  //   name: "Flagged",
  //   icon: Flag,
  //   path: "/flagged",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "flagged",
  //   },
  // },
  // {
  //   name: "Quality Review",
  //   icon: Star,
  //   path: "/quality-review",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "qualityReview",
  //   },
  // },
  // {
  //   name: "Creator Scores",
  //   icon: Award,
  //   path: "/creator-scores",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "creatorScores",
  //   },
  // },
  {
    name: "Customer Support",
    icon: MessageSquare,
    path: "/customer-support",
    permission: {
      section: "moderationDashboard",
      key: "customerSupport",
    },
  },
  {
    name: "ChatBot Templates",
    icon: Bot,
    path: "/chatbot-templates",
    permission: {
      section: "moderationDashboard",
      key: "chatbotTemplate",
    },
  },
  {
    name: "Account Management",
    icon: Trash2,
    path: "/account-management",
    permission: {
      section: "moderationDashboard",
      key: "accountManagement",
    },
  },
   {
    name: "Transactions",
    icon: Coins,
    path: "/transactions",
    permission: {
      section: "moderationDashboard",
      key: "accountManagement",
    },
  },
    {
    name: "FAQs",
    icon: FileQuestionMark,
    path: "/faqs",
    permission: {
      section: "moderationDashboard",
      key: "accountManagement",
    },
  },
   {
    name: "Festivals",
    icon: FerrisWheel,
    path: "/festivals",
    permission: {
      section: "moderationDashboard",
      key: "accountManagement",
    },
  },
  {
    name: "Tutorial Viedos",
    icon: View,
    path: "/tutorial-viedos",
    permission: {
      section: "moderationDashboard",
      key: "accountManagement",
    },
  },
  {
    name: "Rashifal",
    icon: Radius,
    path: "/rashifal",
    permission: {
      section: "moderationDashboard",
      key: "accountManagement",
    },
  },
  
  // {
  //   name: "Insights & Metrics",
  //   icon: BarChart3,
  //   path: "/insights-metrics",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "insightsAndMetrics",
  //   },
  // },
  // {
  //   name: "Live Feed Management",
  //   icon: Radio,
  //   path: "/live-feed",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "liveFeed",
  //   },
  // },
  // {
  //   name: "User And Creator Analysis",
  //   icon: LineChart,
  //   path: "/graph",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "userAndCreatorAnalysis",
  //   },
  // },
  // {
  //   name: "Last 5 Calls",
  //   icon: Phone,
  //   path: "/last-5-calls",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "last5Calls",
  //   },
  // },
  // {
  //   name: "Revoke Access",
  //   icon: Ban,
  //   path: "/revoke-access",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "revokeAccess",
  //   },
  // },
  // {
  //   name: "User Transaction Settlement",
  //   icon: IndianRupee,
  //   path: "/trans-settle",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "transactionSettlement",
  //   },
  // },
  // {
  //   name: "Chat Moderation",
  //   icon: MessageCircle,
  //   path: "/chat-moderation",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "chatModeration",
  //   },
  // },
  
  //   {
  //   name: "Chat Access",
  //   icon: ShieldCheck,
  //   path: "/chat-access",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "chatAccess",
  //   },
  // },
  //   {
  //   name: "Mute Calls",
  //   icon: VolumeX,
  //   path: "/mute-calls",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "muteCalls",
  //   },
  // },
  //  {
  //   name: "Device Association",
  //   icon: DivideIcon,
  //   path: "/device-association",
  //   permission: {
  //     section: "moderationDashboard",
  //     key: "deviceAssociated",
  //   },
  // },

  // // ⭐ Logout (no permission)
  // {
  {
    name: "Logout",
    icon: LogOut,
    path: "/logout",
    isLogout: true,
  },
];

export default MENU_ITEMS;
