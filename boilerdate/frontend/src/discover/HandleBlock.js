import axios from "axios";
import { BASE_URL } from "../../services/helper";

async function Block(email, target) {
  axios
    .post(`${BASE_URL}/block`, { email, target })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}

export default Block;
