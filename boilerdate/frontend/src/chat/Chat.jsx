import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { ChatEngine } from 'react-chat-engine'

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
  

    return (
      <ChatEngine
        publicKey={'abc439ce-2427-47df-b650-8a22f618970a'}
        userName={'BoilerDate'}
        userSecret={'boilerdate'}
      />
    )
  }
  
  export default Chat;
  