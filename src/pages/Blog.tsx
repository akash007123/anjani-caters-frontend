import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen, Clock, Star, Eye, Mail, CheckCircle, Gift, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      slug: "wedding-menu-tips",
      title: "10 Tips for Planning the Perfect Wedding Menu",
      excerpt: "Creating a memorable wedding menu requires careful consideration of your guests' preferences, dietary restrictions, and the overall theme of your celebration.",
      author: "Chef Rahul Sharma",
      date: "March 15, 2024",
      category: "Wedding Planning",
      readTime: "5 min read",
    },
    {
      slug: "fusion-cuisine",
      title: "The Art of Fusion Cuisine: Blending Traditions",
      excerpt: "Explore how modern catering is embracing fusion cuisine, combining traditional Indian flavors with international cooking techniques.",
      author: "Priya Desai",
      date: "March 10, 2024",
      category: "Culinary Trends",
      readTime: "7 min read",
    },
    {
      slug: "corporate-catering",
      title: "Corporate Event Catering: Making Lasting Impressions",
      excerpt: "Your business events deserve catering that reflects your brand's professionalism and attention to detail. Here's how to choose the right service.",
      author: "Vikram Patel",
      date: "March 5, 2024",
      category: "Corporate Events",
      readTime: "6 min read",
    },
    {
      slug: "seasonal-ingredients",
      title: "Seasonal Ingredients: Why They Matter",
      excerpt: "Discover how using seasonal, locally-sourced ingredients can elevate your event menu while supporting sustainable practices.",
      author: "Chef Anita Kumar",
      date: "February 28, 2024",
      category: "Sustainability",
      readTime: "4 min read",
    },
    {
      slug: "dessert-experiences",
      title: "Creating Memorable Dessert Experiences",
      excerpt: "From elaborate dessert tables to individual plated masterpieces, learn how to end your event on a sweet note.",
      author: "Pastry Chef Meera Singh",
      date: "February 20, 2024",
      category: "Desserts",
      readTime: "5 min read",
    },
    {
      slug: "dietary-accommodations",
      title: "Dietary Accommodations Done Right",
      excerpt: "A comprehensive guide to handling various dietary requirements at your event, ensuring every guest enjoys the culinary experience.",
      author: "Nutritionist Sanjay Reddy",
      date: "February 15, 2024",
      category: "Nutrition",
      readTime: "8 min read",
    },
  ];

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900/20">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-lg rotate-12 opacity-60 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg -rotate-12 opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-40 left-1/3 w-16 h-12 bg-red-100 dark:bg-red-900/30 rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated title */}
            <div className="relative inline-block mb-6">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent animate-pulse">
                Culinary Blog
              </h1>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-ping opacity-75"></div>
            </div>

            {/* Subtitle with icon */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
                Stories, Tips & Culinary Inspiration
              </p>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover expert insights, seasonal recipes, event planning wisdom, and the latest trends 
              from our team of professional chefs and event specialists.
            </p>

            {/* Blog categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { name: "Recipe Tips", icon: "👨‍🍳", color: "bg-orange-100 text-orange-700 border-orange-200" },
                { name: "Event Planning", icon: "🎉", color: "bg-red-100 text-red-700 border-red-200" },
                { name: "Seasonal Menu", icon: "🍃", color: "bg-green-100 text-green-700 border-green-200" },
                { name: "Nutrition", icon: "🥗", color: "bg-blue-100 text-blue-700 border-blue-200" },
                { name: "Sustainability", icon: "🌱", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                { name: "Trends", icon: "✨", color: "bg-purple-100 text-purple-700 border-purple-200" }
              ].map((category, index) => (
                <span 
                  key={index}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${category.color} hover:scale-105 transition-transform duration-200 cursor-pointer`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </span>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { number: "50+", label: "Articles" },
                { number: "5", label: "Expert Chefs" },
                { number: "1000+", label: "Happy Readers" },
                { number: "Weekly", label: "Updates" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-background">
            <path d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Enhanced Featured Post */}
      <section className="py-32 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-accent/15 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3 mb-6">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Must Read</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Featured Article
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our most popular and insightful content crafted by industry experts
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="group animate-slide-in-up">
              <Card className="relative overflow-hidden bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                <div className="absolute -top-3 -right-3 w-8 h-8 border-r-2 border-t-2 border-accent/30 rounded-tr-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-2 border-b-2 border-accent/30 rounded-bl-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 p-12">
                  {/* Category and Featured Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                      <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <Eye className="h-3 w-3" />
                        Popular
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {blogPosts[0].title}
                  </h2>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <User className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{blogPosts[0].author}</div>
                        <div className="text-xs">Author</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Calendar className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{blogPosts[0].date}</div>
                        <div className="text-xs">Published</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Clock className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{blogPosts[0].readTime}</div>
                        <div className="text-xs">Reading Time</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <BookOpen className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{blogPosts[0].category}</div>
                        <div className="text-xs">Category</div>
                      </div>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="relative mb-10">
                    <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-accent to-accent/30 rounded-full opacity-30"></div>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed pl-8 group-hover:text-foreground/90 transition-colors duration-300">
                      {blogPosts[0].excerpt}
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Link to={`/blog/${blogPosts[0].slug}`} className="group/btn">
                      <Button 
                        size="lg" 
                        className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <BookOpen className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                          Read Full Article
                          <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      </Button>
                    </Link>
                    
                    {/* Additional Actions */}
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-3 border border-border hover:border-accent/50 text-foreground hover:text-accent rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        <Star className="h-4 w-4" />
                        Save for Later
                      </button>
                      <button className="flex items-center gap-2 px-4 py-3 border border-border hover:border-accent/50 text-foreground hover:text-accent rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        <ArrowRight className="h-4 w-4 rotate-45" />
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Reading Progress Indicator */}
                  <div className="mt-8 pt-6 border-t border-border/30">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Estimated completion: {blogPosts[0].readTime}</span>
                      <span>Last updated: {blogPosts[0].date}</span>
                    </div>
                    <div className="mt-2 h-1 bg-border/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent/70 w-3/4 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>
              </Card>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="text-center mt-16 animate-fade-in delay-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30">
                <div className="text-3xl font-bold text-accent mb-2">2.5k+</div>
                <div className="text-sm text-muted-foreground">Views</div>
              </div>
              <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30">
                <div className="text-3xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Found it Helpful</div>
              </div>
              <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30">
                <div className="text-3xl font-bold text-accent mb-2">4.9★</div>
                <div className="text-sm text-muted-foreground">Reader Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Recent Posts Grid */}
      <section className="py-32 bg-gradient-to-br from-muted via-muted/50 to-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-8 py-4 mb-8 animate-fade-in">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Latest Insights</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-slide-in-up">
              Recent Articles
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-in-up delay-200 mb-12">
              Stay updated with our latest culinary insights, event planning tips, and industry trends
            </p>

            {/* Trust Indicators */}
            <div className="flex justify-center items-center gap-8 flex-wrap mb-8 animate-fade-in delay-400">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-accent fill-current" />
                <span>Expert Content</span>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                <span>Weekly Updates</span>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-accent" />
                <span>5+ Expert Authors</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <div 
                key={index} 
                className="group animate-slide-in-up" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="relative h-full p-8 hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/30 overflow-hidden flex flex-col">
                  
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Category Badge */}
                    <div className="mb-6">
                      <span className="inline-flex items-center gap-1 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        <BookOpen className="h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-4 leading-tight text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow group-hover:text-foreground/90 transition-colors duration-300">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="border-t border-border/50 pt-6 mb-6 space-y-4">
                      {/* Author */}
                      <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <User className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">{post.author}</div>
                          <div className="text-xs text-muted-foreground">Author</div>
                        </div>
                      </div>
                      
                      {/* Date and Read Time */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Call to Action */}
                    <Link to={`/blog/${post.slug}`} className="mt-auto">
                      <Button 
                        variant="ghost" 
                        className="w-full p-0 h-auto justify-start gap-2 text-accent hover:text-accent-foreground hover:bg-accent group/btn font-medium"
                      >
                        <BookOpen className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        Read Full Article
                        <ArrowRight className="h-4 w-4 ml-auto group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    New
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Enhanced Bottom Section */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-xl rounded-3xl p-12 max-w-5xl mx-auto border border-border/50 shadow-2xl relative overflow-hidden">
              
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-accent/8 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/8 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                    Stay Updated with Our Blog
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Get the latest culinary insights, event planning tips, and industry trends delivered to your inbox
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300">
                    <BookOpen className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="font-semibold mb-1">Expert Insights</div>
                    <div className="text-sm text-muted-foreground">Professional advice</div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300">
                    <Star className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="font-semibold mb-1">Weekly Updates</div>
                    <div className="text-sm text-muted-foreground">Fresh content</div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300">
                    <Clock className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="font-semibold mb-1">Quick Reads</div>
                    <div className="text-sm text-muted-foreground">Bite-sized tips</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25">
                    View All Articles
                  </button>
                  <button className="border-2 border-border hover:border-accent/50 text-foreground hover:text-accent bg-background/50 hover:bg-background/80 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    Subscribe to Updates
                  </button>
                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-accent/30 rounded-tl-lg opacity-60"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-accent/30 rounded-tr-lg opacity-60"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-accent/30 rounded-bl-lg opacity-60"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-accent/30 rounded-br-lg opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-32 bg-gradient-to-br from-background via-accent/5 to-primary/5 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-accent/15 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-primary/10 rounded-full blur-lg animate-pulse delay-700"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-16 left-16 w-6 h-6 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-24 right-24 w-4 h-4 bg-amber-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 left-24 w-5 h-5 bg-red-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '0.5s'}}></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-8 py-4 mb-8 animate-fade-in">
              <Mail className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Stay Connected</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-slide-in-up">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              Get the latest culinary tips, event planning advice, and exclusive offers delivered straight to your inbox
            </p>
          </div>

          {/* Enhanced Newsletter Card */}
          <div className="max-w-4xl mx-auto">
            <div className="group animate-slide-in-up delay-400">
              <Card className="relative overflow-hidden bg-background/70 backdrop-blur-xl border-border/50 hover:border-accent/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                <div className="absolute -top-3 -right-3 w-8 h-8 border-r-2 border-t-2 border-accent/30 rounded-tr-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-2 border-b-2 border-accent/30 rounded-bl-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 p-16">
                  {/* Icon and Benefits */}
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-10 w-10 text-accent-foreground" />
                    </div>
                    
                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="flex flex-col items-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300 group/benefit">
                        <CheckCircle className="h-8 w-8 text-accent mb-3 group-hover/benefit:scale-110 transition-transform duration-300" />
                        <div className="font-semibold mb-1">Expert Tips</div>
                        <div className="text-sm text-muted-foreground text-center">Professional culinary insights from our chefs</div>
                      </div>
                      <div className="flex flex-col items-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300 group/benefit">
                        <Gift className="h-8 w-8 text-accent mb-3 group-hover/benefit:scale-110 transition-transform duration-300" />
                        <div className="font-semibold mb-1">Exclusive Offers</div>
                        <div className="text-sm text-muted-foreground text-center">Special discounts and early access to events</div>
                      </div>
                      <div className="flex flex-col items-center p-6 rounded-xl bg-background/50 border border-border/30 hover:bg-background/70 transition-colors duration-300 group/benefit">
                        <Zap className="h-8 w-8 text-accent mb-3 group-hover/benefit:scale-110 transition-transform duration-300" />
                        <div className="font-semibold mb-1">Weekly Updates</div>
                        <div className="text-sm text-muted-foreground text-center">Fresh content and trending topics</div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Form */}
                  <div className="max-w-2xl mx-auto">
                    <div className="relative mb-8">
                      <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-accent to-accent/30 rounded-full opacity-30"></div>
                      <div className="relative bg-gradient-to-r from-background via-accent/5 to-background rounded-2xl p-8 border border-border/30">
                        <form className="space-y-6">
                          <div className="relative">
                            <input
                              type="email"
                              placeholder="Enter your email address"
                              className="w-full px-6 py-4 text-lg rounded-xl border-2 border-border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 placeholder:text-muted-foreground group-hover:border-accent/50"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                          </div>
                          
                          <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/25 relative overflow-hidden group/btn"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              <Mail className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                              Subscribe Now
                              <CheckCircle className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span>No spam, unsubscribe anytime</span>
                        </div>
                        <div className="w-px h-4 bg-border"></div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-accent" />
                          <span>Join 5,000+ subscribers</span>
                        </div>
                        <div className="w-px h-4 bg-border"></div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-accent" />
                          <span>Weekly digest</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>
              </Card>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="text-center mt-16 animate-fade-in delay-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-background/70 transition-colors duration-300">
                <div className="text-3xl font-bold text-accent mb-2">5,000+</div>
                <div className="text-sm text-muted-foreground">Happy Subscribers</div>
              </div>
              <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-background/70 transition-colors duration-300">
                <div className="text-3xl font-bold text-accent mb-2">Weekly</div>
                <div className="text-sm text-muted-foreground">Fresh Content</div>
              </div>
              <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30 hover:bg-background/70 transition-colors duration-300">
                <div className="text-3xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-accent/30 rounded-tl-lg opacity-60"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-accent/30 rounded-tr-lg opacity-60"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-accent/30 rounded-bl-lg opacity-60"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-accent/30 rounded-br-lg opacity-60"></div>
      </section>
    </div>
  );
};

export default Blog;
