import axios from "axios";


// const getDweet = question => {
//   return axios.get(`/polls/${question}`);
// };

const postDweet = (question, yes, no, active) => {
  return axios.post(`https://dweet.io/dweet/for/${question}`, {
    "Active": active,
    "Yes": yes,
    "No": no,
  });
};


const exportedObject = {
    postDweet,
}

export default exportedObject;

