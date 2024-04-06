
import React from 'react';
import { useState, useEffect, useRef } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faBan,
  faEnvelope,
  faCommentSms,
  faCommentAlt,
  faLongArrowAltRight,
  faBell,
  faLongArrowAltLeft,
  faHandHoldingHeart,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AddNumber() {
  const { state } = useLocation();
  const { email } = state || {};
  const phoneInputRef = useRef(null);
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });



  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phone);
    const usPhoneRegex = /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    if (!usPhoneRegex.test(phone)) {
        toast.info("Please enter the number in correct format");
     // alert('Please enter a valid US phone number.');
      return;
    }
    /*
    const phoneUtil = PhoneNumberUtil.getInstance();
  let isValid = false;

  try {
    const number = phoneUtil.parse(phone, 'US');
    isValid = phoneUtil.isValidNumber(number);
  } catch (error) {
    console.error(error);
  }

  if (!isValid) {
    alert('Please enter a valid US phone number with the +1 country code.');
    return;
  }
    */

  axios
      .post("http://localhost:3001/updatePhoneNumber", {
        email,
        phone,
      })
      .then((result) => {
        console.log(result);
        toast.success("Phone number updated successfully!");
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 overflow-auto">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <FontAwesomeIcon icon={faPhone} />
          &nbsp;Update Phone Number
        </h2>
        <br />
        <form onSubmit={handleSubmit}>
        <div>
        <PhoneInput
        
        value={phone}
        onChange={setPhone}
      />
        </div>
        <br />
        <ToastContainer />
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary border w-100"
                onClick={() =>
                  navigate("/settings", { state: { email: email } })
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

export default AddNumber;