import React from "react";
import "./Verify.css";
import "react-toastify/dist/ReactToastify.css";
import VerificationInput from "react-verification-input";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verify() {
  const { state } = useLocation();
  const { email } = state || {};
  //const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sendverificationcode", { email })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="otp-body">
      <div class="otp-card">
        <h1>OTP Verifcation</h1>
        <p></p>
        <p>Code has been sent to {email}</p>
        <div>
          <VerificationInput
            length={6}
            validChars="0-9"
            inputProps={{ inputMode: "numeric" }}
            classNames={{
              container: "container",
              character: "character",
              characterInactive: "character--inactive",
              characterSelected: "character--selected",
              characterFilled: "character--filled",
            }}
          />
        </div>
        <br />
        <p>
          Didn't receive the code? <a href="/verify" onClick={handleSubmit}>Resend</a>
        </p>
        <button
          type="submit"
          className="btn btn-outline-primary rounded-20 w-25"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default Verify;
