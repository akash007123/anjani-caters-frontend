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
  RefreshCw
} from "lucide-react";
import { contactApiService, Contact } from '@/services/contactApi';
import { format } from 'date-fns';
import { toast } from 'sonner';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { Skeleton } from '@/components/ui/skeleton';

const AdminContactTable = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);

  // Modal states
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [deleteContact, setDeleteContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactApiService.getAllContacts(page, 10, searchTerm, statusFilter === 'All' ? '' : statusFilter);
      if (response.success) {
        setContacts(response.data.contacts);
        setTotalPages(response.data.pages);
        setTotalContacts(response.data.total);
      }
    } catch (error) {
      toast.error('Failed to fetch contacts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchContacts();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, page]);

  const handleStatusUpdate = async (id: string, newStatus: 'New' | 'Pending' | 'Resolved') => {
    try {
      await contactApiService.updateContactStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleUpdateContact = async (id: string, data: any) => {
    try {
      await contactApiService.updateContact(id, data);
      toast.success('Contact updated successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update contact');
      throw error;
    }
  };

  const handleDeleteContact = async () => {
    if (!deleteContact) return;
    try {
      await contactApiService.deleteContact(deleteContact._id);
      toast.success('Contact deleted successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact');
      throw error;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500 hover:bg-blue-600';
      case 'Pending': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Resolved': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-slate-500 hover:bg-slate-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search contacts..."
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
              <DropdownMenuItem onClick={() => setStatusFilter('New')}>New</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Resolved')}>Resolved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={fetchContacts} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                </TableRow>
              ))
            ) : contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={contact._id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{contact.name}</TableCell>
                  <TableCell className="text-slate-600">{contact.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(contact.status)} text-white border-0`}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(contact.priority)}`}>
                      {contact.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {format(new Date(contact.createdAt), 'MMM d, yyyy')}
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
                        <DropdownMenuItem onClick={() => setViewContact(contact)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditContact(contact)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Quick Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(contact._id, 'New')}>
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(contact._id, 'Pending')}>
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(contact._id, 'Resolved')}>
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => setDeleteContact(contact)}
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
          Showing {contacts.length} of {totalContacts} results
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
      <ViewModal
        contact={viewContact}
        isOpen={!!viewContact}
        onClose={() => setViewContact(null)}
      />

      <EditModal
        contact={editContact}
        isOpen={!!editContact}
        onClose={() => setEditContact(null)}
        onSave={handleUpdateContact}
      />

      <DeleteConfirmModal
        isOpen={!!deleteContact}
        onClose={() => setDeleteContact(null)}
        onConfirm={handleDeleteContact}
        itemName={deleteContact?.name}
      />
    </div>
  );
};

export default AdminContactTable;