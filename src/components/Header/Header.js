import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{ marginRight: "20px", marginLeft: "25px" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/hearchords"
              style={{ marginRight: "20px" }}
            >
              Chords
            </Nav.Link>
            <Nav.Link as={Link} to="/quizinit" style={{ marginRight: "20px" }}>
              Quiz
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/chessmusic"
              style={{ marginRight: "20px" }}
            >
              Chess Music
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
