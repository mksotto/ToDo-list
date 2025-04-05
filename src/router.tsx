import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainPage} from './pages/MainPage/MainPage.tsx';
import {AuthPage} from './pages/AuthPage/AuthPage.tsx';
import {PageType} from "./types/PageType.ts";
import {AUTH_BASE_URL, BASE_URL} from "./constants/constants.ts";

const path = (path: string, Page: PageType): RouteObject => ({
    path,
    element: <Page />,
    loader: Page.loader
});

export const router = createBrowserRouter([
    {
        children: [
            path(BASE_URL, MainPage),
            path(AUTH_BASE_URL, AuthPage),
        ]
    }
]);