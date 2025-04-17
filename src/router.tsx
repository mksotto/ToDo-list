import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainPage} from './pages/MainPage/MainPage.tsx';
import {AuthPage} from './pages/AuthPage/AuthPage.tsx';
import {ProfilePage} from "./pages/ProfilePage/ProfilePage.tsx";
import {PageType} from "./types/PageType.ts";
import {AUTH_BASE_URL, BASE_URL, PROFILE_BASE_URL} from "./constants/constants.ts";

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
            path(PROFILE_BASE_URL, ProfilePage),
        ],
    },
]);