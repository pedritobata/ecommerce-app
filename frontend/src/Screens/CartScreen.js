import React, { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  ListGroup,
  Form,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";

const CartScreen = (props) => {
  const productId = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = () => {

  }

  const checkoutHandler = () => {
      props.history.push('/login?redirect=shipping');
  }

  return (
    <Row>
      <Col md={8}>
        <h2>SHOPING CART</h2>
        {cartItems.length === 0 ? (
          <Message>Your Cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.name}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid round alt={item.name} />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(event) => dispatch(addToCart(item.product, event.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                      <Button variant="light" onClick={removeFromCartHandler}>
                        <i className="fas fa-trash"></i>
                      </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
          <ListGroup variant="flush">
              <ListGroupItem>
                  <h2>subtotal ({cartItems.reduce((acc, current) => {
                      console.log("item", current)
                      return acc + current.qty;
                  }, 0)}) items</h2>
                  ${cartItems.reduce((acc, current) => acc + current.qty * current.price, 0)}
              </ListGroupItem>
              <ListGroupItem>
                  <Button block disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>Proceed to Checkout</Button>
              </ListGroupItem>
          </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
