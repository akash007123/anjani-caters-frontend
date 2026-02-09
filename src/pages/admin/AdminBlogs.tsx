import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  FileText,
  Calendar,
  User,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  mainImage?: string;
  category?: string;
  readTime?: string;
  tags: string[];
  author: {
    name?: string;
    designation?: string;
    profilePic?: string;
    aboutAuthor?: string;
  };
  sections: Array<{
    title?: string;
    content?: string;
    image?: string;
  }>;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  mainImage: string;
  category: string;
  readTime: string;
  tags: string;
  isPublished: boolean;
  author: {
    name: string;
    designation: string;
    profilePic: string;
    aboutAuthor: string;
  };
  sections: Array<{
    title?: string;
    content?: string;
    image?: string;
  }>;
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    mainImage: '',
    category: 'General',
    readTime: '',
    tags: '',
    isPublished: false,
    author: {
      name: '',
      designation: '',
      profilePic: '',
      aboutAuthor: ''
    },
    sections: [{ title: '', content: '', image: '' }],
    metaTitle: '',
    metaDescription: '',
    seoKeywords: ''
  });

  // File states
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
  const [authorImagePreview, setAuthorImagePreview] = useState<string>('');
  const [sectionImages, setSectionImages] = useState<Array<{ file: File | null; preview: string }>>([{ file: null, preview: '' }]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const { toast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Helper to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Helper to get full URL for file paths
  const getFullUrl = (path?: string) => {
  if (!path) return '';

  if (path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }

  const baseUrl = API_URL.replace(/\/api\/?$/, '');

  // Handle already-broken values safely
  if (path.includes('/api/http')) {
    path = path.replace(/^.*http/, 'http');
  }

  if (path.startsWith('http')) {
    const url = new URL(path);
    path = url.pathname;
  }

  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  if (!path.startsWith('/api/')) {
    path = '/api' + path;
  }

  return `${baseUrl}${path}`;
};


  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/blogs/admin/all`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        const transformedBlogs = data.data.map((blog: Blog) => ({
          ...blog,
          mainImage: blog.mainImage ? getFullUrl(blog.mainImage) : undefined,
          author: {
            ...blog.author,
            profilePic: blog.author.profilePic ? getFullUrl(blog.author.profilePic) : undefined
          },
          sections: blog.sections.map(section => ({
            ...section,
            image: section.image ? getFullUrl(section.image) : undefined
          }))
        }));
        setBlogs(transformedBlogs);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch blogs.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setMainImageFile(file);
      setMainImagePreview(previewUrl);
      setFormData(prev => ({ ...prev, mainImage: previewUrl }));
    }
  };

  const handleAuthorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAuthorImageFile(file);
      setAuthorImagePreview(previewUrl);
      setFormData(prev => ({
        ...prev,
        author: { ...prev.author, profilePic: previewUrl }
      }));
    }
  };

  const handleSectionImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const newSectionImages = [...sectionImages];
      newSectionImages[index] = { file, preview: previewUrl };
      setSectionImages(newSectionImages);
      
      const newSections = [...formData.sections];
      newSections[index].image = previewUrl;
      setFormData(prev => ({ ...prev, sections: newSections }));
    }
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', content: '', image: '' }]
    }));
    setSectionImages([...sectionImages, { file: null, preview: '' }]);
  };

  const removeSection = (index: number) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    const newSectionImages = sectionImages.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, sections: newSections }));
    setSectionImages(newSectionImages);
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      mainImage: '',
      category: 'General',
      readTime: '',
      tags: '',
      isPublished: false,
      author: {
        name: '',
        designation: '',
        profilePic: '',
        aboutAuthor: ''
      },
      sections: [{ title: '', content: '', image: '' }],
      metaTitle: '',
      metaDescription: '',
      seoKeywords: ''
    });
    setMainImageFile(null);
    setMainImagePreview('');
    setAuthorImageFile(null);
    setAuthorImagePreview('');
    setSectionImages([{ file: null, preview: '' }]);
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.content) {
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
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('readTime', formData.readTime);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('isPublished', formData.isPublished.toString());
      formDataToSend.append('sections', JSON.stringify(formData.sections.filter(s => s.title || s.content)));
      formDataToSend.append('author', JSON.stringify(formData.author));
      formDataToSend.append('metaTitle', formData.metaTitle || formData.title);
      formDataToSend.append('metaDescription', formData.metaDescription || formData.excerpt);
      formDataToSend.append('seoKeywords', formData.seoKeywords);

      if (mainImageFile) {
        formDataToSend.append('mainImage', mainImageFile);
      }
      if (authorImageFile) {
        formDataToSend.append('authorProfilePic', authorImageFile);
      }

      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          ...Object.fromEntries(
            Object.entries(getAuthHeaders()).filter(([key]) => key !== 'Content-Type')
          )
        }
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Blog added successfully.',
        });
        setIsAddDialogOpen(false);
        resetForm();
        fetchBlogs();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add blog');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add blog.';
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
    if (!selectedBlog || !formData.title || !formData.content) {
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
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('readTime', formData.readTime);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('isPublished', formData.isPublished.toString());
      formDataToSend.append('sections', JSON.stringify(formData.sections.filter(s => s.title || s.content)));
      formDataToSend.append('author', JSON.stringify(formData.author));
      formDataToSend.append('metaTitle', formData.metaTitle);
      formDataToSend.append('metaDescription', formData.metaDescription);
      formDataToSend.append('seoKeywords', formData.seoKeywords);

      if (mainImageFile) {
        formDataToSend.append('mainImage', mainImageFile);
      }
      if (authorImageFile) {
        formDataToSend.append('authorProfilePic', authorImageFile);
      }

      const response = await fetch(`${API_URL}/blogs/${selectedBlog._id}`, {
        method: 'PUT',
        body: formDataToSend,
        headers: {
          ...Object.fromEntries(
            Object.entries(getAuthHeaders()).filter(([key]) => key !== 'Content-Type')
          )
        }
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Blog updated successfully.',
        });
        setIsEditDialogOpen(false);
        setSelectedBlog(null);
        resetForm();
        fetchBlogs();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update blog');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update blog.';
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
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Blog deleted successfully.',
        });
        fetchBlogs();
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete blog.',
        variant: 'destructive'
      });
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}/toggle-publish`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        fetchBlogs();
      } else {
        throw new Error('Failed to toggle publish status');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update publish status.',
        variant: 'destructive'
      });
    }
  };

  const openEditDialog = (blog: Blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content,
      mainImage: blog.mainImage || '',
      category: blog.category || 'General',
      readTime: blog.readTime || '',
      tags: blog.tags.join(', '),
      isPublished: blog.isPublished,
      author: {
        name: blog.author.name || '',
        designation: blog.author.designation || '',
        profilePic: blog.author.profilePic || '',
        aboutAuthor: blog.author.aboutAuthor || ''
      },
      sections: blog.sections && blog.sections.length > 0 
        ? blog.sections.map(s => ({ title: s.title || '', content: s.content || '', image: s.image || '' }))
        : [{ title: '', content: '', image: '' }],
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      seoKeywords: blog.seoKeywords.join(', ')
    });
    setMainImagePreview(blog.mainImage || '');
    setAuthorImagePreview(blog.author.profilePic || '');
    setSectionImages(blog.sections.map(s => ({ file: null, preview: s.image || '' })));
    setMainImageFile(null);
    setAuthorImageFile(null);
    setIsEditDialogOpen(true);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && blog.isPublished) ||
      (statusFilter === 'unpublished' && !blog.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // File upload component
  const ImageUploadField = ({ 
    label, 
    preview, 
    onChange, 
    required = false,
    className = ""
  }: { 
    label: string;
    preview: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
  }) => (
    <div className={className}>
      <Label>{label} {required && '*'}</Label>
      <div className="mt-1">
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => {
                if (label.includes('Main')) {
                  setMainImageFile(null);
                  setMainImagePreview('');
                } else if (label.includes('Author')) {
                  setAuthorImageFile(null);
                  setAuthorImagePreview('');
                }
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload</p>
            </div>
            <input
              type="file"
              accept="image/*"
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
        title="Manage Blogs"
        description="Add, edit, and manage blog posts for Anjani Events"
        url="http://anjanievents.in/admin/blogs"
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Manage Blogs</h1>
            <p className="text-muted-foreground">Add, edit, and manage blog posts</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchBlogs} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Blog
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Blogs</p>
                <p className="text-2xl font-bold">{blogs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{blogs.filter(b => b.isPublished).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <EyeOff className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unpublished</p>
                <p className="text-2xl font-bold">{blogs.filter(b => !b.isPublished).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{new Set(blogs.map(b => b.category)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Input 
              placeholder="Search blogs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Array.from(new Set(blogs.map(b => b.category).filter(Boolean))).map(cat => (
                <SelectItem key={cat} value={cat || ''}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No blogs found.</p>
          </div>
        ) : (
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Blog</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">Category</th>
                    <th className="text-left p-4 font-medium hidden lg:table-cell">Author</th>
                    <th className="text-left p-4 font-medium hidden lg:table-cell">Date</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map((blog) => (
                    <tr key={blog._id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          {blog.mainImage && (
                            <img 
                              src={blog.mainImage} 
                              alt={blog.title}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <p className="font-medium">{blog.title}</p>
                            <p className="text-sm text-muted-foreground">/{blog.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {blog.category || 'General'}
                        </span>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          {blog.author.profilePic && (
                            <img 
                              src={blog.author.profilePic} 
                              alt={blog.author.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <span className="text-sm">{blog.author.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.createdAt)}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          blog.isPublished 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleTogglePublish(blog._id)}
                            title={blog.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {blog.isPublished ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(blog)}
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(blog._id)}
                            title="Delete"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Blog Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Main Section */}
            <div className="grid md:grid-cols-2 gap-4">
              <ImageUploadField
                label="Main Blog Image"
                preview={mainImagePreview}
                onChange={handleMainImageChange}
                required
                className="md:col-span-2"
              />
              <div className="md:col-span-2">
                <Label>Blog Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    }));
                  }}
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="blog-slug"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Wedding Tips">Wedding Tips</SelectItem>
                    <SelectItem value="Catering">Catering</SelectItem>
                    <SelectItem value="Venue">Venue</SelectItem>
                    <SelectItem value="Décor">Décor</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Read Time</Label>
                <Input
                  value={formData.readTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="e.g., 5 min read"
                />
              </div>
              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="wedding, catering, events"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the blog"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Main blog content"
                  rows={10}
                />
              </div>
            </div>

            {/* Author Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Author Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Author Profile Pic"
                  preview={authorImagePreview}
                  onChange={handleAuthorImageChange}
                />
                <div>
                  <Label>Author Name</Label>
                  <Input
                    value={formData.author.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, name: e.target.value }
                    }))}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label>Author Designation</Label>
                  <Input
                    value={formData.author.designation}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, designation: e.target.value }
                    }))}
                    placeholder="e.g., Wedding Planner"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>About Author</Label>
                  <Textarea
                    value={formData.author.aboutAuthor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, aboutAuthor: e.target.value }
                    }))}
                    placeholder="Brief about the author"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Additional Sections</h3>
                <Button type="button" variant="outline" size="sm" onClick={addSection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
              {formData.sections.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Section {index + 1}</span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                      >
                        {expandedSection === index ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      {formData.sections.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSection(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {expandedSection === index && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Section Image"
                        preview={sectionImages[index]?.preview || ''}
                        onChange={(e) => handleSectionImageChange(e, index)}
                      />
                      <div>
                        <Label>Section Title</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          placeholder="Section title"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Section Content</Label>
                        <Textarea
                          value={section.content}
                          onChange={(e) => updateSection(index, 'content', e.target.value)}
                          placeholder="Section content"
                          rows={5}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* SEO Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">SEO Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.metaTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="SEO title (defaults to blog title)"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="SEO description (defaults to excerpt)"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>SEO Keywords (comma separated)</Label>
                  <Input
                    value={formData.seoKeywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isPublished}
                  onCheckedChange={(v) => setFormData(prev => ({ ...prev, isPublished: v }))}
                />
                <Label>{formData.isPublished ? 'Published' : 'Draft'}</Label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Blog'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Main Section */}
            <div className="grid md:grid-cols-2 gap-4">
              <ImageUploadField
                label="Main Blog Image"
                preview={mainImagePreview}
                onChange={handleMainImageChange}
                className="md:col-span-2"
              />
              <div className="md:col-span-2">
                <Label>Blog Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    }));
                  }}
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="blog-slug"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Wedding Tips">Wedding Tips</SelectItem>
                    <SelectItem value="Catering">Catering</SelectItem>
                    <SelectItem value="Venue">Venue</SelectItem>
                    <SelectItem value="Décor">Décor</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Read Time</Label>
                <Input
                  value={formData.readTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="e.g., 5 min read"
                />
              </div>
              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="wedding, catering, events"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the blog"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Main blog content"
                  rows={10}
                />
              </div>
            </div>

            {/* Author Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Author Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Author Profile Pic"
                  preview={authorImagePreview}
                  onChange={handleAuthorImageChange}
                />
                <div>
                  <Label>Author Name</Label>
                  <Input
                    value={formData.author.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, name: e.target.value }
                    }))}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label>Author Designation</Label>
                  <Input
                    value={formData.author.designation}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, designation: e.target.value }
                    }))}
                    placeholder="e.g., Wedding Planner"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>About Author</Label>
                  <Textarea
                    value={formData.author.aboutAuthor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      author: { ...prev.author, aboutAuthor: e.target.value }
                    }))}
                    placeholder="Brief about the author"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Additional Sections</h3>
                <Button type="button" variant="outline" size="sm" onClick={addSection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
              {formData.sections.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Section {index + 1}</span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                      >
                        {expandedSection === index ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      {formData.sections.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSection(index)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {expandedSection === index && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Section Image"
                        preview={sectionImages[index]?.preview || ''}
                        onChange={(e) => handleSectionImageChange(e, index)}
                      />
                      <div>
                        <Label>Section Title</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          placeholder="Section title"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Section Content</Label>
                        <Textarea
                          value={section.content}
                          onChange={(e) => updateSection(index, 'content', e.target.value)}
                          placeholder="Section content"
                          rows={5}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* SEO Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">SEO Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.metaTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="SEO title"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="SEO description"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>SEO Keywords (comma separated)</Label>
                  <Input
                    value={formData.seoKeywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isPublished}
                  onCheckedChange={(v) => setFormData(prev => ({ ...prev, isPublished: v }))}
                />
                <Label>{formData.isPublished ? 'Published' : 'Draft'}</Label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEdit} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminBlogs;
