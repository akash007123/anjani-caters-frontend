import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Save, Eye, Image as ImageIcon } from 'lucide-react';
import { GalleryImage, GalleryFormData, galleryApiService } from '@/services/galleryApi';
import { useToast } from '@/hooks/use-toast';

interface GalleryFormProps {
  image?: GalleryImage | null;
  onSubmit: (data: GalleryFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  image,
  onSubmit,
  onCancel,
  isLoading = false,
  isEdit = false
}) => {
  const { toast } = useToast();

  // Form state
  const [imageUrl, setImageUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [size, setSize] = useState<'normal' | 'wide' | 'tall' | 'large'>('normal');
  const [order, setOrder] = useState<number>(0);

  // UI state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Initialize form with image data when editing
  useEffect(() => {
    if (image) {
      setImageUrl(image.image);
      setAlt(image.alt);
      setCategory(image.category);
      setFeatured(image.featured);
      setSize(image.size);
      setOrder(image.order);
      setImagePreview(image.image);
    }
  }, [image]);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await galleryApiService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  // Image upload handler
  const handleImageUpload = async (file: File) => {
    try {
      const response = await galleryApiService.uploadImage(file);
      const uploadedImageUrl = response.data.url;
      setImageUrl(uploadedImageUrl);
      setImagePreview(uploadedImageUrl);
      toast({
        title: "Image uploaded",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!imageUrl) {
      toast({
        title: "Validation Error",
        description: "Image is required",
        variant: "destructive"
      });
      return false;
    }

    if (!alt.trim()) {
      toast({
        title: "Validation Error",
        description: "Alt text is required",
        variant: "destructive"
      });
      return false;
    }

    if (!category.trim()) {
      toast({
        title: "Validation Error",
        description: "Category is required",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData: GalleryFormData = {
        image: imageUrl,
        alt: alt.trim(),
        category: category.trim(),
        featured,
        size,
        order
      };

      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Category suggestions
  const categorySuggestions = [
    'Events',
    'Weddings',
    'Corporate',
    'Food',
    'Desserts',
    'Private'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{isEdit ? 'Edit Gallery Image' : 'Add New Gallery Image'}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
                <Label htmlFor="featured" className="text-sm">Featured</Label>
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label>Image *</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImageUrl('');
                    setImagePreview(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImageUrl('');
                      setImagePreview(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Alt Text */}
          <div>
            <Label htmlFor="alt">Alt Text *</Label>
            <Textarea
              id="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe the image for accessibility"
              className="min-h-[80px] resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select or enter category"
                list="category-suggestions"
                required
              />
              <datalist id="category-suggestions">
                {[...new Set([...categorySuggestions, ...categories])].map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Size */}
          <div>
            <Label htmlFor="size">Size</Label>
            <Select value={size} onValueChange={(value: 'normal' | 'wide' | 'tall' | 'large') => setSize(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="wide">Wide</SelectItem>
                <SelectItem value="tall">Tall</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Order */}
          <div>
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Lower numbers appear first. Leave as 0 for auto-ordering.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {imagePreview && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="relative group cursor-pointer overflow-hidden rounded-2xl card-shadow hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                  <img
                    src={imagePreview}
                    alt={alt}
                    className="w-full h-64 object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-3 py-1 text-xs font-medium">
                          <ImageIcon className="h-3 w-3" />
                          {category || 'Category'}
                        </span>
                        {featured && (
                          <span className="inline-flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-3 py-1 text-xs font-medium text-yellow-300">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{alt}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              {isEdit ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Update Image' : 'Add Image'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default GalleryForm;