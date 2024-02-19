import React from "react";
import "./Verify.css";
import "react-toastify/dist/ReactToastify.css";
import VerificationInput from "react-verification-input";

function Verify() {
  return (
    <div className="otp-body">
      <div class="otp-card">
        <h1>OTP Verifcation</h1>
        <p></p>
        <p>Code has been sent to ****@gmail.com</p>
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
          Didn't receive the code? <a href="/verify">Resend</a>
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
