import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  ArrowRight,
  RefreshCw,
  Clock,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
}

interface Booking {
  _id: string;
  eventType: string;
  guestCount: number;
  name: string;
  eventDate: string;
  status: string;
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
}

interface BookingStats {
  total: number;
  upcoming: number;
  new: number;
  confirmed: number;
  completed: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    archived: 0
  });
  const [bookingStats, setBookingStats] = useState<BookingStats>({
    total: 0,
    upcoming: 0,
    new: 0,
    confirmed: 0,
    completed: 0
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsResponse = await fetch(`${API_URL}/api/contacts/stats`);
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch booking stats
      const bookingStatsResponse = await fetch(`${API_URL}/api/bookings/stats`);
      const bookingStatsData = await bookingStatsResponse.json();
      if (bookingStatsData.success) {
        setBookingStats({
          total: bookingStatsData.data.total || 0,
          upcoming: bookingStatsData.data.upcoming || 0,
          new: bookingStatsData.data.byStatus?.new || 0,
          confirmed: bookingStatsData.data.byStatus?.confirmed || 0,
          completed: bookingStatsData.data.byStatus?.completed || 0
        });
      }

      // Fetch recent contacts (5 most recent)
      const contactsResponse = await fetch(`${API_URL}/api/contacts?limit=5`);
      const contactsData = await contactsResponse.json();
      if (contactsData.success) {
        setRecentContacts(contactsData.data);
      }

      // Fetch recent bookings (5 most recent)
      const bookingsResponse = await fetch(`${API_URL}/api/bookings?limit=5`);
      const bookingsData = await bookingsResponse.json();
      if (bookingsData.success) {
        setRecentBookings(bookingsData.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-600";
      case "read":
        return "bg-green-100 text-green-600";
      case "replied":
        return "bg-gray-100 text-gray-600";
      case "archived":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.total.toString(),
      change: `+${stats.new} new`,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "New Messages",
      value: stats.new.toString(),
      change: "Awaiting response",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Upcoming Bookings",
      value: bookingStats.upcoming.toString(),
      change: "Events scheduled",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "New Bookings",
      value: bookingStats.new.toString(),
      change: "Pending confirmation",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-600";
      case "confirmed":
        return "bg-green-100 text-green-600";
      case "in-progress":
        return "bg-purple-100 text-purple-600";
      case "completed":
        return "bg-gray-100 text-gray-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's your overview.</p>
        </div>
        <Button variant="outline" onClick={fetchDashboardData} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Messages</CardTitle>
            <Link to="/admin/contacts">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentContacts.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">
                          {contact.subject}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {formatDate(contact.createdAt)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/admin/contacts">
                <div className="p-4 rounded-lg border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                  <MessageSquare className="w-8 h-8 text-primary mb-2" />
                  <p className="font-medium">View Contacts</p>
                  <p className="text-sm text-gray-500">
                    Manage all messages
                  </p>
                </div>
              </Link>
              <Link to="/admin/bookings">
                <div className="p-4 rounded-lg border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                  <Calendar className="w-8 h-8 text-primary mb-2" />
                  <p className="font-medium">Manage Bookings</p>
                  <p className="text-sm text-gray-500">
                    View all bookings
                  </p>
                </div>
              </Link>
              <div className="p-4 rounded-lg border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-gray-500">Track performance</p>
              </div>
              <div className="p-4 rounded-lg border hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                <Users className="w-8 h-8 text-primary mb-2" />
                <p className="font-medium">Add User</p>
                <p className="text-sm text-gray-500">Create new account</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Link to="/admin/bookings">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-sm text-gray-500">
                          {booking.eventType.charAt(0).toUpperCase() + booking.eventType.slice(1)} - {booking.guestCount} guests
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {formatDate(booking.eventDate)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getBookingStatusBadge(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
