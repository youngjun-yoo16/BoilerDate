import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import './InterestsPage.css'; 

//is there need to send the entire thing to datbase???
const interestsData = [
    "LeetCode",
   "Hiking",
  "Cooking",
  "Reading",
  "Photography",
  "Traveling",
  "Music",
  "Gaming",
  "Fitness",
  "Art",
  "Movies",
  "Coding",
  "Dancing"
];

function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate(); 

  function toggleInterest(interest) {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  }

  const handleSubmit =(e) =>{
   
    console.log(selectedInterests);
    console.log("Hello");
  
  
  }

  return (
    <div className="container">
      <h1 className="header-text">Interests</h1>
      <form onSubmit={handleSubmit}>
      <div className="selectedInterests-container">
      {selectedInterests.map((interest, index) => (
          <div
            key={index}
            className={`interestsSelected`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </div>
        ))}
      </div>
      <div className="interests-container">
        {interestsData.map((interest, index) => (
          <div
            key={index}
            className={`interest ${selectedInterests.includes(interest) ? 'selected' : ''}`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-outline-primary w-100">
              Next
        </button>
    </form>
    </div>
  );
}

export default InterestsPage;