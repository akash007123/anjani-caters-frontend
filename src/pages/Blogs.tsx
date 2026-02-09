import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, User, ArrowRight, Search, Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: string;
  category?: string;
  publishedAt?: string;
  author: {
    name?: string;
  };
  readTime?: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/blogs`);
      const data = await response.json();
      
      if (data.success) {
        const transformedBlogs = data.data.map((blog: Blog) => ({
          ...blog,
          mainImage: blog.mainImage ? getFullUrl(blog.mainImage) : undefined
        }));
        setBlogs(transformedBlogs);
      } else {
        console.error('Failed to fetch blogs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs/categories`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured post (most recent published blog)
  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const regularPosts = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fallback image
  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect fill="%23e0e0e0" width="800" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

  return (
    <>
      <SEO 
        title="Blog"
        description="Expert tips, trends, and inspiration for weddings, catering, and event planning. Stay updated with Anjani Events' latest articles and guides."
        keywords="wedding tips blog, event planning blog, catering trends, Indian wedding ideas, corporate event guides"
        url="http://anjanievents.in/blogs"
      />
      
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground"
          >
            <h1 className="heading-display mb-4">Our Blog</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Tips, trends, and inspiration for your perfect event
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-muted">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-primary' : 'border-primary text-primary'}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {loading ? (
        <section className="section-padding">
          <div className="container-custom text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading blogs...</p>
          </div>
        </section>
      ) : featuredPost ? (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/blogs/${featuredPost.slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-8 items-center card-premium overflow-hidden">
                  <div className="relative h-64 lg:h-96 overflow-hidden">
                    <img 
                      src={featuredPost.mainImage || fallbackImage} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    {featuredPost.category && (
                      <span className="text-primary font-medium text-sm">{featuredPost.category}</span>
                    )}
                    <h2 className="heading-section text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {featuredPost.author?.name && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredPost.author.name}
                        </span>
                      )}
                      {featuredPost.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredPost.publishedAt)}
                        </span>
                      )}
                      {featuredPost.readTime && (
                        <span className="flex items-center gap-1">
                          <ArrowRight className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="section-padding">
          <div className="container-custom text-center">
            <p className="text-muted-foreground">No blogs found.</p>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      {regularPosts.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blogs/${post.slug}`} className="group block">
                    <div className="card-premium overflow-hidden hover-lift">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.mainImage || fallbackImage} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          {post.author?.name && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author.name}
                            </span>
                          )}
                          {post.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {filteredBlogs.length > 9 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button variant="outline" className="border-primary text-primary">Previous</Button>
                <Button className="bg-primary">1</Button>
                <Button variant="outline" className="border-primary text-primary">2</Button>
                <Button variant="outline" className="border-primary text-primary">Next</Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Get the latest tips, trends, and inspiration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-gold-light">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
