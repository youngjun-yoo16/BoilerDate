import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
      navigate(-1)
    }
  })

  const imageUrl = `http://localhost:3001/image/${email}`;

  //console.log(bio);
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
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div>
        <img src={imageUrl} alt="Uploaded Content" />
      </div>
      <h1 className="header-text">{fName} {lName}, {ages}</h1>
      <form onSubmit={handleSubmit}>
        <div className="content">
          <h2 className="subheader-text">Looking for</h2>
          <div className="selected-container">
            <p className="relationship">{profile.relationship}</p>
          </div>
        </div>

        <div className="content">
          <h2 className="subheader-text">About Me</h2>
          <div className="selected-container">
            <p className="height">{profile.bio}</p>
          </div>
        </div>

        <div className="content">
          <h2 className="subheader-text">Basics</h2>
          <div className="selected-container">
            <div>
            <p className="height">Height: {profile.height}</p>
            <p className="height">Personality Type: {profile.personality}</p>
            <p className="height">Citizenship: {profile.citizenship}</p>
          </div>
          </div>
        </div>

        <div className="content">
          <h2 className="subheader-text">Academics & Career</h2>
          <div className="selected-container">
            <div>
             <p className="height">Major: {profile.major}</p>
           <p className="height">Degree: {profile.degree}</p> 
           <p className="height">GPA: {profile.gpa}</p> 
           <p className="height">Employment History: {profile.employment_history}</p> 
           <p className="height">Skills: {profile.skills}</p> 
           <p className="height">Career Goals: {profile.career_goals}</p>
            </div>
          </div>
        </div>

        <div className="content">
          <h2 className="subheader-text">Interests</h2>
          <div className="selected-container">
            {interests.map((interest, index) => (
              <div key={index} className={`interests`}>
                {interest}
              </div>
            ))}
          </div>
        </div>

        <div className="content">
          <h2 className="subheader-text">Lifestyle</h2>
          <h3 className="subsubheader-text">Pets</h3>
          <div className="selected-container">
            <div className={`interests`}>
            {lifestyles[0]}
            </div>
          </div>
          <h3 className="subsubheader-text">Drinking</h3>
          <div className="selected-container">
            <div className={`interests`}>
            {lifestyles[1]}
            </div>
          </div>
          <h3 className="subsubheader-text">Smoking</h3>
          <div className="selected-container">
            <div className={`interests`}>
            {lifestyles[2]}
            </div>
          </div>
          <h3 className="subsubheader-text">Workout</h3>
          <div className="selected-container">
            <div className={`interests`}>
            {lifestyles[3]}
            </div>
          </div>
          <h3 className="subsubheader-text">Dietary Preference</h3>
          <div className="selected-container">
            <div className={`interests`}>
            {lifestyles[4]}
            </div>
          </div>
          <h3 className="subsubheader-text">Social Media</h3>
          <div className="selected-container">
            <div className={`interests`}>
            {lifestyles[5]}
            </div>
          </div>
          <h3 className="subsubheader-text">Sleeping Habits</h3>
          <div className="selected-container">
            <div className={`interests`}>
            {lifestyles[6]}
            </div>
          </div>
        </div>

        <div className="content">
          <h2 className="subheader-text">Links</h2>
          <div className="selected-container">
            <div>
            <p className="height">Github: {profile.github}</p>
            <p className="height">LinkedIn: {profile.linkedin}</p> 
            </div>
            
          </div>
        </div>

        <ToastContainer />
        <button type="submit" className="btn btn-outline-primary w-100">
          Edit Profile
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
