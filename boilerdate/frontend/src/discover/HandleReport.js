import axios from "axios";
import { BASE_URL } from "../services/helper";

async function Report(email, target, reason) {
  axios
    .post(`${BASE_URL}/report`, { email, target, reason })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}

export default Report;
