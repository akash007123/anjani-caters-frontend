import React, { useState, useEffect, useCallback } from "react";
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
  IndianRupee,
  HelpCircle,
  Info,
  Utensils,
  ShoppingCart
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

interface CustomBookingItem {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientMobile: string;
  eventDate: string;
  venue: string;
  totalAmount: number;
  advanceAmount: number;
  status: string;
  menu: { name: string; quantity: number }[];
  createdAt: string;
}

interface CustomBookingStats {
  total: number;
  pending: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}

interface CustomBookingMonthlyData {
  month: string;
  bookings: number;
  revenue: number;
}

interface CustomBookingStatusData {
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

// Custom Polar Area Chart Component using SVG
interface PolarAreaChartProps {
  data: StatusDataItem[];
}

const PolarAreaChartComponent: React.FC<PolarAreaChartProps> = ({ data }) => {
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  
  if (!data || data.length === 0) {
    return (
      <svg width="300" height="300" viewBox="0 0 300 300">
        <text x="150" y="150" textAnchor="middle" fill="#888" fontSize="14">
          No data available
        </text>
      </svg>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count));
  const angleStep = (2 * Math.PI) / data.length;
  const startAngle = -Math.PI / 2; // Start from top

  const renderSector = (index: number) => {
    const item = data[index];
    const radius = (item.count / maxCount) * maxRadius;
    const startAngleRad = startAngle + index * angleStep;
    const endAngleRad = startAngle + (index + 1) * angleStep;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const x1Inner = centerX + 0 * Math.cos(startAngleRad);
    const y1Inner = centerY + 0 * Math.sin(startAngleRad);
    const x2Inner = centerX + 0 * Math.cos(endAngleRad);
    const y2Inner = centerY + 0 * Math.sin(endAngleRad);

    const largeArcFlag = angleStep > Math.PI ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x2Inner} ${y2Inner}`,
      `A 0 0 0 0 1 ${x1Inner} ${y1Inner}`,
      `Z`
    ].join(" ");

    return (
      <g key={index}>
        <path
          d={pathData}
          fill={item.color}
          stroke="#fff"
          strokeWidth="2"
          opacity="0.85"
          style={{ transition: "opacity 0.2s" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.85";
          }}
        />
        {/* Label */}
        {radius > 30 && (
          <text
            x={centerX + (radius * 0.7) * Math.cos(startAngleRad + angleStep / 2)}
            y={centerY + (radius * 0.7) * Math.sin(startAngleRad + angleStep / 2)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize="11"
            fontWeight="bold"
          >
            {item.count}
          </text>
        )}
      </g>
    );
  };

  return (
    <svg width="300" height="300" viewBox="0 0 300 300">
      {/* Background circle */}
      <circle cx={centerX} cy={centerY} r={maxRadius} fill="#f8f9fa" stroke="#e0e0e0" strokeWidth="1" />
      
      {/* Sectors */}
      {data.map((_, index) => renderSector(index))}
      
      {/* Center circle for donut effect */}
      <circle cx={centerX} cy={centerY} r="30" fill="#fff" />
      <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#666">
        {data.reduce((sum, d) => sum + d.count, 0)}
      </text>
      
      {/* Legend */}
      <g transform="translate(240, 20)">
        {data.map((item, index) => (
          <g key={index} transform={`translate(0, ${index * 20})`}>
            <rect width="12" height="12" fill={item.color} rx="2" />
            <text x="18" y="10" fontSize="10" fill="#666">
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

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
  const [customBookings, setCustomBookings] = useState<CustomBookingItem[]>([]);
  const [customBookingStats, setCustomBookingStats] = useState<CustomBookingStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0
  });
  const [customBookingMonthlyData, setCustomBookingMonthlyData] = useState<CustomBookingMonthlyData[]>([]);
  const [customBookingStatusData, setCustomBookingStatusData] = useState<CustomBookingStatusData[]>([]);
  const [customBookingRevenueData, setCustomBookingRevenueData] = useState<{ name: string; value: number }[]>([]);
  const token = localStorage.getItem('adminToken');

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    try {
      const [contactsStatsRes, bookingsStatsRes, bookingsRes, contactsRes, customBookingsRes] = await Promise.all([
        fetch(`${API_URL}/contacts/stats`, { headers: getAuthHeaders() }),
        fetch(`${API_URL}/bookings/stats`, { headers: getAuthHeaders() }),
        fetch(`${API_URL}/bookings?limit=1000`, { headers: getAuthHeaders() }),
        fetch(`${API_URL}/contacts?limit=1000`, { headers: getAuthHeaders() }),
        fetch(`${API_URL}/custom-bookings?limit=1000`, { headers: getAuthHeaders() })
      ]);

      const [contactsStats, bookingsStats, bookingsData, contactsAll, customBookingsData] = await Promise.all([
        contactsStatsRes.json(),
        bookingsStatsRes.json(),
        bookingsRes.json(),
        contactsRes.json(),
        customBookingsRes.json()
      ]);

      // Process custom bookings data
      if (customBookingsData.success) {
        const customBookings = customBookingsData.data || [];
        setCustomBookings(customBookings);
        
        // Calculate custom booking stats
        const stats: CustomBookingStats = {
          total: customBookings.length,
          pending: customBookings.filter((b: CustomBookingItem) => b.status === 'pending').length,
          confirmed: customBookings.filter((b: CustomBookingItem) => b.status === 'confirmed').length,
          inProgress: customBookings.filter((b: CustomBookingItem) => b.status === 'in-progress').length,
          completed: customBookings.filter((b: CustomBookingItem) => b.status === 'completed').length,
          cancelled: customBookings.filter((b: CustomBookingItem) => b.status === 'cancelled').length
        };
        setCustomBookingStats(stats);
        
        // Process monthly data for custom bookings
        setCustomBookingMonthlyData(processCustomBookingMonthlyData(customBookings));
        
        // Process status data for custom bookings
        setCustomBookingStatusData(processCustomBookingStatusData(customBookings));
        
        // Process revenue data
        const revenueByStatus = [
          { name: 'Pending', value: customBookings.filter((b: CustomBookingItem) => b.status === 'pending').reduce((sum: number, b: CustomBookingItem) => sum + b.totalAmount, 0) },
          { name: 'Confirmed', value: customBookings.filter((b: CustomBookingItem) => b.status === 'confirmed').reduce((sum: number, b: CustomBookingItem) => sum + b.totalAmount, 0) },
          { name: 'In Progress', value: customBookings.filter((b: CustomBookingItem) => b.status === 'in-progress').reduce((sum: number, b: CustomBookingItem) => sum + b.totalAmount, 0) },
          { name: 'Completed', value: customBookings.filter((b: CustomBookingItem) => b.status === 'completed').reduce((sum: number, b: CustomBookingItem) => sum + b.totalAmount, 0) }
        ];
        setCustomBookingRevenueData(revenueByStatus);
      }

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

  // Custom Booking Processing Functions
  function processCustomBookingMonthlyData(bookings: CustomBookingItem[]): CustomBookingMonthlyData[] {
    const months: Record<string, CustomBookingMonthlyData> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthNames[date.getMonth()];
      months[key] = { month: key, bookings: 0, revenue: 0 };
    }

    bookings.forEach(booking => {
      const date = new Date(booking.createdAt);
      const month = monthNames[date.getMonth()];
      if (months[month]) {
        months[month].bookings++;
        months[month].revenue += booking.totalAmount || 0;
      }
    });

    return Object.values(months);
  }

  function processCustomBookingStatusData(bookings: CustomBookingItem[]): CustomBookingStatusData[] {
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
  }

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
      pending: "#f59e0b",
      confirmed: "#22c55e",
      completed: "#14b8a6",
      cancelled: "#ef4444",
      in_progress: "#8b5cf6"
    };
    return colors[status.toLowerCase()] || "#6b7280";
  };

  const getStatusBadgeStyle = (status: string): string => {
    const styles: Record<string, string> = {
      new: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      confirmed: "bg-green-100 text-green-800 hover:bg-green-200",
      completed: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      in_progress: "bg-purple-100 text-purple-800 hover:bg-purple-200"
    };
    return styles[status.toLowerCase()] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  // Calculate summary statistics
  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const peakMonthData = monthlyData.length > 0 ? monthlyData.reduce((max, d) => d.bookings > max.bookings ? d : max, monthlyData[0]) : null;
  const peakMonth = peakMonthData ? { month: peakMonthData.month, value: peakMonthData.bookings } : { month: "N/A", value: 0 };
  const popularEvent = eventTypeData.length > 0 ? { name: eventTypeLabels[eventTypeData[0].eventType] || eventTypeData[0].eventType, percentage: eventTypeData[0].percentage } : { name: "N/A", percentage: 0 };

  const CustomizedContent = (props: { root?: unknown; depth?: number; x?: number; y?: number; width?: number; height?: number; index?: number; name?: string; value?: number }) => {
    const { root, depth, x, y, width, height, index, name, value } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: COLORS[index % COLORS.length],
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1),
            strokeOpacity: 1 / (depth + 1),
          }}
        />
        {width > 50 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={14}
            fontWeight={500}
          >
            {name}
          </text>
        )}
        {width > 50 && height > 50 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 18}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={12}
          >
            {value}
          </text>
        )}
      </g>
    );
  };

  const totalBookings = statusData.reduce((sum, item) => sum + item.count, 0);
  const newBookings = stats.bookings.new || 0;
  const confirmedBookings = stats.bookings.confirmed || 0;
  const completedBookings = stats.bookings.completed || 0;
  const cancelledBookings = stats.bookings.cancelled || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
            <p className="text-slate-600">Track your business performance and key metrics</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchAnalyticsData} variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600">Total Bookings</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.bookings.total}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+12%</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <IndianRupee className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+8%</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">New Contacts</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.contacts.new}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+5%</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm text-slate-600">Confirmed</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{confirmedBookings}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+15%</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Activity className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="text-sm text-slate-600">Conversion</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{conversionRate.rate}%</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+{conversionRate.change}%</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-slate-600">Pending</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.bookings.upcoming}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">-3%</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Utensils className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Custom</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{customBookingStats.total}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+18%</span>
            </div>
          </motion.div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white shadow-sm border border-slate-200 p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 px-6 py-3">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 px-6 py-3">
              <Calendar className="w-4 h-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="custom-bookings" className="flex items-center gap-2 px-6 py-3">
              <Utensils className="w-4 h-4" />
              Custom Bookings
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2 px-6 py-3">
              <Users className="w-4 h-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

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
                {/* Monthly Trend Area Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Monthly Bookings & Contacts Trend
                    </CardTitle>
                    <CardDescription>Track bookings and contact inquiries over the past 12 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <defs>
                              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                            />
                            <Legend />
                            <Area 
                              type="monotone" 
                              dataKey="bookings" 
                              stroke="#3b82f6" 
                              strokeWidth={3} 
                              fillOpacity={1} 
                              fill="url(#colorBookings)" 
                              name="Bookings"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="contacts" 
                              stroke="#8b5cf6" 
                              strokeWidth={3} 
                              fillOpacity={1} 
                              fill="url(#colorContacts)" 
                              name="Contacts"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Booking Status Distribution Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Booking Status Distribution
                    </CardTitle>
                    <CardDescription>Breakdown of bookings by current status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number, name: string) => [value, name]}
                            />
                            <Legend />
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="count"
                              nameKey="status"
                              label={({ status, percentage }) => `${status}: ${percentage}%`}
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Event Type Distribution Bar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Event Type Distribution
                    </CardTitle>
                    <CardDescription>Popularity of different event types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={eventTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="eventType" 
                              stroke="#888" 
                              fontSize={11} 
                              tickLine={false} 
                              axisLine={false} 
                              tickFormatter={(val) => eventTypeLabels[val] || val}
                            />
                            <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number, name: string) => [value, name === "count" ? "Bookings" : name]}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                              {eventTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Conversion Funnel */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Booking Conversion Funnel
                    </CardTitle>
                    <CardDescription>Track how inquiries convert to completed bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <FunnelChart>
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number, name: string) => [value, name]}
                            />
                            <Funnel
                              dataKey="value"
                              data={funnelData}
                              isAnimationActive
                            >
                              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                            </Funnel>
                          </FunnelChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>Key performance indicators with targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                      {performanceMetrics.map((metric, index) => (
                        <motion.div
                          key={metric.metric}
                          whileHover={{ scale: 1.05 }}
                          className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                            <span className="text-2xl font-bold" style={{ color: metric.color }}>
                              {metric.value}%
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-slate-700 mb-2">{metric.metric}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                            <span>Target: {metric.target}%</span>
                            <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(metric.value / metric.target) * 100} 
                            max={100}
                            className="h-2"
                            style={{ 
                              '--progress-fill': metric.color,
                            } as React.CSSProperties}
                          />
                        </motion.div>
                      ))}
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

                {/* Booking Status Bar Chart */}
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

                {/* Polar Area Chart - Booking Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Polar Area Chart - Bookings by Status
                    </CardTitle>
                    <CardDescription>Visualizing booking status distribution with polar area chart</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full flex justify-center items-center">
                        <PolarAreaChartComponent data={statusData} />
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
                        <CheckCircle className="w-8 h-8 text-amber-600 mb-4" />
                        <p className="text-sm font-semibold text-amber-900 mb-1">Completion Rate</p>
                        <p className="text-2xl font-bold text-amber-600">
                          {totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0}%
                        </p>
                        <p className="text-sm text-amber-700">{completedBookings} completed</p>
                      </motion.div>
                    </div>
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
                              stroke="#8b5cf6" 
                              strokeWidth={3}
                              dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                              name="Contacts"
                            />
                            <Line 
                              yAxisId="right"
                              type="monotone" 
                              dataKey="value" 
                              stroke="#3b82f6" 
                              strokeWidth={3}
                              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                              name="Bookings"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Source Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Booking Sources
                    </CardTitle>
                    <CardDescription>Where your bookings are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number, name: string) => [value, name]}
                            />
                            <Legend />
                            <Pie
                              data={sourceData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {sourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Status Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Contact Status Overview
                    </CardTitle>
                    <CardDescription>Breakdown of contact message statuses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">New Messages</span>
                            <span className="font-semibold text-blue-600">{stats.contacts.new}</span>
                          </div>
                          <Progress value={(stats.contacts.new / (stats.contacts.total || 1)) * 100} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Read</span>
                            <span className="font-semibold text-green-600">{stats.contacts.read}</span>
                          </div>
                          <Progress value={(stats.contacts.read / (stats.contacts.total || 1)) * 100} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Replied</span>
                            <span className="font-semibold text-purple-600">{stats.contacts.replied}</span>
                          </div>
                          <Progress value={(stats.contacts.replied / (stats.contacts.total || 1)) * 100} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Archived</span>
                            <span className="font-semibold text-slate-600">{stats.contacts.archived}</span>
                          </div>
                          <Progress value={(stats.contacts.archived / (stats.contacts.total || 1)) * 100} className="h-2" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Source Horizontal Bar */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Device & Traffic Sources
                    </CardTitle>
                    <CardDescription>Analyze how users are reaching you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[200px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={[
                              { source: "Mobile", value: 45 },
                              { source: "Desktop", value: 35 },
                              { source: "Tablet", value: 20 }
                            ]}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis 
                              type="category" 
                              dataKey="source" 
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
                              formatter={(value: number) => [`${value}%`, "Traffic"]}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                              <Cell fill="#3b82f6" />
                              <Cell fill="#22c55e" />
                              <Cell fill="#f59e0b" />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Heat Map */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Booking Activity Heatmap
                    </CardTitle>
                    <CardDescription>When are bookings most frequently created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full overflow-auto">
                        <div className="min-w-[600px]">
                          <div className="grid grid-cols-[80px_repeat(12,1fr)] gap-1">
                            <div className="text-xs text-slate-500 font-medium">Day</div>
                            {Array.from({ length: 12 }, (_, i) => (
                              <div key={i} className="text-xs text-slate-500 font-medium text-center">
                                {i * 2}:00
                              </div>
                            ))}
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                              <React.Fragment key={day}>
                                <div className="text-xs text-slate-500 font-medium py-2">{day}</div>
                                {Array.from({ length: 12 }, (_, hourIdx) => {
                                  const hourRange = `${hourIdx * 2}:00-${hourIdx * 2 + 2}:00`;
                                  const dataPoint = heatMapData.find(d => d.day === day && d.hour === hourRange);
                                  const value = dataPoint?.value || 0;
                                  const maxValue = Math.max(...heatMapData.map(d => d.value), 1);
                                  const intensity = value / maxValue;
                                  const bgColor = `rgba(59, 130, 246, ${intensity * 0.8 + 0.1})`;
                                  
                                  return (
                                    <TooltipProvider key={`${day}-${hourIdx}`}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div 
                                            className="h-8 rounded transition-all hover:scale-110 cursor-pointer"
                                            style={{ backgroundColor: bgColor }}
                                          />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="font-medium">{day} {hourRange}</p>
                                          <p className="text-sm text-slate-500">{value} bookings</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  );
                                })}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Radial Progress */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Contact Engagement Radial
                    </CardTitle>
                    <CardDescription>Visualize overall contact engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart 
                            data={[
                              { name: "New", value: stats.contacts.new, fill: "#3b82f6" },
                              { name: "Read", value: stats.contacts.read, fill: "#22c55e" },
                              { name: "Replied", value: stats.contacts.replied, fill: "#8b5cf6" },
                              { name: "Archived", value: stats.contacts.archived, fill: "#6b7280" }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius="20%"
                            outerRadius="90%"
                            startAngle={180}
                            endAngle={0}
                            barSize={30}
                          >
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number, name: string) => [value, name]}
                            />
                            <Legend 
                              iconSize={10} 
                              layout="horizontal" 
                              verticalAlign="bottom" 
                              align="center"
                              wrapperStyle={{ paddingTop: "20px" }}
                            />
                            <RadialBar 
                              dataKey="value" 
                              cornerRadius={10} 
                              background={{ fill: '#f0f0f0' }}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </motion.div>

          {/* Custom Bookings Tab */}
          <motion.div
            key="custom-bookings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="custom-bookings" className="space-y-6">
              {/* Custom Booking KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Utensils className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-slate-600">Total Custom</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{customBookingStats.total}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="text-sm text-slate-600">Pending</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{customBookingStats.pending}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm text-slate-600">Confirmed</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{customBookingStats.confirmed}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm text-slate-600">In Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{customBookingStats.inProgress}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <IndianRupee className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="text-sm text-slate-600">Completed</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{customBookingStats.completed}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-sm text-slate-600">Cancelled</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{customBookingStats.cancelled}</p>
                </motion.div>
              </div>

              {/* Custom Booking Graphs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Custom Bookings Trend */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Custom Bookings & Revenue Trend
                    </CardTitle>
                    <CardDescription>Track custom booking orders and revenue over the past 12 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={customBookingMonthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <defs>
                              <linearGradient id="colorCustomBookings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorCustomRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value)} />
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number, name: string) => [name === 'revenue' ? formatCurrency(value) : value, name === 'bookings' ? 'Bookings' : 'Revenue']}
                            />
                            <Legend />
                            <Area 
                              yAxisId="left"
                              type="monotone" 
                              dataKey="bookings" 
                              stroke="#8b5cf6" 
                              strokeWidth={3} 
                              fillOpacity={1} 
                              fill="url(#colorCustomBookings)" 
                              name="Bookings"
                            />
                            <Line
                              yAxisId="right"
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="#22c55e" 
                              strokeWidth={3} 
                              dot={{ fill: '#22c55e', strokeWidth: 2 }}
                              name="Revenue"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Custom Booking Status Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Custom Booking Status
                    </CardTitle>
                    <CardDescription>Breakdown of custom bookings by current status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number, name: string) => [value, name]}
                            />
                            <Legend />
                            <Pie
                              data={customBookingStatusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="count"
                              nameKey="status"
                              label={({ status, percentage }) => `${status}: ${percentage}%`}
                            >
                              {customBookingStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Custom Booking Revenue by Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5" />
                      Revenue by Status
                    </CardTitle>
                    <CardDescription>Revenue generated from custom bookings by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={customBookingRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="name" 
                              stroke="#888" 
                              fontSize={11} 
                              tickLine={false} 
                              axisLine={false} 
                            />
                            <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value)} />
                            <RechartsTooltip
                              contentStyle={{ 
                                backgroundColor: "#fff", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: "8px", 
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
                              }}
                              formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {customBookingRevenueData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Custom Booking Status Polar Area Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Custom Booking Status Overview
                    </CardTitle>
                    <CardDescription>Visual overview of all custom booking statuses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[350px] w-full rounded-lg" />
                    ) : (
                      <div className="h-[350px] w-full flex justify-center">
                        <PolarAreaChartComponent data={customBookingStatusData} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
