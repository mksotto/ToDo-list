import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {App} from 'antd';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App>
                <RouterProvider router={router}/>
            </App>
        </QueryClientProvider>
    </StrictMode>,
);