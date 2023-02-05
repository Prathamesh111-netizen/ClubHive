import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-csi-srikanth-iyengar.cloud.okteto.net/api",
  // baseURL: "http://localhost:3001/api",
});

export default API;
