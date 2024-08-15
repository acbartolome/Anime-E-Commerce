import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

const Account = ({ token, id }) => {
  const [user, setUser] = useState([]);
  // const { id } = useParams();


  // const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log({ token });
        if (token) {
          const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
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
  return (
    <>
      <ListGroup horizontal>
        <ListGroup.Item>Name</ListGroup.Item>
        <ListGroup.Item>{user.name}</ListGroup.Item>
        <ListGroup.Item>Edit</ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item>Email</ListGroup.Item>
        <ListGroup.Item>{user.email}</ListGroup.Item>
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
