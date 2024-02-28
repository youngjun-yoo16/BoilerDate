import React from "react";
import { useState, useEffect } from "react";
import "./Verify.css";
import "react-toastify/dist/ReactToastify.css";
import VerificationInput from "react-verification-input";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Verify() {
  const [tempCode, setTempCode] = useState("");
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sendverificationcode", { email })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const handleVerify = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/verify", { tempCode })
      .then((result) => {
        if (result.data === "Verification Success!") {
          console.log(result);
          navigate("/signup2", { state: { email: email } });
        } else {
          toast.error("Incorrect code: verification failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="otp-body">
      <div className="otp-card">
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
            onChange={(e) => setTempCode(e)}
          />
        </div>
        <br />
        <p>
          Didn't receive the code?{" "}
          <a href="/verify" onClick={handleSubmit}>
            Resend
          </a>
        </p>
        <button
          type="submit"
          /*className="btn btn-outline-primary rounded-20 w-25"*/
          className="btn btn-primary rounded-20 w-25"
          onClick={handleVerify}
        >
          Verify
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Verify;
