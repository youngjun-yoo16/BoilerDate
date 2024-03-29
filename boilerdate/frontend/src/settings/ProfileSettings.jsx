import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function ProfileSettings() {
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
      <div className="bg-white p-3 rounded w-50">
        <h2>
          <FontAwesomeIcon icon={faEdit} /> Profile Settings
        </h2>

        <div className="row">
          <div className="col">
            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Name"
                name="name"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/name", { state: { email: email } })
                }
              />
            </div>
            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Gender"
                name="gender"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/gender", { state: { email: email } })
                }
              />
            </div>
            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Birthday"
                name="birthday"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/birthday", { state: { email: email } })
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

          <div className="col">
            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Interests"
                name="interests"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/interests", { state: { email: email } })
                }
              />
            </div>
            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Lifestyle"
                name="lifestyle"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/lifestyle", { state: { email: email } })
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
                  navigate("/settings/relationship", {
                    state: { email: email },
                  })
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
          <div className="col">
            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Skills"
                name="skills"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/skills", { state: { email: email } })
                }
              />
            </div>

            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Emplyoment"
                name="emplyoment"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/employment", { state: { email: email } })
                }
              />
            </div>

            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Career goals"
                name="career"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/career", { state: { email: email } })
                }
              />
            </div>

            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="GitHub"
                name="github"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/github", { state: { email: email } })
                }
              />
            </div>

            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="LinkedIn"
                name="linkedin"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/linkedin", { state: { email: email } })
                }
              />
            </div>

            <p></p>
            <div className="mb-3">
              <input
                type="button"
                value="Bio"
                name="bio"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/bio", { state: { email: email } })
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <input
                type="button"
                value="Photo"
                name="photo"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/photo", { state: { email: email } })
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <input
                type="button"
                value="Significant Feature"
                name="significant feature"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/significant", { state: { email: email } })
                }
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="button"
            value="Back"
            name="back"
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/settings", { state: { email: email } })}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
