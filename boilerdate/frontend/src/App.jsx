import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Verify from "./Verify";
import Signup2 from "./Signup2";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/signup2" element={<Signup2 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
