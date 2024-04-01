import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { getCurrentUser, removeCredentials } from '../store/authSlice';

const Layout = () => {
  const username = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const logOut = () => { dispatch(removeCredentials()); };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          {username && <Button variant="primary" onClick={logOut}>Выйти</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
