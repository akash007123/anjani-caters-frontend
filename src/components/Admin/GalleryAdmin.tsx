import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  Image as ImageIcon,
  Filter,
  BarChart3,
  Loader2,
  Upload
} from 'lucide-react';
import { GalleryImage, GalleryFormData, galleryApiService } from '@/services/galleryApi';
import { useToast } from '@/hooks/use-toast';
import GalleryForm from './GalleryForm';
import DeleteConfirmModal from './DeleteConfirmModal';

const GalleryAdmin: React.FC = () => {
  const { toast } = useToast();

  // State management
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Stats state
  const [stats, setStats] = useState({
    totalImages: 0,
    featuredImages: 0,
    totalCategories: 0,
    imagesByCategory: []
  });

  // Load images data
  const loadImages = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 20,
        category: categoryFilter !== 'All' ? categoryFilter : undefined,
        featured: featuredFilter !== 'All' ? featuredFilter === 'true' : undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc' as const
      };

      const response = await galleryApiService.getAllImages(params);
      setImages(response.data.images);
      setTotalPages(response.data.pages);
      setTotalImages(response.data.total);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const response = await galleryApiService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // Load gallery stats
  const loadGalleryStats = async () => {
    try {
      const response = await galleryApiService.getGalleryStats();
      setStats({
        totalImages: response.data.totalImages,
        featuredImages: response.data.featuredImages,
        totalCategories: response.data.totalCategories,
        imagesByCategory: response.data.imagesByCategory
      });
    } catch (error) {
      console.error('Error loading gallery stats:', error);
    }
  };

  // Load data on mount and when filters change
  useEffect(() => {
    loadImages();
    loadCategories();
    loadGalleryStats();
  }, [currentPage, searchTerm, categoryFilter, featuredFilter]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Handle category filter
  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  // Handle featured filter
  const handleFeaturedFilter = (value: string) => {
    setFeaturedFilter(value);
    setCurrentPage(1);
  };

  // Handle image creation
  const handleCreateImage = async (data: GalleryFormData) => {
    try {
      setSubmitting(true);
      await galleryApiService.createImage(data);
      toast({
        title: "Success",
        description: "Image added to gallery successfully!"
      });
      setShowForm(false);
      loadImages();
      loadGalleryStats();
      loadCategories();
    } catch (error: unknown) {
      console.error('Error creating image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add image",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle image update
  const handleUpdateImage = async (data: GalleryFormData) => {
    if (!editingImage) return;

    try {
      setSubmitting(true);
      await galleryApiService.updateImage(editingImage._id, data);
      toast({
        title: "Success",
        description: "Image updated successfully!"
      });
      setEditingImage(null);
      setShowForm(false);
      loadImages();
      loadGalleryStats();
      loadCategories();
    } catch (error: unknown) {
      console.error('Error updating image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update image",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle image deletion
  const handleDeleteImage = async () => {
    if (!deletingImage) return;

    try {
      await galleryApiService.deleteImage(deletingImage._id);
      toast({
        title: "Success",
        description: "Image deleted successfully!"
      });
      setDeletingImage(null);
      loadImages();
      loadGalleryStats();
      loadCategories();
    } catch (error: unknown) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  // Handle featured toggle
  const handleFeaturedToggle = async (image: GalleryImage) => {
    try {
      await galleryApiService.toggleFeatured(image._id, !image.featured);
      toast({
        title: "Success",
        description: `Image ${!image.featured ? 'featured' : 'unfeatured'} successfully!`
      });
      loadImages();
      loadGalleryStats();
    } catch (error: unknown) {
      console.error('Error toggling featured status:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update featured status",
        variant: "destructive"
      });
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (showForm || editingImage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {editingImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingImage(null);
            }}
          >
            Back to Gallery
          </Button>
        </div>

        <GalleryForm
          image={editingImage}
          onSubmit={editingImage ? handleUpdateImage : handleCreateImage}
          onCancel={() => {
            setShowForm(false);
            setEditingImage(null);
          }}
          isLoading={submitting}
          isEdit={!!editingImage}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">
            Manage your gallery images and categories
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Image
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImages}</div>
            <p className="text-xs text-muted-foreground">
              All gallery images
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredImages}</div>
            <p className="text-xs text-muted-foreground">
              Highlighted images
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Image categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              New uploads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={featuredFilter} onValueChange={handleFeaturedFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Images</SelectItem>
                <SelectItem value="true">Featured</SelectItem>
                <SelectItem value="false">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Images Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gallery Images</CardTitle>
            <div className="text-sm text-muted-foreground">
              {totalImages} total images
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading images...</span>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No images found.</p>
              <Button
                variant="outline"
                onClick={() => setShowForm(true)}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Alt Text</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {images.map((image) => (
                    <TableRow key={image._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={image.image}
                            alt={image.alt}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="text-sm font-medium">Image</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={image.alt}>
                          {image.alt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {image.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {image.size}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeaturedToggle(image)}
                          className={image.featured ? 'text-yellow-600' : 'text-muted-foreground'}
                        >
                          <Star className={`h-4 w-4 ${image.featured ? 'fill-current' : ''}`} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">{formatDate(image.createdAt)}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingImage(image)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFeaturedToggle(image)}>
                              <Star className="h-4 w-4 mr-2" />
                              {image.featured ? 'Unfeature' : 'Feature'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeletingImage(image)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {deletingImage && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => setDeletingImage(null)}
          onConfirm={handleDeleteImage}
          itemName={deletingImage.alt}
        />
      )}
    </div>
  );
};

export default GalleryAdmin;