import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoadingCard from "@/components/common/LoadingCard";

interface PrivateRouteProps {
  children: ReactNode;
}

// Protected route component - redirects to login if not authenticated
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking auth state
  if (loading) {
    return <LoadingCard />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
}
