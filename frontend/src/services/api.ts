import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5196",
    baseURL: "http://10.170.177.113:5196",

    headers: {
        "Content-Type": "application/json"
    }
});

export default api;