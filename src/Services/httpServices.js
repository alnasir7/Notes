import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    alert("An unexpected error has occured!");
  }

  return Promise.reject(error);
});

export default { get: axios.get, delete: axios.delete, post: axios.post };

// export function setToken(jwt) {
//   axios.defaults.headers.common["x-jwt"] = jwt;
// }
