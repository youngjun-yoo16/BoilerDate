import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();

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
    console.log(email);

    console.log(`this is crr dob: ${dob}`);
    let crrDob = new Date(dob);
    let dateDiff = Date.now() - crrDob.getTime();
    let objAge = new Date(dateDiff);
    const age = Math.abs(objAge.getUTCFullYear() - 1970);
    console.log(age);
    if (age < 18) {
      toast.error("You must be at least 18 years old to use our service!");
    } else {
      navigate("/userConsent", {
        state: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          dob: dob,
        },
      });
    }
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
              required
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
              required
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
                  required
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  required
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  required
                  value="non-binary"
                  control={<Radio />}
                  label="Non-binary"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  required
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
            <input
              required
              type="date"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <br />
          <div>
            <button type="submit" className="btn btn-outline-primary w-100">
              Next
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Signup2;
