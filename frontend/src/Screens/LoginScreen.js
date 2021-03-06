import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "../actions/userActions";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from '../components/Message';
import Loader from '../components/Loader';


const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  const {loading, error, userInfo} = useSelector(state => state.userLogin);

  useEffect(() => {
    if(userInfo){
      props.history.push(redirect);
    }
  },[props.history,userInfo, redirect]);


  const submitHandler = e => {
      e.preventDefault();
      dispatch(userLogin(email, password));
  }

  return (
    <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
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
