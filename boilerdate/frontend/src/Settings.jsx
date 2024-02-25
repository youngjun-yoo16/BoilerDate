import { Link } from "react-router-dom";

function Settings() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Settings</h2>
        <div>
          <Link
            to="/settings/userinfo"
            type="button"
            className="btn btn-outline-dark border w-100"
          >
            User info
          </Link>
        </div>
        <p></p>
        <div>
          <Link
            to="/settings/gpa"
            type="button"
            className="btn btn-outline-dark border w-100"
          >
            GPA
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
