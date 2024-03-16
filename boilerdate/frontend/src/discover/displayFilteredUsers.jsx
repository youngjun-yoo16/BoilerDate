import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import TinderCard from "react-tinder-card";
import "./displayFilteredUser.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandleUserLikesAndDislikes from "./HandleLikesDislikes.js";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import BlockIcon from "@mui/icons-material/Block";
import ReportIcon from "@mui/icons-material/Report";
import axios from "axios";
import CardProfile from "./CardProfile.jsx";
import Block from "./HandleBlock.js";
import Report from "./HandleReport.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DisplayFilteredUsers() {
  const [showCardProfile, setShowCardProfile] = useState(false);
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
  const [likedUser, setLikedUser] = useState();
  const currentIndexRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/fetchFilteredUsers",
          { email }
        );
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

  console.log(peoples.length);

  //const [currentIndex, setCurrentIndex] = useState(peoples.length - 1);
  // const [lastDirection, setLastDirecton] = useState();

  console.log(childRefs);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < peoples.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirecton(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const [showBlock, setShowBlock] = useState(false);
  const handleCloseBlock = () => setShowBlock(false);
  const handleShowBlock = () => setShowBlock(true);

  const handleBlock = (e) => {
    console.log("blocking");
    handleShowBlock();
  };

  const actualBlock = async (e) => {
    handleCloseBlock();
    setShowCardProfile(false);
    if (canSwipe && currentIndex < peoples.length) {
      await childRefs[currentIndex].current.swipe("left");
      const emailToBlock = peoples[currentIndex].email;
      console.log("blocked!!!");
      Block(email, emailToBlock);
    }
  };

  const [showReport, setShowReport] = useState(false);
  const handleCloseReport = () => setShowReport(false);
  const handleShowReport = () => setShowReport(true);

  const handleReport = (e) => {
    console.log("reporting");
    handleShowReport();
  };

  const actualReport = async (e) => {
    handleCloseReport();
    setShowCardProfile(false);
    if (canSwipe && currentIndex < peoples.length) {
      await childRefs[currentIndex].current.swipe("left");
      const emailToReport = peoples[currentIndex].email;
      console.log("reported!!!");
      Report(email, emailToReport);
    }
  };

  const swipe = async (buttonType) => {
    setShowCardProfile(false);

    //console.log(peoples[currentIndex].email)
    if (buttonType === "like") {
      if (canSwipe && currentIndex < peoples.length) {
        try {
          const type = "like";
          const emailToSend = peoples[currentIndex].email;
          HandleUserLikesAndDislikes(email, emailToSend, true);
          //console.log(peoples[currentIndex].email)
          const response = await axios.post(
            "http://localhost:3001/sendNotificationEmail",
            { emailToSend, type }
          );
          console.log(response);
        } catch (err) {
          console.error("Failed to send a notification email.");
        }
        setLikedUser(peoples[currentIndex].email);

        console.log(likedUser);

        await childRefs[currentIndex].current.swipe("right"); // Swipe the card!
        console.log(peoples[currentIndex].email);
      }
      //HandleUserLikesAndDislikes(temp_email, peoples[0].email, true);
      // HandleUserLikesAndDislikes(temp_email, peoples[1].email, true);
    } else if (buttonType === "dislike") {
      if (canSwipe && currentIndex < peoples.length) {
        await childRefs[currentIndex].current.swipe("left"); // Swipe the card!
        const emailToSend = peoples[currentIndex].email;
        HandleUserLikesAndDislikes(email, emailToSend, false);
      }
      // HandleUserLikesAndDislikes(temp_email, peoples[0].email, false);
      //HandleUserLikesAndDislikes(temp_email, peoples[1].email, false);
    }
  };

  const handleSubmit = (e) => {
    if (e === "arrow") {
      setShowCardProfile((prev) => !prev);
    }
  };

  let message;
  if (lastDirection === "left") {
    message = <h2 className="infoText">NOPE</h2>;
  } else if (lastDirection === "right") {
    message = <h2 className="infoText">LIKE</h2>;
  }

  return (
    <div className="tinderCard_container">
      <div className="mb-4">
        <input
          type="button"
          value="Home"
          name="home"
          className="btn btn-outline-dark border w-100"
          onClick={() => navigate("/home", { state: { email: email } })}
        />
      </div>

      {peoples.map((person, index) => (
        <TinderCard
          flickOnSwipe={false}
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
                <ArrowCircleDownIcon
                  sx={{ color: "grey" }}
                  fontSize="large"
                  className="arrow_button"
                />
              </IconButton>
            </div>
            <div className="swipeButton">
              <IconButton onClick={() => handleReport()}>
                <ReportIcon
                  sx={{ color: "black" }}
                  fontSize="large"
                  className="report_button"
                />
              </IconButton>
            </div>
          </div>
          {showCardProfile && (
            <CardProfile email={peoples[currentIndex].email} />
          )}
        </TinderCard>
      ))}
      <div> </div>
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
        {/*} <IconButton onClick={() => swipe("block")}>*/}
        <IconButton onClick={() => handleBlock()}>
          <BlockIcon
            sx={{ color: "black" }}
            fontSize="large"
            className="block_button"
          />
        </IconButton>
      </div>

      <form onSubmit={actualBlock}>
        <div className="mb-3">
          <Modal show={showBlock} onHide={handleCloseBlock} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to block this user? This action cannot be
              undone.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseBlock}>
                Close
              </Button>
              <Button type="submit" variant="danger" onClick={actualBlock}>
                Block
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>

      <form onSubmit={actualReport}>
        <div className="mb-3">
          <Modal show={showReport} onHide={handleCloseReport} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to report this user? This action cannot be
              undone.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseReport}>
                Close
              </Button>
              <Button type="submit" variant="danger" onClick={actualReport}>
                Report
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>
    </div>
  );
}

export default DisplayFilteredUsers;
