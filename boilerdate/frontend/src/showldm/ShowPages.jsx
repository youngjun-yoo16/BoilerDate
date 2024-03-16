import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ShowPages() {
  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  const navigate = useNavigate();

  useEffect(() => {
    if (email === undefined) {
      navigate(-1);
    }
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 overflow-auto">
      <div className="bg-white p-3 rounded w-25">
        <h2>Relationships</h2>
        <br />

        <div className="mb-3">
          <input
            type="button"
            value="Your Matches"
            name="Matches"
            className="btn btn-outline-primary border w-100"
            onClick={() =>
              navigate("/showmatches", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Likes Sent"
            name="Matches"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/showyourlikes", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Likes Received"
            name="Matches"
            className="btn btn-outline-dark border w-100"
            onClick={() =>
              navigate("/showpeoplelikedyou", { state: { email: email } })
            }
          />
        </div>
        <p></p>
        <div className="mb-3">
          <input
            type="button"
            value="Blocked Users"
            name="Matches"
            className="btn btn-outline-dark border w-100"
            onClick={() => navigate("/showblocks", { state: { email: email } })}
          />
        </div>

        <div className="mb-3">
          <input
            type="button"
            value="Home"
            name="home"
            className="btn btn-outline-primary border w-100"
            onClick={() => navigate("/home", { state: { email: email } })}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowPages;
