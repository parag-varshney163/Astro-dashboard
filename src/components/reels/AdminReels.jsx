import { Pencil, Trash2, Plus, PinOff, Pin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Play, Eye, Heart, } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import FilterDropDown from "../ui/FilterDropDown";
import colors from "../../constants/colors";
import ReelPinModal from "./ReelPinModal";
import DataTable from "../ui/DataTable";
import ReelModal from "./ReelModal";


const AdminReels = () => {

    const [reels, setReels] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [selectedReel, setSelectedReel] = useState(null);
    const [pinModal, setPinModal] = useState({
        open: false,
        mode: "pin",
        reel: null,
    });
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedReelIds, setSelectedReelIds] = useState([]);
    const [bulkDeleting, setBulkDeleting] = useState(false);
    const fetchCategories = async () => {
        try {
            const { data } = await axiosInstance.get(
                "/api/v1/home-banners"
            );

            const items = data?.data?.items || [];

            setCategoryOptions(
                items.map((item) => ({
                    label: item.title,
                    value: item.key,
                }))
            );
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    //     const fetchReels = async () => {
    //         try {

    //             setLoading(true);
    //             setError(null);

    //             const { data } = await axiosInstance.get(
    //                 "/api/v1/admin-reels",
    //                 {
    //                     params: {
    //                         page,
    //                         limit: 10
    //                     }
    //                 }
    //             );


    //             //setReels(data.data.items || []);
    //             setReels(
    //     (data.data.items || []).filter(
    //         (reel) => !reel.isDeleted
    //     )
    // );
    //             setCount(data.data.total);

    //             setTotalPages(
    //                 Math.ceil(
    //                     data.data.total / data.data.limit
    //                 )
    //             );


    //         } catch (err) {

    //             setError(
    //                 err?.response?.data?.message ||
    //                 "Failed to fetch reels"
    //             );

    //         } finally {

    //             setLoading(false);

    //         }
    //     };

    const fetchReels = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                page,
                limit: 10,
            };

            if (selectedCategory !== "All Categories") {
                const category = categoryOptions.find(
                    (item) => item.label === selectedCategory
                );

                if (category) {
                    params.categories = category.value;
                }
            }

            const { data } = await axiosInstance.get(
                "/api/v1/admin-reels",
                { params }
            );

            const items = (data?.data?.items || []).filter(
                (reel) => !reel.isDeleted
            );

            setReels(items);
            setCount(data?.data?.total || 0);

            setTotalPages(
                Math.ceil((data?.data?.total || 0) / (data?.data?.limit || 10))
            );
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to fetch reels"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReels();
    }, [page, selectedCategory]);

    const toggleReelSelection = (id) => {
        setSelectedReelIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const currentPageIds = reels.map((reel) => reel._id);

        const allSelected =
            currentPageIds.length > 0 &&
            currentPageIds.every((id) => selectedReelIds.includes(id));

        if (allSelected) {
            // Deselect reels on the current page only
            setSelectedReelIds((prev) =>
                prev.filter((id) => !currentPageIds.includes(id))
            );
        } else {
            // Select all reels on the current page
            setSelectedReelIds((prev) =>
                [...new Set([...prev, ...currentPageIds])]
            );
        }
    };
    const handleBulkDelete = async () => {
        if (selectedReelIds.length === 0) return;

        const confirmed = window.confirm(
            `Are you sure you want to delete ${selectedReelIds.length} selected reel(s)?`
        );

        if (!confirmed) return;

        try {
            setBulkDeleting(true);
            setError(null);

            await axiosInstance.delete("/api/v1/admin-reels/bulk", {
                data: {
                    ids: selectedReelIds,
                },
            });

            setSelectedReelIds([]);
            await fetchReels();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to delete selected reels"
            );
        } finally {
            setBulkDeleting(false);
        }
    };

    const columns = [
        {
            key: "selection",
            label: "Select",
            width: "80px",

            render: (_, row) => (
                <input
                    type="checkbox"
                    checked={selectedReelIds.includes(row._id)}
                    onChange={() => toggleReelSelection(row._id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: 17,
                        height: 17,
                        accentColor: colors.accent,
                        cursor: "pointer",
                    }}
                    aria-label={`Select ${row.title || "reel"}`}
                />
            ),
        },
        {
            key: "thumbnailUrl",
            label: "Preview",
            width: "100px",

            render: (value, row) => (
                <div
                    className="relative"
                    style={{
                        width: 70,
                        height: 70
                    }}
                >

                    <img
                        src={value}
                        alt={row.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 12,
                            objectFit: "cover",
                            border:
                                `1px solid ${colors.cardBorder}`
                        }}
                    />


                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVideo(row.videoUrl);
                        }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            margin: "auto",
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: colors.accent,
                            color: "#000",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Play size={15} />
                    </button>

                </div>
            )
        },


        {
            key: "title",
            label: "Title",
            width: "1.5fr",

            render: (value, row) => (
                <div className="flex flex-col text-left" style={{ width: "100%" }}>

                    <span
                        style={{
                            color: colors.textPrimary,
                            fontWeight: 600
                        }}
                    >
                        {value}
                    </span>

                    <span
                        style={{
                            color: colors.textMuted,
                            fontSize: 12
                        }}
                    >
                        {row.description}
                    </span>

                </div>
            )
        },


        // {
        //     key: "category",
        //     label: "Category",

        //     render: (value) => (
        //         <span
        //             style={{
        //                 padding: "5px 12px",
        //                 borderRadius: 20,
        //                 background: colors.hover,
        //                 color: colors.accentLight,
        //                 fontSize: 12
        //             }}
        //         >
        //             {value}
        //         </span>
        //     )
        // },
        {
            key: "categories",
            label: "Categories",

            render: (value, row) => {
                const categories = row.categories || (row.category ? [row.category] : []);

                return (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                        }}
                    >
                        {categories.map((category) => (
                            <span
                                key={category}
                                style={{
                                    padding: "5px 10px",
                                    borderRadius: 20,
                                    background: colors.hover,
                                    color: colors.accentLight,
                                    fontSize: 12,
                                }}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                );
            },
        },

        {
            key: "pins",
            label: "Pins",

            render: (value, row) => {
                const pins = row.pins || [];

                if (pins.length === 0) {
                    return (
                        <span
                            style={{
                                padding: "5px 10px",
                                borderRadius: 20,
                                background: colors.hover,
                                color: colors.textMuted,
                                fontSize: 12,
                                whiteSpace: "nowrap",
                            }}
                        >
                            Not Pinned
                        </span>
                    );
                }

                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            alignItems: "flex-start",
                        }}
                    >
                        {pins.map((pin, index) => (
                            <div
                                key={`${pin.category}-${index}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "6px 10px",
                                    borderRadius: 10,
                                    background: `${colors.accent}15`,
                                    border: `1px solid ${colors.accent}50`,
                                }}
                            >
                                <Pin
                                    size={14}
                                    color={colors.accent}
                                />

                                <span
                                    style={{
                                        color: colors.textPrimary,
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                >
                                    {pin.category}
                                </span>

                                <span
                                    style={{
                                        color: colors.accent,
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                >
                                    #{pin.order}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            },
        },



        {
            key: "stats",
            label: "Stats",

            render: (_, row) => (

                <div className="flex gap-3">

                    <span className="flex items-center gap-1">
                        <Eye size={15}
                            color={colors.accent} />
                        {row.viewCount}
                    </span>


                    <span className="flex items-center gap-1">
                        <Heart size={15}
                            color={colors.danger} />
                        {row.likeCount}
                    </span>

                </div>

            )
        },


        {
            key: "status",
            label: "Status",

            render: (value, row) => (

                <div className="flex flex-col gap-2">


                    <span
                        style={{
                            background:
                                value === "active"
                                    ? colors.success
                                    : colors.warning,

                            color: "#000",
                            padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 600
                        }}
                    >
                        {value}
                    </span>



                    {
                        row.isDeleted &&
                        <span
                            style={{
                                background: colors.danger,
                                padding: "4px 10px",
                                borderRadius: 20,
                                fontSize: 12,
                                display: "flex",
                                gap: 5,
                                alignItems: "center"
                            }}
                        >
                            <Trash2 size={12} />
                            Deleted
                        </span>
                    }


                </div>
            )
        },


        {
            key: "createdAt",
            label: "Created",

            render: (value) => (
                <span
                    style={{
                        color: colors.textSecondary,
                        fontSize: 13
                    }}
                >
                    {
                        new Date(value)
                            .toLocaleDateString()
                    }
                </span>
            )
        },
        // {
        //     key: "actions",
        //     label: "Actions",
        //     width: "160px",

        //     render: (_, row) => (
        //         <div
        //             className="flex gap-3"
        //             onClick={(e) => e.stopPropagation()}
        //         >
        //             {/* EDIT */}
        //             <button
        //                 onClick={() => {
        //                     setSelectedReel(row);
        //                     setShowModal(true);
        //                 }}
        //                 style={{
        //                     width: 38,
        //                     height: 38,
        //                     borderRadius: 10,
        //                     border: `1px solid ${colors.cardBorder}`,
        //                     background: colors.hover,
        //                     color: colors.accent,
        //                     cursor: "pointer",

        //                     // center icon
        //                     display: "flex",
        //                     alignItems: "center",
        //                     justifyContent: "center",
        //                 }}
        //             >
        //                 <Pencil size={17} />
        //             </button>

        //             {/* DELETE */}
        //             <button
        //                 onClick={() => handleDelete(row._id)}
        //                 style={{
        //                     width: 38,
        //                     height: 38,
        //                     borderRadius: 10,
        //                     border: `1px solid ${colors.danger}`,
        //                     background: "transparent",
        //                     color: colors.danger,
        //                     cursor: "pointer",

        //                     // center icon
        //                     display: "flex",
        //                     alignItems: "center",
        //                     justifyContent: "center",
        //                 }}
        //             >
        //                 <Trash2 size={17} />
        //             </button>
        //         </div>
        //     ),
        // }
        {
            key: "actions",
            label: "Actions",
            width: "210px",

            render: (_, row) => (
                <div
                    className="flex gap-3"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* PLAY VIDEO */}
                    <button
                        onClick={() => {
                            window.open(
                                row.videoUrl,
                                "_blank"
                            );
                        }}
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            border: `1px solid ${colors.cardBorder}`,
                            background: colors.hover,
                            color: colors.accent,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        title="Play Video"
                    >
                        <Play size={17} />
                    </button>


                    {/* EDIT */}
                    <button
                        onClick={() => {
                            setSelectedReel(row);
                            setShowModal(true);
                        }}
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            border: `1px solid ${colors.cardBorder}`,
                            background: colors.hover,
                            color: colors.accent,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        title="Edit"
                    >
                        <Pencil size={17} />
                    </button>


                    {/* DELETE */}
                    <button
                        onClick={() => handleDelete(row._id)}
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            border: `1px solid ${colors.danger}`,
                            background: "transparent",
                            color: colors.danger,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        title="Delete"
                    >
                        <Trash2 size={17} />
                    </button>

                    {/* PIN REEL */}
                    <button
                        type="button"
                        onClick={() => {
                            setPinModal({
                                open: true,
                                mode: "pin",
                                reel: row,
                            });
                        }}
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            border: `1px solid ${colors.accent}`,
                            background: colors.hover,
                            color: colors.accent,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        title="Pin Reel"
                    >
                        <Pin size={17} />
                    </button>

                    {/* UNPIN REEL */}
                    <button
                        type="button"
                        onClick={() => {
                            setPinModal({
                                open: true,
                                mode: "unpin",
                                reel: row,
                            });
                        }}
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            border: `1px solid ${colors.danger}`,
                            background: "transparent",
                            color: colors.danger,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        title="Unpin Reel"
                    >
                        <PinOff size={17} />
                    </button>


                </div>
            ),
        }

    ];


    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this reel?"
            );


        if (!confirmDelete) return;


        try {

            await axiosInstance.delete(
                `/api/v1/admin-reels/${id}`
            );


            fetchReels();


        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div
            className="p-6"
            style={{
                background: colors.pageBg,
                minHeight: "100vh"
            }}
        >


            {/* HEADER */}

            <div
                className="flex justify-between items-center mb-6"
            >

                <div>

                    <h1
                        style={{
                            color: colors.textPrimary,
                            fontSize: 28,
                            fontWeight: 700
                        }}
                    >
                        Reels Management
                    </h1>


                    <p
                        style={{
                            color: colors.textMuted
                        }}
                    >
                        Manage all CMS reels
                    </p>

                </div>



                <div
                    style={{
                        background: colors.cardBg,
                        padding: "12px 20px",
                        borderRadius: 15,
                        border:
                            `1px solid ${colors.cardBorder}`
                    }}
                >

                    Total Reels :
                    <b
                        style={{
                            color: colors.accent,
                            marginLeft: 8
                        }}
                    >
                        {count}
                    </b>

                </div>
                <FilterDropDown
                    options={[
                        "All Categories",
                        ...categoryOptions.map((item) => item.label),
                    ]}
                    defaultLabel="All Categories"
                    width={200}
                    onSelect={(category) => {
                        setSelectedCategory(category);
                        setPage(1);
                    }}
                />
                <button
                    onClick={() => {
                        setSelectedReel(null);
                        setShowModal(true);
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "12px 18px",
                        borderRadius: 12,
                        border: "none",
                        background: colors.gradientButton,
                        color: colors.buttonText,
                        fontWeight: 700,
                        cursor: "pointer"
                    }}
                >
                    <Plus size={18} />
                    Add Reel
                </button>


            </div>


            <div
                className="flex items-center justify-between gap-4 flex-wrap mb-4"
            >
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={
                            reels.length > 0 &&
                            reels.every((reel) =>
                                selectedReelIds.includes(reel._id)
                            )
                        }
                        onChange={toggleSelectAll}
                        style={{
                            width: 17,
                            height: 17,
                            accentColor: colors.accent,
                            cursor: "pointer",
                        }}
                        aria-label="Select all reels on current page"
                    />

                    <span style={{ color: colors.textSecondary }}>
                        Select all on this page
                    </span>

                    <span
                        style={{
                            color: colors.accent,
                            fontWeight: 600,
                        }}
                    >
                        {selectedReelIds.length} selected
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleBulkDelete}
                    disabled={
                        selectedReelIds.length === 0 || bulkDeleting
                    }
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "none",
                        background:
                            selectedReelIds.length === 0 || bulkDeleting
                                ? colors.cardBorder
                                : colors.danger,
                        color: "#fff",
                        fontWeight: 600,
                        cursor:
                            selectedReelIds.length === 0 || bulkDeleting
                                ? "not-allowed"
                                : "pointer",
                        opacity: bulkDeleting ? 0.7 : 1,
                    }}
                >
                    <Trash2 size={16} />

                    {bulkDeleting
                        ? "Deleting..."
                        : `Delete Selected (${selectedReelIds.length})`}
                </button>
            </div>


            <DataTable

                columns={columns}

                data={reels}

                loading={loading}

                error={error}

                paginationMode="server"

                page={page}

                totalPages={totalPages}

                onPageChange={(newPage) => {
                    setPage(newPage);
                }}

                onRowClick={(row) => {
                    console.log("Selected Reel", row);
                }}

            />



            {/* VIDEO MODAL */}

            {
                selectedVideo &&

                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: colors.overlay,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}

                    onClick={() => {
                        setSelectedVideo(null)
                    }}
                >

                    <video

                        src={selectedVideo}

                        controls

                        autoPlay

                        style={{
                            width: 350,
                            borderRadius: 20,
                            border:
                                `2px solid ${colors.accent}`
                        }}

                        onClick={(e) => {
                            e.stopPropagation()
                        }}

                    />


                </div>

            }
            {
                showModal &&

                <ReelModal

                    reel={selectedReel}

                    onClose={() => {

                        setShowModal(false);
                        setSelectedReel(null);

                    }}

                    refresh={fetchReels}

                />

            }
            {pinModal.open && (
                <ReelPinModal
                    reel={pinModal.reel}
                    mode={pinModal.mode}
                    onClose={() =>
                        setPinModal({
                            open: false,
                            mode: "pin",
                            reel: null,
                        })
                    }
                    refresh={fetchReels}
                />
            )}


        </div>

    );

};


export default AdminReels;
