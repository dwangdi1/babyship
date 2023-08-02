import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store';
import { Button, Modal } from 'react-bootstrap';

function NavbarHome() {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');
    const user = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
    const headingStyle = {
        fontSize: '30px',
      };
    

  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/" style={headingStyle}>Beanies & Blankets</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <div onClick={handleShow}>
                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                </div>
            </Nav>
            <Nav>
                {!token ? (
                <Nav.Link href="#/login">Login</Nav.Link>
                ) : (
                // Add the logic for the user menu or profile here
                // For example:
                <>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Button onClick={() => handleLogout()}>Logout</Button>
                </> 
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>   
            <Modal.Body >
                <h1>Modal body</h1>
            </Modal.Body>         

        </Modal>
    </>

  );
}

export default NavbarHome;
