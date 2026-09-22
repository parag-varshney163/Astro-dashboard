import { Eye, Heart, Share2, Clock3, Bookmark, Bell, Layers3, Activity, RefreshCw, Search, Play, X, TrendingUp, BarChart3, ChevronDown, ChevronUp, } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";
import Button from "../ui/Button";


// ============================================================
// API ENDPOINT
// ============================================================

const STATS_ENDPOINT = "/api/v1/reels/stats";

// ============================================================
// HELPERS
// ============================================================

const formatNumber = (value) => {
  if (value === null || value === undefined) return "0";

  return Number(value).toLocaleString("en-IN");
};

const formatDuration = (seconds) => {
  if (!seconds || Number(seconds) <= 0) {
    return "0s";
  }

  const totalSeconds = Math.round(Number(seconds));

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
};

const formatHours = (hours) => {
  if (hours === null || hours === undefined) {
    return "0h";
  }

  return `${Number(hours).toFixed(2)}h`;
};

const formatPercentage = (value) => {
  if (value === null || value === undefined) {
    return "0%";
  }

  return `${Number(value).toFixed(2)}%`;
};

const capitalize = (value) => {
  if (!value) return "-";

  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// ============================================================
// COMPONENT
// ============================================================

const ReelsOverview = () => {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("topViewed");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedReel, setSelectedReel] = useState(null);

  // ==========================================================
  // STAT CARDS COLLAPSE
  // ==========================================================

  // Default is collapsed
  const [showStatCards, setShowStatCards] = useState(false);
  const [showStatusBreakdown, setShowStatusBreakdown] = useState(false);

  // ==========================================================
  // FETCH STATS
  // ==========================================================

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await axiosInstance.get(STATS_ENDPOINT);

      if (response?.data?.success) {
        setStats(response.data.data || null);
      } else {
        setError(
          response?.data?.message ||
            "Failed to fetch reel statistics."
        );
      }
    } catch (err) {
      console.error("Fetch reel stats error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch reel statistics."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ==========================================================
  // CURRENT LIST
  // ==========================================================

  const currentList = useMemo(() => {
    if (!stats) return [];

    return stats[activeTab] || [];
  }, [stats, activeTab]);

  // ==========================================================
  // FILTER OPTIONS
  // ==========================================================

  const categories = useMemo(() => {
    const values = currentList
      .map((item) => item.category)
      .filter(Boolean);

    return ["all", ...new Set(values)];
  }, [currentList]);

  // ==========================================================
  // FILTERED DATA
  // ==========================================================

  const filteredData = useMemo(() => {
    return currentList.filter((reel) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        reel.title
          ?.toLowerCase()
          .includes(searchValue) ||
        reel.category
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        categoryFilter === "all" ||
        reel.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        reel.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    currentList,
    search,
    categoryFilter,
    statusFilter,
  ]);

  // ==========================================================
  // TABLE COLUMNS
  // ==========================================================

  const columns = [
    {
      key: "title",
      label: "Reel",
      width: "2fr",
      cellStyle: {
        justifyContent: "flex-start",
        textAlign: "left",
      },

      render: (value, row) => (
        <div
          className="flex items-center gap-3 w-full"
          style={{
            minWidth: 0,
          }}
        >
          {/* THUMBNAIL */}

          <div
            style={{
              width: 52,
              height: 64,
              flexShrink: 0,
              borderRadius: 10,
              overflow: "hidden",
              background: colors.secondary,
              border: `1px solid ${colors.cardBorder}`,
              position: "relative",
            }}
          >
            {row.thumbnailUrl ? (
              <img
                src={row.thumbnailUrl}
                alt={value || "Reel"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.textMuted,
                }}
              >
                <Play size={18} />
              </div>
            )}

            {/* PLAY ICON */}

            {row.thumbnailUrl && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.18)",
                }}
              >
                <div
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.55)",
                  }}
                >
                  <Play
                    size={12}
                    fill="white"
                    color="white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* TITLE */}

          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={{
                color: colors.textPrimary,
                fontSize: 14,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 250,
              }}
            >
              {value || "-"}
            </div>

            <div
              style={{
                marginTop: 5,
                color: colors.textMuted,
                fontSize: 11,
              }}
            >
              ID: {row._id || "-"}
            </div>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",

      render: (value) => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 10px",
            borderRadius: 8,
            background: colors.secondary,
            border: `1px solid ${colors.cardBorder}`,
            color: colors.accent,
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {capitalize(value)}
        </span>
      ),
    },

    {
      key: "durationSeconds",
      label: "Duration",

      render: (value) => (
        <div
          className="flex items-center gap-2"
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <Clock3 size={14} />

          {formatDuration(value)}
        </div>
      ),
    },

    {
      key: "viewCount",
      label: "Views",

      render: (value) => (
        <div
          className="flex items-center gap-2"
          style={{
            color: colors.textPrimary,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <Eye
            size={15}
            color={colors.accent}
          />

          {formatNumber(value)}
        </div>
      ),
    },

    {
      key: "likeCount",
      label: "Likes",

      render: (value) => (
        <div
          className="flex items-center gap-2"
          style={{
            color: colors.textPrimary,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <Heart
            size={15}
            color={colors.danger}
          />

          {formatNumber(value)}
        </div>
      ),
    },

    {
      key: "shareCount",
      label: "Shares",

      render: (value) => (
        <div
          className="flex items-center gap-2"
          style={{
            color: colors.textPrimary,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <Share2
            size={15}
            color={colors.success}
          />

          {formatNumber(value)}
        </div>
      ),
    },

    {
      key: "status",
      label: "Status",

      render: (value) => {
        const isActive = value === "active";

        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 10px",
              borderRadius: 8,
              background: isActive
                ? "rgba(34,197,94,0.12)"
                : "rgba(239,68,68,0.12)",
              border: `1px solid ${
                isActive
                  ? "rgba(34,197,94,0.30)"
                  : "rgba(239,68,68,0.30)"
              }`,
              color: isActive
                ? colors.success
                : colors.danger,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {capitalize(value)}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "Action",
      width: "90px",

      render: (_, row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedReel(row);
          }}
          title="View Reel Stats"
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: `1px solid ${colors.cardBorder}`,
            background: colors.secondary,
            color: colors.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <BarChart3 size={16} />
        </button>
      ),
    },
  ];

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div
        className="rounded-3xl p-8 mt-8"
        style={{
          background: colors.gradientVertical,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            minHeight: 300,
            color: colors.textSecondary,
          }}
        >
          Loading reel statistics...
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div
        className="rounded-3xl p-6 mt-8"
        style={{
          background: colors.gradientVertical,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div
          style={{
            padding: 20,
            borderRadius: 14,
            background: "rgba(239,68,68,0.10)",
            border: "1px solid rgba(239,68,68,0.30)",
            color: colors.danger,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Failed to load reel statistics
          </div>

          <div
            style={{
              fontSize: 13,
              marginBottom: 15,
            }}
          >
            {error}
          </div>

          <Button
            icon={RefreshCw}
            onClick={() => fetchStats()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  // ==========================================================
  // STAT CARDS
  // ==========================================================

  const statCards = [
    {
      title: "Total Reels",
      value: formatNumber(stats.totalReels),
      icon: Play,
      subtitle: `${formatNumber(
        stats.totalCategories
      )} categories`,
    },

    {
      title: "Total Views",
      value: formatNumber(stats.totalViews),
      icon: Eye,
      subtitle: `${formatNumber(
        stats.avgViewsPerReel
      )} avg / reel`,
    },

    {
      title: "Total Likes",
      value: formatNumber(stats.totalLikes),
      icon: Heart,
      subtitle: formatPercentage(
        stats.likeRatePct
      ),
    },

    {
      title: "Total Shares",
      value: formatNumber(stats.totalShares),
      icon: Share2,
      subtitle: formatPercentage(
        stats.shareRatePct
      ),
    },

    {
      title: "Watch Time",
      value: formatHours(
        stats.estimatedWatchTimeHours
      ),
      icon: Clock3,
      subtitle: `${formatNumber(
        stats.estimatedWatchTimeSeconds
      )} seconds`,
    },

    {
      title: "Total Saves",
      value: formatNumber(stats.totalSaves),
      icon: Bookmark,
      subtitle: "Lifetime",
    },

    {
      title: "Reminders",
      value: formatNumber(
        stats.totalReminders
      ),
      icon: Bell,
      subtitle: "Lifetime",
    },

    {
      title: "Categories",
      value: formatNumber(
        stats.totalCategories
      ),
      icon: Layers3,
      subtitle: "Reel categories",
    },
  ];

  // ==========================================================
  // STATUS BREAKDOWN
  // ==========================================================

  const statusBreakdown = [
    {
      label: "Active",
      value:
        stats.statusBreakdown?.active || 0,
      color: colors.success,
    },

    {
      label: "Processing",
      value:
        stats.statusBreakdown?.processing || 0,
      color: colors.accent,
    },

    {
      label: "Inactive",
      value:
        stats.statusBreakdown?.inactive || 0,
      color: colors.textMuted,
    },

    {
      label: "Failed",
      value:
        stats.statusBreakdown?.failed || 0,
      color: colors.danger,
    },
  ];

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <div
      className="rounded-3xl p-6 mt-8"
      style={{
        background: colors.gradientVertical,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: `0 0 10px ${colors.shadow}`,
      }}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2
            className="text-2xl font-semibold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Reel{" "}
            <span
              style={{
                color: colors.accent,
              }}
            >
              Statistics
            </span>
          </h2>

          <p
            className="text-sm mt-1"
            style={{
              color: colors.textSecondary,
            }}
          >
            Monitor reel performance, engagement
            and content metrics.
          </p>
        </div>

        <Button
          icon={RefreshCw}
          onClick={() => fetchStats(true)}
          disabled={refreshing}
        >
          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </Button>
      </div>

      {/* ======================================================
          COLLAPSIBLE STAT CARDS
      ====================================================== */}

      <div
        className="rounded-2xl p-5 mb-6"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        {/* SECTION HEADER */}

        <div
          className="flex items-center justify-between"
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            setShowStatCards((prev) => !prev)
          }
        >
          <div className="flex items-center gap-2">
            <BarChart3
              size={17}
              color={colors.accent}
            />

            <div>
              <div
                style={{
                  color: colors.textPrimary,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Reel Overview
              </div>

              <div
                style={{
                  marginTop: 3,
                  color: colors.textMuted,
                  fontSize: 11,
                }}
              >
                Overall reel performance statistics
              </div>
            </div>
          </div>

          {/* EXPAND / COLLAPSE */}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              setShowStatCards(
                (prev) => !prev
              );
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 12px",
              borderRadius: 9,
              border: `1px solid ${colors.cardBorder}`,
              background: colors.secondary,
              color: colors.accent,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {showStatCards ? (
              <>
                <ChevronUp size={15} />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown size={15} />
                Expand
              </>
            )}
          </button>
        </div>

        {/* STAT CARDS */}

        {showStatCards && (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              marginTop: 20,
            }}
          >
            {statCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl p-4"
                  style={{
                    background:
                      colors.secondary,
                    border: `1px solid ${colors.cardBorder}`,
                    transition:
                      "transform 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-2px)";

                    e.currentTarget.style.borderColor =
                      colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";

                    e.currentTarget.style.borderColor =
                      colors.cardBorder;
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background:
                          colors.cardBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        size={18}
                        color={colors.accent}
                      />
                    </div>

                    <TrendingUp
                      size={15}
                      color={colors.success}
                    />
                  </div>

                  <div
                    className="mt-4"
                    style={{
                      color: colors.textPrimary,
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </div>

                  <div
                    className="mt-1"
                    style={{
                      color: colors.textSecondary,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    className="mt-1"
                    style={{
                      color: colors.textMuted,
                      fontSize: 10,
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================
          STATUS BREAKDOWN
      ====================================================== */}

      {/* <div
        className="rounded-2xl p-5 mb-6"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity
            size={17}
            color={colors.accent}
          />

          <span
            style={{
              color: colors.textPrimary,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Reel Status
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statusBreakdown.map((status) => (
            <div
              key={status.label}
              className="rounded-xl px-4 py-3"
              style={{
                background: colors.secondary,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  style={{
                    color: colors.textSecondary,
                    fontSize: 12,
                  }}
                >
                  {status.label}
                </span>

                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: status.color,
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 6,
                  color: colors.textPrimary,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {formatNumber(status.value)}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* ======================================================
    STATUS BREAKDOWN COLLAPSIBLE
====================================================== */}

<div
  className="rounded-2xl p-5 mb-6"
  style={{
    background: colors.cardBg,
    border: `1px solid ${colors.cardBorder}`,
  }}
>
  {/* HEADER */}

  <div
    className="flex items-center justify-between"
    style={{
      cursor: "pointer",
    }}
    onClick={() =>
      setShowStatusBreakdown((prev) => !prev)
    }
  >
    <div className="flex items-center gap-2">
      <Activity
        size={17}
        color={colors.accent}
      />

      <div>
        <div
          style={{
            color: colors.textPrimary,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Reel Status Breakdown
        </div>

        <div
          style={{
            marginTop: 3,
            color: colors.textMuted,
            fontSize: 11,
          }}
        >
          Active, inactive and processing reel count
        </div>
      </div>
    </div>


    {/* EXPAND BUTTON */}

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();

        setShowStatusBreakdown(
          (prev) => !prev
        );
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 12px",
        borderRadius: 9,
        border: `1px solid ${colors.cardBorder}`,
        background: colors.secondary,
        color: colors.accent,
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {showStatusBreakdown ? (
        <>
          <ChevronUp size={15} />
          Collapse
        </>
      ) : (
        <>
          <ChevronDown size={15} />
          Expand
        </>
      )}
    </button>
  </div>


  {/* CONTENT */}

  {showStatusBreakdown && (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
      style={{
        marginTop: 20,
      }}
    >
      {statusBreakdown.map((status) => (
        <div
          key={status.label}
          className="rounded-xl px-4 py-3"
          style={{
            background: colors.secondary,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          <div
            className="flex items-center justify-between"
          >
            <span
              style={{
                color: colors.textSecondary,
                fontSize: 12,
              }}
            >
              {status.label}
            </span>

            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: status.color,
              }}
            />
          </div>


          <div
            style={{
              marginTop: 6,
              color: colors.textPrimary,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {formatNumber(status.value)}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      {/* ======================================================
          TOP PERFORMING SECTION
      ====================================================== */}

      <div
        className="rounded-2xl p-5"
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        {/* SECTION HEADER */}

        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h3
              style={{
                color: colors.textPrimary,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Top Performing Reels
            </h3>

            <p
              style={{
                color: colors.textMuted,
                fontSize: 11,
                marginTop: 3,
              }}
            >
              Explore your highest performing
              content.
            </p>
          </div>

          <div
            style={{
              padding: "7px 11px",
              borderRadius: 8,
              background: colors.secondary,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.accent,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {filteredData.length} Reels
          </div>
        </div>

        {/* ====================================================
            TABS
        ==================================================== */}

        <div
          className="flex gap-2 mb-5 overflow-x-auto"
          style={{
            paddingBottom: 2,
          }}
        >
          {[
            {
              key: "topViewed",
              label: "Top Viewed",
              icon: Eye,
            },
            {
              key: "topLiked",
              label: "Top Liked",
              icon: Heart,
            },
            {
              key: "topShared",
              label: "Top Shared",
              icon: Share2,
            },
          ].map((tab) => {
            const Icon = tab.icon;

            const active =
              activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                  setSearch("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 14px",
                  borderRadius: 9,
                  border: `1px solid ${
                    active
                      ? colors.accent
                      : colors.cardBorder
                  }`,
                  background: active
                    ? colors.accent
                    : colors.secondary,
                  color: active
                    ? colors.primary
                    : colors.textSecondary,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                <Icon size={14} />

                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ====================================================
            FILTERS
        ==================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          {/* SEARCH */}

          <div
            style={{
              position: "relative",
            }}
          >
            <Search
              size={16}
              color={colors.textMuted}
              style={{
                position: "absolute",
                left: 12,
                top: 12,
              }}
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search reels..."
              style={{
                width: "100%",
                height: 40,
                paddingLeft: 38,
                paddingRight: 12,
                borderRadius: 9,
                border: `1px solid ${colors.inputBorder}`,
                background: colors.inputBg,
                color: colors.textPrimary,
                outline: "none",
                fontSize: 12,
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* CATEGORY */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: 40,
              padding: "0 12px",
              borderRadius: 9,
              border: `1px solid ${colors.inputBorder}`,
              background: colors.inputBg,
              color: colors.textPrimary,
              outline: "none",
              fontSize: 12,
            }}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category === "all"
                  ? "All Categories"
                  : capitalize(category)}
              </option>
            ))}
          </select>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            style={{
              width: "100%",
              height: 40,
              padding: "0 12px",
              borderRadius: 9,
              border: `1px solid ${colors.inputBorder}`,
              background: colors.inputBg,
              color: colors.textPrimary,
              outline: "none",
              fontSize: 12,
            }}
          >
            <option value="all">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="processing">
              Processing
            </option>

            <option value="failed">
              Failed
            </option>
          </select>
        </div>

        {/* ====================================================
            TABLE
        ==================================================== */}

        {filteredData.length === 0 ? (
          <div
            className="py-12 text-center"
            style={{
              color: colors.textSecondary,
            }}
          >
            <BarChart3
              size={30}
              color={colors.textMuted}
              style={{
                margin: "0 auto 10px",
              }}
            />

            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              No reels found
            </div>

            <div
              style={{
                fontSize: 11,
                marginTop: 4,
                color: colors.textMuted,
              }}
            >
              Try changing your search or filters.
            </div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
          />
        )}
      </div>

      {/* ======================================================
          NOTE
      ====================================================== */}

      {stats.note && (
        <div
          className="mt-4 rounded-xl px-4 py-3"
          style={{
            background: colors.secondary,
            border: `1px solid ${colors.cardBorder}`,
            color: colors.textMuted,
            fontSize: 11,
            lineHeight: 1.6,
          }}
        >
          <strong
            style={{
              color: colors.textSecondary,
            }}
          >
            Note:
          </strong>{" "}
          {stats.note}
        </div>
      )}

      {/* ======================================================
          REEL DETAIL MODAL
      ====================================================== */}

      {selectedReel && (
        <div
          onClick={() => setSelectedReel(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: colors.overlay,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: 500,
              borderRadius: 22,
              background: colors.gradientCard,
              border: `1px solid ${colors.cardBorder}`,
              boxShadow:
                "0 20px 70px rgba(0,0,0,.55)",
              overflow: "hidden",
            }}
          >
            {/* MODAL HEADER */}

            <div
              style={{
                padding: "18px 20px",
                borderBottom: `1px solid ${colors.cardBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    color: colors.textPrimary,
                    fontSize: 17,
                    fontWeight: 700,
                  }}
                >
                  Reel Performance
                </div>

                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: 11,
                    marginTop: 3,
                  }}
                >
                  Detailed engagement metrics
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedReel(null)
                }
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: `1px solid ${colors.cardBorder}`,
                  background: colors.secondary,
                  color: colors.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div style={{ padding: 20 }}>
              <div
                className="flex gap-4"
                style={{
                  marginBottom: 20,
                }}
              >
                {/* IMAGE */}

                <div
                  style={{
                    width: 100,
                    height: 130,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: colors.secondary,
                    border: `1px solid ${colors.cardBorder}`,
                    flexShrink: 0,
                  }}
                >
                  {selectedReel.thumbnailUrl ? (
                    <img
                      src={
                        selectedReel.thumbnailUrl
                      }
                      alt={
                        selectedReel.title
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.textMuted,
                      }}
                    >
                      <Play size={24} />
                    </div>
                  )}
                </div>

                {/* INFO */}

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      color: colors.textPrimary,
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {selectedReel.title ||
                      "-"}
                  </h4>

                  <div
                    style={{
                      marginTop: 8,
                      color: colors.accent,
                      fontSize: 12,
                    }}
                  >
                    {capitalize(
                      selectedReel.category
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      color: colors.textSecondary,
                      fontSize: 12,
                    }}
                  >
                    Duration:{" "}
                    {formatDuration(
                      selectedReel.durationSeconds
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      color:
                        selectedReel.status ===
                        "active"
                          ? colors.success
                          : colors.danger,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {capitalize(
                      selectedReel.status
                    )}
                  </div>
                </div>
              </div>

              {/* METRICS */}

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Views",
                    value:
                      selectedReel.viewCount,
                    icon: Eye,
                    color:
                      colors.accent,
                  },

                  {
                    label: "Likes",
                    value:
                      selectedReel.likeCount,
                    icon: Heart,
                    color:
                      colors.danger,
                  },

                  {
                    label: "Shares",
                    value:
                      selectedReel.shareCount,
                    icon: Share2,
                    color:
                      colors.success,
                  },

                  {
                    label: "Like Rate",
                    value:
                      selectedReel.viewCount
                        ? `${(
                            (selectedReel.likeCount /
                              selectedReel.viewCount) *
                            100
                          ).toFixed(2)}%`
                        : "0%",
                    icon: TrendingUp,
                    color:
                      colors.accent,
                  },
                ].map((metric) => {
                  const Icon = metric.icon;

                  return (
                    <div
                      key={metric.label}
                      style={{
                        padding: 14,
                        borderRadius: 12,
                        background:
                          colors.secondary,
                        border: `1px solid ${colors.cardBorder}`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          size={15}
                          color={metric.color}
                        />

                        <span
                          style={{
                            color:
                              colors.textMuted,
                            fontSize: 11,
                          }}
                        >
                          {metric.label}
                        </span>
                      </div>

                      <div
                        style={{
                          marginTop: 7,
                          color:
                            colors.textPrimary,
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        {metric.label ===
                        "Like Rate"
                          ? metric.value
                          : formatNumber(
                              metric.value
                            )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelsOverview;