import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, MessageSquare, User, Edit } from 'lucide-react';
import { Contact } from '@/services/contactApi';

interface ViewModalProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ contact, open, onOpenChange, onEdit }) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge
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

  // Get priority badge
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Details
            </span>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="ml-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Header */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Contact ID: {contact._id.substring(0, 8)}...
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {getStatusBadge(contact.status)}
              {getPriorityBadge(contact.priority)}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Phone</p>
                {contact.phone ? (
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {contact.phone}
                  </a>
                ) : (
                  <span className="text-muted-foreground">No phone number provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <h4 className="text-lg font-semibold">Message</h4>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg border">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Created</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(contact.createdAt)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Updated</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(contact.updatedAt)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
              className="flex-1"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            {contact.phone && (
              <Button
                variant="outline"
                onClick={() => window.open(`tel:${contact.phone}`, '_blank')}
                className="flex-1"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            )}
            {onEdit && (
              <Button
                onClick={onEdit}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Contact
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;