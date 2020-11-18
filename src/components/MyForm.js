import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import firebase from "../firebase";

export default function MyForm() {
  const [picture, setPicture] = useState();
  const [value, setValue] = useState(10);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    console.log(firebase);
    getDatabase();
  }

  function getDatabase() {
    const secondItemRef = firebase.database().ref("foodItems/");
    secondItemRef.once("value", (snapshot) => console.log(snapshot.val()));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="itemName">
        <Form.Label>Food Item Name</Form.Label>
        <Form.Control required></Form.Control>
      </Form.Group>
      <Form.Label>Quantity</Form.Label>
      <Form.Group controlId="itemAmount" as={Row}>
        <Col xs="9">
          <Form.Control
            type="range"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Col>
        <Col xs="3">
          <Form.Control value={value} />
        </Col>
      </Form.Group>
      <Form.Group controlId="itemImage">
        <Form.File
          id="ChooseImage"
          label="Choose image"
          accept="image/*"
          onChange={(e) => setPicture(e.target.files[0])}
          required
        />
      </Form.Group>
      <Button type="submit"> Submit </Button>
    </Form>
  );
}
