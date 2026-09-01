import React, { useEffect, useState } from "react";

import RashifalImageModal from "./RashifalImageModal";
import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";
import DataTable from "../ui/DataTable";


const RashifalImagesTable = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);



    const fetchRashifalImages = async () => {

        try {

            setLoading(true);
            setError(null);


            const res = await axiosInstance.get(
                "/api/v1/rashifal-images"
            );


            setImages(
                res?.data?.data || []
            );


        } catch (err) {

            console.error(err);

            setError(
                "Failed to fetch rashifal images"
            );


        } finally {

            setLoading(false);

        }

    };




    useEffect(() => {

        fetchRashifalImages();

    }, []);
    const handleDelete = async (id) => {

        try {

            if (!window.confirm("Delete Rashifal image?"))
                return;


            await axiosInstance.delete(
                `/api/v1/rashifal-images/${id}`
            );


            fetchRashifalImages();


        } catch (err) {

            console.log(err);

        }

    };





    const columns = [



        {
            key: "imageUrl",
            label: "Image",
            width: "1fr",
            render: (value) => (
                <img
                    src={value}
                    alt="rashi"
                    className="w-14 h-14 rounded-xl object-cover"
                    style={{
                        border: `1px solid ${colors.cardBorder}`,
                    }}
                />
            )
        },



        {
            key: "rashiKey",
            label: "Rashi",
            width: "1fr",
            render: (value) => (
                <span
                    className="font-semibold"
                    style={{
                        color: colors.textPrimary,
                    }}
                >
                    {value}
                </span>
            )
        },



        {
            key: "westernName",
            label: "Western Name",
            width: "1fr",
            render: (value) => (
                <span
                    style={{
                        color: colors.textSecondary,
                    }}
                >
                    {value}
                </span>
            )
        },



        {
            key: "devanagariName",
            label: "Hindi Name",
            width: "1fr",
            render: (value) => (
                <span
                    className="font-medium"
                    style={{
                        color: colors.accentLight,
                    }}
                >
                    {value}
                </span>
            )
        },




        {
            key: "names",
            label: "Languages",
            width: "1.5fr",
            render: (value) => (
                <div className="flex gap-2 flex-wrap">

                    {
                        Object.keys(value || {})
                            .slice(0, 4)
                            .map((lang) => (
                                <span
                                    key={lang}
                                    className="px-2 py-1 rounded-full text-xs"
                                    style={{
                                        background: colors.hover,
                                        color: colors.accentLight,
                                        border: `1px solid ${colors.cardBorder}`,
                                    }}
                                >
                                    {lang}
                                </span>
                            ))
                    }

                </div>
            )
        },




        {
            key: "isActive",
            label: "Status",
            width: "1fr",
            render: (value) => (
                <span
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                        background: value
                            ? "rgba(61,190,108,0.15)"
                            : "rgba(224,82,82,0.15)",

                        color: value
                            ? colors.success
                            : colors.danger,

                        border: `1px solid ${value
                                ? colors.success
                                : colors.danger
                            }`,
                    }}
                >

                    {value ? "Active" : "Inactive"}

                </span>
            )
        },




        {
            key: "size",
            label: "Size",
            width: "1fr",
            render: (value) => (
                <span
                    style={{
                        color: colors.textMuted,
                    }}
                >
                    {(value / 1024).toFixed(2)} KB
                </span>
            )
        },




        {
            key: "createdAt",
            label: "Created At",
            width: "1fr",
            render: (value) => (
                <span
                    style={{
                        color: colors.textMuted,
                    }}
                >
                    {new Date(value).toLocaleDateString()}
                </span>
            )
        },
        {
            key: "actions",
            label: "Actions",
            width: "1.5fr",

            render: (_, row) => (

                <div className="flex gap-2">


                    <button

                        onClick={() => {

                            setSelectedImage(row);
                            setShowModal(true);

                        }}

                        className="px-3 py-1 rounded-lg"

                        style={{

                            background: colors.hover,
                            color: colors.accentLight

                        }}

                    >

                        Edit

                    </button>




                    {/* <button

                        onClick={() => handleDelete(row._id)}

                        className="px-3 py-1 rounded-lg"

                        style={{

                            background: colors.danger,
                            color: colors.white

                        }}

                    >

                        Delete

                    </button> */}


                </div>

            )
        }


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
                            Rashifal Images
                        </h1>


                        <p
                            className="mt-2"
                            style={{
                                color: colors.textSecondary,
                            }}
                        >
                            Manage zodiac sign images and multilingual names.
                        </p>


                    </div>



                    {/* <button

            onClick={fetchRashifalImages}

            className="px-5 py-2 rounded-xl font-semibold"

            style={{
              background:colors.gradientButton,
              color:colors.buttonText,
            }}

          >

            Refresh

          </button> */}
                    {/* <button

                        onClick={() => {

                            setSelectedImage(null);
                            setShowModal(true);

                        }}

                        className="px-5 py-2 rounded-xl font-semibold"

                        style={{
                            background: colors.gradientButton,
                            color: colors.buttonText
                        }}

                    >

                        Add Image

                    </button> */}




                </div>


            </div>





            <DataTable

                columns={columns}

                data={images}

                loading={loading}

                error={error}

            />
            <RashifalImageModal

                isOpen={showModal}

                editData={selectedImage}

                onClose={() => {

                    setShowModal(false);
                    setSelectedImage(null);

                }}

                onSuccess={fetchRashifalImages}

            />



        </div>

    );

};


export default RashifalImagesTable;
