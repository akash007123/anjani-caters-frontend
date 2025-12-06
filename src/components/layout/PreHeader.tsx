import { Phone, Mail, Clock } from "lucide-react";

const PreHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground py-2 text-sm">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
              <Phone className="h-4 w-4" />
              <span>+91 123 456 7890</span>
            </a>
            <a href="mailto:akashraikwar763@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">akashraikwar763@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
