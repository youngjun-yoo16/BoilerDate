import axios from "axios";

async function Report(email, target, reason) {
  axios
    .post("http://localhost:3001/report", { email, target, reason })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}

export default Report;
