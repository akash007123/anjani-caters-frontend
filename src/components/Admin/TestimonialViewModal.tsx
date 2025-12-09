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
import {
  User,
  MessageSquare,
  Star,
  Calendar,
  Building,
  Tag,
  CheckCircle,
  Clock
} from "lucide-react";
import { Testimonial } from "@/services/testimonialApi";

interface TestimonialViewModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialViewModal: React.FC<TestimonialViewModalProps> = ({ testimonial, isOpen, onClose }) => {
  if (!testimonial) return null;

  const getStatusColor = (isApproved: boolean) => {
    return isApproved
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-yellow-500 hover:bg-yellow-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[700px] p-0 bg-white border-slate-200 shadow-xl 
                   max-h-[85vh] overflow-y-auto rounded-xl"
      >
        {/* Sticky Header */}
        <DialogHeader className="p-6 bg-slate-50 border-b border-slate-100 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Testimonial Details
            </DialogTitle>

            <Badge
              className={`${getStatusColor(
                testimonial.isApproved
              )} text-white border-0 px-3 py-1 flex items-center gap-1`}
            >
              {testimonial.isApproved ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              {testimonial.isApproved ? 'Approved' : 'Pending'}
            </Badge>
          </div>

          <DialogDescription className="text-slate-500 mt-1">
            Submitted on {format(new Date(testimonial.createdAt), "PPP 'at' p")}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6">
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3 h-3" /> Name
              </label>
              <p className="text-sm font-medium text-slate-900">{testimonial.name}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3 h-3" /> Position
              </label>
              <p className="text-sm font-medium text-slate-900">{testimonial.position}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3 h-3" /> Company
              </label>
              <p className="text-sm font-medium text-slate-900">{testimonial.company}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3" /> Event Type
              </label>
              <p className="text-sm font-medium text-slate-900">{testimonial.eventType}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3" /> Rating
            </label>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-slate-600">({testimonial.rating}/5 stars)</span>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Testimonial
            </label>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              "{testimonial.quote}"
            </div>
          </div>

          {/* Image */}
          {testimonial.image && testimonial.image !== '/placeholder.svg' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Image
              </label>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s testimonial`}
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" /> ID: {testimonial._id}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Last Updated: {format(new Date(testimonial.updatedAt), "PPP")}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialViewModal;
