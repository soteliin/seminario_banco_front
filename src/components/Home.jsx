import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Houses from './Houses';

function Home() {
  const navigate = useNavigate();

  // Get the user's email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Remove email from localStorage
    navigate('/'); // Redirect to the login page
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand href="#">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Casas</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text
              className="text-light"
              style={{ cursor: 'pointer' }} // Add cursor pointer to indicate it's clickable
              onClick={handleLogout} // Handle logout on click
            >
                <FontAwesomeIcon icon={faUser} className="me-2" />
              {userEmail}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Houses />
    </Container>
  );
}

export default Home;
