import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Privacy.css";

function Privacy() {
  const [gpa, setGpa] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");

  const { state } = useLocation();
  const { email } = state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(result);
    navigate("/privacy", {
      state: {
        email: email,
        /*gpa: gpa,
        major: major,
        degree: degree,
        interests: interests,
        lifestyle: lifestyle,*/
      },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Privacy Settings</h2>
        <p>
          Select "yes" if you would like others to see the respective category
          when viewing your profile, or "no" if otherwise.
        </p>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="row">
              <div className="col-lg-2 privacytxt">GPA:</div>
              <div className="col-lg-10">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="sleeping-radio-buttons"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="yes"
                      onChange={(e) => setGpa(e.target.value)}
                      className="sleep"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="no"
                      onChange={(e) => setGpa(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
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
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Privacy;
