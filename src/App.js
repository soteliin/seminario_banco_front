import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import Houses from './components/Houses';
import HouseDetails from './components/HouseDetails';
import UserCotizaciones from './components/UserCotizaciones';
import CotizacionDetails from './components/CotizacionDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './styles/Estilos.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State to handle switching between Login and Register

  // Function to validate user email
  const validateUserEmail = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    try {
      const response = await axios.get(`http://localhost:5000/get-user?email=${email}`);
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error validating user email:', error);
      setIsAuthenticated(false);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Run validation on component mount
  useEffect(() => {
    validateUserEmail();
  }, []);

  return (
    <Router>
      <Container fluid className="app-container-dark">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                isRegistering ? (
                  <Register switchToLogin={() => setIsRegistering(false)} />
                ) : (
                  <Login switchToRegister={() => setIsRegistering(true)} onLogin={validateUserEmail} />
                )
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout}>
                  <Houses />
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
                <Home onLogout={handleLogout}>
                  <EditProfile />
                </Home>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/house-details/:id"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout}>
                  <HouseDetails />
                </Home>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/cotizaciones"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout}>
                  <UserCotizaciones />
                </Home>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/cotizacion-details/:id_cotizacion"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout}>
                  <CotizacionDetails />
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
