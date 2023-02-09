import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './page/SignUp';
import MenuBar from './components/MenuBar';
import Movies from './components/Movies';
import SignIn from './page/SignIn';
import MovieDetail from './page/MovieDetail';
import { RecoilRoot } from 'recoil';
import PickList from './page/PickList';

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
      { path: 'SignIn', element: <SignIn /> },
      { path: 'MovieDetail', element: <MovieDetail /> },
      { path: 'PickList', element: <PickList /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
