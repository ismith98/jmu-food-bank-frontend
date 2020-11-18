import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
//import { useDatabase } from "../contexts/DatabaseContext";
import firebase from "../firebase";
const axios = require("axios").default;

export default function NewItemForm({ closeModal }) {
  const [picture, setPicture] = useState();
  const [value, setValue] = useState(10);
  const [itemName, setItemName] = useState();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    //setLoading(true);
    getImgurLink();
    //getLastKeyFromDatabase();
    closeModal();
  }

  function getImgurLink() {
    var formData = new FormData();
    formData.append("image", picture);
    formData.append("type", "file");
    formData.append("title", itemName);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    //myHeaders.append("Accept", "application/json, text/plain, */*");
    myHeaders.append("Authorization", `Client-ID 546c25a59c58ad7`);

    let url = "https://api.imgur.com/3/upload";
    //let testUrl = "http://localhost:5000/";
    fetch(url, {
      method: "POST",
      //mode: "no-cors",
      headers: myHeaders,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.link);
        let imageUrl = data.link;
        //getLastKeyFromDatabase(imageUrl)
      });
  }

  function getLastKeyFromDatabase() {
    const lastItemRef = firebase.database().ref("foodItems/");
    lastItemRef
      .orderByKey()
      .limitToLast(1)
      .once("value", (snapshot) => {
        let itemKey = 1 + Number(Object.keys(snapshot.val()));
        //addToDatabase(itemKey);
        addToStorage2(itemKey);
      });
  }

  function addToStorage(resolve, reject) {
    console.log("in storage");
    setTimeout(2000, resolve);
    //resolve();
  }

  function addToStorage2(itemKey) {
    const imageRef = firebase.storage().ref(`foodImages/${itemKey}`);
    imageRef.put(picture).then((snapshot) => {
      console.log("uploaded picture", snapshot);
    });
  }

  function addToDatabase(itemKey) {
    var itemKeyExists = false;
    const foodItemsRef = firebase.database().ref(`foodItems/${itemKey}`);
    foodItemsRef.transaction(
      (currentData) => {
        if (currentData === null) {
          /*
          const promise = new Promise(addToStorage);
          promise.then(() => {
            return { item: itemName, amount: value };
          });
          */
          //return { item: itemName, amount: value };
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
          addToDatabase(itemKey + 1);
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
          <Form.Control value={value} />
        </Col>
      </Form.Group>
      <Form.Group controlId="itemImage">
        <Form.File
          id="ChooseImage"
          label="Choose image"
          accept="image/*"
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
