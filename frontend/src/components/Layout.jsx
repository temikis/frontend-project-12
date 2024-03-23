import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Button variant="primary">Выйти</Button>
      </Container>
    </Navbar>
    <Outlet />
  </div>
);

export default Layout;
