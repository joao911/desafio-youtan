import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_BASE_URL}`,
});

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 1000))
  );
  return config;
});
