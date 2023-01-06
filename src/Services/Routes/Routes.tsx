import React, { lazy, Suspense, FC, useCallback } from 'react';
import { BrowserRouter, Route, Routes, Navigate, } from "react-router-dom";

import { Loader } from '../../Components/Loader/Loader';

import { useAppSelector } from '../../Services/Hook/Hook';
import { getSideBarStatus } from '../../Layout/Reducer/LayoutActions';

import containers from '../../Modules'

type PropType = {
    component: React.FC;
    auth: boolean
}
let isAuthenticated: (boolean);


export const GeneralRoutes = () => {
    const isSideBarOpen = useAppSelector(getSideBarStatus);

    const Header = lazy(() => import('../../Layout/Components/Header'));
    const SideBar = lazy(() => import('../../Layout/Components/SideBar'));
    const Login = lazy(() => import('../../Modules/Auth/Views/Login'));

    isAuthenticated = localStorage.getItem("user") ? true : false;

    const PrivateRoute: FC<PropType> = ({ component: Component, auth: Auth }) => {
        if (Auth) {
            if (isAuthenticated) { return <Component />; }
            else { return <Navigate to='/login' />; }
        }
        return <Component />;
    };

    const renderGeneratedRoutes = useCallback(
        () => {
            let element = [];
            for (let data in containers) {
                let router = containers[data].router;
                let moduleName = containers[data].moduleName;
                for (let item of router) {
                    let elementPath = item.elementPath;
                    let auth = item.auth;
                    const generated = lazy(() => import('../../Modules/' + moduleName + '/Views/' + elementPath));
                    element.push(
                        <Routes key={elementPath}>
                            {item.path === '/login' && <Route path='/login' element={<Login />} />}
                            {item.path !== '/login' && <Route path={item.path} element={< PrivateRoute component={generated} auth={auth} />} />}
                        </Routes>
                    )
                }
            }
            return element;
        }, [window?.location?.pathname])


    return (
        <div>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    {!window.location.pathname.includes('login' || 'signup') && isAuthenticated && <Header />}
                    <div style={{ display: "flex", minHeight: "90vh" }}>
                        {isSideBarOpen && <SideBar />}
                        {renderGeneratedRoutes()}
                    </div>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}





