import { useState, useEffect } from 'react';
import { Star, Check, X, Eye, Trash2, MessageCircleHeart, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

interface Testimonial {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  designation: string;
  location: string;
  profilePic?: string;
  rating: number;
  feedback: string;
  eventType?: string;
  isApproved: boolean;
  createdAt: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/testimonials/all`);
      const data = await response.json();
      
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch testimonials.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/testimonials/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApproved: true }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Testimonial approved successfully.',
        });
        fetchTestimonials();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve testimonial.',
        variant: 'destructive'
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/testimonials/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApproved: false }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Testimonial rejected.',
        });
        fetchTestimonials();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject testimonial.',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/testimonials/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Testimonial deleted successfully.',
        });
        fetchTestimonials();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete testimonial.',
        variant: 'destructive'
      });
    }
  };

  const handleViewFeedback = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'approved') return matchesSearch && testimonial.isApproved;
    if (filter === 'pending') return matchesSearch && !testimonial.isApproved;
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <SEO 
        title="Manage Testimonials"
        description="View and manage client testimonials for Anjani Events"
        url="http://anjanievents.in/admin/testimonial"
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Manage Testimonials</h1>
            <p className="text-muted-foreground">View and approve client testimonials</p>
          </div>
          <Button onClick={fetchTestimonials} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircleHeart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{testimonials.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{testimonials.filter(t => t.isApproved).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{testimonials.filter(t => !t.isApproved).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by name, email, location or feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:w-96"
          />
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filter === 'approved' ? 'default' : 'outline'}
              onClick={() => setFilter('approved')}
              size="sm"
            >
              Approved
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              size="sm"
            >
              Pending
            </Button>
          </div>
        </div>

        {/* Testimonials Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground">Loading testimonials...</p>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircleHeart className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No testimonials found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left p-4 font-medium">Client</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">Rating</th>
                    <th className="text-left p-4 font-medium hidden lg:table-cell">Feedback</th>
                    <th className="text-left p-4 font-medium hidden lg:table-cell">Location</th>
                    <th className="text-left p-4 font-medium hidden sm:table-cell">Date</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTestimonials.map((testimonial) => (
                    <tr key={testimonial._id} className="border-b hover:bg-muted/25">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {testimonial.profilePic ? (
                            <img
                              src={testimonial.profilePic}
                              alt={testimonial.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-semibold text-sm">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.email}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.designation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-medium">{testimonial.rating}/5</span>
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <p className="max-w-xs truncate">{testimonial.feedback}</p>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        {testimonial.location}
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(testimonial.createdAt)}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.isApproved 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {testimonial.isApproved ? (
                            <>
                              <Check className="w-3 h-3 mr-1" />
                              Approved
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              Pending
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewFeedback(testimonial)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="View Feedback"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {!testimonial.isApproved && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleApprove(testimonial._id)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleReject(testimonial._id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(testimonial._id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Feedback Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Testimonial Details</DialogTitle>
            <DialogDescription>
              View the complete feedback from the client
            </DialogDescription>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {selectedTestimonial.profilePic ? (
                  <img
                    src={selectedTestimonial.profilePic}
                    alt={selectedTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {selectedTestimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold">{selectedTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedTestimonial.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedTestimonial.designation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-medium">{selectedTestimonial.rating}/5</span>
                <span className="text-muted-foreground">
                  ({selectedTestimonial.eventType || 'General Event'})
                </span>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-medium mb-2">Feedback:</p>
                <p className="text-foreground">{selectedTestimonial.feedback}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>{selectedTestimonial.location}</p>
                <p>{formatDate(selectedTestimonial.createdAt)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminTestimonials;
