// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Your backend URL
  withCredentials: true,  // ✅ Includes session cookie automatically to bakend when the api is called.
});

export default API;
