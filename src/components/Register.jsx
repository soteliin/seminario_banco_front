import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Estilos.css';

function Register({ switchToLogin }) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#121212', color: '#ffffff' }}>
            <div className="card" style={{ backgroundColor: '#1f1f1f', border: 'none' }}>
                <div className="card-body" style={{ width: '330px', margin: "30px"}}>
                    <h2 className="card-title text-center" style={{ color: '#ffffff' }}>Registro</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label" style={{ color: '#ffffff' }}>
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                placeholder="Ingrese su nombre completo"
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rfc" className="form-label" style={{ color: '#ffffff' }}>
                                RFC
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="rfc"
                                placeholder="Ingrese su RFC"
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edad" className="form-label" style={{ color: '#ffffff' }}>
                                Edad
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="edad"
                                placeholder="Ingrese su edad"
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label" style={{ color: '#ffffff' }}>
                                Teléfono
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="telefono"
                                placeholder="Ingrese su teléfono"
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label" style={{ color: '#ffffff' }}>
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="correo"
                                placeholder="Ingrese su correo electrónico"
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sueldo" className="form-label" style={{ color: '#ffffff' }}>
                                Sueldo
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="sueldo"
                                placeholder="Ingrese su sueldo"
                                step="0.01"
                                style={{
                                    backgroundColor: '#2c2c2c',
                                    color: '#ffffff',
                                    border: '1px solid #444',
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Registrarse
                        </button>
                    </form>
                    <span className="registro" >
                        ¿Ya tienes una cuenta? <a href="#" className="login-link" onClick={switchToLogin} >Inicia sesión</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;
