import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa4,
  faBed,
  faBriefcase,
  faBuilding,
  faCakeCandles,
  faDesktop,
  faEarthAmericas,
  faEdit,
  faGraduationCap,
  faHeart,
  faIdBadge,
  faImage,
  faMagicWandSparkles,
  faMapPin,
  faMasksTheater,
  faPencil,
  faPerson,
  faQuoteLeft,
  faQuoteRight,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

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
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/name", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faPencil} /> Name
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/gender", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faVenusMars} /> Gender
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/birthday", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faCakeCandles} /> Birthday
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/gpa", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={fa4} /> GPA
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/major", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faDesktop} /> Major
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/degree", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faGraduationCap} /> Degree
              </button>
            </div>
          </div>

          <div className="col">
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/interests", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faMapPin} /> Interests
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/lifestyle", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faBed} /> Lifestyle
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/height", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faPerson} /> Height
              </button>
            </div>

            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/personality", {
                    state: { email: email },
                  })
                }
              >
                <FontAwesomeIcon icon={faMasksTheater} /> Personality
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/relationship", {
                    state: { email: email },
                  })
                }
              >
                <FontAwesomeIcon icon={faHeart} /> Relationship
              </button>
            </div>
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/citizenship", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faEarthAmericas} /> Citizenship
              </button>
            </div>
          </div>
          <div className="col">
            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/skills", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faMagicWandSparkles} /> Skills
              </button>
            </div>

            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/employment", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faBuilding} /> Employment
              </button>
            </div>

            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/career", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faBriefcase} /> Career goals
              </button>
            </div>

            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/github", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </button>
            </div>

            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/linkedin", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </button>
            </div>

            <p></p>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/bio", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faQuoteLeft} /> Bio{" "}
                <FontAwesomeIcon icon={faQuoteRight} />
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/photo", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faImage} /> Photo
              </button>
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-outline-dark border w-100"
                onClick={() =>
                  navigate("/settings/significant", { state: { email: email } })
                }
              >
                <FontAwesomeIcon icon={faIdBadge} /> Significant Feature
              </button>
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
