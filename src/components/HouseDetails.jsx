import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Form } from 'react-bootstrap';

function HouseDetails() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loanTypes, setLoanTypes] = useState([]);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [lenders, setLenders] = useState([]);
  const [selectedLender, setSelectedLender] = useState('');
  const [selectedLenderDetails, setSelectedLenderDetails] = useState(null);
  const [downPayment, setDownPayment] = useState(null); // State for the down payment

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-house?id_casa=${id}`);
        setHouse(response.data[0]);
      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    };

    const fetchLoanTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cat-tipos-prest');
        setLoanTypes(response.data);
      } catch (error) {
        console.error('Error fetching loan types:', error);
      }
    };

    const fetchLenders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cat-prestamistas');
        setLenders(response.data);
      } catch (error) {
        console.error('Error fetching lenders:', error);
      }
    };

    fetchHouseDetails();
    fetchLoanTypes();
    fetchLenders();
  }, [id]);

  // Handle selecting a lender
  const handleLenderChange = (e) => {
    const lenderId = e.target.value;
    setSelectedLender(lenderId);

    // Find the selected lender's details and set them
    const lender = lenders.find((l) => l.id_amortizacion === parseInt(lenderId));
    setSelectedLenderDetails(lender);

    // Calculate the down payment if the house cost is available
    if (lender && house) {
      const enganchePercentage = parseFloat(lender.enganche);
      const downPaymentAmount = (house.costo * enganchePercentage) / 100;
      setDownPayment(downPaymentAmount);
    } else {
      setDownPayment(null);
    }
  };

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
          <Form.Group controlId="loanType" className="mt-4">
            <Form.Label>Tipo de Préstamo</Form.Label>
            <Form.Select
              value={selectedLoanType}
              onChange={(e) => setSelectedLoanType(e.target.value)}
            >
              <option value="">Seleccione un tipo de préstamo</option>
              {loanTypes.map((loan) => (
                <option key={loan.id_tipo_prestamo} value={loan.id_tipo_prestamo}>
                  {loan.tipo_prestamo}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="lender" className="mt-4">
            <Form.Label>Prestamista</Form.Label>
            <Form.Select
              value={selectedLender}
              onChange={handleLenderChange}
            >
              <option value="">Seleccione un prestamista</option>
              {lenders.map((lender) => (
                <option key={lender.id_amortizacion} value={lender.id_amortizacion}>
                  {lender.prestamista}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {selectedLenderDetails && (
            <div className="mt-4">
              <p><strong>Tasa de Interés:</strong> {selectedLenderDetails.tasa_interes}%</p>
              <p><strong>Enganche:</strong> {selectedLenderDetails.enganche}%</p>
              <p><strong>Enganche a Pagar:</strong> ${downPayment ? downPayment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : 'Calculando...'}</p>
            </div>
          )}
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default HouseDetails;
