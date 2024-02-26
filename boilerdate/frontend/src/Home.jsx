import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [path, setPath] = useState("");
  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Home</h2>

        <div className="mb-3">
          <input
            type="button"
            value="Settings"
            name="settings"
            className="form-control"
            onClick={() => navigate("/settings", { state: { email: email } })}
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Profile"
            name="profile"
            className="form-control"
            onClick={() => navigate("/profile", { state: { email: email } })}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
