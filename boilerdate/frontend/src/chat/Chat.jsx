import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";

function Chat() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userSecret, setUserSecret] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const { email } = state || {};
    if (!email) {
      navigate(-1);
      return;
    }

    // Define async function inside useEffect
    const fetchData = async () => {
      try {
        // Get list of matches
        const matchesResponse = await axios.post(
          "http://localhost:3001/fetchmatches",
          { email }
        );
        const matchesList = matchesResponse.data.matches.emails;
        console.log(matchesList);
        // User config to get the username and secret
        const usersConfig = {
          method: "get",
          url: `https://api.chatengine.io/users/`,
          headers: {
            "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
          },
        };
        

        const usersResponse = await axios(usersConfig);
        const users = usersResponse.data;

        users.forEach((user) => {
          if (user.email === email) {
            setUsername(user.username);
            setUserSecret(user.first_name); // Assuming first_name is used as secret
          }
        });

        const userConfig = {
          method: "put",
          url: `https://api.chatengine.io/chats/`,
          headers: {
            "Project-ID": "{{abc439ce-2427-47df-b650-8a22f618970a}}",
            "User-Name": username,
            "User-Secret": userSecret,
          },
        };

        for (const match of matchesList) {
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
          await axios({
            ...userConfig, 
            method: "put",
            data: body,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [navigate, state, userSecret, username]);

  return (
    <ChatEngine
      publicKey={"abc439ce-2427-47df-b650-8a22f618970a"}
      userName={"Youngjun_Yoo"}
      userSecret={"Youngjun"}
    />
  );
}
export default Chat;
