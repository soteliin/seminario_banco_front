// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../styles/Estilos.css';

function Login({ switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('correo', email);
    formData.append('contrasena', password);

    try {
      // Use axios to send the form-data
      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Redirect to /houses if login is successful
        navigate('/houses');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.error || 'Login error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-body">
          <h2 className="login-title">Inicio de sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-input"
                id="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-input"
                id="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-btn">Iniciar sesión</button>
          </form>
          <span className="register-prompt">
            ¿No tienes cuenta? <a href="#" className="register-link" onClick={switchToRegister}>Regístrate</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
