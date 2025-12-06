import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const quoteApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
interface QuoteFormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venue?: string;
  budget?: string;
  requirements?: string;
}

interface QuoteResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    eventType: string;
    eventDate: string;
    guestCount: string;
    venue?: string;
    budget?: string;
    requirements?: string;
    status: string;
    priority: string;
    createdAt: string;
  };
}

interface QuotesApiResponse {
  success: boolean;
  data: Array<{
    _id: string;
    name: string;
    email: string;
    phone?: string;
    eventType: string;
    eventDate: string;
    guestCount: string;
    venue?: string;
    budget?: string;
    requirements?: string;
    status: 'New' | 'Pending' | 'Resolved';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    createdAt: string;
    updatedAt: string;
  }>;
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

interface HealthResponse {
  success: boolean;
  message: string;
}

interface QuoteStatsResponse {
  success: boolean;
  data: {
    totalQuotes: number;
    pendingQuotes: number;
    confirmedQuotes: number;
    eventTypeStats: Array<{
      _id: string;
      count: number;
    }>;
    priorityStats: Array<{
      _id: string;
      count: number;
    }>;
  };
}

// Request interceptor for adding auth headers if needed
quoteApi.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed for admin routes
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
quoteApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }
    if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
);

// Quote API functions
export const quoteApiService = {
  // Submit quote request
  submitQuote: async (data: QuoteFormData): Promise<QuoteResponse> => {
    try {
      const response = await quoteApi.post('/quotes/submit', data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to submit quote request';
      throw new Error(message);
    }
  },

  // Health check
  checkHealth: async (): Promise<HealthResponse> => {
    try {
      const response = await quoteApi.get('/quotes/health');
      // Convert backend response format to frontend format
      return {
        success: true,
        message: 'Quote API is online'
      };
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Quote API not available';
      throw new Error(message);
    }
  },

  // Get quote by ID (for admin)
  getQuote: async (id: string): Promise<QuoteResponse> => {
    try {
      const response = await quoteApi.get(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch quote';
      throw new Error(message);
    }
  },

  // Get all quotes (for admin)
  getAllQuotes: async (params?: {
    status?: string;
    priority?: string;
    eventType?: string;
    page?: number;
    limit?: number;
  }): Promise<QuotesApiResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const response = await quoteApi.get(`/quotes?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch quotes';
      throw new Error(message);
    }
  },

  // Update quote status (for admin)
  updateQuoteStatus: async (id: string, status: string): Promise<QuoteResponse> => {
    try {
      const response = await quoteApi.patch(`/quotes/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update quote status';
      throw new Error(message);
    }
  },

  // Get quote statistics (for admin)
  getQuoteStats: async (): Promise<QuoteStatsResponse> => {
    try {
      const response = await quoteApi.get('/quotes/stats');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch quote statistics';
      throw new Error(message);
    }
  },

  // Update quote (for admin)
  updateQuote: async (id: string, data: Partial<QuoteFormData> & { status?: string; priority?: string }): Promise<QuoteResponse> => {
    try {
      const response = await quoteApi.put(`/quotes/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update quote';
      throw new Error(message);
    }
  },

  // Delete quote (for admin)
  deleteQuote: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await quoteApi.delete(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to delete quote';
      throw new Error(message);
    }
  }
};

// Export the axios instance for custom usage if needed
export { quoteApi };

// Export types for use in components
export type { QuoteFormData, QuoteResponse, QuotesApiResponse, ApiError, HealthResponse, QuoteStatsResponse };