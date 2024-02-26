import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};
  
  useEffect(() => {
    if (email === undefined) {
      navigate("/")
    }
  })

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Home</h2>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Settings"
            name="settings"
            className="btn btn-outline-secondary border w-100"
            onClick={() => navigate("/settings", { state: { email: email } })}
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Profile"
            name="profile"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/profile", { state: { email: email } })}
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Logout"
            name="profile"
            className="btn btn-outline-danger border w-100"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
