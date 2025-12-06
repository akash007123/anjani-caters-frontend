import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Clock, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { contactApiService } from '@/services/contactApi';
import { quoteApiService } from '@/services/quoteApi';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    contacts: { total: 0, new: 0, pending: 0, resolved: 0 },
    quotes: { total: 0, pending: 0, confirmed: 0 },
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactStats, quoteStats] = await Promise.all([
          contactApiService.getContactStats(),
          quoteApiService.getQuoteStats()
        ]);

        setStats({
          contacts: contactStats.data as any,
          quotes: {
            total: quoteStats.data.totalQuotes,
            pending: quoteStats.data.pendingQuotes,
            confirmed: quoteStats.data.confirmedQuotes
          },
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, description, trend, color }: any) => (
    <Card className="hover:shadow-md transition-all duration-200 border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        {stats.loading ? (
          <Skeleton className="h-8 w-20 mb-2" />
        ) : (
          <>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              {trend === 'up' ? (
                <ArrowUpRight className="w-3 h-3 text-green-500" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-red-500" />
              )}
              {description}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-2">Welcome back! Here's an overview of your catering business.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Contacts"
            value={stats.contacts.total}
            icon={Users}
            description="All time inquiries"
            trend="up"
            color="bg-blue-500"
          />
          <StatCard
            title="New Messages"
            value={stats.contacts.new}
            icon={Clock}
            description="Requires attention"
            trend="up"
            color="bg-yellow-500"
          />
          <StatCard
            title="Pending Quotes"
            value={stats.quotes.pending}
            icon={FileText}
            description="Awaiting review"
            trend="up"
            color="bg-purple-500"
          />
          <StatCard
            title="Confirmed Events"
            value={stats.quotes.confirmed}
            icon={CheckCircle}
            description="Upcoming events"
            trend="up"
            color="bg-green-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-slate-200">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] text-slate-400 text-sm">
                Chart placeholder - Activity Timeline
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 border-slate-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-slate-700">Review New Quotes</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-slate-700">Update Menu Items</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-slate-700">Check Schedule</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;