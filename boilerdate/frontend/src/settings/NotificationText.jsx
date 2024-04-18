import { useState, useEffect } from "react";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../services/helper";

function NotificationText() {
  const [likePf, setLikePf] = useState("");
  const [matchPf, setMatchPf] = useState("");

  const { state } = useLocation();
  const { email } = state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }

    const fetchNotifs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/fetchTextNotif/${email}`
        );

        if (response.data === "No notif status") {
          console.log("No previous notification settings.");
          return;
        }
        if (response.data.success) {
          //console.log("success");
          setLikePf(response.data.likePf);
          setMatchPf(response.data.matchPf);
        } else {
          console.log("not success");
        }
      } catch (err) {
        console.log("Error fetching privacy settings.");
      }
    };

    fetchNotifs();
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/updateTextNotificationSettings`, {
        email,
        likePf,
        matchPf,
      })
      .then((result) => {
        console.log(result);
        navigate("/notificationList", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <FontAwesomeIcon icon={faBell} /> Update Notificatons
        </h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Like</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={likePf}
                label="like"
                onChange={(e) => setLikePf(e.target.value)}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Match</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={matchPf}
                label="match"
                onChange={(e) => setMatchPf(e.target.value)}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>

          <br />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary border w-100"
                onClick={() =>
                  navigate("/notificationList", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-primary w-100">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotificationText;
