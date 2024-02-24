import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InterestsPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//is there need to send the entire thing to datbase???
const interestsData = [
  "Travel",
  "Soccer",
  "Music",
  "Outdoors",
  "Movies",
  "Snowboarding",
  "Art Galleries",
  "YouTube",
  "Xbox",
  "Beach",
  "Weightlifting",
  "Walking My Dog",
  "World Peace",
  "Twitter",
  "Virtual Reality",
  "Tango",
  "Tennis",
  "Skiing",
  "Dancing",
  "Road Trips",
  "Climate Change",
  "Football",
  "Festivals",
  "Tattoos",
  "Crossfit",
  "LGBTQ+ Rights",
  "K-Pop",
  "Reading",
  "Photography",
  "Sports",
  "Country Music",
  "Sushi",
  "Hockey",
  "Skincare",
  "Running",
  "Basketball",
  "Boxing",
  "Cars",
  "Walking",
  "Robotics",
  "Instagram",
  "Foodie Tour",
  "Shopping",
  "Clubbing",
  "Self Care",
  "Yoga",
  "Gym",
  "Skateboarding",
  "Coffee",
  "AI",
  "Poetry",
  "Singing",
  "Ice Skating",
  "Gaming",
  "Pilates",
  "Ice Cream",
  "Cheerleading",
  "Motor Sports",
  "E-Sports",
  "Painting",
  "Bowling",
  "Surfing",
  "Coding",
  "Cooking",
  "Motorcycles",
  "Art",
  "Tea",
  "Wine",
  "Volunteering",
  "Vlogging",
  "Anime",
  "Ramen",
  "Volleyball",
  "League of Legends",
  "Baseball",
  "Band",
  "TikTok",
  "Comedy",
  "Blogging",
  "Netflix",
  "Horror Movies",
  "Programming",
  "Math",
  "Environment",
  "Stock Exchange",
  "Equality",
  "Animals",
  "Guitar",
  "Gospel",
  "Parties",
  "Hip Hop",
  "Indoor Activities",
  "Literature",
  "Jogging",
  "Science",
  "Korean Food",
  "NightLife",
  "Online Shopping",
  "NBA",
  "Trying New Things",
  "Self Development",
];

function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  function toggleInterest(interest) {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        toast.info("You can select a maximum of 5 interests.");
      }
    }
  }

  const handleSubmit = (e) => {
    console.log(selectedInterests);
    console.log("Hello");
    navigate("/home");
  };

  return (
    <div className="container">
      <h1 className="header-text">Your Interests</h1>
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
              className={`interest ${
                selectedInterests.includes(interest) ? "selected" : ""
              }`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </div>
          ))}
        </div>
        <ToastContainer />
        <button type="submit" className="btn btn-outline-primary w-100">
          Next
        </button>
      </form>
    </div>
  );
}

export default InterestsPage;
