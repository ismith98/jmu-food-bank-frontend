import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
//import { useDatabase } from "../contexts/DatabaseContext";
//import firebase from "../firebase";
import { useAlert } from "../contexts/AlertContext";
import { addItemToDatabase } from "../hooks/useFirebase";

export default function NewItemForm({ closeModal }) {
  const [itemName, setItemName] = useState("");
  const [totalInventory, setTotalInventory] = useState(10);
  const [maxReservable, setMaxReservable] = useState(5);
  const [picture, setPicture] = useState();

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
            totalInventory: totalInventory,
            maxReservable: maxReservable,
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
      <Form.Group as={Row} controlId="itemName">
        <Form.Label column sm="4">
          Item Name
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={itemName}
            required
            onChange={(e) => setItemName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="totalInventory">
        <Form.Label column sm="4">
          Total Inventory
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={totalInventory}
            type="number"
            required
            onChange={(e) => setTotalInventory(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="maxReservable">
        <Form.Label column sm="4">
          Max Reservable (per person)
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={maxReservable}
            type="number"
            required
            onChange={(e) => setMaxReservable(e.target.value)}
          />
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
      <div className="d-flex flex-column justify-content-center">
        <Button type="submit"> Submit </Button>
      </div>
    </Form>
  );
}
