import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";

const NavBar = ({ setToken, setIsLoggedIn, isLoggedIn, id, admin }) => {
  console.log("ADMIN STATUS NAV", admin);
  return (
    <>
      {/* "bg-body-tertiary"  - place that inside of your <Navbar> className. */}
      <Navbar expand="lg" className="custom-navbar sticky-top">
        <Container fluid>
          <Navbar.Brand href="/">AnimEComm Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/collections/shop-all">Shop All</Nav.Link>
              <Nav.Link href="/collections/shop-all?category=collectables">
                Collectables
              </Nav.Link>
              <Nav.Link href="/collections/shop-all?category=clothing">
                Clothing
              </Nav.Link>
              <Nav.Link href="/collections/shop-all?category=home-entertainment">
                Home Entertainment
              </Nav.Link>
              <Nav.Link href="/collections/shop-all?category=manga-books">
                Manga & Books
              </Nav.Link>

              {/* need to review this to check for if else for what options are viewable when not logged in and logged off */}
              <div>
                {!isLoggedIn ? (
                  <Nav>
                    <Nav.Link href="/secure/login">Login</Nav.Link>
                    <Nav.Link href="/secure/register">Register</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                  </Nav>
                ) : (
                  <Nav>
                    <NavDropdown title="User" id="navbarScrollingDropdown">
                      <NavDropdown.Item href={`/account/${id}`}>
                        My Account
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/account/order-history">
                        My Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                      <NavDropdown.Divider />
                      {/* Need to figure out how to add this so it doesn't have a
                      blank page */}

                      {admin !== "false" && admin !== null ? (
                        <NavDropdown.Item href="/auth/admin-page">
                          Admin Dashboard
                        </NavDropdown.Item>
                      ) : null}
                    </NavDropdown>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                  </Nav>
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
