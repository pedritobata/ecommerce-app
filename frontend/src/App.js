import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Header />
      <main className="my-3">
        <Container>
          <h1>Welcome to My Shop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
