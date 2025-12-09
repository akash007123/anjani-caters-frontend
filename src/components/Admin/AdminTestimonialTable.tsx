import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  ArrowUpDown,
  Search,
  Eye,
  Edit,
  Trash2,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle
} from "lucide-react";
import { testimonialApiService, Testimonial, TestimonialFormData } from '@/services/testimonialApi';
import { format } from 'date-fns';
import { toast } from 'sonner';
import TestimonialViewModal from './TestimonialViewModal';
import TestimonialEditModal from './TestimonialEditModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { Skeleton } from '@/components/ui/skeleton';

const AdminTestimonialTable = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTestimonials, setTotalTestimonials] = useState(0);

  // Modal states
  const [viewTestimonial, setViewTestimonial] = useState<Testimonial | null>(null);
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);
  const [deleteTestimonial, setDeleteTestimonial] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialApiService.getAllTestimonials({
        page,
        limit: 10,
        search: searchTerm,
        status: statusFilter === 'All' ? '' : statusFilter
      });
      if (response.success) {
        setTestimonials(response.data.testimonials);
        setTotalPages(response.data.pages);
        setTotalTestimonials(response.data.total);
      }
    } catch (error) {
      toast.error('Failed to fetch testimonials');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchTestimonials();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, page]);

  const handleApproveTestimonial = async (id: string, isApproved: boolean) => {
    try {
      await testimonialApiService.approveTestimonial(id, isApproved);
      toast.success(`Testimonial ${isApproved ? 'approved' : 'unapproved'} successfully`);
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update testimonial approval status');
    }
  };

  const handleUpdateTestimonial = async (id: string, data: Partial<TestimonialFormData>) => {
    try {
      await testimonialApiService.updateTestimonial(id, data);
      toast.success('Testimonial updated successfully');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update testimonial');
      throw error;
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!deleteTestimonial) return;
    try {
      await testimonialApiService.deleteTestimonial(deleteTestimonial._id);
      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
      throw error;
    }
  };

  const getStatusColor = (isApproved: boolean) => {
    return isApproved
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-yellow-500 hover:bg-yellow-600';
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Status: {statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('approved')}>Approved</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={fetchTestimonials} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-64" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                </TableRow>
              ))
            ) : testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                  No testimonials found.
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((testimonial) => (
                <TableRow key={testimonial._id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{testimonial.name}</TableCell>
                  <TableCell className="text-slate-600 max-w-xs">
                    <div title={testimonial.quote}>
                      {truncateText(testimonial.quote)}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      <span className="text-sm text-slate-500 ml-1">({testimonial.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{testimonial.eventType}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(testimonial.isApproved)} text-white border-0`}>
                      {testimonial.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {format(new Date(testimonial.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setViewTestimonial(testimonial)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditTestimonial(testimonial)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Approval</DropdownMenuLabel>
                        {testimonial.isApproved ? (
                          <DropdownMenuItem onClick={() => handleApproveTestimonial(testimonial._id, false)}>
                            <XCircle className="mr-2 h-4 w-4" /> Unapprove
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleApproveTestimonial(testimonial._id, true)}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => setDeleteTestimonial(testimonial)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-slate-500">
          Showing {testimonials.length} of {totalTestimonials} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      <TestimonialViewModal
        testimonial={viewTestimonial}
        isOpen={!!viewTestimonial}
        onClose={() => setViewTestimonial(null)}
      />

      <TestimonialEditModal
        testimonial={editTestimonial}
        isOpen={!!editTestimonial}
        onClose={() => setEditTestimonial(null)}
        onSave={handleUpdateTestimonial}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTestimonial}
        onClose={() => setDeleteTestimonial(null)}
        onConfirm={handleDeleteTestimonial}
        itemName={deleteTestimonial?.name}
      />
    </div>
  );
};

export default AdminTestimonialTable;