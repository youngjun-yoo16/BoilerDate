import React, { useState, useEffect, useRef,useMemo } from "react";
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

function DisplayFilteredUsers() {
  // array of users
  // will be getting from the database later and store it here
  const [peoples, setPeople] = useState([
    {
      email: "hi@purdue.edu",
      name: "hi",
      major: "CS",
      age: "21",
      url: `https://media.gettyimages.com/photos/amazon-ceo-jeff-bezos-founder-of-space-venture-blue-origin-and-owner-picture-id1036094130?k=6&m=1036094130&s=612x612&w=0&h=3tKtZs6_SIXFZ2sdRUB4LjAf_GlfCMekP2Morwkt5EM=`,
    },
    {
      email: "hello@purdue.edu",
      name: "hello",
      major: "DS",
      age: "20",
      url: `https://media.gettyimages.com/photos/of-tesla-and-space-x-elon-musk-attends-the-2015-vanity-fair-oscar-picture-id464172224?k=6&m=464172224&s=612x612&w=0&h=M9Wf9-mcTJBLRWKFhAX_QGVAPXogzxyvZeCiIV5O3pw=`,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(peoples.length - 1);
  const [lastDirection, setLastDirecton] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(peoples.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0

  // navigation must be done from other page
  const { state } = useLocation();
  const { email } = state || {};
  // const navigate = useNavigate();

  // console.log(email);


  const swiped = (direction, nameToDelete, index) => {
    setLastDirecton(direction)
    updateCurrentIndex(index - 1)
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
 
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

  }

  const handleSubmit = async (buttonType) => {
    const temp_email = "lee3546@purdue.edu";
    if (buttonType === "like") {
      if (canSwipe && currentIndex < peoples.length) {
        await childRefs[currentIndex].current.swipe('right') // Swipe the card!
      }
      //HandleUserLikesAndDislikes(temp_email, peoples[0].email, true);
      HandleUserLikesAndDislikes(temp_email, peoples[1].email, true);
    } else if (buttonType === "dislike") {
      if (canSwipe && currentIndex < peoples.length) {
        await childRefs[currentIndex].current.swipe('left') // Swipe the card!
      }
      HandleUserLikesAndDislikes(temp_email, peoples[0].email, false);
      //HandleUserLikesAndDislikes(temp_email, peoples[1].email, false);
    } else if (buttonType === "arrow") {


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
          key={person.name}
          ref={childRefs[index]}
          className="swipe"
          preventSwipe={[`up`, `down`]}
          onSwipe={(dir) => swiped(dir, person.name, index)}
          onCardLeftScreen={() => outOfFrame(person.name, index)}
        >
          <div
            className="card"
            style={{
              backgroundImage: "url(" + person.url + ")",
            }}
          >
            <h3>
              {person.name} {person.age}{" "}
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
        <IconButton onClick={() => handleSubmit("dislike")}>
          <CloseIcon
            sx={{ color: "black" }}
            fontSize="large"
            className="close_button"
          />
        </IconButton>
        <IconButton onClick={() => handleSubmit("like")}>
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
