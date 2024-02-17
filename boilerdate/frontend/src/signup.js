import { useState } from "react";

function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign up</h2>
        <br />
        <form>
          <div className="mb-3">
            <label for="email">What's your Purdue email?</label>
            <p></p>
            <input
              type="email"
              placeholder="Enter your Purdue email address"
              autoComplete="off"
              name="email"
              className="form-control"
            />
          </div>
          <div>
            <button type="button" className="btn btn-outline-primary w-100">
              Sign up
            </button>
          </div>
          <br />
          <br />
          <p>Already have an account?</p>
          <button type="button" className="btn btn-outline-dark border w-100 ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
