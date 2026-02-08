import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Images, 
  Film,
  Upload,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  customCategory?: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

const CATEGORIES = [
  { value: 'wedding', label: 'Weddings' },
  { value: 'catering', label: 'Catering' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'religious', label: 'Religious' },
  { value: 'other', label: 'Other' },
];

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    customCategory: '',
    type: 'image' as 'image' | 'video',
    src: '',
    thumbnail: '',
    order: 0,
  });

  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Helper to get full URL for file paths
  const getFullUrl = (path: string) => {
    if (!path) return '';
    // Already a full URL or data URI
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
    // Extract base URL from API_URL (remove /api suffix if present)
    const baseUrl = API_URL.replace(/\/api\/?$/, '');
    // Path includes /api/uploads - use base URL
    if (path.startsWith('/api/uploads')) return `${baseUrl}${path}`;
    // Old format - just /uploads, need to add /api prefix
    if (path.startsWith('/uploads')) return `${API_URL}${path}`;
    return path;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      console.log('Fetching items from:', `${API_URL}/gallery`);
      const response = await fetch(`${API_URL}/gallery`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('API response:', data);
      
      if (Array.isArray(data)) {
        // Transform data to add full URLs for file paths
        const transformedItems = data.map((item) => ({
          ...item,
          src: getFullUrl(item.src),
          thumbnail: item.thumbnail ? getFullUrl(item.thumbnail) : undefined,
        }));
        console.log('Transformed items:', transformedItems);
        setItems(transformedItems);
      } else {
        console.error('Unexpected response format:', data);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch gallery items.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'src' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (field === 'src') {
        setSelectedFile(file);
        setFilePreview(previewUrl);
        setFormData(prev => ({ ...prev, src: previewUrl }));
      } else {
        setSelectedThumbnail(file);
        setThumbnailPreview(previewUrl);
        setFormData(prev => ({ ...prev, thumbnail: previewUrl }));
      }
    }
  };

  const clearFile = (field: 'src' | 'thumbnail') => {
    if (field === 'src') {
      setSelectedFile(null);
      setFilePreview('');
      setFormData(prev => ({ ...prev, src: '' }));
    } else {
      setSelectedThumbnail(null);
      setThumbnailPreview('');
      setFormData(prev => ({ ...prev, thumbnail: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'other',
      customCategory: '',
      type: 'image',
      src: '',
      thumbnail: '',
      order: 0,
    });
    setSelectedFile(null);
    setSelectedThumbnail(null);
    setFilePreview('');
    setThumbnailPreview('');
  };

  const handleAdd = async () => {
    if (!formData.title || (!formData.src && !selectedFile)) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('customCategory', formData.customCategory);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('order', formData.order.toString());
      formDataToSend.append('isActive', 'true');

      if (selectedFile) {
        formDataToSend.append('src', selectedFile);
      }
      if (selectedThumbnail) {
        formDataToSend.append('thumbnail', selectedThumbnail);
      }

      const response = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Gallery item added successfully.',
        });
        setIsAddDialogOpen(false);
        resetForm();
        fetchItems();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add gallery item.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedItem || !formData.title) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('customCategory', formData.customCategory);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('order', formData.order.toString());
      formDataToSend.append('isActive', 'true');

      if (selectedFile) {
        formDataToSend.append('src', selectedFile);
      }
      if (selectedThumbnail) {
        formDataToSend.append('thumbnail', selectedThumbnail);
      }

      const response = await fetch(`${API_URL}/gallery/${selectedItem._id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Gallery item updated successfully.',
        });
        setIsEditDialogOpen(false);
        setSelectedItem(null);
        resetForm();
        fetchItems();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update item');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update gallery item.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Gallery item deleted successfully.',
        });
        fetchItems();
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete gallery item.',
        variant: 'destructive'
      });
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/gallery/${id}/toggle-status`, {
        method: 'PATCH',
      });

      if (response.ok) {
        fetchItems();
      } else {
        throw new Error('Failed to toggle status');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update item status.',
        variant: 'destructive'
      });
    }
  };

  const openEditDialog = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      customCategory: item.customCategory || '',
      type: item.type,
      src: item.src,
      thumbnail: item.thumbnail || '',
      order: item.order,
    });
    setFilePreview(item.src);
    setThumbnailPreview(item.thumbnail || '');
    setSelectedFile(null);
    setSelectedThumbnail(null);
    setIsEditDialogOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Debug: Show all items regardless of filter
  const debugAllItems = items;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (value: string) => {
    const cat = CATEGORIES.find(c => c.value === value);
    return cat?.label || value;
  };

  // File upload component
  const FileUploadField = ({ 
    label, 
    accept, 
    file, 
    preview, 
    onChange, 
    onClear,
    required = false 
  }: { 
    label: string;
    accept: string;
    file: File | null;
    preview: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    required?: boolean;
  }) => (
    <div>
      <Label htmlFor="file-upload">{label} {required && '*'}</Label>
      <div className="mt-1">
        {preview ? (
          <div className="relative">
            {accept.includes('video') ? (
              <video src={preview} className="w-full h-32 object-cover rounded-lg" />
            ) : (
              <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
            )}
            <button
              type="button"
              onClick={onClear}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept={accept}
              onChange={onChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );

  return (
    <>
      <SEO 
        title="Manage Gallery"
        description="Add, edit, and manage gallery images and videos for Anjani Events"
        url="http://anjanievents.in/admin/gallery"
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Manage Gallery</h1>
            <p className="text-muted-foreground">Add, edit, and manage gallery images and videos</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchItems} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Images className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{items.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Images className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Images</p>
                <p className="text-2xl font-bold">{items.filter(i => i.type === 'image').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Film className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold">{items.filter(i => i.type === 'video').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{items.filter(i => i.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:w-64"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="sm:w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gallery Grid */}
        <div className="bg-card rounded-lg border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground">Loading gallery items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <Images className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No gallery items found.</p>
              <Button 
                className="mt-4" 
                onClick={() => { resetForm(); setIsAddDialogOpen(true); }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {/* Debug: Show raw items count */}
              <div className="col-span-full text-center text-sm text-muted-foreground mb-2">
                Total items: {items.length} | Filtered: {filteredItems.length}
              </div>
              {filteredItems.map((item) => (
                <div 
                  key={item._id} 
                  className={`relative group rounded-lg overflow-hidden border bg-background ${
                    !item.isActive ? 'opacity-60' : ''
                  }`}
                >
                  {/* Preview */}
                  <div className="aspect-square relative">
                    {item.type === 'video' ? (
                      item.thumbnail ? (
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Film className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )
                    ) : (
                      <img 
                        src={item.src} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Type Badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === 'video' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type === 'video' ? (
                          <Film className="w-3 h-3 mr-1" />
                        ) : (
                          <Images className="w-3 h-3 mr-1" />
                        )}
                        {item.type}
                      </span>
                    </div>

                    {/* Inactive Badge */}
                    {!item.isActive && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inactive
                        </span>
                      </div>
                    )}

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => openEditDialog(item)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(item._id)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleToggleStatus(item._id)}
                        className="bg-white/90 hover:bg-white"
                      >
                        {item.isActive ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="p-3">
                    <h3 className="font-medium truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {getCategoryLabel(item.category)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Order: {item.order} • {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Add Gallery Item</DialogTitle>
            <DialogDescription>
              Upload an image or video to the gallery
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'image' | 'video') => {
                    setFormData(prev => ({ ...prev, type: value, src: '', thumbnail: '' }));
                    setSelectedFile(null);
                    setSelectedThumbnail(null);
                    setFilePreview('');
                    setThumbnailPreview('');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {formData.category === 'other' && (
              <div>
                <Label htmlFor="customCategory">Custom Category Name</Label>
                <Input
                  id="customCategory"
                  value={formData.customCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, customCategory: e.target.value }))}
                  placeholder="Enter custom category name"
                />
              </div>
            )}
            
            {/* Image/Video Upload */}
            <FileUploadField
              label={formData.type === 'video' ? 'Video File' : 'Image File'}
              accept={formData.type === 'video' ? 'video/*' : 'image/*'}
              file={selectedFile}
              preview={filePreview}
              onChange={(e) => handleFileChange(e, 'src')}
              onClear={() => clearFile('src')}
              required
            />
            
            {/* Thumbnail Upload (for videos only) */}
            {formData.type === 'video' && (
              <FileUploadField
                label="Thumbnail Image"
                accept="image/*"
                file={selectedThumbnail}
                preview={thumbnailPreview}
                onChange={(e) => handleFileChange(e, 'thumbnail')}
                onClear={() => clearFile('thumbnail')}
                required
              />
            )}
            
            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Item'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* search_and_replace Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit Gallery Item</DialogTitle>
            <DialogDescription>
              Update the gallery item details
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            <div>
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'image' | 'video') => {
                    setFormData(prev => ({ ...prev, type: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {formData.category === 'other' && (
              <div>
                <Label htmlFor="edit-customCategory">Custom Category Name</Label>
                <Input
                  id="edit-customCategory"
                  value={formData.customCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, customCategory: e.target.value }))}
                  placeholder="Enter custom category name"
                />
              </div>
            )}
            
            {/* Image/Video Upload */}
            <FileUploadField
              label={formData.type === 'video' ? 'Video File' : 'Image File'}
              accept={formData.type === 'video' ? 'video/*' : 'image/*'}
              file={selectedFile}
              preview={filePreview}
              onChange={(e) => handleFileChange(e, 'src')}
              onClear={() => clearFile('src')}
            />
            
            {/* Thumbnail Upload (for videos only) */}
            {formData.type === 'video' && (
              <FileUploadField
                label="Thumbnail Image"
                accept="image/*"
                file={selectedThumbnail}
                preview={thumbnailPreview}
                onChange={(e) => handleFileChange(e, 'thumbnail')}
                onClear={() => clearFile('thumbnail')}
              />
            )}
            
            <div>
              <Label htmlFor="edit-order">Display Order</Label>
              <Input
                id="edit-order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminGallery;
