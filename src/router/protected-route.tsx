import { UserState } from '@/types';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
  const user = useSelector((state: UserState) => state.user);
  const location = useLocation();

  if (!user.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
