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

function ShowPeopleLikedYou() {
  // required for keeping login status
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  console.log(email);

  const [likesList, setLikesList] = useState([]);
  const [userData, setUserData] = useState("");

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

  const imageUrl = `http://localhost:3001/image/${email}`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h1> hi</h1>
    </div>
  );
}

export default ShowPeopleLikedYou;
