import './App.css';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MenuBar from './components/ui/MenuBar';
import Movies from './components/ui/Movies';

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
