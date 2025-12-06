import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Eye, Edit, Trash2, Search, Filter, Loader2, RefreshCw } from 'lucide-react';
import { contactApiService, Contact, ContactsResponse, UpdateContactData } from '@/services/contactApi';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const AdminContactTable = () => {
  // State management
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);

  // Modal states
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Sample data fallback
  const sampleContacts: Contact[] = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 12345 67890',
      message: 'I would like to inquire about catering services for my wedding. We are expecting around 200 guests.',
      status: 'New',
      priority: 'High',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z'
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+91 98765 43210',
      message: 'Looking for corporate lunch catering for our office of 50 people. Need vegetarian options.',
      status: 'Pending',
      priority: 'Medium',
      createdAt: '2024-12-02T14:30:00Z',
      updatedAt: '2024-12-03T09:15:00Z'
    },
    {
      _id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+91 87654 32109',
      message: 'Birthday party catering for 30 guests. Need non-vegetarian menu.',
      status: 'Resolved',
      priority: 'Low',
      createdAt: '2024-11-28T16:45:00Z',
      updatedAt: '2024-11-29T11:20:00Z'
    }
  ];

  // Fetch contacts from API
  const fetchContacts = async (page = 1, search = '', status = '') => {
    setLoading(true);
    setError(null);

    try {
      const response: ContactsResponse = await contactApiService.getAllContacts(
        page,
        10,
        search,
        status
      );

      if (response.success) {
        // Ensure all contacts have a status (assign "New" if missing)
        const contactsWithStatus = response.data.contacts.map(contact => ({
          ...contact,
          status: contact.status || 'New'
        }));

        setContacts(contactsWithStatus);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.pages);
        setTotalContacts(response.data.total);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
      
      // Use sample data as fallback
      setContacts(sampleContacts);
      setCurrentPage(1);
      setTotalPages(1);
      setTotalContacts(sampleContacts.length);
    } finally {
      setLoading(false);
    }
  };

  // Load contacts on component mount and when filters change
  useEffect(() => {
    fetchContacts(currentPage, searchTerm, statusFilter !== 'All' ? statusFilter : '');
  }, [currentPage, searchTerm, statusFilter]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Handle status filter
  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchContacts(currentPage, searchTerm, statusFilter !== 'All' ? statusFilter : '');
  };

  // Handle view contact
  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  // Handle edit contact
  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  // Handle delete contact
  const handleDeleteContact = (contact: Contact) => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  // Handle contact update (from edit modal)
  const handleContactUpdate = async (id: string, updateData: UpdateContactData) => {
    try {
      const response = await contactApiService.updateContact(id, updateData);
      if (response.success) {
        // Update local state
        setContacts(prev => prev.map(contact => 
          contact._id === id ? response.data : contact
        ));
        setEditModalOpen(false);
        setSelectedContact(null);
      }
    } catch (err) {
      console.error('Error updating contact:', err);
      throw err;
    }
  };

  // Handle contact deletion
  const handleContactDelete = async (id: string) => {
    try {
      const response = await contactApiService.deleteContact(id);
      if (response.success) {
        // Remove from local state
        setContacts(prev => prev.filter(contact => contact._id !== id));
        setTotalContacts(prev => prev - 1);
        setDeleteModalOpen(false);
        setSelectedContact(null);
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      throw err;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">New</Badge>;
      case 'Pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'Resolved':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="default" className="bg-orange-100 text-orange-800 hover:bg-orange-200">Medium</Badge>;
      case 'Low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Contact Management</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Manage and track all contact inquiries ({totalContacts} total contacts)
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={loading} variant="outline" className="flex-shrink-0">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, email, phone, or message..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-48 flex-shrink-0">
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="p-4 border-destructive">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-destructive rounded-full"></div>
            <p className="text-sm text-destructive font-medium">
              {error} - Showing sample data
            </p>
          </div>
        </Card>
      )}

      {/* Contacts Table */}
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 md:w-16">ID</TableHead>
                <TableHead className="min-w-0">Name</TableHead>
                <TableHead className="min-w-0 hidden sm:table-cell">Email</TableHead>
                <TableHead className="min-w-0 hidden md:table-cell">Phone</TableHead>
                <TableHead className="min-w-0 hidden lg:table-cell">Message</TableHead>
                <TableHead className="min-w-0 hidden lg:table-cell">Created At</TableHead>
                <TableHead className="min-w-0">Status</TableHead>
                <TableHead className="text-right w-20 md:w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading contacts...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No contacts found
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell className="font-mono text-xs md:text-sm">
                      {contact._id.substring(0, 6)}...
                    </TableCell>
                    <TableCell className="font-medium truncate" title={contact.name}>
                      {contact.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell truncate" title={contact.email}>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {contact.email}
                      </a>
                    </TableCell>
                    <TableCell className="hidden md:table-cell truncate" title={contact.phone || '-'}>
                      {contact.phone ? (
                        <a 
                          href={`tel:${contact.phone}`}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {contact.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell max-w-xs truncate" title={contact.message}>
                      {contact.message}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs md:text-sm text-muted-foreground">
                      {formatDate(contact.createdAt)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(contact.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewContact(contact)}
                          title="View details"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditContact(contact)}
                          title="Edit contact"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContact(contact)}
                          title="Delete contact"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="text-xs md:text-sm"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="text-xs md:text-sm"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      {selectedContact && (
        <>
          <ViewModal
            contact={selectedContact}
            open={viewModalOpen}
            onOpenChange={setViewModalOpen}
          />
          <EditModal
            contact={selectedContact}
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleContactUpdate}
          />
          <DeleteConfirmModal
            contact={selectedContact}
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleContactDelete}
          />
        </>
      )}
    </div>
  );
};

export default AdminContactTable;