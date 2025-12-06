import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from '@/contexts/AuthContext';
import { authApiService, User } from '@/services/authApi';
import { toast } from 'sonner';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Shield, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Key, 
  Eye, 
  EyeOff,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react';

const AdminProfilePage = () => {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUploadingPic, setIsUploadingPic] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    profilePic: user?.profilePic || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        mobile: user.mobile || '',
        profilePic: user.profilePic || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePicClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploadingPic(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        try {
          const response = await authApiService.uploadProfilePic(base64);
          if (response.success) {
            toast.success('Profile picture updated successfully');
            // Refresh user data
            window.location.reload();
          }
        } catch (error: unknown) {
          let message = 'Failed to upload profile picture';
          if (error instanceof Error && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            message = axiosError.response?.data?.message || message;
          }
          toast.error(message);
        } finally {
          setIsUploadingPic(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error: unknown) {
      toast.error('Failed to read file');
      setIsUploadingPic(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profileData.firstName || !profileData.lastName || !profileData.email || !profileData.mobile) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApiService.updateProfile(profileData);
      if (response.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        // Refresh user data
        window.location.reload();
      }
    } catch (error: unknown) {
      let message = 'Failed to update profile';
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        message = axiosError.response?.data?.message || message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      profilePic: user?.profilePic || '',
    });
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApiService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      if (response.success) {
        toast.success('Password changed successfully');
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error: unknown) {
      let message = 'Failed to change password';
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        message = axiosError.response?.data?.message || message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Manager':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Editor':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Viewer':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Profile</h1>
            <p className="text-slate-500 mt-2">Manage your account information and security settings.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Active
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Profile Information
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Information Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Overview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage 
                          src={user?.profilePic || "https://github.com/shadcn.png"} 
                          alt={`${user?.firstName} ${user?.lastName}`} 
                        />
                        <AvatarFallback className="text-lg">
                          {user ? getInitials(user.firstName, user.lastName) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                        disabled={isEditing || isUploadingPic}
                        onClick={handleProfilePicClick}
                      >
                        {isUploadingPic ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-600 border-t-transparent" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4" />
                        {user?.email || 'admin@anjanicaters.com'}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getRoleBadgeColor(user?.role || 'Admin')}>
                          {user?.role || 'Admin'}
                        </Badge>
                        {user?.lastLogin && (
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Clock className="w-3 h-3" />
                            Last login: {formatDate(user.lastLogin)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEdit}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Profile Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  Profile Details
                </CardTitle>
                <CardDescription>
                  {isEditing ? 'Edit your personal information below.' : 'Your personal information.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <UserIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-900">{user?.firstName || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <UserIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-900">{user?.lastName || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-900">{user?.email || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    {isEditing ? (
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={profileData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter your mobile number"
                        disabled={isLoading}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-900">{user?.mobile || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Info */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <Shield className="w-4 h-4" />
                        Role
                      </div>
                      <Badge className={getRoleBadgeColor(user?.role || 'Admin')}>
                        {user?.role || 'Admin'}
                      </Badge>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <Calendar className="w-4 h-4" />
                        Member Since
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {user && user._id ? formatDate(user._id.substring(0, 8)) : 'Unknown'}
                      </span>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <CheckCircle className="w-4 h-4" />
                        Status
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Password & Security
                </CardTitle>
                <CardDescription>
                  Manage your password and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password Section */}
                <div className="p-6 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-slate-900">Change Password</h3>
                      <p className="text-sm text-slate-500">Update your password to keep your account secure.</p>
                    </div>
                    {!isChangingPassword ? (
                      <Button 
                        variant="outline" 
                        onClick={() => setIsChangingPassword(true)}
                        className="flex items-center gap-2"
                      >
                        <Key className="w-4 h-4" />
                        Change Password
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsChangingPassword(false);
                            setPasswordData({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: '',
                            });
                          }}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleChangePassword}
                          disabled={isLoading}
                          className="flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          {isLoading ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    )}
                  </div>

                  {isChangingPassword && (
                    <div className="space-y-4">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password *</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter current password"
                            disabled={isLoading}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            disabled={isLoading}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-slate-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password *</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"
                            disabled={isLoading}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            disabled={isLoading}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-slate-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm new password"
                            disabled={isLoading}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-slate-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Password Requirements */}
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            At least 6 characters long
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            Use a combination of letters and numbers
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            Avoid using common passwords
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Account Security Status */}
                <div className="p-6 border border-slate-200 rounded-lg">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Security Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-700">Password is secure</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Good
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-700">Account is active</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-slate-700">Two-factor authentication</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Not Enabled
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;