// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
// import SignUp from './page/SignUp';
// import SignIn from './page/SignIn';
// import MovieDetail from './page/MovieDetail';
// import PickList from './page/PickList';
// import Cart from './page/Cart';
// import OrderList from './page/OrderList';
// import Home from './page/Home';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// const queryClient = new QueryClient();
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         index: true,
//         path: '/',
//         element: <Home />,
//       },
//       { path: 'SignUp', element: <SignUp /> },
//       { path: 'SignIn', element: <SignIn /> },
//       { path: 'MovieDetail', element: <MovieDetail /> },
//       { path: 'PickList', element: <PickList /> },
//       { path: 'Cart', element: <Cart /> },
//       { path: 'OrderList', element: <OrderList /> },
//     ],
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <QueryClientProvider client={queryClient}>
//     <RouterProvider router={router} />
//     <ReactQueryDevtools initialIsOpen={false} />
//   </QueryClientProvider>
// );
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      { path: 'SignUp', element: <SignUp /> },
      { path: 'SignIn', element: <SignIn /> },
      { path: 'MovieDetail', element: <MovieDetail /> },
      { path: 'PickList', element: <PickList /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'OrderList', element: <OrderList /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
