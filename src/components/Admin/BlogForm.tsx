import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload, Save, Eye, User, Calendar, Clock, BookOpen, ArrowRight, Star } from 'lucide-react';
import { Blog, BlogFormData, BlogSection, blogApiService } from '@/services/blogApi';
import SEOFields from './SEOFields';
import DynamicSections from './DynamicSections';
import { useToast } from '@/hooks/use-toast';

interface BlogFormProps {
  blog?: Blog | null;
  onSubmit: (data: BlogFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({
  blog,
  onSubmit,
  onCancel,
  isLoading = false,
  isEdit = false
}) => {
  const { toast } = useToast();
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');
  const [sections, setSections] = useState<BlogSection[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [category, setCategory] = useState('');
  
  // UI state
  const [newTag, setNewTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'full' | 'card'>('full');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Initialize form with blog data when editing
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setExcerpt(blog.excerpt);
      setCoverImage(blog.coverImage);
      setTags(blog.tags);
      setFeatured(blog.featured);
      setStatus(blog.status);
      setSections(blog.sections.sort((a, b) => (a.order || 0) - (b.order || 0)));
      setSeoTitle(blog.seoTitle || '');
      setSeoDescription(blog.seoDescription || '');
      setSeoKeywords(blog.seoKeywords || []);
      setAuthorName(blog.author.name);
      setAuthorEmail(blog.author.email);
      setCategory(blog.category || '');
      setImagePreview(blog.coverImage);
    }
  }, [blog]);

  // Auto-generate SEO fields from content
  useEffect(() => {
    if (!isEdit) {
      if (title && !seoTitle) {
        setSeoTitle(title);
      }
      if (excerpt && !seoDescription) {
        setSeoDescription(excerpt);
      }
    }
  }, [title, excerpt, isEdit]);

  // Image upload handler
  const handleImageUpload = async (file: File) => {
    try {
      const response = await blogApiService.uploadImage(file);
      const imageUrl = response.data.url;
      setCoverImage(imageUrl);
      setImagePreview(imageUrl);
      toast({
        title: "Image uploaded",
        description: "Cover image uploaded successfully",
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

  // Tag management
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive"
      });
      return false;
    }
    
    if (!content.trim()) {
      toast({
        title: "Validation Error",
        description: "Content is required",
        variant: "destructive"
      });
      return false;
    }
    
    if (!excerpt.trim()) {
      toast({
        title: "Validation Error",
        description: "Excerpt is required",
        variant: "destructive"
      });
      return false;
    }
    
    if (!coverImage) {
      toast({
        title: "Validation Error",
        description: "Cover image is required",
        variant: "destructive"
      });
      return false;
    }
    
    if (!authorName.trim()) {
      toast({
        title: "Validation Error",
        description: "Author name is required",
        variant: "destructive"
      });
      return false;
    }
    
    if (!authorEmail.trim()) {
      toast({
        title: "Validation Error",
        description: "Author email is required",
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
      const formData: BlogFormData = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim(),
        coverImage,
        tags,
        featured,
        status,
        sections: sections.map((section, index) => ({
          ...section,
          order: index
        })),
        seoTitle: seoTitle.trim() || title.trim(),
        seoDescription: seoDescription.trim() || excerpt.trim(),
        seoKeywords,
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
        category: category.trim()
      };

      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Category suggestions
  const categorySuggestions = [
    'Wedding Planning',
    'Corporate Events',
    'Birthday Parties',
    'Food & Recipes',
    'Event Tips',
    'Seasonal Menus',
    'Dietary Accommodations',
    'Sustainable Catering',
    'Chef Insights',
    'Industry Trends'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Main Blog Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
                <Label htmlFor="featured" className="text-sm">Featured</Label>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title"
              required
            />
          </div>

          {/* Author Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="authorName">Author Name *</Label>
              <Input
                id="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Author name"
                required
              />
            </div>
            <div>
              <Label htmlFor="authorEmail">Author Email *</Label>
              <Input
                id="authorEmail"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="Author email"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select or enter category"
                list="category-suggestions"
              />
              <datalist id="category-suggestions">
                {categorySuggestions.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <Label>Cover Image *</Label>
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
                    setCoverImage('');
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
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setCoverImage('');
                      setImagePreview(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Add a tag and press Enter"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="pr-1 pl-2 py-1 text-xs">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto p-0 w-4 hover:bg-transparent"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter a brief summary of your blog post"
              className="min-h-[80px] resize-none"
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {excerpt.length}/500 characters
            </p>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              className="min-h-[200px] resize-none"
              required
            />
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: 'Draft' | 'Published') => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* SEO Fields */}
      <SEOFields
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        onSeoTitleChange={setSeoTitle}
        onSeoDescriptionChange={setSeoDescription}
        onSeoKeywordsChange={setSeoKeywords}
      />

      {/* Dynamic Sections */}
      <DynamicSections
        sections={sections}
        onSectionsChange={setSections}
        isEditMode={true}
      />

      {/* Preview (if enabled) */}
      {showPreview && (
        <Card className="bg-muted/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Preview</CardTitle>
            <div className="flex items-center gap-2 bg-background p-1 rounded-lg border">
              <Button
                type="button"
                variant={previewMode === 'full' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('full')}
                className="text-xs"
              >
                Full Article
              </Button>
              <Button
                type="button"
                variant={previewMode === 'card' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('card')}
                className="text-xs"
              >
                Card View
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {previewMode === 'full' ? (
              <div className="bg-background rounded-xl border p-6 shadow-sm space-y-6">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Cover"
                    className="w-full h-[400px] object-cover rounded-lg shadow-md"
                  />
                )}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {authorName || 'Author Name'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date().toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {Math.ceil((content.split(' ').length + sections.reduce((acc, curr) => acc + curr.sectionContent.split(' ').length, 0)) / 200)} min read
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold leading-tight">{title || 'Untitled Blog Post'}</h1>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-4 italic">
                    {excerpt || 'No excerpt provided'}
                  </p>
                  
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                  
                  {sections.length > 0 && (
                    <div className="space-y-8 mt-8">
                      {sections.map((section, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="text-2xl font-bold">{section.sectionTitle}</h3>
                          {section.sectionImage && (
                            <img
                              src={section.sectionImage}
                              alt={section.sectionTitle}
                              className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-sm"
                            />
                          )}
                          <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {section.sectionContent}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-8">
                <div className="w-full max-w-[380px]">
                  <Card className="relative h-full p-6 hover:shadow-xl transition-all duration-300 bg-background border-border/50 overflow-hidden flex flex-col group">
                    {/* Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Image */}
                      {imagePreview && (
                        <div className="mb-6 rounded-lg overflow-hidden h-48 w-full">
                          <img
                            src={imagePreview}
                            alt={title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="mb-4 flex justify-between items-start">
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          <BookOpen className="h-3 w-3" />
                          {category || 'Category'}
                        </span>
                        {featured && (
                          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {title || 'Blog Title'}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow line-clamp-3">
                        {excerpt || 'Blog excerpt will appear here...'}
                      </p>
                      
                      {/* Meta Information */}
                      <div className="border-t border-border/50 pt-4 mb-4 space-y-3">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-primary" />
                          </div>
                          <div className="text-xs font-medium">{authorName || 'Author'}</div>
                        </div>
                        
                        {/* Date and Read Time */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{Math.ceil((content.split(' ').length + sections.reduce((acc, curr) => acc + curr.sectionContent.split(' ').length, 0)) / 200)} min</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Button */}
                      <Button
                        variant="ghost"
                        className="w-full p-0 h-auto justify-start gap-2 text-primary hover:text-primary/80 group/btn font-medium text-sm"
                      >
                        Read Full Article
                        <ArrowRight className="h-4 w-4 ml-auto group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}
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
              {isEdit ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Update Blog' : 'Create Blog'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;