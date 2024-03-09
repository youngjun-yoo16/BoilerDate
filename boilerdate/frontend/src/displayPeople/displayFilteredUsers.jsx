import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import TinderCard from "react-tinder-card";
import "./displayFilteredUser.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandleUserLikesAndDislikes from "./HandleLikesDislikes";

function DisplayFilteredUsers() {
  // navigation must be done from other page
  const { state } = useLocation();
  const { email } = state || {};
  // const navigate = useNavigate();

  // console.log(email);

  // array of users
  // will be getting from the database later and store it here
  const [peoples, setPeople] = useState([
    {
      name: "hi",
      major: "CS",
      age: "21",
      url: `https://media.gettyimages.com/photos/amazon-ceo-jeff-bezos-founder-of-space-venture-blue-origin-and-owner-picture-id1036094130?k=6&m=1036094130&s=612x612&w=0&h=3tKtZs6_SIXFZ2sdRUB4LjAf_GlfCMekP2Morwkt5EM=`,
    },
    {
      name: "hello",
      major: "DS",
      age: "20",
      url: `https://media.gettyimages.com/photos/of-tesla-and-space-x-elon-musk-attends-the-2015-vanity-fair-oscar-picture-id464172224?k=6&m=464172224&s=612x612&w=0&h=M9Wf9-mcTJBLRWKFhAX_QGVAPXogzxyvZeCiIV5O3pw=`,
    },
  ]);

  const swiped = (direction, nameToDelete) => {};

  const outOfFrame = (name) => {};

  const handleSubmit = (buttonType) => {
    const temp_email = "lee3546@purdue.edu";
    if (buttonType === "like") {
      //HandleUserLikesAndDislikes(temp_email, peoples[0].name, true);
      HandleUserLikesAndDislikes(temp_email, peoples[1].name, true);
    } else if (buttonType === "dislike") {
      //HandleUserLikesAndDislikes(temp_email, peoples[0].name, false);
      HandleUserLikesAndDislikes(temp_email, peoples[1].name, false);
    }
  };

  return (
    <div>
      <div className="tinderCard_container">
        {peoples.map((person, index) => (
          <TinderCard
            key={index}
            className="swipe"
            preventSwipe={[`up`, `down`]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              className="card"
              style={{
                backgroundImage: "url(" + person.url + ")",
              }}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

      <div className="swipeButton">
        <IconButton onClick={() => handleSubmit("dislike")}>
          <CloseIcon fontSize="large" className="dislike_button" />
        </IconButton>
        <IconButton onClick={() => handleSubmit("like")}>
          <FavoriteIcon fontSize="large" className="favorite_button" />
        </IconButton>
      </div>
    </div>
  );
}

export default DisplayFilteredUsers;
