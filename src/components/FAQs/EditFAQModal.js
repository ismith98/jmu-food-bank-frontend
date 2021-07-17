import React from 'react'
import { Modal } from "react-bootstrap";
import EditFAQForm from './EditFAQForm';


export default function EditFAQModal({closeModal, currentFAQ}) {
    return (
    <>
        <Modal.Header closeButton>Edit FAQ</Modal.Header>
        <Modal.Body>
            <EditFAQForm closeModal={closeModal} currentFAQ={currentFAQ} /> 
        </Modal.Body>
    </>
    )
}
