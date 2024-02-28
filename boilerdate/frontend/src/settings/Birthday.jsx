import { useState, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Birthday() {
  const [dob, setDob] = useState();

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dob);

    console.log(`this is crr dob: ${dob}`);
    let crrDob = new Date(dob);
    let dateDiff = Date.now() - crrDob.getTime();
    let objAge = new Date(dateDiff);
    const age = Math.abs(objAge.getUTCFullYear() - 1970);
    console.log(age);
    if (age < 18) {
      toast.error("You must be at least 18 years old to use our service!");
    } else {
      axios
        .post("http://localhost:3001/updateBirthday", {
          email,
          dob,
        })
        .then((result) => {
          console.log(result);
          navigate("/settings", { state: { email: email } });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Update Birthday</h2>
        <br />
        <form onSubmit={handleSubmit}>
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
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
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

export default Birthday;
