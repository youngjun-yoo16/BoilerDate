import { useState, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteAccount() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/deleteAccount", {
        email,
      })
      .then((result) => {
        console.log(result);
        navigate("/", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Delete Account</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <p>
            <b>Warning:</b> Deleting your account will permanently remove all
            data that is stored in our system.
          </p>
          <div className="mb-3">
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="danger" onClick={handleSubmit}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <br />

          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  navigate("/settings", { state: { email: email } })
                }
              >
                Back
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={handleShow}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount;
