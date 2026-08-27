const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  RESET_PASSWORD: "/resetPassword",
  UPDATE_PASSWORD: `/updatePassword/:token`,
  DASHBOARD: "/customer-support",
  // MODERATION_PANEL: "/moderation-panel",
  // ACTIVITY_LOG: "/activity-log",
  // FLAGGED: "/flagged",

  // // STATIC route for React Router
  // FLAGGED_REVIEW: "/flagged-review/:callId",

  // // Helper to create URL dynamically
  // getFlaggedReview: (id) => `/flagged-review/${id}`,

  // QUALITY_REVIEW:"/quality-review",
  // QUALITY_CATEGORY:"quality-category/:title",
  // QUALITY_REVIEW_DETAILS:"/quality-review/:callId",
  CUSTOMER_SUPPORT:"/customer-support",
  // CREATOR_SCORES:"/creator-scores",
  ACCOUNT_MANAGEMENT:"/account-management",
  // INSIGHTS_METRICES:"/insights-metrics",
   CHATBOT_TEMPLATES:"/chatbot-templates",
   TRANSACTIONS:"/transactions",
   FAQS:"/faqs",
   FESTIVALS:"/festivals",
   TUTORIAL_VIEDOS:"/tutorial-viedos",
   RAHIFAL:"/rashifal"
  // UNAUTHORIZED:"/unauthorized",
  // LIVE_FEED:"/live-feed",
  // USER_CREATOR_GRAPH:"/graph",
  // LAST_5_CALL:"/last-5-calls",
  // REVOKE_ACCESS:"/revoke-access",
  // TRANSACTION_SETTLEMENT:"/trans-settle",
  // CHAT_MODERATION:"/chat-moderation",
  // CHAT_REPORTS:"/chat-reports",
  // CHAT_ACCESS:"/chat-access",
  // MUTE_CALLS:"/mute-calls",
  // DEVICE_ASSOCIATION:"/device-association",
};

export default ROUTES;
