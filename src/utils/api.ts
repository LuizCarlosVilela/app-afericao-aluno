import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL
});

api.interceptors.response.use(
    ({ data }) => data,
    error => {
        const message = error?.response?.data?.message || 'Ocorreu um erro';
        return Promise.reject(new Error(message));
    }
);

export default api;
