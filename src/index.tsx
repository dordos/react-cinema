import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import MovieDetail from './page/MovieDetail';
import PickList from './page/PickList';
import Cart from './page/Cart';
import OrderList from './page/OrderList';
import Home from './page/Home';
import Series from './page/Series';
import SeriesDetail from './page/SeriesDetail';
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/SignUp`, element: <SignUp /> },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/SignIn`, element: <SignIn /> },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/MovieDetail`, element: <MovieDetail /> },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/PickList`, element: <PickList /> },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/Cart`, element: <Cart /> },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/OrderList`, element: <OrderList /> },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/Series`, element: <Series /> },
        { path: `${process.env.REACT_APP_PUBLIC_URL}/SeriesDetail`, element: <SeriesDetail /> },
      ],
    },
  ],
  { basename: process.env.REACT_APP_PUBLIC_URL }
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
