import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const galleryApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
interface GalleryImage {
  _id: string;
  image: string;
  alt: string;
  category: string;
  featured: boolean;
  size: 'normal' | 'wide' | 'tall' | 'large';
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface GalleryFormData {
  image: string;
  alt: string;
  category: string;
  featured?: boolean;
  size?: 'normal' | 'wide' | 'tall' | 'large';
  order?: number;
}

interface GalleryImagesResponse {
  success: boolean;
  message: string;
  data: GalleryImage[];
}

interface GalleryResponse {
  success: boolean;
  message: string;
  data: GalleryImage;
}

interface GalleryStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalImages: number;
    featuredImages: number;
    totalCategories: number;
    imagesByCategory: Array<{
      _id: string;
      count: number;
    }>;
  };
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: string[];
}

interface PaginatedGalleryResponse {
  success: boolean;
  message: string;
  data: {
    images: GalleryImage[];
    total: number;
    page: number;
    pages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Request interceptor for adding auth headers if needed
galleryApi.interceptors.request.use(
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
galleryApi.interceptors.response.use(
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

// Gallery API functions
export const galleryApiService = {
  // Public API - Get gallery images
  getGalleryImages: async (params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<GalleryImagesResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const response = await galleryApi.get(`/gallery/images?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch gallery images';
      throw new Error(message);
    }
  },

  // Public API - Get featured images
  getFeaturedImages: async (limit = 10): Promise<GalleryImagesResponse> => {
    try {
      const response = await galleryApi.get(`/gallery/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch featured images';
      throw new Error(message);
    }
  },

  // Public API - Get categories
  getCategories: async (): Promise<CategoriesResponse> => {
    try {
      const response = await galleryApi.get('/gallery/categories');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch categories';
      throw new Error(message);
    }
  },

  // Admin API - Get all images
  getAllImages: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PaginatedGalleryResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const response = await galleryApi.get(`/gallery?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch images';
      throw new Error(message);
    }
  },

  // Admin API - Get image by ID
  getImageById: async (id: string): Promise<GalleryResponse> => {
    try {
      const response = await galleryApi.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch image';
      throw new Error(message);
    }
  },

  // Admin API - Create image
  createImage: async (data: GalleryFormData): Promise<GalleryResponse> => {
    try {
      const response = await galleryApi.post('/gallery', data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to create image';
      throw new Error(message);
    }
  },

  // Admin API - Update image
  updateImage: async (id: string, data: Partial<GalleryFormData>): Promise<GalleryResponse> => {
    try {
      const response = await galleryApi.put(`/gallery/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update image';
      throw new Error(message);
    }
  },

  // Admin API - Toggle featured status
  toggleFeatured: async (id: string, featured: boolean): Promise<GalleryResponse> => {
    try {
      const response = await galleryApi.patch(`/gallery/${id}/featured`, { featured });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update featured status';
      throw new Error(message);
    }
  },

  // Admin API - Delete image
  deleteImage: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await galleryApi.delete(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to delete image';
      throw new Error(message);
    }
  },

  // Admin API - Get gallery statistics
  getGalleryStats: async (): Promise<GalleryStatsResponse> => {
    try {
      const response = await galleryApi.get('/gallery/stats');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch gallery statistics';
      throw new Error(message);
    }
  },

  // Image upload
  uploadImage: async (file: File): Promise<{ success: boolean; data: { url: string; filename: string }; message: string }> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await galleryApi.post('/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to upload image';
      throw new Error(message);
    }
  },
};

// Export the axios instance for custom usage if needed
export { galleryApi };

// Export types for use in components
export type {
  GalleryImage,
  GalleryFormData,
  GalleryImagesResponse,
  GalleryResponse,
  GalleryStatsResponse,
  CategoriesResponse,
  PaginatedGalleryResponse
};