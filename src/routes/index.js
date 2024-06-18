import { Navigate, useRoutes } from 'react-router-dom';

// project import
import CommonLayout from 'layout/CommonLayout';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import Welcome from 'pages/welcome/welcome';
import GuestGuard from 'utils/route-guard/GuestGuard';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout layout="welcome" />,
        </GuestGuard>
      ),
      children: [
        {
          path: '/',
          element: <Welcome />
        }
      ]
    },
    LoginRoutes,
    MainRoutes,
    {
      path: '*',
      element: <Navigate to="/maintenance/404" replace />
    }
  ]);
}
