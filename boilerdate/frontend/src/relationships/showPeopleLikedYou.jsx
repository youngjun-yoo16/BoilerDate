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
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function ShowPeopleLikedYou() {
  
  // required for keeping login status
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  console.log(email);

  const [receivedLikesList, setreceivedLikesList] = useState([]);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchlikes", { email })
      .then((res) => {
        console.log(res.data.receivedlikes.emails);
        setreceivedLikesList(res.data.receivedlikes.emails);
      })
      .catch((err) => {
        toast.error("Failed to fetch the users you liked!");
        console.error("fetch failed for liked users");
      });
  }, [email]);

  useEffect(() => {
    if (receivedLikesList.length > 0) {
      axios
        .post("http://localhost:3001/fetchusernames", {
          emails: receivedLikesList,
        })
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
        .catch((err) => {
          toast.error("Failed to fetch usernames and GPAs!");
        });
    }


  }, [receivedLikesList]);

  const handleCardClick = (userEmail) => {
    navigate("/profilecard", { state: { email: userEmail } });
    
  };

  return (      
    <div className="container">
      <Typography variant="h4" gutterBottom>
        Likes Received
      </Typography>
      {userData.length > 0 ? (
        <Grid container spacing={4}>
          {userData.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                 <ButtonBase
                onClick={() => handleCardClick(user.email)}
                style={{ display: 'block', textAlign: 'initial' }}
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
                  <Typography variant="body2" color="text.secondary">
                    GPA: {user.gpa}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/*<Button size="small">Like</Button>*/}
                  {/*<Button size="small">Dislike</Button>*/}
                </CardActions>
              </Card>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" textAlign="center" marginTop={5}>
          You have no likes
        </Typography>
      )}
      <div className="mb-3">
        <input
          type="button"
          value="Home"
          name="home"
          className="btn btn-outline-dark border w-100"
          onClick={() => navigate("/home", { state: { email: email } })}
        />
      </div>
    </div>
  );
}

export default ShowPeopleLikedYou;
