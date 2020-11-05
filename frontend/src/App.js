import React from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="my-3">
        <Container>
          <Route path="/login" exact component={LoginScreen}/>
          <Route path="/register" exact component={RegisterScreen}/>
          <Route path="/profile" exact component={ProfileScreen}/>
          <Route path="/shipping" exact component={ShippingScreen}/>
          <Route path="/payment" exact component={PaymentScreen}/>
          <Route path="/placeorder" exact component={PlaceOrderScreen}/>
          <Route path="/" exact component={HomeScreen}/>
          <Route path="/product/:id" exact component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
