import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {App, ConfigProvider} from 'antd';
import {MainPage} from "./pages/MainPage/MainPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider>
            <App>
                <MainPage />
            </App>
        </ConfigProvider>
    </StrictMode>,
);