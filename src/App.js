import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import Houses from './components/Houses'; // Import Houses component
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './styles/Estilos.css';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  // Check if email exists in localStorage
  const isAuthenticated = !!localStorage.getItem('userEmail');

  return (
    <Router>
      <Container fluid className="app-container-dark">
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
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Home>
                  <Houses /> {/* Render the Houses component inside Home */}
                </Home>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/edit-profile"
            element={
              isAuthenticated ? (
                <Home>
                  <EditProfile /> {/* Render the EditProfile component inside Home */}
                </Home>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
