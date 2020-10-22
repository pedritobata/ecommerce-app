import React, { useState } from "react";
import { Form, FormGroup, Col, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = (props) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("PaylPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label as="legend">Select method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              value="PayPal"
              checked
              name="paymentmethod"
              id="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              value="Stripe"
              name="paymentmethod"
              id="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          CONTINUE
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
