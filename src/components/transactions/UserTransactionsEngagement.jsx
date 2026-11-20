import React, { useCallback, useEffect, useState } from "react";

import TransactionsInvoicesTab from "./TransactionsInvoicesTab";
import agamiastroinstance from "../../api/agamiastroinstance";
import ActivityTimelineTab from "./ActivityTimelineTab";
import UserProfileCard from "./UserProfileCard";
import DashboardTabs from "./DashboardTabs";
import colors from "../../constants/colors";
import OverviewTab from "./OverviewTab";
import SearchUser from "./SearchUser";


const EMPTY_FILTERS = {
  orderId: "",
  userId: "",
  phone: "",
};

const LIMIT = 10;

const UserTransactionsEngagement = () => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const [user, setUser] = useState(null);
  const [overview, setOverview] = useState(null);
  const [activities, setActivities] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [engagementLoading, setEngagementLoading] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [error, setError] = useState(null);
  const [engagementError, setEngagementError] = useState(null);
  const [activityError, setActivityError] = useState(null);
  const [transactionError, setTransactionError] = useState(null);

  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [period, setPeriod] = useState("lifetime");

  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionTotalPages, setTransactionTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const [activityPage, setActivityPage] = useState(1);
  const [activityTotalPages, setActivityTotalPages] = useState(1);

  // ------------------------------------------------
  // 1. USER SEARCH API
  // ------------------------------------------------

  const handleSearch = async () => {
    const searchFilters = {
      orderId: filters.orderId.trim(),
      userId: filters.userId.trim(),
      phone: filters.phone.trim(),
    };

    if (!Object.values(searchFilters).some(Boolean)) {
      setError("Please enter Order ID, User ID or Phone Number.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      setHasSearched(true);
      setUser(null);
      setOverview(null);
      setActivities([]);
      setTransactions([]);

      setTransactionPage(1);
      setActivityPage(1);

      setEngagementError(null);
      setActivityError(null);
      setTransactionError(null);

      const params = {};

      if (searchFilters.userId) params.userId = searchFilters.userId;
      if (searchFilters.phone) params.phone = searchFilters.phone;
      if (searchFilters.orderId) params.orderId = searchFilters.orderId;

      const response = await agamiastroinstance.get(
        "/api/v1/dashboard/users/search",
        { params }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "User not found"
        );
      }

      const userData = response.data?.data;

      if (!userData?.userId) {
        throw new Error("User details not found in response.");
      }

      setUser(userData);

      // Load dashboard data after finding the user.
      await Promise.all([
        fetchEngagement(userData.userId, period),
        fetchActivity(userData.userId, 1),
        fetchTransactions(1, searchFilters),
      ]);

    } catch (err) {
      console.error("User search error:", err);

      setUser(null);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to find user."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // 2. USER ENGAGEMENT API
  // ------------------------------------------------

  const fetchEngagement = useCallback(async (userId, selectedPeriod) => {
    if (!userId) return;

    try {
      setEngagementLoading(true);
      setEngagementError(null);

      const response = await agamiastroinstance.get(
        `/api/v1/dashboard/users/${encodeURIComponent(userId)}/engagement`,
        {
          params: {
            period: selectedPeriod,
          },
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to fetch engagement."
        );
      }

      setOverview(response.data?.data || null);

    } catch (err) {
      console.error("Engagement API error:", err);

      setOverview(null);

      setEngagementError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load engagement data."
      );
    } finally {
      setEngagementLoading(false);
    }
  }, []);

  // ------------------------------------------------
  // 3. USER ACTIVITY API
  // ------------------------------------------------

  const fetchActivity = useCallback(async (userId, pageNumber = 1) => {
    if (!userId) return;

    try {
      setActivityLoading(true);
      setActivityError(null);

      const response = await agamiastroinstance.get(
        `/api/v1/dashboard/users/${encodeURIComponent(userId)}/activity`,
        {
          params: {
            page: pageNumber,
            limit: LIMIT,
          },
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to fetch activities."
        );
      }

      const result = response.data?.data;

      setActivities(result?.items || []);
      setActivityPage(result?.pagination?.page || pageNumber);
      setActivityTotalPages(result?.pagination?.totalPages || 1);

    } catch (err) {
      console.error("Activity API error:", err);

      setActivities([]);
      setActivityTotalPages(1);

      setActivityError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load user activities."
      );
    } finally {
      setActivityLoading(false);
    }
  }, []);

  // ------------------------------------------------
  // 4. TRANSACTIONS API
  // ------------------------------------------------

  const fetchTransactions = useCallback(async (
    pageNumber = 1,
    searchFilters = filters
  ) => {
    try {
      setTransactionLoading(true);
      setTransactionError(null);

      const params = {
        page: pageNumber,
        limit: LIMIT,
      };

      if (searchFilters.orderId?.trim()) {
        params.orderId = searchFilters.orderId.trim();
      }

      if (searchFilters.userId?.trim()) {
        params.userId = searchFilters.userId.trim();
      }

      if (searchFilters.phone?.trim()) {
        params.phone = searchFilters.phone.trim();
      }

      const response = await agamiastroinstance.get(
        "/api/v1/dashboard/transactions",
        { params }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to fetch transactions."
        );
      }

      const result = response.data?.data;

      setTransactions(result?.data || []);

      setTransactionPage(result?.pagination?.page || pageNumber);
      setTransactionTotalPages(
        result?.pagination?.totalPages || 1
      );
      setTotalTransactions(result?.pagination?.total || 0);

    } catch (err) {
      console.error("Transactions API error:", err);

      setTransactions([]);
      setTransactionTotalPages(1);
      setTotalTransactions(0);

      setTransactionError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to fetch transactions."
      );
    } finally {
      setTransactionLoading(false);
    }
  }, [filters]);

  // ------------------------------------------------
  // 5. PERIOD CHANGE
  // ------------------------------------------------

  useEffect(() => {
    if (!user?.userId || !hasSearched) return;

    fetchEngagement(user.userId, period);
    fetchActivity(user.userId, 1);

  }, [period, user?.userId, hasSearched, fetchEngagement, fetchActivity]);

  // ------------------------------------------------
  // 6. CLEAR SEARCH
  // ------------------------------------------------

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);

    setUser(null);
    setOverview(null);
    setActivities([]);
    setTransactions([]);

    setHasSearched(false);
    setError(null);
    setEngagementError(null);
    setActivityError(null);
    setTransactionError(null);

    setTransactionPage(1);
    setTransactionTotalPages(1);
    setTotalTransactions(0);

    setActivityPage(1);
    setActivityTotalPages(1);

    setActiveTab("overview");
  };

  // ------------------------------------------------
  // 7. PAGINATION
  // ------------------------------------------------

  const handleTransactionPageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > transactionTotalPages ||
      !user?.userId
    ) return;

    fetchTransactions(newPage, filters);
  };

  const handleActivityPageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > activityTotalPages ||
      !user?.userId
    ) return;

    fetchActivity(user.userId, newPage);
  };

  // ------------------------------------------------
  // UI
  // ------------------------------------------------

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        color: colors.textPrimary,
      }}
    >
      <div style={{ marginBottom: "22px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 750,
            color: colors.textPrimary,
          }}
        >
          User Transactions & Engagement
        </h2>

        <p
          style={{
            marginTop: "7px",
            fontSize: "14px",
            color: colors.textSecondary,
          }}
        >
          Search users, understand product usage, inspect payments
          and generate invoice receipts.
        </p>
      </div>

      <SearchUser
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      {error && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
            borderRadius: "10px",
            border: `1px solid ${colors.danger}`,
            background: "rgba(224,82,82,0.08)",
            color: colors.danger,
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {!hasSearched ? (
        <div
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            border: `1px solid ${colors.cardBorder}`,
            background: colors.gradientCard,
            color: colors.textMuted,
            fontSize: "14px",
          }}
        >
          Search using Order ID, User ID or Phone Number to view user details.
        </div>
      ) : loading && !user ? (
        <div
          style={{
            minHeight: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.textSecondary,
          }}
        >
          Searching user...
        </div>
      ) : !user ? (
        <div
          style={{
            minHeight: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            border: `1px solid ${colors.cardBorder}`,
            background: colors.gradientCard,
            color: colors.textMuted,
          }}
        >
          No user found.
        </div>
      ) : (
        <>
          <UserProfileCard user={user} />

          <DashboardTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            period={period}
            setPeriod={setPeriod}
          />

          {activeTab === "overview" && (
            <OverviewTab
              overview={overview}
              loading={engagementLoading}
              error={engagementError}
            />
          )}

          {activeTab === "activity" && (
            <ActivityTimelineTab
              activities={activities}
              loading={activityLoading}
              error={activityError}
              page={activityPage}
              totalPages={activityTotalPages}
              onPageChange={handleActivityPageChange}
            />
          )}

          {activeTab === "transactions" && (
            <TransactionsInvoicesTab
              transactions={transactions}
              loading={transactionLoading}
              error={transactionError}
              page={transactionPage}
              totalPages={transactionTotalPages}
              onPageChange={handleTransactionPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserTransactionsEngagement;
