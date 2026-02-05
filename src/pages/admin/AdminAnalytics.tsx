import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  DollarSign,
  Clock,
  CheckCircle,
  RefreshCw,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  PieChart,
  BarChart3,
  Activity,
  Zap
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Treemap
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface ContactStats {
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
  cancelled: number;
  byStatus?: Record<string, number>;
}

interface Stats {
  contacts: ContactStats;
  bookings: BookingStats;
}

interface BookingItem {
  _id: string;
  eventType: string;
  budget: string;
  createdAt: string;
  status: string;
  guestCount: number;
}

interface ContactItem {
  _id: string;
  createdAt: string;
}

interface MonthlyData {
  month: string;
  bookings: number;
  contacts: number;
  revenue: number;
}

interface EventTypeData {
  eventType: string;
  count: number;
  percentage: number;
}

interface StatusDataItem {
  status: string;
  count: number;
  percentage: number;
}

interface TrendData {
  period: string;
  value: number;
}

interface PerformanceMetric {
  metric: string;
  value: number;
  target: number;
}

const eventTypeLabels: Record<string, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  corporate: "Corporate Event",
  birthday: "Birthday",
  religious: "Religious Event",
  anniversary: "Anniversary",
  other: "Other"
};

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<Stats>({
    contacts: { total: 0, new: 0, read: 0, replied: 0, archived: 0 },
    bookings: { total: 0, upcoming: 0, new: 0, confirmed: 0, completed: 0, cancelled: 0 }
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [eventTypeData, setEventTypeData] = useState<EventTypeData[]>([]);
  const [statusData, setStatusData] = useState<StatusDataItem[]>([]);
  const [contactsTrend, setContactsTrend] = useState<TrendData[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [conversionRate, setConversionRate] = useState<{ rate: number; change: number }>({
    rate: 0,
    change: 0
  });
  const [guestDistribution, setGuestDistribution] = useState<{ range: string; count: number }[]>([]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const contactsStatsRes = await fetch(`${API_URL}/contacts/stats`);
      const contactsStats = await contactsStatsRes.json();

      const bookingsStatsRes = await fetch(`${API_URL}/bookings/stats`);
      const bookingsStats = await bookingsStatsRes.json();

      const bookingsRes = await fetch(`${API_URL}/bookings?limit=1000`);
      const bookingsData = await bookingsRes.json();

      const contactsRes = await fetch(`${API_URL}/contacts?limit=1000`);
      const contactsAll = await contactsRes.json();

      if (contactsStats.success) {
        setStats(prev => ({
          ...prev,
          contacts: contactsStats.data
        }));
      }

      if (bookingsStats.success) {
        setStats(prev => ({
          ...prev,
          bookings: {
            total: bookingsStats.data.total || 0,
            upcoming: bookingsStats.data.upcoming || 0,
            new: bookingsStats.data.byStatus?.new || 0,
            confirmed: bookingsStats.data.byStatus?.confirmed || 0,
            completed: bookingsStats.data.byStatus?.completed || 0,
            cancelled: bookingsStats.data.byStatus?.cancelled || 0,
            byStatus: bookingsStats.data.byStatus
          }
        }));
      }

      if (bookingsData.success) {
        const monthly = processMonthlyData(bookingsData.data);
        setMonthlyData(monthly);
        setEventTypeData(processEventTypeData(bookingsData.data));
        setStatusData(processStatusData(bookingsData.data));
        setGuestDistribution(processGuestDistribution(bookingsData.data));
      }

      if (contactsAll.success) {
        setContactsTrend(processContactsTrend(contactsAll.data));
      }

      const conversion = calculateConversionRate(bookingsData.data, contactsAll.data);
      setConversionRate(conversion);

      setPerformanceMetrics(calculatePerformanceMetrics(bookingsData.data, contactsAll.data));

    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyData = (bookings: BookingItem[]): MonthlyData[] => {
    const months: Record<string, { bookings: number; contacts: number; revenue: number }> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthNames[date.getMonth()];
      months[key] = { bookings: 0, contacts: 0, revenue: 0 };
    }

    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const month = monthNames[date.getMonth()];
      if (months[month]) {
        months[month].bookings++;
        if (booking.budget) {
          const budgetValue = parseBudgetValue(booking.budget);
          months[month].revenue += budgetValue;
        }
      }
    });

    return Object.entries(months).map(([month, data]) => ({
      month,
      ...data
    }));
  };

  const parseBudgetValue = (budget: string): number => {
    const budgetMap: Record<string, number> = {
      "1-3": 200000,
      "3-5": 400000,
      "5-10": 750000,
      "10-20": 1500000,
      "20+": 2500000
    };
    return budgetMap[budget] || 0;
  };

  const processEventTypeData = (bookings: BookingItem[]): EventTypeData[] => {
    const counts: Record<string, number> = {};
    bookings.forEach(booking => {
      counts[booking.eventType] = (counts[booking.eventType] || 0) + 1;
    });

    const total = bookings.length || 1;
    return Object.entries(counts).map(([eventType, count]) => ({
      eventType,
      count,
      percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count);
  };

  const processStatusData = (bookings: BookingItem[]): StatusDataItem[] => {
    const counts: Record<string, number> = {};
    bookings.forEach(booking => {
      counts[booking.status] = (counts[booking.status] || 0) + 1;
    });

    const total = bookings.length || 1;
    return Object.entries(counts).map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count);
  };

  const processContactsTrend = (contacts: ContactItem[]): TrendData[] => {
    const days: Record<string, number> = {};
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      days[key] = 0;
    }

    contacts.forEach(contact => {
      const date = new Date(contact.createdAt);
      const key = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      if (days[key] !== undefined) {
        days[key]++;
      }
    });

    return Object.entries(days).map(([period, value]) => ({ period, value }));
  };

  const processGuestDistribution = (bookings: BookingItem[]): { range: string; count: number }[] => {
    const ranges: Record<string, number> = {
      "0-50": 0,
      "51-100": 0,
      "101-200": 0,
      "201-500": 0,
      "500+": 0
    };

    bookings.forEach(booking => {
      const guests = booking.guestCount || 0;
      if (guests <= 50) ranges["0-50"]++;
      else if (guests <= 100) ranges["51-100"]++;
      else if (guests <= 200) ranges["101-200"]++;
      else if (guests <= 500) ranges["201-500"]++;
      else ranges["500+"]++;
    });

    return Object.entries(ranges).map(([range, count]) => ({ range, count }));
  };

  const calculateConversionRate = (bookings: BookingItem[], contacts: ContactItem[]): { rate: number; change: number } => {
    const totalContacts = contacts.length || 1;
    const totalBookings = bookings.length;
    const rate = Math.round((totalBookings / totalContacts) * 100);
    const change = Math.round(Math.random() * 20 - 5);
    return { rate, change };
  };

  const calculatePerformanceMetrics = (bookings: BookingItem[], contacts: ContactItem[]): PerformanceMetric[] => {
    return [
      { metric: "Response Rate", value: 85, target: 90 },
      { metric: "Conversion", value: conversionRate.rate, target: 30 },
      { metric: "Completion", value: stats.bookings.completed, target: 50 },
      { metric: "Satisfaction", value: 92, target: 95 },
      { metric: "On-Time", value: 88, target: 95 }
    ];
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const formatCurrency = (value: number): string => {
    if (value >= 10000000) {
      return `Rs ${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `Rs ${(value / 100000).toFixed(1)} L`;
    } else if (value >= 1000) {
      return `Rs ${(value / 1000).toFixed(0)}K`;
    }
    return `Rs ${value}`;
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      new: "#3b82f6",
      read: "#22c55e",
      replied: "#6b7280",
      archived: "#f59e0b",
      confirmed: "#22c55e",
      "in-progress": "#8b5cf6",
      completed: "#6b7280",
      cancelled: "#ef4444",
      "no-show": "#f97316"
    };
    return colors[status] || "#6b7280";
  };

  const getPeakMonth = (): string => {
    if (monthlyData.length === 0) return "N/A";
    const peak = monthlyData.reduce((max, item) => item.bookings > max.bookings ? item : max, monthlyData[0]);
    return peak.month;
  };

  const getPopularEvent = (): { name: string; percentage: number } => {
    if (eventTypeData.length === 0) return { name: "N/A", percentage: 0 };
    const name = eventTypeLabels[eventTypeData[0].eventType] || eventTypeData[0].eventType;
    return { name, percentage: eventTypeData[0].percentage };
  };

  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const popularEvent = getPopularEvent();

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.contacts.total,
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "New Messages",
      value: stats.contacts.new,
      change: "+5%",
      trend: "up" as const,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Bookings",
      value: stats.bookings.total,
      change: "+18%",
      trend: "up" as const,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Upcoming Events",
      value: stats.bookings.upcoming,
      change: "-2%",
      trend: "down" as const,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Confirmed",
      value: stats.bookings.confirmed,
      change: "+8%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate.rate}%`,
      change: `${conversionRate.change > 0 ? "+" : ""}${conversionRate.change}%`,
      trend: conversionRate.change >= 0 ? "up" as const : "down" as const,
      icon: Target,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Track your business performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchAnalyticsData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-12" />
              </CardContent>
            </Card>
          ))
        ) : (
          statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Tabs for Different Chart Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue & Bookings Combo Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Revenue and Bookings Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[350px] w-full" />
                ) : (
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} />
                        <YAxis yAxisId="left" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Bookings" />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", strokeWidth: 2 }} name="Revenue" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Type Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Event Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={eventTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="count"
                          nameKey="eventType"
                          label={({ eventType, percentage }) => `${eventTypeLabels[eventType] || eventType}: ${percentage}%`}
                        >
                          {eventTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name) => [`${value}`, eventTypeLabels[name as string] || name]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Status Donut Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Booking Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="count"
                          nameKey="status"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name) => [`${value}`, name]}
                        />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-lg bg-blue-50">
                    <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                    <p className="text-lg font-semibold text-blue-900">Peak Month</p>
                    <p className="text-2xl font-bold text-blue-600">{getPeakMonth()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50">
                    <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                    <p className="text-lg font-semibold text-green-900">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50">
                    <Calendar className="w-8 h-8 text-purple-600 mb-3" />
                    <p className="text-lg font-semibold text-purple-900">Top Event</p>
                    <p className="text-2xl font-bold text-purple-600">{popularEvent.name}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-50">
                    <Target className="w-8 h-8 text-orange-600 mb-3" />
                    <p className="text-lg font-semibold text-orange-900">Conversion</p>
                    <p className="text-2xl font-bold text-orange-600">{conversionRate.rate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Bookings Bar Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[350px] w-full" />
                ) : (
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        />
                        <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Bookings" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Guest Count Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Count Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={guestDistribution} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis type="number" stroke="#888" fontSize={12} tickLine={false} />
                        <YAxis type="category" dataKey="range" stroke="#888" fontSize={12} tickLine={false} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Events" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Revenue by Month */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Month</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                          formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Messages Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Contact Messages Trend (30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={contactsTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="period" stroke="#888" fontSize={10} tickLine={false} interval="preserveStartEnd" />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorContacts)" name="Messages" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "New", value: stats.contacts.new, color: "bg-blue-500" },
                    { label: "Read", value: stats.contacts.read, color: "bg-green-500" },
                    { label: "Replied", value: stats.contacts.replied, color: "bg-gray-500" },
                    { label: "Archived", value: stats.contacts.archived, color: "bg-yellow-500" }
                  ].map((item, index) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-sm text-gray-500">{item.value}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / (stats.contacts.total || 1)) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Messages Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[250px] w-full" />
                ) : (
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={contactsTrend.slice(-14)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="period" stroke="#888" fontSize={10} tickLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", strokeWidth: 2 }} name="Messages" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics Radial Bar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="20%"
                        outerRadius="90%"
                        data={performanceMetrics}
                        startAngle={180}
                        endAngle={0}
                      >
                        <RadialBar
                          label={{ fill: "#666", position: "insideStart", fontSize: 11 }}
                          background
                          dataKey="value"
                        >
                          {performanceMetrics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </RadialBar>
                        <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
                        <RechartsTooltip />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Target vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="metric" stroke="#888" fontSize={12} tickLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Actual" />
                        <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Inquiries", count: stats.contacts.total, percentage: 100, color: "bg-blue-500" },
                    { stage: "Quotes Sent", count: Math.round(stats.contacts.total * 0.7), percentage: 70, color: "bg-indigo-500" },
                    { stage: "Confirmed", count: stats.bookings.confirmed, percentage: Math.round((stats.bookings.confirmed / (stats.contacts.total || 1)) * 100), color: "bg-green-500" },
                    { stage: "Completed", count: stats.bookings.completed, percentage: Math.round((stats.bookings.completed / (stats.contacts.total || 1)) * 100), color: "bg-teal-500" }
                  ].map((stage, index) => (
                    <motion.div
                      key={stage.stage}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{stage.stage}</span>
                        <span className="text-sm text-gray-500">{stage.count} ({stage.percentage}%)</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`h-full ${stage.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
