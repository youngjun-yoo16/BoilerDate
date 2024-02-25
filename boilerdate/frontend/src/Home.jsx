import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Home() {
  const { state } = useLocation();
  const { email } = state || {};
  console.log(email);

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Home</h2>
        <Link
          to="/settings"
          type="button"
          className="btn btn-outline-secondary border w-100"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}

export default Home;
