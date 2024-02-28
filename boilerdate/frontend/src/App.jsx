import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./home/Landing";
import Login from "./login/Login";
import Home from "./home/Home";
import Verify from "./signup/Verify";
import Signup2 from "./signup/Signup2";
import Signup3 from "./signup/Signup3";
import UserConsent from "./signup/UserConsent";
import Interests from "./profile/Interests";
import UploadPhoto from "./profile/ProfileSetupUploadPhoto";
import Academics from "./profile/Academics";
import AdditionalInfo from "./profile/AdditionalInfo";
import Lifestyle from "./profile/Lifestyle";
import ForgotPassword from "./login/ForgotPassword";
import ChangePassword from "./login/ChangePassword";
import Customizable from "./profile/Customizable";
import Settings from "./setting/Settings";
import GPA from "./setting/GPA";
import ProfilePage from "./profile/Profile";
import Major from "./setting/Major";
import Degree from "./setting/Degree";
import Height from "./setting/Height";
import Personality from "./setting/Personality";
import Relationship from "./setting/Relationship";
import Citizenship from "./setting/Citizenship";
import Skills from "./setting/Skills";
import Employment from "./setting/Employment";
import Career from "./setting/Career";
import Github from "./setting/Github";
import Linkedin from "./setting/Linkedin";
import Bio from "./setting/Bio";
import UpdateInterests from "./setting/Interests";
import UpdateLifestyle from "./setting/Lifestyle";
import Name from "./setting/Name";
import Gender from "./setting/Gender";
import Birthday from "./setting/Birthday";
import UpdatePassword from "./login/UpdatePassword";

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
          <Route path="/updatePassword" element={<UpdatePassword />}></Route>
          <Route path="/customizable" element={<Customizable />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/settings/gpa" element={<GPA />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/settings/major" element={<Major />}></Route>
          <Route path="/settings/degree" element={<Degree />}></Route>
          <Route path="/settings/height" element={<Height />}></Route>
          <Route path="/settings/personality" element={<Personality />}></Route>
          <Route
            path="/settings/relationship"
            element={<Relationship />}
          ></Route>
          <Route path="/settings/citizenship" element={<Citizenship />}></Route>
          <Route path="/settings/skills" element={<Skills />}></Route>
          <Route path="/settings/employment" element={<Employment />}></Route>
          <Route path="/settings/career" element={<Career />}></Route>
          <Route path="/settings/github" element={<Github />}></Route>
          <Route path="/settings/linkedin" element={<Linkedin />}></Route>
          <Route path="/settings/bio" element={<Bio />}></Route>
          <Route
            path="/settings/interests"
            element={<UpdateInterests />}
          ></Route>
          <Route
            path="/settings/lifestyle"
            element={<UpdateLifestyle />}
          ></Route>
          <Route path="/settings/name" element={<Name />}></Route>
          <Route path="/settings/gender" element={<Gender />}></Route>
          <Route path="/settings/birthday" element={<Birthday />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
