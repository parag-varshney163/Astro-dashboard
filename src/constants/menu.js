// import { Shield, Zap, Calendar, Flag, Star, Award, MessageSquare, Bot, Trash2, BarChart3, LogOut, Radio, GitGraph, LineChart, Phone, Ban, IndianRupee, MessageCircle, ShieldCheck, VolumeX, DivideIcon, ClipboardCheck, Coins, FileQuestionMark, FerrisWheel, View, Radius, Bell, Database, ArrowUpToLine, ChartArea, SubscriptIcon, VeganIcon, Diamond, ExternalLink, CarTaxiFront, Stamp, Expand, Subscript, BedDoubleIcon, } from "lucide-react";
// const MENU_ITEMS = [
//   {
//     name: "Customer Support",
//     icon: MessageSquare,
//     path: "/customer-support",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "customerSupport",
//     },
//   },
//   {
//     name: "ChatBot Templates",
//     icon: Bot,
//     path: "/chatbot-templates",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "chatBotTemplate",
//     },
//   },
//   {
//     name: "Account Management",
//     icon: Trash2,
//     path: "/account-management",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "accountManagement",
//     },
//   },
//    {
//     name: "Transactions",
//     icon: Coins,
//     path: "/transactions",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "transactions",
//     },
//   },
//     {
//     name: "FAQs",
//     icon: FileQuestionMark,
//     path: "/faqs",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "faqs",
//     },
//   },
//    {
//     name: "Festivals",
//     icon: FerrisWheel,
//     path: "/festivals",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "festivals",
//     },
//   },
//   {
//     name: "Tutorial Viedos",
//     icon: View,
//     path: "/tutorial-viedos",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "tutorialVideos",
//     },
//   },
//   {
//     name: "Rashifal",
//     icon: Radius,
//     path: "/rashifal",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "rashifal",
//     },
//   },
//    {
//     name: "Notification",
//     icon: Bell,
//     path: "/notification",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "notifications",
//     },
//   },
//    {
//     name: "Data Insights",
//     icon: Database,
//     path: "/data-insights",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "dataInsights",
//     },
//   },
//    {
//     name: "AutoPay",
//     icon: ArrowUpToLine,
//     path: "/auto-pay",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//   {
//     name: "ChatLimit",
//     icon: ChartArea,
//     path: "/chat-limit",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//   {
//     name: "Subscription Overview",
//     icon: SubscriptIcon,
//     path: "/subscription",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//    {
//     name: "Reels",
//     icon: VeganIcon,
//     path: "/reels",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//    {
//     name: "Daily Special",
//     icon: Diamond,
//     path: "/daily-special",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//    {
//     name: "Experiments",
//     icon: ExternalLink,
//     path: "/experiments",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//     {
//     name: "Reels Category",
//     icon: CarTaxiFront,
//     path: "/reels-category",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//    {
//     name: "Reels stats",
//     icon: Stamp,
//     path: "/reels-stats",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//   {
//     name: "Experiments Stats",
//     icon: Expand,
//     path: "/ex-stats",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//    {
//     name: "Jaspay Mandates",
//     icon: Subscript,
//     path: "/juspay-mandates",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//    {
//     name: "Debit Failures",
//     icon: BedDoubleIcon,
//     path: "/debit",
//     permission: {
//       section: "agamiCustomerDashboard",
//       key: "autoPay",
//     },
//   },
//   {
//     name: "Logout",
//     icon: LogOut,
//     path: "/logout",
//     isLogout: true,
//   },
// ];
// export default MENU_ITEMS;
import { MessageSquare, Bot, Trash2, Coins, FileQuestionMark, FerrisWheel, View, Radius, Bell, Database, ArrowUpToLine, ChartArea, SubscriptIcon, VeganIcon, Diamond, ExternalLink, CarTaxiFront, Stamp, Expand, Subscript, BedDoubleIcon, LogOut, Users, LayoutDashboard, BarChart3, CreditCard, } from "lucide-react";


const permission = (key) => ({
  section: "agamiCustomerDashboard",
  key,
});

const MENU_ITEMS = [
  {
    name: "Customer",
    icon: Users,

    children: [
      {
        name: "Customer Support",
        icon: MessageSquare,
        path: "/customer-support",
        permission: permission("customerSupport"),
      },

      {
        name: "ChatBot Templates",
        icon: Bot,
        path: "/chatbot-templates",
        permission: permission("chatBotTemplate"),
      },

      {
        name: "Account Management",
        icon: Trash2,
        path: "/account-management",
        permission: permission("accountManagement"),
      },

      {
        name: "Transactions",
        icon: Coins,
        path: "/transactions",
        permission: permission("transactions"),
      },

      {
        name: "FAQs",
        icon: FileQuestionMark,
        path: "/faqs",
        permission: permission("faqs"),
      },
    ],
  },

  {
    name: "Content",
    icon: LayoutDashboard,

    children: [
      {
        name: "Festivals",
        icon: FerrisWheel,
        path: "/festivals",
        permission: permission("festivals"),
      },

      {
        name: "Tutorial Videos",
        icon: View,
        path: "/tutorial-viedos",
        permission: permission("tutorialVideos"),
      },

      {
        name: "Rashifal",
        icon: Radius,
        path: "/rashifal",
        permission: permission("rashifal"),
      },

      {
        name: "Notification",
        icon: Bell,
        path: "/notification",
        permission: permission("notifications"),
      },

      {
        name: "Daily Special",
        icon: Diamond,
        path: "/daily-special",
        permission: permission("autoPay"),
      },
    ],
  },

  {
    name: "Reels",
    icon: VeganIcon,

    children: [
      {
        name: "Reels",
        icon: VeganIcon,
        path: "/reels",
        permission: permission("autoPay"),
      },

      {
        name: "Reels Category",
        icon: CarTaxiFront,
        path: "/reels-category",
        permission: permission("autoPay"),
      },

      {
        name: "Reels Stats",
        icon: Stamp,
        path: "/reels-stats",
        permission: permission("autoPay"),
      },
    ],
  },

  {
    name: "Analytics",
    icon: BarChart3,

    children: [
      {
        name: "Data Insights",
        icon: Database,
        path: "/data-insights",
        permission: permission("dataInsights"),
      },

      {
        name: "Chat Limit",
        icon: ChartArea,
        path: "/chat-limit",
        permission: permission("autoPay"),
      },

      {
        name: "Experiments",
        icon: ExternalLink,
        path: "/experiments",
        permission: permission("autoPay"),
      },

      {
        name: "Experiments Stats",
        icon: Expand,
        path: "/ex-stats",
        permission: permission("autoPay"),
      },
    ],
  },

  {
    name: "Subscription & Payments",
    icon: CreditCard,

    children: [
      {
        name: "AutoPay",
        icon: ArrowUpToLine,
        path: "/auto-pay",
        permission: permission("autoPay"),
      },

      {
        name: "Subscription Overview",
        icon: SubscriptIcon,
        path: "/subscription",
        permission: permission("autoPay"),
      },

      {
        name: "Juspay Mandates",
        icon: Subscript,
        path: "/juspay-mandates",
        permission: permission("autoPay"),
      },

      {
        name: "Debit Failures",
        icon: BedDoubleIcon,
        path: "/debit",
        permission: permission("autoPay"),
      },
    ],
  },

  {
    name: "Logout",
    icon: LogOut,
    path: "/logout",
    isLogout: true,
  },
];

export default MENU_ITEMS;