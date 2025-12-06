import React, { useState, useEffect, useCallback } from 'react';
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
  Calendar,
  Users,
  DollarSign
} from "lucide-react";
import { quoteApiService } from '@/services/quoteApi';
import type { QuotesApiResponse } from '@/services/quoteApi';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface Quote {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venue?: string;
  budget?: string;
  requirements?: string;
  status: 'New' | 'Pending' | 'Resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

const AdminQuoteTable = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [eventTypeFilter, setEventTypeFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuotes, setTotalQuotes] = useState(0);

  // Modal states
  const [viewQuote, setViewQuote] = useState<Quote | null>(null);
  const [editQuote, setEditQuote] = useState<Quote | null>(null);
  const [deleteQuote, setDeleteQuote] = useState<Quote | null>(null);

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      const params: {
        page: number;
        limit: number;
        search?: string;
        status?: string;
        priority?: string;
        eventType?: string;
      } = { page, limit: 10 };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;
      if (eventTypeFilter !== 'All') params.eventType = eventTypeFilter;

      const response = await quoteApiService.getAllQuotes(params);
      if (response.success) {
        setQuotes(response.data);
        setTotalPages(response.pagination.pages);
        setTotalQuotes(response.pagination.total);
      }
    } catch (error) {
      toast.error('Failed to fetch quotes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, statusFilter, priorityFilter, eventTypeFilter]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchQuotes();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchQuotes]);

  const handleStatusUpdate = async (id: string, newStatus: 'New' | 'Pending' | 'Resolved') => {
    try {
      await quoteApiService.updateQuoteStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchQuotes();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleUpdateQuote = async (id: string, data: Partial<Quote>) => {
    try {
      await quoteApiService.updateQuote(id, data);
      toast.success('Quote updated successfully');
      fetchQuotes();
    } catch (error) {
      toast.error('Failed to update quote');
      throw error;
    }
  };

  const handleDeleteQuote = async () => {
    if (!deleteQuote) return;
    try {
      await quoteApiService.deleteQuote(deleteQuote._id);
      toast.success('Quote deleted successfully');
      fetchQuotes();
    } catch (error) {
      toast.error('Failed to delete quote');
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
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'wedding': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'corporate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'birthday': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'anniversary': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'private': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Priority: {priorityFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPriorityFilter('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('urgent')}>Urgent</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('high')}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('medium')}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('low')}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Event: {eventTypeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEventTypeFilter('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEventTypeFilter('wedding')}>Wedding</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEventTypeFilter('corporate')}>Corporate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEventTypeFilter('birthday')}>Birthday</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEventTypeFilter('anniversary')}>Anniversary</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEventTypeFilter('private')}>Private Party</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEventTypeFilter('other')}>Other</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={fetchQuotes} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[200px]">Customer</TableHead>
              <TableHead>Event Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24 mt-1" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                </TableRow>
              ))
            ) : quotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  No quotes found.
                </TableCell>
              </TableRow>
            ) : (
              quotes.map((quote) => (
                <TableRow key={quote._id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="space-y-1">
                    <div className="font-medium text-slate-900">{quote.name}</div>
                    <div className="text-sm text-slate-500">{quote.email}</div>
                    {quote.phone && (
                      <div className="text-xs text-slate-400">{quote.phone}</div>
                    )}
                  </TableCell>
                  <TableCell className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-xs ${getEventTypeColor(quote.eventType)} border`}>
                        {quote.eventType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Users className="w-3 h-3" />
                      {quote.guestCount} guests
                    </div>
                    {quote.budget && (
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <DollarSign className="w-3 h-3" />
                        {quote.budget}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(quote.status)} text-white border-0`}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(quote.priority)}`}>
                      {quote.priority.charAt(0).toUpperCase() + quote.priority.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(quote.eventDate), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-slate-400">
                      Requested: {format(new Date(quote.createdAt), 'MMM d')}
                    </div>
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
                        <DropdownMenuItem onClick={() => setViewQuote(quote)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditQuote(quote)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Quick Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(quote._id, 'New')}>
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(quote._id, 'Pending')}>
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(quote._id, 'Resolved')}>
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => setDeleteQuote(quote)}
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
          Showing {quotes.length} of {totalQuotes} results
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
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
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

      {/* View Quote Modal */}
      {viewQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Quote Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setViewQuote(null)}>
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Name</label>
                  <p className="text-slate-900">{viewQuote.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Email</label>
                  <p className="text-slate-900">{viewQuote.email}</p>
                </div>
                {viewQuote.phone && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">Phone</label>
                    <p className="text-slate-900">{viewQuote.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-slate-600">Event Type</label>
                  <Badge className={`mt-1 ${getEventTypeColor(viewQuote.eventType)} border`}>
                    {viewQuote.eventType}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Event Date</label>
                  <p className="text-slate-900">{format(new Date(viewQuote.eventDate), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Guest Count</label>
                  <p className="text-slate-900">{viewQuote.guestCount}</p>
                </div>
                {viewQuote.venue && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-slate-600">Venue</label>
                    <p className="text-slate-900">{viewQuote.venue}</p>
                  </div>
                )}
                {viewQuote.budget && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-slate-600">Budget</label>
                    <p className="text-slate-900">{viewQuote.budget}</p>
                  </div>
                )}
                {viewQuote.requirements && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-slate-600">Requirements</label>
                    <p className="text-slate-900">{viewQuote.requirements}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-slate-600">Status</label>
                  <Badge className={`mt-1 ${getStatusColor(viewQuote.status)} text-white border-0`}>
                    {viewQuote.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Priority</label>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full border mt-1 ${getPriorityColor(viewQuote.priority)}`}>
                    {viewQuote.priority.charAt(0).toUpperCase() + viewQuote.priority.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Requested</label>
                  <p className="text-slate-900">{format(new Date(viewQuote.createdAt), 'MMMM d, yyyy h:mm a')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Last Updated</label>
                  <p className="text-slate-900">{format(new Date(viewQuote.updatedAt), 'MMMM d, yyyy h:mm a')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Quote Modal */}
      {editQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Quote</h3>
              <Button variant="ghost" size="icon" onClick={() => setEditQuote(null)}>
                ×
              </Button>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const updateData = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string || undefined,
                eventType: formData.get('eventType') as string,
                eventDate: formData.get('eventDate') as string,
                guestCount: formData.get('guestCount') as string,
                venue: formData.get('venue') as string || undefined,
                budget: formData.get('budget') as string || undefined,
                requirements: formData.get('requirements') as string || undefined,
                status: formData.get('status') as Quote['status'],
                priority: formData.get('priority') as Quote['priority'],
              };
              
              try {
                await handleUpdateQuote(editQuote._id, updateData);
                setEditQuote(null);
              } catch (error) {
                // Error handling is done in handleUpdateQuote
              }
            }}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Name</label>
                  <Input name="name" defaultValue={editQuote.name} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Email</label>
                  <Input name="email" type="email" defaultValue={editQuote.email} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Phone</label>
                  <Input name="phone" defaultValue={editQuote.phone || ''} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Event Type</label>
                  <select 
                    name="eventType" 
                    defaultValue={editQuote.eventType}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="private">Private Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Event Date</label>
                  <Input name="eventDate" type="date" defaultValue={editQuote.eventDate.split('T')[0]} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Guest Count</label>
                  <Input name="guestCount" defaultValue={editQuote.guestCount} required />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Venue</label>
                  <Input name="venue" defaultValue={editQuote.venue || ''} />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Budget</label>
                  <Input name="budget" defaultValue={editQuote.budget || ''} />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Requirements</label>
                  <textarea 
                    name="requirements" 
                    defaultValue={editQuote.requirements || ''}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Status</label>
                  <select 
                    name="status" 
                    defaultValue={editQuote.status}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="New">New</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-1 block">Priority</label>
                  <select 
                    name="priority" 
                    defaultValue={editQuote.priority}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditQuote(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update Quote
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete the quote from <strong>{deleteQuote.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteQuote(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteQuote}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuoteTable;