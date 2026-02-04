import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import SEO from '@/components/SEO';
import heroWedding from '@/assets/hero-wedding.jpg';
import heroCatering from '@/assets/hero-catering.jpg';
import eventDecoration from '@/assets/event-decoration.jpg';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog data - in a real app, this would come from an API
  const post = {
    title: '10 Essential Tips for Planning Your Dream Indian Wedding',
    excerpt: 'Planning an Indian wedding can be overwhelming. Here are our top tips to make your special day perfect while staying stress-free.',
    image: heroWedding,
    category: 'Wedding Tips',
    date: 'January 15, 2024',
    author: {
      name: 'Priya Sharma',
      role: 'Wedding Planner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    content: `
      <p>Planning an Indian wedding is a beautiful journey that brings families together in celebration. However, it can also be overwhelming with the numerous traditions, rituals, and logistics involved. Here are our top 10 tips to help you plan your dream wedding.</p>

      <h2>1. Start Early</h2>
      <p>Indian weddings are elaborate affairs that require months of planning. We recommend starting at least 8-12 months in advance for a stress-free experience. This gives you ample time to book vendors, finalize venues, and send invitations.</p>

      <h2>2. Set a Realistic Budget</h2>
      <p>Before you start planning, sit down with your families and determine a realistic budget. This will guide all your decisions from venue selection to catering choices. Remember to keep a buffer of 10-15% for unexpected expenses.</p>

      <h2>3. Choose the Right Venue</h2>
      <p>The venue sets the tone for your entire wedding. Consider factors like guest capacity, accessibility, accommodation options, and whether it aligns with your wedding theme. Visit multiple venues before making your decision.</p>

      <h2>4. Hire Experienced Vendors</h2>
      <p>From photographers to decorators, experienced vendors make a world of difference. Look for vendors who have experience with Indian weddings and understand the cultural nuances. Ask for references and check reviews.</p>

      <h2>5. Plan Your Menu Thoughtfully</h2>
      <p>Food is a crucial part of any Indian wedding. Consider your guests' preferences, dietary restrictions, and regional tastes. A mix of vegetarian and non-vegetarian options, along with regional specialties, usually works well.</p>

      <h2>6. Don't Forget the Small Details</h2>
      <p>While the big things matter, it's often the small details that make a wedding memorable. Pay attention to welcome gifts, table settings, lighting, and music transitions.</p>

      <h2>7. Create a Timeline</h2>
      <p>A detailed timeline for each event helps keep things on track. Share this with all vendors and family members so everyone knows what's happening when.</p>

      <h2>8. Take Care of Yourself</h2>
      <p>Amidst all the planning, don't forget to take care of yourself. Get enough sleep, eat well, and take breaks when needed. A relaxed bride and groom make for beautiful memories.</p>

      <h2>9. Embrace Technology</h2>
      <p>Use wedding planning apps and digital tools to stay organized. From guest list management to vendor communications, technology can simplify many aspects of wedding planning.</p>

      <h2>10. Trust Your Team</h2>
      <p>Once you've done your planning and hired the right people, trust them to execute. On the wedding day, focus on enjoying the celebration rather than worrying about logistics.</p>

      <p>At Anjani events, we've helped hundreds of couples plan their dream weddings. Our experienced team handles everything from venue selection to catering, allowing you to focus on what matters most – celebrating your love.</p>
    `
  };

  const relatedPosts = [
    {
      title: 'Top Catering Trends for 2024 Weddings',
      image: heroCatering,
      category: 'Catering',
      slug: 'catering-trends-2024'
    },
    {
      title: 'How to Choose the Perfect Wedding Venue',
      image: eventDecoration,
      category: 'Venue',
      slug: 'choose-wedding-venue'
    },
    {
      title: 'Traditional vs Modern Wedding Décor',
      image: eventDecoration,
      category: 'Décor',
      slug: 'traditional-modern-decor'
    }
  ];

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords="Indian wedding planning, wedding tips, event planning guide, dream wedding tips"
        url={`http://anjanievents.in/blogs/${slug}`}
        type="article"
        publishedTime="2024-01-15"
        author="Priya Sharma"
      />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
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
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4 ml-4">
                {post.category}
              </span>
              <h1 className="heading-display max-w-4xl">{post.title}</h1>
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
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author.image} 
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                </div>

                {/* Article Content */}
                <article 
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

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
                <div className="card-premium p-6 mb-8">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4">About the Author</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={post.author.image} 
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">{post.author.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    With over 10 years of experience in event planning, Priya has helped hundreds of couples create their perfect weddings.
                  </p>
                </div>

                {/* Related Posts */}
                <div className="card-premium p-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-6">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.slug}
                        to={`/blogs/${relatedPost.slug}`}
                        className="flex gap-4 group"
                      >
                        <img 
                          src={relatedPost.image} 
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
