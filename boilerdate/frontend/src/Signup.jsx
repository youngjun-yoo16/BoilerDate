import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //<Link to={{ pathname: "/signup2", state: email }}>send to signup2</Link>;
    axios
      .post("http://localhost:3001/sendverificationcode", { email })
      .then((result) => {
        console.log(result);
        //navigate("/signup2", { state: { email: email } });
        navigate("/verify", { state: { email: email } });
      })
      .catch((err) => console.log(err));
    //navigate("/verify");
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
            <button type="submit" className="btn btn-outline-primary w-100">
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
