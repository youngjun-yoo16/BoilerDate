import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ButtonBase from "@mui/material/ButtonBase";
// imports for card components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/helper";

function ShowBlocks() {
  // required for keeping login status
  const { state } = useLocation();
  const { email } = state || {};
  const navigate = useNavigate();

  const [blocksList, setBlocksList] = useState([]);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  // get list of blocks
  useEffect(() => {
    axios
      .post(`${BASE_URL}/fetchblocks`, { email })
      .then((res) => {
        setBlocksList(res.data.emails);
      })
      .catch(() => {
        toast.error("Failed to fetch your blocks!");
        console.error("fetch failed for blocks");
      });
  }, [email]);

  useEffect(() => {
    if (blocksList.length > 0) {
      axios
        .post(`${BASE_URL}/fetchusernames`, { emails: blocksList })
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
  }, [blocksList]);

  const handleCardClick = (userEmail) => {
    navigate("/showpeoplelikedyou/profilecard", {
      state: { email: userEmail },
    });
  };

  return (
    <div className="container">
      <br />
      <Typography variant="h4" gutterBottom>
        <FontAwesomeIcon icon={faBan} /> Blocked Users
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
                    image={`${BASE_URL}/image/${user.email}`}
                    title={user.username}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.username}, {user.age}
                    </Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" textAlign="center" marginTop={5}>
          You have no blocked users
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

export default ShowBlocks;
