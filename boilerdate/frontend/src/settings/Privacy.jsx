import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Privacy.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function Privacy() {
  const [gpa, setGpa] = useState("yes");
  const [major, setMajor] = useState("yes");
  const [degree, setDegree] = useState("yes");
  const [interests, setInterests] = useState("yes");
  const [lifestyle, setLifestyle] = useState("yes");
  const [height, setHeight] = useState("yes");
  const [personality, setPersonality] = useState("yes");
  const [relationship, setRelationship] = useState("yes");
  const [citizenship, setCitizenship] = useState("yes");
  const [skills, setSkills] = useState("yes");
  const [employment, setEmployment] = useState("yes");
  const [career, setCareer] = useState("yes");
  const [github, setGithub] = useState("yes");
  const [linkedin, setLinkedin] = useState("yes");

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
    axios
      .post("http://localhost:3001/privacy", {
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
        employment,
        career,
        github,
        linkedin,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>
          <FontAwesomeIcon icon={faLock} />
          &nbsp;Privacy Settings
        </h2>
        <span>
          Select "yes" if you would like others to see the respective category
          when viewing your profile, or "no" if otherwise.
        </span>
        <p>Default value / no choice is "yes"</p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">GPA:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setGpa(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setGpa(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Major:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setMajor(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setMajor(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Degree:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setDegree(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setDegree(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Interests:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setInterests(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setInterests(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Lifestyle:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setLifestyle(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setLifestyle(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Height:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setHeight(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setHeight(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Personality:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setPersonality(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setPersonality(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Relationship:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setRelationship(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setRelationship(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Citizenship:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setCitizenship(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setCitizenship(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Skills:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setSkills(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setSkills(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Employment:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setEmployment(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setEmployment(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">Career:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setCareer(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setCareer(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">GitHub:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setGithub(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setGithub(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="mb-0">
                <div className="row">
                  <div className="col-lg-4 privacytxt">LinkedIn:</div>
                  <div className="col-lg-8">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="privacy-radio-buttons"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="yes"
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="privacy"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="no"
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="privacy"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary border w-100"
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
