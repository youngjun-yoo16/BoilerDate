import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Career() {
  const [career_goals, setCareerGoals] = useState("N/A");

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(career_goals);

    axios
      .post("http://localhost:3001/updateCareer", {
        email,
        career_goals,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Update Career Goals</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Career goals"
                variant="outlined"
                inputProps={{ maxLength: 60 }}
                onChange={(e) => setCareerGoals(e.target.value)}
              />
            </FormControl>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  navigate("/settings", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-primary w-100">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Career;
