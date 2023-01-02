import './App.css';
import Movies from './page/Movies';
import MenuBar from './page/MenuBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingUp from './page/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <MenuBar />
        <Movies />
      </>
    ),
  },
  {
    path: '/SingUp',
    element: <SingUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
