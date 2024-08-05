import React from "react";
import { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";

const Account = () => {
  // get user information
  // allow edits to the users information
  const [user, setUser] = useState([]);
  // anythign else to add?
  // modal to edit info???

  const token = localStorage.getItem("token");

  // need to make the route so that the user has to authenticate with their token?
  // COME BACK TOMORROW!!!
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await fetch(
            `http://localhost:3000/users/${id}` /*, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }*/
          );
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Something went wrong when fetching user data");
      }
    };
    fetchUserData();
  }, [token]);
  return (
    <>
      <ListGroup horizontal>
        <ListGroup.Item>Name</ListGroup.Item>
        <ListGroup.Item>ListGroup</ListGroup.Item>
        <ListGroup.Item>Edit</ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>Email</ListGroup.Item>
        <ListGroup.Item>ListGroup</ListGroup.Item>
        <ListGroup.Item>Edit</ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>Password</ListGroup.Item>
        <ListGroup.Item>ListGroup</ListGroup.Item>
        <ListGroup.Item>Edit</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Account;
