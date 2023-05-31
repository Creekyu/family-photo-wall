import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// antd
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';

// comp
import App from './App';

// css
import 'reset-css';
import './index.scss';

// redux
import { store, persistor } from '@/redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Provider
import ModalProvider from '@/components/ContextProvider/ModalProvider';
import MessageProvider from '@/components/ContextProvider/MessageProvider';
import ViewportProvider from '@/components/ContextProvider/ViewportProvider';

// global
import { THEME_COLOR } from '@/global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            colorPrimary: THEME_COLOR,
          },
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ViewportProvider>
              <MessageProvider>
                <ModalProvider>
                  <App />
                </ModalProvider>
              </MessageProvider>
            </ViewportProvider>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
