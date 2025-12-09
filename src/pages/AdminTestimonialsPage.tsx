import React from 'react';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminTestimonialTable from '@/components/Admin/AdminTestimonialTable';

const AdminTestimonialsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Testimonial Management</h1>
          <p className="text-slate-500 mt-2">View, approve, and manage all customer testimonials.</p>
        </div>

        <AdminTestimonialTable />
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonialsPage;