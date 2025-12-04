import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  // Blog post data - in a real app, this would come from a CMS or API
  const blogPosts: Record<string, any> = {
    "wedding-menu-tips": {
      title: "10 Tips for Planning the Perfect Wedding Menu",
      author: "Chef Rahul Sharma",
      date: "March 15, 2024",
      category: "Wedding Planning",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=600&fit=crop",
      content: `
        <h2>Creating a Memorable Culinary Experience</h2>
        <p>Planning a wedding menu is one of the most important aspects of your special day. The food you serve will create lasting memories for you and your guests. Here are our top 10 tips to ensure your wedding menu is perfect.</p>
        
        <h3>1. Know Your Guest Count and Demographics</h3>
        <p>Understanding your audience is crucial. Consider the age range, cultural backgrounds, and dietary preferences of your guests. This will help you create a menu that appeals to everyone.</p>
        
        <h3>2. Season Matters</h3>
        <p>Choose ingredients that are in season for the freshest flavors and best prices. Spring weddings might feature asparagus and strawberries, while fall celebrations can showcase squash and apples.</p>
        
        <h3>3. Balance Tradition with Innovation</h3>
        <p>While it's important to include classic dishes that guests expect, don't be afraid to add unique touches that reflect your personality as a couple.</p>
        
        <h3>4. Consider Dietary Restrictions</h3>
        <p>Always offer vegetarian, vegan, and gluten-free options. Ask guests about dietary restrictions in advance to ensure everyone can enjoy the meal.</p>
        
        <h3>5. Schedule Tastings</h3>
        <p>Never book a caterer without tasting their food first. This is your opportunity to refine dishes and ensure quality meets your expectations.</p>
        
        <h3>6. Think About Timing</h3>
        <p>The time of your wedding affects menu choices. Afternoon weddings might call for lighter fare, while evening celebrations can feature more substantial dishes.</p>
        
        <h3>7. Don't Forget Presentation</h3>
        <p>Beautiful plating and creative displays elevate the dining experience. Work with your caterer on visual presentation that matches your wedding aesthetic.</p>
        
        <h3>8. Plan for Different Service Styles</h3>
        <p>Decide between plated service, buffet, family-style, or food stations. Each has its advantages and creates a different atmosphere.</p>
        
        <h3>9. Budget Wisely</h3>
        <p>Allocate your budget strategically. Sometimes it's better to have fewer courses of higher quality than many mediocre dishes.</p>
        
        <h3>10. Trust Your Caterer</h3>
        <p>Once you've chosen a professional caterer, trust their expertise. They've done this many times and can guide you toward successful choices.</p>
        
        <h3>Conclusion</h3>
        <p>Your wedding menu should be a reflection of your love story and taste. By following these tips and working closely with experienced professionals, you'll create a dining experience that your guests will remember for years to come.</p>
      `,
    },
    "fusion-cuisine": {
      title: "The Art of Fusion Cuisine: Blending Traditions",
      author: "Priya Desai",
      date: "March 10, 2024",
      category: "Culinary Trends",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop",
      content: `
        <h2>Where Tradition Meets Innovation</h2>
        <p>Fusion cuisine represents the beautiful marriage of culinary traditions from different cultures. In modern catering, this approach allows us to create unique and memorable dining experiences.</p>
        
        <h3>Understanding Fusion Cuisine</h3>
        <p>True fusion cuisine isn't just randomly mixing ingredients from different cuisines. It's about understanding the fundamental principles of each culinary tradition and finding complementary elements.</p>
        
        <h3>Popular Fusion Combinations</h3>
        <p>Indian-Mexican fusion has become increasingly popular, combining the rich spices of Indian cuisine with Mexican cooking techniques. Think tandoori tacos or masala quesadillas.</p>
        
        <h3>The Science Behind Successful Fusion</h3>
        <p>Successful fusion dishes respect both culinary traditions while creating something new. The key is understanding flavor profiles and how different ingredients interact.</p>
        
        <h3>Techniques That Work</h3>
        <p>Some techniques translate beautifully across cuisines. Indian marinades work wonderfully with Italian pasta, while French cooking methods can elevate traditional Indian ingredients.</p>
        
        <h3>Respecting Cultural Heritage</h3>
        <p>While innovation is exciting, it's important to approach fusion cuisine with respect for the original traditions. Understanding the cultural context makes fusion more meaningful.</p>
        
        <h3>Creating Your Own Fusion Menu</h3>
        <p>Start with familiar base dishes and add elements from another cuisine gradually. Test combinations and get feedback before finalizing your fusion menu.</p>
      `,
    },
    "corporate-catering": {
      title: "Corporate Event Catering: Making Lasting Impressions",
      author: "Vikram Patel",
      date: "March 5, 2024",
      category: "Corporate Events",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
      content: `
        <h2>Elevating Business Events Through Food</h2>
        <p>In the corporate world, the quality of catering at your events speaks volumes about your brand. Here's how to make the right impression.</p>
        
        <h3>First Impressions Matter</h3>
        <p>The food at your corporate event is often one of the first things attendees notice. Quality catering sets the tone for the entire event.</p>
        
        <h3>Understanding Your Audience</h3>
        <p>Corporate events attract diverse attendees. Your menu should be sophisticated yet accessible, with options for various dietary needs.</p>
        
        <h3>Timing is Everything</h3>
        <p>Business events run on tight schedules. Your caterer should understand the importance of punctual service and efficient setup.</p>
        
        <h3>Branding Opportunities</h3>
        <p>From custom cocktails to branded desserts, catering offers unique opportunities to reinforce your company's identity.</p>
        
        <h3>Interactive Stations</h3>
        <p>Live cooking stations and interactive food experiences create memorable moments and encourage networking among guests.</p>
      `,
    },
  };

  const post = blogPosts[slug || ""] || blogPosts["wedding-menu-tips"];

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] bg-muted">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
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
            <span className="text-sm font-medium text-accent">{post.category}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-4">Ready to plan your event?</h3>
            <p className="text-muted-foreground mb-6">
              Let our expert team help you create an unforgettable culinary experience
            </p>
            <Link to="/quote">
              <Button variant="cta" size="lg">
                Request a Quote
              </Button>
            </Link>
          </div>
        </Card>
      </article>

      {/* Related Posts */}
      <section className="py-24 bg-muted mt-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, relatedPost]) => (
                <Card key={key} className="p-6 hover:scale-[1.02] transition-smooth card-shadow">
                  <span className="text-xs font-medium text-accent">{relatedPost.category}</span>
                  <h3 className="text-lg font-bold mt-3 mb-2">{relatedPost.title}</h3>
                  <Link to={`/blog/${key}`}>
                    <Button variant="link" className="p-0 h-auto">
                      Read More
                    </Button>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
