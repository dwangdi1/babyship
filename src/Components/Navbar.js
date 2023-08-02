import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, logout, removeFromCart, updateProductQuantity } from '../store';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarHome() {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');
    const visitorOrder = JSON.parse(window.localStorage.getItem("visitorOrder"));
    const user = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {cart} = useSelector((state) => state)

    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQ, setTotalQ] = useState(0);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    useEffect(() => {
        dispatch(fetchCart())
    },[dispatch]);

    useEffect(() => {
        let list;
        if (token) {
           list = [...cart.lineItems];
        } else {
           if (visitorOrder) {
              const listTemp = [...visitorOrder];
              list = listTemp.filter((ele) => ele.quantity !== 0);
              list = visitorOrder;
           } else {
              list = [];
           }
        }
        if (list) {
           list.sort(function (a, b) {
              if (a.product.name < b.product.name) {
                 return -1;
              }
              if (a.product.name > b.product.name) {
                 return 1;
              }
              return 0;
           });
        }

        const sumPrice = list.reduce((acc, curr) => {
           acc = acc + curr.product.price * curr.quantity;
           return acc;
        }, 0);
        const sumQ = list.reduce((acc, curr) => {
           acc = acc + curr.quantity;
           return acc;
        }, 0);
        setItems(list);
        setTotalPrice(sumPrice);
        setTotalQ(sumQ);
     }, [cart]);


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
                {items.length === 0 ? (
                    <div className="text-center">
                        <h3>Your shopping cart is empty.</h3>
                        <button className="btn btn-outline-secondary">
                            <Link to="/" className="text-decoration-none text-muted">
                            Start shopping
                            </Link>
                        </button>
                    </div>
                ) : (
                    <>
                        {items.map((item) => (
                            <div key={item.productId} className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <h5>{item.product.name}</h5>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.product.price * item.quantity}</p>
                            </div>
                            <button className="btn btn-danger" 
                                onClick={() => {
                                    if (item.quantity >= 1) {
                                        dispatch(
                                            updateProductQuantity({ product: item.product, quantity: -1 })
                                    );
                                    dispatch(
                                        removeFromCart({ product: item.product, quantityToRemove: 1 })
                                    );
                                    }}}
                                >Remove</button>
                            </div>
                        ))}
                    </>
                )}
                <h1>Total: {totalPrice}</h1>
                <Button className="btn btn-success">Checkout</Button>
            </Modal.Body>         

        </Modal>
    </>

  );
}

export default NavbarHome;
