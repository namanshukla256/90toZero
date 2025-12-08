import apiClient from './api';
import type {
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    User,
} from '../types';

export const authService = {
    // Register new user
    register: async (data: RegisterRequest): Promise<TokenResponse> => {
        const response = await apiClient.post<TokenResponse>('/auth/register', data);
        return response.data;
    },

    // Login user
    login: async (data: LoginRequest): Promise<TokenResponse> => {
        const response = await apiClient.post<TokenResponse>('/auth/login', data);
        return response.data;
    },

    // Get current user
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    },

    // Logout
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('access_token');
    },

    // Get stored user
    getStoredUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Store auth data
    storeAuthData: (data: TokenResponse) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user', JSON.stringify(data.user));
    },
};
