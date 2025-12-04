import { Link } from "react-router-dom";
import { ChefHat, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Clock, Award } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand Section - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ChefHat className="h-10 w-10 text-orange-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Elite Catering
              </span>
            </div>
            
            <p className="text-slate-300 leading-relaxed text-base max-w-md">
              Creating unforgettable culinary experiences for every occasion. From intimate gatherings to grand celebrations, 
              we transform your vision into exquisite culinary artistry.
            </p>

            {/* Awards & Recognition */}
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-orange-400" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-orange-400" />
                <span>15+ Years</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="group relative p-3 bg-slate-800/50 rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/menu", label: "Menu" },
                { to: "/gallery", label: "Gallery" },
                { to: "/testimonials", label: "Testimonials" },
                { to: "/blog", label: "Blog" }
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="group flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-all duration-200 text-sm"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full"></div>
              Our Services
            </h3>
            <ul className="space-y-4">
              {[
                "Wedding Catering",
                "Corporate Events", 
                "Private Parties",
                "Custom Menus",
                "Buffet Service",
                "Live Cooking"
              ].map((service) => (
                <li key={service} className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-full"></div>
              Get In Touch
            </h3>
            
            {/* Contact Details */}
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">Visit Our Kitchen</h5>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    123 Culinary Street, Food District<br />
                    Mumbai 400001, Maharashtra
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Phone className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">Call Us</h5>
                  <a href="tel:+911234567890" className="text-slate-300 hover:text-orange-400 transition-colors text-sm">
                    +91 12345 67890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Mail className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white mb-1">Email Us</h5>
                  <a href="mailto:info@elitecatering.com" className="text-slate-300 hover:text-orange-400 transition-colors text-sm">
                    info@elitecatering.com
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-2">Ready to Plan Your Event?</h4>
              <p className="text-slate-300 text-sm mb-4">Get a personalized quote in 24 hours</p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-slate-400 text-sm">
                © {currentYear} Elite Catering. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Crafted with ❤️ for unforgettable experiences
              </p>
            </div>
            
            <div className="flex gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-orange-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
