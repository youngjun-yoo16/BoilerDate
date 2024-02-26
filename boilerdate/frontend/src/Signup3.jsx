import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// Assuming uploadphoto.jsx is in the same directory

function Signup3() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { state } = useLocation();
  const { email, firstName, lastName, gender, dob } = state || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 10) {
      toast.error(
        "Please make sure that your password has at least 10 characters!"
      );
      return;
    }
    const uppercase_check_regex = /[A-Z]/;
    const lowercase_check_regex = /[a-z]/;
    const special_check_regex = /[^a-zA-Z0-9]/;
    const number_check_regex = /\d/;
    let flag = true;
    if (!uppercase_check_regex.test(password)) {
      toast.error("Please include at least one uppercase letter!");
      flag = false;
    }
    if (!lowercase_check_regex.test(password)) {
      toast.error("Please include at least one lowercase letter!");
      flag = false;
    }
    if (!special_check_regex.test(password)) {
      toast.error("Please include at least one special character!");
      flag = false;
    }
    if (!number_check_regex.test(password)) {
      toast.error("Please include at least one number!");
      flag = false;
    }
    if (!flag) {
      return;
    }

    setPassword(btoa(password))

    axios
      .post("http://localhost:3001/signup", {
        email,
        password,
        firstName,
        lastName,
        gender,
        dob,
      })
      .then((result) => {
        console.log(result);
        navigate("/interests", { state: { email: email } });
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup3;
