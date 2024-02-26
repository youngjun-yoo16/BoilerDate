import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
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
import Lifestyle from "./Lifestyle";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import Customizable from "./Customizable";
import Settings from "./Settings";
import GPA from "./Settings/GPA";
import ProfilePage from "./Profile";
import ImageTest from "./ImageTest";
import Major from "./Settings/Major";
import Degree from "./Settings/Degree";
import Height from "./Settings/Height";
import Personality from "./Settings/Personality";
import Relationship from "./Settings/Relationship";
import Citizenship from "./Settings/Citizenship";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/interests" element={<Interests />}></Route>
          <Route path="/lifestyle" element={<Lifestyle />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/signup2" element={<Signup2 />}></Route>
          <Route path="/signup3" element={<Signup3 />}></Route>
          <Route path="/userConsent" element={<UserConsent />}></Route>
          <Route path="/uploadPhoto" element={<UploadPhoto />}></Route>
          <Route path="/academics" element={<Academics />}></Route>
          <Route path="/additionalInfo" element={<AdditionalInfo />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route path="/customizable" element={<Customizable />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/settings/gpa" element={<GPA />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/imageTest" element={<ImageTest />}></Route>
          <Route path="/settings/major" element={<Major />}></Route>
          <Route path="/settings/degree" element={<Degree />}></Route>
          <Route path="/settings/height" element={<Height />}></Route>
          <Route path="/settings/personality" element={<Personality />}></Route>
          <Route
            path="/settings/relationship"
            element={<Relationship />}
          ></Route>
          <Route path="/settings/citizenship" element={<Citizenship />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
