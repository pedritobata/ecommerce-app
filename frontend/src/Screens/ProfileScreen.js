import React, { useState, useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import {Table ,Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, userUpdateProfile } from "../actions/userActions";
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


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
  const { loading: loadingOrders, error: errorOrders, orders } = useSelector((state) => state.orderListMy);

  useEffect(() => {
    if(!userInfo){
      props.history.push("/login");
    }else{
      
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      }else if(!user.isAdmin){
        dispatch(getUserDetails('profile'));
      }    
      else{
        console.log("user >>>",user );
        setName(user.name);
        setEmail(user.email);
      }
    }
  },[dispatch,props.history,user, userInfo, success]);


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
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
        )}
      </Col>
      <Col md={8}>
        <h3>My Orders</h3>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
