import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/verifyemail", { email })
    .then((result) => {
      if (result.data !== "Verification Success!") {
          toast.error("Account does not exist")
          return;
      }
    })
    await axios
      .post("http://localhost:3001/sendverificationcode", { email })
      .then((result) => {
        if (result.data.success === true) {
            navigate("/changePassword", { state: { email: email } });
        } else {
          toast.error(`${result.data.message}`);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Forgot Password?</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Enter your Purdue email address</label>
            <p></p>
            <input
              required
              type="email"
              placeholder="grr@purdue.edu"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p>
            Didn't receive the code?{" "}
            <a href="/verify" onClick={handleSubmit}>
              Resend
            </a>
          </p>
          <button type="submit" className="btn btn-outline-primary w-100">
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
