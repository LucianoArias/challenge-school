import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Admin from '../pages/Admin/Admin';

export const PATHS = {
  private: [
    {
      path: '/user/dashboard',
      element: <Dashboard />,
    },

    {
      path: '/home',
      element: <Home />,
    },

    {
      path: '*',
      element: <Home />,
    },
  ],

  noLoggedIn: [
    {
      path: '/home',
      element: <Home />,
    },

    {
      path: '*',
      element: <Home />,
    },
  ],

  admin: [
    {
      path: '/admin/dashboard',
      element: <Admin />,
    },

    {
      path: '/home',
      element: <Home />,
    },

    {
      path: '*',
      element: <Home />,
    },
  ],
};
