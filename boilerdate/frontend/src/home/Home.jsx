import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="bg-white p-3 rounded w-25">
        <h2>Home</h2>
        <div className="mb-3">
          <input
            type="button"
            value="Discover"
            name="Discover"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/discover", { state: { email: email } })}
          />
        </div>

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
            value="Filter"
            name="filter"
            className="btn btn-outline-dark border w-100"
            onClick={() => navigate("/filter", { state: { email: email } })}
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Your Matches"
            name="Matches"
            className="btn btn-outline-primary border w-100"
            onClick={() =>
              navigate("/showyourlikes", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Logout"
            name="profile"
            className="btn btn-outline-danger border w-100"
            onClick={handleLogout}
          />
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
