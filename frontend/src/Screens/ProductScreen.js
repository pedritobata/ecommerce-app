import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, ListGroup, Image, Card, ListGroupItem, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = (props) => {

  const dispatch = useDispatch();
  const[qty, setQty] = useState(1);

  const {product, error, loading} = useSelector(state => state.productDetails)


  useEffect(() => {
    dispatch(listProductDetails(props.match.params.id));
  }, [props.match.params.id]);

  const addToCartHandle = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  }

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {
        loading ? <Loader  /> : error ? <Message>{error.message}</Message> : (
          <Row>
        <Col xl={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col xl={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
               Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
               Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xl={3} className="mt-sm-4 mt-xl-0">
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={6}>Price:</Col>
                            <Col xs={6}><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col xs={6}>In Stock:</Col>
                            <Col xs={6}>{product.countInStock ? "In stock" : "Out of stock"}</Col>
                        </Row>
                    </ListGroup.Item>
                    {
                      product.countInStock > 0 && (
                        <ListGroupItem>
                          <Row>
                            <Col xs={6}>Quantity:</Col>
                            <Col xs={6}>
                              <Form.Control as="select" value={qty} onChange={event => setQty(event.target.value)}>
                                {
                                  [...Array(product.countInStock).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                  ))
                                }
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ) 
                    }
                    <ListGroup.Item>
                       <Button className="btn btn-block" type="button"
                       onClick={addToCartHandle}
                       disabled={product.countInStock === 0}>add to cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
        )
      }
      
    </>
  );
};

export default ProductScreen;
