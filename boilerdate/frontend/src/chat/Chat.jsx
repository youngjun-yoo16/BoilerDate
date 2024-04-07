import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

function Chat() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userSecret, setUserSecret] = useState("");
  const [username, setUsername] = useState("");
  const [matchesList, setMatchesList] = useState([]);
  const [error, setError] = useState(false);

  // Fetch user details
  useEffect(() => {
    if (!state?.email) {
      navigate(-1);
      return;
    }

    const usersConfig = {
      method: "get",
      url: `https://api.chatengine.io/users/`,
      headers: {
        "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
      },
    };

    const fetchUserDetails = async () => {
      try {
        const usersResponse = await axios(usersConfig);
        const user = usersResponse.data.find(
          (user) => user.email === state.email
        );
        if (user) {
          setUsername(user.username);
          setUserSecret(user.first_name); // Assuming first_name is used as the secret
        } else {
          setError(true);
          console.error("User not found");
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [state, navigate]);

  // Fetch matches list
  useEffect(() => {
    if (!state?.email) return;

    const fetchMatches = async () => {
      try {
        const matchesResponse = await axios.post(
          "http://localhost:3001/fetchmatches",
          { email: state.email }
        );
        const matches = matchesResponse.data.matches.emails;
        setMatchesList(matches);
      } catch (error) {
        console.error("Failed to fetch matches", error);
      }
    };

    fetchMatches();
  }, [state]);

  // Perform chat operations
  useEffect(() => {
    if (!username || !userSecret || matchesList.length === 0) return;

    const userConfig = {
      method: "put",
      url: `https://api.chatengine.io/chats/`,
      headers: {
        "Project-ID": "{{abc439ce-2427-47df-b650-8a22f618970a}}",
        "User-Name": username,
        "User-Secret": userSecret,
      },
    };

    matchesList.forEach(async (match) => {
      try {
        const profileResponse = await axios.post(
          "http://localhost:3001/fetchProfile",
          { email: match }
        );
        const body = {
          usernames: [
            profileResponse.data.user.firstName +
              "_" +
              profileResponse.data.user.lastName,
          ],
          is_direct_chat: true,
        };
        await axios({ ...userConfig, data: body });
      } catch (error) {
        console.error("Failed to create chat", error);
      }
    });
  }, [username, userSecret, matchesList]);

  return username && userSecret ? (
    matchesList.length > 0 ? (
      <ChatEngine
        height="100vh"
        projectID="abc439ce-2427-47df-b650-8a22f618970a"
        userName={username}
        userSecret={userSecret}
      />
    ) : (
      <ChatEngine
        height="100vh"
        projectID="abc439ce-2427-47df-b650-8a22f618970a"
        userName={"BoilerDate"}
        userSecret={"boilerdate"}
      /> // Default screen for no matches
    )
  ) : error ? (
    <ChatEngine
      height="100vh"
      projectID="abc439ce-2427-47df-b650-8a22f618970a"
      userName={"BoilerDate"}
      userSecret={"boilerdate"}
    /> // Default screen for no user
  ) : (
    <div>Loading ...</div>
  );
}
export default Chat;
