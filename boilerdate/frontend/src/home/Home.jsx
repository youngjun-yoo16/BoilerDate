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
  faComment
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};
  console.log(state);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
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
            onClick={() =>
              navigate("/chat", { state: { email: email } })
            }
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
