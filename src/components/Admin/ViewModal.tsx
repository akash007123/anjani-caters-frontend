import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Mail, Phone, Calendar, User, MessageSquare, Tag, AlertCircle } from "lucide-react";
import { Contact } from "@/services/contactApi";

interface ViewModalProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ contact, isOpen, onClose }) => {
  if (!contact) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white border-slate-200 shadow-xl">
        <DialogHeader className="p-6 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Contact Details
            </DialogTitle>
            <Badge className={`${getStatusColor(contact.status)} text-white border-0 px-3 py-1`}>
              {contact.status}
            </Badge>
          </div>
          <DialogDescription className="text-slate-500 mt-1">
            Received on {format(new Date(contact.createdAt), "PPP 'at' p")}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3 h-3" /> Name
              </label>
              <p className="text-sm font-medium text-slate-900">{contact.name}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email
              </label>
              <p className="text-sm font-medium text-slate-900">{contact.email}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone
              </label>
              <p className="text-sm font-medium text-slate-900">{contact.phone || 'N/A'}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Priority
              </label>
              <div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(contact.priority)}`}>
                  {contact.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Message
            </label>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {contact.message}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" /> ID: {contact._id}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Last Updated: {format(new Date(contact.updatedAt), "PPP")}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;