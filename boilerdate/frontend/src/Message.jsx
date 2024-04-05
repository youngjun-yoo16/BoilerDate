import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChatEngine } from 'react-chat-engine'

function Message() {
    /*const { state } = useLocation();
    const { email } = state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (email === undefined) {
          navigate(-1);
        }
      });*/

    return (
      <ChatEngine
        publicKey={'2cf88b7a-e935-438e-8fef-5b51503c737a'}
        userName={'BoilerDate'}
        userSecret={'boilerdate'}
      />
    )
}

export default Message;