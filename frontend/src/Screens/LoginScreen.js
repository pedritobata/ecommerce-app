import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { userLogin } from "../actions/userActions";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';


  const submitHandler = e => {
      e.preventDefault();
  }

  return (
    <FormContainer>
        <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Sign in</Button>
      </Form>
        <Row className="my-3">
            <Col>
                New Customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  );
};

export default LoginScreen;
