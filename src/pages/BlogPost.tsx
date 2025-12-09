import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  User,
  ArrowLeft,
  Clock,
  Share2,
  BookOpen,
  Tag,
  Eye,
  Heart,
  MessageCircle,
  Loader2,
  AlertCircle,
  Send
} from "lucide-react";
import { Blog, blogApiService, Comment, CommentFormData } from "@/services/blogApi";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  // State management
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    blogId: '',
    fullName: '',
    email: '',
    profilePic: '',
    comment: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);

  // Load blog post data
  const loadBlogPost = async () => {
    if (!slug) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await blogApiService.getBlogBySlug(slug);
      setBlog(response.data);

      // Load related blogs (same category or tags)
      await loadRelatedBlogs(response.data);

      // Load comments for this blog
      await loadComments(response.data._id);
      
    } catch (error: unknown) {
      console.error('Error loading blog post:', error);
      setError(error instanceof Error ? error.message : "Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  // Load related blogs
  const loadRelatedBlogs = async (currentBlog: Blog) => {
    try {
      // Get blogs with same category or tags
      const categoryParam = currentBlog.category ? { category: currentBlog.category } : {};
      const response = await blogApiService.getPublishedBlogs({
        limit: 3,
        ...categoryParam
      });

      // Filter out current blog and limit to 3
      const related = response.data.blogs
        .filter(b => b._id !== currentBlog._id)
        .slice(0, 3);

      setRelatedBlogs(related);
    } catch (error) {
      console.error('Error loading related blogs:', error);
      // Don't show error for related blogs, just continue without them
    }
  };

  // Load comments for the blog
  const loadComments = async (blogId: string) => {
    try {
      setCommentsLoading(true);
      const response = await blogApiService.getCommentsByBlog(blogId);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error loading comments:', error);
      // Don't show error for comments, just continue without them
    } finally {
      setCommentsLoading(false);
    }
  };

  // Handle comment form submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blog) return;

    if (!commentForm.fullName.trim() || !commentForm.email.trim() || !commentForm.comment.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmittingComment(true);
      const commentData: CommentFormData = {
        ...commentForm,
        blogId: blog._id
      };

      await blogApiService.createComment(commentData);

      // Reset form
      setCommentForm({
        blogId: '',
        fullName: '',
        email: '',
        profilePic: '',
        comment: ''
      });

      // Reload comments
      await loadComments(blog._id);

      toast({
        title: "Comment Submitted",
        description: "Your comment has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle comment form input changes
  const handleCommentInputChange = (field: keyof CommentFormData, value: string) => {
    setCommentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update page metadata for SEO
  useEffect(() => {
    if (blog) {
      // Update page title
      document.title = `${blog.seoTitle || blog.title} | Anjani Caters Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.seoDescription || blog.excerpt);
      }
      
      // Update Open Graph tags
      const updateOrCreateMetaTag = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateOrCreateMetaTag('og:title', blog.seoTitle || blog.title);
      updateOrCreateMetaTag('og:description', blog.seoDescription || blog.excerpt);
      updateOrCreateMetaTag('og:image', blog.coverImage);
      updateOrCreateMetaTag('og:url', window.location.href);
      updateOrCreateMetaTag('og:type', 'article');
      
      // Update Twitter Card tags
      const updateOrCreateTwitterTag = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      updateOrCreateTwitterTag('twitter:card', 'summary_large_image');
      updateOrCreateTwitterTag('twitter:title', blog.seoTitle || blog.title);
      updateOrCreateTwitterTag('twitter:description', blog.seoDescription || blog.excerpt);
      updateOrCreateTwitterTag('twitter:image', blog.coverImage);
      
      // Add structured data for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt,
        "image": blog.coverImage,
        "author": {
          "@type": "Person",
          "name": blog.author.name
        },
        "publisher": {
          "@type": "Organization",
          "name": "Anjani Caters",
          "logo": {
            "@type": "ImageObject",
            "url": "/logo.png"
          }
        },
        "datePublished": blog.publishedAt || blog.createdAt,
        "dateModified": blog.updatedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [blog]);

  // Load blog post on mount and when slug changes
  useEffect(() => {
    loadBlogPost();
  }, [slug]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle tag click
  const handleTagClick = (tag: string) => {
    window.location.href = `/blog?tag=${encodeURIComponent(tag)}`;
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Blog post link has been copied to your clipboard."
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-[120px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen pt-[120px] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The blog post you're looking for doesn't exist or has been removed."}
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] bg-muted overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-6 left-6">
            <Badge className="bg-accent text-accent-foreground px-3 py-1">
              <BookOpen className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </section>

      {/* Article Content */}
      <article className="container mx-auto px-6 lg:px-12 -mt-32 relative z-10">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 card-shadow">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.category && (
                <Badge variant="secondary">
                  {blog.category}
                </Badge>
              )}
              {blog.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent/10"
                  onClick={() => handleTagClick(tag)}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readingTime || 5} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{blog.viewCount} views</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Dynamic Sections */}
          {blog.sections && blog.sections.length > 0 && (
            <div className="space-y-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
              {blog.sections
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((section, index) => (
                <div key={index} className="border-l-4 border-accent pl-6 py-4">
                  <h3 className="text-xl font-semibold mb-3">{section.sectionTitle}</h3>
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: section.sectionContent }} />
                  </div>
                  {section.sectionImage && (
                    <div className="mt-4">
                      <img
                        src={section.sectionImage}
                        alt={section.sectionTitle}
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Article Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-12 p-6 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              {/* <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like ({blog.likeCount})
              </Button> */}
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {formatDate(blog.updatedAt)}
            </div>
          </div>


          {/* Comments Section */}
          <div className="mt-12 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-5 w-5" />
              <h3 className="text-2xl font-bold">Comments 
                {/* ({comments.length}) */}
                </h3>
            </div>

            {/* Comment Form */}
            <Card className="p-6 mb-8">
              <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={commentForm.fullName}
                      onChange={(e) => handleCommentInputChange('fullName', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={commentForm.email}
                      onChange={(e) => handleCommentInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="profilePic">Profile Picture URL (Optional)</Label>
                  <Input
                    id="profilePic"
                    type="url"
                    value={commentForm.profilePic}
                    onChange={(e) => handleCommentInputChange('profilePic', e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="comment">Comment *</Label>
                  <Textarea
                    id="comment"
                    value={commentForm.comment}
                    onChange={(e) => handleCommentInputChange('comment', e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submittingComment}
                  className="w-full md:w-auto"
                >
                  {submittingComment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Comment
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Comments List */}
            {/* <div style={{maxHeight:'350px', overflow:'auto'}}>
              {commentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading comments...</span>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Card key={comment._id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {comment.profilePic ? (
                          <img
                            src={comment.profilePic}
                            alt={comment.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm font-semibold">
                              {comment.fullName
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase())
                                .join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold">{comment.fullName}</h5>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-muted-foreground whitespace-pre-wrap">{comment.comment}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-semibold mb-2">No comments yet</h4>
                <p className="text-muted-foreground">Be the first to share your thoughts on this article!</p>
              </Card>
            )}
            </div> */}
          </div>

          {/* Call to Action */}
          <div className="text-center p-8 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/20">
            <h3 className="text-2xl font-bold mb-4">Ready to plan your event?</h3>
            <p className="text-muted-foreground mb-6">
              Let our expert team help you create an unforgettable culinary experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Request a Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </article>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-24 bg-muted mt-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
              <p className="text-muted-foreground">
                Explore more insights and tips from our experts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedBlogs.map((relatedBlog) => (
                <Card key={relatedBlog._id} className="p-6 hover:scale-[1.02] transition-smooth card-shadow">
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-2">
                      {relatedBlog.category || 'General'}
                    </Badge>
                    <h3 className="text-lg font-bold line-clamp-2">{relatedBlog.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {relatedBlog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{relatedBlog.author.name}</span>
                    <span>{formatDate(relatedBlog.publishedAt || relatedBlog.createdAt)}</span>
                  </div>
                  
                  <Link to={`/blog/${relatedBlog.slug}`}>
                    <Button variant="link" className="p-0 h-auto w-full justify-start">
                      Read More
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
