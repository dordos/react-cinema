// import './App.css';
// import { Outlet } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import React, { useEffect, useState } from 'react';

// // const ReactQueryDevtoolsProduction = React.lazy(() =>
// //   import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
// //     default: d.ReactQueryDevtools,
// //   }))
// // );

// function App() {
//   // const [showDevtools, setShowDevtools] = React.useState(false);
//   // React.useEffect(() => {
//   //   //@ts-ignore
//   //   window.toggleDevtools = () => setShowDevtools((old) => !old);
//   // }, []);
//   return <Outlet />;
// }

// export default App;

import './App.css';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={true} />
      {/* <Outlet /> */}
    </>
  );
}

export default App;
