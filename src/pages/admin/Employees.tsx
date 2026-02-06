import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Upload,
  X,
  FileText,
  Loader2,
  Search,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

// Department and Role mapping
const departmentRoles: Record<string, string[]> = {
  Management: ["Owner / Founder", "Event Manager", "Operations Manager"],
  "Catering (Kitchen)": [
    "Head / Executive Chef",
    "Sous / Assistant Chef",
    "Kitchen Supervisor",
    "Kitchen Helpers",
  ],
  "Food Service": [
    "Catering Supervisor",
    "Service Staff / Waiters",
    "Bartender (Optional)",
  ],
  "Event Setup & Decor": [
    "Decor Manager / Supervisor",
    "Decor & Setup Staff",
  ],
  Logistics: ["Logistics Manager", "Storekeeper", "Driver"],
  "Sales & Client Handling": ["Sales Executive", "Client Coordinator / CRM"],
  "Marketing & Branding": [
    "Digital Marketing Executive",
    "Content Creator",
    "Photographer / Videographer",
  ],
  "Finance & Admin": ["Accountant", "Purchase Manager", "Office Admin"],
  "Security & Safety": ["Security Supervisor", "Security Staff"],
  "Support Staff": ["Housekeeping Staff", "Electrician / Technician"],
};

const departments = Object.keys(departmentRoles);

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Employee interface
interface Employee {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  education: string;
  profilePic: string;
  aadharCard: string;
  panCard: string;
  bankPassbook: string;
  department: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Fetch employees from API with filters
  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }
      if (selectedDepartment && selectedDepartment !== "all") {
        params.append("department", selectedDepartment);
      }

      const url = `${API_BASE_URL}/employees${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setEmployees(data.data);
      } else {
        toast.error(data.message || "Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedDepartment]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchEmployees]);

  const handleAddEmployee = () => {
    setEditingId(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee._id);
    setFormData(employee);
    setIsModalOpen(true);
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedEmployee) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${selectedEmployee._id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setEmployees(employees.filter((e) => e._id !== selectedEmployee._id));
        toast.success("Employee deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error connecting to server");
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedEmployee(null);
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profilePic" | "aadharCard" | "panCard" | "bankPassbook"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a fake URL for preview
      const fileUrl = URL.createObjectURL(file);
      setFormData({ ...formData, [field]: fileUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.department || !formData.role) {
      toast.error("Please select department and role");
      return;
    }

    setIsSubmitting(true);
    try {
      const url = editingId
        ? `${API_BASE_URL}/employees/${editingId}`
        : `${API_BASE_URL}/employees`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingId ? "Employee updated successfully" : "Employee added successfully");
        setIsModalOpen(false);
        setFormData({});
        setEditingId(null);
        // Refresh the employee list
        fetchEmployees();
      } else {
        toast.error(data.message || "Failed to save employee");
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Error connecting to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDepartmentChange = (department: string) => {
    setFormData({
      ...formData,
      department,
      role: "",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500">Manage your employees</p>
        </div>
        <Button onClick={handleAddEmployee} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Department Filter */}
          <div className="w-full md:w-64">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="All Departments" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || selectedDepartment) && (
            <Button variant="outline" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Results count */}
        <div className="mt-2 text-sm text-gray-500">
          Showing {employees.length} employee{employees.length !== 1 ? "s" : ""}
          {(searchQuery || selectedDepartment) && " with current filters"}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={employee.profilePic || undefined} />
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.mobile}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(employee)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(employee)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(employee)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    {searchQuery || selectedDepartment ? (
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-8 h-8 text-gray-400" />
                        <p>No employees found matching your criteria</p>
                        <Button variant="link" onClick={clearFilters}>
                          Clear filters
                        </Button>
                      </div>
                    ) : (
                      "No employees found. Add an employee to get started."
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update employee information below"
                : "Fill in the employee information below"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={formData.profilePic || undefined} />
                <AvatarFallback className="bg-primary text-white text-xl">
                  {formData.name ? getInitials(formData.name) : "NA"}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      document.getElementById("profile-pic-upload")?.click();
                    }}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "profilePic")}
                  />
                  {formData.profilePic && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setFormData({ ...formData, profilePic: "" })
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  value={formData.education || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, education: e.target.value })
                  }
                  placeholder="Enter education"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter address"
                rows={2}
              />
            </div>

            {/* Department and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Department *</Label>
                <Select
                  value={formData.department || ""}
                  onValueChange={handleDepartmentChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Role *</Label>
                <Select
                  value={formData.role || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  disabled={!formData.department}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {(departmentRoles[formData.department || ""] || []).map(
                      (role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <h3 className="font-medium">Document Uploads (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Aadhar Card */}
                <div>
                  <Label>Aadhar Card</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("aadhar-upload")?.click()
                      }
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      {formData.aadharCard ? "Change" : "Upload"}
                    </Button>
                    <input
                      id="aadhar-upload"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "aadharCard")}
                    />
                    {formData.aadharCard && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setFormData({ ...formData, aadharCard: "" })
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {formData.aadharCard && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Uploaded
                    </p>
                  )}
                </div>

                {/* Pan Card */}
                <div>
                  <Label>Pan Card</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("pan-upload")?.click()
                      }
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      {formData.panCard ? "Change" : "Upload"}
                    </Button>
                    <input
                      id="pan-upload"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "panCard")}
                    />
                    {formData.panCard && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setFormData({ ...formData, panCard: "" })
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {formData.panCard && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Uploaded
                    </p>
                  )}
                </div>

                {/* Bank Passbook */}
                <div>
                  <Label>Bank Passbook</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("passbook-upload")?.click()
                      }
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      {formData.bankPassbook ? "Change" : "Upload"}
                    </Button>
                    <input
                      id="passbook-upload"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "bankPassbook")}
                    />
                    {formData.bankPassbook && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setFormData({ ...formData, bankPassbook: "" })
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {formData.bankPassbook && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Uploaded
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>{editingId ? "Update" : "Add"} Employee</>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedEmployee.profilePic || undefined} />
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {getInitials(selectedEmployee.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedEmployee.name}</h3>
                  <p className="text-gray-500">{selectedEmployee.email}</p>
                  <p className="text-gray-500">{selectedEmployee.mobile}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-500">Department</h4>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500">Role</h4>
                  <p>{selectedEmployee.role}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500">Education</h4>
                  <p>{selectedEmployee.education || "N/A"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500">Address</h4>
                  <p>{selectedEmployee.address || "N/A"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-500">Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.aadharCard ? (
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Aadhar Card
                    </Button>
                  ) : (
                    <span className="text-gray-400 text-sm">No Aadhar Card</span>
                  )}
                  {selectedEmployee.panCard ? (
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Pan Card
                    </Button>
                  ) : (
                    <span className="text-gray-400 text-sm">No Pan Card</span>
                  )}
                  {selectedEmployee.bankPassbook ? (
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Bank Passbook
                    </Button>
                  ) : (
                    <span className="text-gray-400 text-sm">No Bank Passbook</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedEmployee?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
