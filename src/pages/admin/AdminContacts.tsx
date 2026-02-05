import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Mail,
  User,
  Phone,
  Calendar,
  MessageSquare,
  Archive,
  Reply,
  CheckCircle,
  AlertCircle,
  MoreVertical,
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
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/contacts?page=${pagination.page}&limit=${pagination.limit}`
      );
      const data = await response.json();

      if (data.success) {
        setContacts(data.data);
        setPagination((prev) => ({
          ...prev,
          total: data.pagination.total,
          pages: data.pagination.pages
        }));
      } else {
        toast.error("Failed to fetch contacts");
      }
    } catch (error) {
      toast.error("Error fetching contacts");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [pagination.page]);

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);

    if (contact.status === "new") {
      updateContactStatus(contact._id, "read");
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      fetchContacts();
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Contact deleted successfully");
        fetchContacts();
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      toast.error("Error deleting contact");
      console.error("Error:", error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    const configs = {
      new: {
        variant: "default" as const,
        icon: AlertCircle,
        color: "bg-blue-100 text-blue-800 border-blue-200",
        textColor: "text-blue-600"
      },
      read: {
        variant: "secondary" as const,
        icon: CheckCircle,
        color: "bg-green-100 text-green-800 border-green-200",
        textColor: "text-green-600"
      },
      replied: {
        variant: "outline" as const,
        icon: Reply,
        color: "bg-purple-100 text-purple-800 border-purple-200",
        textColor: "text-purple-600"
      },
      archived: {
        variant: "secondary" as const,
        icon: Archive,
        color: "bg-gray-100 text-gray-800 border-gray-200",
        textColor: "text-gray-600"
      }
    };
    return configs[status as keyof typeof configs] || configs.read;
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
            Contact Messages
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and respond to customer inquiries
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={fetchContacts}
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
          { label: "Total Messages", value: pagination.total, color: "text-gray-900" },
          { 
            label: "New", 
            value: contacts.filter(c => c.status === "new").length,
            color: "text-blue-600",
            icon: AlertCircle
          },
          { 
            label: "Read", 
            value: contacts.filter(c => c.status === "read").length,
            color: "text-green-600",
            icon: CheckCircle
          },
          { 
            label: "Replied", 
            value: contacts.filter(c => c.status === "replied").length,
            color: "text-purple-600",
            icon: Reply
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search contacts..."
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
                  <TabsTrigger value="read" className="flex-1 lg:flex-none">
                    Read
                  </TabsTrigger>
                  <TabsTrigger value="replied" className="flex-1 lg:flex-none">
                    Replied
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Contact List */}
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
          ) : filteredContacts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No contacts found
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try a different search term" : "No contacts available"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredContacts.map((contact) => {
              const statusConfig = getStatusConfig(contact.status);
              return (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card 
                    className={cn(
                      "mb-4 cursor-pointer transition-all hover:shadow-md",
                      contact.status === "new" && "border-l-4 border-l-blue-500"
                    )}
                    onClick={() => handleViewContact(contact)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <h3 className="font-semibold text-gray-900">
                              {contact.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600 truncate">
                              {contact.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {contact.subject}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {contact.message}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={statusConfig.color}>
                            {contact.status}
                          </Badge>
                          <p className="text-xs text-gray-400">
                            {formatTimeAgo(contact.createdAt)}
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
                  <TableHead className="w-[250px]">Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No contacts found
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm ? "Try a different search term" : "No contacts available"}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => {
                    const statusConfig = getStatusConfig(contact.status);
                    const StatusIcon = statusConfig.icon;
                    return (
                      <TableRow 
                        key={contact._id}
                        className={cn(
                          "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900",
                          contact.status === "new" && "bg-blue-50 dark:bg-blue-900/10"
                        )}
                        onClick={() => handleViewContact(contact)}
                      >
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <p className="font-medium">{contact.name}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <p className="text-sm text-gray-500">{contact.email}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <p className="text-sm text-gray-500">{contact.phone}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{contact.subject}</span>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {contact.message}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={statusConfig.variant}
                            className="flex items-center gap-1 w-fit"
                          >
                            <StatusIcon className="w-3 h-3" />
                            {contact.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{formatTimeAgo(contact.createdAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewContact(contact)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateContactStatus(contact._id, "replied")}>
                                <Reply className="w-4 h-4 mr-2" />
                                Mark as Replied
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateContactStatus(contact._id, "archived")}>
                                <Archive className="w-4 h-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteContact(contact._id);
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-gray-500 mb-2 sm:mb-0">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                {pagination.total} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pagination.page === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setPagination((prev) => ({ ...prev, page: pageNum }))}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.pages}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Contact Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg lg:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl">Contact Details</DialogTitle>
                <DialogDescription>
                  View and manage contact information
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedContact && (
            <ScrollArea className="max-h-[70vh] pr-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Header Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
                    <p className="text-gray-500">{selectedContact.email}</p>
                  </div>
                  <Badge className={getStatusConfig(selectedContact.status).color}>
                    {selectedContact.status}
                  </Badge>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="font-medium">{selectedContact.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Subject</label>
                    <p className="font-medium">{selectedContact.subject}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Date Received</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Time Ago</label>
                    <p className="font-medium">{formatTimeAgo(selectedContact.createdAt)}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-sm">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                  <div className="flex flex-wrap gap-2 flex-1">
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[140px]"
                      onClick={() => updateContactStatus(selectedContact._id, "replied")}
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Mark as Replied
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 min-w-[140px]"
                      onClick={() => updateContactStatus(selectedContact._id, "archived")}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteContact(selectedContact._id);
                      setIsModalOpen(false);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </DialogFooter>
              </motion.div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContacts;