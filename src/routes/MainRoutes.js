/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Configuration from 'pages/configuration/configuration';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

const Profile = Loadable(lazy(() => import('pages/profile')));
const ProfileTabPersonal = Loadable(lazy(() => import('sections/profile/TabPersonal')));
const ProfileTabPassword = Loadable(lazy(() => import('sections/profile/TabPassword')));

// render - sample page
const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <DashboardAnalytics />
        },
        {
          path: 'configuration',
          element: <Configuration />
        },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            {
              path: '',
              element: <ProfileTabPersonal />
            },
            {
              path: 'password',
              element: <ProfileTabPassword />
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
