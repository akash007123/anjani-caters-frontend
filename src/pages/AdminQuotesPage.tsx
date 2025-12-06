import React from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminQuoteTable from '@/components/Admin/AdminQuoteTable';

const AdminQuotesPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quote Management</h1>
          <p className="text-slate-500 mt-2">View and manage all customer quote requests and their status.</p>
        </div>

        <AdminQuoteTable />
      </div>
    </AdminLayout>
  );
};

export default AdminQuotesPage;