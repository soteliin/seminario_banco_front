import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function Houses() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/casas');
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  return (
    <Container data-bs-theme="dark" className="my-5">
      <h2 data-bs-theme="dark" className="text-center mb-4">Casas Disponibles</h2>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Nombre de la Casa</th>
            <th>Dirección</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house.id_casa}>
              <td>{house.nombre_casa}</td>
              <td>{house.direccion}</td>
              <td>
                ${Number(house.costo).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Houses;
