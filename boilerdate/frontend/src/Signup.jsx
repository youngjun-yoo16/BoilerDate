import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/verifyemail", { email })
      .then((result) => {
        if (result.data === "Verification Success!") {
          toast.error("Account already exists");
        } else {
          axios
            .post("http://localhost:3001/sendverificationcode", { email })
            .then((result) => {
              console.log(result);
              navigate("/verify", { state: { email: email } });
            })
            .catch((err) => console.log(err));
        }
      });
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
              required
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
          <ToastContainer />
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
