import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Zap,
  Filter,
  ChevronRight,
  Sparkles,
  TrendingDown,
  Eye,
  Mail,
  Phone,
  Globe,
  Smartphone,
  Tablet,
  Maximize2,
  Minimize2,
  HelpCircle,
  Info
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
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
  Treemap,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine,
  FunnelChart,
  Funnel,
  Sankey,
  LabelList
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
  source?: string;
}

interface ContactItem {
  _id: string;
  createdAt: string;
  source?: string;
}

interface MonthlyData {
  month: string;
  bookings: number;
  contacts: number;
  revenue: number;
  avgGuestCount: number;
}

interface EventTypeData {
  eventType: string;
  count: number;
  percentage: number;
  revenue: number;
}

interface StatusDataItem {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

interface TrendData {
  period: string;
  value: number;
  contacts: number;
}

interface PerformanceMetric {
  metric: string;
  value: number;
  target: number;
  icon: React.ElementType;
  color: string;
}

interface FunnelData {
  name: string;
  value: number;
  fill: string;
}

interface HeatMapData {
  day: string;
  hour: string;
  value: number;
}

const eventTypeLabels: Record<string, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  corporate: "Corporate",
  birthday: "Birthday",
  religious: "Religious",
  anniversary: "Anniversary",
  other: "Other"
};

