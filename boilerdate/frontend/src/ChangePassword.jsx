import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const { state } = useLocation();
  const { email } = state || {};
  const [tempCode, setTempCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tempCode === newPassword) {
      toast.error("New password should be different from the temporary code");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords doesn't match");
      return;
    }

    axios
      .post("http://localhost:3001/verify", { email, tempCode })
      .then((result) => {
        if (result.data !== "Verification Success!") {
          toast.error("Incorrect code: verification failed");
        } else {
          axios
            .post("http://localhost:3001/updatepassword", { newPassword })
            .then(() => {
              navigate("/login");
            })
            .catch((err) => {
              toast.error(err);
            });
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
        <h2>Change Password</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password">Enter temporary code</label>
            <p></p>
            <input
              required
              type="password"
              placeholder="Enter temporary code"
              name="oldpassword"
              className="form-control"
              onChange={(e) => setTempCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">New Password</label>
            <p></p>
            <input
              required
              type="password"
              placeholder="Enter password"
              name="newpassword"
              className="form-control"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Confirm New Password</label>
            <p></p>
            <input
              required
              type="password"
              placeholder="Enter password"
              name="confirmpassword"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-outline-primary w-100">
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
