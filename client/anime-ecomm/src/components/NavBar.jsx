import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  // can you see this edit?
  // this is used to test if it works
  const loggedIn = "something";
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">(WEBSITE NAME GOES HERE)</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Shop All</Nav.Link>
              <Nav.Link href="#action3">Collectables</Nav.Link>
              <Nav.Link href="#action4">Clothing</Nav.Link>
              <Nav.Link href="#action5">Home Entertainment</Nav.Link>
              <Nav.Link href="#action6">Manga & Books</Nav.Link>

              {/* need to review this to check for if else for what options are viewable when not logged in and logged off */}
              <div>
                {!loggedIn ? (
                  <Nav.Link href="#action5">Login</Nav.Link>
                ) : (
                  <NavDropdown title="User" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action6">Account</NavDropdown.Item>
                    <NavDropdown.Item href="#action7">Cart</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action8">
                      Admin Page
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
