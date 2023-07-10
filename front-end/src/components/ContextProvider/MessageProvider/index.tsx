import React, { createContext, useContext } from 'react';

// antd
import { message } from 'antd';

// interface
interface messageProviderProps {
  children?: React.ReactNode;
}

export interface messageObj {
  successAwait: (content: string) => void;
  success: (content: string) => void;
  loadingAsync: (loading: string, content: string) => void;
  error: (content: string) => void;
  warning: (content: string) => void;
  loading: (content: string) => void;
  destroy: () => void;
  holder: React.ReactNode;
}

const messageContext = createContext<messageObj>({
  successAwait: (content) => {
    message.success(content);
  },
  success: (content) => {
    message.success(content);
  },
  loadingAsync: (loading, content) => {
    message.loading(loading + content);
  },
  warning: (content) => {
    message.warning(content);
  },
  error: (content) => {
    message.error(content);
  },
  loading: (content) => {
    message.loading(content);
  },
  destroy: () => {
    message.destroy();
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

  const destroy = () => {
    messageApi.destroy();
  };

  const successAwait = async (content: string) => {
    await messageApi.open({
      type: 'success',
      content,
      duration: 0.2,
    });
    return Promise.resolve();
  };

  const success = (content: string) => {
    messageApi.open({
      type: 'success',
      content,
    });
  };

  const loading = (content: string) => {
    messageApi.open({
      type: 'loading',
      content,
    });
  };

  const loadingAsync = async (loading: string, content: string) => {
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
      content: `操作失败：${content}`,
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
        successAwait,
        success,
        error,
        warning,
        loading,
        loadingAsync,
        destroy,
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
  const {
    successAwait,
    success,
    error,
    warning,
    loading,
    loadingAsync,
    destroy,
    holder,
  } = useContext(messageContext);
  return {
    successAwait,
    success,
    error,
    warning,
    loading,
    loadingAsync,
    destroy,
    holder,
  };
};
