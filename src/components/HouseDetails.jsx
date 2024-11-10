import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, Form, Button } from 'react-bootstrap';

function HouseDetails() {
  const navigate = useNavigate();
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

  const handlePlazoChange = (e) => {
    const plazoId = parseInt(e.target.value);
    setSelectedPlazo(plazoId);

    const plazoData = plazos.find((plazo) => plazo.id_plazo === plazoId);

    if (plazoData && selectedLenderDetails && remainingAmount) {
      const plazoYears = plazoData.plazo;
      const annualInterestRate = parseFloat(selectedLenderDetails.tasa_interes) / 100;
      const monthlyInterestRateValue = annualInterestRate / 12;
      const numberOfPayments = plazoYears * 12;

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

  const handleLenderChange = async (e) => {
    const lenderId = e.target.value;
    setSelectedLender(lenderId);
    setSelectedPlazo('');
    setNumberOfMonths(null);

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

  const handleSubmit = async () => {
    const email = localStorage.getItem('userEmail');

    try {
      const response = await axios.post('http://localhost:5000/add-cotizacion', {
        id_casa: parseInt(id),
        id_tipo_prestamo: parseInt(selectedLoanType),
        id_amortizacion: parseInt(selectedLender),
        id_plazo: parseInt(selectedPlazo),
        correo_cliente: email,
      });

      alert('Cotización añadida exitosamente');
      console.log(response.data);

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Error adding cotización:', error);
      alert('Error al añadir la cotización');
    }
  };

  const isMonthlyPaymentTooHigh = sueldo && monthlyPayment ? monthlyPayment > sueldo * 0.4 : false;
  const showSalaryComparison = selectedLoanType === '1'; 
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
                <option key={plazo.id_plazo} value={plazo.id_plazo}>
                  {plazo.plazo} años
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {selectedLoanType && selectedLender && selectedPlazo && (
            <>
              <Table bordered className="mt-4">
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Casa</strong></td>
                    <td>${Number(house.costo).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Enganche</strong></td>
                    <td>{selectedLenderDetails ? `${selectedLenderDetails.enganche}%` : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Monto enganche</strong></td>
                    <td>${downPayment ? downPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Monto del crédito</strong></td>
                    <td>${remainingAmount ? remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Años</strong></td>
                    <td>
                      {selectedPlazo
                        ? `${plazos.find((plazo) => plazo.id_plazo === selectedPlazo)?.plazo || 'N/A'} años`
                        : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Número de Meses</strong></td>
                    <td>{numberOfMonths ? numberOfMonths : 'Calculando...'}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Interés Anual</strong></td>
                    <td>{selectedLenderDetails ? `${selectedLenderDetails.tasa_interes}%` : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Interés Mensual</strong></td>
                    <td>{monthlyInterestRate ? (monthlyInterestRate * 100).toFixed(2) + '%' : 'Calculando...'}</td>
                  </tr>
                  {showSalaryComparison && (
                    <>
                      <tr>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Sueldo</strong></td>
                        <td>${sueldo ? sueldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Cargando...'}</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Mensualidad</strong></td>
                        <td style={{ color: isMonthlyPaymentTooHigh ? 'red' : 'inherit' }}>
                          {monthlyPayment
                            ? `$${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${isMonthlyPaymentTooHigh ? '(el pago mensual excede el 40% del sueldo)' : ''}`
                            : 'Calculando...'}
                        </td>
                      </tr>
                    </>
                  )}
                  {!showSalaryComparison && (
                    <tr>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Mensualidad</strong></td>
                      <td>
                        ${monthlyPayment ? monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Monto a pagar</strong></td>
                    <td>${totalPayment ? totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-flex justify-content-end">
                <Button variant="primary" className="mt-3" onClick={handleSubmit}>
                  Guardar cotización
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default HouseDetails;
