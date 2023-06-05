import React from 'react';
import { useRoutes } from 'react-router';
import routes from '@/routes';
import './App.scss';

function App() {
  const element = useRoutes(routes);
  return (
    <div id="app" style={{ height: '100%' }}>
      {element}
    </div>
  );
}

export default App;
