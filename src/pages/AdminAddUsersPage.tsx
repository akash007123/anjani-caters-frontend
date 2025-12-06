import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/Admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, User, UserPlus } from 'lucide-react';
import { authApiService } from '@/services/authApi';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

const addUserSchema = z.object({
    firstName: z.string().min(2, 'First name is too short'),
    lastName: z.string().min(2, 'Last name is too short'),
    email: z.string().email('Invalid email address'),
    mobile: z.string().min(10, 'Invalid mobile number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['Admin', 'Manager', 'Editor', 'Viewer']),
    profilePic: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type AddUserFormData = z.infer<typeof addUserSchema>;

const AdminAddUsersPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [profilePicPreview, setProfilePicPreview] = useState<string>('');

    const form = useForm<AddUserFormData>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
            role: 'Editor',
            profilePic: '',
        },
    });

    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please select an image file smaller than 5MB",
                    variant: "destructive",
                });
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                toast({
                    title: "Invalid file type",
                    description: "Please select an image file",
                    variant: "destructive",
                });
                return;
            }

            setProfilePicFile(file);
            
            // Create image and resize/compress if needed
            const img = new Image();
            const reader = new FileReader();
            
            reader.onload = (e) => {
                img.onload = () => {
                    // Resize image to max 300x300 pixels for better performance
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Calculate new dimensions maintaining aspect ratio
                    let { width, height } = img;
                    const maxSize = 300;
                    
                    if (width > height) {
                        if (width > maxSize) {
                            height = (height * maxSize) / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = (width * maxSize) / height;
                            height = maxSize;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Draw and compress image
                    ctx?.drawImage(img, 0, 0, width, height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    
                    setProfilePicPreview(compressedDataUrl);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: AddUserFormData) => {
        try {
            setIsLoading(true);
            
            // Prepare form data for submission
            const submitData = {
                ...values,
                profilePic: profilePicPreview || values.profilePic
            };
            
            await authApiService.register(submitData);
            
            toast({
                title: "User created successfully",
                description: `${values.firstName} ${values.lastName} has been added as ${values.role}`,
            });
            
            // Reset form
            form.reset();
            setProfilePicPreview('');
            setProfilePicFile(null);
            
        } catch (error) {
            console.error('Error creating user:', error);
            let errorMessage = "Failed to create user. Please try again.";
            
            if (error instanceof AxiosError && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error && typeof error === 'object' && 'response' in error) {
                errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || errorMessage;
            }
            
            toast({
                title: "Error creating user",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <UserPlus className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add New User</h1>
                        <p className="text-slate-500 mt-2">Create a new staff account with appropriate access permissions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Information</CardTitle>
                                <CardDescription>
                                    Fill in the details to create a new staff account. The user will be able to login with these credentials.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mobile Number *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 (555) 123-4567" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Password *</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="••••••••" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirm Password *</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="••••••••" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Role *</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a role" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Admin">Admin - Full access to all features</SelectItem>
                                                            <SelectItem value="Manager">Manager - Access to contacts, quotes, and reports</SelectItem>
                                                            <SelectItem value="Editor">Editor - Access to contacts and quotes</SelectItem>
                                                            <SelectItem value="Viewer">Viewer - Read-only access</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Creating User...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="mr-2 h-4 w-4" />
                                                        Create User
                                                    </>
                                                )}
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={() => {
                                                    form.reset();
                                                    setProfilePicPreview('');
                                                    setProfilePicFile(null);
                                                }}
                                                disabled={isLoading}
                                            >
                                                Reset Form
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                                <CardDescription>
                                    Upload an optional profile picture for the user.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center space-y-4">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage src={profilePicPreview} alt="Profile preview" />
                                        <AvatarFallback className="text-lg">
                                            {profilePicPreview ? (
                                                <User className="h-12 w-12" />
                                            ) : (
                                                <User className="h-12 w-12" />
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    
                                    <div className="w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePicChange}
                                            className="hidden"
                                            id="profile-pic-upload"
                                        />
                                        <label htmlFor="profile-pic-upload" className="w-full">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full cursor-pointer"
                                                asChild
                                            >
                                                <span>
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Upload Photo
                                                </span>
                                            </Button>
                                        </label>
                                        <p className="text-xs text-slate-500 mt-2 text-center">
                                            JPG, PNG or GIF. Max size 5MB.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Role Permissions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-sm">
                                    <h4 className="font-medium text-slate-900 mb-2">Admin</h4>
                                    <p className="text-slate-600">Full access to all features including user management</p>
                                </div>
                                <div className="text-sm">
                                    <h4 className="font-medium text-slate-900 mb-2">Manager</h4>
                                    <p className="text-slate-600">Access to contacts, quotes, and reports</p>
                                </div>
                                <div className="text-sm">
                                    <h4 className="font-medium text-slate-900 mb-2">Editor</h4>
                                    <p className="text-slate-600">Access to contacts and quotes</p>
                                </div>
                                <div className="text-sm">
                                    <h4 className="font-medium text-slate-900 mb-2">Viewer</h4>
                                    <p className="text-slate-600">Read-only access to dashboard</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAddUsersPage;