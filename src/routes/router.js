import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../pages/Login';
import ProtectedRoute from './protected-route';
import Home from '../pages/Home';
import Claims from '../pages/Claims';
import Physician from '../pages/Physician';
import Files from '../pages/Files';
import Payments from '../pages/Payments';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login setAuth={setIsAuthenticated} />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'claims',
          element: <Claims />,
        },
        {
          path: 'physician',
          element: <Physician />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
