import { useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function AdditionalInfo() {
  const [feet, setFeet] = useState(4);
  const [inches, setInches] = useState(0);
  const [personality, setPersonality] = useState("");
  const [relationship, setRelationship] = useState("");
  const [citizenship, setCitizenship] = useState("");

  const { state } = useLocation();
  const { gpa, major, degree, interests, lifestyle } = state || {};

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(feet);
    console.log(inches);
    let height = parseInt(feet) * 12 + parseInt(inches);
    console.log(height);
    navigate("/customizable", {
      state: {
        gpa: gpa,
        major: major,
        degree: degree,
        interests: interests,
        lifestyle: lifestyle,
        height: height,
        personality: personality,
        relationship: relationship,
        citizenship: citizenship,
      },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Additional Info</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="height">Enter your height:</label>
            <p></p>

            <div className="row">
              <div className="col">
                <label htmlFor="feet">feet</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setFeet(e.target.value)}
                >
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="inches">inches</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={(e) => setInches(e.target.value)}
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                </select>
              </div>
            </div>
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
