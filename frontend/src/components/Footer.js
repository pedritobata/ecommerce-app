import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return <footer className="fixed-bottom bg-light">
      <Row className="w-100">
          <Col className="text-center my-2">Copyright &copy; Awesome Store</Col>
      </Row>
  </footer>;
};

export default Footer;
