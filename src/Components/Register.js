import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { attemptLogin, registerUser } from '../store';

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [registerError, setRegisterError] = useState("");
    const [pCheck, setPCheck] = useState("");
    

    const onChange = (ev) => {
        setCredentials({...credentials, [ev.target.name]:[ev.target.value]})
    }

    const invalidCredentials = credentials.username === "" || credentials.password === "" || credentials.email === "";

    const handleRegister = async(ev) => {
        ev.preventDefault();
        if (credentials.password !== pCheck) {
            setRegisterError('Passwords do not match. Please try again.');
            return;
        }

        try {
            const registrationResult = dispatch(registerUser(credentials));
            if (registrationResult.payload.error) {
              setRegisterError("Username or Email already in use. Please try again.");
              return;
            }

            const loginResult = await dispatch(attemptLogin(credentials));
            if (loginResult.payload) {
      
              setTimeout(async() =>{ const visitorOrder = JSON.parse(window.localStorage.getItem('visitorOrder'));
                const token = window.localStorage.getItem('token');
                if(visitorOrder){                
                    for (const ele of visitorOrder) {
                        await dispatch(addToCart(ele));
                }
                window.localStorage.removeItem('visitorOrder');
                }
               },500)
              navigate("/");
            } else {
              setRegisterError("An error occurred during login. Please try again.");
            }
          } catch (error) {
            console.error("Error during registration:", error);
            setRegisterError("An error occurred during registration. Please try again.");
          }
    };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Beanies & Blankets
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleRegister}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Username</Form.Label>
                        <Form.Control 
                            onChange = {onChange} 
                            value={credentials.username}
                            name="username"
                            type="text"
                            placeholder="Enter Username"              
                         />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control 
                            onChange = {onChange} 
                            value={credentials.email}
                            name="email"
                            type="email" 
                            placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            onChange = {onChange} 
                            value={credentials.password}
                            name="password"
                            type="password" 
                            placeholder="Password" 
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPasswordCheck"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            onChange = {(e) => setPCheck(e.target.value)} 
                            value={pCheck}
                            name="pCheck"
                            type="password" 
                            placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button disabled = {invalidCredentials} variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    {registerError && <div>{registerError}</div>}
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{' '}
                        <a href="#/login" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

