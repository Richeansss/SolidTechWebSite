import {
  LoginPage,
  AdminDashboard,
  AdminSubDashboard,
  MainPage,
} from '../pages'
import RoleProtectedRoute from './RoleProtectedRoute'

export const routes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/create',
    element: (
        <RoleProtectedRoute element={<AdminDashboard />} allowedRoles={['ADMIN', 'MODERATOR', 'USER']} />
    ),
  },
  {
    path: '/sub-create',
    element: (
        <RoleProtectedRoute element={<AdminSubDashboard />} allowedRoles={['ADMIN', 'MODERATOR', 'USER']} />
    ),
  },
  { path: '/auth', element: <LoginPage />, exact: true },
]
