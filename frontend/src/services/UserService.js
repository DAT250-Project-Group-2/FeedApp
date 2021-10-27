import http from "../http-common";

const getAllUsers = () => {
  return http.get("/users");
};

const getUser = id => {
  return http.get(`/users/${id}`);
};

const createUser = data => {
  return http.post("/users", data);
};

const updateUser = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const removeUser = id => {
  return http.delete(`/users/${id}`);
};

const removeAllUsers = () => {
  return http.delete(`/users`);
};

const exportedObjects = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    removeUser,
    removeAllUsers
}

export default exportedObjects;

