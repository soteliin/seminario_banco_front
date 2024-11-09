import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Estilos.css'; // Use this CSS file for styling

function Register({ switchToLogin }) {
    const [nombre, setNombre] = useState('');
    const [rfc, setRfc] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [sueldo, setSueldo] = useState('');
    const [estadoCivil, setEstadoCivil] = useState(''); // State for selected estado civil
    const [estadosCiviles, setEstadosCiviles] = useState([]);

    useEffect(() => {
        const fetchEstadosCiviles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/estado-civil');
                setEstadosCiviles(response.data);
            } catch (error) {
                console.error('Error fetching estados civiles:', error);
            }
        };

        fetchEstadosCiviles();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        // Prepare the form data for submission
        const formData = {
            nombre_completo: nombre,
            rfc,
            edad,
            telefono,
            correo,
            contrasena,
            sueldo,
            id_estado_civil: estadoCivil, // Add the selected estado civil
        };

        try {
            // Make the POST request to register the user
            const response = await axios.post('http://localhost:5000/register', formData);

            if (response.status === 201) {
                // If registration is successful, switch to the login form
                switchToLogin();
            }
            // Handle successful registration (e.g., redirect or show a message)
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Registro</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="nombre" className="form-label">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            className="form-input"
                            placeholder="Ingrese su nombre completo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rfc" className="form-label">RFC</label>
                        <input
                            type="text"
                            id="rfc"
                            className="form-input"
                            placeholder="Ingrese su RFC"
                            value={rfc}
                            onChange={(e) => setRfc(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edad" className="form-label">Edad</label>
                        <input
                            type="number"
                            id="edad"
                            className="form-input"
                            placeholder="Ingrese su edad"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            className="form-input"
                            placeholder="Ingrese su teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="correo" className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            className="form-input"
                            placeholder="Ingrese su correo electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            className="form-input"
                            placeholder="Ingrese su contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sueldo" className="form-label">Sueldo</label>
                        <input
                            type="number"
                            id="sueldo"
                            className="form-input"
                            placeholder="Ingrese su sueldo"
                            step="0.01"
                            value={sueldo}
                            onChange={(e) => setSueldo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estadoCivil" className="form-label">Estado Civil</label>
                        <select
                            id="estadoCivil"
                            className="form-input"
                            value={estadoCivil}
                            onChange={(e) => setEstadoCivil(e.target.value)}
                        >
                            <option value="">Seleccione su estado civil</option>
                            {estadosCiviles.map((estado) => (
                                <option key={estado.id_estado_civil} value={estado.id_estado_civil}>
                                    {estado.estado_civil}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Registrarse</button>
                </form>
                <span className="login-prompt">
                    ¿Ya tienes una cuenta?{' '}
                    <a href="#" onClick={switchToLogin} className="login-link">Inicia sesión</a>
                </span>
            </div>
        </div>
    );
}

export default Register;
