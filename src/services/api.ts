import axios from "axios";

const BASE_URL = `http://${process.env.EXPO_PUBLIC_API_URL}:3333`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
