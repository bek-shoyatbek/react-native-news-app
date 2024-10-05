import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERPER_API_URL,
  headers: {
    "X-API-KEY": process.env.EXPO_PUBLIC_SERPER_API_KEY,
    "Content-Type": "application/json",
  },
});
