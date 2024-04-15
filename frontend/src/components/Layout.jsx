import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { getCurrentUser, removeCredentials } from '../store/authSlice';
import routes from '../utils/routes.js';

const Layout = () => {
  const username = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const logOut = () => { dispatch(removeCredentials()); };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to={routes.root()}>Hexlet Chat</Navbar.Brand>
          {username && <Button variant="primary" onClick={logOut}>{t('buttons.exit')}</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