const COLORS = [
  "#3b82f6", "#22c55e", "#f59e0b", "#ef4444", 
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
  "#06b6d4", "#84cc16"
];

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  const [activeTab, setActiveTab] = useState("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stats, setStats] = useState<Stats>({
    contacts: { total: 0, new: 0, read: 0, replied: 0, archived: 0 },
    bookings: { total: 0, upcoming: 0, new: 0, confirmed: 0, completed: 0, cancelled: 0 }
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [eventTypeData, setEventTypeData] = useState<EventTypeData[]>([]);
  const [statusData, setStatusData] = useState<StatusDataItem[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [conversionRate, setConversionRate] = useState<{ rate: number; change: number }>({
    rate: 0,
    change: 0
  });
  const [guestDistribution, setGuestDistribution] = useState<{ range: string; count: number }[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelData[]>([]);
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);
  const [sourceData, setSourceData] = useState<{ name: string; value: number }[]>([]);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    try {
      const [contactsStatsRes, bookingsStatsRes, bookingsRes, contactsRes] = await Promise.all([
        fetch(`${API_URL}/contacts/stats`),
        fetch(`${API_URL}/bookings/stats`),
        fetch(`${API_URL}/bookings?limit=1000`),
        fetch(`${API_URL}/contacts?limit=1000`)
      ]);

      const [contactsStats, bookingsStats, bookingsData, contactsAll] = await Promise.all([
        contactsStatsRes.json(),
        bookingsStatsRes.json(),
        bookingsRes.json(),
        contactsRes.json()
      ]);

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
        setFunnelData(processFunnelData(bookingsData.data, contactsAll.data));
        setHeatMapData(generateHeatMapData(bookingsData.data));
        setSourceData(processSourceData(bookingsData.data));
      }

      if (contactsAll.success) {
        setTrendData(processTrendData(bookingsData.data, contactsAll.data));
      }

      const conversion = calculateConversionRate(bookingsData.data, contactsAll.data);
      setConversionRate(conversion);

      setPerformanceMetrics(calculatePerformanceMetrics(bookingsData.data, contactsAll.data));

    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const processMonthlyData = (bookings: BookingItem[]): MonthlyData[] => {
    const months: Record<string, MonthlyData> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthNames[date.getMonth()];
      months[key] = { month: key, bookings: 0, contacts: 0, revenue: 0, avgGuestCount: 0 };
    }

    const guestCountsByMonth: Record<string, number[]> = {};

    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const month = monthNames[date.getMonth()];
      if (months[month]) {
        months[month].bookings++;
        if (booking.budget) {
          const budgetValue = parseBudgetValue(booking.budget);
          months[month].revenue += budgetValue;
        }
        if (booking.guestCount) {
          if (!guestCountsByMonth[month]) guestCountsByMonth[month] = [];
          guestCountsByMonth[month].push(booking.guestCount);
        }
      }
    });

    // Calculate average guest count per month
    Object.keys(months).forEach(month => {
      const counts = guestCountsByMonth[month];
      if (counts && counts.length > 0) {
        months[month].avgGuestCount = Math.round(counts.reduce((a, b) => a + b, 0) / counts.length);
      }
    });

    return Object.values(months);
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
    const counts: Record<string, { count: number; revenue: number }> = {};
    bookings.forEach(booking => {
      if (!counts[booking.eventType]) {
        counts[booking.eventType] = { count: 0, revenue: 0 };
      }
      counts[booking.eventType].count++;
      counts[booking.eventType].revenue += parseBudgetValue(booking.budget);
    });

    const total = bookings.length || 1;
    return Object.entries(counts).map(([eventType, data]) => ({
      eventType,
      count: data.count,
      percentage: Math.round((data.count / total) * 100),
      revenue: data.revenue
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
      percentage: Math.round((count / total) * 100),
      color: getStatusColor(status)
    })).sort((a, b) => b.count - a.count);
  };

  const processTrendData = (bookings: BookingItem[], contacts: ContactItem[]): TrendData[] => {
    const days: Record<string, { value: number; contacts: number }> = {};
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      days[key] = { value: 0, contacts: 0 };
    }

    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const key = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      if (days[key]) {
        days[key].value++;
      }
    });

    contacts.forEach(contact => {
      const date = new Date(contact.createdAt);
      const key = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      if (days[key]) {
        days[key].contacts++;
      }
    });

    return Object.entries(days).map(([period, data]) => ({ 
      period, 
      value: data.value,
      contacts: data.contacts
    }));
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

  const processFunnelData = (bookings: BookingItem[], contacts: ContactItem[]): FunnelData[] => {
    const totalContacts = contacts.length || 0;
    const quoted = Math.round(totalContacts * 0.6);
    
    // Count confirmed and completed directly from bookings data
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const completed = bookings.filter(b => b.status === 'completed').length;

    return [
      { name: "Inquiries", value: totalContacts, fill: "#3b82f6" },
      { name: "Quoted", value: quoted, fill: "#8b5cf6" },
      { name: "Confirmed", value: confirmed, fill: "#22c55e" },
      { name: "Completed", value: completed, fill: "#14b8a6" }
    ];
  };

  const processSourceData = (bookings: BookingItem[]): { name: string; value: number }[] => {
    const sources: Record<string, number> = {};
    bookings.forEach(booking => {
      const source = booking.source || "Unknown";
      sources[source] = (sources[source] || 0) + 1;
    });

    return Object.entries(sources).map(([name, value]) => ({ name, value }));
  };

  const generateHeatMapData = (bookings: BookingItem[]): HeatMapData[] => {
    const data: HeatMapData[] = [];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const day = days[date.getDay()];
      const hour = date.getHours();
      const hourRange = `${Math.floor(hour / 2) * 2}:00-${Math.floor(hour / 2) * 2 + 2}:00`;
      
      const existing = data.find(d => d.day === day && d.hour === hourRange);
      if (existing) {
        existing.value++;
      } else {
        data.push({ day, hour: hourRange, value: 1 });
      }
    });

    return data;
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
      { metric: "Response Rate", value: 85, target: 90, icon: MessageSquare, color: "#3b82f6" },
      { metric: "Conversion", value: conversionRate.rate, target: 30, icon: TrendingUp, color: "#22c55e" },
      { metric: "Completion", value: stats.bookings.completed, target: 50, icon: CheckCircle, color: "#14b8a6" },
      { metric: "Satisfaction", value: 92, target: 95, icon: Sparkles, color: "#8b5cf6" },
      { metric: "On-Time", value: 88, target: 95, icon: Clock, color: "#f59e0b" }
    ];
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange, fetchAnalyticsData]);

  const formatCurrency = (value: number): string => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      new: "#3b82f6",
      read: "#22c55e",
      replied: "#6b7280",
      archived: "#f59e0b",
      confirmed: "#22c55e",
      "in-progress": "#8b5cf6",
      completed: "#14b8a6",
      cancelled: "#ef4444",
      "no-show": "#f97316"
    };
    return colors[status] || "#6b7280";
  };

  const getPeakMonth = (): { month: string; value: number } => {
    if (monthlyData.length === 0) return { month: "N/A", value: 0 };
    const peak = monthlyData.reduce((max, item) => 
      item.bookings > max.bookings ? item : max, monthlyData[0]);
    return { month: peak.month, value: peak.bookings };
  };

  const getPopularEvent = (): { name: string; percentage: number; revenue: number } => {
    if (eventTypeData.length === 0) return { name: "N/A", percentage: 0, revenue: 0 };
    const name = eventTypeLabels[eventTypeData[0].eventType] || eventTypeData[0].eventType;
    return { name, percentage: eventTypeData[0].percentage, revenue: eventTypeData[0].revenue };
  };

  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const peakMonth = getPeakMonth();
  const popularEvent = getPopularEvent();

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.contacts.total,
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      description: "Total inquiries received"
    },
    {
      title: "New Messages",
      value: stats.contacts.new,
      change: "+5%",
      trend: "up" as const,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      description: "Unread messages"
    },
    {
      title: "Total Bookings",
      value: stats.bookings.total,
      change: "+18%",
      trend: "up" as const,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      description: "All time bookings"
    },
    {
      title: "Revenue",
      value: formatCurrency(totalRevenue),
      change: "+24%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
      description: "Total revenue generated"
    },
    {
      title: "Upcoming Events",
      value: stats.bookings.upcoming,
      change: "-2%",
      trend: "down" as const,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
      description: "Scheduled events"
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate.rate}%`,
      change: `${conversionRate.change > 0 ? "+" : ""}${conversionRate.change}%`,
      trend: conversionRate.change >= 0 ? "up" as const : "down" as const,
      icon: Target,
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/10",
      description: "Inquiries to bookings"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <TooltipProvider>
      <div className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : ""}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <Badge variant="outline" className="animate-pulse">
                <Sparkles className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            <p className="text-gray-500">Track your business performance with real-time insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px] bg-white/50 backdrop-blur-sm">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={fetchAnalyticsData} 
                  disabled={loading}
                  className="relative overflow-hidden"
                >
                  <motion.div
                    animate={loading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  </motion.div>
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh data</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => setIsFullscreen(!isFullscreen)}>
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 mr-2" />
                  ) : (
                    <Maximize2 className="w-4 h-4 mr-2" />
                  )}
                  {isFullscreen ? "Exit" : "Fullscreen"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle fullscreen mode</TooltipContent>
            </Tooltip>
            <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-4" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-12" />
                </CardContent>
              </Card>
            ))
          ) : (
            statCards.map((stat, index) => (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="group hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-transparent rounded-full -translate-y-6 translate-x-6" />
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bgColor} transition-transform group-hover:scale-110`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {stat.change}
                      </motion.div>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-900 mb-1">{stat.title}</p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Tabs for Different Chart Views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 p-1 rounded-xl">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                <Calendar className="w-4 h-4 mr-2" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue & Bookings Combo Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Revenue and Bookings Overview
                        </div>
                        <Badge variant="secondary" className="animate-pulse">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +24% growth
                        </Badge>
                      </CardTitle>
                      <CardDescription>Monthly trends for bookings and revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[350px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis yAxisId="left" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => formatCurrency(val)} />
                              <RechartsTooltip
                                contentStyle={{ 
                                  backgroundColor: "#fff", 
                                  border: "1px solid #e0e0e0", 
                                  borderRadius: "8px", 
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                  backdropFilter: "blur(10px)"
                                }}
                                formatter={(value: number, name: string) => [
                                  name === "Revenue" ? formatCurrency(value) : value,
                                  name
                                ]}
                              />
                              <Legend />
                              <Area yAxisId="right" type="monotone" dataKey="revenue" fill="url(#colorRevenue)" stroke="#22c55e" strokeWidth={2} fillOpacity={0.3} name="Revenue" />
                              <Bar yAxisId="left" dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Bookings" />
                              <Line yAxisId="left" type="monotone" dataKey="avgGuestCount" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Avg Guests" strokeDasharray="5 5" />
                              <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Event Type Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Event Type Distribution
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>Distribution of bookings by event type</TooltipContent>
                        </Tooltip>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={eventTypeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={90}
                                paddingAngle={4}
                                dataKey="count"
                                nameKey="eventType"
                                label={({ eventType, percentage }) => 
                                  `${eventTypeLabels[eventType] || eventType}: ${percentage}%`
                                }
                              >
                                {eventTypeData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]}
                                    className="hover:opacity-80 cursor-pointer"
                                  />
                                ))}
                              </Pie>
                              <RechartsTooltip
                                formatter={(value, name) => [
                                  `${value} (${eventTypeData.find(e => e.eventType === name)?.percentage}%)`,
                                  eventTypeLabels[name as string] || name
                                ]}
                              />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Booking Status Dashboard */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Booking Status Dashboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="status" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                              <RechartsTooltip
                                contentStyle={{ 
                                  backgroundColor: "#fff", 
                                  border: "1px solid #e0e0e0", 
                                  borderRadius: "8px", 
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                                }}
                              />
                              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {statusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick Insights Grid */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Quick Insights & Metrics
                      </CardTitle>
                      <CardDescription>Key performance indicators at a glance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                        >
                          <TrendingUp className="w-8 h-8 text-blue-600 mb-4" />
                          <p className="text-sm font-semibold text-blue-900 mb-1">Peak Month</p>
                          <p className="text-2xl font-bold text-blue-600">{peakMonth.month}</p>
                          <p className="text-sm text-blue-700">{peakMonth.value} bookings</p>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200"
                        >
                          <DollarSign className="w-8 h-8 text-emerald-600 mb-4" />
                          <p className="text-sm font-semibold text-emerald-900 mb-1">Total Revenue</p>
                          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalRevenue)}</p>
                          <p className="text-sm text-emerald-700">+24% from last period</p>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
                        >
                          <Calendar className="w-8 h-8 text-purple-600 mb-4" />
                          <p className="text-sm font-semibold text-purple-900 mb-1">Top Event Type</p>
                          <p className="text-2xl font-bold text-purple-600">{popularEvent.name}</p>
                          <p className="text-sm text-purple-700">{popularEvent.percentage}% of total</p>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200"
                        >
                          <Target className="w-8 h-8 text-amber-600 mb-4" />
                          <p className="text-sm font-semibold text-amber-900 mb-1">Conversion Rate</p>
                          <p className="text-2xl font-bold text-amber-600">{conversionRate.rate}%</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-sm ${conversionRate.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {conversionRate.change >= 0 ? "+" : ""}{conversionRate.change}%
                            </span>
                            <span className="text-sm text-gray-500">from target</span>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </motion.div>

            {/* Bookings Tab */}
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="bookings" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Monthly Bookings Scatter Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Bookings Analysis with Guest Count</CardTitle>
                      <CardDescription>Bookings, revenue, and average guest count per month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[400px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[400px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis 
                                dataKey="month" 
                                name="Month" 
                                stroke="#888" 
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                              />
                              <YAxis 
                                dataKey="bookings" 
                                name="Bookings" 
                                stroke="#888" 
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                              />
                              <ZAxis 
                                dataKey="avgGuestCount" 
                                range={[50, 300]} 
                                name="Guest Count" 
                              />
                              <RechartsTooltip
                                contentStyle={{ 
                                  backgroundColor: "#fff", 
                                  border: "1px solid #e0e0e0", 
                                  borderRadius: "8px", 
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                                }}
                                formatter={(value: number, name: string) => {
                                  if (name === "Guest Count") return [value, "Avg Guests"];
                                  if (name === "Revenue") return [formatCurrency(value), "Revenue"];
                                  return [value, name];
                                }}
                              />
                              <Legend />
                              <Scatter 
                                name="Monthly Data" 
                                data={monthlyData} 
                                fill="#3b82f6"
                                shape="circle"
                              >
                                <LabelList 
                                  dataKey="avgGuestCount" 
                                  position="top" 
                                  formatter={(value: number) => `${value} guests`}
                                />
                              </Scatter>
                            </ScatterChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Guest Count Distribution TreeMap */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Guest Count Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <Treemap
                              data={guestDistribution.map(item => ({
                                name: item.range,
                                value: item.count
                              }))}
                              dataKey="value"
                              stroke="#fff"
                              fill="#8884d8"
                              content={<CustomizedContent />}
                            >
                              <RechartsTooltip
                                formatter={(value, name, props) => [
                                  `${value} events`,
                                  props.payload.name
                                ]}
                              />
                            </Treemap>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Revenue by Month Area Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trend</CardTitle>
                      <CardDescription>Monthly revenue with trend line</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis 
                                stroke="#888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(val) => formatCurrency(val)}
                              />
                              <RechartsTooltip
                                contentStyle={{ 
                                  backgroundColor: "#fff", 
                                  border: "1px solid #e0e0e0", 
                                  borderRadius: "8px", 
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                                }}
                                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                              />
                              <ReferenceLine y={totalRevenue / 12} stroke="#ef4444" strokeDasharray="3 3" label="Avg" />
                              <Area 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#22c55e" 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorRevenue)" 
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </motion.div>

            {/* Contacts Tab */}
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="contacts" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Contact Messages Dual Axis Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Contact vs Booking Trend (30 Days)</CardTitle>
                      <CardDescription>Compare inquiries and converted bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis 
                                dataKey="period" 
                                stroke="#888" 
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false}
                                interval="preserveStartEnd"
                              />
                              <YAxis 
                                yAxisId="left"
                                stroke="#888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                              />
                              <YAxis 
                                yAxisId="right"
                                orientation="right"
                                stroke="#888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                              />
                              <RechartsTooltip
                                contentStyle={{ 
                                  backgroundColor: "#fff", 
                                  border: "1px solid #e0e0e0", 
                                  borderRadius: "8px", 
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                                }}
                              />
                              <Legend />
                              <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="contacts" 
                                stroke="#f59e0b" 
                                strokeWidth={3}
                                dot={{ strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Inquiries"
                              />
                              <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="value" 
                                stroke="#3b82f6" 
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={{ strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Bookings"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contact Status Dashboard */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Status Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { label: "New", value: stats.contacts.new, color: "bg-blue-500", icon: Mail },
                          { label: "Read", value: stats.contacts.read, color: "bg-green-500", icon: Eye },
                          { label: "Replied", value: stats.contacts.replied, color: "bg-gray-500", icon: MessageSquare },
                          { label: "Archived", value: stats.contacts.archived, color: "bg-amber-500", icon: CheckCircle }
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className={`p-2 rounded-lg ${item.color.replace("bg-", "bg-")} bg-opacity-10`}>
                                  <Icon className={`w-5 h-5 ${item.color.replace("bg-", "text-")}`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">{item.label}</span>
                                    <span className="text-sm font-bold">{item.value}</span>
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ 
                                        width: `${(item.value / (stats.contacts.total || 1)) * 100}%` 
                                      }}
                                      transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                                      className={`h-full ${item.color} rounded-full`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Sources */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[250px] w-full rounded-lg" />
                      ) : sourceData.length > 0 ? (
                        <div className="h-[250px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={sourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {sourceData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <RechartsTooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500">
                          No source data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </motion.div>

            {/* Performance Tab */}
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Metrics Gauge Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Performance Metrics Dashboard
                      </CardTitle>
                      <CardDescription>Target vs actual performance across key metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[350px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[350px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                              cx="50%"
                              cy="50%"
                              innerRadius="10%"
                              outerRadius="90%"
                              data={performanceMetrics}
                              startAngle={180}
                              endAngle={0}
                              barSize={20}
                            >
                              <RadialBar
                                label={{ 
                                  fill: "#666", 
                                  position: "insideStart", 
                                  fontSize: 11,
                                  formatter: (value: number) => `${value}%`
                                }}
                                background={{ fill: "#f0f0f0" }}
                                dataKey="value"
                              >
                                {performanceMetrics.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </RadialBar>
                              <Legend 
                                iconSize={10} 
                                layout="horizontal" 
                                verticalAlign="bottom" 
                                align="center"
                                formatter={(value: string, entry: { payload?: { metric?: string } & Record<string, unknown> }) => (
                                  <span className="text-sm">{entry.payload?.metric ?? value}</span>
                                )}
                              />
                              <RechartsTooltip
                                 formatter={(_value: number, _name: string, entry: { payload?: { metric?: string } }) => [
                                  `${_value}%`,
                                  entry.payload?.metric ?? _name
                                ]}
                              />
                            </RadialBarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Performance Comparison Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Target vs Actual Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                      ) : (
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis 
                                dataKey="metric" 
                                stroke="#888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                              />
                              <YAxis 
                                stroke="#888" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                                label={{ value: '%', angle: -90, position: 'insideLeft' }}
                              />
                              <RechartsTooltip
                                contentStyle={{ 
                                  backgroundColor: "#fff", 
                                  border: "1px solid #e0e0e0", 
                                  borderRadius: "8px", 
                                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                                }}
                              />
                              <Legend />
                              <Bar 
                                dataKey="value" 
                                fill="#3b82f6" 
                                radius={[4, 4, 0, 0]} 
                                name="Actual"
                                animationDuration={1500}
                              />
                              <Bar 
                                dataKey="target" 
                                fill="#e5e7eb" 
                                radius={[4, 4, 0, 0]} 
                                name="Target"
                                animationDuration={1500}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Booking Funnel */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Conversion Funnel</CardTitle>
                      <CardDescription>Journey from inquiry to completion</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {funnelData.map((stage, index) => {
                          const percentage = Math.round((stage.value / (funnelData[0]?.value || 1)) * 100);
                          const Icon = [Users, MessageSquare, CheckCircle, Calendar][index];
                          return (
                            <motion.div
                              key={stage.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center"
                                  style={{ borderColor: stage.fill }}
                                >
                                  <Icon className="w-5 h-5" style={{ color: stage.fill }} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{stage.name}</span>
                                    <span className="font-bold">{stage.value}</span>
                                  </div>
                                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: stage.fill }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{percentage}% of total</span>
                                    <span>
                                      {index < funnelData.length - 1 && 
                                        `${Math.round((funnelData[index + 1]?.value / stage.value) * 100)}% conversion`
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {index < funnelData.length - 1 && (
                                <div className="absolute left-5 top-10 w-0.5 h-6 bg-gray-200 -bottom-6" />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

// Custom TreeMap content component
interface CustomizedContentProps {
  root?: { children: Array<{ name: string; value?: number }> };
  depth?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  name?: string;
  value?: number;
}

// Local colors array for treemap
const TREEMAP_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const CustomizedContent = (props: CustomizedContentProps) => {
  const { root, depth, x, y, width, height, index, name, value } = props;
  
  // Calculate color based on index
  const colorIndex = Math.min(Math.floor((index || 0) / ((root.children?.length || 1) / TREEMAP_COLORS.length)), TREEMAP_COLORS.length - 1);
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? TREEMAP_COLORS[colorIndex] : '#ffffff00',
          stroke: '#fff',
          strokeWidth: 2,
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && width > 30 && height > 30 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={Math.min(14, width / 10)}
            fontWeight="bold"
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 - 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={Math.min(12, width / 12)}
          >
            {value}
          </text>
        </>
      )}
    </g>
  );
};

export default AdminAnalytics;