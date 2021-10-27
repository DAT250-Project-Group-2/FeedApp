import http from "../http-common";

const getAllVotes = () => {
  return http.get("/votes");
};

const getVote = id => {
  return http.get(`/votes/${id}`);
};

const createVote = data => {
  return http.post("/votes", data);
};

const updateVote = (id, data) => {
  return http.put(`/votes/${id}`, data);
};

const removeVote = id => {
  return http.delete(`/votes/${id}`);
};

const removeAllVotes = () => {
  return http.delete(`/votes`);
};

const exportedObjects = {
    getAllVotes,
    getVote,
    createVote,
    updateVote,
    removeVote,
    removeAllVotes
}

export default exportedObjects;

