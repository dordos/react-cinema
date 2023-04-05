import './App.css';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MenuBar from './components/ui/MenuBar';

const queryClient = new QueryClient();
function App() {
  console.log('d');
  return (
    // <QueryClientProvider client={queryClient}>
    <>
      <MenuBar />
      <Outlet />
    </>
    // <ReactQueryDevtools initialIsOpen={true} />
    // </QueryClientProvider>
  );
}

export default App;
