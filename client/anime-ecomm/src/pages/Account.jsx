import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Account.css";

import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Account = ({ token }) => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  // anythign else to add?
  // modal to edit info???
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log({ token });
        if (token) {
          const response = await fetch(
            `https://anime-ecomm-database-7caa7cadec94.herokuapp.com/users/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log({ response });
          const data = await response.json();
          console.log("DATA", data);
          setUser(data);
        }
      } catch (error) {
        console.error("Something went wrong when fetching user data");
      }
    };
    fetchUserData();
  }, [token, id]);

  const handleEdit = async () => {
    try {
      console.log("TOKEN handleEdit", token);
      if (token) {
        console.log("Hit");
        const response = await fetch(
          `https://anime-ecomm-database-7caa7cadec94.herokuapp.com${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );
        console.log("PATCH RESPONSE", { response });
        const data = await response.json();
        console.log("DATA", data);
        setUser(data);
      }
    } catch (error) {
      console.error("Something went wrong when editing user data");
    }
  };

  const handleEditAndClose = async () => {
    handleEdit();
    handleClose();
  };

  return (
    <>
      <div className="accountParent">
        <ListGroup horizontal>
          <ListGroup.Item>Name</ListGroup.Item>
          <ListGroup.Item>{user.name}</ListGroup.Item>
        </ListGroup>
        <ListGroup horizontal>
          <ListGroup.Item>Email</ListGroup.Item>
          <ListGroup.Item>{user.email}</ListGroup.Item>
        </ListGroup>
        <ListGroup horizontal>
          <ListGroup.Item>Password</ListGroup.Item>
          <ListGroup.Item>***********</ListGroup.Item>
        </ListGroup>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
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
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditAndClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Account;
