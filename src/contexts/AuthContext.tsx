import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  mobile: string;
  profilePic?: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  country: string;
  state: string;
  city: string;
  role: 'admin' | 'sub-admin' | 'manager';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  data?: {
    adminUser: AdminUser;
  };
  message?: string;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
  login: (emailOrUsernameOrMobile: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  username: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  profilePic?: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  country: string;
  state: string;
  city: string;
  role?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configure axios defaults
  axios.defaults.baseURL = API_URL;

  // Load user from token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUser();
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get<AuthResponse>('/auth/me');
      if (response.data.success) {
        setUser(response.data.data?.adminUser || null);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefreshToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const login = async (emailOrUsernameOrMobile: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post<AuthResponse>('/auth/login', {
        emailOrUsernameOrMobile,
        password
      });

      if (response.data.success) {
        const { token, refreshToken, data } = response.data;
        
        // Store tokens
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminRefreshToken', refreshToken);
        
        // Set axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Set user
        setUser(data?.adminUser || null);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post<AuthResponse>('/auth/register', userData);

      if (response.data.success) {
        const { token, refreshToken, data } = response.data;
        
        // Store tokens
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminRefreshToken', refreshToken);
        
        // Set axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Set user
        setUser(data?.adminUser || null);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefreshToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, []);

  const refreshAuth = async () => {
    const refreshToken = localStorage.getItem('adminRefreshToken');
    if (!refreshToken) {
      setUser(null);
      return;
    }

    try {
      const response = await axios.post<{ success: boolean; token: string; refreshToken: string }>(
        '/auth/refresh-token',
        { refreshToken }
      );

      if (response.data.success) {
        const { token, refreshToken: newRefreshToken } = response.data;
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminRefreshToken', newRefreshToken);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUser();
      }
    } catch (err) {
      console.error('Token refresh failed:', err);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefreshToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    refreshAuth,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
