import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { 
  faFont,
  faMagnifyingGlass,
  faUser,
  faHeart,
  faBook,
  faShapes,
  faLink,
  faShirt
 } from "@fortawesome/free-solid-svg-icons";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/helper";

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

  const fontOptions = [
    { fontFamily: 'Arial, sans-serif' },
    { fontFamily: 'Roboto, sans-serif' },
    { fontFamily: 'Open Sans, sans-serif' },
    { fontFamily: 'Montserrat, sans-serif' },
    { fontFamily: 'Source Sans Pro, sans-serif' },
    { fontFamily: 'Helvetica, sans-serif' },
    { fontFamily: 'Poppins, sans-serif' },
    { fontFamily: 'Raleway, sans-serif' },
  ];

  const [selectedFontIndex, setSelectedFontIndex] = useState(0);
  const fontStorageKey = `selectedFontIndex-${email}`;

  const handleFontChange = () => {
    setSelectedFontIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % fontOptions.length;
      document.documentElement.style.setProperty('--main-font-family', fontOptions[nextIndex].fontFamily);
      localStorage.setItem(fontStorageKey, nextIndex.toString());
      return nextIndex;
    });
  };
  
  useEffect(() => {
  
    const savedSelectedFontIndex = localStorage.getItem(fontStorageKey);
    if (savedSelectedFontIndex) {
      const index = parseInt(savedSelectedFontIndex, 10);
      setSelectedFontIndex(index);
      
      document.documentElement.style.setProperty('--main-font-family', fontOptions[index].fontFamily);
    }
  }, [email]);

  const colorClasses = [
    "text-bg-primary",
    "text-bg-secondary",
    "text-bg-success",
    "text-bg-danger",
    "text-bg-warning",
    "text-bg-info",
    "text-bg-light", 
    "text-bg-dark",
  ];

  const [selectedCards, setSelectedCards] = useState({});
  const uniqueLocalStorageKey = `selectedCards-${email}`;

  useEffect(() => {
    // Load selectedCards from local storage when the component mounts
    const savedSelectedCards = JSON.parse(localStorage.getItem(uniqueLocalStorageKey));
    if (savedSelectedCards) {
      setSelectedCards(savedSelectedCards);
    }
  }, [email]);

  const handleCardClick = (cardName) => {
    setSelectedCards((prevSelectedCards) => {
      const currentColorClass = prevSelectedCards[cardName] || "";
      const currentColorIndex = colorClasses.indexOf(currentColorClass);
      const nextColorIndex = (currentColorIndex + 1) % colorClasses.length;
      const updatedSelectedCards = {
        ...prevSelectedCards,
        [cardName]: colorClasses[nextColorIndex],
      };

      // Save updatedSelectedCards to local storage using the unique key
      localStorage.setItem(uniqueLocalStorageKey, JSON.stringify(updatedSelectedCards));

      return updatedSelectedCards;
    });
  };


  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const imageUrl = `${BASE_URL}/image/${email}`;

  useEffect(() => {
    axios
      .post(`${BASE_URL}/fetchProfile`, { email })
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
        `${BASE_URL}/checkPdfExists/${email}`
      );
      const data = await response.json();
      if (data.exists) {
        downloadUrl = `${BASE_URL}/significant/${email}`;
      } else {
        downloadUrl = `${BASE_URL}/significant/temp`;
      }
      window.location.href = downloadUrl;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
        `}
      </style>
      <Carousel data-bs-theme="dark">
        
          <img className="d-block w-100" src={imageUrl} alt="First slide" />
        
      </Carousel>

      <h1 className="header-text">
        {fName} {lName}, {ages}
      </h1>
      <form onSubmit={handleSubmit}>
      <div
        className={`card ${selectedCards["LookingFor"] || ""} mb-3`}
      
        onClick={() => handleCardClick("LookingFor")}
      >
          <div className="card-header"><FontAwesomeIcon icon={faMagnifyingGlass} />  Looking for</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item custom-font-style">
              {profile.relationship}
            </li>
          </ul>
        </div>

        <div
        className={`card ${selectedCards["quote"] || ""} mb-3`}
      
        onClick={() => handleCardClick("quote")}
      >
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

        <div
        className={`card ${selectedCards["feature"] || ""} mb-3`}
      
        onClick={() => handleCardClick("feature")}
      >
          <div className="card-header"><FontAwesomeIcon icon={faHeart} />  My Significant Feature</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <button onClick={handleDownload} className="btn btn-primary">
                Click Me!
              </button>
              {/* if there is nothing uploaded, default file is downloaded*/}
            </li>
          </ul>
        </div>

        <div
        className={`card ${selectedCards["Basics"] || ""} mb-3`}
      
        onClick={() => handleCardClick("Basics")}
      >
          <div className="card-header"><FontAwesomeIcon icon={faUser} /> Basics</div>
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

        <div
        className={`card ${selectedCards["academics"] || ""} mb-3`}
      
        onClick={() => handleCardClick("academics")}
      >
          <div className="card-header"><FontAwesomeIcon icon={faBook} />  Academics & Career</div>
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

        <div
        className={`card ${selectedCards["interests"] || ""} mb-3`}
      
        onClick={() => handleCardClick("interests")}
      >
          <div className="card-header"><FontAwesomeIcon icon={faShapes} />  Interests</div>
          <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="selected-containers">
              {interests.map((interest, index) => (
                <div key={index} className={`interests`}>
                  {interest}
                </div>
              ))}
            </div>
            </li>
          </ul>
        </div>

        <div
        className={`card ${selectedCards["lifestyle"] || ""} mb-3`}
      
        onClick={() => handleCardClick("lifestyle")}
      >
          <div className="card-header"><FontAwesomeIcon icon={faShirt} />  Lifestyle</div>
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

        <div
        className={`card ${selectedCards["links"] || ""} mb-3`}
      
        onClick={() => handleCardClick("links")}
      >
          <div className="card-header"><FontAwesomeIcon icon={faLink} />  Links</div>
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
            onClick={handleFontChange} 
          >
            <FontAwesomeIcon icon={faFont} /> Change Font
          </button> 
          </div>

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
