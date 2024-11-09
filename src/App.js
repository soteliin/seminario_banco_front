import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './styles/Estilos.css';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  return (
    <div className="app-container">
      {isRegistering ? (
        <Register switchToLogin={switchToLogin} />
      ) : (
        <Login switchToRegister={switchToRegister} />
      )}
    </div>
  );
}

export default App;
