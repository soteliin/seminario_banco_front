import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Estilos.css';

function Register({ switchToLogin }) {
  // State variables for form fields
  const [nombre, setNombre] = useState('');
  const [rfc, setRfc] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [sueldo, setSueldo] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Add your registration logic here, like making a POST request to your backend
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#121212', color: '#ffffff' }}>
      <div className="card" style={{ backgroundColor: '#1f1f1f', border: 'none' }}>
        <div className="card-body" style={{ width: '330px', margin: "30px" }}>
          <h2 className="card-title text-center" style={{ color: '#ffffff' }}>Registro</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label" style={{ color: '#ffffff' }}>
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingrese su nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ backgroundColor: '#2c2c2c', color: '#ffffff', border: '1px solid #444' }}
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
                value={rfc}
                onChange={(e) => setRfc(e.target.value)}
                style={{ backgroundColor: '#2c2c2c', color: '#ffffff', border: '1px solid #444' }}
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
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                style={{ backgroundColor: '#2c2c2c', color: '#ffffff', border: '1px solid #444' }}
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
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={{ backgroundColor: '#2c2c2c', color: '#ffffff', border: '1px solid #444' }}
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
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                style={{ backgroundColor: '#2c2c2c', color: '#ffffff', border: '1px solid #444' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena" className="form-label" style={{ color: '#ffffff' }}>
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="contrasena"
                placeholder="Ingrese su contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                style={{ backgroundColor: '#2c2c2c', color: '#ffffff', border: '1px solid #444' }}
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
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                style={{ backgroundColor: '#2c2c2c', color: '#ffffff', border: '1px solid #444' }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Registrarse
            </button>
          </form>
          <span className="registro">
            ¿Ya tienes una cuenta? <a href="#" className="login-link" onClick={switchToLogin}>Inicia sesión</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
