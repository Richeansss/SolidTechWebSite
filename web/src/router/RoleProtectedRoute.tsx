import { FC, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {selectIsAuthenticated, selectUserRole} from "../store/slice/authSlice.ts";

interface IRoleProtectedRouteProps {
  element: ReactElement
  allowedRoles: string[]
}
const RoleProtectedRoute: FC<IRoleProtectedRouteProps> = ({ element, allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  // Пока авторизация не определена — просто ничего не рендерим
  if (isAuthenticated === undefined || userRole === undefined) {
    return null; // или Loader
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!userRole) {
    return <Navigate to='/auth' replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to='/' replace />;
  }

  return element;
};

export default RoleProtectedRoute;

