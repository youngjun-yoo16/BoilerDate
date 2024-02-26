import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

function Settings() {
  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Settings</h2>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="User info"
            name="userInfo"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/userinfo", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="GPA"
            name="gpa"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/gpa", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Major"
            name="major"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/major", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Degree"
            name="degree"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/degree", { state: { email: email } })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
