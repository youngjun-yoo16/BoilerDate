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
  const { email } = state || {};

  const navigate = useNavigate();

  console.log(email);

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  let matchesList = [];

  // Get list of matches
  axios.post("http://localhost:3001/fetchmatches", { email }).then((res) => {
    console.log(res.data);
    res.data.matches.emails.map((match) => {
      matchesList.push(match);
    });
  });

  console.log(matchesList);

  // User config to get the username and secret
  const usersConfig = {
    method: "get",
    url: `https://api.chatengine.io/users/`,
    headers: {
      "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
    },
  };

  let username = "";
  let userSecret = "";

  // Get the username and secret
  axios(usersConfig).then((response) => {
    // Map through the users and get the username and secret
    const users = response.data;
    //console.log(users);
    users.map((user) => {
      if (user.email === email) {
        username = user.username;
        userSecret = user.secret;
      }
    });
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

  const creds = {
    "Project-ID": "{{abc439ce-2427-47df-b650-8a22f618970a}}",
    "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
    "User-Name": username,
    "User-Secret": userSecret,
  };

  matchesList.map((match) => {
    axios
      .post("http://localhost:3001/fetchProfile", { email: match })
      .then((res) => {
        console.log(res.data);
        const body = {
          usernames: [res.data.firstName + "_" + res.data.lastName],
          is_direct_chat: true,
        };
        userConfig.data = body;
        getOrCreateChat(creds, {
          is_direct_chat: true,
          usernames: [res.data.firstName + "_" + res.data.lastName],
        });
        /*axios(userConfig)
          .then((response) => {
            console.log(response);
          })
          .catch(() => {
            console.error("Failed to create chat");
          });*/
      });
  });

  return (
    <ChatEngine
      publicKey={"abc439ce-2427-47df-b650-8a22f618970a"}
      userName={"BoilerDate"}
      userSecret={"boilerdate"}
    />
  );
}

export default Chat;
