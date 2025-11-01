import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles }: { roles?: string[] }) {
  const { isAuthenticated, user } = useSelector((s: any) => s.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

  // ✅ Check role access if provided
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}