import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <Search className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-6xl font-bold text-slate-800 mb-2">404</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-slate-700">Page Not Found</h2>
          <p className="text-slate-600 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Button asChild size="lg" className="mt-6">
            <a href="/" className="inline-flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
