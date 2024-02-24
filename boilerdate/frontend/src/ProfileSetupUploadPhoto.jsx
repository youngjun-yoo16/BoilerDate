import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file");
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

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
      toast.error("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/uploadPhoto",
        formData
      );
      console.log(response);
      if (response) {
        toast.success("Photo uploaded successfully!");
        navigate("/interests");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Please upload your photo</h2>
        <form
          onSubmit={handleSubmit}
          className="m-3"
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-outline-primary"
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
            onChange={handleFileChange}
            ref={inputFileRef}
          />
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UploadPhoto;
