import './App.css';
import Movies from './page/Movies';
import MenuBar from './page/MenuBar';
import { Outlet } from 'react-router-dom';

function App() {
  return <Outlet />;
}

export default App;
