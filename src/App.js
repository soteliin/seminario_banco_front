import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  return (
    // <div className="card-body">
     <div>
      {isRegistering ? (
        <Register switchToLogin={switchToLogin} />
      ) : (
        <Login switchToRegister={switchToRegister} />
      )}
    </div>
  );
}

export default App;
