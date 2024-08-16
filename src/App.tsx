import React from 'react';
import './assets/styles/reset.css';
import './assets/fonts/fonts.css';
import './App.css';
import AppRoutes from './Routes/Routes';

function App() {
  return (
    <div className="root">
      <AppRoutes />
    </div>
  );
}

export default App;
