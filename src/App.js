import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Houses from './components/Houses';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

// // Import custom CSS for background
 import './styles/Estilos.css'; // Create or update your CSS file

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  return (
    <Router>
      <div className="app-container-dark"> {/* Apply custom dark background class */}
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
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
            <Route path="/houses" element={<Houses />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
