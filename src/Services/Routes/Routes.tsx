import React, { lazy, Suspense, FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, } from "react-router-dom";

import { Loader } from '../../Components/Loader/Loader';

import { useAppSelector } from '../../Services/Hook/Hook';
import { getSideBarStatus } from '../../Layout/Reducer/LayoutActions';
import { getAuthAction } from '../../Modules/Auth/Reducer/AuthAction';

import containers from '../../Modules'

type PropType = {
    component: React.FC;
    auth: boolean
}
let isAuthenticated: (boolean);


export const GeneralRoutes = () => {
    const isAuth = useAppSelector(getAuthAction);
    const isSideBarOpen = useAppSelector(getSideBarStatus);

    const Header = lazy(() => import('../../Layout/Components/Header'));
    const SideBar = lazy(() => import('../../Layout/Components/SideBar'));
    const Login = lazy(() => import('../../Modules/Auth/Views/Login'));

    useEffect(() => {
        isAuthenticated = localStorage.getItem("user") ? true : false;
    }, [isAuth])


    const PrivateRoute: FC<PropType> = ({ component: Component, auth: Auth }) => {
        if (Auth) {
            console.log(isAuthenticated, "isAuthenticated")
            if (isAuthenticated) { return <Component />; }
            else { return <Navigate to='/login' />; }
        }
        return <Component />;
    };

    const renderGeneratedRoutes = () => {
        for (let item in containers) {
            let router = containers[item].router;
            let moduleName = containers[item].moduleName;

            for (let item of router) {
                let elementPath = item.elementPath;
                let auth = item.auth;
                if (item.path !== '/login') {
                    const generated = lazy(() => import('../../Modules/' + moduleName + '/Views/' + elementPath));
                    return <Route path={item.path} element={< PrivateRoute component={generated} auth={auth} />} />
                }
            }
        }
    }

    return (
        <div>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    {isAuthenticated && <Header />}
                    <div style={{ display: "flex" }}>
                        {isSideBarOpen && <SideBar />}
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            {renderGeneratedRoutes()}
                        </Routes>
                    </div>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}





