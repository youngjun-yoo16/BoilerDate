import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

function Filter() {
  const [gpa, setGpa] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");

  const [interests, setInterests] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);

  const [heightRange, setHeightRange] = useState([48, 95]);
  const [ageRange, setAgeRange] = useState([18, 99]);

  const [personality, setPersonality] = useState("");
  const [relationship, setRelationship] = useState("");
  const [citizenship, setCitizenship] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleHeight = (event, newValue) => {
    setHeightRange(newValue);
    //console.log(newValue);
  };
  const handleAge = (event, newValue) => {
    setAgeRange(newValue);
    //console.log(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(result);
    navigate("/home", {
      state: {
        email: email,
        gpa: gpa,
        major: major,
        degree: degree,
        interests: interests,
        lifestyle: lifestyle,
      },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Filter</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">GPA</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gpa}
                label="GPA"
                onChange={(e) => setGpa(e.target.value)}
              >
                <MenuItem value={"3.5-4.0"}>3.5 - 4.0</MenuItem>
                <MenuItem value={"3.0-3.5"}>3.0 - 3.5</MenuItem>
                <MenuItem value={"<3.0"}> &lt; 3.0</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Major</InputLabel>
              <Select
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

          <div className="mb-3">
            <Box sx={{ width: 300 }}>
              <p>Height (inches)</p>
              <Slider
                getAriaLabel={() => "Height range"}
                value={heightRange}
                onChange={handleHeight}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={48}
                max={95}
              />
            </Box>
          </div>

          <div className="mb-3">
            <Box sx={{ width: 300 }}>
              <p>Age</p>
              <Slider
                getAriaLabel={() => "Age range"}
                value={ageRange}
                onChange={handleAge}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={18}
                max={99}
              />
            </Box>
          </div>

          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Personality</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={personality}
                label="Personality"
                onChange={(e) => setPersonality(e.target.value)}
              >
                <MenuItem value={"ISTJ"}>ISTJ</MenuItem>
                <MenuItem value={"ISTP"}>ISTP</MenuItem>
                <MenuItem value={"ISFJ"}>ISFJ</MenuItem>
                <MenuItem value={"ISFP"}>ISFP</MenuItem>
                <MenuItem value={"INTJ"}>INTJ</MenuItem>
                <MenuItem value={"INTP"}>INTP</MenuItem>
                <MenuItem value={"INFJ"}>INFJ</MenuItem>
                <MenuItem value={"INFP"}>INFP</MenuItem>
                <MenuItem value={"ESTJ"}>ESTJ</MenuItem>
                <MenuItem value={"ESTP"}>ESTP</MenuItem>
                <MenuItem value={"ESFJ"}>ESFJ</MenuItem>
                <MenuItem value={"ESFP"}>ESFP</MenuItem>
                <MenuItem value={"ENTJ"}>ENTJ</MenuItem>
                <MenuItem value={"ENTP"}>ENTP</MenuItem>
                <MenuItem value={"ENFJ"}>ENFJ</MenuItem>
                <MenuItem value={"ENFP"}>ENFP</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Relationship goals
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={relationship}
                label="Relationship"
                onChange={(e) => setRelationship(e.target.value)}
              >
                <MenuItem value={"Long-term"}>Long-term</MenuItem>
                <MenuItem value={"Long-term, open to short"}>
                  Long-term, open to short
                </MenuItem>
                <MenuItem value={"Short-term, open to long"}>
                  Short-term, open to long
                </MenuItem>
                <MenuItem value={"Short-term"}>Short-term</MenuItem>
                <MenuItem value={"Friends"}>Friends</MenuItem>
                <MenuItem value={"Still figuring it out"}>
                  Still figuring it out
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Citizenship status
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={citizenship}
                label="Citizenship"
                onChange={(e) => setCitizenship(e.target.value)}
              >
                <MenuItem value={"U.S. citizen"}>U.S. citizen</MenuItem>
                <MenuItem value={"Greencard"}>Greencard</MenuItem>
                <MenuItem value={"International"}>International</MenuItem>
              </Select>
            </FormControl>
          </div>

          <br />
          <div>
            <button type="submit" className="btn btn-outline-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
