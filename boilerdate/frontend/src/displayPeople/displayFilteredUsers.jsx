import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function displayFilteredUsers() {
  // set state to false as default
  //const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();
  const { email, firstName, lastName, gender, dob } = state || {};

  return (
    <Container className="vh-100 d-flex flex-column justify-content-between">
      <div>
        <h1> haha </h1>
      </div>
      <ToastContainer />
    </Container>
  );
}

export default displayFilteredUsers;
