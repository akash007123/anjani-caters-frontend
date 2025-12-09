import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const testimonialApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
interface TestimonialFormData {
  quote: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  eventType: string;
  image?: File;
}

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  image: string;
  eventType: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialsResponse {
  success: boolean;
  message: string;
  data: Testimonial[];
}

interface TestimonialResponse {
  success: boolean;
  message: string;
  data: Testimonial;
}

interface TestimonialStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalTestimonials: number;
    approvedTestimonials: number;
    pendingTestimonials: number;
    averageRating: number;
    eventTypes: Array<{
      _id: string;
      count: number;
    }>;
  };
}

interface AllTestimonialsResponse {
  success: boolean;
  message: string;
  data: {
    testimonials: Testimonial[];
    total: number;
    page: number;
    pages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Request interceptor for adding auth headers if needed
testimonialApi.interceptors.request.use(
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
testimonialApi.interceptors.response.use(
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

// Testimonial API functions
export const testimonialApiService = {
  // Public API - Get approved testimonials
  getApprovedTestimonials: async (): Promise<TestimonialsResponse> => {
    try {
      const response = await testimonialApi.get('/testimonials/approved');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch testimonials';
      throw new Error(message);
    }
  },

  // Public API - Submit testimonial
  submitTestimonial: async (data: TestimonialFormData): Promise<TestimonialResponse> => {
    try {
      const formData = new FormData();
      formData.append('quote', data.quote);
      formData.append('name', data.name);
      formData.append('position', data.position);
      formData.append('company', data.company);
      formData.append('rating', data.rating.toString());
      formData.append('eventType', data.eventType);

      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await testimonialApi.post('/testimonials/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to submit testimonial';
      throw new Error(message);
    }
  },

  // Admin API - Get all testimonials
  getAllTestimonials: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<AllTestimonialsResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const response = await testimonialApi.get(`/testimonials?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch testimonials';
      throw new Error(message);
    }
  },

  // Admin API - Approve testimonial
  approveTestimonial: async (id: string, isApproved: boolean): Promise<TestimonialResponse> => {
    try {
      const response = await testimonialApi.patch(`/testimonials/${id}/approve`, { isApproved });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update testimonial approval status';
      throw new Error(message);
    }
  },

  // Admin API - Update testimonial
  updateTestimonial: async (id: string, data: Partial<TestimonialFormData>): Promise<TestimonialResponse> => {
    try {
      const formData = new FormData();
      if (data.quote !== undefined) formData.append('quote', data.quote);
      if (data.name !== undefined) formData.append('name', data.name);
      if (data.position !== undefined) formData.append('position', data.position);
      if (data.company !== undefined) formData.append('company', data.company);
      if (data.rating !== undefined) formData.append('rating', data.rating.toString());
      if (data.eventType !== undefined) formData.append('eventType', data.eventType);

      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await testimonialApi.put(`/testimonials/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update testimonial';
      throw new Error(message);
    }
  },

  // Admin API - Delete testimonial
  deleteTestimonial: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await testimonialApi.delete(`/testimonials/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to delete testimonial';
      throw new Error(message);
    }
  },

  // Admin API - Get testimonial statistics
  getTestimonialStats: async (): Promise<TestimonialStatsResponse> => {
    try {
      const response = await testimonialApi.get('/testimonials/stats');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch testimonial statistics';
      throw new Error(message);
    }
  },
};

// Export the axios instance for custom usage if needed
export { testimonialApi };

// Export types for use in components
export type {
  TestimonialFormData,
  Testimonial,
  TestimonialsResponse,
  TestimonialResponse,
  TestimonialStatsResponse,
  AllTestimonialsResponse
};