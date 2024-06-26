import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../profile/InterestsPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/helper";

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

function UpdateInterests() {
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

  const { state } = useLocation();
  const { email } = state || {};

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchInterests = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/fetchInterests/${email}`
        );

        if (response.data === "No user") {
          console.log("No previous user.");
          return;
        }
        if (response.data.success) {
          console.log("success");
          console.log(response.data.interests);
          console.log(response.data.interests.length);
          for (let index = 0; index < response.data.interests.length; index++) {
            let element = response.data.interests[index];
            console.log(element);
            //toggleInterest(element);
            //setSelectedInterests([...selectedInterests, element]);
          }
          setSelectedInterests(
            selectedInterests.concat(response.data.interests)
          );
          console.log(selectedInterests);

          //setBio(response.data.bio);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching user.");
      }
    };

    fetchInterests();
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      toast.info("Please select at least one interest.");
      return;
    }
    console.log(selectedInterests);
    axios
      .post(`${BASE_URL}/updateInterests`, {
        email,
        selectedInterests,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1 className="header-text">
        <FontAwesomeIcon icon={faMapPin} /> Update Interests
      </h1>
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
        <br />
      </form>
    </div>
  );
}

export default UpdateInterests;
