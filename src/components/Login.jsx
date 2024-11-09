import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Estilos.css'


function Login({ switchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/login', { correo: email, password });
            console.log('User data:', response.data);
            // Handle successful login (e.g., store user data or redirect)
        } catch (error) {
            console.error('Error during login:', error.response?.data?.error || 'Login error');
            // Handle login error
          }
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#121212', color: '#ffffff' }}>
            <div className="card" style={{ backgroundColor: '#1f1f1f', border: 'none' }}>
                <div className="card-body" style={{ width: '330px', margin: '20px' }}>
                    <h2 className="card-title text-center" style={{ color: '#ffffff' }}>Inicio de sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: '#ffffff' }}>
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Ingrese su correo"
                                value={email} // Bind email state
                                onChange={(e) => setEmail(e.target.value)} // Update email state
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: '#ffffff' }}>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingrese su contraseña"
                                value={password} // Bind password state
                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" >
                            Iniciar sesión
                        </button>
                    </form>
                    <span className="registro" >
                        ¿No tienes cuenta? <a href="#" className="register-link" onClick={switchToRegister}>Regístrate</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
