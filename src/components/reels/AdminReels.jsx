import { Pencil, Trash2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Play, Eye, Heart, } from "lucide-react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
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


    const fetchReels = async () => {
        try {

            setLoading(true);
            setError(null);

            const { data } = await axiosInstance.get(
                "/api/v1/admin-reels",
                {
                    params: {
                        page,
                        limit: 10
                    }
                }
            );


            setReels(data.data.items || []);
            setCount(data.data.total);

            setTotalPages(
                Math.ceil(
                    data.data.total / data.data.limit
                )
            );


        } catch (err) {

            setError(
                err?.response?.data?.message ||
                "Failed to fetch reels"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchReels();
    }, [page]);



    const columns = [

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


        </div>

    );

};


export default AdminReels;
