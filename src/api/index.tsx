import axios from "axios";

export const api = axios.create({
  baseURL: "https://todolistapi-kz0e.onrender.com/api/",
});
