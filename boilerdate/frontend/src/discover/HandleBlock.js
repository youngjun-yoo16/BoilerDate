import axios from "axios";

async function Block(email, target) {
  axios
    .post("http://localhost:3001/block", { email, target })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}

export default Block;
