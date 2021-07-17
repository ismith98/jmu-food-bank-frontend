import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAlert } from "../../contexts/AlertContext";
import { updateFAQ } from "../../hooks/useFirebase";
import { nanoid } from "nanoid";

export default function AddFAQForm({ closeModal }) {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [details, setDetails] = useState();
  const { setErrorAlert, setSuccessAlert } = useAlert();

  function addFAQ(e) {
    e.preventDefault();
    let FAQInfo = {
      answer: answer,
      question: question,
      details: details,
      id: nanoid(),
    };
    let addFAQ = true;
    updateFAQ(FAQInfo, FAQInfo.id, setErrorAlert, setSuccessAlert, addFAQ);
    closeModal();
  }

  return (
    <Form>
      <Form.Group as={Row} controlId="question">
        <Form.Label column sm="4">
          Question:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            value={question}
            required
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="answer">
        <Form.Label column sm="4">
          Answer:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            as="textarea"
            rows={3}
            value={answer}
            required
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="details">
        <Form.Label column sm="4">
          Details:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            as="textarea"
            rows={3}
            value={details}
            required
            onChange={(e) => setDetails(e.target.value)}
          />
        </Col>
      </Form.Group>

      <div className="d-flex justify-content-center ">
        <Button type="submit" className="mr-3" onClick={addFAQ}>
          Confirm Changes
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </div>
    </Form>
  );
}
