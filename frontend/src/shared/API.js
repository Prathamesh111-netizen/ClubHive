import axios from "axios";

const API = axios.create({
    baseURL: "https://backend-csi-srikanth-iyengar.cloud.okteto.net/api",
});

export default API;
