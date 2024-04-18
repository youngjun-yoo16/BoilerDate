import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMasksTheater } from "@fortawesome/free-solid-svg-icons";

function Personality() {
  const [personality, setPersonality] = useState("");

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchPersonality = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/fetchPersonality/${email}`
        );

        if (response.data === "No user") {
          console.log("No previous user.");
          return;
        }
        if (response.data.success) {
          console.log("success");
          setPersonality(response.data.personality);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching user.");
      }
    };

    fetchPersonality();
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(personality);

    axios
      .post("http://localhost:3001/updatePersonality", {
        email,
        personality,
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
        <h2>
          <FontAwesomeIcon icon={faMasksTheater} /> Update Personality
        </h2>
        <br />
        <form onSubmit={handleSubmit}>
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

          <br />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  navigate("/settings/profile", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-primary w-100">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Personality;
