import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", { email })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign up</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">What's your Purdue email?</label>
            <p></p>
            <input
              type="email"
              placeholder="Enter your Purdue email address"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button type="button" className="btn btn-outline-primary w-100">
              Sign up
            </button>
          </div>
          <br />
          <br />
        </form>
        <p>Already have an account?</p>
        <Link
          to="/login"
          type="button"
          className="btn btn-outline-dark border w-100"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
