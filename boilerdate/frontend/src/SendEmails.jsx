import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

function SendEmails() {
  const [info, setInfo] = useState("");

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
      .post("http://localhost:3001/sendUpdateEmails", {
        email,
        info,
      })
      .then((result) => {
        console.log(result);
        navigate("/admin", { state: { email: email } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Send Update Emails</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Bio"
                variant="outlined"
                inputProps={{ maxLength: 200 }}
                onChange={(e) => setInfo(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate("/admin", { state: { email: email } })}
              >
                Back
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-primary w-100">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendEmails;
