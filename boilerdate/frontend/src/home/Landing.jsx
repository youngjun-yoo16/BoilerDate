import logo from "../images/logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <section>
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="text-center">
          <img src={logo} width={300} height={300} alt="Logo"></img>
          {/*<h2 className="text-xl text-black-500 mb-4">
            Tinder but for nerds @ Purdue
  </h2>*/}
        </div>

        <div className="grid place-items-center mt-4">
          <button
            onClick={handleLogIn}
            className="btn btn-outline-dark border w-100"
          >
            <span className="w-52 relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
              Log in
            </span>
          </button>
          <br />
          <button
            onClick={handleSignUp}
            className="btn btn-outline-dark border w-100"
          >
            <span className="w-52 relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
              Sign Up
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Landing;
