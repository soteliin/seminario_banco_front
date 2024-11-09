import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Estilos.css'

function Login({ switchToRegister }) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#121212', color: '#ffffff' }}>
            <div className="card" style={{ backgroundColor: '#1f1f1f', border: 'none' }}>
                <div className="card-body" style={{ width: '330px', margin: '20px' }}>
                    <h2 className="card-title text-center" style={{ color: '#ffffff' }}>Inicio de sesión</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: '#ffffff' }}>
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Ingrese su correo"
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
