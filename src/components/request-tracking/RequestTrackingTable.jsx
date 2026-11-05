import { RefreshCw, Search, Activity, CheckCircle, XCircle, Clock, Eye, X, CalendarDays, Filter, ChevronRight, Zap, AlertCircle, } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

import FilterDropDown from "../../components/ui/FilterDropDown";
import DataTable from "../../components/ui/DataTable";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const API_URL = "/api/v1/request-tracking/dashboard";

const RequestTrackingTable = () => {
  // Filters
  const [period, setPeriod] = useState("1d");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [requestType, setRequestType] = useState("All Types");
  const [status, setStatus] = useState("All Statuses");

  // Data
  const [dashboardData, setDashboardData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Search
  const [search, setSearch] = useState("");

  // Details modal
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit,
      };

      if (from && to) {
        params.from = from;
        params.to = to;
      } else {
        params.period = period;
      }

      if (requestType !== "All Types") {
        params.requestType = requestType;
      }

      if (status !== "All Statuses") {
        params.status = status;
      }

      const response = await axiosInstance.get(API_URL, {
        params,
      });

      const result = response.data?.data;

      setDashboardData(result);
      setRequests(result?.requests || []);
    } catch (err) {
      console.error("Request tracking error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to fetch request tracking data."
      );
    } finally {
      setLoading(false);
    }
  }, [period, from, to, requestType, status, page, limit]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Reset pagination when filters change
  const handlePeriodChange = (value) => {
    setPeriod(value);
    setFrom("");
    setTo("");
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setRequestType(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleDateChange = (field, value) => {
    if (field === "from") {
      setFrom(value);
    } else {
      setTo(value);
    }

    setPeriod("");
    setPage(1);
  };

  const handleReset = () => {
    setPeriod("1d");
    setFrom("");
    setTo("");
    setRequestType("All Types");
    setStatus("All Statuses");
    setSearch("");
    setPage(1);
  };

  // Summary data
  const summary = dashboardData?.summary || {};

  const totals = Object.values(summary).reduce(
    (acc, item) => ({
      total: acc.total + (item?.total || 0),
      success: acc.success + (item?.success || 0),
      failure: acc.failure + (item?.failure || 0),
      pending: acc.pending + (item?.pending || 0),
    }),
    { total: 0, success: 0, failure: 0, pending: 0 }
  );

  const successRate = totals.total
    ? ((totals.success / totals.total) * 100).toFixed(1)
    : 0;

  // Search current page
  const filteredRequests = requests.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.requestId?.toLowerCase().includes(searchValue) ||
      item.endpoint?.toLowerCase().includes(searchValue) ||
      item.userId?.toLowerCase().includes(searchValue) ||
      item.requestType?.toLowerCase().includes(searchValue) ||
      item.status?.toLowerCase().includes(searchValue) ||
      String(item.statusCode || "").includes(searchValue)
    );
  });

  // Formatting
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (value) => {
    switch (value) {
      case "success":
        return colors.success;
      case "failure":
        return colors.danger;
      case "pending":
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      horoscope: "Horoscope",
      kundali: "Kundali",
      palm_reading: "Palm Reading",
    };

    return labels[type] || type || "-";
  };

  // Table columns
  const columns = [
    {
      key: "requestType",
      label: "Request Type",
      width: "1.1fr",
      align: "left",
      render: (value) => (
        <div>
          <span style={{ fontWeight: 600 }}>
            {getTypeLabel(value)}
          </span>
          <div
            style={{
              fontSize: 11,
              color: colors.textMuted,
              marginTop: 4,
            }}
          >
            Astrology Request
          </div>
        </div>
      ),
    },
    {
      key: "endpoint",
      label: "Endpoint",
      width: "2fr",
      align: "left",
      render: (value) => (
        <span
          title={value}
          style={{
            fontSize: 12,
            fontFamily: "monospace",
            overflowWrap: "anywhere",
          }}
        >
          {value || "-"}
        </span>
      ),
    },
    {
      key: "method",
      label: "Method",
      width: "0.7fr",
      render: (value) => (
        <span
          style={{
            background: "rgba(59,130,246,0.12)",
            color: "#60A5FA",
            padding: "5px 10px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {value || "-"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "0.9fr",
      render: (value) => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            color: getStatusColor(value),
            background: `${getStatusColor(value)}18`,
            textTransform: "capitalize",
          }}
        >
          {value === "success" ? (
            <CheckCircle size={12} />
          ) : value === "failure" ? (
            <XCircle size={12} />
          ) : (
            <Clock size={12} />
          )}
          {value || "-"}
        </span>
      ),
    },
    {
      key: "statusCode",
      label: "HTTP Code",
      width: "0.8fr",
      render: (value) => (
        <span style={{ fontWeight: 600 }}>
          {value || "-"}
        </span>
      ),
    },
    {
      key: "responseTimeMs",
      label: "Response Time",
      width: "1fr",
      render: (value) => (
        <span
          style={{
            color:
              value > 5000
                ? colors.warning
                : colors.textPrimary,
            fontWeight: 600,
          }}
        >
          {value != null ? `${value.toLocaleString()} ms` : "-"}
        </span>
      ),
    },
    {
      key: "requestedAt",
      label: "Requested At",
      width: "1.4fr",
      render: (value) => (
        <span style={{ fontSize: 12 }}>
          {formatDate(value)}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      width: "0.6fr",
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRequest(row);
          }}
          title="View request details"
          style={{
            background: `${colors.accent}18`,
            color: colors.accent,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 8,
            padding: "7px 10px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Eye size={16} />
        </button>
      ),
    },
  ];

  // Summary card
  const SummaryCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }) => (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 16,
        padding: 20,
        minWidth: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <span
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {title}
        </span>

        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `${color}18`,
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={19} />
        </div>
      </div>

      <div
        style={{
          fontSize: 29,
          fontWeight: 800,
          color: colors.textPrimary,
          marginBottom: 7,
        }}
      >
        {value.toLocaleString("en-IN")}
      </div>

      <span
        style={{
          fontSize: 11,
          color: colors.textMuted,
        }}
      >
        {subtitle}
      </span>
    </div>
  );

  const totalPages = dashboardData?.pagination?.totalPages || 1;
  const totalRecords = dashboardData?.pagination?.total || 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background: colors.pageBg,
        color: colors.textPrimary,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 26,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 7,
            }}
          >
            <Activity color={colors.accent} size={25} />

            <h2 style={{ fontSize: 24, fontWeight: 800 }}>
              Request Tracking
            </h2>
          </div>

          <p
            style={{
              color: colors.textSecondary,
              fontSize: 13,
            }}
          >
            Monitor horoscope, kundali and palm reading API requests.
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "11px 18px",
            borderRadius: 10,
            border: "none",
            background: colors.gradientButton,
            color: colors.buttonText,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 16,
          marginBottom: 25,
        }}
      >
        <SummaryCard
          title="Total Requests"
          value={totals.total}
          icon={Activity}
          color={colors.accent}
          subtitle="All astrology requests"
        />

        <SummaryCard
          title="Successful"
          value={totals.success}
          icon={CheckCircle}
          color={colors.success}
          subtitle={`${successRate}% success rate`}
        />

        <SummaryCard
          title="Failed"
          value={totals.failure}
          icon={XCircle}
          color={colors.danger}
          subtitle="Failed API requests"
        />

        <SummaryCard
          title="Pending"
          value={totals.pending}
          icon={Clock}
          color={colors.warning}
          subtitle="Requests awaiting completion"
        />
      </div>

      {/* SUCCESS RATE */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          padding: 20,
          borderRadius: 16,
          marginBottom: 25,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            Overall Success Rate
          </span>

          <span
            style={{
              color: colors.success,
              fontWeight: 800,
            }}
          >
            {successRate}%
          </span>
        </div>

        <div
          style={{
            height: 9,
            borderRadius: 20,
            background: colors.inputBg,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${successRate}%`,
              height: "100%",
              background: colors.gradientButton,
              borderRadius: 20,
              transition: "width .3s ease",
            }}
          />
        </div>
      </div>

      {/* FILTER SECTION */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            marginBottom: 18,
          }}
        >
          <Filter size={18} color={colors.accent} />

          <h3 style={{ fontSize: 16, fontWeight: 700 }}>
            Filters
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            flexWrap: "wrap",
            alignItems: "end",
          }}
        >
          {/* PERIOD */}
          <div>
            <label style={labelStyle}>
              Date Period
            </label>

            <FilterDropDown
              key={`period-${period || "custom"}`}
              width={160}
              defaultLabel={period || "Custom Range"}
              options={["1d", "7d", "15d", "30d"]}
              onSelect={handlePeriodChange}
            />
          </div>

          {/* FROM */}
          <div>
            <label style={labelStyle}>From Date</label>

            <input
              type="date"
              value={from}
              max={to || undefined}
              onChange={(e) =>
                handleDateChange("from", e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* TO */}
          <div>
            <label style={labelStyle}>To Date</label>

            <input
              type="date"
              value={to}
              min={from || undefined}
              onChange={(e) =>
                handleDateChange("to", e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* REQUEST TYPE */}
          <div>
            <label style={labelStyle}>Request Type</label>

            <FilterDropDown
              key={`type-${requestType}`}
              width={170}
              defaultLabel={requestType}
              options={[
                "All Types",
                "horoscope",
                "kundali",
                "palm_reading",
              ]}
              onSelect={handleTypeChange}
            />
          </div>

          {/* STATUS */}
          <div>
            <label style={labelStyle}>Status</label>

            <FilterDropDown
              key={`status-${status}`}
              width={150}
              defaultLabel={status}
              options={[
                "All Statuses",
                "pending",
                "success",
                "failure",
              ]}
              onSelect={handleStatusChange}
            />
          </div>

          <button
            onClick={handleReset}
            style={{
              padding: "10px 16px",
              background: colors.inputBg,
              color: colors.textSecondary,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 10,
              cursor: "pointer",
              height: 42,
            }}
          >
            Reset Filters
          </button>
        </div>

        {from && !to && (
          <p
            style={{
              color: colors.warning,
              fontSize: 12,
              marginTop: 12,
            }}
          >
            Please select the To Date to apply the custom date range.
          </p>
        )}

        <div
          style={{
            fontSize: 11,
            color: colors.textMuted,
            marginTop: 14,
          }}
        >
          <CalendarDays
            size={13}
            style={{
              display: "inline",
              marginRight: 6,
              verticalAlign: "middle",
            }}
          />
          Timezone: {dashboardData?.range?.timezone || "Asia/Kolkata"}
          {dashboardData?.range?.from &&
            ` | ${dashboardData.range.from} to ${dashboardData.range.to}`}
        </div>
      </div>

      {/* REQUEST LOGS */}
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 16,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 15,
            marginBottom: 10,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Request Logs
            </h3>

            <p
              style={{
                fontSize: 12,
                color: colors.textMuted,
              }}
            >
              {totalRecords.toLocaleString("en-IN")} total records
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {/* SEARCH */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: colors.inputBg,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 10,
                padding: "0 12px",
              }}
            >
              <Search size={16} color={colors.textMuted} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search requests..."
                style={{
                  background: "transparent",
                  color: colors.textPrimary,
                  border: "none",
                  outline: "none",
                  padding: "11px 0",
                  width: 190,
                  fontSize: 12,
                }}
              />
            </div>

            {/* LIMIT */}
            <FilterDropDown
              key={`limit-${limit}`}
              width={110}
              defaultLabel={`${limit} Rows`}
              options={["10 Rows", "25 Rows", "50 Rows", "100 Rows"]}
              onSelect={(value) => {
                setLimit(Number(value.split(" ")[0]));
                setPage(1);
              }}
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: 14,
              color: colors.danger,
              background: `${colors.danger}15`,
              borderRadius: 10,
              marginTop: 15,
              fontSize: 13,
            }}
          >
            <AlertCircle
              size={16}
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginRight: 8,
              }}
            />
            {error}
            <button
              onClick={fetchDashboard}
              style={{
                marginLeft: 12,
                color: colors.accent,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Retry
            </button>
          </div>
        )}

        <div style={{ overflowX: "auto" }}>
          <DataTable
            columns={columns}
            data={filteredRequests}
            loading={loading}
            paginationMode="server"
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* REQUEST DETAILS MODAL */}
      {selectedRequest && (
        <div
          onClick={() => setSelectedRequest(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: colors.overlay,
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 750,
              maxHeight: "85vh",
              overflowY: "auto",
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 22,
              }}
            >
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>
                  Request Details
                </h3>

                <p
                  style={{
                    fontSize: 11,
                    color: colors.textMuted,
                    marginTop: 5,
                  }}
                >
                  Complete API request information
                </p>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                style={{
                  border: `1px solid ${colors.cardBorder}`,
                  background: colors.inputBg,
                  color: colors.textPrimary,
                  borderRadius: 8,
                  padding: 8,
                  cursor: "pointer",
                }}
              >
                <X size={19} />
              </button>
            </div>

            {/* STATUS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
                padding: 15,
                background: colors.inputBg,
                borderRadius: 12,
                marginBottom: 20,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>
                  Request Type
                </div>

                <div style={{ fontWeight: 700, marginTop: 5 }}>
                  {getTypeLabel(selectedRequest.requestType)}
                </div>
              </div>

              <span
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  color: getStatusColor(selectedRequest.status),
                  background: `${getStatusColor(selectedRequest.status)}18`,
                  textTransform: "capitalize",
                }}
              >
                {selectedRequest.status}
              </span>
            </div>

            {/* DETAILS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 14,
                marginBottom: 22,
              }}
            >
              {[
                ["Request ID", selectedRequest.requestId],
                ["User ID", selectedRequest.userId],
                ["User Name", selectedRequest.userName || "-"],
                ["User Type", selectedRequest.userType],
                ["HTTP Method", selectedRequest.method],
                ["HTTP Status", selectedRequest.statusCode],
                ["Response Time", `${selectedRequest.responseTimeMs} ms`],
                ["Endpoint", selectedRequest.endpoint],
                ["Requested At", formatDate(selectedRequest.requestedAt)],
                ["Completed At", formatDate(selectedRequest.completedAt)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    padding: 13,
                    background: colors.inputBg,
                    borderRadius: 10,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      color: colors.textMuted,
                      fontSize: 11,
                      marginBottom: 7,
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {value ?? "-"}
                  </div>
                </div>
              ))}
            </div>

            {/* REQUEST DETAILS */}
            {selectedRequest.requestDetails && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={sectionHeadingStyle}>
                  Request Payload
                </h4>

                <pre style={jsonStyle}>
                  {JSON.stringify(
                    selectedRequest.requestDetails,
                    null,
                    2
                  )}
                </pre>
              </div>
            )}

            {/* RESPONSE DETAILS */}
            <div>
              <h4 style={sectionHeadingStyle}>
                Response Details
              </h4>

              <pre style={jsonStyle}>
                {JSON.stringify(
                  selectedRequest.responseDetails || {},
                  null,
                  2
                )}
              </pre>
            </div>

            <button
              onClick={() => setSelectedRequest(null)}
              style={{
                width: "100%",
                marginTop: 22,
                padding: 12,
                borderRadius: 10,
                border: "none",
                background: colors.gradientButton,
                color: colors.buttonText,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: colors.textSecondary,
  marginBottom: 8,
};

const inputStyle = {
  width: 160,
  height: 42,
  padding: "0 10px",
  background: colors.inputBg,
  color: colors.textPrimary,
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: 10,
  outline: "none",
  colorScheme: "dark",
};

const sectionHeadingStyle = {
  fontSize: 14,
  fontWeight: 700,
  marginBottom: 10,
  color: colors.accent,
};

const jsonStyle = {
  background: colors.inputBg,
  padding: 16,
  borderRadius: 10,
  color: colors.textSecondary,
  fontSize: 12,
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  lineHeight: 1.7,
};

export default RequestTrackingTable;

