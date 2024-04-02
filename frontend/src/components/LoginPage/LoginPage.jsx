import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import reglogo from './reglogo.jpeg';
import routes from '../../utils/routes.js';
import { setCredentials } from '../../store/authSlice.js';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.login(), values);
        const userData = res.data;
        dispatch(setCredentials(userData));
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={reglogo} className="rounded-circle" alt={t('loginPage.logo')} />
              </Col>
              <Col xs={12} md={6} className="mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>{t('loginPage.form.username')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('loginPage.form.username')}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>{t('loginPage.form.password')}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t('loginPage.form.password')}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{t('loginPage.form.feedback')}</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="outline-primary" type="submit" className="w-100 mb-3">
                    {t('buttons.enter')}
                  </Button>
                </Form>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('loginPage.footer.sentence')}
                <Link to="/signup">{t('loginPage.footer.link')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
