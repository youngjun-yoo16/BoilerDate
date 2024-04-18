import { useState, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

function Height() {
  const [feet, setFeet] = useState(4);
  const [inches, setInches] = useState(0);

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchHeight = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/fetchHeight/${email}`
        );

        if (response.data === "No user") {
          console.log("No previous user.");
          return;
        }
        if (response.data.success) {
          console.log("success");
          setFeet(response.data.feet);
          setInches(response.data.inches);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching user.");
      }
    };

    fetchHeight();
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let height = parseInt(feet) * 12 + parseInt(inches);
    console.log(height);

    axios
      .post("http://localhost:3001/updateHeight", {
        email,
        height,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <FontAwesomeIcon icon={faPerson} /> Update Height
        </h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="height">Enter your height:</label>
            <p></p>

            <div className="row">
              <div className="col">
                <label htmlFor="feet">feet</label>
                <select
                  className="form-control"
                  value={feet}
                  id="exampleFormControlSelect1"
                  onChange={(e) => setFeet(e.target.value)}
                >
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="inches">inches</label>
                <select
                  className="form-control"
                  value={inches}
                  id="exampleFormControlSelect1"
                  onChange={(e) => setInches(e.target.value)}
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                </select>
              </div>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  navigate("/settings/profile", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-primary w-100">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Height;
