import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, userUpdateProfile } from "../actions/userActions";
import Message from '../components/Message';
import Loader from '../components/Loader';


const ProfileScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();


  const {loading, error, user} = useSelector(state => state.userDetails);
  const {userInfo} = useSelector(state => state.userLogin);
  const {success} = useSelector(state => state.userUpdateProfile);

  useEffect(() => {
    if(!userInfo){
      props.history.push("/login");
    }else{
      if(!user.name){
        dispatch(getUserDetails('profile'));
      }else{
        setName(user.name);
        setEmail(user.email);
      }
    }
  },[dispatch,props.history,user, userInfo]);


  const submitHandler = e => {
      e.preventDefault();
      if(password !== confirmPassword){
        setMessage("Passwords have to match");
      }else{
        dispatch(userUpdateProfile({_id: user._id, name, email, password}));
      }
  }

  return (
    <Row>
      <Col md={4}>
        <h3>My Profile</h3>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile updated</Message>}
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
        <Button type="submit">Update</Button>
      </Form>
      </Col>
      <Col md={8}>
        <h3>My Orders</h3>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
