import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function CotizacionDetails() {
    const [lenders, setLenders] = useState([]);
    const [plazos, setPlazos] = useState([]);
    const { id_cotizacion } = useParams();
    const [cotizacion, setCotizacion] = useState(null);
    const [house, setHouse] = useState(null);
    const [loanType, setLoanType] = useState(null);
    const [lenderDetails, setLenderDetails] = useState(null);
    const [plazoDetails, setPlazoDetails] = useState(null);
    const [downPayment, setDownPayment] = useState(null);
    const [remainingAmount, setRemainingAmount] = useState(null);
    const [monthlyInterestRate, setMonthlyInterestRate] = useState(null);
    const [numberOfMonths, setNumberOfMonths] = useState(null);
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [selectedLoanType, setSelectedLoanType] = useState('')
    const [sueldo, setSueldo] = useState(null);

    useEffect(() => {

        const fetchUserSueldo = async () => {
            const email = localStorage.getItem('userEmail');
            try {
                const response = await axios.get(`http://localhost:5000/get-user-sueldo?email=${email}`);
                setSueldo(parseFloat(response.data.sueldo));
            } catch (error) {
                console.error('Error fetching user salary:', error);
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

        const fetchCotizacionDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-coti-byid', {
                    params: { id_cotizacion },
                });
                if (response.data.length > 0) {
                    const cotizacionData = response.data[0];
                    setCotizacion(cotizacionData);

                        const houseResponse = await axios.get('http://localhost:5000/get-house', {
                            params: { id_casa: cotizacionData.id_casa },
                        });
                        if (houseResponse.data.length > 0) {
                            setHouse(houseResponse.data[0]);

                            const loanTypeResponse = await axios.get('http://localhost:5000/get-prestamo-byid', {
                                params: { id_tipo_prestamo: cotizacionData.id_tipo_prestamo },
                            });
                                if (loanTypeResponse.data.length > 0) {
                                    setLoanType(loanTypeResponse.data[0]);
                                    setSelectedLoanType(cotizacionData.id_tipo_prestamo)

                                    const lenderResponse = await axios.get('http://localhost:5000/get-amortizacion-byid', {
                                        params: { id_amortizacion: cotizacionData.id_amortizacion },
                                    });
                                        if (lenderResponse.data.length > 0) {
                                            setLenderDetails(lenderResponse.data[0]);

                                            const lenderId = lenderResponse.data[0].id_amortizacion;
                                            var remainingAmountValue = 0;
                                            if (lenderResponse.data[0] && houseResponse.data[0]) {
                                                const enganchePercentage = parseFloat(lenderResponse.data[0].enganche);
                                                const downPaymentAmount = (houseResponse.data[0].costo * enganchePercentage) / 100;
                                                remainingAmountValue = houseResponse.data[0].costo - downPaymentAmount;
                                                setDownPayment(downPaymentAmount);
                                                setRemainingAmount(remainingAmountValue);
                                            } else {
                                                setDownPayment(null);
                                                setRemainingAmount(null);
                                            }

                                                try {
                                                    const plazosResponse = await axios.get(`http://localhost:5000/cat-plazos?id_amortizacion=${lenderId}`);
                                                    setPlazos(plazosResponse.data);

                                                    const plazoResponse = await axios.get('http://localhost:5000/get-plazo-byid', {
                                                        params: { id_plazo: cotizacionData.id_plazo },
                                                    });
                                                    if (plazoResponse.data.length > 0) {
                                                        setPlazoDetails(plazoResponse.data[0]);

                                                        const plazoId = parseInt(plazoResponse.data[0].id_plazo);
                                                        const plazoData = plazoResponse.data[0]

                                                        if (plazoData && lenderResponse.data[0] && remainingAmountValue) {
                                                            const plazoYears = plazoData.plazo;
                                                            const annualInterestRate = parseFloat(lenderResponse.data[0].tasa_interes) / 100;
                                                            const monthlyInterestRateValue = annualInterestRate / 12;
                                                            const numberOfPayments = plazoYears * 12;

                                                            const monthlyPaymentValue =
                                                                (remainingAmountValue * monthlyInterestRateValue * Math.pow(1 + monthlyInterestRateValue, numberOfPayments)) /
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
                                                    }
                                                } catch (error) {
                                                    console.error('Error fetching plazos:', error);
                                                }
                                        }
                                }
                        }
                }
            } catch (error) {
                console.error('Error fetching cotización details:', error);
            }
        };

        fetchUserSueldo();
        fetchLenders();
        fetchCotizacionDetails();
    }, [id_cotizacion]);


    const isMonthlyPaymentTooHigh = sueldo && monthlyPayment ? monthlyPayment > sueldo * 0.4 : false;
    const showSalaryComparison = selectedLoanType === 1;
    return (
        <Container data-bs-theme="dark" className="my-5">
            <h2 className="text-center mb-4">Detalles de la Cotización</h2>
            {house && cotizacion ? (
                <Table bordered className="mt-4">
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Casa</strong></td>
                            <td>{house ? house.nombre_casa : "N/A"}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Precio</strong></td>
                            <td>${Number(house.costo).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Tipo de Préstamo</strong></td>
                            <td>{loanType ? loanType.tipo_prestamo : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Prestamista</strong></td>
                            <td>{lenderDetails ? lenderDetails.prestamista : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Plazo</strong></td>
                            <td>{plazoDetails ? `${plazoDetails.plazo} años` : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Número de Meses</strong></td>
                            <td>{plazoDetails ? `${plazoDetails.plazo * 12}` : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Enganche</strong></td>
                            <td>{lenderDetails ? `${lenderDetails.enganche}%` : 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Monto Enganche</strong></td>
                            <td>${downPayment ? downPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Monto del Crédito</strong></td>
                            <td>${remainingAmount ? remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}><strong>Interés Anual</strong></td>
                            <td>{lenderDetails ? `${lenderDetails.tasa_interes}%` : 'N/A'}</td>
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
            ) : (
                <p>Cargando detalles de la cotización...</p>
            )}
        </Container>
    );
}

export default CotizacionDetails;
