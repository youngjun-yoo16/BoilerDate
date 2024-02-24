import { useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function AdditionalInfo() {
  const [height, setHeight] = useState("");
  const [personality, setPersonality] = useState("");
  const [relationship, setRelationship] = useState("");
  const [citizenship, setCitizenship] = useState("");

  const { state } = useLocation();
  const { gpa, major, degree, interests } = state || {};

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    axios
      .post("http://localhost:3001/additionalInfo", {
        gpa,
        major,
        degree,
        interests,
        height,
        personality,
        relationship,
        citizenship,
      })
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Additional Info</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Height</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={height}
                label="Height"
                onChange={(e) => setHeight(e.target.value)}
              >
                <MenuItem value={">7"}> &gt; 7' 0''</MenuItem>
                <MenuItem value={"6.9-7"}> 6' 9'' - 7' 0''</MenuItem>
                <MenuItem value={"6.6-6.9"}> 6' 6'' - 6' 9''</MenuItem>
                <MenuItem value={"6.3-6.6"}> 6' 3'' - 6' 6''</MenuItem>
                <MenuItem value={"6-6.3"}> 6' 0'' - 6' 3''</MenuItem>
                <MenuItem value={"5.9-6"}> 5' 9'' - 6' 0''</MenuItem>
                <MenuItem value={"5.6-5.9"}> 5' 6'' - 5' 9''</MenuItem>
                <MenuItem value={"5.3-5.6"}> 5' 3'' - 5' 6''</MenuItem>
                <MenuItem value={"5-5.3"}> 5' 0'' - 5' 3''</MenuItem>
                <MenuItem value={"<5"}> &lt; 5' 0''</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value={"long-term"}>Long-term</MenuItem>
                <MenuItem value={"long-term, open"}>
                  Long-term, open to short
                </MenuItem>
                <MenuItem value={"short-term, open"}>
                  Short-term, open to long
                </MenuItem>
                <MenuItem value={"short-term"}>Short-term</MenuItem>
                <MenuItem value={"friends"}>Friends</MenuItem>
                <MenuItem value={"unsure"}>Still figuring it out</MenuItem>
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
                <MenuItem value={"citizen"}>U.S. citizen</MenuItem>
                <MenuItem value={"greencard"}>Greencard</MenuItem>
                <MenuItem value={"international"}>International</MenuItem>
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

export default AdditionalInfo;
