import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

function UserCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [houseNames, setHouseNames] = useState({});
  const [loanTypeNames, setLoanTypeNames] = useState({});
  const [amortizationNames, setAmortizationNames] = useState({});
  const [plazoNames, setPlazoNames] = useState({});
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-coti-usr', {
          params: { email: userEmail },
        });
        setCotizaciones(response.data);

        // Fetch house names for each unique id_casa
        const uniqueHouseIds = [...new Set(response.data.map((coti) => coti.id_casa))];
        const houseNamesMap = {};
        for (const id of uniqueHouseIds) {
          try {
            const houseResponse = await axios.get('http://localhost:5000/get-house', {
              params: { id_casa: id },
            });
            if (houseResponse.data.length > 0) {
              houseNamesMap[id] = houseResponse.data[0].nombre_casa;
            }
          } catch (error) {
            console.error(`Error fetching house name for id_casa ${id}:`, error);
          }
        }
        setHouseNames(houseNamesMap);

        // Fetch loan type names for each unique id_tipo_prestamo
        const uniqueLoanTypeIds = [...new Set(response.data.map((coti) => coti.id_tipo_prestamo))];
        const loanTypeNamesMap = {};
        for (const id of uniqueLoanTypeIds) {
          try {
            const loanTypeResponse = await axios.get('http://localhost:5000/get-prestamo-byid', {
              params: { id_tipo_prestamo: id },
            });
            if (loanTypeResponse.data.length > 0) {
              loanTypeNamesMap[id] = loanTypeResponse.data[0].tipo_prestamo;
            }
          } catch (error) {
            console.error(`Error fetching loan type name for id_tipo_prestamo ${id}:`, error);
          }
        }
        setLoanTypeNames(loanTypeNamesMap);

        // Fetch amortization names for each unique id_amortizacion
        const uniqueAmortizationIds = [...new Set(response.data.map((coti) => coti.id_amortizacion))];
        const amortizationNamesMap = {};
        for (const id of uniqueAmortizationIds) {
          try {
            const amortizationResponse = await axios.get('http://localhost:5000/get-amortizacion-byid', {
              params: { id_amortizacion: id },
            });
            if (amortizationResponse.data.length > 0) {
              amortizationNamesMap[id] = amortizationResponse.data[0].prestamista;
            }
          } catch (error) {
            console.error(`Error fetching amortization name for id_amortizacion ${id}:`, error);
          }
        }
        setAmortizationNames(amortizationNamesMap);

        // Fetch plazo names for each unique id_plazo
        const uniquePlazoIds = [...new Set(response.data.map((coti) => coti.id_plazo))];
        const plazoNamesMap = {};
        for (const id of uniquePlazoIds) {
          try {
            const plazoResponse = await axios.get('http://localhost:5000/get-plazo-byid', {
              params: { id_plazo: id },
            });
            if (plazoResponse.data.length > 0) {
              plazoNamesMap[id] = plazoResponse.data[0].plazo;
            }
          } catch (error) {
            console.error(`Error fetching plazo name for id_plazo ${id}:`, error);
          }
        }
        setPlazoNames(plazoNamesMap);
      } catch (error) {
        console.error('Error fetching cotizaciones:', error);
      }
    };

    fetchCotizaciones();
  }, [userEmail]);

  return (
    <Container data-bs-theme="dark" className="my-5">
      <h2 className="mb-4">Mis cotizaciones</h2>
      {cotizaciones.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Casa</th>
              <th>Tipo de préstamo</th>
              <th>Amortización</th>
              <th>Plazo</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((coti) => (
              <tr key={coti.id_cotizacion}>
                <td>{houseNames[coti.id_casa] || 'Cargando...'}</td>
                <td>{loanTypeNames[coti.id_tipo_prestamo] || 'Cargando...'}</td>
                <td>{amortizationNames[coti.id_amortizacion] || 'Cargando...'}</td>
                <td>{plazoNames[coti.id_plazo] ? `${plazoNames[coti.id_plazo]} años` : 'Cargando...'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No se encontraron cotizaciones.</p>
      )}
    </Container>
  );
}

export default UserCotizaciones;
