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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const fontGroup = {
  fontFamily: "Arial, sans-serif",
  fontSize: "18px",
};

function Feedback() {
  const { state } = useLocation();
  const { email } = state || {};
  const [rating, setRating] = React.useState(0);
  const [text, setText] = React.useState("");

  const navigate = useNavigate();

  console.log(email);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/feedback", {
        email,
        text,
        rating,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  // feedback ui
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <form onSubmit={handleSubmit}>
          <legend style={fontGroup} htmlFor="feedback">
            Please provide your feedback below!
          </legend>
          <input
            required
            type="text" // Corrected type attribute
            placeholder="Feedback"
            autoComplete="off"
            name="user-feedback"
            className="form-control"
            onChange={(e) => setText(e.target.value)}
          />
          <br></br>

          <Box>
            <legend style={fontGroup} htmlFor="feedback-rating">
              Please rate our app!
            </legend>

            <Rating
              name="simple-controlled"
              value={Number(rating)}
              onChange={(event, newRating) => setRating(newRating)}
              size="large"
            />
          </Box>

          <br></br>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary border w-100"
                onClick={() =>
                  navigate("/settings", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-primary w-100">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
