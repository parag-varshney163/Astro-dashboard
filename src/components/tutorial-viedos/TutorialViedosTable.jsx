import React, { useEffect, useState } from "react";

import TutorialVideoModal from "./TutorialVideoModal";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const TutorialVideosTable = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axiosInstance.get("/api/v1/tutorial-videos");

            setVideos(res?.data?.data?.videos || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch tutorial videos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);
    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this video?"
            );

            if (!confirmDelete) return;

            await axiosInstance.delete(
                `/api/v1/tutorial-videos/${id}`
            );

            fetchVideos();

        } catch (err) {
            console.error(err);
            setError("Failed to delete tutorial video");
        }
    };


    const columns = [
        {
            key: "title",
            label: "Title",
            width: "1.5fr",
            align: "left",
            render: (value) => (
                <span
                    className="font-semibold"
                    style={{
                        color: colors.textPrimary,
                    }}
                >
                    {value}
                </span>
            ),
        },

        {
            key: "description",
            label: "Description",
            width: "2fr",
            align: "left",
            render: (value) => (
                <span
                    className="truncate max-w-[250px]"
                    style={{
                        color: colors.textSecondary,
                    }}
                >
                    {value}
                </span>
            ),
        },

        {
            key: "usedFor",
            label: "Used For",
            width: "1fr",
            render: (value) => (
                <span
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                        background: colors.hover,
                        color: colors.accentLight,
                        border: `1px solid ${colors.cardBorder}`,
                    }}
                >
                    {value}
                </span>
            ),
        },


        {
            key: "link",
            label: "Video",
            width: "1fr",
            render: (value) => (
                <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{
                        background: colors.gradientButton,
                        color: colors.buttonText,
                    }}
                >
                    Watch
                </a>
            ),
        },


        {
            key: "createdAt",
            label: "Created At",
            width: "1fr",
            render: (value) => (
                <span style={{ color: colors.textMuted }}>
                    {new Date(value).toLocaleDateString()}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            width: "1.2fr",
            render: (_, row) => (
                <div className="flex gap-3">

                    <button
                        onClick={() => {
                            setSelectedVideo(row);
                            setShowModal(true);
                        }}
                        className="px-3 py-1 rounded-lg text-sm font-semibold"
                        style={{
                            background: colors.hover,
                            color: colors.accentLight,
                            border: `1px solid ${colors.cardBorder}`,
                        }}
                    >
                        Edit
                    </button>


                    <button
                        onClick={() => handleDelete(row._id)}
                        className="px-3 py-1 rounded-lg text-sm font-semibold"
                        style={{
                            background: colors.danger,
                            color: colors.white,
                        }}
                    >
                        Delete
                    </button>

                </div>
            ),
        },
    ];


    return (
        <div
            className="min-h-screen p-6"
            style={{
                background: colors.pageBg,
            }}
        >

            {/* Header */}
            <div
                className="rounded-2xl p-6 mb-6"
                style={{
                    background: colors.gradientHero,
                    border: `1px solid ${colors.cardBorder}`,
                }}
            >

                <div className="flex justify-between items-center">

                    <div>
                        <h1
                            className="text-2xl font-bold"
                            style={{
                                color: colors.textPrimary,
                            }}
                        >
                            Tutorial Videos
                        </h1>

                        <p
                            className="mt-2"
                            style={{
                                color: colors.textSecondary,
                            }}
                        >
                            Manage tutorial videos uploaded for different sections.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedVideo(null);
                            setShowModal(true);
                        }}
                        className="px-5 py-2 rounded-xl font-semibold"
                        style={{
                            background: colors.gradientButton,
                            color: colors.buttonText,
                        }}
                    >
                        Add Video
                    </button>


                    {/* <button
            onClick={fetchVideos}
            className="px-5 py-2 rounded-xl font-semibold"
            style={{
              background: colors.gradientButton,
              color: colors.buttonText,
            }}
          >
            Refresh
          </button> */}

                </div>

            </div>


            {/* Data Table */}

            <DataTable
                columns={columns}
                data={videos}
                loading={loading}
                error={error}
            />
            <TutorialVideoModal
                isOpen={showModal}
                editData={selectedVideo}
                onClose={() => {
                    setShowModal(false);
                    setSelectedVideo(null);
                }}
                onSuccess={fetchVideos}
            />

        </div>
    );
};


export default TutorialVideosTable;
