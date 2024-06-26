import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/helper";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function UpdatePhoto() {
  const [file, setFile] = useState(null);
  // may put some default message here before file upload.
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const { state } = useLocation();
  const { email } = state || {};

  console.log(email);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const triggerFileInput = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select your photo!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", email);

    try {
      const response = await axios.post(`${BASE_URL}/uploadPhoto`, formData);

      if (response.data.success) {
        toast.success("Photo uploaded successfully!");
        await sleep(1200);
        navigate("/settings/profile", { state: { email: email } });
      } else {
        toast.error("Error: server issue");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>
          <FontAwesomeIcon icon={faImage} /> Update photo
        </h2>
        <form
          onSubmit={handleSubmit}
          className="m-3"
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={triggerFileInput}
            >
              Choose file
            </button>
            <span className="ms-2">{fileName}</span>
          </div>
          <input
            id="fileInput"
            className="d-none"
            type="file"
            name="image"
            accept=".png, .jpg"
            onChange={handleFileChange}
            ref={inputFileRef}
          />

          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary border w-100"
                onClick={() =>
                  navigate("/settings/profile", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UpdatePhoto;
