import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.headers.Authorization) {
      return config;
    }

    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.token) {
          config.headers.Authorization = `Bearer ${parsedUserData.token}`;
        }
      } catch (error) {
        console.error("Error parsing user data from local storage", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
