import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Star, 
  Eye, 
  Mail, 
  CheckCircle, 
  Gift, 
  Zap,
  Search,
  Filter,
  Loader2,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { Blog, blogApiService } from "@/services/blogApi";
import { useToast } from "@/hooks/use-toast";

const BlogPage = () => {
  const { toast } = useToast();
  
  // State management
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  // Load blogs data
  const loadBlogs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 6,
        search: searchTerm || undefined,
        tag: selectedTag || undefined,
        featured: !selectedTag ? false : undefined
      };
      
      const response = await blogApiService.getPublishedBlogs(params);
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

  // Load featured blogs
  const loadFeaturedBlogs = async () => {
    try {
      const response = await blogApiService.getFeaturedBlogs(3);
      setFeaturedBlogs(response.data);
    } catch (error) {
      console.error('Error loading featured blogs:', error);
    }
  };

  // Load all tags
  const loadTags = async () => {
    try {
      const response = await blogApiService.getAllTags();
      setAllTags(response.data);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  // Load data on mount and when filters change
  useEffect(() => {
    loadBlogs();
  }, [currentPage, searchTerm, selectedTag]);

  useEffect(() => {
    loadFeaturedBlogs();
    loadTags();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Handle tag filter
  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === 'all' ? '' : tag);
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setCurrentPage(1);
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen pt-[120px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

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

            {/* Search and Filter Section */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white/20 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700"
                  />
                </div>
                
                <Select value={selectedTag} onValueChange={handleTagFilter}>
                  <SelectTrigger className="w-full md:w-[200px] bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(searchTerm || selectedTag) && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full md:w-auto"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {/* Active filters */}
              {(searchTerm || selectedTag) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {searchTerm && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: "{searchTerm}"
                      <button onClick={() => setSearchTerm('')}>
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedTag && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Tag: {selectedTag}
                      <button onClick={() => setSelectedTag('')}>
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>

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
                  onClick={() => handleTagFilter(category.name)}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </span>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { number: totalBlogs.toString(), label: "Articles" },
                { number: allTags.length.toString(), label: "Topics" },
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
      {featuredBlogs.length > 0 && !searchTerm && !selectedTag && (
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
                      {featuredBlogs[0].title}
                    </h2>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground mb-8">
                      <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <User className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{featuredBlogs[0].author.name}</div>
                          <div className="text-xs">Author</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <Calendar className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{formatDate(featuredBlogs[0].publishedAt || featuredBlogs[0].createdAt)}</div>
                          <div className="text-xs">Published</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 group-hover:text-accent transition-colors duration-300">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                          <Clock className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{featuredBlogs[0].readingTime || 5} min read</div>
                          <div className="text-xs">Reading Time</div>
                        </div>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div className="relative mb-10">
                      <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-accent to-accent/30 rounded-full opacity-30"></div>
                      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed pl-8 group-hover:text-foreground/90 transition-colors duration-300">
                        {featuredBlogs[0].excerpt}
                      </p>
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <Link to={`/blog/${featuredBlogs[0].slug}`} className="group/btn">
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
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

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
              <span className="text-sm font-semibold text-accent">
                {searchTerm || selectedTag ? 'Search Results' : 'Latest Insights'}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-slide-in-up">
              {searchTerm || selectedTag ? 'Matching Articles' : 'Recent Articles'}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-in-up delay-200 mb-12">
              {searchTerm || selectedTag 
                ? `Articles matching your search criteria` 
                : 'Stay updated with our latest culinary insights, event planning tips, and industry trends'
              }
            </p>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mr-4" />
              <span>Loading articles...</span>
            </div>
          )}

          {/* Empty State */}
          {!loading && blogs.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || selectedTag 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No blog posts have been published yet.'
                  }
                </p>
                {(searchTerm || selectedTag) && (
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Blog Grid */}
          {blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
                <div 
                  key={post._id} 
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
                          {post.category || 'General'}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-4 leading-tight text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-6 leading-relaxed flex-grow group-hover:text-foreground/90 transition-colors duration-300 line-clamp-3">
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
                            <div className="font-semibold text-sm text-foreground">{post.author.name}</div>
                            <div className="text-xs text-muted-foreground">Author</div>
                          </div>
                        </div>
                        
                        {/* Date and Read Time */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300">
                            <Clock className="h-4 w-4" />
                            <span>{post.readingTime || 5} min</span>
                          </div>
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge 
                                key={tagIndex} 
                                variant="outline" 
                                className="text-xs cursor-pointer hover:bg-accent/10"
                                onClick={() => handleTagFilter(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
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
                    {post.featured && (
                      <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        Featured
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      disabled={loading}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || loading}
              >
                Next
              </Button>
            </div>
          )}

          {/* Enhanced Bottom Section */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-xl rounded-3xl p-12 max-w-5xl mx-auto border border-border/50 shadow-2xl relative overflow-hidden">
              
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>

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
    </div>
  );
};

export default BlogPage;
