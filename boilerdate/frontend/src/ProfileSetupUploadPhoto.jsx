import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function UploadPhoto() {
  const [isUploaded, checkIsUploaded] = useState(false);
  const navigate = useNavigate();

  // need to handle interaction; need to post to server; save image in aws; save image link in db; modify index.js

  // returned page
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Please upload your photo</h2>
      </div>
    </div>
  );
}

export default UploadPhoto;
