import { useState } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Relationship() {
  const [relationship, setRelationship] = useState("");

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(relationship);

    axios
      .post("http://localhost:3001/updateRelationship", {
        email,
        relationship,
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
        <h2>Update Relationship</h2>
        <br />
        <form onSubmit={handleSubmit}>
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

export default Relationship;
