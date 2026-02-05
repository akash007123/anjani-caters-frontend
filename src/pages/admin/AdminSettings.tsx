import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "../../lib/utils";

interface ProfileFormData {
  name: string;
  email: string;
  username: string;
  mobile: string;
  profilePic?: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  country: string;
  state: string;
  city: string;
  password?: string;
  confirmPassword?: string;
}

const AdminSettings = () => {
  const { user, setUser, refreshAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    username: "",
    mobile: "",
    profilePic: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        mobile: user.mobile || "",
        profilePic: user.profilePic || "",
        dateOfBirth: user.dateOfBirth?.split("T")[0] || "",
        gender: user.gender || "",
        address: user.address || "",
        country: user.country || "",
        state: user.state || "",
        city: user.city || "",
        password: "",
        confirmPassword: "",
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        mobile: formData.mobile,
        profilePic: formData.profilePic,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
      };

      const response = await axios.put("/auth/profile", updateData);
      if (response.data.success) {
        toast.success("Profile updated successfully");
        // Update user state globally with returned data
        setUser(response.data.data.adminUser);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update profile";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password && formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put("/auth/password", {
        password: formData.password,
      });
      if (response.data.success) {
        toast.success("Password updated successfully");
        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <Card className="w-64 shrink-0">
          <CardContent className="p-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </Button>
              <Button
                variant={activeTab === "password" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("password")}
              >
                Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.profilePic} />
                      <AvatarFallback className="bg-primary text-white text-xl">
                        {user?.name ? getInitials(user.name) : "AD"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor="profilePic">Profile Picture URL</Label>
                      <Input
                        id="profilePic"
                        name="profilePic"
                        value={formData.profilePic}
                        onChange={handleInputChange}
                        placeholder="https://example.com/avatar.jpg"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Info */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "password" && (
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
