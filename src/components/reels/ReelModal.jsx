import { X, Upload, Video, Image as ImageIcon, Trash2, Play, Loader2, } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const ReelModal = ({ reel, onClose, refresh }) => {
    const isEdit = Boolean(reel);

    const [form, setForm] = useState({
        title: reel?.title || "",
        description: reel?.description || "",
        category: reel?.category || "for_you",
        order: reel?.order ?? 0,
        durationSeconds: reel?.durationSeconds ?? "",
        status: reel?.status || "processing",
    });

    const [video, setVideo] = useState(null);
    // const [thumbnail, setThumbnail] = useState(null);

    const [videoPreview, setVideoPreview] = useState(
        reel?.videoUrl || reel?.video || ""
    );

    // const [thumbnailPreview, setThumbnailPreview] = useState(
    //     reel?.thumbnailUrl || reel?.thumbnail || ""
    // );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* -----------------------------------------
       FILE PREVIEW
    ----------------------------------------- */

    useEffect(() => {
        if (!video) return;

        const url = URL.createObjectURL(video);
        setVideoPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [video]);

    // useEffect(() => {
    //     if (!thumbnail) return;

    //     const url = URL.createObjectURL(thumbnail);
    //     setThumbnailPreview(url);

    //     return () => URL.revokeObjectURL(url);
    // }, [thumbnail]);

    /* -----------------------------------------
       INPUT CHANGE
    ----------------------------------------- */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    /* -----------------------------------------
       FILE CHANGE
    ----------------------------------------- */

    const handleVideoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("video/")) {
            setError("Please select a valid video file.");
            return;
        }

        setVideo(file);
        setError("");
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        setThumbnail(file);
        setError("");
    };

    /* -----------------------------------------
       REMOVE FILE
    ----------------------------------------- */

    const removeVideo = () => {
        setVideo(null);

        if (isEdit) {
            setVideoPreview(reel?.videoUrl || reel?.video || "");
        } else {
            setVideoPreview("");
        }
    };

    const removeThumbnail = () => {
        setThumbnail(null);

        if (isEdit) {
            setThumbnailPreview(
                reel?.thumbnailUrl || reel?.thumbnail || ""
            );
        } else {
            setThumbnailPreview("");
        }
    };

    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    const validate = () => {
        if (!form.title.trim()) {
            setError("Title is required.");
            return false;
        }

        if (!form.description.trim()) {
            setError("Description is required.");
            return false;
        }

        if (!isEdit && !video) {
            setError("Please upload a video.");
            return false;
        }

        // if (!isEdit && !thumbnail) {
        //     setError("Please upload a thumbnail.");
        //     return false;
        // }
        if (!form.durationSeconds || Number(form.durationSeconds) <= 0) {
            setError("Duration must be greater than 0 seconds.");
            return false;
        }

        if (Number(form.order) < 0) {
            setError("Order cannot be negative.");
            return false;
        }

        return true;
    };

    /* -----------------------------------------
       SUBMIT
    ----------------------------------------- */

    // const submit = async () => {
    //     if (!validate()) return;

    //     try {
    //         setLoading(true);
    //         setError("");

    //         const body = new FormData();

    //         if (video) {
    //             body.append("video", video);
    //         }

    //         if (thumbnail) {
    //             body.append("thumbnail", thumbnail);
    //         }

    //         body.append("title", form.title.trim());
    //         body.append("description", form.description.trim());
    //         body.append("category", form.category);
    //         body.append("order", Number(form.order));
    //         body.append("durationSeconds", Number(form.durationSeconds));
    //         body.append("status", form.status);

    //         if (isEdit) {
    //             await axiosInstance.put(
    //                 `/api/v1/admin-reels/${reel._id}`,
    //                 body,
    //                 {
    //                     headers: {
    //                         "Content-Type": "multipart/form-data",
    //                     },
    //                 }
    //             );
    //         } else {
    //             await axiosInstance.post(
    //                 "/api/v1/admin-reels",
    //                 body,
    //                 {
    //                     headers: {
    //                         "Content-Type": "multipart/form-data",
    //                     },
    //                 }
    //             );
    //         }

    //         refresh();
    //         onClose();
    //     } catch (err) {
    //         console.error(err);

    //         setError(
    //             err?.response?.data?.message ||
    //                 `Failed to ${isEdit ? "update" : "create"} reel.`
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const submit = async () => {
        if (!validate()) return;

        try {
            setLoading(true);
            setError("");

            if (isEdit) {
                // PUT API expects JSON
                const payload = {
                    title: form.title.trim(),
                    description: form.description.trim(),
                    category: form.category,
                    order: Number(form.order),
                    status: form.status,
                };

                await axiosInstance.put(
                    `/api/v1/admin-reels/${reel._id}`,
                    payload
                );
            } else {
                // POST API expects multipart/form-data
                const body = new FormData();

                if (video) {
                    body.append("video", video);
                }

                // if (thumbnail) {
                //     body.append("thumbnail", thumbnail);
                // }

                body.append("title", form.title.trim());
                body.append("description", form.description.trim());
                body.append("category", form.category);

                body.append(
                    "durationSeconds",
                    Number(form.durationSeconds)
                );

                body.append(
                    "order",
                    Number(form.order)
                );

                body.append("status", form.status);

                await axiosInstance.post(
                    "/api/v1/admin-reels",
                    body,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            refresh();
            onClose();

        } catch (err) {
            console.error("Reel submit error:", err);

            setError(
                err?.response?.data?.message ||
                `Failed to ${isEdit ? "update" : "create"} reel.`
            );
        } finally {
            setLoading(false);
        }
    };
    /* -----------------------------------------
       UPLOAD BOX
    ----------------------------------------- */

    const UploadBox = ({
        type,
        file,
        preview,
        onChange,
        onRemove,
    }) => {
        const isVideo = type === "video";

        return (
            <div style={{ marginTop: 8 }}>
                <label
                    style={{
                        display: "block",
                        marginBottom: 8,
                        color: colors.textSecondary,
                        fontSize: 13,
                        fontWeight: 600,
                    }}
                >
                    {isVideo ? "Video" : "Thumbnail"}
                    {!isEdit && (
                        <span style={{ color: colors.danger }}> *</span>
                    )}
                </label>

                <AnimatePresence mode="wait">
                    {preview ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: "relative",
                                borderRadius: 14,
                                overflow: "hidden",
                                border: `1px solid ${colors.cardBorder}`,
                                background: colors.inputBg,
                            }}
                        >
                            {isVideo ? (
                                <video
                                    src={preview}
                                    controls
                                    style={{
                                        width: "100%",
                                        height: 180,
                                        display: "block",
                                        objectFit: "cover",
                                        background: "#000",
                                    }}
                                />
                            ) : (
                                <img
                                    src={preview}
                                    alt="Thumbnail preview"
                                    style={{
                                        width: "100%",
                                        height: 180,
                                        display: "block",
                                        objectFit: "cover",
                                    }}
                                />
                            )}

                            <div
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    display: "flex",
                                    gap: 8,
                                }}
                            >
                                <label
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        background:
                                            "rgba(0,0,0,0.75)",
                                        border: `1px solid ${colors.cardBorder}`,
                                        color: colors.accentLight,
                                    }}
                                    title="Replace"
                                >
                                    <Upload size={16} />

                                    <input
                                        type="file"
                                        accept={
                                            isVideo
                                                ? "video/*"
                                                : "image/*"
                                        }
                                        onChange={onChange}
                                        style={{ display: "none" }}
                                    />
                                </label>

                                {file && (
                                    <button
                                        type="button"
                                        onClick={onRemove}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            background:
                                                "rgba(0,0,0,0.75)",
                                            border: `1px solid ${colors.danger}`,
                                            color: colors.danger,
                                        }}
                                        title="Remove selected file"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            {file && (
                                <div
                                    style={{
                                        padding: "10px 12px",
                                        color: colors.textSecondary,
                                        fontSize: 12,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {file.name}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.label
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            htmlFor={`${type}-upload`}
                            style={{
                                minHeight: 130,
                                borderRadius: 14,
                                border: `1px dashed ${colors.cardBorder}`,
                                background: colors.inputBg,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <div
                                style={{
                                    width: 46,
                                    height: 46,
                                    borderRadius: "50%",
                                    background: colors.hover,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: colors.accent,
                                    marginBottom: 10,
                                }}
                            >
                                {isVideo ? (
                                    <Video size={21} />
                                ) : (
                                    <ImageIcon size={21} />
                                )}
                            </div>

                            <span
                                style={{
                                    color: colors.textPrimary,
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                            >
                                Upload {isVideo ? "Video" : "Thumbnail"}
                            </span>

                            <span
                                style={{
                                    color: colors.textMuted,
                                    fontSize: 11,
                                    marginTop: 4,
                                }}
                            >
                                Click to browse files
                            </span>

                            <input
                                id={`${type}-upload`}
                                type="file"
                                accept={
                                    isVideo
                                        ? "video/*"
                                        : "image/*"
                                }
                                onChange={onChange}
                                style={{ display: "none" }}
                            />
                        </motion.label>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    /* -----------------------------------------
       INPUT STYLE
    ----------------------------------------- */

    const inputStyle = {
        width: "100%",
        padding: "12px 13px",
        borderRadius: 10,
        background: colors.inputBg,
        border: `1px solid ${colors.inputBorder}`,
        color: colors.textPrimary,
        outline: "none",
        fontSize: 14,
        boxSizing: "border-box",
        transition: "border 0.2s ease",
    };

    const labelStyle = {
        display: "block",
        color: colors.textSecondary,
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 7,
    };

    return (
        <div
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: colors.overlay,
                backdropFilter: "blur(7px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                    width: "100%",
                    maxWidth: 600,
                    maxHeight: "92vh",
                    overflowY: "auto",
                    background: colors.cardBg,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: 20,
                    boxShadow: "0 25px 80px rgba(0,0,0,0.55)",
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 5,
                        padding: "20px 22px",
                        background: colors.cardBg,
                        borderBottom: `1px solid ${colors.inputBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: 0,
                                color: colors.textPrimary,
                                fontSize: 21,
                                fontWeight: 700,
                            }}
                        >
                            {isEdit ? "Edit Reel" : "Create Reel"}
                        </h2>

                        <p
                            style={{
                                margin: "4px 0 0",
                                color: colors.textMuted,
                                fontSize: 12,
                            }}
                        >
                            {isEdit
                                ? "Update reel details and content"
                                : "Add a new reel to your platform"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            border: `1px solid ${colors.inputBorder}`,
                            background: colors.inputBg,
                            color: colors.textSecondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* BODY */}
                <div style={{ padding: 22 }}>
                    {/* ERROR */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: "11px 13px",
                                borderRadius: 10,
                                marginBottom: 18,
                                background:
                                    "rgba(224,82,82,0.10)",
                                border: `1px solid ${colors.danger}`,
                                color: colors.danger,
                                fontSize: 13,
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* MEDIA */}
                    {/* <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(2, minmax(0, 1fr))",
                            gap: 14,
                            marginBottom: 20,
                        }}
                    >
                        <UploadBox
                            type="video"
                            file={video}
                            preview={videoPreview}
                            onChange={handleVideoChange}
                            onRemove={removeVideo}
                        />

                        <UploadBox
                            type="thumbnail"
                            file={thumbnail}
                            preview={thumbnailPreview}
                            onChange={handleThumbnailChange}
                            onRemove={removeThumbnail}
                        />
                    </div> */}
                    <div style={{ marginBottom: 20 }}>
                        <UploadBox
                            type="video"
                            file={video}
                            preview={videoPreview}
                            onChange={handleVideoChange}
                            onRemove={removeVideo}
                        />
                    </div>

                    {/* TITLE */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>
                            Title
                            <span style={{ color: colors.danger }}>
                                {" "}
                                *
                            </span>
                        </label>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter reel title"
                            style={inputStyle}
                            onFocus={(e) =>
                            (e.target.style.borderColor =
                                colors.inputFocus)
                            }
                            onBlur={(e) =>
                            (e.target.style.borderColor =
                                colors.inputBorder)
                            }
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>
                            Description
                            <span style={{ color: colors.danger }}>
                                {" "}
                                *
                            </span>
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter reel description"
                            rows={4}
                            style={{
                                ...inputStyle,
                                resize: "vertical",
                                minHeight: 95,
                            }}
                            onFocus={(e) =>
                            (e.target.style.borderColor =
                                colors.inputFocus)
                            }
                            onBlur={(e) =>
                            (e.target.style.borderColor =
                                colors.inputBorder)
                            }
                        />
                    </div>

                    {/* CATEGORY + STATUS */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(2, minmax(0, 1fr))",
                            gap: 14,
                            marginBottom: 16,
                        }}
                    >
                        <div>
                            <label style={labelStyle}>
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                style={{
                                    ...inputStyle,
                                    cursor: "pointer",
                                }}
                            >
                                <option value="for_you">
                                    For You
                                </option>

                                <option value="mantras">
                                    Mantras
                                </option>
                                <option value="aarti">
                                    Aarti
                                </option>
                                <option value="stories">
                                    Stories
                                </option>
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                style={{
                                    ...inputStyle,
                                    cursor: "pointer",
                                }}
                            >
                                <option value="processing">
                                    Processing
                                </option>

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>
                            </select>
                        </div>
                    </div>
                    {/* DURATION */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>
                            Duration (Seconds)
                            <span style={{ color: colors.danger }}> *</span>
                        </label>

                        <input
                            name="durationSeconds"
                            type="number"
                            min="1"
                            value={form.durationSeconds}
                            onChange={handleChange}
                            placeholder="e.g. 30"
                            style={inputStyle}
                            onFocus={(e) =>
                                (e.target.style.borderColor = colors.inputFocus)
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = colors.inputBorder)
                            }
                        />

                        <div
                            style={{
                                marginTop: 5,
                                color: colors.textMuted,
                                fontSize: 11,
                            }}
                        >
                            Enter the reel duration in seconds.
                        </div>
                    </div>

                    {/* ORDER */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={labelStyle}>
                            Display Order
                        </label>

                        <input
                            name="order"
                            type="number"
                            min="0"
                            value={form.order}
                            onChange={handleChange}
                            placeholder="0"
                            style={inputStyle}
                        />
                    </div>

                    {/* FOOTER BUTTONS */}
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            paddingTop: 4,
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                flex: 1,
                                padding: "13px 16px",
                                borderRadius: 11,
                                border: `1px solid ${colors.inputBorder}`,
                                background: colors.inputBg,
                                color: colors.textSecondary,
                                fontWeight: 600,
                                cursor: loading
                                    ? "not-allowed"
                                    : "pointer",
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={loading}
                            onClick={submit}
                            style={{
                                flex: 1,
                                padding: "13px 16px",
                                borderRadius: 11,
                                border: "none",
                                background:
                                    colors.gradientButton,
                                color: colors.buttonText,
                                fontWeight: 700,
                                cursor: loading
                                    ? "not-allowed"
                                    : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                boxShadow:
                                    "0 8px 25px rgba(212,175,55,0.18)",
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />

                                    Saving...
                                </>
                            ) : (
                                <>
                                    {isEdit ? (
                                        <Play size={16} />
                                    ) : (
                                        <Upload size={16} />
                                    )}

                                    {isEdit
                                        ? "Update Reel"
                                        : "Create Reel"}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ReelModal;