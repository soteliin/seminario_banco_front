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
  const [downPayment, setDownPayment] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(null);
  const [plazos, setPlazos] = useState([]);
  const [selectedPlazo, setSelectedPlazo] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null); // State for the total amount

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

  const handleLenderChange = async (e) => {
    const lenderId = e.target.value;
    setSelectedLender(lenderId);

    const lender = lenders.find((l) => l.id_amortizacion === parseInt(lenderId));
    setSelectedLenderDetails(lender);

    if (lender && house) {
      const enganchePercentage = parseFloat(lender.enganche);
      const downPaymentAmount = (house.costo * enganchePercentage) / 100;
      const remainingAmountValue = house.costo - downPaymentAmount;
      setDownPayment(downPaymentAmount);
      setRemainingAmount(remainingAmountValue);
    } else {
      setDownPayment(null);
      setRemainingAmount(null);
    }

    try {
      const response = await axios.get(`http://localhost:5000/cat-plazos?id_amortizacion=${lenderId}`);
      setPlazos(response.data);
    } catch (error) {
      console.error('Error fetching plazos:', error);
    }
  };

  const handlePlazoChange = (e) => {
    const plazo = parseInt(e.target.value);
    setSelectedPlazo(plazo);

    if (selectedLenderDetails && remainingAmount && plazo) {
      const annualInterestRate = parseFloat(selectedLenderDetails.tasa_interes) / 100;
      const monthlyInterestRate = annualInterestRate / 12;
      const numberOfPayments = plazo * 12;

      // Calculate the monthly payment using the formula
      const monthlyPaymentValue =
        (remainingAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      setMonthlyPayment(monthlyPaymentValue);

      // Calculate the total amount to be paid over the loan period
      const totalAmountValue = monthlyPaymentValue * numberOfPayments;
      setTotalAmount(totalAmountValue);
    } else {
      setMonthlyPayment(null);
      setTotalAmount(null);
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
          <Form.Group controlId="lender" className="mt-3">
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
              <p><strong>Enganche:</strong> {selectedLenderDetails.enganche}%</p>
              <p><strong>Enganche a Pagar:</strong> ${downPayment ? downPayment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : 'Calculando...'}</p>
              <p><strong>Tasa de Interés:</strong> {selectedLenderDetails.tasa_interes}%</p>
              <p><strong>Cantidad Restante:</strong> ${remainingAmount ? remainingAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : 'Calculando...'}</p>
            </div>
          )}
          <Form.Group controlId="plazo" className="mt-1">
            <Form.Label>Plazo</Form.Label>
            <Form.Select
              value={selectedPlazo}
              onChange={handlePlazoChange}
            >
              <option value="">Seleccione un plazo</option>
              {plazos.map((plazo) => (
                <option key={plazo.id_plazo} value={plazo.plazo}>
                  {plazo.plazo} años
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {monthlyPayment && (
            <div className="mt-4">
              <p><strong>Pago Mensual:</strong> ${monthlyPayment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</p>
              <p><strong>Total a Pagar:</strong> ${totalAmount ? totalAmount.toLocaleString('en-US', {
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
