import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Github() {
  const [github, setGithub] = useState("N/A");

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
    console.log(github);

    axios
      .post("http://localhost:3001/updateGithub", {
        email,
        github,
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
        <h2>Update GitHub</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="GitHub"
                variant="outlined"
                inputProps={{ maxLength: 60 }}
                onChange={(e) => setGithub(e.target.value)}
              />
            </FormControl>
          </div>

          <br />
          <div>
            <button type="submit" className="btn btn-outline-primary w-100">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Github;
