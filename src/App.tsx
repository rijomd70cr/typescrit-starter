import React, { lazy, Suspense } from 'react';
import { Loader } from './Components/Loader/Loader';

function App() {
  const Header = lazy(() => import('./Layout/Header'));
  const SideBar = lazy(() => import('./Layout/SideBar'));
  const Sample = lazy(() => import('./Modules/Auth/Views/Sample'));

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Header />
        <SideBar />
        <Sample />
      </Suspense>
    </div>
  );
}

export default App;
