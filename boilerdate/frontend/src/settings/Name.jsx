import { useState, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Name() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

    axios
      .post("http://localhost:3001/updateName", {
        email,
        firstName,
        lastName,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Update Name</h2>
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
        </form>
      </div>
    </div>
  );
}

export default Name;
