import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function Login({ switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('correo', email);
    formData.append('contrasena', password);

    try {
      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Save the email to localStorage
        localStorage.setItem('userEmail', email);
        // Navigate to the home page
        navigate('/home');
        // navigate('/houses');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.error || 'Login error');
    }
  };

  return (
    <Container data-bs-theme="dark" className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="p-4 shadow-sm border rounded">
            <Card.Body>
              <h2 className="mb-4 text-center font-weight-bold">Inicio de sesión</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label> 
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border"
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label >Contraseña</Form.Label> 
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border"
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 rounded-pill">
                  Iniciar sesión
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>
                  ¿No tienes cuenta?{' '}
                  <a href="#" onClick={switchToRegister} className="text-primary font-weight-bold">
                    Regístrate
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

export default Login;
