import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const contactApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    status: string;
    priority: string;
    createdAt: string;
  };
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'New' | 'Pending' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
}

interface ContactsResponse {
  success: boolean;
  message: string;
  data: {
    contacts: Contact[];
    total: number;
    page: number;
    pages: number;
  };
}

interface UpdateContactData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  status?: 'New' | 'Pending' | 'Resolved';
  priority?: 'Low' | 'Medium' | 'High';
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

interface StatsResponse {
  success: boolean;
  data: unknown;
}

// Request interceptor for adding auth headers if needed
contactApi.interceptors.request.use(
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
contactApi.interceptors.response.use(
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

// Contact API functions
export const contactApiService = {
  // Submit contact form
  submitContact: async (data: ContactFormData): Promise<ContactResponse> => {
    try {
      const response = await contactApi.post('/contact/submit', data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to send message';
      throw new Error(message);
    }
  },

  // Health check
  checkHealth: async (): Promise<HealthResponse> => {
    try {
      const response = await contactApi.get('/contact/health');
      // Convert backend response format to frontend format
      return {
        success: true,
        message: 'API is online'
      };
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'API not available';
      throw new Error(message);
    }
  },

  // Test email configuration (for admin)
  testEmailConfig: async (): Promise<ContactResponse> => {
    try {
      const response = await contactApi.get('/contact/contacts/test/email');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Email test failed';
      throw new Error(message);
    }
  },

  // Get contact statistics (for admin)
  getContactStats: async (): Promise<StatsResponse> => {
    try {
      const response = await contactApi.get('/contact/contacts/stats/overview');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch statistics';
      throw new Error(message);
    }
  },

  // Admin API functions
  // Get all contacts with pagination and filters
  getAllContacts: async (page = 1, limit = 10, search = '', status = ''): Promise<ContactsResponse> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status && { status })
      });
      const response = await contactApi.get(`/contact/contacts?${params}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch contacts';
      throw new Error(message);
    }
  },

  // Get single contact by ID
  getContactById: async (id: string): Promise<{ success: boolean; data: Contact }> => {
    try {
      const response = await contactApi.get(`/contact/contacts/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch contact';
      throw new Error(message);
    }
  },

  // Update contact
  updateContact: async (id: string, data: UpdateContactData): Promise<{ success: boolean; data: Contact; message: string }> => {
    try {
      const response = await contactApi.patch(`/contact/contacts/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update contact';
      throw new Error(message);
    }
  },

  // Update contact status
  updateContactStatus: async (id: string, status: 'New' | 'Pending' | 'Resolved'): Promise<{ success: boolean; data: Contact; message: string }> => {
    try {
      const response = await contactApi.patch(`/contact/contacts/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update contact status';
      throw new Error(message);
    }
  },

  // Delete contact
  deleteContact: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await contactApi.delete(`/contact/contacts/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to delete contact';
      throw new Error(message);
    }
  }
};

// Export the axios instance for custom usage if needed
export { contactApi };

// Export types for use in components
export type { ContactFormData, ContactResponse, ApiError, HealthResponse, StatsResponse, Contact, ContactsResponse, UpdateContactData };