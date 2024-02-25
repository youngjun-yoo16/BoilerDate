import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function UserConsent() {
  // set state to false as default
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();
  const { email, firstName, lastName, gender, dob } = state || {};

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    console.log(state);
    if (isChecked) {
      // need to decide which page to proceed to
      console.log("user consent submitted");
      navigate("/signup3", {
        state: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          dob: dob,
        },
      });
    } else {
      toast.error(
        "Please agree to the rules and safety guidelines to proceed."
      );
    }
  };

  // return the page
  // may change the formatting
  return (
    <div>
      <br />
      <center>
        <h1>Rules and Guidelines</h1>
      </center>
      <br />
      <br />
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <div>
          <ul>
            <li>
              <strong>1. Purdue Personnel Only</strong>
              <ol>
                <li>
                  Only Purdue students and staff are allowed to create an
                  account.
                </li>
              </ol>
            </li>
            <li>
              <strong>2. Adult Only</strong>
              <ol>
                <li>
                  You must be at least 18 or older to use BoilerDate. Minors are
                  not allowed on this application.
                </li>
              </ol>
            </li>
            <li>
              <strong>3. Abide Laws</strong>
              <ol>
                <li>
                  We do not tolerate anything illegal such as harassment and
                  human trafficking.
                </li>
              </ol>
            </li>
            <li>
              <strong>4. Respect Boundaries</strong>
              <ol>
                <li>Do not make other people feel uncomfortable.</li>
                <li>
                  Do not post any sexual or violent content on your profile.
                </li>
                <li>Treat others the way they want to be treated.</li>
              </ol>
            </li>
            <li>
              <strong>5. No More Than One Account per Person</strong>
              <ol>
                <li>
                  Each Purdue student/staff can only create one account with
                  their corresponding Purdue email.
                </li>
              </ol>
            </li>
            <li>
              <strong>6. Inclusion and diversity</strong>
              <ol>
                <li>
                  People of all genders, ethnicity, religion, sexuality, and
                  background are welcome.
                </li>
              </ol>
            </li>
            <li>
              <strong>7. Communicate respectfully</strong>
              <ol>
                <li>
                  Communication is the most important key to meeting and
                  understanding someone new.
                </li>
              </ol>
            </li>
            <li>
              <strong>8. Be Yourself: No Impersonation</strong>
              <ol>
                <li>
                  Don’t post other people’s images or pretend to be someone you
                  are not.
                </li>
              </ol>
            </li>
            <li>
              <strong>9. Report Incidents</strong>
              <ol>
                <li>
                  If any inappropriate incidents or suspicious activity are
                  detected, please report to us!
                </li>
              </ol>
            </li>
            <li>
              <strong>10. Provide Feedback</strong>
              <ol>
                <li>
                  Your feedback is crucial to us! Please leave your feedback so
                  that we can better improve your experience.
                </li>
              </ol>
            </li>
            <li>
              <strong>11. Be Honest</strong>
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
      <br />
      <br />
      <br />
      <form
        onSubmit={handleSubmission}
        className="d-flex flex-column align-items-center"
      >
        <div className="form-check text-center">
          <input
            type="checkbox"
            className="form-check-input"
            id="consentCheckBox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="consentCheckbox">
            <strong>I agree to the rules and safety guidelines.</strong>
          </label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary mt -3">
          Submit
        </button>
      </form>
      <br />
      <ToastContainer />
    </div>
  );
}

export default UserConsent;
