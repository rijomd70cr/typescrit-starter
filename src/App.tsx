import React, { lazy, Suspense } from 'react';
import { Loader } from './Components/Loader/Loader';

function App() {
  const Header = lazy(() => import('./Layout/Header'));
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>
    </div>
  );
}

export default App;
