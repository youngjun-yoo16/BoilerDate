import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../services/helper";

function Login() {
  const flow = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempt, setLoginAttempt] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/login`, { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Admin") {
          navigate("/admin", { state: { email: email } });
        } else if (result.data === "Success") {
          setLoginAttempt(0);
          navigate("/home", { state: { email: email } });
        } else {
          toast.error(result.data);
          if (result.data === "Incorrect password") {
            setLoginAttempt(loginAttempt + 1);
          }
          if (loginAttempt >= 4) {
            setLoginAttempt(0);
            navigate("/forgotPassword", { state: { flow: flow } });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Enter your email address</label>
            <p></p>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Enter your password</label>
            <p></p>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* original: <button type="submit" className="btn btn-outline-primary w-100">*/}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <ToastContainer />
          <p className="float-right">
            <a href="/forgotPassword">forgot password?</a>
          </p>
          <br />
          <br />
        </form>
        <p>Don't have an account?</p>
        <Link to="/signup" className="btn btn-outline-dark border w-100">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
