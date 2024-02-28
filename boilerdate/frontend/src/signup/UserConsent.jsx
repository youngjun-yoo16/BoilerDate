import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

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
    <Container className="vh-100 d-flex flex-column justify-content-between">
      <div>
        <h1 className="text-center boilerRed font-weight-bold">
          Rules and Guidelines
        </h1>
        <p>&nbsp;</p>
        <ul>
          <li>
            <strong className="boilerRed">1. Purdue Personnel Only</strong>
            <ol>
              <li>
                Only Purdue students and staff are allowed to create an account.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">2. Adult Only</strong>
            <ol>
              <li>
                You must be at least 18 or older to use BoilerDate. Minors are
                not allowed on this application.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">3. Abide Laws</strong>
            <ol>
              <li>
                We do not tolerate anything illegal such as harassment and human
                trafficking.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">4. Respect Boundaries</strong>
            <ol>
              <li>Do not make other people feel uncomfortable.</li>
              <li>
                Do not post any sexual or violent content on your profile.
              </li>
              <li>Treat others the way they want to be treated.</li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">
              5. No More Than One Account per Person
            </strong>
            <ol>
              <li>
                Each Purdue student/staff can only create one account with their
                corresponding Purdue email.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">6. Inclusion and diversity</strong>
            <ol>
              <li>
                People of all genders, ethnicity, religion, sexuality, and
                background are welcome.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">7. Communicate respectfully</strong>
            <ol>
              <li>
                Communication is the most important key to meeting and
                understanding someone new.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">
              8. Be Yourself: No Impersonation
            </strong>
            <ol>
              <li>
                Don’t post other people’s images or pretend to be someone you
                are not.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">9. Report Incidents</strong>
            <ol>
              <li>
                If any inappropriate incidents or suspicious activity are
                detected, please report to us!
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">10. Provide Feedback</strong>
            <ol>
              <li>
                Your feedback is crucial to us! Please leave your feedback so
                that we can better improve your experience.
              </li>
              <br></br>
            </ol>
          </li>
          <li>
            <strong className="boilerRed">11. Be Honest</strong>
            <ol>
              <li>Don't spread false information.</li>
              <li>Don’t spam.</li>
              <li>Don’t manipulate others for your purpose.</li>
              <li>Don't submit misleading reports.</li>
            </ol>
          </li>
          <br></br>
        </ul>
      </div>
      <form
        onSubmit={handleSubmission}
        className="d-flex flex-column align-items-center"
      >
        <label className="form-check-label">
          <strong className="boilerRed">
            I agree to the rules and safety guidelines.
          </strong>
        </label>
        <div className="form-check text-start">
          <input
            type="checkbox"
            className="form-check-input"
            id="consentCheckBox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
      <br></br>
      <ToastContainer />
    </Container>
  );
}

export default UserConsent;
