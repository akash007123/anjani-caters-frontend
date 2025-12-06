import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApiService, User } from '../services/authApi';
import { toast } from 'sonner';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('adminToken');
            if (storedToken) {
                try {
                    const response = await authApiService.getMe();
                    if (response.success) {
                        setUser(response.data);
                        setToken(storedToken);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: any) => {
        try {
            const response = await authApiService.login(credentials);
            if (response.success) {
                const { token, ...userData } = response.data;
                localStorage.setItem('adminToken', token);
                setToken(token);
                setUser(userData as User);
                toast.success('Login successful');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await authApiService.register(userData);
            if (response.success) {
                const { token, ...newUserData } = response.data;
                localStorage.setItem('adminToken', token);
                setToken(token);
                setUser(newUserData as User);
                toast.success('Registration successful');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Call backend logout endpoint
            await authApiService.logout();
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with local logout even if backend call fails
        } finally {
            // Always clear local storage and state
            localStorage.removeItem('adminToken');
            setToken(null);
            setUser(null);
            toast.info('Logged out');
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
