import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function CardProfile({person}) {

//const { state } = useLocation();
 //const { email } = state || {};
const navigate = useNavigate();




  const imageUrl = `http://localhost:3001/image/${person.email}`;
  const handleDownload = async () => {
    let downloadUrl;
    try {
      const response = await fetch(
        `http://localhost:3001/checkPdfExists/${person.email}`
      );
      const data = await response.json();
      if (data.exists) {
        downloadUrl = `http://localhost:3001/significant/${person.email}`;
      } else {
        downloadUrl = `http://localhost:3001/significant/temp`;
      }
      window.location.href = downloadUrl;
    } catch (error) {
      console.error(error);
    }
  };


  /*
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
  }, [email]); // eslint-disable-line
*/ 

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
      
     
      <form onSubmit={handleSubmit}>

        {person.relationship && (
        <div className="card">
          <div class="card-header">Looking for</div>
          <ul class="list-group list-group-flush">
            <li className="list-group-item custom-font-style">
              {person.relationship}
            </li>
          </ul>
        </div>
        )}
        
        {person.bio && (
        <div class="card">
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{person.bio}</p>
              <footer class="blockquote-footer">
                <cite title="Source Title">
                  {person.firstName} {person.lastName}
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
        )}

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
        
        {(person.height || person.personality || person.citizenship) && (
        <div className="card">
          <div class="card-header">Basics</div>
          <ul class="list-group list-group-flush">
            {person.height && (
            <li class="list-group-item">
              Height: {convertHeight(person.height)}
            </li>
            )}
            {person.personality && (
            <li class="list-group-item">
              Personality Type: {person.personality}
            </li>
            )}
            {person.citizenship && (
            <li class="list-group-item">Citizenship: {person.citizenship}</li>
            )}
          </ul>
        </div>
        )}

{(person.major || person.degree || person.gpa || person.employment_history || person.skills || person.career_goals) && (
        <div className="card">
          <div class="card-header">Academics & Career</div>
          <ul class="list-group list-group-flush">
            {person.major && (
            <li class="list-group-item">Major: {person.major}</li>
            )}
            {person.degree && (
            <li class="list-group-item">Degree: {person.degree}</li>
            )}
            {person.gpa && (
            <li class="list-group-item">GPA: {person.gpa}</li>
            )}
            {person.employment_history && (
            <li class="list-group-item">
              Employment History: {person.employment_history}
            </li>
            )}
            {person.skills && (
            <li class="list-group-item">Skills: {person.skills}</li>
            )}
            {person.career_goals && (
            <li class="list-group-item">
              Career Goals: {person.career_goals}
            </li>
            )}
          </ul>
        </div>
        )}
        
        {person.interests && (
        <div className="card">
          <div class="card-header">Interests</div>
          <ul class="list-group list-group-flush">
            <div className="selected-containers">
              {person.interests.map((interest, index) => (
                <div key={index} className={`interests`}>
                  {interest}
                </div>
              ))}
            </div>
          </ul>
        </div>
        )}

        {person.lifestyle && (
        <div className="card">
          <div class="card-header">Lifestyle</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Pets
              <div className="selected-containerss">
                <div className={`interests`}>{person.lifestyle[0]}</div>
              </div>
            </li>
            <li class="list-group-item">
              Drinking
              <div className="selected-containerss">
                <div className={`interests`}>{person.lifestyle[1]}</div>
              </div>
            </li>
            <li class="list-group-item">
              Smoking
              <div className="selected-containerss">
                <div className={`interests`}>{person.lifestyle[2]}</div>
              </div>
            </li>
            <li class="list-group-item">
              Workout
              <div className="selected-containerss">
                <div className={`interests`}>{person.lifestyle[3]}</div>
              </div>
            </li>
            <li class="list-group-item">
              Dietary Preference
              <div className="selected-containerss">
                <div className={`interests`}>{person.lifestyle[4]}</div>
              </div>
            </li>
            <li class="list-group-item">
              Social Media
              <div className="selected-containerss">
                <div className={`interests`}>{person.lifestyle[5]}</div>
              </div>
            </li>
            <li class="list-group-item">
              Sleeping Habits
              <div className="selected-containerss">
                <div className={`interests`}>{person.lifestyle[6]}</div>
              </div>
            </li>
          </ul>
        </div>
        )}

    {(person.github || person.linkedin) && ( <div className="card">
          <div class="card-header">Links</div>
          <ul class="list-group list-group-flush">
            {person.github && (
            <li class="list-group-item">GitHub: {person.github}</li>
            )}
            {person.linkedin && (
            <li class="list-group-item">LinkedIn: {person.linkedin}</li>
            )}
          </ul>
        </div>
    )}

        <ToastContainer />
      
      </form>
    </div>
  );
}

export default CardProfile;