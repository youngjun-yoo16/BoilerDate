import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Academics() {
  const [gpa, setGpa] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");

  const { state } = useLocation();
  const { interests } = state || {};

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(result);
    navigate("/additionalInfo", {
      state: { gpa: gpa, major: major, degree: degree, interests: interests },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Academic information</h2>
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

          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Degree type</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={degree}
                label="Degree type"
                onChange={(e) => setDegree(e.target.value)}
              >
                <MenuItem value={"BA"}>BA</MenuItem>
                <MenuItem value={"MA"}>MA</MenuItem>
                <MenuItem value={"PhD"}>PhD</MenuItem>
              </Select>
            </FormControl>
          </div>

          <br />
          <div>
            <button type="submit" className="btn btn-outline-primary w-100">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Academics;
