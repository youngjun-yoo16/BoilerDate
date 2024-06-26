import { useState, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/helper";

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

    const fetchName = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/fetchName/${email}`
        );

        if (response.data === "No user") {
          console.log("No previous user.");
          return;
        }
        if (response.data.success) {
          console.log("success");
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching user.");
      }
    };

    fetchName();
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/updateName`, {
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
        <h2>
          <FontAwesomeIcon icon={faPencil} /> Update Name
        </h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName">First name</label>
            <p></p>
            <input
              required
              value={firstName}
              type="firstName"
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
              value={lastName}
              type="lastName"
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
                  navigate("/settings/profile", { state: { email: email } })
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
