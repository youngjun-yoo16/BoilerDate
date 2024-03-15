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
      //navigate(-1);
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
      .post("http://localhost:3001/fetchusername", { email })
      .then((res) => {
        const username = res.data[0];
        const gpa = res.data[1];
        setUserFirstName(username.firstName);
        setUserLastName(username.lastName);
        setUserGPA(gpa.gpa);
        //console.log(userGPA);
      })
      .catch((err) => {
        toast.error("Failed to fetch username and gpa!");
        console.error("Fetch failed for username and gpa");
      });
  });*/

  useEffect(() => {
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
  }, [likesList]);

  // display each card accordingly
  const imageUrl = `http://localhost:3001/image/${email}`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            sx={{ height: 300 }}
            image={imageUrl}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Elon musk
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Meta intern
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Like</Button>
            <Button size="small">Dislike</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default ShowYourLikes;
