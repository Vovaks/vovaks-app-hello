import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from '../router';
import { useAppSelector } from '../hooks';
import LayoutWrapper from './LayoutWrapper';

export interface RouteConfig {
    path: string;
    component: React.ComponentType;
}

const AppRouter: React.FC = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth)
    const routesToRender = isAuthenticated ? privateRoutes : publicRoutes;
    const fallbackRoute = isAuthenticated ? RouteNames.NEWS : RouteNames.LOGIN;

    return (
        <Routes>
            {routesToRender.map(({ path, name, component: Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <LayoutWrapper header={name} isAuthenticated={isAuthenticated}>
                            <Component />
                        </LayoutWrapper>
                    }
                />
            ))}
            <Route path="*" element={<Navigate to={fallbackRoute} replace />} />
        </Routes>
    );
};

export default AppRouter;