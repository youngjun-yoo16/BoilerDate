import { useEffect, useState } from "react";
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
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Settings() {
  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const [showPremium, setShowPremium] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchPremiumStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/premiumTrue/${email}`
        );
        // if premium_condition is true, show the button
        if (response.data === "true") {
          setShowPremium(true);
        } else {
          console.log("Premium condition not found or undefined.");
        }
      } catch (err) {
        //console.error(err);
        console.log("Premium condition not found or undefined.");
      }
    };
    fetchPremiumStatus();
    console.log(showPremium);
  }, [email, navigate, showPremium]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 overflow-auto">
      <div className="bg-white p-3 rounded w-50">
        <h2>
          <FontAwesomeIcon icon={faCog} /> Settings
        </h2>
        <br />
        <div className="row">
          <div className="col">
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
          </div>
          <div className="col">
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
                className="btn btn-outline-dark border w-100"
                onClick={() => navigate("/issues", { state: { email: email } })}
              >
                <FontAwesomeIcon icon={faCircleExclamation} /> Issues
              </button>
            </div>

            <div>
              {showPremium ? (
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-dark border w-100"
                    onClick={() =>
                      navigate("/premiumSend", { state: { email: email } })
                    }
                  >
                    <FontAwesomeIcon icon={faStar} /> Premium
                  </button>
                </div>
              ) : (
                <p></p>
              )}
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
          </div>
        </div>

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

export default Settings;
