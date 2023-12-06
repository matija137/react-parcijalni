import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <Container>
      <SearchForm />
    </Container>
  );
}

export default App;
