import { useState } from 'react';
import { X, Star, Upload, User, Mail, MapPin, Briefcase, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface TestimonialFormProps {
  open: boolean;
  onClose: () => void;
}

const TestimonialForm = ({ open, onClose }: TestimonialFormProps) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [profilePic, setProfilePic] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    location: '',
    feedback: ''
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePic = () => {
    setProfilePic('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.designation || !formData.location || !formData.feedback || rating === 0) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields and select a rating.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating,
          profilePic
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Thank You!',
          description: 'Your testimonial has been submitted successfully and will be displayed after review.',
          variant: 'default'
        });
        resetForm();
        onClose();
      } else {
        throw new Error(data.message || 'Failed to submit testimonial');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit testimonial. Please try again.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      designation: '',
      location: '',
      feedback: ''
    });
    setRating(0);
    setProfilePic('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-primary">
            Share Your Experience
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacityoutline-none focus:ring-2-100 focus: focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {profilePic ? (
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  <button
                    type="button"
                    onClick={removeProfilePic}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
              <Label
                htmlFor="profilePic"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Photo
              </Label>
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-center space-y-2">
            <Label className="text-sm font-medium">Rate Your Experience</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-accent text-accent'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating === 0 && 'Select a rating'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </span>
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Mobile and Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Mobile <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Designation <span className="text-red-500">*</span>
              </Label>
              <Input
                id="designation"
                name="designation"
                placeholder="Your role/position"
                value={formData.designation}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location (City) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Your city/location"
              value={formData.location}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Your Feedback <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="feedback"
              name="feedback"
              placeholder="Share your experience with us..."
              value={formData.feedback}
              onChange={handleChange}
              required
              className="min-h-[120px] focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;
