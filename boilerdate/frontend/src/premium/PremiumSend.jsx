import { useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function PremiumSend() {
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
      .post("http://localhost:3001/premiumSend", {
        email,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-50">
        <h2>
          <FontAwesomeIcon icon={faStar} /> Send Your Profile!
        </h2>
        <p></p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p>
              Click "send" to send your profile to other users! Your name, age,
              gender, and interests will be sent to other users in our database
              through email, so think carefully before clicking send!
            </p>
          </div>

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
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PremiumSend;
