import React, {useState} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ShippingScreen = props => {

    const { shippingAddress} = useSelector(state => state.cart)    

    const[address, setAddress] = useState(shippingAddress.address);
    const[city, setCity] = useState(shippingAddress.city);
    const[postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const[country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
   


    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        props.history.push("/payment");
    }


    return (
        <FormContainer>
        <h1>Shipping</h1>
       {/*  {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>} */}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            placeholder="Enter your address"
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="Enter your city"
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            value={postalCode}
            placeholder="Enter your postal code"
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            placeholder="Enter your country"
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">CONTINUE</Button>
      </Form>
    </FormContainer>
    );
}

export default ShippingScreen;