import { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, X, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface MenuItem {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

interface CustomBooking {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientMobile: string;
  eventDate: string;
  venue: string;
  venueAddress: string;
  totalAmount: number;
  advanceAmount: number;
  menu: MenuItem[];
  status: string;
  notes?: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CustomBooking = () => {
  const [bookings, setBookings] = useState<CustomBooking[]>([]);
  const token = localStorage.getItem('adminToken');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<CustomBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientMobile: "",
    eventDate: "",
    venue: "",
    venueAddress: "",
    totalAmount: "",
    advanceAmount: "",
    status: "pending",
    notes: "",
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: "", description: "", quantity: 1, unit: "plate" },
  ]);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/custom-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      toast.error("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle menu item changes
  const handleMenuChange = (
    index: number,
    field: keyof MenuItem,
    value: string | number
  ) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index] = { ...newMenuItems[index], [field]: value };
    setMenuItems(newMenuItems);
  };

  // Add new menu item
  const addMenuItem = () => {
    setMenuItems([
      ...menuItems,
      { name: "", description: "", quantity: 1, unit: "plate" },
    ]);
  };

  // Remove menu item
  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      clientName: "",
      clientEmail: "",
      clientMobile: "",
      eventDate: "",
      venue: "",
      venueAddress: "",
      totalAmount: "",
      advanceAmount: "",
      status: "pending",
      notes: "",
    });
    setMenuItems([{ name: "", description: "", quantity: 1, unit: "plate" }]);
    setSelectedBooking(null);
  };

  // Create booking
  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        totalAmount: parseFloat(formData.totalAmount),
        advanceAmount: parseFloat(formData.advanceAmount) || 0,
        menu: menuItems.filter((item) => item.name.trim() !== ""),
      };

      const response = await fetch(`${API_URL}/custom-bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Custom booking created successfully");
        setIsFormOpen(false);
        resetForm();
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to create booking");
      }
    } catch (error) {
      toast.error("Error creating booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update booking
  const handleUpdate = async () => {
    if (!selectedBooking) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        totalAmount: parseFloat(formData.totalAmount),
        advanceAmount: parseFloat(formData.advanceAmount) || 0,
        menu: menuItems.filter((item) => item.name.trim() !== ""),
      };

      const response = await fetch(
        `${API_URL}/custom-bookings/${selectedBooking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Custom booking updated successfully");
        setIsEditOpen(false);
        resetForm();
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to update booking");
      }
    } catch (error) {
      toast.error("Error updating booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete booking
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(`${API_URL}/custom-bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Custom booking deleted successfully");
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to delete booking");
      }
    } catch (error) {
      toast.error("Error deleting booking");
    }
  };

  // Open view modal
  const openView = (booking: CustomBooking) => {
    setSelectedBooking(booking);
    setIsViewOpen(true);
  };

  // Open edit modal
  const openEdit = (booking: CustomBooking) => {
    setSelectedBooking(booking);
    setFormData({
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientMobile: booking.clientMobile,
      eventDate: booking.eventDate.split("T")[0],
      venue: booking.venue,
      venueAddress: booking.venueAddress,
      totalAmount: booking.totalAmount.toString(),
      advanceAmount: booking.advanceAmount.toString(),
      status: booking.status,
      notes: booking.notes || "",
    });
    setMenuItems(
      booking.menu.length > 0
        ? booking.menu
        : [{ name: "", description: "", quantity: 1, unit: "plate" }]
    );
    setIsEditOpen(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Bookings</h1>
          <p className="text-gray-600">Manage your custom event bookings</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Custom Booking
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No custom bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.clientName}</p>
                      <p className="text-sm text-gray-500">
                        {booking.clientEmail}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.clientMobile}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(booking.eventDate)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.venue}</p>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {booking.venueAddress}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {formatCurrency(booking.totalAmount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Advance: {formatCurrency(booking.advanceAmount)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openView(booking)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(booking)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(booking._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Custom Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email *</Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="Enter client email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientMobile">Client Mobile *</Label>
                <Input
                  id="clientMobile"
                  name="clientMobile"
                  value={formData.clientMobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Venue Information */}
            <div className="space-y-2">
              <Label htmlFor="venue">Venue *</Label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="Enter venue name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venueAddress">Venue Address *</Label>
              <Textarea
                id="venueAddress"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleInputChange}
                placeholder="Enter full venue address"
                required
              />
            </div>

            {/* Amount Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount (₹) *</Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  placeholder="Enter total amount"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advanceAmount">Advance Amount (₹)</Label>
                <Input
                  id="advanceAmount"
                  name="advanceAmount"
                  type="number"
                  value={formData.advanceAmount}
                  onChange={handleInputChange}
                  placeholder="Enter advance amount"
                  min="0"
                />
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Menu Items</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMenuItem}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Item
                </Button>
              </div>
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="col-span-4">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) =>
                        handleMenuChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        handleMenuChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) =>
                        handleMenuChange(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      min="1"
                    />
                  </div>
                  <div className="col-span-2 flex gap-1">
                    <Select
                      value={item.unit}
                      onValueChange={(value) =>
                        handleMenuChange(index, "unit", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plate">Plate</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                        <SelectItem value="serve">Serve</SelectItem>
                      </SelectContent>
                    </Select>
                    {menuItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMenuItem(index)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Booking Details
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Client Name
                  </h4>
                  <p className="font-medium">{selectedBooking.clientName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="font-medium">{selectedBooking.clientEmail}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Mobile</h4>
                  <p className="font-medium">{selectedBooking.clientMobile}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Event Date
                  </h4>
                  <p className="font-medium">
                    {formatDate(selectedBooking.eventDate)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Venue</h4>
                <p className="font-medium">{selectedBooking.venue}</p>
                <p className="text-sm text-gray-600">
                  {selectedBooking.venueAddress}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Total Amount
                  </h4>
                  <p className="font-medium text-lg">
                    {formatCurrency(selectedBooking.totalAmount)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Advance Amount
                  </h4>
                  <p className="font-medium text-lg">
                    {formatCurrency(selectedBooking.advanceAmount)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Remaining
                  </h4>
                  <p className="font-medium text-lg">
                    {formatCurrency(
                      selectedBooking.totalAmount - selectedBooking.advanceAmount
                    )}
                  </p>
                </div>
              </div>

              {selectedBooking.menu &&
                selectedBooking.menu.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Menu Items
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <ul className="space-y-2">
                        {selectedBooking.menu.map((item, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span>
                              {item.name}
                              {item.description && (
                                <span className="text-gray-500 ml-1">
                                  - {item.description}
                                </span>
                              )}
                            </span>
                            <span className="text-sm text-gray-600">
                              {item.quantity} {item.unit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                    selectedBooking.status
                  )}`}
                >
                  {selectedBooking.status.charAt(0).toUpperCase() +
                    selectedBooking.status.slice(1)}
                </span>
              </div>

              {selectedBooking.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                  <p className="text-gray-600">{selectedBooking.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Custom Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editClientName">Client Name *</Label>
                <Input
                  id="editClientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientEmail">Client Email *</Label>
                <Input
                  id="editClientEmail"
                  name="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientMobile">Client Mobile *</Label>
                <Input
                  id="editClientMobile"
                  name="clientMobile"
                  value={formData.clientMobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEventDate">Event Date *</Label>
                <Input
                  id="editEventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Venue Information */}
            <div className="space-y-2">
              <Label htmlFor="editVenue">Venue *</Label>
              <Input
                id="editVenue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editVenueAddress">Venue Address *</Label>
              <Textarea
                id="editVenueAddress"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Amount Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editTotalAmount">Total Amount (₹) *</Label>
                <Input
                  id="editTotalAmount"
                  name="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAdvanceAmount">Advance Amount (₹)</Label>
                <Input
                  id="editAdvanceAmount"
                  name="advanceAmount"
                  type="number"
                  value={formData.advanceAmount}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Menu Items</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMenuItem}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Item
                </Button>
              </div>
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="col-span-4">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) =>
                        handleMenuChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        handleMenuChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) =>
                        handleMenuChange(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      min="1"
                    />
                  </div>
                  <div className="col-span-2 flex gap-1">
                    <Select
                      value={item.unit}
                      onValueChange={(value) =>
                        handleMenuChange(index, "unit", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plate">Plate</SelectItem>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                        <SelectItem value="serve">Serve</SelectItem>
                      </SelectContent>
                    </Select>
                    {menuItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMenuItem(index)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="editNotes">Notes</Label>
              <Textarea
                id="editNotes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomBooking;
