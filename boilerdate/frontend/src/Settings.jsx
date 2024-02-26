import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Settings() {
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
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Height"
            name="height"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/height", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Personality"
            name="personality"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/personality", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Relationship"
            name="relationship"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/relationship", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Citizenship"
            name="citizenship"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/settings/citizenship", { state: { email: email } })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
