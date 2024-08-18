import React from 'react';
import './assets/styles/reset.css';
import './assets/fonts/fonts.css';
import './assets/styles/styles.css';
import AppRoutes from './Routes/Routes';

function App() {
  React.useEffect(() => {
    const clearSessionStorage = () => {
      sessionStorage.clear();
    };
    window.addEventListener('beforeunload', clearSessionStorage);
    return () => {
      window.removeEventListener('beforeunload', clearSessionStorage);
    };
  }, []);
  return (
    <div className={'root'}>
      <AppRoutes />
    </div>
  );
}

export default App;
