import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa4 } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/helper";

function GPA() {
  const [gpa, setGpa] = useState("");

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchGpa = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/fetchGpa/${email}`
        );

        if (response.data === "No user") {
          console.log("No previous user.");
          return;
        }
        if (response.data.success) {
          console.log("success");
          setGpa(response.data.gpa);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching user.");
      }
    };

    fetchGpa();
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gpa);

    axios
      .post(`${BASE_URL}/updateGPA`, {
        email,
        gpa,
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
          <FontAwesomeIcon icon={fa4} /> Update GPA
        </h2>
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

export default GPA;
