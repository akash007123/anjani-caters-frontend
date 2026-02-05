import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
          <p className="text-xl text-gray-600">You don't have permission to access this page</p>
          <p className="text-gray-500 mt-2">Required role: {allowedRoles.join(' or ')}</p>
          <a href="/admin" className="text-primary hover:underline mt-4 inline-block">
            Go back to dashboard
          </a>
        </div>
      </div>
    );
  }

  // If children are provided, render them; otherwise render Outlet
  if (children) {
    return <>{children}</>;
  }

  // Render child routes
  return <Outlet />;
}
