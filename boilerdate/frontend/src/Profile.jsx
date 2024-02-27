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
        
        console.log(response.data.user.dob);
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
          <h2 className="subheader-text">Basics</h2>
          <div className="selected-container">
            <p className="height">{profile.height}</p>
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
          <div className="selected-container">
            {lifestyles.map((lifestyles, index) => (
              <div key={index} className={`interests`}>
                {lifestyles}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="subheader-text">Academics</h2>
          <div className="selected-container"></div>
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
