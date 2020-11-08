import React, {useEffect} from "react";
import {
  ListGroup,
  Row,
  Col,
  Button,
  Card,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod, cartItems } = useSelector((state) => state.cart);

  const addDecimals = num => {
      return Number(Math.round(num * 100) / 100);
  }

  const itemsTotal = addDecimals(cartItems.reduce(((acc, current) => acc + current.price * current.qty),0));
  const shippingFee = itemsTotal > 100 ? 0 : 100;
  const taxes = addDecimals(itemsTotal * 1.15);
  const total = itemsTotal + shippingFee + taxes;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    console.log("PlaceOrders>>>");
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsTotal,
        shippingPrice: shippingFee,
        taxPrice: taxes,
        totalPrice: total,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalcode}, {shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroupItem>
           <ListGroupItem>
           <ListGroup variant="flush">
              <h2>Order items</h2>
              {  cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : 
                  (
                    cartItems.map((item,index) => {
                      return <ListGroupItem key={index}>
                          <Row>
                              <Col md={2}>
                              <Image src={item.image} fluid rounded  />
                              </Col>
                              <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                              <Col md={4}>{`${item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}`}</Col>
                          </Row>
                      </ListGroupItem>
                  })
                  )
              }
            </ListGroup>
           </ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
              <Card>
                  <ListGroup variant="flush">
                    <ListGroupItem><h2>Order summary</h2></ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Items</Col>
                            <Col>${itemsTotal}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${shippingFee}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${taxes}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Total</Col>
                            <Col>${total}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
                    <ListGroupItem>
                        <Row>
                           <Button  disabled={cartItems === 0} onClick={placeOrderHandler} variant="primary" block>Place order</Button>
                        </Row>
                    </ListGroupItem>
                  </ListGroup>
              </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
