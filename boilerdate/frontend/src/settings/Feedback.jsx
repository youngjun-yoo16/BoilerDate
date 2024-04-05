import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Feedback() {
  const { state } = useLocation();
  const { email } = state || {};

  const navigate = useNavigate();

  console.log(email);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  // feedback ui
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>
          {/*--<FontAwesomeIcon icon={faBell} /> Update Notificatons*/}
          Please provide your feedback here.
        </h2>
      </div>
    </div>
  );
}

export default Feedback;
