import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function EditProfile() {
  const [nombre, setNombre] = useState('');
  const [rfc, setRfc] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [sueldo, setSueldo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchEstadosCiviles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/estado-civil');
        setEstadosCiviles(response.data);
      } catch (error) {
        console.error('Error fetching estados civiles:', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-user');
        const userData = response.data.find((user) => user.correo === userEmail);
        if (userData) {
          setNombre(userData.nombre_completo);
          setRfc(userData.rfc);
          setEdad(userData.edad);
          setTelefono(userData.telefono);
          setCorreo(userData.correo); 
          setSueldo(userData.sueldo);
          setEstadoCivil(userData.id_estado_civil);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchEstadosCiviles();
    fetchUserInfo();
  }, [userEmail]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      nombre_completo: nombre,
      rfc,
      edad,
      telefono,
      correo, 
      sueldo,
      id_estado_civil: estadoCivil,
    };

    try {
      const response = await axios.put('http://localhost:5000/edit-profile', formData);

      if (response.status === 200) {
        alert('User profile updated successfully!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container data-bs-theme="dark" className="d-flex justify-content-center align-items-center min-vh-100 margin">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="p-4 shadow-sm border rounded my-5">
            <Card.Body>
              <h2 className="mb-3 text-center font-weight-bold">Edit Profile</h2>
              <Form onSubmit={handleUpdate}>
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
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
