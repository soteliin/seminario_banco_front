import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

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
    const formData = {
      nombre_completo: nombre,
      rfc,
      edad,
      telefono,
      correo,
      contrasena,
      sueldo,
      id_estado_civil: estadoCivil,
    };

    try {
      const response = await axios.post('http://localhost:5000/register', formData);

      if (response.status === 201) {
        switchToLogin();
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Container data-bs-theme="dark" className="d-flex justify-content-center align-items-center min-vh-100 margin">
    {/* <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light text-dark"> */}
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="p-4 shadow-sm border rounded my-5">
          {/* <Card className="p-4 shadow-sm bg-white border rounded"> */}
            <Card.Body>
              <h2 className="mb-3 text-center font-weight-bold">Registro</h2>
              <Form onSubmit={handleRegister}>
                <Form.Group controlId="nombre" className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="rfc" className="mb-3">
                  <Form.Label>RFC</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su RFC"
                    value={rfc}
                    onChange={(e) => setRfc(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="edad" className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese su edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="telefono" className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="correo" className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="contrasena" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="sueldo" className="mb-3">
                  <Form.Label>Sueldo</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese su sueldo"
                    step="0.01"
                    value={sueldo}
                    onChange={(e) => setSueldo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="estadoCivil" className="mb-3">
                  <Form.Label>Estado Civil</Form.Label>
                  <Form.Select
                    value={estadoCivil}
                    onChange={(e) => setEstadoCivil(e.target.value)}
                  >
                    <option value="">Seleccione su estado civil</option>
                    {estadosCiviles.map((estado) => (
                      <option key={estado.id_estado_civil} value={estado.id_estado_civil}>
                        {estado.estado_civil}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 rounded-pill">
                  Registrarse
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>
                  ¿Ya tienes una cuenta?{' '}
                  <a href="#" onClick={switchToLogin} className="text-primary font-weight-bold">
                    Inicia sesión
                  </a>
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
