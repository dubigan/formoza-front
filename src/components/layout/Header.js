import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavDropdown, Nav } from 'react-bootstrap';

export class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className="ms-2 fs-5">
        <Navbar.Brand href="/sc/orders/" className="text-white bg-success rounded-1">
          <div className="ms-2 me-2">СЦ Формоза</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Клиенты" id="basic-nav-dropdown"> */}
            {/* <NavDropdown.Item href="/sc/clients/" className="fs-6">
                Список
              </NavDropdown.Item>
              <NavDropdown.Item href="/sc/client/new/" className="fs-6">
                Новый клиент
              </NavDropdown.Item> */}
            {/* </NavDropdown> */}
            <Nav.Link href="/sc/clients/">Клиенты</Nav.Link>
            <Nav.Link href="/sc/orders/">Ремонты</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
