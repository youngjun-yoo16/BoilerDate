import { useState, useEffect, useLayoutEffect } from "react";
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
import { BASE_URL } from "../services/helper";

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

    const fetchPrivacy = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/fetchPrivacy/${email}`);
        //console.log(response.data.gpa);

        if (response.data === "No privacy status") {
          console.log("No previous privacy settings.");
          return;
        }
        if (response.data.success) {
          //console.log("success");
          setGpa(response.data.gpa);
          setMajor(response.data.major);
          setDegree(response.data.degree);
          setInterests(response.data.interests);
          setLifestyle(response.data.lifestyle);
          setHeight(response.data.height);
          setPersonality(response.data.personality);
          setRelationship(response.data.relationship);
          setCitizenship(response.data.citizenship);
          setSkills(response.data.skills);
          setEmployment(response.data.employment);
          setCareer(response.data.career);
          setGithub(response.data.github);
          setLinkedin(response.data.linkedin);
        } else {
          console.log("not success");
        }
      } catch (err) {
        //console.error(err);
        console.log("Error fetching privacy settings.");
      }
    };

    fetchPrivacy();
    //console.log("gpa:" + gpa);
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/privacy`, {
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
                        value={gpa}
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
                        value={major}
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
                        value={degree}
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
                        value={interests}
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
                        value={lifestyle}
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
                        value={height}
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
                        value={personality}
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
                        value={relationship}
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
                        value={citizenship}
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
                        value={skills}
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
                        value={employment}
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
                        value={career}
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
                        value={github}
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
                        value={linkedin}
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
