import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";

function Issues() {
  const [category, setCategory] = useState("");

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);

    navigate("/issues/details", {
      state: {
        email: email,
        category: category,
      },
    });

    /*axios
      .post("http://localhost:3001/updateGPA", {
        email,
        issue,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));*/
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Report Issues</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Issues</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="GPA"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"Profile"}>Profile</MenuItem>
                <MenuItem value={"Discover"}>Discover</MenuItem>
                <MenuItem value={"Settings"}>Settings</MenuItem>
                <MenuItem value={"Filter"}>Filter</MenuItem>
                <MenuItem value={"Relationships"}>Relationships</MenuItem>
                <MenuItem value={"Messages"}>Messages</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
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
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Issues;
