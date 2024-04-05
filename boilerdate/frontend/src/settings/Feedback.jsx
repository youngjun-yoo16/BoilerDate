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
    console.log(text);
    console.log("ahwatat");
  });

  const handleSubmit = (e) => {};

  // feedback ui
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>
          {/* Uncomment and use FontAwesomeIcon if needed */}
          {/* <FontAwesomeIcon icon={faBell} /> Update Notifications */}
          Please provide your feedback here.
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Box for Text Field */}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "80ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-textarea"
              label="Your feedback matters!"
              placeholder="Placeholder"
              multiline
              variant="filled"
              value={text}
              onChange={(event, newText) => {
                setText(newText);
              }}
            />
          </Box>

          {/* Box for Rating */}
          <Box
            sx={{
              "& > legend": { mt: 3 },
            }}
          >
            <Typography component="legend">Please rate our app!</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
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
