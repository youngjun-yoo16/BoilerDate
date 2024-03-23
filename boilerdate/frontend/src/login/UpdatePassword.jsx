import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatePassword() {
  const { state } = useLocation();
  const { email } = state || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords doesn't match");
      return;
    }

    if (newPassword.length < 10) {
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
    if (!uppercase_check_regex.test(newPassword)) {
      toast.error("Please include at least one uppercase letter!");
      flag = false;
    }
    if (!lowercase_check_regex.test(newPassword)) {
      toast.error("Please include at least one lowercase letter!");
      flag = false;
    }
    if (!special_check_regex.test(newPassword)) {
      toast.error("Please include at least one special character!");
      flag = false;
    }
    if (!number_check_regex.test(newPassword)) {
      toast.error("Please include at least one number!");
      flag = false;
    }
    if (!flag) {
      return;
    }

    const encodedPassword = btoa(newPassword);

    axios
      .post("http://localhost:3001/updatepassword", {
        email,
        encodedPassword,
      })
      .then(() => {
        navigate("/settings");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Update Password</h2>
        <br />
        <form onSubmit={handleSubmit}>
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
            <small id="passwordHelpBlock" className="form-text text-muted">
              Password must have at least 10 characters, 1 uppercase letter, 1
              lowercase letter 1 number, and 1 special character.
            </small>
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

          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary border w-100"
                onClick={() =>
                  navigate("/settings", { state: { email: email } })
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
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
