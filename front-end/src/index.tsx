import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.scss';
import 'reset-css';

// Provider
import ModalProvider from '@/components/ContextProvider/ModalProvider';
import MessageProvider from '@/components/ContextProvider/MessageProvider';
import ViewportProvider from '@/components/ContextProvider/ViewportProvider';
import { THEME_COLOR } from '@/global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: THEME_COLOR,
          },
        }}
      >
        <ViewportProvider>
          <MessageProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </MessageProvider>
        </ViewportProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
