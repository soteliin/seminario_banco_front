import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, Form } from 'react-bootstrap';

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
  const [totalPayment, setTotalPayment] = useState(null);
  const [numberOfMonths, setNumberOfMonths] = useState(null);
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(null);
  const [sueldo, setSueldo] = useState(null);

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

    const fetchUserSueldo = async () => {
      const email = localStorage.getItem('userEmail');
      try {
        const response = await axios.get(`http://localhost:5000/get-user-sueldo?email=${email}`);
        setSueldo(parseFloat(response.data.sueldo));
      } catch (error) {
        console.error('Error fetching user salary:', error);
      }
    };

    fetchHouseDetails();
    fetchLoanTypes();
    fetchLenders();
    fetchUserSueldo();
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
      const monthlyInterestRateValue = annualInterestRate / 12;
      const numberOfPayments = plazo * 12;

      const monthlyPaymentValue =
        (remainingAmount * monthlyInterestRateValue * Math.pow(1 + monthlyInterestRateValue, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRateValue, numberOfPayments) - 1);

      const totalPaymentValue = monthlyPaymentValue * numberOfPayments;

      setNumberOfMonths(numberOfPayments);
      setMonthlyInterestRate(monthlyInterestRateValue);
      setMonthlyPayment(monthlyPaymentValue);
      setTotalPayment(totalPaymentValue);
    } else {
      setNumberOfMonths(null);
      setMonthlyInterestRate(null);
      setMonthlyPayment(null);
      setTotalPayment(null);
    }
  };

  const isMonthlyPaymentTooHigh = sueldo && monthlyPayment ? monthlyPayment > sueldo * 0.4 : false;

  return (
    <Container data-bs-theme="dark" className="my-5">
      {house ? (
        <>
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

          <Form.Group controlId="plazo" className="mt-3">
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

          {selectedLoanType && selectedLender && selectedPlazo && (
            <Table bordered className="mt-4">
              <tbody>
                <tr>
                  <td>Casa</td>
                  <td>${Number(house.costo).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td>Enganche</td>
                  <td>{selectedLenderDetails ? `${selectedLenderDetails.enganche}%` : 'N/A'}</td>
                </tr>
                <tr>
                  <td>Monto enganche</td>
                  <td>${downPayment ? downPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                </tr>
                <tr>
                  <td>Monto del crédito</td>
                  <td>${remainingAmount ? remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                </tr>
                <tr>
                  <td>Años</td>
                  <td>{selectedPlazo ? `${selectedPlazo} años` : 'N/A'}</td>
                </tr>
                <tr>
                  <td>Número de Meses</td>
                  <td>{numberOfMonths ? numberOfMonths : 'Calculando...'}</td>
                </tr>
                <tr>
                  <td>Interés Mensual</td>
                  <td>{monthlyInterestRate ? (monthlyInterestRate * 100).toFixed(2) + '%' : 'Calculando...'}</td>
                </tr>
                <tr>
                  <td>Interés Anual</td>
                  <td>{selectedLenderDetails ? `${selectedLenderDetails.tasa_interes}%` : 'N/A'}</td>
                </tr>
                <tr>
                  <td>Sueldo</td>
                  <td>${sueldo ? sueldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Cargando...'}</td>
                </tr>
                <tr>
                  <td>Mensualidad</td>
                  <td style={{ color: isMonthlyPaymentTooHigh ? 'red' : 'inherit' }}>
                    {monthlyPayment
                      ? `$${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${isMonthlyPaymentTooHigh ? '(el pago mensual excede el 40% del sueldo)' : ''
                      }`
                      : 'Calculando...'}
                  </td>
                </tr>
                <tr>
                  <td>Monto a pagar</td>
                  <td>${totalPayment ? totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default HouseDetails;
