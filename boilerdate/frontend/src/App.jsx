import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Verify from "./Verify";
import Signup2 from "./Signup2";
import Signup3 from "./Signup3";
import UserConsent from "./UserConsent";
import Interests from "./Interests";
import UploadPhoto from "./ProfileSetupUploadPhoto";
import Academics from "./Academics";
import AdditionalInfo from "./AdditionalInfo";
import PasswordReset from "./PasswordReset";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/interests" element={<Interests />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/signup2" element={<Signup2 />}></Route>
          <Route path="/signup3" element={<Signup3 />}></Route>
          <Route path="/userConsent" element={<UserConsent />}></Route>
          <Route path="/uploadPhoto" element={<UploadPhoto />}></Route>
          <Route path="/academics" element={<Academics />}></Route>
          <Route path="/additionalInfo" element={<AdditionalInfo />}></Route>
          <Route path="/passwordReset" element={<PasswordReset />}></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
