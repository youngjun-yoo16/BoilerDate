import { useState, useEffect, useRef } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Significant() {
  //const [github, setGithub] = useState("N/A");
  //TODO: create pipeline to store pdf file

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

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

    console.log(file);
    if (!file) {
      toast.error("Please select your file!");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("email", email);

    try {
      const response = await axios.post(
        "http://localhost:3001/uploadPDFfile",
        formData
      );
      if (response.data.success) {
        toast.success("Your file has been successfully uploaded!");
        // do not navigate here; use button to navigate back to setting.
      } else {
        toast.error("Error: file upload failure");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>
          Please upload a PDF file that shows your most significant feature
        </h2>
        <form
          onSubmit={handleSubmit}
          className="m-3"
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={triggerFileInput}
              >
                Choose file
              </button>
              <span className="ms-2">{fileName}</span>
            </div>
          </div>

          <br />

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
              <input
                id="fileInput"
                className="d-none"
                type="file"
                name="image"
                accept=".pdf"
                onChange={handleFileChange}
                ref={inputFileRef}
              />

              <button type="submit" className="btn btn-primary w-100">
                Upload
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Significant;
