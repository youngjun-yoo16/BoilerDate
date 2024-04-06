import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faTrash,
  faBell,
  faEdit,
  faLock,
  faKey,
  faLightbulb,
  faPhone,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

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
        <h2>
          <FontAwesomeIcon icon={faCog} /> Settings
        </h2>
        <br />

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/profile", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faEdit} /> Profile
          </button>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/notificationList", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faBell} /> Notifications
          </button>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/privacy", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faLock} /> Privacy
          </button>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/updatePassword", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faKey} /> Password
          </button>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/submitFeedback", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faLightbulb} /> Feedback
          </button>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/addnumber", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faPhone} /> Update Phone Number
          </button>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-danger border w-100"
            onClick={() =>
              navigate("/settings/delete", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faTrash} /> Delete Account
          </button>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-danger border w-100"
            onClick={() =>
              navigate("/settings/delete", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faTrash} /> Delete Account
          </button>
        </div>

        <div className="mb-3">
          {/*<input
            type="button"
            value="Home"
            name="home"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/home", { state: { email: email } })}
          />*/}
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/home", { state: { email: email } })}
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
