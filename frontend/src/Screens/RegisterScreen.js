import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../actions/userActions";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from '../components/Message';
import Loader from '../components/Loader';


const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  const {loading, error, userInfo} = useSelector(state => state.userRegister);

  useEffect(() => {
    if(userInfo){
      props.history.push(redirect);
    }
  },[props.history,userInfo, redirect]);


  const submitHandler = e => {
      e.preventDefault();
      if(password !== confirmPassword){
        setMessage("Passwords have to match");
      }else{
        dispatch(userRegister(name,email, password));
      }
  }

  return (
    <FormContainer>
        <h1>Sign up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="username">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter User name"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Sign up</Button>
      </Form>
        <Row className="my-3">
            <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
