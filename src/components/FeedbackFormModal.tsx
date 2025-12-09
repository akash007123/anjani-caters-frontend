import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Upload, X, MessageCircle } from "lucide-react";
import { testimonialApiService, type TestimonialFormData } from "@/services/testimonialApi";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackFormModal = ({ isOpen, onClose }: FeedbackFormModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    quote: "",
    name: "",
    position: "",
    company: "",
    rating: 5,
    eventType: "",
    image: undefined
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        quote: "",
        name: "",
        position: "",
        company: "",
        rating: 5,
        eventType: "",
        image: undefined
      });
      setImagePreview(null);
      setShowThankYou(false);
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof TestimonialFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.quote.trim() || !formData.name.trim() || !formData.position.trim() ||
        !formData.company.trim() || !formData.eventType) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await testimonialApiService.submitTestimonial(formData);
      setShowThankYou(true);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`h-6 w-6 ${
              star <= rating
                ? "fill-accent text-accent"
                : "text-muted-foreground hover:text-accent"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {showThankYou ? (
              <>
                <Star className="h-6 w-6 text-accent" />
                Thank You!
              </>
            ) : (
              <>
                <MessageCircle className="h-6 w-6 text-accent" />
                Share Your Experience
              </>
            )}
          </DialogTitle>
          {showThankYou ? (
            <p className="text-muted-foreground">
              Your testimonial has been submitted successfully. It will be reviewed before being published.
            </p>
          ) : (
            <p className="text-muted-foreground">
              We'd love to hear about your experience with Anjani Caters. Your feedback helps us improve and inspires others.
            </p>
          )}
        </DialogHeader>

        {showThankYou ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-accent fill-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Your feedback means the world to us!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for taking the time to share your experience. We're excited to hear from you and will review your testimonial shortly.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quote */}
          <div className="space-y-2">
            <Label htmlFor="quote" className="text-sm font-medium">
              Your Testimonial *
            </Label>
            <Textarea
              id="quote"
              placeholder="Tell us about your experience..."
              value={formData.quote}
              onChange={(e) => handleInputChange("quote", e.target.value)}
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Name and Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Your Name *
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">
                Your Position/Title *
              </Label>
              <Input
                id="position"
                placeholder="Event Host"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Company and Event Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Company/Location *
              </Label>
              <Input
                id="company"
                placeholder="ABC Company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-sm font-medium">
                Event Type *
              </Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wedding Reception">Wedding Reception</SelectItem>
                  <SelectItem value="Birthday Celebration">Birthday Celebration</SelectItem>
                  <SelectItem value="Corporate Event">Corporate Event</SelectItem>
                  <SelectItem value="Anniversary Celebration">Anniversary Celebration</SelectItem>
                  <SelectItem value="Charity Gala">Charity Gala</SelectItem>
                  <SelectItem value="Product Launch">Product Launch</SelectItem>
                  <SelectItem value="Intimate Dinner Party">Intimate Dinner Party</SelectItem>
                  <SelectItem value="Business Luncheon">Business Luncheon</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Rating *
            </Label>
            <div className="flex items-center gap-2">
              <StarRating rating={formData.rating} onRatingChange={handleRatingChange} />
              <span className="text-sm text-muted-foreground">
                {formData.rating} star{formData.rating !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Photo (Optional)
            </Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="image"
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Choose Image
                </Label>
              </div>
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: undefined }));
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upload a photo related to your event (max 5MB)
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackFormModal;