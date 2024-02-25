import { Link } from "react-router-dom";

function Settings() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Settings</h2>
        <Link
          to="/settings"
          type="button"
          className="btn btn-outline-dark border w-100"
        >
          GPA
        </Link>
      </div>
    </div>
  );
}

export default Settings;
