import { useState, useEffect, useRef } from "react";
import { Edit2, Trash2, MoreVertical, RefreshCw, X, Upload, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { getAllCountries, getStatesOfCountry, getCitiesOfState } from "../../lib/countries-states-cities";
import type { ICountry, IState, ICity } from "../../lib/countries-states-cities";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Add User Schema
const addUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits').max(15, 'Mobile number too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  country: z.string().min(1, 'Please select a country'),
  state: z.string().min(1, 'Please select a state'),
  city: z.string().min(1, 'Please select a city'),
  role: z.enum(['admin', 'sub-admin', 'manager'])
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type AddUserFormData = z.infer<typeof addUserSchema>;

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "sub-admin" | "manager";
  profilePic?: string;
  createdAt: string;
  lastLogin?: string;
}

// Add User Modal Component
const AddUserModal = ({
  open,
  onOpenChange,
  onUserAdded
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserAdded: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  // Load countries on mount
  useEffect(() => {
    const loadCountries = () => {
      try {
        const allCountries = getAllCountries();
        setCountries(allCountries);
      } catch (error) {
        console.error('Error loading countries:', error);
        toast.error('Failed to load countries');
      }
    };
    loadCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountryId) {
      try {
        const countryStates = getStatesOfCountry(selectedCountryId);
        setStates(countryStates);
        setCities([]);
        setSelectedStateId(null);
      } catch (error) {
        console.error('Error loading states:', error);
        toast.error('Failed to load states');
      }
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountryId]);

  // Load cities when state changes
  useEffect(() => {
    if (selectedStateId) {
      try {
        const stateCities = getCitiesOfState(selectedStateId);
        setCities(stateCities);
      } catch (error) {
        console.error('Error loading cities:', error);
        toast.error('Failed to load cities');
      }
    } else {
      setCities([]);
    }
  }, [selectedStateId]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      role: 'sub-admin'
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setProfilePicFile(file);
    }
  };

  const removeProfilePic = () => {
    setProfilePic(null);
    setProfilePicFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: AddUserFormData) => {
    setIsLoading(true);
    try {
      const dateOfBirth = new Date(data.dateOfBirth).toISOString();
      
      const apiData = {
        name: data.name,
        email: data.email,
        username: data.username,
        mobile: data.mobile,
        password: data.password,
        confirmPassword: data.confirmPassword,
        dateOfBirth,
        gender: data.gender,
        address: data.address,
        country: data.country,
        state: data.state,
        city: data.city,
        role: data.role,
        profilePic: profilePic || undefined
      };

      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('User created successfully!');
        reset();
        setProfilePic(null);
        setProfilePicFile(null);
        setSelectedCountryId(null);
        setSelectedStateId(null);
        setStates([]);
        setCities([]);
        onOpenChange(false);
        onUserAdded();
      } else {
        toast.error(result.message || 'Failed to create user');
      }
    } catch (error) {
      toast.error('Error creating user');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new admin, sub-admin, or manager account
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {profilePic ? (
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeProfilePic}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500">Upload profile picture (max 5MB)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="add-name">Full Name *</Label>
              <Input
                id="add-name"
                placeholder="Enter full name"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="add-email">Email *</Label>
              <Input
                id="add-email"
                type="email"
                placeholder="Enter email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="add-username">Username *</Label>
              <Input
                id="add-username"
                placeholder="Choose username"
                {...register('username')}
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <Label htmlFor="add-mobile">Mobile Number *</Label>
              <Input
                id="add-mobile"
                placeholder="Enter mobile number"
                {...register('mobile')}
                className={errors.mobile ? 'border-red-500' : ''}
              />
              {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="add-password">Password *</Label>
              <div className="relative">
                <Input
                  id="add-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create password"
                  {...register('password')}
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="add-confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="add-confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="add-dateOfBirth">Date of Birth *</Label>
              <Input
                id="add-dateOfBirth"
                type="date"
                {...register('dateOfBirth')}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="add-gender">Gender *</Label>
              <Select
                onValueChange={(value) => setValue('gender', value as AddUserFormData['gender'])}
                defaultValue={watch('gender')}
              >
                <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="add-role">Role *</Label>
              <Select
                onValueChange={(value) => setValue('role', value as AddUserFormData['role'])}
                defaultValue={watch('role')}
              >
                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="sub-admin">Sub-admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="add-address">Address *</Label>
            <Input
              id="add-address"
              placeholder="Enter full address"
              {...register('address')}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>

          {/* Country, State, City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-country">Country *</Label>
              <Select
                onValueChange={(value) => {
                  const country = countries.find((c: ICountry) => Number(c.id) === Number(value));
                  setSelectedCountryId(country ? country.id : null);
                  setSelectedStateId(null);
                  setValue('country', country?.name || value);
                  setValue('state', '');
                  setValue('city', '');
                }}
                value={selectedCountryId?.toString() || ''}
              >
                <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.iso2} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-state">State/Province *</Label>
              <Select
                onValueChange={(value) => {
                  const state = states.find((s: IState) => Number(s.id) === Number(value));
                  setSelectedStateId(state ? state.id : null);
                  setValue('state', state?.name || value);
                  setValue('city', '');
                }}
                value={selectedStateId?.toString() || ''}
                disabled={!selectedCountryId}
              >
                <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.state_code} value={state.id.toString()}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-city">City *</Label>
              <Select
                onValueChange={(value) => {
                  const city = cities.find((c: ICity) => Number(c.id) === Number(value));
                  setValue('city', city?.name || value);
                }}
                disabled={!selectedStateId}
              >
                <SelectTrigger className={errors.city ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create User'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { user: currentUser } = useAuth();

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/auth/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    toast.error("Delete endpoint not implemented yet");
    console.log("Delete user:", userId);
  };

  const handleEdit = (userId: string) => {
    toast.info("Edit functionality coming soon");
    console.log("Edit user:", userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-gray-500">
            Manage admin, sub-admin, and manager accounts
          </p>
        </div>
        <Button onClick={() => setIsAddUserModalOpen(true)}>
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 border rounded-md max-w-xs"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="sub-admin">Sub-admin</option>
          <option value="manager">Manager</option>
        </select>
        <Button variant="outline" onClick={fetchUsers} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profilePic} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role.charAt(0).toUpperCase() +
                        user.role.slice(1).replace("-", " ")}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    {user.lastLogin ? formatDate(user.lastLogin) : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user._id)}>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Admins</p>
                <p className="text-2xl font-bold text-purple-600">
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    users.filter((u) => u.role === "admin").length
                  )}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-purple-600 font-semibold">A</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Sub-admins</p>
                <p className="text-2xl font-bold text-blue-600">
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    users.filter((u) => u.role === "sub-admin").length
                  )}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-blue-600 font-semibold">SA</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Managers</p>
                <p className="text-2xl font-bold text-green-600">
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    users.filter((u) => u.role === "manager").length
                  )}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-green-600 font-semibold">M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddUserModal
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
        onUserAdded={fetchUsers}
      />
    </div>
  );
};

export default AdminUsers;
