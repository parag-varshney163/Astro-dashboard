import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

import DashboardLoader from "../ui/DashboardLoader";
import DailySpecialModal from "./DailySpecialModal";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";
import Button from "../ui/Button";


const DailySpecialTable = () => {
  const [dailySpecials, setDailySpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDailySpecial, setSelectedDailySpecial] = useState(null);

  const fetchDailySpecials = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/api/v1/daily-special", {
        params: {
          page,
          limit,
        },
      });

      if (data.success) {
        setDailySpecials(data.data.items || []);
        setTotal(data.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching Daily Specials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailySpecials();
  }, [page]);
  const handleAdd = () => {
    setSelectedDailySpecial(null);
    setModalOpen(true);
  };
  const handleEdit = (row) => {
    setSelectedDailySpecial(row);
    setModalOpen(true);
  };
  const handleModalSuccess = () => {
    fetchDailySpecials();
  };
  const handleDelete = async (row) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/daily-special/${row._id}`
      );

      if (data.success) {
        // If deleting the last item on the current page
        if (dailySpecials.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        } else {
          fetchDailySpecials();
        }
      }
    } catch (error) {
      console.error("Error deleting Daily Special", error);
    }
  };

  const columns = [
    {
      key: "imageUrl",
      label: "Banner",
      width: "120px",
      render: (value) => (
        <div className="flex justify-center">
          <img
            src={value}
            alt="Banner"
            style={{
              width: 70,
              height: 70,
              borderRadius: 12,
              objectFit: "cover",
              border: `1px solid ${colors.cardBorder}`,
            }}
          />
        </div>
      ),
    },

    {
      key: "title",
      label: "Title",
      width: "1.5fr",
      cellStyle: {
        justifyContent: "flex-start",
      },
    },

    {
      key: "subtitle",
      label: "Subtitle",
      width: "2fr",
      cellStyle: {
        justifyContent: "flex-start",
      },
    },

    {
      key: "ctaText",
      label: "CTA",
      width: "140px",
      render: (value) => (
        <span
          className="px-3 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: colors.secondary,
            color: colors.accent,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          {value}
        </span>
      ),
    },

    {
      key: "recurrence",
      label: "Type",
      width: "120px",
      render: (value) => (
        <span
          className="capitalize"
          style={{ color: colors.accent }}
        >
          {value}
        </span>
      ),
    },

    {
      key: "date",
      label: "Date",
      width: "170px",
      render: (value) =>
        value
          ? new Date(value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          : "-",
    },

    {
      key: "isActive",
      label: "Status",
      width: "120px",
      render: (value) => (
        <div className="flex justify-center">
          <span
            className="px-3 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: value ? colors.success : colors.danger,
              color: colors.primary,
            }}
          >
            {value ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      width: "150px",
      render: (_, row) => (
        <div
          className="flex justify-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleEdit(row)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: `1px solid ${colors.cardBorder}`,
              background: colors.secondary,
              color: colors.accent,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => handleDelete(row)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: `1px solid ${colors.danger}`,
              background: "transparent",
              color: colors.danger,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <DashboardLoader />;
  }

  return (
    <div
      className="rounded-3xl p-6 mt-8"
      style={{
        background: colors.gradientVertical,
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-semibold"
            style={{ color: colors.textPrimary }}
          >
            Daily{" "}
            <span style={{ color: colors.accent }}>
              Special
            </span>
          </h2>

          <p
            className="text-sm mt-1"
            style={{ color: colors.textSecondary }}
          >
            Manage Daily Special banners
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: colors.secondary,
              color: colors.accent,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            {total} Items
          </div>

          <Button icon={Plus} onClick={handleAdd}>
            Add Daily Special
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={dailySpecials}
        loading={loading}
        paginationMode="server"
        page={page}
        totalPages={Math.ceil(total / limit)}
        onPageChange={setPage}
      />
      <DailySpecialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={selectedDailySpecial}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default DailySpecialTable;
