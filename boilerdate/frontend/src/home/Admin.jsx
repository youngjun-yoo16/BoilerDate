import { useEffect } from "react";
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
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Admin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};
  const [showPremium, setShowPremium] = React.useState(false);

  console.log(state);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    // if swipes > lets say 10 then set showPremium to true
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    navigate("/");
    await toast.success("Logout Success!");
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25 border border-primary">
        <h2>
          <FontAwesomeIcon icon={faHome} /> Home (Admin)
        </h2>
        <br />
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary border w-100"
            onClick={() =>
              navigate("/admin/sendemails", { state: { email: email } })
            }
          >
            <FontAwesomeIcon icon={faEnvelope} /> Send update emails
          </button>
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

export default Admin;
