import http from "../http-common";

const getAllUsers = () => {
  return http.get("/users");
};

const getUser = id => {
  return http.get(`/users/${id}`);
};

const getUserByEmail = email => {
  return http.get(`/users/?email=${email}`)
}

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
    getUserByEmail,
    createUser,
    updateUser,
    removeUser,
    removeAllUsers
}

export default exportedObjects;

