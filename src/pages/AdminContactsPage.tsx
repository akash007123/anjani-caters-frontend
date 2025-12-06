import React from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminContactTable from '@/components/Admin/AdminContactTable';

const AdminContactsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contact Management</h1>
          <p className="text-slate-500 mt-2">View and manage all customer inquiries and messages.</p>
        </div>

        <AdminContactTable />
      </div>
    </AdminLayout>
  );
};

export default AdminContactsPage;