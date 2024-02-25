import { useState } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function GPA() {
  const [gpa, setGpa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gpa);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Update GPA</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">GPA</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gpa}
                label="GPA"
                onChange={(e) => setGpa(e.target.value)}
              >
                <MenuItem value={"3.9-4.0"}>3.9 - 4.0</MenuItem>
                <MenuItem value={"3.8-3.9"}>3.8 - 3.9</MenuItem>
                <MenuItem value={"3.7-3.8"}>3.7 - 3.8</MenuItem>
                <MenuItem value={"3.6-3.7"}>3.6 - 3.7</MenuItem>
                <MenuItem value={"3.5-3.6"}>3.5 - 3.6</MenuItem>
                <MenuItem value={"3.4-3.5"}>3.4 - 3.5</MenuItem>
                <MenuItem value={"3.3-3.4"}>3.3 - 3.4</MenuItem>
                <MenuItem value={"3.2-3.3"}>3.2 - 3.3</MenuItem>
                <MenuItem value={"3.1-3.2"}>3.1 - 3.2</MenuItem>
                <MenuItem value={"3.0-3.1"}>3.0 - 3.1</MenuItem>
                <MenuItem value={"<3.0"}> &lt; 3.0</MenuItem>
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

export default GPA;