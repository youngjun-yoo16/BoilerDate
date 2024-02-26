import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

function Customizable() {
  const [skills, setSkills] = useState("");
  const [employment_history, setEmploymentHistory] = useState("");
  const [career_goals, setCareerGoals] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");

  const { state } = useLocation();
  const {
    email,
    gpa,
    major,
    degree,
    interests,
    lifestyle,
    height,
    personality,
    relationship,
    citizenship,
  } = state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/completeProfile", {
        email,
        gpa,
        major,
        degree,
        interests,
        lifestyle,
        height,
        personality,
        relationship,
        citizenship,
        skills,
        employment_history,
        career_goals,
        github,
        linkedin,
        bio,
      })
      .then((result) => {
        console.log(result);
        navigate("/home", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Optional Info</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Skills"
                variant="outlined"
                inputProps={{ maxLength: 60 }}
                onChange={(e) => setSkills(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Employment history"
                variant="outlined"
                inputProps={{ maxLength: 60 }}
                onChange={(e) => setEmploymentHistory(e.target.value)}
              />
            </FormControl>
          </div>

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

          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="LinkedIn"
                variant="outlined"
                inputProps={{ maxLength: 60 }}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Bio"
                variant="outlined"
                inputProps={{ maxLength: 200 }}
                onChange={(e) => setBio(e.target.value)}
              />
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

export default Customizable;
