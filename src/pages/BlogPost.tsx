import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2, Clock } from 'lucide-react';
import SEO from '@/components/SEO';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  mainImage?: string;
  category?: string;
  publishedAt?: string;
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
}

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Helper to get full URL for file paths
  const getFullUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
    const baseUrl = API_URL.replace(/\/api\/?$/, '');
    if (path.startsWith('/api/uploads')) return `${baseUrl}${path}`;
    if (path.startsWith('/uploads')) return `${API_URL}${path}`;
    return path;
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/blogs/${slug}`);
      const data = await response.json();
      
      if (data.success) {
        const transformedBlog = {
          ...data.data,
          mainImage: data.data.mainImage ? getFullUrl(data.data.mainImage) : undefined,
          author: {
            ...data.data.author,
            profilePic: data.data.author?.profilePic ? getFullUrl(data.data.author.profilePic) : undefined
          },
          sections: data.data.sections?.map((s: { title?: string; content?: string; image?: string }) => ({
            ...s,
            image: s.image ? getFullUrl(s.image) : undefined
          })) || []
        };
        setBlog(transformedBlog);
        
        // Fetch related blogs (same category, excluding current)
        if (data.data.category) {
          fetchRelatedBlogs(data.data.category, data.data._id);
        }
      } else {
        setError('Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (category: string, currentId: string) => {
    try {
      const response = await fetch(`${API_URL}/blogs?category=${category}`);
      const data = await response.json();
      
      if (data.success) {
        const related = data.data
          .filter((b: Blog) => b._id !== currentId)
          .slice(0, 3)
          .map((b: Blog) => ({
            ...b,
            mainImage: b.mainImage ? getFullUrl(b.mainImage) : undefined
          }));
        setRelatedBlogs(related);
      }
    } catch (err) {
      console.error('Error fetching related blogs:', err);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fallback image
  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect fill="%23e0e0e0" width="800" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-4">{error || 'The blog post you are looking for does not exist.'}</p>
          <Button asChild>
            <Link to="/blogs">Back to Blogs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt}
        keywords={blog.seoKeywords.join(', ')}
        url={`http://anjanievents.in/blogs/${slug}`}
        type="article"
        publishedTime={blog.publishedAt}
        author={blog.author?.name}
        image={blog.mainImage}
      />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img 
            src={blog.mainImage || fallbackImage} 
            alt={blog.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary-foreground"
            >
              <Link to="/blogs" className="inline-flex items-center gap-2 text-sm mb-4 hover:text-accent transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              {blog.category && (
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4 ml-4">
                  {blog.category}
                </span>
              )}
              <h1 className="heading-display max-w-4xl">{blog.title}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Author & Date */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3">
                    {blog.author?.profilePic && (
                      <img 
                        src={blog.author.profilePic} 
                        alt={blog.author.name || 'Author'}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      {blog.author?.name && (
                        <p className="font-semibold text-foreground">{blog.author.name}</p>
                      )}
                      {blog.author?.designation && (
                        <p className="text-sm text-muted-foreground">{blog.author.designation}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(blog.publishedAt)}</span>
                  </div>
                  {blog.readTime && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{blog.readTime}</span>
                    </div>
                  )}
                </div>

                {/* Main Article Content */}
                <article 
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Additional Sections */}
                {blog.sections && blog.sections.length > 0 && (
                  <div className="mt-8 space-y-8">
                    {blog.sections.map((section, index) => (
                      <div key={index} className="prose prose-lg max-w-none">
                        {section.title && (
                          <h2 className="font-serif text-foreground">{section.title}</h2>
                        )}
                        {section.image && (
                          <img 
                            src={section.image} 
                            alt={section.title || `Section ${index + 1}`}
                            className="w-full h-auto rounded-lg my-4"
                          />
                        )}
                        {section.content && (
                          <div dangerouslySetInnerHTML={{ __html: section.content }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-foreground">Share this article:</span>
                    <div className="flex gap-3">
                      <Button size="icon" variant="outline" className="border-primary text-primary">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="border-primary text-primary">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="border-primary text-primary">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Author Card */}
                {blog.author?.name && (
                  <div className="card-premium p-6 mb-8">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">About the Author</h3>
                    <div className="flex items-center gap-4 mb-4">
                      {blog.author.profilePic ? (
                        <img 
                          src={blog.author.profilePic} 
                          alt={blog.author.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{blog.author.name}</p>
                        {blog.author.designation && (
                          <p className="text-sm text-muted-foreground">{blog.author.designation}</p>
                        )}
                      </div>
                    </div>
                    {blog.author.aboutAuthor && (
                      <p className="text-sm text-muted-foreground">
                        {blog.author.aboutAuthor}
                      </p>
                    )}
                  </div>
                )}

                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                  <div className="card-premium p-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-6">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedBlogs.map((relatedPost) => (
                        <Link 
                          key={relatedPost._id}
                          to={`/blogs/${relatedPost.slug}`}
                          className="flex gap-4 group"
                        >
                          <img 
                            src={relatedPost.mainImage || fallbackImage} 
                            alt={relatedPost.title}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <span className="text-xs text-primary">{relatedPost.category}</span>
                            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-4">Ready to Plan Your Event?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Let our expert team help you create an unforgettable celebration.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
              <Link to="/get-quote">Get Free Quote</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
