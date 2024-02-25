import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Signup3() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { state } = useLocation();
  const { email, firstName, lastName, gender, dob } = state || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/signup", {
        email,
        firstName,
        lastName,
        gender,
        dob,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign up</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Enter your password</label>
            <p></p>
            <input
              required
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <small id="passwordHelpBlock" className="form-text text-muted">
              Password must have at least 10 characters, 1 uppercase letter, 1
              lowercase letter 1 number, and 1 special character.
            </small>
          </div>
          <button type="submit" className="btn btn-outline-primary w-100">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup3;
