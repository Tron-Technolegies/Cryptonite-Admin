import axios from "axios";

const api = axios.create({
  baseURL: "https://api.cryptonite.at/api/admin/",
  withCredentials: true, // for refresh cookie
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 properly
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          "https://cryptonite-gbcg.onrender.com/api/admin/token/refresh/",
          {},
          { withCredentials: true },
        );

        const newAccessToken = refreshRes.data.access;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  },
);

export default api;
