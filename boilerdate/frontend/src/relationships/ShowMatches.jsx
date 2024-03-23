import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ButtonBase from "@mui/material/ButtonBase";
// imports for card components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function ShowMatches() {
  // required for keeping login status
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  console.log(email);

  const [matchesList, setMatchesList] = useState([]);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  // get list of matches
  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchlikes", { email })
      .then((res) => {
        console.log(res.data.matches.emails);
        setMatchesList(res.data.matches.emails);
      })
      .catch((err) => {
        toast.error("Failed to fetch your matches!");
        console.error("fetch failed for matches");
      });
  }, [email]);

  useEffect(() => {
    if (matchesList.length > 0) {
      axios
        .post("http://localhost:3001/fetchusernames", { emails: matchesList })
        .then((res) => {
          // restructure userData to array
          setUserData(
            Object.entries(res.data).map(([username, { email, gpa, age }]) => ({
              username,
              email,
              gpa,
              age,
            }))
          );
        })
        .catch(() => {
          toast.error("Failed to fetch usernames and GPAs!");
        });
    }
  }, [matchesList]);

  async function handleClick(emailToRemove, e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:3001/deleteUnmatched",
        {
          email: email, // email
          emailToRemove: emailToRemove, // The email of the user to unmatch
        }
      );
      if (response) {
        toast.success("Unmatch Success!");
        // Filter out the user that was unmatched and update the userData state
        const updatedUserData = userData.filter(
          (user) => user.email !== emailToRemove
        );
        setUserData(updatedUserData);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  }

  const handleCardClick = (userEmail) => {
    navigate("/showpeoplelikedyou/profilecard", {
      state: { email: userEmail },
    });
  };
  return (
    <div className="container">
      <br />
      <Typography variant="h4" gutterBottom>
        <FontAwesomeIcon icon={faHeart} /> Your Matches
      </Typography>
      {userData.length > 0 ? (
        <Grid container spacing={4}>
          {userData.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ButtonBase
                onClick={() => handleCardClick(user.email)}
                style={{ display: "block", textAlign: "initial" }}
              >
                <Card sx={{ maxWidth: 160 }}>
                  <CardMedia
                    sx={{ height: 130 }}
                    image={`http://localhost:3001/image/${user.email}`}
                    title={user.username}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.username}, {user.age}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={(e) => handleClick(user.email, e)}
                      className="btn btn-outline-primary border w-100"
                    >
                      Unmatch
                    </Button>
                    <ToastContainer />
                  </CardActions>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" textAlign="center" marginTop={5}>
          You have no matches
        </Typography>
      )}
      <br />
      <div className="mb-3">
        <input
          type="button"
          value="Back"
          name="back"
          className="btn btn-outline-dark border w-100"
          onClick={() =>
            navigate("/relationships", { state: { email: email } })
          }
        />
      </div>
    </div>
  );
}

export default ShowMatches;
