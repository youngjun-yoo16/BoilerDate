import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import TinderCard from "react-tinder-card";
import "./DisplayFilteredUser.css";
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
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function DisplayFilteredUsers() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [dislikedUserEmails, setDislikedUserEmails] = useState([]);
  const [showCardProfile, setShowCardProfile] = useState(false);
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();
  const [dislikedUserIndices, setDislikedUserIndices] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const [peoples, setPeople] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [lastDirection, setLastDirecton] = useState();
  const [childRefs, setChildRefs] = useState([]);
  const currentIndexRef = useRef();

  /*
  const resetCards = () => {

   
    // Reset the currentIndex to the last card
    setCurrentIndex(peoples.length - 1);
    currentIndexRef.current = peoples.length - 1;
    
    //setChildRefs(peoples.map(() => React.createRef()));
    // Programmatically restore each card
    
 

    
    childRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.restoreCard();
      }
    });
   

   
    setDislikedUsers([]);
  };
  */

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
    // if(!isResetting) {
    console.log(peoples); // Log after peoples is updated
    setCurrentIndex(peoples.length - 1); // Update currentIndex based on the new length of peoples
    currentIndexRef.current = peoples.length - 1;
    setChildRefs(peoples.map(() => React.createRef()));
    // }
  }, [peoples]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < peoples.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, person, index) => {
    setLastDirecton(direction);
    const newIndex = index - 1;
    updateCurrentIndex(newIndex);

    if (direction === "left") {
      setDislikedUsers((prevUsers) => [...prevUsers, person]);
    }

    // Check if it's the last card
    /*
    if (newIndex < 0) {
      resetCards();
    }
    */
    setCurrentProfileIndex(null);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (
      currentIndexRef.current >= idx &&
      childRefs[idx] &&
      childRefs[idx].current
    ) {
      childRefs[idx].current.restoreCard();
    }
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
    await setShowWhyReport1(true);
    /*if (canSwipe && currentIndex < peoples.length) {
      await childRefs[currentIndex].current.swipe("left");
      const emailToReport = peoples[currentIndex].email;
      console.log("reported!!!");
      Report(email, emailToReport);
    }*/
  };

  const [category, setCategory] = useState("");
  const [why, setWhy] = useState("");
  const [showWhyReport1, setShowWhyReport1] = useState(false);
  const [showWhyReport2, setShowWhyReport2] = useState(false);

  const whyReport1 = async (e) => {
    console.log(e);
    setCategory(e);
    console.log("why report 1");
    setShowWhyReport1(false);
    setShowWhyReport2(true);
  };

  const whyReport2 = async (e) => {
    setShowWhyReport2(false);
    console.log("why report 2");
    console.log(why);
    console.log(category);

    if (canSwipe && currentIndex < peoples.length) {
      await childRefs[currentIndex].current.swipe("left");
      const emailToReport = peoples[currentIndex].email;
      console.log("reported!!!");
      const reason = emailToReport + ": " + category + ": " + why;
      Report(email, emailToReport, reason);
    }
  };

  const swipe = async (buttonType) => {
    setShowCardProfile(false);

    //console.log(peoples[currentIndex].email)
    if (buttonType === "like") {
      if (canSwipe && currentIndex < peoples.length) {
        const likedUserEmail = peoples[currentIndex].email;

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

  const handleSubmit = (index) => {
    if (currentProfileIndex === index) {
      setCurrentProfileIndex(null); // Hide the profile if it's already shown
    } else {
      setCurrentProfileIndex(index); // Show the profile for the current card
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
        <button
          type="button"
          className="btn btn-outline-primary w-100"
          onClick={() => navigate("/home", { state: { email: email } })}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </button>
      </div>

      {peoples.map((person, index) => (
        <TinderCard
          flickOnSwipe={false}
          key={person.email}
          ref={childRefs[index]}
          className="swipe"
          preventSwipe={[`up`, `down`]}
          onSwipe={(dir) => swiped(dir, person, index)}
          onCardLeftScreen={() => outOfFrame(person.email, index)}
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
              <IconButton onClick={() => handleSubmit(index)}>
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
          {currentProfileIndex === index && <CardProfile person={person} />}
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

      <form onSubmit={whyReport1}>
        <div className="mb-3">
          <Modal
            show={showWhyReport1}
            centered
            backdrop="static"
            animation={false}
          >
            <Modal.Header>
              <Modal.Title>Why did you report this user?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  whyReport1("Inappropriate profile");
                }}
              >
                Inappropriate profile
              </Button>{" "}
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  whyReport1("Harrassment");
                }}
              >
                Harrassment
              </Button>{" "}
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  whyReport1("Safety concerns");
                }}
              >
                Safety concerns
              </Button>{" "}
              <p></p>
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  whyReport2("Not interested");
                }}
              >
                Not interested
              </Button>{" "}
              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  whyReport1("Other");
                }}
              >
                Other
              </Button>{" "}
            </Modal.Body>
          </Modal>
        </div>
      </form>

      <form onSubmit={whyReport2}>
        <div className="mb-3">
          <Modal
            show={showWhyReport2}
            centered
            backdrop="static"
            animation={false}
          >
            <Modal.Header>
              <Modal.Title>
                Please give some details about why you reported this user
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Details"
                  variant="outlined"
                  inputProps={{ maxLength: 200 }}
                  onChange={(e) => setWhy(e.target.value)}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={whyReport2}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>
    </div>
  );
}

export default DisplayFilteredUsers;
