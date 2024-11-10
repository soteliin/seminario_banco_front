import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Estilos.css';

function Login({ switchToRegister, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showAlert, setShowAlert] = useState(false); // State to show/hide the alert
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowAlert(false); // Hide alert on new login attempt

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
        localStorage.setItem('userEmail', email);
        onLogin(); // Call the validation function
        navigate('/home');
      } else {
        setShowAlert(true); // Show the alert if the response status is not 200
      }
    } catch (error) {
      setShowAlert(true); // Show the alert on error
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
                  <Form.Label>Contraseña</Form.Label> 
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'} // Toggle between text and password
                      placeholder="Ingrese su contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border"
                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                      style={{ cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 rounded-pill">
                  Iniciar sesión
                </Button>
              </Form>
              {showAlert && (
                <Alert className="mt-3" variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  Usuario o contraseña incorrectos
                </Alert>
              )}
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
