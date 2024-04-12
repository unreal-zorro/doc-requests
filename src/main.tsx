import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthPage, ErrorPage, RequestPage } from './pages';
import { RequestForm, RequestTable } from './pages/request-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <AuthPage />
      },
      {
        path: 'request',
        element: <RequestPage />,
        children: [
          {
            path: '',
            element: <RequestForm />
          },
          {
            path: 'table',
            element: <RequestTable />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
