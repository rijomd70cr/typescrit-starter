import React, { lazy, Suspense, FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Loader } from '../../Components/Loader/Loader';

import { useAppSelector } from '../../Services/Hook/Hook';
import { getSideBarStatus } from '../../Layout/Reducer/LayoutActions'

type PropType = {
    component: React.FC;
}
const isAuthenticated = localStorage.getItem("user") ? true : false;


export const GeneralRoutes = () => {

    const isSideBarOpen = useAppSelector(getSideBarStatus);
    const Header = lazy(() => import('../../Layout/Components/Header'));
    const SideBar = lazy(() => import('../../Layout/Components/SideBar'));
    return (
        <div>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    {!isAuthenticated && <Header />}
                    {isSideBarOpen && <SideBar />}
                    <Routes>
                        {/* <Route path='/header' element={<Header />} />
                        <Route path='/home' element={<PrivateRoute component={SideBar} />} /> */}
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}



const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    if (isAuthenticated) return <Component />;
    return <Navigate to='/login' />;
};

export default PrivateRoute;
