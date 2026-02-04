import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Drumstick, Star, Shield, UtensilsCrossed, ChefHat } from 'lucide-react';
import SEO from '@/components/SEO';
import heroCatering from '@/assets/hero-catering.jpg';
import buffetSetup from '@/assets/buffet-setup.jpg';

const CateringServices = () => {
  const cateringTypes = [
    {
      title: 'Vegetarian Cuisine',
      description: 'Extensive pure vegetarian menu featuring North Indian, South Indian, and regional specialties.',
      icon: Leaf,
      dishes: ['Paneer Tikka', 'Dal Makhani', 'Biryani', 'Malai Kofta', 'Dosa Varieties']
    },
    {
      title: 'Non-Vegetarian Delights',
      description: 'Premium non-veg preparations from Mughlai to coastal cuisines.',
      icon: Drumstick,
      dishes: ['Butter Chicken', 'Mutton Rogan Josh', 'Fish Tikka', 'Chicken Biryani', 'Seekh Kebab']
    },
    {
      title: 'Jain Special Menu',
      description: 'Specially curated Jain menu without root vegetables and following strict dietary guidelines.',
      icon: Star,
      dishes: ['Jain Paneer Dishes', 'No Onion-Garlic Curries', 'Special Sweets', 'Fresh Salads']
    }
  ];

  const serviceTypes = [
    {
      title: 'Buffet Service',
      description: 'Elaborate buffet setup with multiple courses and live stations.',
      features: ['Welcome Drinks', 'Starters Counter', 'Main Course', 'Dessert Station']
    },
    {
      title: 'Plated Service',
      description: 'Elegant plated dining experience with personalized service.',
      features: ['Multi-Course Meals', 'Table Service', 'Custom Plating', 'Wine Pairing']
    },
    {
      title: 'Live Food Counters',
      description: 'Interactive cooking stations for a fresh, engaging experience.',
      features: ['Chaat Counter', 'Dosa Station', 'Tandoor Counter', 'Pasta Station']
    }
  ];

  return (
    <>
      <SEO 
        title="Catering Services"
        description="Premium Indian catering services for all occasions. Vegetarian, non-vegetarian, and Jain menus prepared by expert chefs with FSSAI certified kitchens."
        keywords="catering services Mumbai, wedding catering, vegetarian catering, non-veg catering, Jain catering, live food counters"
        url="http://anjanievents.in/services/catering"
      />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroCatering} alt="Catering Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-primary-foreground"
          >
            <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Catering Services
            </span>
            <h1 className="heading-display mb-4">Culinary Excellence</h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Authentic Indian cuisine prepared by master chefs, bringing the finest flavors to your celebrations.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-light">
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Cuisine Types */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Cuisines
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Flavors for Every Palate
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {cateringTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <type.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card text-foreground mb-3">{type.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{type.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {type.dishes.map((dish) => (
                    <span key={dish} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                      {dish}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={buffetSetup} alt="Buffet Setup" className="rounded-2xl shadow-elevated" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Service Styles
              </span>
              <h2 className="heading-section text-foreground mb-8">
                Tailored to Your Event
              </h2>

              <div className="space-y-6">
                {serviceTypes.map((service) => (
                  <div key={service.title} className="card-premium p-6">
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span key={feature} className="px-2 py-1 bg-accent/10 text-accent-foreground rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality & Hygiene */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Quality Standards
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Our Commitment to Excellence
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'FSSAI Certified', desc: 'Licensed food safety operations' },
              { icon: ChefHat, title: 'Expert Chefs', desc: '20+ years combined experience' },
              { icon: Leaf, title: 'Fresh Ingredients', desc: 'Daily sourced, quality assured' },
              { icon: UtensilsCrossed, title: 'Hygienic Kitchen', desc: 'State-of-the-art facilities' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium mb-4">
              Pricing
            </span>
            <h2 className="heading-section mb-4">Transparent Pricing</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Basic', price: '₹450', unit: '/plate', features: ['Starter + Main Course', '2 Desserts', 'Welcome Drink', 'Basic Setup'] },
              { title: 'Premium', price: '₹750', unit: '/plate', features: ['Multiple Starters', 'Live Counter', '4 Desserts', 'Premium Setup'], popular: true },
              { title: 'Luxury', price: '₹1200', unit: '/plate', features: ['All Cuisines', 'Multiple Counters', 'Unlimited Desserts', 'Designer Setup'] },
            ].map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-2xl ${plan.popular ? 'bg-accent text-accent-foreground' : 'bg-primary-foreground/10'}`}
              >
                {plan.popular && <span className="text-xs font-medium mb-4 block">MOST POPULAR</span>}
                <h3 className="font-serif text-2xl font-semibold mb-2">{plan.title}</h3>
                <p className="mb-6">
                  <span className="font-serif text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm">{plan.unit}</span>
                </p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-accent-foreground' : 'bg-accent'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className={plan.popular ? 'bg-accent-foreground text-accent w-full' : 'bg-accent text-accent-foreground w-full'}>
                  <Link to="/get-quote">Get Quote</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section text-foreground mb-4">Let's Discuss Your Menu</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Our culinary team is ready to create a custom menu for your event.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-maroon-light">
                <Link to="/menu">
                  View Full Menu
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary">
                <Link to="/get-quote">Custom Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CateringServices;
