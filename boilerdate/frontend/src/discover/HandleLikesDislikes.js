import axios from "axios";
//require("dotenv").config();

async function HandleUserLikesAndDislikes(email, target, lod) {
  // user with given email has liked the target email
  // lod: true -> like , false -> dislike
  axios
    .post("http://localhost:3001/manageldm", { email, target, lod })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}

export default HandleUserLikesAndDislikes;
