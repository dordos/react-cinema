import './App.css';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MenuBar from './components/MenuBar';
import Movies from './components/Movies';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuBar />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
