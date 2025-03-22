
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';

type UserRole = 'user' | 'staff' | 'admin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-eco-600 animate-spin" />
          <p className="text-lg font-medium text-eco-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || userRole !== requiredRole) {
    // Redirect to the appropriate auth page
    return <Navigate to={`/auth/${requiredRole}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
