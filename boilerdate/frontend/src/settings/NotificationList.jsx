import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faCommentAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

function NotificationList() {
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
          <FontAwesomeIcon icon={faBell} />
          &nbsp;Notifications
        </h2>
        <br />

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() =>
              navigate("/updateNotifications", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </button>
        </div>
        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/updateNotificationsText", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faCommentAlt} /> Text
          </button>
        </div>
        <p></p>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary border w-100"
            onClick={() => navigate("/settings", { state: { email: email } })}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationList;
