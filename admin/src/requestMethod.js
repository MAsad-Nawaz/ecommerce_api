import axios from 'axios';

const Base_Url = "http://localhost:5000/api";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
    baseURL: Base_Url,
});


export const userRequest = axios.create({
    baseURL: Base_Url,
    headers: { token: `Bearer ${TOKEN}` }
});