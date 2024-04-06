import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function IssueDetails() {
  const [detail, setDetail] = useState("");

  const { state } = useLocation();
  const { email, category } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category);
    const issue = category + ": " + detail;
    console.log(issue);

    try {
      const response = await axios.post("http://localhost:3001/issues", {
        email,
        issue,
      });

      if (response.data.success) {
        toast.success("Issue reported successfully!");
        await sleep(1200);
        navigate("/settings", { state: { email: email } });
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
          <FontAwesomeIcon icon={faCircleExclamation} /> Report Issues
        </h2>
        <p></p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p>Please give some details on the issue you are reporting.</p>
            <FormControl fullWidth>
              <TextField
                required
                id="outlined-basic"
                label="Details"
                variant="outlined"
                inputProps={{ maxLength: 200 }}
                onChange={(e) => setDetail(e.target.value)}
              />
            </FormControl>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate("/issues", { state: { email: email } })}
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default IssueDetails;
