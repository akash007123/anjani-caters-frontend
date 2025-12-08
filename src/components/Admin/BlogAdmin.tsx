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
  User,
  Tag,
  Filter,
  BarChart3,
  Loader2
} from 'lucide-react';
import { Blog, BlogFormData, blogApiService } from '@/services/blogApi';
import { useToast } from '@/hooks/use-toast';
import BlogForm from './BlogForm';
import DeleteConfirmModal from './DeleteConfirmModal';

const BlogAdmin: React.FC = () => {
  const { toast } = useToast();
  
  // State management
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Stats state
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    featuredBlogs: 0
  });

  // Load blogs data
  const loadBlogs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        featured: featuredFilter !== 'All' ? featuredFilter === 'true' : undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc' as const
      };
      
      const response = await blogApiService.getAllBlogs(params);
      setBlogs(response.data.blogs);
      setTotalPages(response.data.pages);
      setTotalBlogs(response.data.total);
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast({
        title: "Error",
        description: "Failed to load blogs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load blog stats
  const loadBlogStats = async () => {
    try {
      const response = await blogApiService.getBlogStats();
      setStats({
        totalBlogs: response.data.totalBlogs,
        publishedBlogs: response.data.publishedBlogs,
        draftBlogs: response.data.draftBlogs,
        featuredBlogs: response.data.featuredBlogs
      });
    } catch (error) {
      console.error('Error loading blog stats:', error);
    }
  };

  // Load data on mount and when filters change
  useEffect(() => {
    loadBlogs();
    loadBlogStats();
  }, [currentPage, searchTerm, statusFilter, featuredFilter]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Handle status filter
  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Handle featured filter
  const handleFeaturedFilter = (value: string) => {
    setFeaturedFilter(value);
    setCurrentPage(1);
  };

  // Handle blog creation
  const handleCreateBlog = async (data: BlogFormData) => {
    try {
      setSubmitting(true);
      await blogApiService.createBlog(data);
      toast({
        title: "Success",
        description: "Blog created successfully!"
      });
      setShowForm(false);
      loadBlogs();
      loadBlogStats();
    } catch (error: unknown) {
      console.error('Error creating blog:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create blog",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle blog update
  const handleUpdateBlog = async (data: BlogFormData) => {
    if (!editingBlog) return;
    
    try {
      setSubmitting(true);
      await blogApiService.updateBlog(editingBlog._id, data);
      toast({
        title: "Success",
        description: "Blog updated successfully!"
      });
      setEditingBlog(null);
      setShowForm(false);
      loadBlogs();
      loadBlogStats();
    } catch (error: unknown) {
      console.error('Error updating blog:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update blog",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle blog deletion
  const handleDeleteBlog = async () => {
    if (!deletingBlog) return;
    
    try {
      await blogApiService.deleteBlog(deletingBlog._id);
      toast({
        title: "Success",
        description: "Blog deleted successfully!"
      });
      setDeletingBlog(null);
      loadBlogs();
      loadBlogStats();
    } catch (error: unknown) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog",
        variant: "destructive"
      });
    }
  };

  // Handle status toggle
  const handleStatusToggle = async (blog: Blog) => {
    try {
      const newStatus = blog.status === 'Published' ? 'Draft' : 'Published';
      await blogApiService.updateBlogStatus(blog._id, newStatus);
      toast({
        title: "Success",
        description: `Blog ${newStatus.toLowerCase()} successfully!`
      });
      loadBlogs();
      loadBlogStats();
    } catch (error: unknown) {
      console.error('Error updating blog status:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update blog status",
        variant: "destructive"
      });
    }
  };

  // Handle featured toggle
  const handleFeaturedToggle = async (blog: Blog) => {
    try {
      await blogApiService.toggleFeatured(blog._id, !blog.featured);
      toast({
        title: "Success",
        description: `Blog ${!blog.featured ? 'featured' : 'unfeatured'} successfully!`
      });
      loadBlogs();
      loadBlogStats();
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

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Published':
        return 'default';
      case 'Draft':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (showForm || editingBlog) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingBlog(null);
            }}
          >
            Back to Blogs
          </Button>
        </div>
        
        <BlogForm
          blog={editingBlog}
          onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}
          onCancel={() => {
            setShowForm(false);
            setEditingBlog(null);
          }}
          isLoading={submitting}
          isEdit={!!editingBlog}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Blog Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              All blog posts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Live blog posts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Unpublished posts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Highlighted posts
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
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={featuredFilter} onValueChange={handleFeaturedFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Posts</SelectItem>
                <SelectItem value="true">Featured</SelectItem>
                <SelectItem value="false">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Blog Posts</CardTitle>
            <div className="text-sm text-muted-foreground">
              {totalBlogs} total posts
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading blogs...</span>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No blogs found.</p>
              <Button
                variant="outline"
                onClick={() => setShowForm(true)}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Blog
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium line-clamp-1">{blog.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {blog.excerpt}
                          </div>
                          {blog.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {blog.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{blog.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">{blog.author.name}</div>
                            <div className="text-xs text-muted-foreground">{blog.author.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(blog.status)}>
                          {blog.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeaturedToggle(blog)}
                          className={blog.featured ? 'text-yellow-600' : 'text-muted-foreground'}
                        >
                          <Star className={`h-4 w-4 ${blog.featured ? 'fill-current' : ''}`} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm">{formatDate(blog.createdAt)}</div>
                            {blog.publishedAt && (
                              <div className="text-xs text-muted-foreground">
                                Published: {formatDate(blog.publishedAt)}
                              </div>
                            )}
                          </div>
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
                            <DropdownMenuItem onClick={() => setEditingBlog(blog)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusToggle(blog)}>
                              <Eye className="h-4 w-4 mr-2" />
                              {blog.status === 'Published' ? 'Unpublish' : 'Publish'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeletingBlog(blog)}>
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
      {deletingBlog && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => setDeletingBlog(null)}
          onConfirm={handleDeleteBlog}
          itemName={deletingBlog.title}
        />
      )}
    </div>
  );
};

export default BlogAdmin;