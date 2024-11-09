import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Houses from './components/Houses'; // Import the Houses component
import './styles/Estilos.css';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              isRegistering ? (
                <Register switchToLogin={switchToLogin} />
              ) : (
                <Login switchToRegister={switchToRegister} />
              )
            }
          />
          <Route path="/houses" element={<Houses />} /> {/* Route for the Houses page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
