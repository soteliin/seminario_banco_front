import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Estilos.css';

function Login({ switchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/login', { correo: email, password });
    //         console.log('User data:', response.data);
    //         // Handle successful login (e.g., store user data or redirect)
    //     } catch (error) {
    //         console.error('Error during login:', error.response?.data?.error || 'Login error');
    //         // Handle login error
    //     }
    // };

    const handleLogin = async (e) => {
      e.preventDefault();
  
      // Create a new FormData object
      const formData = new FormData();
      formData.append('correo', email);
      formData.append('contrasena', password); // Use 'contrasena' instead of 'password' to match your backend
  
      try {
          // Use axios to send the form-data
          const response = await axios.post('http://localhost:5000/login', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log('User data:', response.data);
          // Handle successful login (e.g., store user data or redirect)
      } catch (error) {
          console.error('Error during login:', error.response?.data?.error || 'Login error');
          // Handle login error
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
