import React from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Settings, Bell, Users, Mail, MessageSquare, Database, Globe, Activity } from 'lucide-react';

// Placeholder components for tabs (will be implemented individually)
const ProfileTab = () => <div>Profile Settings Content</div>;
const SecurityTab = () => <div>Security Settings Content</div>;
const GeneralTab = () => <div>General Settings Content</div>;
const NotificationsTab = () => <div>Notification Settings Content</div>;
const RolesTab = () => <div>Roles & Permissions Content</div>;
const ContactSettingsTab = () => <div>Contact Settings Content</div>;
const EmailSettingsTab = () => <div>Email Settings Content</div>;
const SystemTab = () => <div>System Preferences Content</div>;
const IntegrationsTab = () => <div>Integrations Content</div>;

const AdminSettingsPage = () => {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
                    <p className="text-slate-500 mt-2">Manage your account and system preferences.</p>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-9 h-auto gap-2 bg-transparent p-0">
                        <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <User className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <Shield className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <Settings className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">General</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <Bell className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Notify</span>
                        </TabsTrigger>
                        <TabsTrigger value="roles" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <Users className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Roles</span>
                        </TabsTrigger>
                        <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <MessageSquare className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Contact</span>
                        </TabsTrigger>
                        <TabsTrigger value="email" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <Mail className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Email</span>
                        </TabsTrigger>
                        <TabsTrigger value="system" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <Database className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">System</span>
                        </TabsTrigger>
                        <TabsTrigger value="integrations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200">
                            <Globe className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:inline">Integrations</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-6">
                        <TabsContent value="profile"><ProfileTab /></TabsContent>
                        <TabsContent value="security"><SecurityTab /></TabsContent>
                        <TabsContent value="general"><GeneralTab /></TabsContent>
                        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
                        <TabsContent value="roles"><RolesTab /></TabsContent>
                        <TabsContent value="contact"><ContactSettingsTab /></TabsContent>
                        <TabsContent value="email"><EmailSettingsTab /></TabsContent>
                        <TabsContent value="system"><SystemTab /></TabsContent>
                        <TabsContent value="integrations"><IntegrationsTab /></TabsContent>
                    </div>
                </Tabs>
            </div>
        </AdminLayout>
    );
};

export default AdminSettingsPage;
