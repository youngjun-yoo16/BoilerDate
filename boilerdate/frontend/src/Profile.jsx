import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

  
function ProfilePage() {

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/fetchProfile")
        .then(response => {
            setProfile(response.data);
            console.log(profile);
        })
        .catch(error => {
            toast.error("Failed to fetch profile data");
            console.error("Error fetching profile:", error);
        });
    }, []);


  
    const handleSubmit = (e) => {

        e.preventDefault();

    }

    
  return (
    <div className="container">
      <h1 className="header-text">Name</h1>
      <form onSubmit={handleSubmit}>

      <div>
        <h2 className="subheader-text">Looking for</h2>
        <div className="selected-container">
      
        </div>
        </div>

        <div>
        <h2 className="subheader-text">Basics</h2>
        <div className="selected-container">
       
        </div>
        </div>

        <div>  
        <h2 className="subheader-text">Interests</h2>
        <div className="selected-container">
     
        </div>
        </div>

        <div>
        <h2 className="subheader-text">Lifestyle</h2>
        <div className="selected-container">
       
         
        </div>
        </div>

      

        <div>
        <h2 className="subheader-text">Academics</h2>
        <div className="selected-container">
       
         
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

