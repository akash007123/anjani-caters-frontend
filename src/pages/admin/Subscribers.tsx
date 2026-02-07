import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  RefreshCw,
  Download,
  Mail,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

interface Subscriber {
  _id: string;
  email: string;
  source: string;
  discountCode: string;
  discountUsed: boolean;
  status: string;
  createdAt: string;
}

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/subscribers/subscribers`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setSubscribers(data);
      } else {
        toast.error("Failed to fetch subscribers");
      }
    } catch (error) {
      toast.error("Error fetching subscribers");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.discountCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "unsubscribed":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Unsubscribed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {status}
          </Badge>
        );
    }
  };

  const getDiscountUsedBadge = (used: boolean) => {
    if (used) {
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          Used
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
        Not Used
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = ["Email", "Source", "Discount Code", "Discount Used", "Status", "Subscribed Date"];
    const rows = filteredSubscribers.map((sub) => [
      sub.email,
      sub.source,
      sub.discountCode,
      sub.discountUsed ? "Yes" : "No",
      sub.status,
      formatDate(sub.createdAt)
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `subscribers_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscribers exported successfully");
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Newsletter Subscribers
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and view all newsletter subscribers
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={fetchSubscribers}
            className="flex-1 md:flex-none"
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={exportToCSV}
            className="flex-1 md:flex-none"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Subscribers",
            value: subscribers.length,
            color: "text-gray-900",
            icon: Users
          },
          {
            label: "Active",
            value: subscribers.filter((s) => s.status === "active").length,
            color: "text-green-600",
            icon: CheckCircle
          },
          {
            label: "Unsubscribed",
            value: subscribers.filter((s) => s.status === "unsubscribed").length,
            color: "text-red-600",
            icon: XCircle
          },
          {
            label: "Discount Used",
            value: subscribers.filter((s) => s.discountUsed).length,
            color: "text-purple-600",
            icon: Tag
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <div className={cn("text-2xl font-bold mt-2", stat.color)}>
                      {loading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        stat.value
                      )}
                    </div>
                  </div>
                  {stat.icon && (
                    <div className={cn("p-3 rounded-full", stat.color.replace("text", "bg").replace("-600", "-100"))}>
                      <stat.icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by email, source, or discount code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Subscriber List
          </CardTitle>
          <CardDescription>
            Showing {filteredSubscribers.length} of {subscribers.length} subscribers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden lg:block">
            <Table>
              <TableHeader className="sticky top-0 bg-white dark:bg-gray-950 z-10">
                <TableRow>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Subscribed Date
                    </div>
                  </TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Discount Code</TableHead>
                  <TableHead>Discount Used</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredSubscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No subscribers found
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm ? "Try a different search term" : "No subscribers available yet"}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{subscriber.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(subscriber.createdAt)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{subscriber.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {subscriber.discountCode}
                        </code>
                      </TableCell>
                      <TableCell>{getDiscountUsedBadge(subscriber.discountUsed)}</TableCell>
                      <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile List */}
          <div className="lg:hidden space-y-4">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredSubscribers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No subscribers found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? "Try a different search term" : "No subscribers available yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredSubscribers.map((subscriber) => (
                <Card key={subscriber._id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{subscriber.email}</span>
                        </div>
                        {getStatusBadge(subscriber.status)}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatDate(subscriber.createdAt)}</span>
                        <span className="capitalize">{subscriber.source}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {subscriber.discountCode}
                        </code>
                        {getDiscountUsedBadge(subscriber.discountUsed)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscribers;
