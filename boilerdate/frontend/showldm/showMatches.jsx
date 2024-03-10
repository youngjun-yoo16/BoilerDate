import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ShowMatches() {
  // required for keeping login status
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  console.log(email);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const imageUrl = `http://localhost:3001/image/${email}`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1> hi</h1>
    </div>
  );
}

export default ShowMatches;
