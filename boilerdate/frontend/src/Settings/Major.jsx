import { useState } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Major() {
  const [major, setMajor] = useState("");

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(major);

    axios
      .post("http://localhost:3001/updateMajor", {
        email,
        major,
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
        <h2>Update Major</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Major</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={major}
                label="Major"
                onChange={(e) => setMajor(e.target.value)}
              >
                <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
                <MenuItem value={"Engineering"}>Engineering</MenuItem>
                <MenuItem value={"Math"}>Math</MenuItem>
              </Select>
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

export default Major;