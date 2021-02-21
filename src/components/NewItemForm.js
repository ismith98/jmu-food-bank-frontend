import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
//import { useDatabase } from "../contexts/DatabaseContext";
//import firebase from "../firebase";
import { useAlert } from "../contexts/AlertContext";
import { addItemToDatabase } from "../hooks/useFirebase";

export default function NewItemForm({ closeModal }) {
  const [picture, setPicture] = useState();
  const [value, setValue] = useState(10);
  const [itemName, setItemName] = useState();
  const { setErrorAlert, setSuccessAlert } = useAlert();

  function handleSubmit(e) {
    e.preventDefault();
    uploadPictureToImgur();
    closeModal();
  }

  function uploadPictureToImgur() {
    var formData = new FormData();
    formData.append("image", picture);
    formData.append("type", "file");
    formData.append("title", itemName);

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID 546c25a59c58ad7`);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    let url = "https://api.imgur.com/3/image";
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        let { data, success, status } = result;
        if (!success) {
          //throw an error
          setErrorAlert(`Bad Response from Imgur | code:  ${status}`);
        } else {
          let imageUrl = data.link;
          const itemInfo = {
            name: itemName,
            totalInventory: Number(value),
            amountReserved: 0,
            imageUrl: imageUrl,
          };
          addItemToDatabase(itemInfo, setErrorAlert, setSuccessAlert);
        }
      })
      .catch((error) => {
        setErrorAlert(`Error uploading your image to imgur |  ${error}`);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="itemName">
        <Form.Label>Food Item Name</Form.Label>
        <Form.Control
          required
          onChange={(e) => setItemName(e.target.value)}
        ></Form.Control>
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
          <Form.Control value={value} onChange={() => {}} />
        </Col>
      </Form.Group>
      <Form.Group controlId="itemImage">
        <Form.File
          id="ChooseImage"
          label="Choose image"
          accept=".jpg, .png"
          required
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button type="submit"> Submit </Button>
      </div>
    </Form>
  );
}
