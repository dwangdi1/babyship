import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [pCheck, setPCheck] = useState("");
    

    const onChange = (ev) => {
        setCredentials({...crednetials, [ev.target.name]:[ev.target.value]})
    }

    const invalidCredentials = credentials.username === "" || credentials.password === "" || credentials.email === "";

    const handleRegister = async(ev) => {
        ev.preventDefault();
        
    }

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
                    <Form onSubmite={handleRegister}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control 
                            onChange = {onChange} 
                            value={credentials.username}
                            name="username"
                            type="text"
                            placeholder="Enter Name"              
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
                        controlId="formBasicPassword"
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

