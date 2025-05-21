import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api", // Update if using different port
});

export default API;
