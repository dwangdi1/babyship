import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Login = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate("/")
  };

  const invalidCredentials = credentials.username === "" || credentials.password === "";

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Beanies & Blankets</h2>
                  <p className=" mb-5">Please enter your username and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control 
                          value = { credentials.username }
                          name = 'username'
                          onChange = { onChange }
                          type="username" 
                          placeholder="Enter username" 
                          />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control  
                            name = 'password'
                            value={ credentials.password }
                            onChange = { onChange }
                            type="password" 
                            placeholder="Password" 
                          />
                      </Form.Group>
                      <div className="d-grid">
                        <Button disabled={invalidCredentials} onClick={login} variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="#/register" className="text-primary fw-bold">
                          Sign Up
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


    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={ login }>
    //     <input
    //       placeholder='username'
    //       value = { credentials.username }
    //       name = 'username'
    //       onChange = { onChange }
    //       />
    //     <input
    //       placeholder='password'
    //       name = 'password'
    //       value={ credentials.password }
    //       onChange = { onChange }
    //     />
    //     <button>Login</button>
    //   </form>
    // </div>
  );
};

export default Login;
