import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

function HouseDetails() {
  const { id } = useParams(); // Get the house ID from the URL
  const [house, setHouse] = useState(null);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-house?id_casa=${id}`);
        setHouse(response.data[0]); // Set the first item from the response data
      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    };

    fetchHouseDetails();
  }, [id]);

  return (
    <Container data-bs-theme="dark" className="my-5">
      {house ? (
        <Card className="p-4">
          <h2 className="mb-3">{house.nombre_casa}</h2>
          <p><strong>Dirección:</strong> {house.direccion}</p>
          <p><strong>Costo:</strong> ${Number(house.costo).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</p>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default HouseDetails;
