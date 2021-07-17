import React, { useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { removeFromDatabase, updateFAQ } from "../../hooks/useFirebase";
import { useAlert } from "../../contexts/AlertContext";

export default function EditFAQForm({ closeModal, currentFAQ }) {
  //const [FAQ, setFAQ] = useState({ ...currentFAQ });
  const [question, setQuestion] = useState(currentFAQ.question);
  const [answer, setAnswer] = useState(currentFAQ.answer);
  const [details, setDetails] = useState(currentFAQ.details);
  const { setErrorAlert, setSuccessAlert } = useAlert();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function editFAQ(e) {
    e.preventDefault();
    let FAQInfo = {
      answer: answer,
      question: question,
      details: details,
      id: currentFAQ.id,
    };
    updateFAQ(FAQInfo, FAQInfo.id, setErrorAlert, setSuccessAlert);
    closeModal();
  }

  function removeFAQ() {
    let path = "app/FAQs";
    removeFromDatabase(path, currentFAQ.id, setErrorAlert, setSuccessAlert);
    setConfirmModalOpen(false);
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
        <Button type="submit" className="mr-3" onClick={editFAQ}>
          Confirm Changes
        </Button>
        <Button
          variant="danger"
          className="mr-3"
          onClick={() => setConfirmModalOpen(true)}
        >
          Remove FAQ
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </div>

      <Modal show={confirmModalOpen} onHide={() => setConfirmModalOpen(false)}>
        <Modal.Header closeButton> Are You Sure? </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mt-2">
            <Button variant="danger" className="mr-3" onClick={removeFAQ}>
              Remove FAQ
            </Button>
            <Button
              variant="secondary"
              onClick={() => setConfirmModalOpen(false)}
            >
              Go Back
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Form>
  );
}
