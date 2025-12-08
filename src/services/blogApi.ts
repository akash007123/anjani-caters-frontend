import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const blogApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  status?: 'Draft' | 'Published';
  sections: BlogSection[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  authorName: string;
  authorEmail: string;
  category?: string;
}

interface BlogSection {
  _id?: string;
  sectionTitle: string;
  sectionContent: string;
  sectionImage?: string;
  order?: number;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  status: 'Draft' | 'Published';
  sections: BlogSection[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  slug: string;
  author: {
    name: string;
    email: string;
  };
  viewCount: number;
  likeCount: number;
  publishedAt?: string;
  readingTime?: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogsResponse {
  success: boolean;
  message: string;
  data: {
    blogs: Blog[];
    total: number;
    page: number;
    pages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

interface BlogStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    featuredBlogs: number;
    totalViews: number;
    postsByMonth: Array<{
      _id: number;
      count: number;
    }>;
    popularTags: Array<{
      _id: string;
      count: number;
    }>;
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

interface TagsResponse {
  success: boolean;
  message: string;
  data: string[];
}

interface FeaturedBlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
}

// Request interceptor for adding auth headers if needed
blogApi.interceptors.request.use(
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
blogApi.interceptors.response.use(
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

// Blog API functions
export const blogApiService = {
  // Health check
  checkHealth: async (): Promise<HealthResponse> => {
    try {
      const response = await blogApi.get('/blog/health');
      return {
        success: true,
        message: 'Blog API is online'
      };
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Blog API not available';
      throw new Error(message);
    }
  },

  // Public API - Get published blogs
  getPublishedBlogs: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    tag?: string;
    featured?: boolean;
  }): Promise<BlogsResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const response = await blogApi.get(`/blog/published?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch published blogs';
      throw new Error(message);
    }
  },

  // Public API - Get blog by slug
  getBlogBySlug: async (slug: string): Promise<BlogResponse> => {
    try {
      const response = await blogApi.get(`/blog/slug/${slug}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch blog';
      throw new Error(message);
    }
  },

  // Public API - Get featured blogs
  getFeaturedBlogs: async (limit = 3): Promise<FeaturedBlogsResponse> => {
    try {
      const response = await blogApi.get(`/blog/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch featured blogs';
      throw new Error(message);
    }
  },

  // Public API - Get all tags
  getAllTags: async (): Promise<TagsResponse> => {
    try {
      const response = await blogApi.get('/blog/tags');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch tags';
      throw new Error(message);
    }
  },

  // Admin API - Get all blogs
  getAllBlogs: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<BlogsResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const response = await blogApi.get(`/blog?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch blogs';
      throw new Error(message);
    }
  },

  // Admin API - Get blog by ID
  getBlogById: async (id: string): Promise<BlogResponse> => {
    try {
      const response = await blogApi.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch blog';
      throw new Error(message);
    }
  },

  // Admin API - Create blog
  createBlog: async (data: BlogFormData): Promise<BlogResponse> => {
    try {
      const response = await blogApi.post('/blog', data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to create blog';
      throw new Error(message);
    }
  },

  // Admin API - Update blog
  updateBlog: async (id: string, data: Partial<BlogFormData>): Promise<BlogResponse> => {
    try {
      const response = await blogApi.put(`/blog/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update blog';
      throw new Error(message);
    }
  },

  // Admin API - Update blog status
  updateBlogStatus: async (id: string, status: 'Draft' | 'Published'): Promise<BlogResponse> => {
    try {
      const response = await blogApi.patch(`/blog/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update blog status';
      throw new Error(message);
    }
  },

  // Admin API - Toggle featured status
  toggleFeatured: async (id: string, featured: boolean): Promise<BlogResponse> => {
    try {
      const response = await blogApi.patch(`/blog/${id}/featured`, { featured });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to update featured status';
      throw new Error(message);
    }
  },

  // Admin API - Delete blog
  deleteBlog: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await blogApi.delete(`/blog/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to delete blog';
      throw new Error(message);
    }
  },

  // Admin API - Get blog statistics
  getBlogStats: async (): Promise<BlogStatsResponse> => {
    try {
      const response = await blogApi.get('/blog/stats');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to fetch blog statistics';
      throw new Error(message);
    }
  },

  // Admin API - Reorder sections
  reorderSections: async (id: string, sections: BlogSection[]): Promise<{ success: boolean; data: BlogSection[]; message: string }> => {
    try {
      const response = await blogApi.patch(`/blog/${id}/sections/reorder`, { sections });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const responseData = apiError.response?.data as { message?: string } | undefined;
      const message = responseData?.message || 'Failed to reorder sections';
      throw new Error(message);
    }
  },

  // Image upload
  uploadImage: async (file: File): Promise<{ success: boolean; data: { url: string; filename: string }; message: string }> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await blogApi.post('/blog/upload', formData, {
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
  }
};

// Export the axios instance for custom usage if needed
export { blogApi };

// Export types for use in components
export type {
  BlogFormData,
  BlogSection,
  Blog,
  BlogsResponse,
  BlogResponse,
  BlogStatsResponse,
  ApiError,
  HealthResponse,
  TagsResponse,
  FeaturedBlogsResponse
};