import React from 'react'
import {Navbar, Nav} from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'


export default function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand>The Pantry</Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
                <LinkContainer to="/Inventory">
                    <Nav.Link>Inventory</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Orders">
                    <Nav.Link >Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/FAQs">
                    <Nav.Link >FAQs</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Announcements">
                    <Nav.Link >Announcements</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}
