import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faSignOutAlt,
  faSearch,
  faSliders,
  faUserAlt,
  faHandHoldingHeart,
  faComment,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../services/helper";

function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};
  const [showPremium, setShowPremium] = React.useState(false);
  const [showPremiumFlag, setShowPremiumFlag] = React.useState(true);

  console.log(state);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    // fetch the premium condition of user
    const fetchPremiumStatus = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/premium/${email}`
        );
        // if premium_condition is true, show the button
        if (response.data && response.data.premium !== undefined) {
          setShowPremium(response.data.premium);
        } else {
          console.log("Premium condition not found or undefined.");
        }
      } catch (err) {
        //console.error(err);
        console.log("Premium condition not found or undefined");
      }
    };

    // send request to check if the account is completely premium
    const fetchIfPremium = async () => {
      try {
        axios
          .post(`${BASE_URL}/fetchIfPremium`, {
            email,
          })
          .then((result) => {
            // get if premium and set show prem flag to false
            if (result.data && result.data.premium_status !== undefined) {
              setShowPremiumFlag(false);
            }
          });
      } catch (err) {
        console.error(err);
      }
    };

    // button appears when the condition is first met
    // and only disappears when upgraded to premium
    // if premium once, button never appears
    // there is no logic that handles the case when premium status is false
    fetchPremiumStatus();
    fetchIfPremium();
    console.log(showPremium);
  }, [email, navigate, showPremium]);

  const handleLogout = async (e) => {
    e.preventDefault();
    navigate("/");
    await toast.success("Logout Success!");
  };

  const [showUpgrade, setShowUpgrade] = useState(false);
  const handleCloseUpgrade = () => setShowUpgrade(false);
  const handleShowUpgrade = () => setShowUpgrade(true);

  const handleBlock = (e) => {
    handleShowUpgrade();
  };

  const actualUpgrade = async (e) => {
    handleCloseUpgrade();

    // send request to update the premium status
    axios
      .post(`${BASE_URL}/upgradeToPremium`, {
        email,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));

    // after upgrade, force to refresh
    window.location.reload();
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25 border border-primary">
        <h2>
          <FontAwesomeIcon icon={faHome} /> Home
        </h2>
        <br />
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/discover", { state: { email: email } })}
          >
            <FontAwesomeIcon icon={faSearch} /> Discover
          </button>
        </div>
        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/filter", { state: { email: email } })}
          >
            <FontAwesomeIcon icon={faSliders} /> Discovery Filter
          </button>
        </div>
        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() =>
              navigate("/relationships", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} /> My Relationships
          </button>
        </div>
        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/chat", { state: { email: email } })}
          >
            <FontAwesomeIcon icon={faComment} /> My Chat
          </button>
        </div>
        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/profile", { state: { email: email } })}
          >
            <FontAwesomeIcon icon={faUserAlt} /> My Profile
          </button>
        </div>
        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary border w-100"
            onClick={() => navigate("/settings", { state: { email: email } })}
          >
            <FontAwesomeIcon icon={faCog} /> Settings
          </button>
        </div>

        <div>
          {showPremium && showPremiumFlag ? (
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary border w-100"
                onClick={() => handleBlock()}
              >
                <FontAwesomeIcon icon={faStar} /> Upgrade to premium
              </button>

              <Modal show={showUpgrade} onHide={handleCloseUpgrade} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Congratulations!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  You can now upgrade your account to premium! Premium accounts
                  can boost their visibility and have higher chances of finding
                  a match! You may also send your profile to all the other
                  users!
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseUpgrade}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={actualUpgrade}
                  >
                    Upgrade
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            <p></p>
          )}
        </div>

        <p></p>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-danger border w-100"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
