import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from "./Screens/ProductScreen";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="my-3">
        <Container>
          <Route path="/" exact component={HomeScreen}/>
          <Route path="/product/:id" exact component={ProductScreen}/>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
