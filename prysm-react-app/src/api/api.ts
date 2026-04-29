import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

export const api = axios.create({
    baseURL: API_BASE,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})

export const setupInterceptors = (navigate: any, setIsAuthenticated: (val: boolean) => void) => {
    api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401){
            navigate('/login', { replace: true })
            setIsAuthenticated(false);
        }
        return Promise.reject(error);
    }
    );
}
