import {
  LoginPage,
  AdminDashboard,
  AdminSubDashboard,
  MainPage,
} from '../pages'
import RoleProtectedRoute from './RoleProtectedRoute'
import PCDetails from "../pages/PCPage/PCDetails.tsx";

export const routes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: "/pc/:id",
    element: <PCDetails/>,
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
