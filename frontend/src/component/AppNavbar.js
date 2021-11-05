import * as React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">FeedApp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
          <Nav.Link href="/polls">Polls</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/register">Register</Nav.Link>
          {(localStorage.getItem("userID") === null) ?
           <Nav.Link href="/login">Login</Nav.Link> 
           : <Nav> <Nav.Link onClick={() => localStorage.clear()} href="/">Logout</Nav.Link>
             <Nav.Link href={"/profile/" + localStorage.getItem("userID")}>Profile</Nav.Link> </Nav>  }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
