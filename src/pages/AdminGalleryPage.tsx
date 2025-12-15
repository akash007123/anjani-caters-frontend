import React from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import GalleryAdmin from '@/components/Admin/GalleryAdmin';

const AdminGalleryPage: React.FC = () => {
  return (
    <AdminLayout>
      <GalleryAdmin />
    </AdminLayout>
  );
};

export default AdminGalleryPage;