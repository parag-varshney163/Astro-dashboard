import { Edit2, Eye, Image as ImageIcon, Languages, Plus, Trash2, X, } from "lucide-react";
import React, { useEffect, useState } from "react";

import CreateHomeBannerModal from "./CreateHomeBannerModal";
import DashboardLoader from "../ui/DashboardLoader";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";
import Button from "../ui/Button";


const ReelsCategoryTable = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [showTranslations, setShowTranslations] = useState(false);
  const [translationBanner, setTranslationBanner] = useState(null);


  // =========================
  // FETCH BANNERS
  // =========================

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        "/api/v1/home-banners"
      );

      if (data.success) {
        setBanners(data?.data?.items || []);
      }
    } catch (error) {
      console.error("Error fetching home banners:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBanners();
  }, []);


  // =========================
  // CREATE
  // =========================

  const handleCreate = () => {
    setSelectedBanner(null);
    setOpenModal(true);
  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setOpenModal(true);
  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = async (banner) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${banner?.title}"?`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(true);

      const response = await axiosInstance.delete(
        `/api/v1/home-banners/${banner._id}`
      );

      if (response.data?.success) {
        await fetchBanners();
      } else {
        alert(
          response.data?.message ||
            "Failed to delete home banner."
        );
      }
    } catch (error) {
      console.error("Delete home banner error:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete home banner."
      );
    } finally {
      setDeleteLoading(false);
    }
  };


  // =========================
  // TRANSLATIONS
  // =========================

  const handleTranslations = (banner) => {
    setTranslationBanner(banner);
    setShowTranslations(true);
  };


  // =========================
  // TABLE COLUMNS
  // =========================

  const columns = [
    // =========================
    // BANNER
    // =========================

    {
      key: "title",
      label: "Banner",
      width: "1.5fr",

      cellStyle: {
        justifyContent: "flex-start",
        textAlign: "left",
      },

      render: (value, row) => (
        <div className="flex items-center gap-3 w-full">

          {/* DEFAULT IMAGE */}
          <div
            className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0"
            style={{
              background: colors.secondary,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            {row.imageUrl ? (
              <img
                src={row.imageUrl}
                alt={value}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  color: colors.textSecondary,
                }}
              >
                <ImageIcon size={16} />
              </div>
            )}
          </div>

          {/* SELECTED IMAGE */}
          <div
            className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0"
            style={{
              background: colors.secondary,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            {row.selectedImageUrl ? (
              <img
                src={row.selectedImageUrl}
                alt={`${value} selected`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  color: colors.textSecondary,
                }}
              >
                <ImageIcon size={16} />
              </div>
            )}
          </div>

          {/* TITLE */}
          <div className="min-w-0">

            <div
              className="font-semibold"
              style={{
                color: colors.textPrimary,
              }}
            >
              {value || "-"}
            </div>

            <div
              className="text-xs mt-1"
              style={{
                color: colors.textSecondary,
              }}
            >
              {row.key || "-"}
            </div>

          </div>
        </div>
      ),
    },


    // =========================
    // ORDER
    // =========================

    {
      key: "sortOrder",
      label: "Order",

      render: (value) => (
        <span
          className="px-3 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: colors.secondary,
            color: colors.accent,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          {value ?? "-"}
        </span>
      ),
    },


    // =========================
    // DEFAULT
    // =========================

    {
      key: "isDefault",
      label: "Default",

      render: (value) => (
        <div className="flex justify-center">

          <span
            className="px-3 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: value
                ? colors.accent
                : colors.secondary,

              color: value
                ? colors.primary
                : colors.textSecondary,

              border: `1px solid ${
                value
                  ? colors.accent
                  : colors.cardBorder
              }`,
            }}
          >
            {value ? "Default" : "No"}
          </span>

        </div>
      ),
    },


    // =========================
    // STATUS
    // =========================

    {
      key: "isActive",
      label: "Status",

      render: (value) => (
        <div className="flex justify-center">

          <span
            className="px-3 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: value
                ? colors.success
                : colors.danger,

              color: colors.primary,
            }}
          >
            {value ? "Active" : "Inactive"}
          </span>

        </div>
      ),
    },


    // =========================
    // LANGUAGES
    // =========================

    {
      key: "translationsByLang",
      label: "Translations",

      render: (_, row) => {

        const translationCount = Object.keys(
          row.translationsByLang || {}
        ).length;

        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleTranslations(row);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              border: "none",
              background: "transparent",
              color: colors.accent,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <Languages size={15} />

            {translationCount}
          </button>
        );
      },
    },


    // =========================
    // ACTIONS
    // =========================

    {
      key: "actions",
      label: "Action",
      width: "1.2fr",
      align: "center",

      render: (_, row) => (
        <div
          className="flex items-center justify-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >

          {/* VIEW TRANSLATIONS */}

          <button
            type="button"
            onClick={() => handleTranslations(row)}
            disabled={deleteLoading}
            title="View Translations"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: `1px solid ${colors.cardBorder}`,
              background: colors.secondary,
              color: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: deleteLoading
                ? "not-allowed"
                : "pointer",
              opacity: deleteLoading ? 0.5 : 1,
            }}
          >
            <Eye size={16} />
          </button>


          {/* EDIT */}

          <button
            type="button"
            onClick={() => handleEdit(row)}
            disabled={deleteLoading}
            title="Edit Banner"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: `1px solid ${colors.cardBorder}`,
              background: colors.secondary,
              color: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: deleteLoading
                ? "not-allowed"
                : "pointer",
              opacity: deleteLoading ? 0.5 : 1,
            }}
          >
            <Edit2 size={16} />
          </button>


          {/* DELETE */}

          <button
            type="button"
            onClick={() => handleDelete(row)}
            disabled={deleteLoading}
            title="Delete Banner"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: `1px solid ${colors.danger}`,
              background: "transparent",
              color: colors.danger,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: deleteLoading
                ? "not-allowed"
                : "pointer",
              opacity: deleteLoading ? 0.5 : 1,
            }}
          >
            <Trash2 size={16} />
          </button>

        </div>
      ),
    },
  ];


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <DashboardLoader />;
  }


  // =========================
  // UI
  // =========================

  return (
    <div
      className="rounded-3xl p-6 mt-8"
      style={{
        background: colors.gradientVertical,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: `0 0 10px ${colors.shadow}`,
      }}
    >

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2
            className="text-2xl font-semibold"
            style={{
              color: colors.textPrimary,
            }}
          >
            Home{" "}
            <span style={{ color: colors.accent }}>
              Banners
            </span>
          </h2>

          <p
            className="text-sm mt-1"
            style={{
              color: colors.textSecondary,
            }}
          >
            Manage home screen banners and their
            translations
          </p>

        </div>


        <div className="flex items-center gap-3">

          {/* COUNT */}

          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: colors.secondary,
              color: colors.accent,
              border: `1px solid ${colors.cardBorder}`,
            }}
          >
            {banners.length} Banners
          </div>


          {/* CREATE */}

          <Button
            icon={Plus}
            onClick={handleCreate}
          >
            Create Banner
          </Button>

        </div>

      </div>


      {/* TABLE */}

      {banners.length === 0 ? (

        <div
          className="text-center py-10"
          style={{
            color: colors.textSecondary,
          }}
        >
          No home banners found.
        </div>

      ) : (

        <DataTable
          columns={columns}
          data={banners}
        />

      )}


      {/* CREATE / EDIT MODAL */}

      <CreateHomeBannerModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedBanner(null);
        }}
        onSuccess={fetchBanners}
        banner={selectedBanner}
      />


      {/* TRANSLATIONS MODAL */}

      {showTranslations && translationBanner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: colors.overlay,
          }}
          onClick={() => {
            setShowTranslations(false);
            setTranslationBanner(null);
          }}
        >

          <div
            className="w-full max-w-lg rounded-2xl p-6"
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between mb-5">

              <div>

                <h3
                  className="text-xl font-semibold"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  Translations
                </h3>

                <p
                  className="text-xs mt-1"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  {translationBanner.title}
                </p>

              </div>


              <button
                type="button"
                onClick={() => {
                  setShowTranslations(false);
                  setTranslationBanner(null);
                }}
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


            {/* TRANSLATIONS */}

            <div className="flex flex-col gap-2">

              {Object.entries(
                translationBanner.translationsByLang || {}
              ).length > 0 ? (

                Object.entries(
                  translationBanner.translationsByLang || {}
                ).map(([language, translation]) => (

                  <div
                    key={language}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg"
                    style={{
                      background: colors.secondary,
                      border: `1px solid ${colors.cardBorder}`,
                    }}
                  >

                    <span
                      className="text-xs font-semibold uppercase"
                      style={{
                        color: colors.accent,
                      }}
                    >
                      {language}
                    </span>

                    <span
                      className="text-sm"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      {translation?.title || "-"}
                    </span>

                  </div>

                ))

              ) : (

                <div
                  className="text-center py-8"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  No translations found.
                </div>

              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ReelsCategoryTable;


