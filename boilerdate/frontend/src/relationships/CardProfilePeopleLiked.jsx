import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardProfilePeopleLiked.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function CardProfilePeopleLiked() {
  const [person, setPerson] = useState([]);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [profile, setProfile] = useState([]);
  const [interests, setInterests] = useState([]);
  const [lifestyles, setLifestyles] = useState([]);

  const [ages, setAges] = useState("");

  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  console.log(email);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const goBack = () => {
    navigate(-1);
  };
  const imageUrl = `http://localhost:3001/image/${email}`;

  const handleDownload = async () => {
    let downloadUrl;
    try {
      const response = await fetch(
        `http://localhost:3001/checkPdfExists/${email}`
      );
      const data = await response.json();
      if (data.exists) {
        downloadUrl = `http://localhost:3001/significant/${email}`;
      } else {
        downloadUrl = `http://localhost:3001/significant/temp`;
      }
      window.location.href = downloadUrl;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchUser", { email })
      .then((response) => {
        console.log(response.data[0].firstName);
        console.log(response.data);
        setPerson(response.data);
        setfName(response.data[0].firstName);
      })
      .catch((error) => {
        toast.error("Failed to fetch profile data");
        console.error("Error fetching profile:", error);
      });
  }, [email]);

  const convertHeight = (heightInInches) => {
    const feet = Math.floor(heightInInches / 12);
    const inches = heightInInches % 12;
    return `${feet} ft ${inches} in`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      {person[0] && (
        <>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img className="d-block w-100" src={imageUrl} alt="First slide" />
            </Carousel.Item>
          </Carousel>

          <h1 className="header-text">
            {person[0].firstName} {person[0].lastName}, {person[0].age}
          </h1>

          <form onSubmit={handleSubmit}>
            {person[0].relationship && (
              <div className="card">
                <div class="card-header">Looking for</div>
                <ul class="list-group list-group-flush">
                  <li className="list-group-item custom-font-style">
                    {person[0].relationship}
                  </li>
                </ul>
              </div>
            )}

            {person[0].bio && (
              <div class="card">
                <div class="card-body">
                  <blockquote class="blockquote mb-0">
                    <p>{person[0].bio}</p>
                    <footer class="blockquote-footer">
                      <cite title="Source Title">
                        {person[0].firstName} {person[0].lastName}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            )}

            <div className="card">
              <div className="card-header">My Significant Feature</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button onClick={handleDownload} className="btn btn-primary">
                    Click Me!
                  </button>
                  {/* if there is nothing uploaded, default file is downloaded*/}
                </li>
              </ul>
            </div>

            {(person[0].height ||
              person[0].personality ||
              person[0].citizenship) && (
              <div className="card">
                <div class="card-header">Basics</div>
                <ul class="list-group list-group-flush">
                  {person[0].height && (
                    <li class="list-group-item">
                      Height: {convertHeight(person[0].height)}
                    </li>
                  )}
                  {person[0].personality && (
                    <li class="list-group-item">
                      Personality Type: {person[0].personality}
                    </li>
                  )}
                  {person[0].citizenship && (
                    <li class="list-group-item">
                      Citizenship: {person[0].citizenship}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {(person[0].major ||
              person[0].degree ||
              person[0].gpa ||
              person[0].employment_history ||
              person[0].skills ||
              person[0].career_goals) && (
              <div className="card">
                <div class="card-header">Academics & Career</div>
                <ul class="list-group list-group-flush">
                  {person[0].major && (
                    <li class="list-group-item">Major: {person[0].major}</li>
                  )}
                  {person[0].degree && (
                    <li class="list-group-item">Degree: {person[0].degree}</li>
                  )}
                  {person[0].gpa && (
                    <li class="list-group-item">GPA: {person[0].gpa}</li>
                  )}
                  {person[0].employment_history && (
                    <li class="list-group-item">
                      Employment History: {person[0].employment_history}
                    </li>
                  )}
                  {person[0].skills && (
                    <li class="list-group-item">Skills: {person[0].skills}</li>
                  )}
                  {person[0].career_goals && (
                    <li class="list-group-item">
                      Career Goals: {person[0].career_goals}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {person[0].interests && (
              <div className="card">
                <div class="card-header">Interests</div>
                <ul class="list-group list-group-flush">
                  <div className="selected-containers">
                    {person[0].interests.map((interest, index) => (
                      <div key={index} className={`interests`}>
                        {interest}
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            {person[0].lifestyle && (
              <div className="card">
                <div class="card-header">Lifestyle</div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    Pets
                    <div className="selected-containerss">
                      <div className={`interests`}>
                        {person[0].lifestyle[0]}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    Drinking
                    <div className="selected-containerss">
                      <div className={`interests`}>
                        {person[0].lifestyle[1]}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    Smoking
                    <div className="selected-containerss">
                      <div className={`interests`}>
                        {person[0].lifestyle[2]}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    Workout
                    <div className="selected-containerss">
                      <div className={`interests`}>
                        {person[0].lifestyle[3]}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    Dietary Preference
                    <div className="selected-containerss">
                      <div className={`interests`}>
                        {person[0].lifestyle[4]}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    Social Media
                    <div className="selected-containerss">
                      <div className={`interests`}>
                        {person[0].lifestyle[5]}
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    Sleeping Habits
                    <div className="selected-containerss">
                      <div className={`interests`}>
                        {person[0].lifestyle[6]}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {(person[0].github || person[0].linkedin) && (
              <div className="card">
                <div class="card-header">Links</div>
                <ul class="list-group list-group-flush">
                  {person[0].github && (
                    <li class="list-group-item">GitHub: {person[0].github}</li>
                  )}
                  {person[0].linkedin && (
                    <li class="list-group-item">
                      LinkedIn: {person[0].linkedin}
                    </li>
                  )}
                </ul>
              </div>
            )}

            <ToastContainer />
            <div className="mb-3">
              <input
                type="button"
                value="Back"
                name="Back"
                className="btn btn-outline-dark border w-100"
                onClick={goBack}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default CardProfilePeopleLiked;
