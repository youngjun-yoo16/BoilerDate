import { useState, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../profile/LifestylePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoryData = [
  "Profile",
  "Discover",
  "Settings",
  "Filter",
  "Relationships",
  "Messages",
  "Other",
];

function Issues() {
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  function toggleCategory(category) {
    if (selectedCategory === category) {
      setSelectedCategory([]);
    } else {
      setSelectedCategory(category);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);

    if (selectedCategory.length === 0) {
      // Notify the user to select an option for each category
      toast.info("Please select a category.");
      return;
    }

    navigate("/issues/details", {
      state: {
        email: email,
        category: category,
      },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Report Issues</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="selected-container">
            {categoryData.map((lifestyle, index) => (
              <div
                key={index}
                className={`lifestyle ${
                  selectedCategory === lifestyle ? "selected" : ""
                }`}
                onClick={() => {
                  toggleCategory(lifestyle);
                  setCategory(lifestyle);
                }}
              >
                {lifestyle}
              </div>
            ))}
          </div>
          <ToastContainer />

          <br />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  navigate("/settings", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-primary w-100">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Issues;
