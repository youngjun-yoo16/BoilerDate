import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faBan,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

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
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          &nbsp;Notifications
        </h2>
        <br />

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() =>
              navigate("/showmatches", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faHeart} /> Email
          </button>
        </div>
        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/showyourlikes", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faLongArrowAltRight} />{" "}
            <FontAwesomeIcon icon={farHeart} /> Text
          </button>
        </div>
        <p></p>

        <div className="mb-3">
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

export default NotificationList;
