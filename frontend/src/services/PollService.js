import http from "../http-common";

const getAllPolls = () => {
  return http.get("/polls");
};

const getPoll = id => {
  return http.get(`/polls/${id}`);
};

const createPoll = data => {
  return http.post("/polls", data);
};

const updatePoll = (id, data) => {
  return http.put(`/polls/${id}`, data);
};

const removePoll = id => {
  return http.delete(`/polls/${id}`);
};

const removeAllPolls = () => {
  return http.delete(`/polls`);
};

const registerVote = (id,vote) => {
  return http.put(`/polls/${id}/?isGreen=${vote}`, vote);

}

const exportedObject = {
    getAllPolls,
    getPoll,
    createPoll,
    updatePoll,
    removePoll,
    registerVote,
    removeAllPolls
}

export default exportedObject;

