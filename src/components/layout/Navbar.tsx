import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChefHat, Phone, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside (optional enhancement)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/testimonials", label: "Reviews" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Pre-header bar - Responsive improvements */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300 text-[11px] sm:text-xs">+91 96855 33878</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Mail className="h-3 w-3 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300 text-[11px] sm:text-xs truncate max-w-[180px] lg:max-w-none">
                  akashraikwar763@gmail.com
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <Star className="h-3 w-3 text-yellow-400 fill-current flex-shrink-0" />
              <span className="text-[11px] sm:text-xs">4.9/5 Rating • 15+ Years Experience</span>
            </div>
            {/* Mobile-only email display */}
            <div className="sm:hidden flex items-center gap-2">
              <Mail className="h-3 w-3 text-orange-400 flex-shrink-0" />
              <span className="text-slate-300 text-[11px]">akashraikwar763@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed top-[48px] sm:top-[32px] left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10 border-b border-slate-200/50"
            : "bg-white/90 backdrop-blur-md shadow-lg shadow-black/5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="/logo.png" 
                  alt="Anjani Caters Logo" 
                  className="h-8 w-8 sm:h-10 sm:w-10 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight">
                  Anjani Caters
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wider hidden xs:block">
                  PREMIUM CULINARY EXPERIENCES
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.to} className="relative group">
                  <NavLink
                    to={link.to}
                    end
                    className="relative px-3 py-2 text-sm font-semibold text-slate-600 hover:text-orange-500 transition-all duration-300 rounded-lg hover:bg-orange-50"
                    activeClassName="text-orange-500 font-bold bg-orange-50"
                  >
                    {link.label}
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </NavLink>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <div className="text-right mr-4 hidden xl:block">
                <div className="text-xs text-slate-500">Available 24/7</div>
                <div className="text-sm font-bold text-slate-700">Instant Quote</div>
              </div>
              <Link to="/quote">
                <Button className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    <ChefHat className="h-4 w-4" />
                    Get Quote
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Menu className="h-6 w-6 text-slate-700" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
                  <X className="h-6 w-6 text-slate-700" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu - Fixed height issues */}
        <div 
          className={`lg:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto ${
            isMobileMenuOpen 
              ? 'top-[calc(48px+64px)] sm:top-[calc(32px+80px)] opacity-100 max-h-[calc(100vh-112px)] sm:max-h-[calc(100vh-112px)]' 
              : 'top-[calc(48px+64px)] sm:top-[calc(32px+80px)] opacity-0 max-h-0 pointer-events-none'
          }`}
          style={{ maxHeight: isMobileMenuOpen ? 'calc(100vh - 112px)' : '0' }}
        >
          <div className="container mx-auto px-4 sm:px-6 py-6">
            {/* Mobile Quick Contact */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="font-medium text-slate-700">+91 96855 33878</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="font-medium text-slate-700 break-all">akashraikwar763@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-1 mb-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  className="group relative px-4 py-3 text-base font-semibold text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-300 flex items-center justify-between"
                  activeClassName="text-orange-500 bg-orange-50 font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <div className="w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </NavLink>
              ))}
            </div>

            {/* Mobile Rating - Visible on mobile */}
            <div className="mb-6 flex items-center justify-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-lg">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.9/5 Rating • 15+ Years Experience</span>
            </div>

            {/* Mobile CTA */}
            <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)} className="block">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 shadow-lg shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02]">
                <span className="flex items-center justify-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Get Instant Quote
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-[112px] sm:h-[112px]"></div>
    </>
  );
};

export default Navbar;