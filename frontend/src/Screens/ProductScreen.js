import React, { useEffect }  from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from 'react-redux';
import { productDetails } from '../actions/productActions';
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = (props) => {

  const dispatch = useDispatch();

  const {product, error, loading} = useSelector(state => state.productDetails)


  useEffect(() => {
    dispatch(productDetails(props.match.params.id));
  }, [props.match.params.id]);

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
                    <ListGroup.Item>
                       <Button className="btn btn-block" type="button"
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