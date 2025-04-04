import {createBrowserRouter, RouteObject} from "react-router-dom";
import {FC} from "react";
import {MainPage} from './pages/MainPage/MainPage.tsx';
import {AuthPage} from './pages/AuthPage/AuthPage.tsx';

const path = (path: string, Page: FC): RouteObject => ({
    path,
    element: <Page />,
});

export const router = createBrowserRouter([
    {
        children: [
            path('/', MainPage),
            path('/auth', AuthPage),
        ]
    }
])