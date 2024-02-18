import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function UserConsent() {
  // set state to false as default
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const beginningText =
    "Please carefully read and accept our rules and safety guidelines.";

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (isChecked) {
      // need to decide whic hpage to proceed to
      console.log("user consent submitted");
      navigate("/somewhere next");
    }
  };

  // return the page
  // may change the formatting
  return (
    <div>
      <pre>{beginningText} </pre>
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <div>
          <h1 className="text-center mb-4">Rules and Guidelines</h1>
          <ul>
            <li>
              <strong>Purdue Personnel Only</strong>
              <ol>
                <li>
                  Only Purdue students and staff are allowed to create an
                  account.
                </li>
              </ol>
            </li>
            <li>
              <strong>Adult Only</strong>
              <ol>
                <li>
                  You must be at least 18 or older to use BoilerDate. Minors are
                  not allowed on this application.
                </li>
              </ol>
            </li>
            <li>
              <strong>Abide Laws</strong>
              <ol>
                <li>
                  We do not tolerate anything illegal such as harassment and
                  human trafficking.
                </li>
              </ol>
            </li>
            <li>
              <strong>Respect Boundaries</strong>
              <ol>
                <li>Do not make other people feel uncomfortable.</li>
                <li>
                  Do not post any sexual or violent content on your profile.
                </li>
                <li>Treat others the way they want to be treated.</li>
              </ol>
            </li>
            <li>
              <strong>No More Than One Account per Person</strong>
              <ol>
                <li>
                  Each Purdue student/staff can only create one account with
                  their corresponding Purdue email.
                </li>
              </ol>
            </li>
            <li>
              <strong>Inclusion and diversity</strong>
              <ol>
                <li>
                  People of all genders, ethnicity, religion, sexuality, and
                  background are welcome.
                </li>
              </ol>
            </li>
            <li>
              <strong>Communicate respectfully</strong>
              <ol>
                <li>
                  Communication is the most important key to meeting and
                  understanding someone new.
                </li>
              </ol>
            </li>
            <li>
              <strong>Be Yourself: No Impersonation</strong>
              <ol>
                <li>
                  Don’t post other people’s images or pretend to be someone you
                  are not.
                </li>
              </ol>
            </li>
            <li>
              <strong>Report Incidents</strong>
              <ol>
                <li>
                  If any inappropriate incidents or suspicious activity are
                  detected, please report to us!
                </li>
              </ol>
            </li>
            <li>
              <strong>Provide Feedback</strong>
              <ol>
                <li>
                  Your feedback is crucial to us! Please leave your feedback so
                  that we can better improve your experience.
                </li>
              </ol>
            </li>
            <li>
              <strong>Be Honest</strong>
              <ol>
                <li>Don't spread false information.</li>
                <li>Don’t spam.</li>
                <li>Don’t manipulate others for your purpose.</li>
                <li>Don't submit misleading reports.</li>
              </ol>
            </li>
          </ul>
        </div>
      </Container>
      <form onSubmit={handleSubmission}>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="consentCheckBox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="consentCheckbox">
            I agree to the rules and safety guidelines.
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserConsent;
