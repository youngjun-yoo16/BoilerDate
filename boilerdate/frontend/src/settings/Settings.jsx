import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Settings() {
  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 overflow-auto">
      <div className="bg-white p-3 rounded w-25">
        <h2>Settings</h2>
        <br />

        <div className="mb-3">
          <input
            type="button"
            value="Profile"
            name="profile"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/profile", { state: { email: email } })
            }
          />
        </div>

        <div className="mb-3">
          <input
            type="button"
            value="Notifications"
            name="notifications"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/updateNotifications", { state: { email: email } })
            }
          />
        </div>

        <div className="mb-3">
          <input
            type="button"
            value="Privacy"
            name="privacy"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/privacy", { state: { email: email } })
            }
          />
        </div>

        <div className="mb-3">
          <input
            type="button"
            value="Password"
            name="password"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/updatePassword", { state: { email: email } })
            }
          />
        </div>

        <div className="mb-3">
          <input
            type="button"
            value="Delete Account"
            name="delete"
            className="btn btn-outline-danger border w-100"
            onClick={() =>
              navigate("/settings/delete", { state: { email: email } })
            }
          />
        </div>

        <div className="mb-3">
          <input
            type="button"
            value="Home"
            name="home"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/home", { state: { email: email } })}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
