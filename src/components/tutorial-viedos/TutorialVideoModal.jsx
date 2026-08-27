import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";
import colors from "../../constants/colors";


const TutorialVideoModal = ({
  isOpen,
  onClose,
  editData,
  onSuccess,
}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    usedFor: "",
  });


  const [videoFile, setVideoFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  useEffect(() => {

    if (editData) {

      setFormData({
        title: editData.title || "",
        description: editData.description || "",
        usedFor: editData.usedFor || "",
      });

    } else {

      setFormData({
        title: "",
        description: "",
        usedFor: "",
      });

      setVideoFile(null);
    }

  }, [editData]);




  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");


      const payload = new FormData();


      payload.append(
        "title",
        formData.title
      );


      payload.append(
        "description",
        formData.description
      );


      payload.append(
        "usedFor",
        formData.usedFor
      );


      if(videoFile){
        payload.append(
          "file",
          videoFile
        );
      }



      if(editData?._id){

        // UPDATE API

        await axiosInstance.put(
          `/api/v1/tutorial-videos/${editData._id}`,
          payload,
          {
            headers:{
              "Content-Type":"multipart/form-data",
            },
          }
        );


      }else{


        // CREATE API

        await axiosInstance.post(
          "/api/v1/tutorial-videos",
          payload,
          {
            headers:{
              "Content-Type":"multipart/form-data",
            },
          }
        );


      }



      onSuccess();
      onClose();


    } catch(err){

      console.log(err);

      setError(
        err?.response?.data?.message ||
        "Something went wrong"
      );


    } finally {

      setLoading(false);

    }

  };





  if(!isOpen)
    return null;




  return (

    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: colors.overlay,
      }}
    >


      <div
        className="w-full max-w-xl rounded-2xl p-6"
        style={{
          background: colors.cardBg,
          border:`1px solid ${colors.cardBorder}`,
        }}
      >



        {/* Header */}

        <div className="flex justify-between items-center mb-6">


          <h2
            className="text-xl font-bold"
            style={{
              color:colors.textPrimary,
            }}
          >

            {
              editData
              ? "Update Tutorial Video"
              : "Add Tutorial Video"
            }

          </h2>



          <button
            onClick={onClose}
            style={{
              color:colors.textMuted,
              fontSize:"22px",
            }}
          >

            ✕

          </button>


        </div>





        {
          error && (

            <div
              className="mb-4 p-3 rounded-lg"
              style={{
                background:colors.danger,
                color:colors.white,
              }}
            >

              {error}

            </div>

          )
        }







        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >



          {/* Title */}

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Video title"
            required
            className="w-full px-4 py-3 rounded-lg outline-none"
            style={{
              background:colors.inputBg,
              color:colors.textPrimary,
              border:`1px solid ${colors.inputBorder}`,
            }}
          />





          {/* Description */}


          <textarea

            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            required

            className="w-full px-4 py-3 rounded-lg outline-none"

            style={{
              background:colors.inputBg,
              color:colors.textPrimary,
              border:`1px solid ${colors.inputBorder}`,
            }}

          />







          {/* Used For */}


          <input

            name="usedFor"
            value={formData.usedFor}
            onChange={handleChange}
            placeholder="Used For"
            required

            className="w-full px-4 py-3 rounded-lg outline-none"

            style={{
              background:colors.inputBg,
              color:colors.textPrimary,
              border:`1px solid ${colors.inputBorder}`,
            }}

          />







          {/* Video Upload */}


          <div>

            <label
              className="block mb-2"
              style={{
                color:colors.textSecondary,
              }}
            >

              Upload Video

            </label>


            <input

              type="file"

              accept="video/*"

              onChange={(e)=>{

                setVideoFile(
                  e.target.files[0]
                );

              }}

              className="w-full px-4 py-3 rounded-lg"

              style={{

                background:colors.inputBg,

                color:colors.textPrimary,

                border:`1px solid ${colors.inputBorder}`,

              }}

            />


          </div>






          {/* Buttons */}


          <div className="flex justify-end gap-3 mt-6">



            <button

              type="button"

              onClick={onClose}

              className="px-5 py-2 rounded-lg"

              style={{

                background:colors.hover,

                color:colors.textSecondary,

                border:`1px solid ${colors.cardBorder}`,

              }}

            >

              Cancel

            </button>





            <button

              type="submit"

              disabled={loading}

              className="px-5 py-2 rounded-lg font-semibold"

              style={{

                background:colors.gradientButton,

                color:colors.buttonText,

              }}

            >

              {
                loading
                ? "Saving..."
                :
                editData
                ? "Update"
                : "Create"
              }


            </button>




          </div>



        </form>




      </div>



    </div>

  );

};


export default TutorialVideoModal;