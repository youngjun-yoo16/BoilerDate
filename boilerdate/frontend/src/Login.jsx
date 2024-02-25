import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempt, setLoginAttempt] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          setLoginAttempt(0);
          navigate("/home");
        } else {
          toast.error(result.data);
          if (result.data === "Incorrect password") {
            setLoginAttempt(loginAttempt + 1); 
          }
          if (loginAttempt >= 4) {
            setLoginAttempt(0);
            navigate('/forgotPassword');
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
            />
          </div>
          <button type="submit" className="btn btn-outline-primary w-40" style={{float: 'left'}}>
            Login
          </button>
          <ToastContainer />
          <button type="submit" className="btn btn-outline-primary w-40" style={{float: 'right'}}>
            Change Password
          </button>
          <br />
          <br />
          <p class="float-right">
            <a href="/forgotPassword">
              forgot password?
            </a>
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
