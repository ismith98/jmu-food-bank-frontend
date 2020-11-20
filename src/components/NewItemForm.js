import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
//import { useDatabase } from "../contexts/DatabaseContext";
import firebase from "../firebase";

export default function NewItemForm({ closeModal }) {
  const [picture, setPicture] = useState();
  const [value, setValue] = useState(10);
  const [itemName, setItemName] = useState();
  //const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    //setLoading(true);
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
      .then(({ data }) => {
        let imageUrl = data.link;
        getLastKeyInDatabase(imageUrl);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  }

  function getLastKeyInDatabase(imageUrl) {
    const lastItemRef = firebase.database().ref("foodItems/");
    lastItemRef
      .orderByKey()
      .limitToLast(1)
      .once("value", (snapshot) => {
        let itemKey = 1 + Number(Object.keys(snapshot.val()));
        appendDatabase(itemKey, imageUrl);
      });
  }

  function appendDatabase(itemKey, imageUrl) {
    var itemKeyExists = false;
    const foodItemsRef = firebase.database().ref(`foodItems/${itemKey}`);
    foodItemsRef.transaction(
      (currentData) => {
        if (currentData === null) {
          return { item: itemName, amount: value, imageUrl: imageUrl };
        } else {
          //Item key already exists
          itemKeyExists = true;
        }
      },
      function (error, committed, snapshot) {
        if (error) {
          console.log("Transaction failed abnormally!", error);
        } else if (!committed) {
          console.log("We aborted the transaction. (Item key already exists)");
        } else {
          console.log("Food Item added!");
        }

        console.log("Food Item's data: ", snapshot.val());
        if (itemKeyExists) {
          appendDatabase(itemKey + 1, imageUrl);
        }
      }
    );
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
