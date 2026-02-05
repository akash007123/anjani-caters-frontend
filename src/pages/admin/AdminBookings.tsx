import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Trash2,
  Search,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Edit,
  CheckCircle,
  AlertCircle,
  X
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Booking {
  _id: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  timeSlot: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  specialRequirements: string;
  status: string;
  createdAt: string;
  notes?: string;
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

const timeSlotLabels: Record<string, string> = {
  morning: "Morning (9AM - 12PM)",
  afternoon: "Afternoon (12PM - 4PM)",
  evening: "Evening (4PM - 8PM)",
  night: "Night (6PM - 11PM)"
};

const budgetLabels: Record<string, string> = {
  "1-3": "₹1 - 3 Lakhs",
  "3-5": "₹3 - 5 Lakhs",
  "5-10": "₹5 - 10 Lakhs",
  "10-20": "₹10 - 20 Lakhs",
  "20+": "₹20+ Lakhs"
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    status: "",
    notes: ""
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/bookings?page=${pagination.page}&limit=${pagination.limit}`
      );
      const data = await response.json();

      if (data.success) {
        setBookings(data.data);
        setPagination((prev) => ({
          ...prev,
          total: data.pagination.total,
          pages: data.pagination.pages
        }));
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      toast.error("Error fetching bookings");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [pagination.page]);

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);

    if (booking.status === "new") {
      updateBookingStatus(booking._id, "read");
    }
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setEditForm({
      status: booking.status,
      notes: booking.notes || ""
    });
    setIsEditModalOpen(true);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleUpdateBooking = async () => {
    if (!editingBooking) return;

    try {
      const response = await fetch(`${API_URL}/bookings/${editingBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Booking updated successfully");
        setIsEditModalOpen(false);
        fetchBookings();
      } else {
        toast.error("Failed to update booking");
      }
    } catch (error) {
      toast.error("Error updating booking");
      console.error("Error:", error);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Booking deleted successfully");
        fetchBookings();
      } else {
        toast.error("Failed to delete booking");
      }
    } catch (error) {
      toast.error("Error deleting booking");
      console.error("Error:", error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm) ||
      eventTypeLabels[booking.eventType]?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; icon: typeof AlertCircle }> = {
      new: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: AlertCircle },
      confirmed: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      "in-progress": { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Clock },
      completed: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: X },
      "no-show": { color: "bg-orange-100 text-orange-800 border-orange-200", icon: AlertCircle }
    };
    return configs[status] || configs.new;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Bookings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage event bookings and reservations
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={fetchBookings}
            className="flex-1 md:flex-none"
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: pagination.total, color: "text-gray-900" },
          {
            label: "New",
            value: bookings.filter((b) => b.status === "new").length,
            color: "text-blue-600",
            icon: AlertCircle
          },
          {
            label: "Confirmed",
            value: bookings.filter((b) => b.status === "confirmed").length,
            color: "text-green-600",
            icon: CheckCircle
          },
          {
            label: "Upcoming",
            value: bookings.filter((b) => new Date(b.eventDate) >= new Date()).length,
            color: "text-purple-600",
            icon: Calendar
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
                    <p className={cn("text-2xl font-bold mt-2", stat.color)}>
                      {loading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        stat.value
                      )}
                    </p>
                  </div>
                  {stat.icon && (
                    <div
                      className={cn(
                        "p-3 rounded-full",
                        stat.color.replace("text", "bg").replace("-600", "-100")
                      )}
                    >
                      <stat.icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name, email, phone, or event type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <Tabs
                value={statusFilter}
                onValueChange={setStatusFilter}
                className="w-full lg:w-auto"
              >
                <TabsList className="flex flex-wrap h-auto">
                  <TabsTrigger value="all" className="flex-1 lg:flex-none">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="new" className="flex-1 lg:flex-none">
                    New
                  </TabsTrigger>
                  <TabsTrigger value="confirmed" className="flex-1 lg:flex-none">
                    Confirmed
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex-1 lg:flex-none">
                    Completed
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Booking List */}
      <div className="lg:hidden">
        <AnimatePresence>
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="mb-4">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try a different search term" : "No bookings available"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => {
              const statusConfig = getStatusConfig(booking.status);
              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card
                    className={cn(
                      "mb-4 cursor-pointer transition-all hover:shadow-md",
                      booking.status === "new" && "border-l-4 border-l-blue-500"
                    )}
                    onClick={() => handleViewBooking(booking)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <h3 className="font-semibold text-gray-900">
                              {booking.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600 truncate">
                              {booking.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">{booking.phone}</p>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {formatDate(booking.eventDate)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {eventTypeLabels[booking.eventType]} - {booking.guestCount} guests
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={statusConfig.color}>
                            {booking.status}
                          </Badge>
                          <p className="text-xs text-gray-400">
                            {formatTimeAgo(booking.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Card>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-white dark:bg-gray-950 z-10">
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No bookings found
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm ? "Try a different search term" : "No bookings available"}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => {
                    const statusConfig = getStatusConfig(booking.status);
                    return (
                      <TableRow
                        key={booking._id}
                        className={cn(
                          "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900",
                          booking.status === "new" && "bg-blue-50 dark:bg-blue-900/10"
                        )}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {eventTypeLabels[booking.eventType]}
                            </p>
                            <p className="text-sm text-gray-500">
                              {timeSlotLabels[booking.timeSlot]}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.name}</p>
                            <p className="text-sm text-gray-500">{booking.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(booking.eventDate)}</TableCell>
                        <TableCell>{booking.guestCount}</TableCell>
                        <TableCell>{budgetLabels[booking.budget] || "-"}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig.color}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatTimeAgo(booking.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewBooking(booking);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditBooking(booking);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBooking(booking._id);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredBookings.length} of {pagination.total} bookings
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 p-4">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge className={getStatusConfig(selectedBooking.status).color}>
                    {selectedBooking.status}
                  </Badge>
                </div>

                {/* Event Details */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold">Event Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Event Type</p>
                      <p className="font-medium">{eventTypeLabels[selectedBooking.eventType]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Guest Count</p>
                      <p className="font-medium">{selectedBooking.guestCount} guests</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(selectedBooking.eventDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time Slot</p>
                      <p className="font-medium">{timeSlotLabels[selectedBooking.timeSlot]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">{budgetLabels[selectedBooking.budget] || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedBooking.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedBooking.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedBooking.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Contact</p>
                      <p className="font-medium capitalize">{selectedBooking.preferredContact}</p>
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                {selectedBooking.specialRequirements && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Special Requirements</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedBooking.specialRequirements}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {selectedBooking.notes && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Internal Notes</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedBooking.notes}
                    </p>
                  </div>
                )}

                {/* Timestamps */}
                <div className="text-xs text-gray-500">
                  <p>Created: {formatDate(selectedBooking.createdAt)}</p>
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            {selectedBooking && (
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  handleEditBooking(selectedBooking);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {editingBooking && (
            <div className="space-y-4 p-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Tabs value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v })}>
                  <TabsList className="flex flex-wrap h-auto">
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Internal Notes</label>
                <textarea
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={4}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  placeholder="Add notes about this booking..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateBooking}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
