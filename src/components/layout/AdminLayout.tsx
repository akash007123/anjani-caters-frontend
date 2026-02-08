import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
  Users,
  BarChart3,
  Home,
  Calendar,
  Briefcase,
  Cross,
  Mail,
  Salad,
  Images,
  Rss,
  MessageCircleHeart,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Operations",
    items: [
      { name: "Contacts", href: "/admin/contacts", icon: MessageSquare },
      { name: "Bookings", href: "/admin/bookings", icon: Calendar },
      { name: "Custom Bookings", href: "/admin/custom-booking", icon: Cross },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Management",
    items: [
      {
        name: "Users",
        href: "/admin/users",
        icon: Users,
        roles: ["admin", "sub-admin"],
      },
      {
        name: "Employees",
        href: "/admin/employees",
        icon: Briefcase,
        roles: ["admin", "sub-admin"],
      },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Subscribers", href: "/admin/subscribers", icon: Mail },
      { name: "Menu", href: "/admin/menu", icon: Salad },
      { name: "Gallery", href: "/admin/gallery", icon: Images },
      { name: "Blog", href: "/admin/blog", icon: Rss },
      {
        name: "Testimonials",
        href: "/admin/testimonial",
        icon: MessageCircleHeart,
      },
    ],
  },
  {
    title: "System",
    items: [{ name: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([
    "Overview",
    "Operations",
    "Management",
    "Content",
    "System",
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  // Filter navigation based on user role
  const getFilteredItems = (items: NavItem[]) =>
    items.filter(
      (item) => !item.roles || (user && item.roles.includes(user.role)),
    );

  // Check if any item in section is active
  const isSectionActive = (items: NavItem[]) =>
    items.some(
      (item) =>
        location.pathname === item.href ||
        (item.href !== "/admin" && location.pathname.startsWith(item.href)),
    );

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((s) => s !== title)
        : [...prev, title],
    );
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "sub-admin":
        return "bg-blue-100 text-blue-800";
      case "manager":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link to="/admin" className="flex items-center gap-2">
              <img src="../icon.png" alt="logo" className="w-10" />
              <span className="text-xl font-bold text-primary">
                Admin Panel
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {navigationSections.map((section) => {
              const filteredItems = getFilteredItems(section.items);
              if (filteredItems.length === 0) return null;

              const isOpen = openSections.includes(section.title);
              const active = isSectionActive(filteredItems);

              return (
                <Collapsible key={section.title} open={isOpen}>
                  <CollapsibleTrigger
                    onClick={() => toggleSection(section.title)}
                    className={`flex items-center justify-between w-full px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{section.title}</span>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1 space-y-1">
                    {filteredItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center gap-3 px-4 py-2 ml-4 text-sm rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar>
                <AvatarImage src={user?.profilePic} />
                <AvatarFallback className="bg-primary text-white">
                  {user?.name ? getInitials(user.name) : "AD"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@anjani.com"}
                </p>
                {user?.role && (
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${getRoleBadgeColor(user.role)}`}
                  >
                    {user.role.charAt(0).toUpperCase() +
                      user.role.slice(1).replace("-", " ")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                className="flex-1"
                size="sm"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="w-4 h-4 mr-1" />
                Website
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-600 hidden sm:block">
              Welcome, {user?.name || "Admin"}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profilePic} />
              <AvatarFallback className="bg-primary text-white text-sm">
                {user?.name ? getInitials(user.name) : "AD"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
