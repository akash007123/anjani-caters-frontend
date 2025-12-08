import React from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import BlogAdmin from '@/components/Admin/BlogAdmin';

const AdminBlogPage: React.FC = () => {
  return (
    <AdminLayout>
      <BlogAdmin />
    </AdminLayout>
  );
};

export default AdminBlogPage;