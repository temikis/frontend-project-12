// import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import reglogo from './reglogo.jpeg';
// import { useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/index.jsx';
// import routes from '../routes.js';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(true);
      console.log(values);
    },
  });

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={reglogo} className="rounded-circle" alt="Войти" />
              </Col>
              <Col xs={12} md={6} className="mt-3 mt-md-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Ваш ник</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ваш ник"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Пароль"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="outline-primary" type="submit" className="w-100 mb-3">
                    Войти
                  </Button>
                </Form>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
