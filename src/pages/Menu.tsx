import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Utensils, ChefHat, Star, Coffee, Leaf, Flame, Award, Users, Clock, Phone } from "lucide-react";

const Menu = () => {
  const appetizers = [
    { name: "Bruschetta Trio", description: "Classic tomato, mushroom tapenade, and goat cheese", price: "₹450", dietary: ["vegetarian"] },
    { name: "Paneer Tikka Skewers", description: "Tandoori spiced cottage cheese with mint chutney", price: "₹380", dietary: ["vegetarian", "spicy"] },
    { name: "Mediterranean Mezze Platter", description: "Hummus, baba ganoush, falafel, olives, and pita", price: "₹520", dietary: ["vegetarian", "vegan"] },
    { name: "Crispy Spring Rolls", description: "Vegetables with sweet chili sauce", price: "₹320", dietary: ["vegetarian"] },
  ];

  const mains = [
    { name: "Butter Chicken", description: "Tender chicken in rich tomato-cream sauce", price: "₹650", dietary: ["non-vegetarian", "spicy"] },
    { name: "Grilled Salmon", description: "Atlantic salmon with lemon-herb butter", price: "₹890", dietary: ["non-vegetarian"] },
    { name: "Vegetable Biryani", description: "Fragrant basmati rice with seasonal vegetables", price: "₹480", dietary: ["vegetarian"] },
    { name: "Lamb Rogan Josh", description: "Slow-cooked lamb in aromatic Kashmiri spices", price: "₹780", dietary: ["non-vegetarian", "spicy"] },
    { name: "Paneer Lababdar", description: "Cottage cheese in creamy tomato gravy", price: "₹550", dietary: ["vegetarian"] },
    { name: "Grilled Vegetable Stack", description: "Layered Mediterranean vegetables with pesto", price: "₹520", dietary: ["vegetarian"] },
  ];

  const desserts = [
    { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: "₹380", dietary: ["vegetarian"] },
    { name: "Gulab Jamun", description: "Traditional Indian milk dumplings in rose syrup", price: "₹280", dietary: ["vegetarian"] },
    { name: "Chocolate Lava Cake", description: "Molten chocolate center with vanilla ice cream", price: "₹420", dietary: ["vegetarian"] },
    { name: "Mango Panna Cotta", description: "Silky Italian custard with fresh mango coulis", price: "₹350", dietary: ["vegetarian"] },
  ];

  const beverages = [
    { name: "Fresh Lime Soda", description: "Sweet or salted", price: "₹120", dietary: ["vegetarian", "vegan"] },
    { name: "Masala Chai", description: "Traditional Indian spiced tea", price: "₹80", dietary: ["vegetarian", "vegan"] },
    { name: "Fresh Fruit Smoothies", description: "Choice of mango, strawberry, or mixed berry", price: "₹180", dietary: ["vegetarian", "vegan"] },
    { name: "Iced Coffee", description: "Cold brew with milk or black", price: "₹150", dietary: ["vegetarian", "vegan"] },
  ];

  const MenuSection = ({ items }: { items: typeof appetizers }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {items.map((item, index) => (
        <Card key={index} className="group p-8 hover:scale-[1.03] transition-all duration-300 card-shadow hover:shadow-2xl border-l-4 border-l-accent/20 hover:border-l-accent">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">{item.name}</h3>
            <span className="text-2xl font-bold text-accent bg-accent/10 px-3 py-1 rounded-lg">{item.price}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
          
          {/* Dietary Indicators */}
          <div className="flex gap-2 flex-wrap">
            {item.dietary.includes('vegetarian') && (
              <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                <Leaf className="h-3 w-3" />
                Vegetarian
              </span>
            )}
            {item.dietary.includes('vegan') && (
              <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">
                <Leaf className="h-3 w-3" />
                Vegan
              </span>
            )}
            {item.dietary.includes('non-vegetarian') && (
              <span className="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                <Utensils className="h-3 w-3" />
                Non-Veg
              </span>
            )}
            {item.dietary.includes('spicy') && (
              <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                <Flame className="h-3 w-3" />
                Spicy
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-[120px]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Gourmet Food"
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
              <ChefHat className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Award-Winning Cuisine</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-slide-in-up">
              Our Menu
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 animate-slide-in-up delay-200">
              A curated collection of signature dishes crafted with passion and the finest ingredients
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed animate-slide-in-up delay-400">
              From authentic Indian flavors to international cuisine, our menu showcases culinary artistry that delights the senses and creates memorable dining experiences.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-600">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Explore Full Menu
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Request Custom Menu
              </button>
            </div>

            {/* Menu Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-primary-foreground/20 animate-fade-in delay-800">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm md:text-base opacity-80">Signature Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">8</div>
                <div className="text-sm md:text-base opacity-80">Cuisine Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm md:text-base opacity-80">Fresh Ingredients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm md:text-base opacity-80">Menu Updates</div>
              </div>
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

      {/* Menu Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our menu showcases a blend of international and Indian cuisines, crafted with premium ingredients. All items can be customized to accommodate dietary preferences and restrictions.
            </p>
          </div>

          <Tabs defaultValue="appetizers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-auto">
              <TabsTrigger value="appetizers" className="py-3">Appetizers</TabsTrigger>
              <TabsTrigger value="mains" className="py-3">Main Course</TabsTrigger>
              <TabsTrigger value="desserts" className="py-3">Desserts</TabsTrigger>
              <TabsTrigger value="beverages" className="py-3">Beverages</TabsTrigger>
            </TabsList>

            <TabsContent value="appetizers">
              <MenuSection items={appetizers} />
            </TabsContent>

            <TabsContent value="mains">
              <MenuSection items={mains} />
            </TabsContent>

            <TabsContent value="desserts">
              <MenuSection items={desserts} />
            </TabsContent>

            <TabsContent value="beverages">
              <MenuSection items={beverages} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Menu CTA */}
      <section className="py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/15 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-full px-8 py-4 mb-8">
              <Users className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold text-accent">Personalized Service</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent leading-tight">
              Need a Custom Menu?
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Work with our award-winning chefs to create a personalized menu tailored specifically for your event, 
              dietary preferences, and cultural requirements.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group p-6 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/20 hover:border-accent/30 transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <ChefHat className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Expert Chefs</h3>
                <p className="text-muted-foreground">Work with our culinary experts to design the perfect menu</p>
              </div>
              
              <div className="group p-6 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/20 hover:border-accent/30 transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Quick Turnaround</h3>
                <p className="text-muted-foreground">Get your custom menu designed within 24-48 hours</p>
              </div>
              
              <div className="group p-6 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/20 hover:border-accent/30 transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Leaf className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Dietary Options</h3>
                <p className="text-muted-foreground">Accommodate all dietary restrictions and preferences</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/quote">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Request Custom Menu
                </Button>
              </Link>
              
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Call us:</strong> +91 98765 43210
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Email:</strong> custom@anjanicaters.com
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-border/20">
              <p className="text-sm text-muted-foreground mb-6">Trusted by 500+ events annually</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-accent">500+</div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-2xl font-bold text-accent">4.9★</div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-2xl font-bold text-accent">24h</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
