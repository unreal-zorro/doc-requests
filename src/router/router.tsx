import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { AuthPage, ErrorPage, RequestPage } from '@/pages';
import { RequestForm, RequestTable } from '@/pages/request-page';
import { ProtectedRoute } from './protected-route';
export { ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
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
        path: '',
        element: <ProtectedRoute />,
        children: [
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
    ]
  }
]);
