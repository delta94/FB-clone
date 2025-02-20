import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { CometLoggedInFBApp } from '@fb-platform/CometLoggedInFBApp';

import { ExamplePage } from './example';
import { Home } from './home';

const AuthLayout = () => {
  return (
    <CometLoggedInFBApp>
      <Outlet />
    </CometLoggedInFBApp>
  );
};

function ProtectedLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    // loader: authLoader(queryClient),
    element: <AuthLayout />,
    path: '/',
    children: [
      // {
      //   element: <LoginLayout />,
      //   path: 'login',
      //   children: [{ index: true, element: <Login /> }],
      // },
      {
        path: '',
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'example',
            element: <ExamplePage />,
          },
        ],
      },
    ],
  },
  {
    path: '/healthz',
    element: <h3>Hey There!!! The App is Healthy</h3>,
  },
]);
