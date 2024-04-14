import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../profile/LifestylePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const petData = [
  "Dog",
  "Cat",
  "Bird",
  "Hamster",
  "Other",
  "Don't have but love",
  "Pet-free",
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

const workoutData = ["Everyday", "Often", "Sometimes", "Never"];

const dietData = [
  "Vegan",
  "Vegetarian",
  "Pescatarian",
  "Kosher",
  "Halal",
  "Carnivore",
  "Omnivore",
];

const socialmediaData = [
  "Influencer status",
  "Socially active",
  "Off",
  "Passive scroller",
];

const sleepinghabitsData = ["Early bird", "Night owl", "In a spectrum"];

function UpdateLifestyle() {
  const [selectedPets, setSelectedPets] = useState([]);
  const [selectedDrinking, setSelectedDrinking] = useState([]);
  const [selectedSmoking, setSelectedSmoking] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedSocialmedia, setSelectedSocialmedia] = useState([]);
  const [selectedSleepinghabits, setSelectedSleepinghabits] = useState([]);
  const [selectedLifestyle, setselectedLifestyle] = useState([]);

  const { state } = useLocation();
  const { email } = state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchLifestyle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/fetchLifestyle/${email}`
        );

        if (response.data === "No user") {
          console.log("No previous user.");
          return;
        }
        if (response.data.success) {
          console.log("success");
          console.log(response.data.lifestyle);
          console.log(response.data.lifestyle.length);

          togglePet(response.data.lifestyle[0]);
          toggleDrinking(response.data.lifestyle[1]);
          toggleSmoking(response.data.lifestyle[2]);
          toggleWorkout(response.data.lifestyle[3]);
          toggleDiet(response.data.lifestyle[4]);
          toggleSocialmedia(response.data.lifestyle[5]);
          toggleSleep(response.data.lifestyle[6]);

          //setBio(response.data.bio);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching user.");
      }
    };

    fetchLifestyle();
  }, [email, navigate]);

  function togglePet(pet) {
    if (selectedPets === pet) {
      setSelectedPets([]);
    } else {
      setSelectedPets(pet);
    }
  }

  function toggleDrinking(drinking) {
    if (selectedDrinking === drinking) {
      setSelectedDrinking([]);
    } else {
      setSelectedDrinking(drinking);
    }
  }

  function toggleSmoking(smoking) {
    if (selectedSmoking === smoking) {
      setSelectedSmoking([]);
    } else {
      setSelectedSmoking(smoking);
    }
  }

  function toggleWorkout(workout) {
    if (selectedWorkout === workout) {
      setSelectedWorkout([]);
    } else {
      setSelectedWorkout(workout);
    }
  }

  function toggleDiet(diet) {
    if (selectedDiet === diet) {
      setSelectedDiet([]);
    } else {
      setSelectedDiet(diet);
    }
  }

  function toggleSocialmedia(socialmedia) {
    if (selectedSocialmedia === socialmedia) {
      setSelectedSocialmedia([]);
    } else {
      setSelectedSocialmedia(socialmedia);
    }
  }
  function toggleSleep(sleepinghabits) {
    if (selectedSleepinghabits === sleepinghabits) {
      setSelectedSleepinghabits([]);
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

    selectedLifestyle.push(selectedWorkout);
    selectedLifestyle.push(selectedDiet);
    selectedLifestyle.push(selectedSocialmedia);
    selectedLifestyle.push(selectedSleepinghabits);
    console.log(selectedLifestyle);

    axios
      .post("http://localhost:3001/updateLifestyle", {
        email,
        selectedLifestyle,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1 className="header-text">Update Lifestyle</h1>
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

export default UpdateLifestyle;
