import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import EventServices from "./pages/EventServices";
import CateringServices from "./pages/CateringServices";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import GetQuote from "./pages/GetQuote";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";
import ServiceLocationPage from "./components/seo/ProgrammaticSEO";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes location={location} key={location.pathname}>
        {/* Public admin routes - only accessible by guest users */}
        <Route element={<GuestRoute />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>
        <Route path="/admin/register" element={<Register />} />
        
        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/analytics" element={<div className="p-8">Analytics Coming Soon</div>} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/events" element={<EventServices />} />
            <Route path="/services/catering" element={<CateringServices />} />
            {/* Programmatic SEO Routes - Service × Location Pages */}
            <Route path="/services/wedding-catering/:location" element={<ServiceLocationPage serviceSlug="wedding-catering" />} />
            <Route path="/services/corporate-events/:location" element={<ServiceLocationPage serviceSlug="corporate-events" />} />
            <Route path="/services/birthday-parties/:location" element={<ServiceLocationPage serviceSlug="birthday-parties" />} />
            <Route path="/services/religious-ceremonies/:location" element={<ServiceLocationPage serviceSlug="religious-ceremonies" />} />
            <Route path="/services/social-gatherings/:location" element={<ServiceLocationPage serviceSlug="social-gatherings" />} />
            <Route path="/services/house-warming/:location" element={<ServiceLocationPage serviceSlug="house-warming" />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="shubhutsav-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <AnimatedRoutes />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
