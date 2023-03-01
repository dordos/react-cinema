import './App.css';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect, useState } from 'react';

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

function App() {
  const [showDevtools, setShowDevtools] = useState(false);
  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
}

export default App;
