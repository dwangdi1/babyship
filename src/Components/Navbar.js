import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, fetchProducts, fetchTopSellers, logout, removeFromCart, updateProductQuantity } from '../store';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarHome() {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const {auth} = useSelector((state) => state);
    const token = window.localStorage.getItem('token');
    const visitorOrder = JSON.parse(window.localStorage.getItem("visitorOrder"));
    const user = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {cart} = useSelector((state) => state)
    const [sum, setSum] = useState(0);


    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQ, setTotalQ] = useState(0);


    const checkout = async () => {
        await fetch('/api/payment/checkout', {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ items }), 
        }).then((response) => {
          return response.json();
        }).then((response) => {
          if (response.url) {
            window.location.assign(response.url);
          }
        });
    }
      
    useEffect(() => {
        let list;
        if (token) {
           if (cart.lineItems) {
              list = [...cart.lineItems];
           } else {
              list = [];
           }
        } else {
           if (visitorOrder) {
              list = [...visitorOrder];
           } else {
              list = [];
           }
        }
        if (list) {
           const totalQ = list.reduce((acc, curr) => {
              return (acc = acc + curr.quantity);
           }, 0);
           setSum(totalQ);
        }
     }, [cart, user]);


    const handleLogout = () => {
        dispatch(logout());
        setItems([]);
        setTotalPrice(0);
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

      const handleRemoveFromCart = (product) => {
        dispatch(updateProductQuantity({ product: product, quantity: -1 }));
        dispatch(removeFromCart({ product: product, quantityToRemove: 1 }));
        dispatch(fetchTopSellers()); // Update top sellers after removing from cart
        dispatch(fetchProducts());   // Update all products after removing from cart
     };
    

  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/" style={headingStyle}>Beanies & Blankets</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
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
                <i
                           className="fas fa-shopping-cart fs-3 align-middle position-relative"
                           style={{ color: "black" }}>
                           {sum ? (
                              <span
                                 className="badge border border-light rounded-circle bg-danger"
                                 style={{
                                    fontSize: "10px",
                                    fontFamily: "tahoma",
                                    position: "absolute",
                                    top: "-40%",
                                    right: "-50%"
                                 }}>
                                 {sum}
                              </span>
                           ) : null}
                </i>
            </Nav>
            <Nav>
                {!token ? (
                <Nav.Link href="#/login">Login</Nav.Link>
                ) : (
                // Add the logic for the user menu or profile here
                // For example:
                <>
                    <NavDropdown title={auth.username} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item >
                            <Button onClick={() => handleLogout()}>Logout</Button>
                        </NavDropdown.Item>
                    </NavDropdown>
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
                                <p>Price: ${item.product.price * item.quantity}</p>
                            </div>
                            <button className="btn btn-danger" 
                                onClick={() => handleRemoveFromCart(item.product)}
                                >Remove</button>
                            </div>
                        ))}
                    </>
                )}
                <h1>Total: ${totalPrice.toFixed(2)}</h1>
                <Button onClick={checkout} className="btn btn-success">Checkout</Button>
            </Modal.Body>         

        </Modal>
    </>

  );
}

export default NavbarHome;
