import axios from "axios";

export const api = axios.create({
  baseURL: "https://crud-vaga-youtan-2.onrender.com/api",
});
