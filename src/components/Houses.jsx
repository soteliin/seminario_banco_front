import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

function Houses() {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Function to handle button click
  const handleViewDetails = (houseId) => {
    // Navigate to the house details page with the house ID as a parameter
    navigate(`/house-details/${houseId}`);
  };

  return (
    <Container data-bs-theme="dark" className="my-5">
      <h2 data-bs-theme="dark" className="text-center mb-4">Casas Disponibles</h2>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Nombre de la Casa</th>
            <th>Dirección</th>
            <th>Costo</th>
            <th>Cotización</th> 
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
              <td>
                <Button variant="primary" onClick={() => handleViewDetails(house.id_casa)}>Cotizar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Houses;
