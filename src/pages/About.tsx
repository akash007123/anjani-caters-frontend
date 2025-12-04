import { Card } from "@/components/ui/card";
import { Award, Heart, Star, Users } from "lucide-react";
import chefTeamImage from "@/assets/chef-team.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Every dish is crafted with genuine love for the culinary arts",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Uncompromising quality in ingredients and execution",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Working closely with clients to bring their vision to life",
    },
    {
      icon: Star,
      title: "Innovation",
      description: "Constantly evolving our menus with creative presentations",
    },
  ];

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={chefTeamImage}
            alt="Elite Catering Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2 mb-8 animate-fade-in">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">15+ Years of Excellence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-slide-in-up">
              Our Story
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 animate-slide-in-up delay-200">
              Crafting extraordinary culinary experiences that bring people together and create lasting memories
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed animate-slide-in-up delay-400">
              From intimate gatherings to grand celebrations, we've been transforming visions into unforgettable dining experiences with passion, creativity, and uncompromising quality.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-600">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Explore Our Services
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                View Our Work
              </button>
            </div>

            {/* Enhanced Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-primary-foreground/20 animate-fade-in delay-800">
              {[
                {
                  number: "2500+",
                  label: "Events Catered",
                  icon: "🎉",
                  description: "Successful celebrations"
                },
                {
                  number: "50+",
                  label: "Team Members",
                  icon: "👥",
                  description: "Expert professionals"
                },
                {
                  number: "15+",
                  label: "Years Experience",
                  icon: "⭐",
                  description: "Industry expertise"
                },
                {
                  number: "98%",
                  label: "Client Satisfaction",
                  icon: "💯",
                  description: "Happy clients"
                }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group cursor-pointer animate-slide-in-up hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${800 + (index * 200)}ms` }}
                >
                  <div className="bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 hover:bg-accent/15 hover:border-accent/30 transition-all duration-300 group-hover:shadow-lg">
                    {/* Icon */}
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    
                    {/* Number */}
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2 group-hover:text-accent/90 transition-colors duration-300">
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm md:text-base font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    <div className="text-xs md:text-sm text-muted-foreground/80 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 mb-6">
                <Heart className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Our Journey</span>
              </div>

              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
                Who We Are
              </h2>
              
              <div className="space-y-8 text-muted-foreground leading-relaxed">
                <div className="animate-slide-in-up delay-200">
                  <p className="text-lg">
                    Elite Catering was founded in 2009 with a simple vision: to elevate the catering experience by combining exceptional cuisine with personalized service. What started as a passion project by Chef Rahul Sharma has grown into one of the most trusted names in premium catering.
                  </p>
                </div>
                
                <div className="animate-slide-in-up delay-400">
                  <p className="text-lg">
                    Our team of award-winning chefs brings together diverse culinary traditions, creating menus that honor both classic techniques and contemporary innovation. We believe that great food has the power to bring people together and create lasting memories.
                  </p>
                </div>
                
                <div className="animate-slide-in-up delay-600">
                  <p className="text-lg">
                    Today, we serve weddings, corporate events, and private celebrations across the region, always maintaining our commitment to quality, creativity, and exceptional service. Every event is an opportunity for us to showcase our passion for culinary excellence.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-10 animate-scale-in delay-800">
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Discover Our Story
                </button>
              </div>
            </div>

            <div className="relative animate-fade-in delay-300">
              {/* Image Container */}
              <div className="relative group">
                {/* Main Image */}
                <img
                  src={chefTeamImage}
                  alt="Professional chef team preparing gourmet dishes"
                  className="rounded-2xl card-shadow w-full h-auto transform group-hover:scale-[1.02] transition-all duration-500"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Decorative Corner */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-accent">15+</div>
                      <div className="text-xs text-muted-foreground">Years</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-accent">2500+</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-accent/10 backdrop-blur-sm rounded-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-accent" />
                  <div>
                    <div className="font-semibold text-sm">Award Winning</div>
                    <div className="text-xs text-muted-foreground">Since 2009</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-accent/5 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Our Foundation</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
              Our Values
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              The principles that guide everything we do and shape every experience we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="animate-slide-in-up group" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="p-8 text-center h-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background hover:scale-105 transition-all duration-500 hover:shadow-2xl card-shadow group-hover:border-accent/30 relative overflow-hidden">
                  {/* Card Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <value.icon className="h-10 w-10 text-accent transition-all duration-300 group-hover:scale-110" />
                    </div>
                    
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 rounded-full border border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>

                  {/* Hover Effect Lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  
                  {/* Floating Particles Effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="relative group">
              {/* Background Card */}
              <div className="bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl rounded-3xl p-10 md:p-12 max-w-4xl mx-auto border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] relative overflow-hidden">
                
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 mb-6 animate-slide-in-up">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Ready to Begin?</span>
                  </div>

                  {/* Main Heading */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent animate-slide-in-up delay-200">
                    Experience Our Values in Action
                  </h3>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-up delay-400">
                    Let us bring our passion, excellence, partnership, and innovation to your next event. Every celebration deserves the perfect culinary experience.
                  </p>

                  {/* Value Highlights */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto animate-slide-in-up delay-600">
                    {[
                      { icon: Heart, label: "Passion" },
                      { icon: Award, label: "Excellence" },
                      { icon: Users, label: "Partnership" },
                      { icon: Star, label: "Innovation" }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center p-3 rounded-xl bg-muted/50 hover:bg-accent/10 transition-all duration-300 group-hover:scale-105">
                        <item.icon className="h-6 w-6 text-accent mb-2" />
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in delay-800">
                    <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-accent/25 group/btn relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2">
                        <Heart className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                        Start Your Event
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                    
                    <button className="border-2 border-border hover:border-accent/50 text-foreground hover:text-accent bg-background/50 hover:bg-background/80 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                      View Portfolio
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 pt-6 border-t border-border/50 animate-fade-in delay-1000">
                    <p className="text-sm text-muted-foreground mb-3">Trusted by 2500+ events • 98% client satisfaction</p>
                    <div className="flex justify-center items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-accent fill-current" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">5.0 rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-accent/30 rounded-tl-lg opacity-60"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-accent/30 rounded-tr-lg opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-accent/30 rounded-bl-lg opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-accent/30 rounded-br-lg opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-accent mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">2500+</div>
              <div className="text-muted-foreground">Events Catered</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Team Members</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Our Leadership</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-slide-in-up">
              Meet Our Leadership
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              Passionate professionals dedicated to culinary excellence and unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: "Chef Rahul Sharma", 
                role: "Founder & Executive Chef", 
                desc: "15 years of culinary expertise with training from Le Cordon Bleu. Master of both traditional and contemporary cuisine.",
                image: "👨‍🍳",
                expertise: ["Culinary Arts", "Menu Design", "Team Leadership"],
                achievement: "Michelin-trained Chef"
              },
              { 
                name: "Priya Desai", 
                role: "Operations Director", 
                desc: "MBA graduate specializing in event management and logistics. Expert in turning visions into flawless executions.",
                image: "👩‍💼",
                expertise: ["Event Planning", "Operations", "Client Relations"],
                achievement: "Certified Event Manager"
              },
              { 
                name: "Vikram Patel", 
                role: "Creative Director", 
                desc: "Award-winning designer crafting memorable event experiences. Specializes in thematic presentations and visual storytelling.",
                image: "🎨",
                expertise: ["Visual Design", "Event Theming", "Brand Experience"],
                achievement: "Design Excellence Award"
              },
            ].map((member, index) => (
              <div key={index} className="animate-slide-in-up group" style={{ animationDelay: `${index * 200}ms` }}>
                <Card className="p-8 text-center h-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background hover:scale-105 transition-all duration-500 hover:shadow-2xl card-shadow group-hover:border-accent/30 relative overflow-hidden">
                  
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Professional Image Placeholder */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-accent/20 group-hover:border-accent/40">
                      {member.image}
                    </div>
                    
                    {/* Achievement Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium">
                      {member.achievement}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm text-accent font-semibold mb-4 group-hover:text-accent/80 transition-colors duration-300">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {member.desc}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member.expertise.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="text-xs bg-muted/50 text-foreground px-3 py-1 rounded-full border border-border/50 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Enhanced Team Stats */}
          <div className="mt-20 text-center animate-fade-in delay-1000">
            <div className="relative group">
              {/* Background Card */}
              <div className="bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl rounded-3xl p-10 md:p-12 max-w-5xl mx-auto border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] relative overflow-hidden">
                
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-accent/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 delay-200"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-primary/8 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-400"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-10 animate-slide-in-up">
                    <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 mb-4">
                      <Star className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-accent">Team Excellence</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
                      Our Team by the Numbers
                    </h3>
                    <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                      The strength behind every exceptional event we create
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        number: "50+",
                        label: "Total Team Members",
                        description: "Expert professionals",
                        icon: "👥",
                        color: "from-blue-500 to-blue-600"
                      },
                      {
                        number: "15+",
                        label: "Years Combined Experience",
                        description: "Industry veterans",
                        icon: "⭐",
                        color: "from-yellow-500 to-yellow-600"
                      },
                      {
                        number: "25+",
                        label: "Cuisine Specialties",
                        description: "Global flavors",
                        icon: "🍽️",
                        color: "from-green-500 to-green-600"
                      },
                      {
                        number: "100%",
                        label: "Passion for Excellence",
                        description: "Dedicated to quality",
                        icon: "💯",
                        color: "from-red-500 to-red-600"
                      }
                    ].map((stat, index) => (
                      <div 
                        key={index} 
                        className="group/stat animate-slide-in-up hover:scale-105 transition-all duration-500"
                        style={{ animationDelay: `${400 + (index * 150)}ms` }}
                      >
                        <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-accent/30 hover:bg-background/70 transition-all duration-300 group-hover/stat:shadow-xl relative overflow-hidden">
                          
                          {/* Background Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover/stat:opacity-5 transition-opacity duration-500`}></div>
                          
                          {/* Icon */}
                          <div className="text-4xl mb-4 group-hover/stat:scale-110 transition-transform duration-300 relative z-10">
                            {stat.icon}
                          </div>
                          
                          {/* Number */}
                          <div className="text-2xl md:text-3xl font-bold text-accent mb-3 group-hover/stat:text-accent/90 transition-colors duration-300 relative z-10">
                            {stat.number}
                          </div>
                          
                          {/* Label */}
                          <div className="text-sm font-semibold text-foreground mb-2 group-hover/stat:text-accent transition-colors duration-300 relative z-10">
                            {stat.label}
                          </div>
                          
                          {/* Description */}
                          <div className="text-xs text-muted-foreground/80 relative z-10">
                            {stat.description}
                          </div>

                          {/* Hover Effect Line */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover/stat:scale-x-100 transition-transform duration-500 origin-center"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-10 pt-6 border-t border-border/50 animate-fade-in delay-1000">
                    <p className="text-muted-foreground mb-4">Ready to work with our exceptional team?</p>
                    <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      Join Our Team
                    </button>
                  </div>
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

      {/* Enhanced Awards & Recognition */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-10 w-24 h-24 bg-yellow-500/5 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Industry Excellence</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent animate-slide-in-up">
              Awards & Recognition
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in-up delay-200">
              Honored to be recognized by industry leaders for our commitment to culinary excellence
            </p>
          </div>

          {/* Awards Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent to-primary opacity-20 hidden lg:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {[
                  {
                    year: "2023",
                    award: "Best Catering Service of the Year",
                    org: "National Hospitality Awards",
                    description: "Recognized for exceptional service quality and client satisfaction",
                    icon: "🏆",
                    color: "from-yellow-500 to-orange-500"
                  },
                  {
                    year: "2022",
                    award: "Excellence in Culinary Innovation",
                    org: "Food & Beverage Association",
                    description: "Honored for creative menu development and innovative cooking techniques",
                    icon: "👨‍🍳",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    year: "2021",
                    award: "Wedding Caterer of the Year",
                    org: "Bridal Industry Awards",
                    description: "Celebrated for creating magical wedding dining experiences",
                    icon: "💒",
                    color: "from-pink-500 to-rose-500"
                  },
                  {
                    year: "2020",
                    award: "Sustainable Catering Practices Award",
                    org: "Green Business Council",
                    description: "Awarded for environmental responsibility and sustainable operations",
                    icon: "🌱",
                    color: "from-green-500 to-emerald-500"
                  }
                ].map((item, index) => (
                  <div key={index} className={`animate-slide-in-up group ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:ml-auto'}`} style={{ animationDelay: `${index * 200}ms` }}>
                    <Card className="p-8 h-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl card-shadow group-hover:border-accent/30 relative overflow-hidden">
                      
                      {/* Background Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Timeline Dot (Desktop) */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg hidden lg:block group-hover:scale-125 transition-transform duration-300"></div>
                      
                      {/* Award Icon */}
                      <div className="flex items-start gap-6 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                          {item.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-accent mb-1 group-hover:text-accent/90 transition-colors duration-300">
                            {item.year}
                          </div>
                          <Award className="h-6 w-6 text-accent mb-2" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                          {item.award}
                        </h3>
                        <p className="text-accent font-semibold mb-3 group-hover:text-accent/80 transition-colors duration-300">
                          {item.org}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>

                      {/* Ribbon Effect */}
                      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
                        <Award className="absolute top-2 right-2 h-4 w-4 text-accent/60" />
                      </div>

                      {/* Hover Effect Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recognition Summary */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="bg-gradient-to-br from-accent/5 via-background to-primary/5 backdrop-blur-sm rounded-3xl p-10 max-w-4xl mx-auto border border-border/50">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                A Legacy of Excellence
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Our awards represent more than recognition—they embody our unwavering commitment to culinary excellence, 
                innovation, and exceptional service. Each achievement drives us to reach new heights in the catering industry.
              </p>
              
              {/* Achievement Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Industry Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Years Running</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">∞</div>
                  <div className="text-sm text-muted-foreground">Passion</div>
                </div>
              </div>

              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/25">
                View All Achievements
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
