import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
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

  const imageUrl = `http://localhost:3001/image/${email}`;

  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchProfile", { email })
      .then((response) => {
        console.log(response.data);

        let crrDob = new Date(response.data.user.dob);
        let dateDiff = Date.now() - crrDob.getTime();
        let objAge = new Date(dateDiff);
        const age = Math.abs(objAge.getUTCFullYear() - 1970);
        console.log(age);
        setAges(age);

        setfName(response.data.user.firstName);
        setlName(response.data.user.lastName);
        setProfile(response.data.profile);
        setInterests(response.data.profile.interests);
        setLifestyles(response.data.profile.lifestyle);
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
  return (
    <div className="container">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100" src={imageUrl} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={imageUrl} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={imageUrl} alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <h1 className="header-text">
        {fName} {lName}, {ages}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">Looking for</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item custom-font-style">
              {profile.relationship}
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{profile.bio}</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">
                  {fName} {lName}
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Please click the button</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <button onClick={handleDownload} className="btn btn-primary">
                I believe this shows me well
              </button>
              {/* if there is nothing uploaded, default file is downloaded*/}
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">Basics</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Height: {convertHeight(profile.height)}
            </li>
            <li className="list-group-item">
              Personality Type: {profile.personality}
            </li>
            <li className="list-group-item">
              Citizenship: {profile.citizenship}
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">Academics & Career</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Major: {profile.major}</li>
            <li className="list-group-item">Degree: {profile.degree}</li>
            <li className="list-group-item">GPA: {profile.gpa}</li>
            <li className="list-group-item">
              Employment History: {profile.employment_history}
            </li>
            <li className="list-group-item">Skills: {profile.skills}</li>
            <li className="list-group-item">
              Career Goals: {profile.career_goals}
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">Interests</div>
          <ul className="list-group list-group-flush">
            <div className="selected-containers">
              {interests.map((interest, index) => (
                <div key={index} className={`interests`}>
                  {interest}
                </div>
              ))}
            </div>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">Lifestyle</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Pets
              <div className="selected-containerss">
                <div className={`interests`}>{lifestyles[0]}</div>
              </div>
            </li>
            <li className="list-group-item">
              Drinking
              <div className="selected-containerss">
                <div className={`interests`}>{lifestyles[1]}</div>
              </div>
            </li>
            <li className="list-group-item">
              Smoking
              <div className="selected-containerss">
                <div className={`interests`}>{lifestyles[2]}</div>
              </div>
            </li>
            <li className="list-group-item">
              Workout
              <div className="selected-containerss">
                <div className={`interests`}>{lifestyles[3]}</div>
              </div>
            </li>
            <li className="list-group-item">
              Dietary Preference
              <div className="selected-containerss">
                <div className={`interests`}>{lifestyles[4]}</div>
              </div>
            </li>
            <li className="list-group-item">
              Social Media
              <div className="selected-containerss">
                <div className={`interests`}>{lifestyles[5]}</div>
              </div>
            </li>
            <li className="list-group-item">
              Sleeping Habits
              <div className="selected-containerss">
                <div className={`interests`}>{lifestyles[6]}</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">Links</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">GitHub: {profile.github}</li>
            <li className="list-group-item">LinkedIn: {profile.linkedin}</li>
          </ul>
        </div>

        <ToastContainer />
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/home", { state: { email: email } })}
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
