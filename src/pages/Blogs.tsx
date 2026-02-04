import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import SEO from '@/components/SEO';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroCatering from '@/assets/hero-catering.jpg';
import eventDecoration from '@/assets/event-decoration.jpg';

const Blogs = () => {
  const featuredPost = {
    title: '10 Essential Tips for Planning Your Dream Indian Wedding',
    excerpt: 'Planning an Indian wedding can be overwhelming. Here are our top tips to make your special day perfect while staying stress-free.',
    image: heroWedding,
    category: 'Wedding Tips',
    date: 'January 15, 2024',
    author: 'Priya Sharma',
    slug: 'dream-indian-wedding-tips'
  };

  const posts = [
    {
      title: 'Top Catering Trends for 2024 Weddings',
      excerpt: 'From live cooking stations to fusion cuisines, discover what\'s trending in wedding catering this year.',
      image: heroCatering,
      category: 'Catering',
      date: 'January 10, 2024',
      author: 'Chef Amit',
      slug: 'catering-trends-2024'
    },
    {
      title: 'How to Choose the Perfect Wedding Venue',
      excerpt: 'A comprehensive guide to selecting a venue that matches your vision and budget.',
      image: eventDecoration,
      category: 'Venue',
      date: 'January 5, 2024',
      author: 'Neha Gupta',
      slug: 'choose-wedding-venue'
    },
    {
      title: 'Corporate Event Planning: A Complete Guide',
      excerpt: 'Everything you need to know about organizing successful corporate events.',
      image: heroWedding,
      category: 'Corporate',
      date: 'December 28, 2023',
      author: 'Rajesh Kumar',
      slug: 'corporate-event-guide'
    },
    {
      title: 'Traditional vs Modern Wedding Décor',
      excerpt: 'Finding the perfect balance between tradition and contemporary style.',
      image: eventDecoration,
      category: 'Décor',
      date: 'December 20, 2023',
      author: 'Priya Sharma',
      slug: 'traditional-modern-decor'
    },
    {
      title: 'Menu Planning for Large Events',
      excerpt: 'Expert tips on creating a menu that satisfies diverse tastes and dietary needs.',
      image: heroCatering,
      category: 'Catering',
      date: 'December 15, 2023',
      author: 'Chef Amit',
      slug: 'menu-planning-large-events'
    },
    {
      title: 'Destination Wedding Planning Checklist',
      excerpt: 'Your complete checklist for planning a destination wedding in India.',
      image: heroWedding,
      category: 'Wedding Tips',
      date: 'December 10, 2023',
      author: 'Neha Gupta',
      slug: 'destination-wedding-checklist'
    }
  ];

  const categories = ['All', 'Wedding Tips', 'Catering', 'Venue', 'Décor', 'Corporate'];

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
                  variant={category === 'All' ? 'default' : 'outline'}
                  size="sm"
                  className={category === 'All' ? 'bg-primary' : 'border-primary text-primary'}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
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
                    src={featuredPost.image} 
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
                  <span className="text-primary font-medium text-sm">{featuredPost.category}</span>
                  <h2 className="heading-section text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blogs/${post.slug}`} className="group block">
                  <div className="card-premium overflow-hidden hover-lift">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <Button variant="outline" className="border-primary text-primary">Previous</Button>
            <Button className="bg-primary">1</Button>
            <Button variant="outline" className="border-primary text-primary">2</Button>
            <Button variant="outline" className="border-primary text-primary">3</Button>
            <Button variant="outline" className="border-primary text-primary">Next</Button>
          </div>
        </div>
      </section>

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
