import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function AdminPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/clients'); // Replace with your API endpoint
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <Container   data-bs-theme="dark"className="my-5">
      <h2 className="text-center mb-4">Detalles de Clientes</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.nombre_completo}</td>
                <td>{client.correo}</td>
                <td>{client.telefono}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No se encontraron clientes.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminPage;
