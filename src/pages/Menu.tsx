import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, Leaf, Drumstick, Star, Flame } from 'lucide-react';
import SEO from '@/components/SEO';
import heroCatering from '@/assets/hero-catering.jpg';

const Menu = () => {
  const [filter, setFilter] = useState('all');

  const menuCategories = [
    {
      name: 'Starters',
      items: [
        { name: 'Paneer Tikka', price: 280, type: 'veg', popular: true, description: 'Marinated cottage cheese grilled to perfection' },
        { name: 'Hara Bhara Kebab', price: 220, type: 'veg', description: 'Spinach and peas patties with aromatic spices' },
        { name: 'Chicken Seekh Kebab', price: 320, type: 'nonveg', popular: true, description: 'Minced chicken skewers from the tandoor' },
        { name: 'Fish Amritsari', price: 350, type: 'nonveg', description: 'Crispy fried fish with traditional spices' },
        { name: 'Dahi Kebab', price: 240, type: 'veg', jain: true, description: 'Creamy hung curd kebabs' },
        { name: 'Mutton Galouti', price: 380, type: 'nonveg', popular: true, description: 'Melt-in-mouth Lucknowi kebabs' },
      ]
    },
    {
      name: 'Main Course',
      items: [
        { name: 'Dal Makhani', price: 260, type: 'veg', popular: true, description: 'Creamy black lentils slow-cooked overnight' },
        { name: 'Paneer Butter Masala', price: 280, type: 'veg', description: 'Cottage cheese in rich tomato gravy' },
        { name: 'Butter Chicken', price: 340, type: 'nonveg', popular: true, description: 'Tender chicken in creamy tomato curry' },
        { name: 'Mutton Rogan Josh', price: 420, type: 'nonveg', description: 'Kashmiri style aromatic mutton curry' },
        { name: 'Malai Kofta', price: 290, type: 'veg', description: 'Fried paneer balls in cashew gravy' },
        { name: 'Fish Curry', price: 360, type: 'nonveg', description: 'Coastal style fish in coconut curry' },
        { name: 'Veg Kolhapuri', price: 250, type: 'veg', jain: true, description: 'Spicy mixed vegetables' },
        { name: 'Chicken Biryani', price: 320, type: 'nonveg', popular: true, description: 'Aromatic rice with spiced chicken' },
      ]
    },
    {
      name: 'Breads',
      items: [
        { name: 'Butter Naan', price: 50, type: 'veg', description: 'Soft leavened bread from tandoor' },
        { name: 'Garlic Naan', price: 60, type: 'veg', popular: true, description: 'Naan topped with garlic butter' },
        { name: 'Laccha Paratha', price: 55, type: 'veg', description: 'Layered whole wheat bread' },
        { name: 'Missi Roti', price: 45, type: 'veg', jain: true, description: 'Spiced gram flour bread' },
        { name: 'Tandoori Roti', price: 35, type: 'veg', description: 'Simple tandoor-baked bread' },
      ]
    },
    {
      name: 'Rice',
      items: [
        { name: 'Veg Biryani', price: 220, type: 'veg', popular: true, description: 'Aromatic rice with mixed vegetables' },
        { name: 'Jeera Rice', price: 150, type: 'veg', jain: true, description: 'Cumin tempered basmati rice' },
        { name: 'Mutton Biryani', price: 380, type: 'nonveg', popular: true, description: 'Layered rice with tender mutton' },
        { name: 'Pulao', price: 180, type: 'veg', description: 'Lightly spiced rice with vegetables' },
      ]
    },
    {
      name: 'Desserts',
      items: [
        { name: 'Gulab Jamun', price: 80, type: 'veg', popular: true, description: 'Deep-fried milk dumplings in sugar syrup' },
        { name: 'Rasmalai', price: 100, type: 'veg', description: 'Soft cheese patties in saffron milk' },
        { name: 'Kheer', price: 90, type: 'veg', jain: true, description: 'Creamy rice pudding' },
        { name: 'Gajar Halwa', price: 110, type: 'veg', popular: true, description: 'Warm carrot pudding with nuts' },
        { name: 'Jalebi', price: 70, type: 'veg', description: 'Crispy sweet spirals' },
        { name: 'Kulfi', price: 85, type: 'veg', description: 'Traditional Indian ice cream' },
      ]
    },
    {
      name: 'Beverages',
      items: [
        { name: 'Masala Chai', price: 40, type: 'veg', description: 'Spiced Indian tea' },
        { name: 'Lassi', price: 70, type: 'veg', popular: true, description: 'Sweet or salted yogurt drink' },
        { name: 'Mango Lassi', price: 90, type: 'veg', description: 'Mango flavored yogurt smoothie' },
        { name: 'Jaljeera', price: 50, type: 'veg', jain: true, description: 'Cumin based refreshing drink' },
        { name: 'Thandai', price: 100, type: 'veg', description: 'Festive spiced milk drink' },
      ]
    }
  ];

  const filteredCategories = menuCategories.map(category => ({
    ...category,
    items: category.items.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'veg') return item.type === 'veg';
      if (filter === 'nonveg') return item.type === 'nonveg';
      if (filter === 'jain') return item.jain;
      return true;
    })
  })).filter(category => category.items.length > 0);

  return (
    <>
      <SEO 
        title="Catering Menu"
        description="Explore Anjani Events' extensive menu featuring authentic Indian cuisine. Vegetarian, non-vegetarian, and Jain options available for all occasions."
        keywords="Indian catering menu, wedding menu, vegetarian catering, non-veg catering, Jain food catering, Mumbai caterers menu"
        url="http://anjanievents.in/menu"
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
            <h1 className="heading-display mb-4">Our Menu</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Explore our extensive menu featuring authentic Indian delicacies
            </p>
            {/* <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Download className="mr-2 w-4 h-4" />
              Download PDF Menu
            </Button> */}
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { value: 'all', label: 'All Items', icon: null },
              { value: 'veg', label: 'Vegetarian', icon: Leaf },
              { value: 'nonveg', label: 'Non-Vegetarian', icon: Drumstick },
              { value: 'jain', label: 'Jain Special', icon: Star },
            ].map((filterOption) => (
              <Button
                key={filterOption.value}
                variant={filter === filterOption.value ? 'default' : 'outline'}
                onClick={() => setFilter(filterOption.value)}
                className={filter === filterOption.value ? 'bg-primary' : 'border-primary text-primary'}
              >
                {filterOption.icon && <filterOption.icon className="mr-2 w-4 h-4" />}
                {filterOption.label}
              </Button>
            ))}
          </motion.div>

          {/* Menu Categories */}
          <div className="space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h2 className="heading-section text-foreground mb-6 pb-2 border-b-2 border-accent">
                  {category.name}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                      className="card-premium p-4 flex justify-between items-start gap-4 hover-lift"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === 'veg' ? (
                            <div className="w-4 h-4 border border-green-600 flex items-center justify-center">
                              <div className="w-2 h-2 bg-green-600 rounded-full" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 border border-red-600 flex items-center justify-center">
                              <div className="w-2 h-2 bg-red-600 rounded-full" />
                            </div>
                          )}
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          {item.popular && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              <Flame className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {item.jain && (
                            <Badge variant="outline" className="text-xs border-primary text-primary">
                              Jain
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="font-serif text-lg font-semibold text-primary whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-muted">
        <div className="container-custom text-center">
          <p className="text-muted-foreground">
            <Star className="inline w-4 h-4 mr-1" />
            Prices are indicative and may vary based on event size and customization.
            <Star className="inline w-4 h-4 ml-1" />
          </p>
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
            <h2 className="heading-section mb-4">Need a Custom Menu?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Our chefs can create personalized menus tailored to your preferences and dietary requirements.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
              <Link to="/get-quote">Get Custom Quote</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Menu;
