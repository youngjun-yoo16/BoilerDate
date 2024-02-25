import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LifestylePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const petData = [
  "Dog",
  "Cat",
  "Reptile",
  "Amphibian",
  "Bird",
  "Fish",
  "Don't have but love",
  "Turtle",
  "Hamster",
  "Rabbit",
  "Other",
  "Pet-free",
  "All the pets",
  "Want a pet",
  "Allergic to pets",
];
const drinkingData = [
  "Not for me",
  "Sober",
  "On special occasions",
  "On weekends",
  "Most nights",
];
const smokingData = [
  "Social smoker",
  "Smoker when drinking",
  "Non-smoker",
  "Smoker",
  "Trying to quit",
];

const cannabisData = ["Yes", "Occasionally", "Socially", "Never"];

const workoutData = ["Everyday", "Often", "Sometimes", "Never"];

const dietData = [
  "Vegan",
  "Vegetarian",
  "Pescatarian",
  "Kosher",
  "Halal",
  "Carnivore",
  "Omnivore",
  "Other",
];

const socialmediaData = [
  "Influencer status",
  "Socially active",
  "Off",
  "Passive scroller",
];

const sleepinghabitsData = ["Early bird", "Night owl", "In a spectrum"];

function LifestylePage() {
  const [selectedPets, setSelectedPets] = useState([]);
  const [selectedDrinking, setSelectedDrinking] = useState([]);
  const [selectedSmoking, setSelectedSmoking] = useState([]);
  const [selectedCannabis, setSelectedCannabis] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedSocialmedia, setSelectedSocialmedia] = useState([]);
  const [selectedSleepinghabits, setSelectedSleepinghabits] = useState([]);
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);

  const { state } = useLocation();
  const { email, interests } = state || {};

  const navigate = useNavigate();

  function togglePet(pet) {
    if (selectedPets === pet) {
      setSelectedPets(null);
    } else {
      setSelectedPets(pet);
    }
  }

  function toggleDrinking(drinking) {
    if (selectedDrinking === drinking) {
      setSelectedDrinking(null);
    } else {
      setSelectedDrinking(drinking);
    }
  }

  function toggleSmoking(smoking) {
    if (selectedSmoking === smoking) {
      setSelectedSmoking(null);
    } else {
      setSelectedSmoking(smoking);
    }
  }

  function toggleCannabis(cannabis) {
    if (selectedCannabis === cannabis) {
      setSelectedCannabis(null);
    } else {
      setSelectedCannabis(cannabis);
    }
  }

  function toggleWorkout(workout) {
    if (selectedWorkout === workout) {
      setSelectedWorkout(null);
    } else {
      setSelectedWorkout(workout);
    }
  }

  function toggleDiet(diet) {
    if (selectedDiet === diet) {
      setSelectedDiet(null);
    } else {
      setSelectedDiet(diet);
    }
  }

  function toggleSocialmedia(socialmedia) {
    if (selectedSocialmedia === socialmedia) {
      setSelectedSocialmedia(null);
    } else {
      setSelectedSocialmedia(socialmedia);
    }
  }
  function toggleSleep(sleepinghabits) {
    if (selectedSleepinghabits === sleepinghabits) {
      setSelectedSleepinghabits(null);
    } else {
      setSelectedSleepinghabits(sleepinghabits);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      selectedPets.length === 0 ||
      selectedDrinking.length === 0 ||
      selectedSmoking.length === 0 ||
      selectedCannabis.length === 0 ||
      selectedWorkout.length === 0 ||
      selectedDiet.length === 0 ||
      selectedSocialmedia.length === 0 ||
      selectedSleepinghabits.length === 0
    ) {
      // Notify the user to select an option for each category
      toast.info("Please select an option for each category.");
      return;
    }

    // If all categories are selected, proceed to the next step
    selectedLifestyle.push(selectedPets);
    selectedLifestyle.push(selectedDrinking);
    selectedLifestyle.push(selectedSmoking);
    selectedLifestyle.push(selectedCannabis);
    selectedLifestyle.push(selectedWorkout);
    selectedLifestyle.push(selectedDiet);
    selectedLifestyle.push(selectedSocialmedia);
    selectedLifestyle.push(selectedSleepinghabits);
    console.log(selectedLifestyle);

    navigate("/academics", {
      state: {
        email: email,
        interests: interests,
        lifestyle: selectedLifestyle,
      },
    });
  };

  return (
    <div className="container">
      <h1 className="header-text">Your Lifestyle</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="subheader-text">Do you have any pets?</h2>
        <div className="selected-container">
          {petData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedPets === lifestyle ? "selected" : ""
              }`}
              onClick={() => togglePet(lifestyle)}
            >
              {lifestyle}
            </div>
          ))}
        </div>

        <h2 className="subheader-text">How often do you drink?</h2>
        <div className="selected-container">
          {drinkingData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedDrinking === lifestyle ? "selected" : ""
              }`}
              onClick={() => toggleDrinking(lifestyle)}
            >
              {lifestyle}
            </div>
          ))}
        </div>
        <h2 className="subheader-text">How often do you smoke?</h2>
        <div className="selected-container">
          {smokingData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedSmoking === lifestyle ? "selected" : ""
              }`}
              onClick={() => toggleSmoking(lifestyle)}
            >
              {lifestyle}
            </div>
          ))}
        </div>
        <h2 className="subheader-text">Are you 420 friendly?</h2>
        <div className="selected-container">
          {cannabisData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedCannabis === lifestyle ? "selected" : ""
              }`}
              onClick={() => toggleCannabis(lifestyle)}
            >
              {lifestyle}
            </div>
          ))}
        </div>
        <h2 className="subheader-text">Do you workout?</h2>
        <div className="selected-container">
          {workoutData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedWorkout === lifestyle ? "selected" : ""
              }`}
              onClick={() => toggleWorkout(lifestyle)}
            >
              {lifestyle}
            </div>
          ))}
        </div>
        <h2 className="subheader-text">What are your dietary preferences?</h2>
        <div className="selected-container">
          {dietData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedDiet === lifestyle ? "selected" : ""
              }`}
              onClick={() => toggleDiet(lifestyle)}
            >
              {lifestyle}
            </div>
          ))}
        </div>
        <h2 className="subheader-text">How active are you on social media?</h2>
        <div className="selected-container">
          {socialmediaData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedSocialmedia === lifestyle ? "selected" : ""
              }`}
              onClick={() => toggleSocialmedia(lifestyle)}
            >
              {lifestyle}
            </div>
          ))}
        </div>
        <h2 className="subheader-text">What are your sleeping habits?</h2>
        <div className="selected-container">
          {sleepinghabitsData.map((lifestyle, index) => (
            <div
              key={index}
              className={`lifestyle ${
                selectedSleepinghabits === lifestyle ? "selected" : ""
              }`}
              onClick={() => toggleSleep(lifestyle)}
            >
              {lifestyle}
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

export default LifestylePage;
