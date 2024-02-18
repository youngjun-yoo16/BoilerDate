import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Signup2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        firstName,
        lastName,
        gender,
        dob,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
    //navigate("/home");
    console.log(firstName);
    console.log(lastName);
    console.log(gender);
    console.log(dob);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>Create an account</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName">First name</label>
            <p></p>
            <input
              type="firstName"
              placeholder="Enter your first name"
              autoComplete="off"
              name="firstName"
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">Last name</label>
            <p></p>
            <input
              type="lastName"
              placeholder="Enter your last name"
              autoComplete="off"
              name="lastName"
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <FormControl>
              <FormLabel id="gender-radio-buttons">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender-radio-buttons"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="non-binary"
                  control={<Radio />}
                  label="Non-binary"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="mb-3">
            <label htmlFor="dob">Enter your date of birth</label>
            <br />
            <p></p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
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

export default Signup2;
