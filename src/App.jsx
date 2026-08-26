import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import NotificationManager from "./components/customer-support/NotificationManager";
import AccountManagement from "./pages/AccountManagement";
import CustomerSupport from "./pages/CustomerSupport";
import ProtectedRoute from "./routes/ProtectedRoute";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";
import Transactions from "./pages/Transactions";
import PublicRoute from "./routes/PublicRoute";
// Pages you currently have
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import Festivals from "./pages/Festivals";
import ROUTES from "./constants/Routes";
import ChatBot from "./pages/ChatBot";
import Faqs from "./pages/Faqs";


function App() {
  return (
    <Router>
      <NotificationManager/>
      <Routes>
        {/* === Public Routes === */}
        <Route
          path={ROUTES.ROOT}
          element={
            <PublicRoute>
              <WelcomePage />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.UPDATE_PASSWORD}
          element={
            <PublicRoute>
              <UpdatePassword />
            </PublicRoute>
          }
        />
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

        {/* === Protected Dashboard === */}
        
        <Route
          path={ROUTES.CUSTOMER_SUPPORT}
          element={
            <ProtectedRoute section="moderationDashboard" permissionKey="customerSupport">
              <CustomerSupport/>
            </ProtectedRoute>
          }
        />
         <Route
          path={ROUTES.ACCOUNT_MANAGEMENT}
          element={
            <ProtectedRoute section="moderationDashboard" permissionKey="customerSupport">
              <AccountManagement/>
            </ProtectedRoute>
          }
        />
         <Route
          path={ROUTES.CHATBOT_TEMPLATES}
          element={
            <ProtectedRoute section="moderationDashboard" permissionKey="customerSupport">
              <ChatBot/>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.TRANSACTIONS}
          element={
            <ProtectedRoute section="moderationDashboard" permissionKey="customerSupport">
              <Transactions/>
            </ProtectedRoute>
          }
        />
          <Route
          path={ROUTES.FAQS}
          element={
            <ProtectedRoute section="moderationDashboard" permissionKey="customerSupport">
              <Faqs/>
            </ProtectedRoute>
          }
        />
           <Route
            path={ROUTES.FESTIVALS}
            element={
            <ProtectedRoute section="moderationDashboard" permissionKey="customerSupport">
              <Festivals/>
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
