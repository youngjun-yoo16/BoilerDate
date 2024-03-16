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
import Settings from "./settings/Settings";
import GPA from "./settings/GPA";
import ProfilePage from "./profile/Profile";
import Major from "./settings/Major";
import Degree from "./settings/Degree";
import Height from "./settings/Height";
import Personality from "./settings/Personality";
import Relationship from "./settings/Relationship";
import Citizenship from "./settings/Citizenship";
import Skills from "./settings/Skills";
import Employment from "./settings/Employment";
import Career from "./settings/Career";
import Github from "./settings/Github";
import Linkedin from "./settings/Linkedin";
import Bio from "./settings/Bio";
import UpdateInterests from "./settings/Interests";
import UpdateLifestyle from "./settings/Lifestyle";
import Name from "./settings/Name";
import Gender from "./settings/Gender";
import Birthday from "./settings/Birthday";
import UpdatePassword from "./login/UpdatePassword";
import SetupBio from "./profile/Bio";
import DisplayFilteredUsers from "./displayPeople/displayFilteredUsers";
import Filter from "./Filter";
import DeleteAccount from "./settings/DeleteAccount";
import Notifications from "./settings/Notifications";
import ShowMatches from "./showldm/showMatches";
import ShowYourLikes from "./showldm/showYourLikes";

import ShowPeopleLikedYou from "./showldm/showPeopleLikedYou";
import Privacy from "./Privacy";
import ProfileSettings from "./settings/ProfileSettings";
import CardProfilePeopleLiked from "./showldm/CardProfilePeopleLiked";
import Significant from "./settings/Significant";
import ShowBlocks from "./showldm/showBlocks";
import ShowPages from "./showldm/ShowPages";

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
          <Route
            path="/updateNotifications"
            element={<Notifications />}
          ></Route>
          <Route path="/customizable" element={<Customizable />}></Route>
          <Route path="/bio" element={<SetupBio />}></Route>
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
          <Route path="/settings/significant" element={<Significant />}></Route>
          <Route path="/discover" element={<DisplayFilteredUsers />}></Route>
          <Route path="/filter" element={<Filter />}></Route>
          <Route path="/settings/delete" element={<DeleteAccount />}></Route>
          <Route path="/showmatches" element={<ShowMatches />}></Route>
          <Route path="/showyourlikes" element={<ShowYourLikes />}></Route>
          <Route path="/showblocks" element={<ShowBlocks />}></Route>
          <Route
            path="/showpeoplelikedyou"
            element={<ShowPeopleLikedYou />}
          ></Route>
          <Route path="/settings/privacy" element={<Privacy />}></Route>
          <Route path="/settings/profile" element={<ProfileSettings />}></Route>
          <Route
            path="/showpeoplelikedyou/profilecard"
            element={<CardProfilePeopleLiked />}
          ></Route>
          <Route path="/showpages" element={<ShowPages />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
