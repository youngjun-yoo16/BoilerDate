import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Major() {
  const [major, setMajor] = useState("");

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchMajor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/fetchMajor/${email}`
        );

        if (response.data === "No user") {
          console.log("No previous user.");
          return;
        }
        if (response.data.success) {
          console.log("success");
          setMajor(response.data.major);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching user.");
      }
    };

    fetchMajor();
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(major);

    axios
      .post("http://localhost:3001/updateMajor", {
        email,
        major,
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
        <h2>Update Major</h2>
        <br />
        <form onSubmit={handleSubmit}>
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
                <MenuItem value={"Data Science"}>Data Science</MenuItem>
                <MenuItem value={"Engineering"}>Engineering</MenuItem>
                <MenuItem value={"Math"}>Math</MenuItem>
                <MenuItem value={"Physics"}>Physics</MenuItem>
                <MenuItem value={"Polytechnic"}>Polytechnic</MenuItem>
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Liberal Arts"}>Liberal Arts</MenuItem>
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

export default Major;
