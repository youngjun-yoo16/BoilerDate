import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Chat() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userSecret, setUserSecret] = useState("");
  const [username, setUsername] = useState("");
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

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  /*const componentDidMount = async (chatid) => {
    console.log(chatid)
    const reloadCount = sessionStorage.getItem("reloadCount");
    const header = {
      "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
      "User-Name": username,
      "User-Secret": userSecret,
    };
    const latestMessage = await axios({
      method: "get",
      url: `https://api.chatengine.io/chats/${chatid}/messages/latest/1/`,
      headers: header,
    });

    const latestMessageData = latestMessage.data;

    if (latestMessageData.text !== window.localStorage.getItem("latestMessage")) {
      window.localStorage.setItem("latestMessage", latestMessageData.text);
      window.location.reload();
    }

    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  };*/

  return username && userSecret ? (
    <>
      <ChatEngine
        height="90vh"
        projectID="abc439ce-2427-47df-b650-8a22f618970a"
        userName={username}
        userSecret={userSecret}
        onNewMessage={(chatid, message) => {
          console.log(chatid);
          console.log(message);
        }}
      />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-outline-primary w-50"
          onClick={() => navigate("/home", { state: { email: state?.email } })}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </button>
      </div>
      <br />
    </>
  ) : error ? (
    <>
      <ChatEngine
        height="100vh"
        projectID="abc439ce-2427-47df-b650-8a22f618970a"
        userName={"BoilerDate"}
        userSecret={"boilerdate"}
      />{" "}
      {/* Default screen for no user */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-outline-primary w-50"
          onClick={() => navigate("/home", { state: { email: state?.email } })}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </button>
      </div>
    </>
  ) : (
    <div>Loading ...</div>
  );
}

export default Chat;
