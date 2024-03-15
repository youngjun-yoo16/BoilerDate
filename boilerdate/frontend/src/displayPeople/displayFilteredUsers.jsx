import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import TinderCard from "react-tinder-card";
import "./displayFilteredUser.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandleUserLikesAndDislikes from "./HandleLikesDislikes";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import axios from "axios";

function DisplayFilteredUsers() {
  const { state } = useLocation();
  const { email } = state || {};
   const navigate = useNavigate();

  // array of users
  // will be getting from the database later and store it here
  
/*
  const [check, setCheck] = useState(1);
  const [peoples, setPeople] = useState([
    {
      email: "hi@purdue.edu",
      firstName: "hi",
      major: "CS",
      age: "21",
      imageUrl: `https://media.gettyimages.com/photos/amazon-ceo-jeff-bezos-founder-of-space-venture-blue-origin-and-owner-picture-id1036094130?k=6&m=1036094130&s=612x612&w=0&h=3tKtZs6_SIXFZ2sdRUB4LjAf_GlfCMekP2Morwkt5EM=`,
    },
    {
      email: "hello@purdue.edu",
      firstName: "hello",
      major: "DS",
      age: "20",
      imageUrl: `https://media.gettyimages.com/photos/of-tesla-and-space-x-elon-musk-attends-the-2015-vanity-fair-oscar-picture-id464172224?k=6&m=464172224&s=612x612&w=0&h=M9Wf9-mcTJBLRWKFhAX_QGVAPXogzxyvZeCiIV5O3pw=`,
    },
  ]);
  
*/
  
  const [peoples, setPeople] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [lastDirection, setLastDirecton] = useState();
  const [childRefs, setChildRefs] = useState([]);
  const currentIndexRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.post("http://localhost:3001/fetchFilteredUsers", { email });
        setPeople(response.data);
        console.log(response.data);
    
      } catch (error) {
        toast.error("Failed to fetch profile data");
        console.error("Error fetching profile:", error);
      } 
    };
    fetchData();
  }, [email]);
 
  useEffect(() => {
    console.log(peoples); // Log after peoples is updated
    setCurrentIndex(peoples.length - 1); // Update currentIndex based on the new length of peoples
    currentIndexRef.current = peoples.length - 1; 
    setChildRefs(peoples.map(() => React.createRef()));
  }, [peoples]);


  
console.log(peoples.length)
 
//const [currentIndex, setCurrentIndex] = useState(peoples.length - 1);
 // const [lastDirection, setLastDirecton] = useState();



 
  console.log(childRefs);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < peoples.length - 1

  const canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    setLastDirecton(direction)
    updateCurrentIndex(index - 1)
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  const swipe = async (buttonType) => {
   // const temp_email = "lee3546@purdue.edu";
    if (buttonType === "like") {

      if (canSwipe && currentIndex < peoples.length) {
        await childRefs[currentIndex].current.swipe('right') // Swipe the card!
      }
      //HandleUserLikesAndDislikes(temp_email, peoples[0].email, true);
     // HandleUserLikesAndDislikes(temp_email, peoples[1].email, true);
    } else if (buttonType === "dislike") {
      if (canSwipe && currentIndex < peoples.length) {
        await childRefs[currentIndex].current.swipe('left') // Swipe the card!
      }
     // HandleUserLikesAndDislikes(temp_email, peoples[0].email, false);
      //HandleUserLikesAndDislikes(temp_email, peoples[1].email, false);
    } 
  };

  const handleSubmit = (e) => {
     if (e === "arrow") {

    }
  };

  let message;
  if (lastDirection === 'left') {
    message = (
      <h2 className='infoText'>
        NOPE
      </h2>
    );
  } else if (lastDirection === 'right') {
    message = (
      <h2 className='infoText'>
        LIKE
      </h2>
    );
  }

  
  return (
    <div className="tinderCard_container">
      {peoples.map((person, index) => (
        <TinderCard
          key={person.firstName}
          ref={childRefs[index]}
          className="swipe"
          preventSwipe={[`up`, `down`]}
          onSwipe={(dir) => swiped(dir, person.firstName, index)}
          onCardLeftScreen={() => outOfFrame(person.firstName, index)}
        >
          <div
            className="card filter"
            style={{
              backgroundImage: "url(" + person.imageUrl + ")",
            }}
          >
            <h3 className="main_text">
              {person.firstName} {person.age}{" "}
            </h3>
            <div className="arrowButton">
              <IconButton onClick={() => handleSubmit("arrow")}>
                <ArrowCircleUpIcon
                  sx={{ color: "grey" }}
                  fontSize="large"
                  className="arrow_button"
                />
              </IconButton>
            </div>
          </div>
        </TinderCard>
      ))}

      <div className="swipeButton">
        <IconButton onClick={() => swipe("dislike")}>
          <CloseIcon
            sx={{ color: "black" }}
            fontSize="large"
            className="close_button"
          />
        </IconButton>
        <IconButton onClick={() => swipe("like")}>
          <FavoriteIcon
            sx={{ color: "red" }}
            fontSize="large"
            className="favorite_button"
          />
        </IconButton>
      </div>

      <div className="message">
        {message}
      </div>

    </div>
  );
          }


export default DisplayFilteredUsers;
