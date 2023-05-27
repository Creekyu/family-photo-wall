import React, { createContext, useContext } from 'react';

// antd
import { Modal } from 'antd';

// interface
interface ConfigObj {
  title: string;
  content: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

interface ModalContext {
  error: (config: ConfigObj) => void;
  info: (config: ConfigObj) => void;
  confirm: (config: ConfigObj) => void;
  success: (config: ConfigObj) => void;
  warning: (config: ConfigObj) => void;
}

interface ModalProviderProps {
  children?: React.ReactNode;
}

const modalContext = createContext<ModalContext>({
  error: (config) => {
    //pass
  },
  info: (config) => {
    //pass
  },
  confirm: (config) => {
    //pass
  },
  success: (config) => {
    //pass
  },
  warning: (config) => {
    //pass
  },
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, contextHolder] = Modal.useModal();
  const error = (config: ConfigObj) => {
    modal.error(config);
  };

  const info = (config: ConfigObj) => {
    modal.info(config);
  };

  const confirm = (config: ConfigObj) => {
    modal.confirm(config);
  };

  const success = (config: ConfigObj) => {
    modal.success(config);
  };

  const warning = (config: ConfigObj) => {
    modal.warning(config);
  };
  return (
    <modalContext.Provider value={{ error, info, confirm, success, warning }}>
      {contextHolder}
      {children}
    </modalContext.Provider>
  );
};

export default ModalProvider;

export const useGlobalModal = () => {
  return useContext(modalContext);
};
