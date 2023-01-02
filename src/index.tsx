import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './page/SignUp';
import MenuBar from './page/MenuBar';
import Movies from './page/Movies';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
            <MenuBar />
            <Movies />
          </>
        ),
      },
      { path: 'SignUp', element: <SignUp /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
