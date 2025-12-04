import React, { createContext, useContext, useState, ReactNode } from 'react';
import { contactApiService, ContactFormData } from '../services/contactApi';
import { toast } from 'sonner';

// Types for context
interface ContactState {
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  lastSubmitted: ContactFormData | null;
  submissionSuccess: boolean;
}

interface ContactContextType extends ContactState {
  submitContact: (data: ContactFormData) => Promise<boolean>;
  clearError: () => void;
  resetForm: () => void;
  checkApiHealth: () => Promise<boolean>;
}

interface ContactProviderProps {
  children: ReactNode;
}

// Create context
const ContactContext = createContext<ContactContextType | undefined>(undefined);

// Initial state
const initialState: ContactState = {
  isLoading: false,
  isSubmitting: false,
  error: null,
  lastSubmitted: null,
  submissionSuccess: false,
};

// Contact Provider Component
export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [state, setState] = useState<ContactState>(initialState);

  // Update state helper
  const updateState = (updates: Partial<ContactState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Clear error
  const clearError = () => {
    updateState({ error: null });
  };

  // Reset form state
  const resetForm = () => {
    updateState({
      error: null,
      submissionSuccess: false,
      lastSubmitted: null,
    });
  };

  // Submit contact form
  const submitContact = async (data: ContactFormData): Promise<boolean> => {
    try {
      updateState({ 
        isSubmitting: true, 
        error: null, 
        submissionSuccess: false 
      });

      // Validate data on client side
      if (!data.name?.trim()) {
        throw new Error('Name is required');
      }
      if (!data.email?.trim()) {
        throw new Error('Email is required');
      }
      if (!data.message?.trim()) {
        throw new Error('Message is required');
      }
      if (data.name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters');
      }
      if (data.message.trim().length < 10) {
        throw new Error('Message must be at least 10 characters');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        throw new Error('Please enter a valid email address');
      }

      // Call API
      const response = await contactApiService.submitContact(data);
      
      if (response.success) {
        updateState({ 
          submissionSuccess: true, 
          lastSubmitted: data,
          isSubmitting: false,
          error: null 
        });
        
        // Show success toast
        toast.success(response.message || 'Message sent successfully!');
        
        return true;
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      
      updateState({ 
        error: errorMessage, 
        isSubmitting: false,
        submissionSuccess: false 
      });

      // Show error toast
      toast.error(errorMessage);
      
      return false;
    }
  };

  // Check API health
  const checkApiHealth = async (): Promise<boolean> => {
    try {
      updateState({ isLoading: true });
      
      const health = await contactApiService.checkHealth();
      
      updateState({ isLoading: false });
      
      if (health.success) {
        console.log('✅ API is healthy');
        return true;
      } else {
        throw new Error(health.message);
      }
    } catch (error) {
      updateState({ isLoading: false });
      const errorMessage = error instanceof Error ? error.message : 'API is not available';
      console.error('❌ API health check failed:', errorMessage);
      toast.error(`API Error: ${errorMessage}`);
      return false;
    }
  };

  // Context value
  const contextValue: ContactContextType = {
    ...state,
    submitContact,
    clearError,
    resetForm,
    checkApiHealth,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook to use contact context
export const useContact = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};

// Hook for contact form validation
export const useContactValidation = () => {
  const validateForm = (data: ContactFormData): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (data.name.trim().length > 100) {
      errors.name = 'Name cannot exceed 100 characters';
    }

    // Email validation
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation (optional)
    if (data.phone?.trim()) {
      if (data.phone.trim().length > 20) {
        errors.phone = 'Phone number cannot exceed 20 characters';
      }
    }

    // Message validation
    if (!data.message?.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (data.message.trim().length > 1000) {
      errors.message = 'Message cannot exceed 1000 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return { validateForm };
};

// Hook for form auto-save (optional feature)
export const useContactFormData = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Save to localStorage
    try {
      localStorage.setItem('contactFormData', JSON.stringify({
        ...formData,
        [field]: value
      }));
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error);
    }
  };

  const loadFormData = () => {
    try {
      const saved = localStorage.getItem('contactFormData');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      }
    } catch (error) {
      console.warn('Failed to load form data from localStorage:', error);
    }
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    try {
      localStorage.removeItem('contactFormData');
    } catch (error) {
      console.warn('Failed to clear form data from localStorage:', error);
    }
  };

  return {
    formData,
    updateField,
    loadFormData,
    clearFormData
  };
};

export default ContactProvider;