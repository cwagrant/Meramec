import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Meramec</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/properties">
              <Nav.Link>Properties</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default header
