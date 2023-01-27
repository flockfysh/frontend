import axios from "axios";
import {serverURL} from "../settings";

const api = axios.create({
    baseURL: serverURL,
    withCredentials: true,
    responseType: "json"
});

export default api;