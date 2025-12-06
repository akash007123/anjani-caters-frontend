import React from 'react';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import AdminContactTable from '@/components/Admin/AdminContactTable';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Plus } from 'lucide-react';

const AdminContactsPage = () => {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export functionality to be implemented');
  };

  const handleAddNew = () => {
    // TODO: Implement add new contact functionality
    console.log('Add new contact functionality to be implemented');
  };

  return (
    <AdminDashboard
      title="Contact Management"
      subtitle="Manage and track all customer inquiries and messages"
      actions={
        <>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </>
      }
    >
      <AdminContactTable />
    </AdminDashboard>
  );
};

export default AdminContactsPage;