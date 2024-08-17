import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// continue to create the admin page to view all users, create, edit, delete products
// edit option will be similar to account endit
const AdminPage = (admin, isLoggedIn) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  // test this
  // const [productId, setProductId] = useState("");

  const [show, setShow] = useState({});
  const [showcreate, setShowCreate] = useState(false);

  const handleClose = (id) => setShow({ [id]: false });
  const handleShow = (id) => setShow({ [id]: true });
  const handleCreateClose = () => setShowCreate(false);
  const handleCreateShow = () => setShowCreate(true);

  const token = localStorage.getItem("token");

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (admin) {
          const response = await fetch(
            "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/users"
          );
          const data = await response.json();
          console.log("USER DATA", data);
          setUsers(data);
        }
      } catch (error) {
        console.error("Something went wrong when fetching users");
      }
    };
    fetchUsers();
  }, [admin]);

  // fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (admin) {
          const response = await fetch(
            "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/product"
          );
          const data = await response.json();
          console.log("PRODUCT DATA", data);
          setProducts(data);
        }
      } catch (error) {
        console.error("Something went wrong when fetching products");
      }
    };
    fetchProducts();
  }, [admin]);

  // create products
  const handleCreateProduct = async (event) => {
    // event.preventDefault();
    const productObject = {
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
    };
    try {
      if (admin) {
        const response = await fetch(
          "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/product",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productObject),
          }
        );
        const data = await response.json();
        alert("You have successfully added a product");
      }
    } catch (error) {
      console.error("Opps, something went wrong when creating a product");
    }
  };

  // edit products
  // GETTING ERROR MESSAGE WHEN ATTEMPTING TO EDIT PRODUCT REACHING THE CATCH
  // not capturing product ID which is why there is an error
  // Similar to single products make a admin single product to make edits/delete product?
  const handleEditProduct = async (id) => {
    try {
      if (admin) {
        console.log("Hit");
        console.log("ID", id);
        const response = await fetch(
          `https://anime-ecomm-database-7caa7cadec94.herokuapp.com/product/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              description,
              price,
              imageUrl,
              category,
              stock,
            }),
          }
        );
        console.log("PATCH RESPONSE", { response });
        const data = await response.json();
        console.log("PATCH DATA", data);
        setProducts(data);
      }
    } catch (error) {
      console.error("Something went wrong when editing product data");
    }
  };

  // delete products
  // same with edit not capturing the product ID to delete the products
  const handleDeleteProduct = async (id) => {
    try {
      if (admin) {
        const response = await fetch(
          `https://anime-ecomm-database-7caa7cadec94.herokuapp.com/product/${id}`,
          {
            method: "DELETE",
          }
        );
        alert("You have deleted a product");
        location.reload();
      }
    } catch (error) {
      console.error("There was an issue deleting a product", error);
    }
  };

  const handleEditAndClose = async (id) => {
    handleEditProduct(id);
    handleClose(id);
    window.location.reload();
  };

  const handleCreateAndClose = async () => {
    handleCreateProduct();
    handleCreateClose();
    window.location.reload();
  };

  return (
    <>
      {/*USER DATA*/}
      <Row>
        <Col className="header_title">
          <h1>Admin Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col className="header_title">
          <h1>Users</h1>
        </Col>
      </Row>
      <Table striped="columns" responsive="md">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
          ;
        </tbody>
      </Table>

      {/*PRODUCTS */}
      <Container fluid>
        <Row>
          <Col className="header_title">
            <h1>Products</h1>
          </Col>
        </Row>
        <Row>
          <Col className="header_title">
            <Button
              variant="primary"
              className="button"
              onClick={handleCreateShow}
            >
              Add product
            </Button>
          </Col>
        </Row>
        <Row style={{ display: "flex" }}>
          {products?.map((product) => (
            <>
              <Col
                xs={6}
                sm={4}
                md={3}
                lg={3}
                className="mb-4 mt-4 text-center"
              >
                <Card
                  key={product.id}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Card.Img
                    onClick={() => navigate(`/products/${product.id}`)}
                    variant="top"
                    src={product.imageUrl}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="cartText">${product.price}</Card.Text>
                    <Card.Text className="cartText">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="cartText">
                      Category: {product.category}
                    </Card.Text>
                    <Card.Text className="cartText">
                      Stock: {product.stock}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="button"
                      onClick={() => handleShow(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      className="button"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Modal
                show={show[product.id]}
                onHide={() => handleClose(product.id)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Price"
                        onChange={(event) => {
                          setPrice(parseFloat(event.target.value));
                        }}
                      />
                      <Form.Label>Image url</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="url"
                        onChange={(event) => {
                          setImageUrl(event.target.value);
                        }}
                      />
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Category"
                        onChange={(event) => {
                          setCategory(event.target.value);
                        }}
                      />
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Stock"
                        onChange={(event) => {
                          setStock(parseInt(event.target.value));
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleClose(product.id)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleEditAndClose(product.id)}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ))}
        </Row>
      </Container>
      {/*HANDLE CREATE MODAL*/}
      <div>
        <Modal show={showcreate} onHide={handleCreateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Price"
                  onChange={(event) => {
                    setPrice(parseFloat(event.target.value));
                  }}
                />
                <Form.Label>Image url</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="url"
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                  }}
                />
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                />
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Stock"
                  onChange={(event) => {
                    setStock(parseInt(event.target.value));
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCreateClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateAndClose}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminPage;
