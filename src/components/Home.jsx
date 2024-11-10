import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Estilos.css';

function Home({ children }) {
  const navigate = useNavigate();

  // Get the user's email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Remove email from localStorage
    navigate('/'); // Redirect to the login page
  };

  // Handle navigation to Houses page
  const handleGoToHouses = () => {
    navigate('/home'); // Navigate to the Houses page
  };

  // Handle editing profile
  const handleEditProfile = () => {
    navigate('/edit-profile'); // Navigate to the Edit Profile page
  };

  return (
    <Container fluid className='home'>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 sticky-top">
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={handleGoToHouses}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ cursor: 'pointer' }} onClick={handleGoToHouses}>
              Casas
            </Nav.Link>
          </Nav>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                {userEmail}
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item className="custom-dropdown-item" onClick={handleEditProfile}>
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children} {/* Render child components here */}
    </Container>
  );
}

export default Home;
