import React, { createContext, useContext } from 'react';

// antd
import { message } from 'antd';

// interface
interface messageProviderProps {
  children?: React.ReactNode;
}

export interface messageObj {
  success: (content: string) => void;
  loadingAsync: (loading: string, content: string) => void;
  loadingSuccessAsync: (loading: string, content: string) => void;
  error: (content: string) => void;
  warning: (content: string) => void;
  holder: React.ReactNode;
}

const messageContext = createContext<messageObj>({
  success: (content) => {
    message.success(content);
  },
  loadingAsync: (loading, content) => {
    message.loading(loading + content);
  },
  loadingSuccessAsync: (loading, content) => {
    message.loading(loading + content);
  },
  warning: (content) => {
    message.warning(content);
  },
  error: (content) => {
    message.error(content);
  },
  holder: <></>,
});

const MessageProvider: React.FC<messageProviderProps> = ({ children }) => {
  // message配置
  const config = {
    top: 70,
    maxCount: 1,
    duration: 1.5,
  };
  const [messageApi, contextHolder] = message.useMessage(config);

  const success = (content: string) => {
    messageApi.open({
      type: 'success',
      content,
    });
  };

  const loadingAsync = async (loading: string, content: string) => {
    await messageApi.open({
      type: 'loading',
      content: loading,
      duration: 1,
    });
    success(content);
    return Promise.resolve();
  };

  const loadingSuccessAsync = async (loading: string, content: string) => {
    await messageApi.open({
      type: 'loading',
      content: loading,
      duration: 1,
    });
    await messageApi.open({
      type: 'success',
      content,
      duration: 1,
    });
    return Promise.resolve();
  };

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content,
    });
  };

  const warning = (content: string) => {
    messageApi.open({
      type: 'warning',
      content,
    });
  };

  return (
    <messageContext.Provider
      value={{
        success,
        error,
        warning,
        loadingAsync,
        loadingSuccessAsync,
        holder: contextHolder,
      }}
    >
      {contextHolder}
      {children}
    </messageContext.Provider>
  );
};

export default MessageProvider;

export const useGlobalMessage = () => {
  const { success, error, warning, loadingAsync, loadingSuccessAsync, holder } =
    useContext(messageContext);
  return { success, error, warning, loadingAsync, loadingSuccessAsync, holder };
};
