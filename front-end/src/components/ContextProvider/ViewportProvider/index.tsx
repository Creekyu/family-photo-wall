import React, { createContext, useContext, useEffect } from 'react';

interface ViewportProviderProps {
  children?: React.ReactNode;
}

interface viewportContextObj {
  width: number;
  height: number;
}

const viewportContext = createContext<viewportContextObj>({
  width: window.innerWidth,
  height: window.innerHeight,
});

const ViewportProvider: React.FC<ViewportProviderProps> = ({ children }) => {
  // 顺带监听下高度，备用
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};
export default ViewportProvider;

// 暴露接口获取context值
export const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  return { width, height };
};
