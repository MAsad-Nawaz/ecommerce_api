import axios from 'axios';

const Base_Url = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjgxNTlmYzM4OWNlMzI1N2MyZDRmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDk4ODUxMywiZXhwIjoxNjUxMjQ3NzEzfQ.SpQRNGzR5lJ-Ut_15mEBmIDyuz7K8Hv73mof9QgYkTM"

export const publicRequest = axios.create({
    baseURL: Base_Url,
});


export const userRequest = axios.create({
    baseURL: Base_Url,
    headers: { token: `Bearer ${TOKEN}` }
});