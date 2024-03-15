import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

function ShowYourLikes() {
  // required for keeping login status
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  console.log(email);

  const [likesList, setLikesList] = useState([]);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  // get list of likes
  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchlikes", { email })
      .then((res) => {
        console.log(res.data.liked.emails);
        setLikesList(res.data.liked.emails);
      })
      .catch((err) => {
        toast.error("Failed to fetch the users you liked!");
        console.error("fetch failed for liked users");
      });
  }, [email]);

  // get profile info and images of each email <- this only finds the info of the crr user
  /*  useEffect(() => {
    axios
      .post("http://localhost:3001/fetchusernames", { emails: likesList })
      .then((res) => {
        const userData = res.data;
        // now user data is mapped as [username : gpa]
        console.log("this is likedlist for " + email + ": " + likesList);
        console.log(userData);
        setUserData(userData);
      })
      .catch((err) => {
        toast.error("Failed to fetch username and gpa!");
        console.error("Fetch failed for username and gpa");
      });
  }, [likesList]);*/

  useEffect(() => {
    if (likesList.length > 0) {
      axios
        .post("http://localhost:3001/fetchusernames", { emails: likesList })
        .then((res) => {
          // restructure userData to array
          setUserData(
            Object.entries(res.data).map(([username, { email, gpa }]) => ({
              username,
              email,
              gpa,
            }))
          );
        })
        .catch((err) => {
          toast.error("Failed to fetch usernames and GPAs!");
        });
    }
  }, [likesList]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        People You Liked
      </Typography>
      {userData.length > 0 ? (
        <Grid container spacing={4}>
          {userData.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 160 }}>
                <CardMedia
                  sx={{ height: 130 }}
                  image={`http://localhost:3001/image/${user.email}`}
                  title={user.username}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    GPA: {user.gpa}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Like</Button>
                  <Button size="small">Dislike</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" textAlign="center" marginTop={5}>
          You didn't like anyone
        </Typography>
      )}
    </div>
  );
}

export default ShowYourLikes;
