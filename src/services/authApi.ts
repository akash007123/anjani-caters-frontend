import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authApi = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Editor' | 'Viewer';
    profilePic?: string;
}

export interface AuthResponse {
    success: boolean;
    data: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        token: string;
        profilePic?: string;
    };
}

export const authApiService = {
    login: async (credentials: any) => {
        const response = await authApi.post<AuthResponse>('/login', credentials);
        return response.data;
    },

    register: async (userData: any) => {
        const response = await authApi.post<AuthResponse>('/register', userData);
        return response.data;
    },

    getMe: async () => {
        const response = await authApi.get<{ success: boolean; data: User }>('/me');
        return response.data;
    },

    logout: async () => {
        const response = await authApi.post<{ success: boolean; message: string }>('/logout');
        return response.data;
    },
};
